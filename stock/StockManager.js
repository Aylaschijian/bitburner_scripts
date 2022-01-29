/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args[0] == "info"){
		ns.tprint(getbuyAbleStock(ns))
		ns.tprint(getStockinfos(ns))
		ns.exit();
	}
	ns.disableLog("ALL");
	if (ns.stock.purchase4SMarketData() && ns.stock.purchase4SMarketDataTixApi()) {
		while (true) {
			buylongShares(ns)
			selllongShares(ns) 
			await ns.sleep(6000);
		}
	}
	//sellShares(ns);

}
function selllongShares(ns, list = getPlayerStocks(ns)) {
	ns.enableLog("stock.sell");
	for (let stock of list) {
		if (stock.playerStocks[0]>1) {
			var profit = ns.stock.getSaleGain(stock.symbol, stock.playerStocks[0]-1, "long")
			
			var costs = 200000 + (stock.playerStocks[0]-1*stock.playerStocks[1]);
			
			var boolean = profit/costs > 0
			if(boolean && stock.forecast < 0.5){
				ns.stock.sell(stock.symbol, stock.playerStocks[0]-1)
			}
			if(stock.forecast < 0.45){
				ns.stock.sell(stock.symbol, stock.playerStocks[0]-1)
			}
		}
	}
}
function getOrder(ns) {
	// needs source file
	return ns.stock.getOrders()
}
function buylongShares(ns, list = getbuyAbleStock(ns)) {
	ns.enableLog("stock.buy");
	for (let stock of list) {

		var buyamount = Math.floor((ns.getServerMoneyAvailable("home")-100000)/stock.price_ask)
		//buyamount = (buyamount > stock.maxshares) ? stock.maxshares : buyamount;
		buyamount = (buyamount > stock.maxshares-stock.playerStocks[0]) ? stock.maxshares-stock.playerStocks[0] : buyamount;
		if ((buyamount * stock.price_ask) > (10000000*(1+stock.forecast))) {
			ns.stock.buy(stock.symbol, buyamount)
		}
		
	}
}
function getbuyAbleStock(ns) {
	var stockinfos = getStockinfos(ns);
	var nonplayerstock = stockinfos.filter(element => element.playerStocks[0] != element.maxshares)
	nonplayerstock = nonplayerstock.filter (element => element.forecast >= 0.51 );
	nonplayerstock = nonplayerstock.sort ((a,b) => b.votality - a.votality);
	nonplayerstock = nonplayerstock.sort ((a,b) => b.forecast - a.forecast);
	return nonplayerstock;
}
function getPlayerStocks(ns) {
	var stockinfos = getStockinfos(ns)
	var playerstock = stockinfos.filter(element => element.hasPlayer == true)
	return playerstock;
}
function getStockinfos(ns) {
	var symbollist =  ns.stock.getSymbols();
	var stockinfos = [];
	for (let sym of symbollist) {
		stockinfos.push({
			"symbol": sym,
			"votality"		: ns.stock.getVolatility(sym),
			"price_ask"		: ns.stock.getAskPrice(sym),
			"price_bid"		: ns.stock.getBidPrice(sym),
			"maxshares"		: ns.stock.getMaxShares(sym),
			"hasPlayer"		: checkStock(ns.stock.getPosition(sym)),
			"playerStocks"	: ns.stock.getPosition(sym),
			"forecast" 		: ns.stock.getForecast(sym),
		})
	}
	return stockinfos.sort ((a,b) => b.votality - a.votality);
}
function checkStock(array) {
	for (let element of array) {
		if (element > 0) {
			return true;
		}
	}
	return false;
}
function getFee (ns) {
	return 100000;
}