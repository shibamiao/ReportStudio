define([
"dojo/dom",
"dojo/dom-geometry",
"dojo/on",
"dojo/topic",
"dojo/dom-style",
"dojo/dom-construct",
"dojo/query",
"myApp/widget/sources/editorDialog",
"dijit/registry",
"dojo/NodeList-dom",
"dojo/domReady!"
],function(dom,domGeometry,on,topic,style,domConstruct,query,editorDialog,registry){
	
	function setDropPosition(widget,event){
		widget.style.left=(parseInt(event.clientX-domGeometry.position("centerContainer",false).x)/10)*10+"px";
		widget.style.top=(parseInt(event.clientY-domGeometry.position("centerContainer",false).y)/10)*10+"px";
	}
	
	function setDropSelector(source,nodes,copy,target,event){
		var widget=target.getSelectedNodes()[0];
		setDropPosition(widget,event);
		setupSelector(widget);
		target.selectNone();		
		editorDialog.dataSelectDialog(widget);
	}
	
	function setSelectorPosition(coverNode,widget){		
		style.set(coverNode.childNodes[0],"left","-5px");
		style.set(coverNode.childNodes[1],"left",style.get(widget,"width")-5+"px");
		style.set(coverNode.childNodes[2],"left","-5px");
		style.set(coverNode.childNodes[3],"left",style.get(widget,"width")-5+"px");
		style.set(coverNode.childNodes[0],"top","-5px");
		style.set(coverNode.childNodes[1],"top","-5px");
		style.set(coverNode.childNodes[2],"top",style.get(widget,"height")-5+"px");
		style.set(coverNode.childNodes[3],"top",style.get(widget,"height")-5+"px");
		style.set(coverNode.childNodes[4],"left","-5px");
		style.set(coverNode.childNodes[5],"left",style.get(widget,"width")-5+"px");
		style.set(coverNode.childNodes[6],"left","-5px");
		style.set(coverNode.childNodes[7],"left","-5px");
		style.set(coverNode.childNodes[4],"top","-5px");
		style.set(coverNode.childNodes[5],"top","-5px");
		style.set(coverNode.childNodes[6],"top","-5px");
		style.set(coverNode.childNodes[7],"top",style.get(widget,"height")-5+"px");
		style.set(coverNode.childNodes[4],"height",style.get(widget,"height")+"px");
		style.set(coverNode.childNodes[5],"height",style.get(widget,"height")+"px");
		style.set(coverNode.childNodes[6],"width",style.get(widget,"width")+"px");
		style.set(coverNode.childNodes[7],"width",style.get(widget,"width")+"px");
	}
	// setup the selector and the coverSelector when drop down
	function setupSelector(widget){
	//	var selectorContainer=dom.byId("selectorContainer");
	//	console.log(registry.byId(widget.id));	
		var coverNode=domConstruct.create("div",{className:"coverNode"},selectorContainer);
		var leftTopNode=domConstruct.create("div",{className:"selectorLTNode selectorNode"},coverNode);
		var rightTopNode=domConstruct.create("div",{className:"selectorRTNode selectorNode"},coverNode);
		var leftbottomNode=domConstruct.create("div",{className:"selectorLBNode selectorNode"},coverNode);
		var rightbottomNode=domConstruct.create("div",{className:"selectorRBNode selectorNode"},coverNode);
		
		var leftFrame=domConstruct.create("div",{className:"leftFrame selectorFrame"},coverNode);
		var rightFrame=domConstruct.create("div",{className:"rightFrame selectorFrame"},coverNode);
		var topFrame=domConstruct.create("div",{className:"topFrame selectorFrame"},coverNode);
		var bottomFrame=domConstruct.create("div",{className:"bottomFrame selectorFrame"},coverNode);
		
		var editNode=domConstruct.create("div",{className:"editNode"},coverNode);
		var dataEditNode=domConstruct.create("div",{className:"dataEditNode editing"},editNode);
		var dataDisplaySelectNode=domConstruct.create("div",{className:"dataDisplaySelectNode editing"},editNode);
		var eventEditNode=domConstruct.create("div",{className:"eventEditNode editing"},editNode);
		
		style.set(coverNode,"left",style.get(widget,"left")+"px");
		style.set(coverNode,"top",style.get(widget,"top")+"px");
		style.set(coverNode,"width",style.get(widget,"width")+"px");
		style.set(coverNode,"height",style.get(widget,"height")+"px");

		setSelectorPosition(coverNode,widget);
		style.set(selectorContainer,"display","block");		
		
		on(dataEditNode,"click",function(){
			editorDialog.dataSelectDialog(widget);
		});
		on(dataDisplaySelectNode,"click",function(){
			editorDialog.dataDisplaySelectDialog(widget);
		});
		on(eventEditNode,"click",function(){
			editorDialog.eventEditDialog(widget);
		});
	}
	
	//If choose another widget to drag in, let the selectorContainer display=none
	function setSelectorDisplay(){
		dom.byId("selectorContainer").style.display="none";
		query(".coverNode").style("display","none");
	}

	return {
		setSelectorPosition:setSelectorPosition,
		setDropSelector:setDropSelector, 
		setSelectorDisplay:setSelectorDisplay,
		setupSelector:setupSelector
	};
});