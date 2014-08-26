//This is the class of dataManager, we handle all the data request action here.
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Evented",
	"dojo/request",
	"myApp/widget/sources/dataView"
],function(declare,lang,Evented,request,dataView){
	return declare("widget.sources.widgets.dataManager",null,{
		data:null,
		id:"",
		views:[],	
		eventSink:null,
		dataLoaded:false,
		
		constructor:function(dataName){
			this.id=dataName;
			this.loadData(dataName);
			this.views=[];
			this.eventSink=new Evented;
		},
		
		loadData:function(dataName){
			var self=this;
			var result=request.get("./data/"+dataName+".json",{
				handleAs:"json"
			}).then(function(data){
				self.data=data;
	//			if(self.views.length)
				self.eventSink.emit("DataReady",{data:self.data});
				self.dataLoaded=true;
			});		
		},
				
		createView:function(bindWidget,view){			
			var data_View=new dataView(this,bindWidget);
			this.views.push(data_View);	
			if(view)
				data_View.baseView=view;
			return data_View;	
		},
		
		getLength:function(){
			return this.data.body.data.length;
		}
	});
});