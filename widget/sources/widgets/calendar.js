define([
	"myApp/widget/sources/baseWidget",
	"dojo/_base/declare",
    "dijit/Calendar",
    "dojo/date",
	"dojo/dom-class"
], function(baseWidget,declare,Calendar, date,domClass){
	
	return declare("widget.sources.widgets.calendar",[baseWidget], {
		constructor:function(){

			this.widget=new Calendar({value:new Date()},this.domNode);
			this.className="myProject_calendar";
			domClass.add(this.containerNode,this.className);
		}
	});
});