(function(){
	includes();
})();


function includes(){
	//includeJS("./js/quark.base-1.0.0.js");
    window.CORPSE = {};
    window.CORPSE.baseUrl = ".";


	includeJS(CORPSE.baseUrl+"/js/GameElement.js");
	
	includeJS(CORPSE.baseUrl+"/js/Player.js");
	includeJS(CORPSE.baseUrl+"/js/R.js");
	includeJS(CORPSE.baseUrl+"/js/SceneGame.js");
	includeJS(CORPSE.baseUrl+"/js/SceneMenu.js");
	includeJS(CORPSE.baseUrl+"/js/Wall.js");
	includeJS(CORPSE.baseUrl+"/js/Layers.js");
	includeJS(CORPSE.baseUrl+"/js/Monsters.js");
	includeJS(CORPSE.baseUrl+"/js/Props.js");
	includeJS(CORPSE.baseUrl+"/js/Obstacles.js");
	
	//定义的类请添加在App.js的引用之前，防止在App中找不到类型定义
	includeJS(CORPSE.baseUrl+"/js/App.js");
	
	includeCSS(CORPSE.baseUrl+"/css/style.css");
}

function includeJS(path){
	if(!path) return;
	var script = document.createElement("script");
	script.src = path;
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
}

function includeCSS(path){
	if(!path) return;
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = path;
	document.getElementsByTagName("head")[0].appendChild(link);
}
