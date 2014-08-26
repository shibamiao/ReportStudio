require([
    "dijit/Toolbar",
    "dijit/form/Button",
    "dojo/_base/array",
    "dojo/domReady!"
], function(Toolbar, Button, array){
    var toolbar = new Toolbar({}, "toolBar");
    array.forEach(["Cut", "Copy", "Paste"], function(label){
        var button = new Button({
            // note: should always specify a label, for accessibility reasons.
            // Just set showLabel=false if you don't want it to be displayed normally
            label: label,
            showLabel: false,
            iconClass: "dijitEditorIcon dijitEditorIcon"+label
        });
        toolbar.addChild(button);
    });
});