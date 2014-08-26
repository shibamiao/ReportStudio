define([
	"dojo/_base/array",
	"dojo/store/Memory",
	"dojox/charting/StoreSeries"
],function(arrayUtil,Memory,StoreSeries){

//****************************************Chart Adapter****************************************************
	function chartAdapter(view){
		var row=view.map.row;
		var column=view.map.column;
		var fields=view.data.header.fields;
		var originData=view.data.body.data;
		var identifier=view.data.header.identifier;
		var dataJson=[];
		var dataArray=[];
		
		for(var i in row){
			var dataJsonItem={};
			var dataArrayItem=[];
			for(var j in column){
				dataJsonItem[fields[column[j]].label]=originData[row[i]][column[j]];
				dataArrayItem.push(originData[row[i]][column[j]]);
			}
	//		console.log("json:",dataJsonItem,"array:",dataArrayItem);
			dataJson.push(dataJsonItem);
			dataArray.push(dataArrayItem);
		}
		var dataStore=new Memory({data:dataJson});
		return {fields:fields,dataJson:dataJson,dataArray:dataArray,dataStore:dataStore,identifier:identifier};
	}
	
//******************************************Grid Adapter******************************************************	
	function gridAdapter(view){
		var fields=view.data.header.fields;
		var jsonData=view.data.body.data;
		
		var layout=[];
		for(var i in fields){
			var item={};
			item.name=fields[i].id;
			item.field=fields[i].label;
			item.width="100px";
			layout.push(item);
		}
		var dataObj={};
		dataObj.identifier="id";
		dataObj.items=[];
		for(var i in view.map.row){
			var dataItem={};
			dataItem.id=i;
			arrayUtil.forEach(jsonData[view.map.row[i]],function(item,j){		
				dataItem[fields[j].label]=item;		
				
			});
			dataObj.items.push(dataItem);
		}
		var store=new Memory({data:dataObj});
	//	var storeSeries=new StoreSeries(store,{},function(item){return item});
		var storeSeries=[];
		for(var i in view.map.column){
			storeSeries.push(new StoreSeries(store,{},function(item){
			return item[fields[view.map.column[i]].label]}));
			
		}
		return {data:dataObj,layout:layout,store:store,storeSeries:storeSeries};
		
	}
		
	return {
		chartAdapter:chartAdapter,
		gridAdapter:gridAdapter

	};
});