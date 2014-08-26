define([
	"dojo/query",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-style"
	],function(query,dom,domAttr,domStyle){
	
	function activate(){
		query("div[json-src]").forEach(function(node){
		
			var jsonsrc=domAttr.get(node,"json-src");
			var jsonObj = window[jsonsrc];
			if (jsonObj){
				require(["myApp/widget/sources/widgets/"+jsonObj.builder],function(builder){
					var widget=new builder(node,jsonObj);				
				});
			}
			else {
				console.error(jsonObj);
			}
		});
		
	}
	
	return {
	activate:activate
	};
});