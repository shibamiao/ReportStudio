//This is a view for data, we design how the data display here.
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Evented",
	"dojo/on"
],function(declare,lang,Evented,on){
	return declare("widget.sources.widgets.dataView",null,{
		bindWidgets:[],
		map:null,
		data:null,
		id:0,
		bindType:null,
		selector:null,
		eventSink:null,
		bool:true,
		baseView:null,
		viewReady:false,
		
		constructor:function(dataManager,widget){
			this.bindWidgets=[];
			this.bindWidget(widget);							
			this.eventSink=new Evented;
			this.map=null;
			this.dataManager=dataManager;
			this.id=this.dataManager.id+"_dataView"+this.dataManager.views.length;				
			
			if(this.dataManager.dataLoaded)
				this.initData({data:this.dataManager.data});
			
			var self=this;	
			this.dataManager.eventSink.on("DataReady",lang.hitch(this,"initData"));
			
		//	console.log("Creating view ",this.id,"by widget ",widget);
		},
		
		bindWidget:function(widget){
	//		console.log("Binding widget, view ",this.id,"by widget ",widget);
			this.bindWidgets.push(widget);
		},
		
		initData:function(event){
			this.data=event.data;
			this.selector=this.selector?this.selector:this.dataManager.getLength();
			if(!this.map)
				this.initMap(this.bool);				
		},
		
		initMap:function(event){
			this.map={};
			this.map.row=[];
			this.map.column=[];
			this.refresh();
			if(typeof(event)=="boolean")
				this.bool=event;
			var length=this.dataManager.getLength();
			for(var i=0;i<length;i++){
				if(this.bool)
					this.map.row.push(i);
				else if(i!=this.selector)
					this.map.row.push(i);				
			}	
			for(var i=0;i<this.data.header.fields.length;i++)
				this.map.column.push(i);
			this.eventSink.emit("ViewReady",{value:this.map});			
			this.viewReady=true;
		},
		
		setParam:function(selector,bool){
			this.selector=selector;
			this.bool=bool;
		},
		
		displayView:function(){
			return {map:this.getMap(),data:this.data};
		},
		
		sort:function(columnNum){
			var data=this.data.body.data;
			var row=this.map.row;
	//		data.sort(function(a,b){return a[columnNum]-b[columnNum]});
			for(var i=0;i<row.length;i++){
				for(var j=i+1;j<row.length;j++){
					if(data[row[j]][columnNum]<data[row[i]][columnNum]){
						this.swap(i,j);
					}
				}
			}
	//		console.log("row",this.map.row);
			this.eventSink.emit("ViewReady",{value:this.map});
		},
		swap:function(a,b){
			var temp=this.map.row[a];
			this.map.row[a]=this.map.row[b];
			this.map.row[b]=temp;
		},
		
		change:function(){},
		binding:function(row){},
		
		refresh:function(type){
			if(type=="row")
				this.map.row=[];
			else if(type=="column")
				this.map.column=[];
			else{
				this.map.row=[];
				this.map.column=[];
			}
		},
		
		setMap:function(type,index,bool){
			if(type=="row"){
			for(var i in index)
				this.map.row.push(index[i]);			
			}else{
			for(var i in index)
				this.map.column.push(index[i]);
			}
	//		console.log(this.map);
		},
		
		getMap:function(){			
			return this.map;
		},
		
		updateMap:function(type){
			if(this.baseView){				
				for(var i in this.map[type]){
					var temp=this.map[type][i];
					this.map[type][i]=this.baseView.map[type][temp];
				}
			}
		}
		
		
	});
});