//This is the data array to manage the dataManagers
var dataMap=[];
require([
	"myApp/widget/sources/dataManager",
	"dojo/domReady!"
],function(dataManager){
	
	//dataMap.push(new dataManager("ChartData0"));
	//dataMap.push(new dataManager("ChartData1"));
	dataMap.push(new dataManager("ChartData2"));
	//dataMap.push(new dataManager("ChartData3"));
	
});