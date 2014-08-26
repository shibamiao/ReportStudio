define([
	"myApp/widget/sources/baseWidget",
	"myApp/widget/sources/buildTarget",
	"dojo/_base/declare",
	"dijit/layout/ContentPane",
	"dojo/dom-construct",
	"dojo/domReady!"
], function(baseWidget,buildTarget,declare,ContentPane,domConstruct){
	
	return declare("widget.sources.widgets.contentPaneTarget",[baseWidget], {
		title:"new Content",
		content:"",
			
		constructor:function(){
			 this.widget= new ContentPane({
				title:this.title
			 }, this.domNode);

			 this.content=domConstruct.create("div",{style:"height:200px; width:200px;background:yellow"});
			 this.widget.set("content",this.content);
			
			buildTarget.buildTargetWidget(this.content);
			 this.widget.startup();
		}
	
	});
});