define([
	"myApp/widget/sources/baseWidget",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/form/CheckBox",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-attr"
], function(baseWidget,declare,lang,CheckBox,domClass,domConstruct,domAttr){
	
	return declare("widget.sources.widgets.checkBoxChart",[baseWidget], {
				
		constructor:function(){

			domConstruct.empty(this.containerNode);
			this.domNode=domConstruct.create("input",null,this.containerNode);	
			this.domNode.id="checkBox_"+this.containerNode.id;
			
			this.widget=new CheckBox({
				name: "checkBox",
				value: "agreed",
				checked:false,
				onChange:lang.hitch(this,"_onChange")
			},this.domNode);
			
			this.className="myProject_checkBoxChart";
			domClass.add(this.containerNode,this.className);
			
			if(!this.view&&this.jsonObj)
				this.initData();
		},
		
		initData:function(){		
			for(var i in dataMap){
				if(dataMap[i].id==this.jsonObj.data){
					var manager=dataMap[i];
					if(manager.views[0]){
						this.view=manager.views[0];
						this.view.bindWidget(this);
					}
					else{
						this.view=manager.createView(this);		
						this.view.setParam(2,this.widget.checked);
					}
				}
			}
		},
		
		_onChange:function(event){
			this.view.refresh();
			this.view.createMap(event);		
		}
	});
});