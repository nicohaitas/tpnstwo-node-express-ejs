/* 
 Admotion Copyright ? 2001-2015 Template v1.0.1
*/
var config = {};

var setConfig = function(param, defaultValue){
	config[param] = (typeof(adConfig) !== "undefined" && typeof(adConfig[param]) !== "undefined") ? adConfig[param] : defaultValue;
};

setConfig("animationStyle", "");

//LoaderFix
(function (){
	$("#LoadingSection").css("width", adConfig.width);
	$("#LoadingSection").css("height", adConfig.height);
})();

window.admReady = function(){
	$('#LoadingSection').hide();
	$('#InpageSection').show();
    createStyle();
	setFormatSize();
	$(document).trigger('adm_initializeAd');
};

function setFormatSize (){
	$('#InpageSection').css("width",adConfig.width);
	$('#InpageSection').css("height", adConfig.height);
}

function createStyle(){
	if( config.animationStyle != "" && config.animationStyle.length > 4 ){
		AdmBase.loadCss(  config.animationStyle, false );
	}
}