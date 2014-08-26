define([
	"myApp/widget/sources/baseWidget",
	"dojo/_base/declare",
	"dijit/form/Textarea",
	"dojo/dom-class"
], function(baseWidget,declare,Textarea,domClass){
	
	return declare("widget.sources.widgets.textareaChart",[baseWidget], {
		constructor:function(){

			this.widget=new Textarea({
			title:"textarea"
			},this.domNode);
			this.className="myProject_textareaChart";
			domClass.add(this.containerNode,this.className);
		}
	});
});