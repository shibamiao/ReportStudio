define([
	"myApp/widget/sources/baseWidget",
	"dojo/_base/declare",
	"dijit/form/HorizontalSlider",
	"dojo/dom-class",
	"dojo/dom-construct"
], function(baseWidget,declare,HorizontalSlider,domClass,domConstruct){
	
	return declare("widget.sources.widgets.sliderChart",[baseWidget], {
		constructor:function(){

		this.domNode=domConstruct.create("div",null,this.containerNode);
			this.widget=new HorizontalSlider({
			 name: "slider",
			value: 5,
			minimum: -10,
			maximum: 10,
			intermediateChanges: true,
			style: "width:300px;"
			},this.domNode);
			
			this.className="myProject_sliderChart";
			domClass.add(this.containerNode,this.className);
		}
	});
});