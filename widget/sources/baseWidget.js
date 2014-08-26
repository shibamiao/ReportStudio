define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/on",
	"myApp/widget/sources/dataAdapter",
	"dijit/registry",
	"dojo/domReady!"
], function(declare, lang, dom, domConstruct, domStyle,domAttr,on,dataAdapter,registry){
	var parentNode;
	return declare("widget.sources.baseWidget",null, {
		
		id:"",
		style:"",
		className:"",
		containerNode:null,
		domNode:null,
		widget:null,
		jsonObj:null,
		data:null,
		view:null,
		
		constructor: function(parentNode,jsonObj){
			this.containerNode=parentNode;		
			this.domNode=domConstruct.create("div",null,this.containerNode);

			this.id=this.containerNode.id;
			if(jsonObj){ 			
				this.initialize(jsonObj);				
			}
			registry.add(this);
	//		this.postCreate();
			
		},
		
		getContainerNode: function(){
			return this.ContainerNode;
		},
		getDomNode: function(){
			return this.domNode;
		},
		
		initialize:function(jsonObj){
			this.jsonObj=jsonObj;
			if(this.jsonObj.style)
				this.setStyle();
			if(this.jsonObj.data){		
				this.data=this.jsonObj.data;
				domAttr.set(this.containerNode,"data-src",this.jsonObj.data);
			}	
		},
		
		setStyle: function(){
			domStyle.set(this.containerNode,"position","absolute");
			for(var sty in this.jsonObj.style){
				domStyle.set(this.containerNode,sty,this.jsonObj.style[sty]);
			};
		},

		setData:function(dataName){
			this.data=dataName;
			domAttr.set(this.containerNode,"data-src",this.data);

			for(var i in dataMap){
				if(dataMap[i].id==this.data){
					this.manager=dataMap[i];
				}
			}
			this.initData();
		},
		
		_onClick:function(){},
		
		postCreate: function(){
			on(this.containerNode,"click",lang.hitch(this,"_onClick"));
		},
		
		getEventListener:function(){
			return "";
		}
	});
});