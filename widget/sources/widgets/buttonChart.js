define([
	"myApp/widget/sources/baseWidget",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/form/Button",
	"dojo/dom-class"
], function(baseWidget,declare,lang,Button,domClass){
	
	return declare("widget.sources.widgets.buttonChart",[baseWidget], {
		constructor:function(){

			this.widget=new Button({
				label:"Sort",
				onClick:lang.hitch(this,"_onClick")
			},this.domNode);
			
			this.className="myProject_buttonChart";
			domClass.add(this.containerNode,this.className);
			
			if(this.jsonObj)
				this.setData(this.jsonObj.data);
		},
		
		initData:function(){		
			if(this.manager.views[0]){
				this.view=this.manager.views[0];
				this.view.bindWidget(this);
			}
			else{
				this.view=this.manager.createView(this);					
			}
		},
		
		_onClick:function(event){
	//		console.log(event);
			this.view.sort(2);
		}
	});
});