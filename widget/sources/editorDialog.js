define([
"dijit/Dialog",
"dijit/form/CheckBox", 
"dijit/form/FilteringSelect",
"dojo/dom",
"dojo/dom-construct",
"dijit/registry",
"dojo/store/Memory",
"dojo/string",
"dojo/domReady!"
],function(Dialog,CheckBox,FilteringSelect,dom,domConstruct,registry,Memory,string){
	var selectingDataDialog=new Dialog({
			title:"Properties",
			style:{width:"300px"},
			draggable:true
		});

	function dataSelectDialog(widgetNode){
		var designForm=domConstruct.toDom("<label for=\"dataSelect\">Please select a data:</label><input id=\"dataSelect\" />");
	
		var widgetObj=registry.byId(widgetNode.id);
		var dataJSON=[];
	
		for(var i in dataMap){
			var manager=dataMap[i];
			var dataItem={};
			dataItem.id=manager.id;
			dataItem.name=manager.id;
			dataJSON.push(dataItem);
		}
		
		var dataStore=new Memory({data:dataJSON});
  
		selectingDataDialog.set("content",designForm);
		selectingDataDialog.show();	
		
		var fs = new FilteringSelect({
			 store: dataStore,
			 name:"dataSelect",
			 searchAttr: "name",
			 style: "width: 150px;",
			 value:widgetObj.data,
			 onChange:function(attr){
//				console.log(attr);
				widgetObj.setData(attr);
				selectingDataDialog.hide();
			 }
		}, "dataSelect");
	}
	
	function dataDisplaySelectDialog(widgetNode){
		var designForm=domConstruct.toDom("<label for=\"dataSelect\">Please select an attribute to display:</label><input id=\"dataSelect\" />");
	
		var widgetObj=registry.byId(widgetNode.id);
		var dataJSON=widgetObj.attrDisplay();
	
		var dataStore=new Memory({data:dataJSON});
  
		selectingDataDialog.set("content",designForm);
		selectingDataDialog.show();	
		
//		console.log(dataJSON[0].name);
		var fs = new FilteringSelect({
			 store: dataStore,
			 name:"dataSelect",
			 searchAttr: "name",
			 style: "width: 150px;",
			 value:dataJSON[0].name,
			 onChange:function(attr){
		//		console.log(attr);
				widgetObj.setSeries(attr);
				selectingDataDialog.hide();
			 }
		}, "dataSelect");
	}
	
	function eventEditDialog(widgetNode){
	
		var widget=registry.byId(widgetNode.id);
		var designForm=domConstruct.create("div");
			
		var rowListenerNode=domConstruct.create("div",{innerHTML:"row listener: "},designForm);
		var rowNode=domConstruct.create("fieldset",{},rowListenerNode);
		var columnListenerNode=domConstruct.create("div",{innerHTML:"column listener: "},designForm);
		var columnNode=domConstruct.create("fieldset",{},columnListenerNode);
		
		var widgetNodes=dom.byId("canvasContainer").childNodes;
		var checkBoxes1=[];
		var checkBoxes2=[];
		for(var i=0;i<widgetNodes.length;i++){
			var widgetObj=registry.byId(widgetNodes[i].id);
			if(widgetObj.getType()!=="dgrid"&&widgetObj.data==widget.data){
				var node1=domConstruct.toDom(string.substitute("<input id=${id}  /><label for=${id}>${content}</label><br>",
					{id:"row_"+widgetObj.getType()+"_"+widgetObj.id,content:widgetObj.getType()+"_"+widgetObj.id}));
				var node2=domConstruct.toDom(string.substitute("<input id=${id}  /><label for=${id}>${content}</label><br>",
					{id:"column_"+widgetObj.getType()+"_"+widgetObj.id,content:widgetObj.getType()+"_"+widgetObj.id}));
				
				node1.id="row_"+widgetObj.getType()+"_"+widgetObj.id;
				node2.id="column_"+widgetObj.getType()+"_"+widgetObj.id;				
				node1.value=widgetObj.id;
				node2.value=widgetObj.id;
				domConstruct.place(node1,rowNode);	
				domConstruct.place(node2,columnNode);	
				checkBoxes1.push(node1);
				checkBoxes2.push(node2);
				
			}
		}
				
		selectingDataDialog.set("content",designForm);
		selectingDataDialog.show();	
		
		for(var i in checkBoxes1){
			var checkBox=new CheckBox({
				name: "row",
				value: checkBoxes1[i].value,
				checked: false,
				onChange:function(b){
					onCheckBoxChange(b,this,widget);
				}
			},checkBoxes1[i].id);
		}
		
		for(var i in checkBoxes2){
			var checkBox=new CheckBox({
				name: "column",
				value: checkBoxes2[i].value,
				checked: false,
				onChange:function(b){
					onCheckBoxChange(b,this,widget);
				}
			},checkBoxes2[i].id);
		}	
	}

	function onCheckBoxChange(b,checkBox,ownerWidget){
	//	console.log(b,checkBox.get("value"),ownerWidget);
		var targetWidget=registry.byId(checkBox.get("value"));
		if(b){
			ownerWidget.setHandler(checkBox.get("name"),targetWidget);
		}
	}
	
	return {
		dataSelectDialog:dataSelectDialog,
		dataDisplaySelectDialog:dataDisplaySelectDialog,
		eventEditDialog:eventEditDialog
	};
});