define([
	"myApp/widget/sources/baseWidget",
	"myApp/widget/sources/dataAdapter",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojox/grid/DataGrid", 
	"dojo/data/ItemFileWriteStore", 
	"dojo/store/Memory",
	"dojo/data/ObjectStore",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/on",
	"dijit/registry",
	"dijit/form/CheckBox",
	"dojo/string"
], function(baseWidget,dataAdapter,declare,lang,DataGrid,ItemFileWriteStore,Memory,ObjectStore,dom,domClass,domConstruct,on,registry,CheckBox,string){
	
	return declare("widget.sources.widgets.dgrid",[baseWidget], {
		
		rowListeners:[],
		columnListeners:[],
		
		constructor:function(){
		
			this.className="myProject_dgrid";
			domClass.add(this.containerNode,this.className);
		
			this.domNode.style.width="680px";

		/*create a new grid*/
		this.widget = new DataGrid({
			rowSelector: '20px'});

			this.widget.canSort=function(){return false;};
			/*append the new grid to the div*/
			this.widget.placeAt(this.domNode);

			this.domNode.style.height="20em";
			/*Call startup() to render the grid*/
		   this.widget.startup();
		
			on(this.widget,"RowClick",lang.hitch(this,"rowClickListener"));
			on(this.widget,"HeaderClick",lang.hitch(this,"columnClickListener"));
			
			if(this.jsonObj){
				this.setData(this.jsonObj.data);
		//		this.initData();
				this.setEventListener(this.jsonObj.eventListener);
			}
		},
		
		initData:function(){		
			if(this.manager.views[0]){
				this.view=this.manager.views[0];
				this.view.bindWidget(this);
			}
			else{
				this.view=this.manager.createView(this);					
			}
			var self=this;
			this.eventHandler=this.view.eventSink.on("ViewReady",lang.hitch(self,"setValue"));
			if(this.view.viewReady)
				this.setValue();
			
		},
		
		setValue:function(event){
			
			var value=dataAdapter.gridAdapter(this.view.displayView());
			this.dataStore = new ObjectStore({objectStore: value.store});
			this.widget.setStore(this.dataStore);
			this.widget.set("structure",value.layout);		
		},
		
		getType:function(){
			return "dgrid";
		},
		
		setHandler:function(type,targetWidget){
			if(type=="row"){
	//			console.log(targetWidget);
				this.rowListeners.push(targetWidget);
			}
			else
				this.columnListeners.push(targetWidget);
		},
		
		rowClickListener:function(event){
	//		console.log(event);
			for(var i in this.rowListeners){
				this.rowListeners[i].setSeries(event.rowIndex);
			}
		},
		
		columnClickListener:function(event){
//		console.log(event.cellNode.textContent);
			for(var i in this.columnListeners){
				this.columnListeners[i].setSeries(event.cellNode.textContent);
			}
		},
		
		getEventListener:function(){
			var listeners={};
			var rowLis=[];
			var coluLis=[];
			for(var i in this.rowListeners)
				rowLis.push(this.rowListeners[i].id);
			for(var i in this.columnListeners)
				coluLis.push(this.columnListeners[i].id);
			listeners.onRowClick=rowLis;
			listeners.onColumnClick=coluLis;
			return listeners;
		},
		
		setEventListener:function(listeners){
//			console.log(listeners.onRowClick);
			for(var i in listeners.onRowClick)
				this.rowListeners.push(registry.byId(listeners.onRowClick[i]));
			for(var i in listeners.onColumnClick)
				this.columnListeners.push(registry.byId(listeners.onColumnClick[i]));
			
		}
		
	});
});