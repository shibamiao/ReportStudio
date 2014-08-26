define([
	"myApp/widget/sources/baseWidget",
	"myApp/widget/sources/dataAdapter",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom-class",
   "dojox/charting/Chart",
	// Require the theme of our choosing
	"dojox/charting/themes/MiamiNice",
	// Charting plugins: 
	"dojox/charting/plot2d/Pie",
	// 	We want to plot Columns 
	"dojox/charting/plot2d/Columns",
	//	We want to use Markers
	"dojox/charting/plot2d/Markers",
	//	We'll use default x/y axes
	"dojox/charting/axis2d/Default",
	// Wait until the DOM is ready
	"dojo/domReady!"
], function(baseWidget,dataAdapter,lang,declare,on,domClass,Chart,theme,Pie){
	
	return declare("widget.sources.widgets.pieFanChart",[baseWidget],{
		constructor: function(){
			// Create the chart within it's "holding" node
			this.widget= new Chart(this.domNode,{ fill: null, margins: {t:0, l:0, b:0, r:0}});
		
			this.className="myProject_pieFanChart";
			domClass.add(this.containerNode,this.className);
		
			// Set the theme
			this.widget.setTheme(theme);
			// Add the series of data
			this.widget.addPlot("default", {type: Pie,  radius: 112, stroke: "white"});
			
		
				// Render the chart!
			this.widget.render();			
				// Handle the data here
			if(this.jsonObj){
				this.setData(this.jsonObj.data);
	//			this.initData();
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
		
		setValue:function(){
			var value=dataAdapter.chartAdapter(this.view.displayView());
			this.value=value;
			
			this.setSeries(0);		
		},
		
		setSeries:function(index){
			this.widget.addSeries("data1",[
				{ y:this.value.dataJson[index].America, text: "America" },
				{ y:this.value.dataJson[index].Europe, text: "Europe" },
				{ y:this.value.dataJson[index].Asia, text: "Asia" }
			]);
			this.widget.render();
		},
		
		attrDisplay:function(){
			var dataJSON=[];
			for(var i in this.value.dataJson){
				var attr=this.value.dataJson[i].month;
				var dataItem={};
				dataItem.id=i;
				dataItem.name=attr;
				dataJSON.push(dataItem);
			
			}
	//		console.log(dataJSON);
			return dataJSON;
		},
		getType:function(){
			return "pieFanChart";
		}
	});
});