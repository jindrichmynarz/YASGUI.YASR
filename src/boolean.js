var $ = require("jquery");

/**
 * Constructor of plugin which displays boolean info
 * 
 * @param yasr {object}
 * @param parent {DOM element}
 * @param options {object}
 * @class YASR.plugins.boolean
 * @return yasr-boolean (doc)
 * 
 */
var root = module.exports = function(yasr, parent, options) {
	var plugin = {};
	plugin.container = $("<div class='booleanResult'></div>").appendTo(parent);
	plugin.options = $.extend(true, {}, root.defaults, options);
	plugin.yasr = yasr;
	
	plugin.draw = function() {
		root.draw(plugin);
	};
	return plugin;
};

root.draw = function(plugin) {
	var booleanVal = yasr.results.getBoolean();
	
	var imgId = null;
	var textVal = null;
	if (booleanVal === true) {
		imgId = "check";
		textVal = "True";
	} else if (booleanVal === false) {
		imgId = "cross";
		textVal = "False";
	} else {
		plugin.container.width("140");
		textVal = "Could not find boolean value in response";
	}
	
	//add icon
	if (imgId) require("yasgui-utils").imgs.draw(plugin.container, {
		width: 25,
		height: 25,
		id: imgId,
	});
	
	$("<span></span>").text(textVal).appendTo(plugin.container);
};

/**
 * Defaults for boolean plugin
 * 
 * @type object
 * @attribute YASR.plugins.boolean.defaults
 */
root.defaults = {
	name: null,//don't need to set this: we don't show it in the selection widget anyway, so don't need a human-friendly name
	/**
	 * Hide this plugin from selection widget
	 * 
	 * @property hideFromSelection
	 * @type boolean
	 * @default true
	 */
	hideFromSelection:true,
	/**
	 * Check whether this plugin can handler the current results
	 * 
	 * @property canHandleResults
	 * @type function
	 * @default If resultset contains boolean val, return true
	 */
	canHandleResults: function(yasr){return yasr.results.getBoolean() === true || yasr.results.getBoolean() == false;},
	/**
	 * If we need to dynamically check which plugin to use, we rank the possible plugins by priority, and select the highest one
	 * 
	 * @property getPriority
	 * @param yasrDoc
	 * @type int|function
	 * @default 10
	 */
	getPriority: 10
};