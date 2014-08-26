//alert("runstart");
define([
	"dojo/_base/array",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dijit/Dialog",
	"dijit/registry",
	"dojo/string",
	"dojo/json",
	"dojo/text!./../templates/resultTemplate.html",
	"dojo/text!./../templates/divTemplate.html",
	"dojo/text!./../templates/jsonTemplate.html",
	"dojo/domReady!"
],function(arrayUtil,dom,domConstruct,style,attr,Dialog,registry,string,JSON,resultTemplate,divTemplate,jsonTemplate){
	var runContent=new Dialog({
		title:"Running...",
		style:{
			width:"400px"
		},
		draggable:true
	});
	//alert("runing");
	function openwin(content){
	var OpenWindow=window.open("", "newwin");  
	//file://写/成一行  
	OpenWindow.document.write(content);

	OpenWindow.document.close();
	}  
	
	return {	
		init:function(){
			var canvas=dom.byId("canvasContainer");
			
	//		console.log(canvas.childNodes);
			var jsonContent="";
			var widgets="";
			
			var numb=0;
			arrayUtil.forEach(canvas.childNodes,function(item,i){numb++});
			//alert(numb);
			/* alert("runing0"); */
			
			arrayUtil.forEach(canvas.childNodes,function(item,i){
				var startPos=item.className.indexOf("myProject");
				var endPos=item.className.indexOf(" ",startPos);
				var classNameTemp=item.className.slice(startPos,endPos);
				var widgetObj=registry.byId(item.id);

				widgets+=string.substitute(divTemplate,{
					classN:classNameTemp,
					index:i
				});
			/* 	alert("runing1"); */
			//alert(widgets);
				var jsonTemp=string.substitute(jsonTemplate,{
					classN:classNameTemp,
					index:i,
					num:numb,
					x:style.get(item,"left")+"px",
					y:style.get(item,"top")+"px",
					width:style.get(item,"width")+"px",
					height:style.get(item,"height")+"px",
					data:attr.get(item,"data-src")?attr.get(item,"data-src"):"",
					eventListener:JSON.stringify(widgetObj.getEventListener()),
					builder:classNameTemp.slice(classNameTemp.indexOf("_")+1)
				});
				/* alert("runing2"); */
				//alert(jsonTemp);
				jsonContent+=jsonTemp;
				
			});
			
			var contentHTML=string.substitute(resultTemplate,{
				jsons:jsonContent,
				divs:widgets
			});

			var showPage="<textarea spellcheck=\"false\" style=\"width: 100%; height: 400px; border:0; \">"+contentHTML+"</textarea>";
			runContent.set("content",showPage);
			runContent.show();
			
			openwin(contentHTML);
		}
	};
});