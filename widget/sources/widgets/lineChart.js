define([
	"myApp/widget/sources/baseWidget",
	"myApp/widget/sources/dataAdapter",
	"dojo/Evented",
	"dojo/on",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojox/charting/StoreSeries",
   "dojox/charting/Chart",
	// Require the theme of our choosing
	"dojox/charting/themes/MiamiNice",
	// Charting plugins: 
	"dojox/charting/plot2d/Lines",
	// 	We want to plot Columns 
	"dojox/charting/plot2d/Columns",
	//	We want to use Markers
	"dojox/charting/plot2d/Markers",
	//	We'll use default x/y axes
	"dojox/charting/axis2d/Default",
	// Wait until the DOM is ready
	//"dojo/domReady!"
], function(baseWidget,dataAdapter,Evented,on,declare,lang,domClass,domConstruct,StoreSeries,Chart,theme,Lines){
	
	return declare("widget.sources.widgets.lineChart",[baseWidget],{
		constructor: function(){
			// Create the chart within it's "holding" node
			this.widget= new Chart(this.domNode);

			this.className="myProject_lineChart";
			domClass.add(this.containerNode,this.className);

			// Set the theme
			this.widget.setTheme(theme);

			// Add axes
	//		this.widget.addAxis("x", {min: 0, max: 6, fixLower: "minor", fixUpper: "minor", natural: true});
	//		this.widget.addAxis("y",{vertical: true, fixLower: "major", fixUpper: "major", includeZero: true, max: 1});

			// Add the series of data
			this.widget.addPlot("default", {type: Lines, lines: true, markers: true});

			// Render the chart!
			this.widget.render();			
			if(this.data){
	//			console.log(this.data);
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
			
			var myLabelFunc=function(text){
				return value.dataJson[text-1][value.identifier];
			};
			
			this.widget.addAxis("x",{majorTickStep: 1, minorTicks: false, minorLabels: false,labelFunc:myLabelFunc});
			this.widget.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true });
			
			this.setSeries(value.fields[1].label);			
		},
		
		setSeries:function(attr){
			if(attr!=this.value.identifier){
				this.widget.addSeries("data1",new StoreSeries(this.value.dataStore,{},function(item){return item[attr];}));
				this.widget.render();
			}
		},
		
		attrDisplay:function(){
			var dataJSON=[];
			for(var i in this.value.fields){
				if(this.value.fields[i].isDimension)
					console.log(this.value.fields[i].isDimension);
				else{
					var attr=this.value.fields[i];
					var dataItem={};
					dataItem.id=attr.id;
					dataItem.name=attr.label;
					dataJSON.push(dataItem);
				}
			}
	//		console.log(dataJSON);
			return dataJSON;
		},
		getType:function(){
			return "lineChart";
		}
	});
});