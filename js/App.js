(function(Q){
	
	var App = window.App = function(){
		this.W = 800;
		this.H = 480;
		
		this.sceneMenu = null; //菜单场景
		this.sceneGame = null; //游戏场景
		
		this.init();
	};
	
	App.prototype.init = function(){
		
	};
	
	App.prototype.switchScene = function(id){ //切换场景
		switch(id){
		case "menu":
			
			break;
		case "game":
			
			if(this.sceneGame == null) this.sceneGame = new SceneGame();
			else this.sceneGame.startGame();
			
			break;
		}
	};
	
	window.onload = function(){
		//includes();
		var app = window.APP= new App();
		app.switchScene("game");
	};
	
	Array.prototype.deleteBy = function(indexOrValue){
		if(typeof indexOrObj == "number"){
			this.splice(indexOrVaule, 1);
			return true;
		}else{
			for(var i = 0;i<this.length;i++){
				if(this[i] == indexOrValue){
					this.splice(i, 1);
					return true;
				}
			}
			return false;
		}
	};
	
})(Quark);

/*
function includes(){
	includeJS("./js/Player.js");
	includeJS("./js/R.js");
	includeJS("./js/SceneGame.js");
	includeJS("./js/SceneMenu.js");
	includeJS("./js/Wall.js");
	includeJS("./js/Layers.js");
	
	includeCSS("./css/style.css");
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
*/
function createRect(w, h, color)
{
	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.rect(0, 0, w, h);
	ctx.fill();

	var img = new Image();
	img.src = canvas.toDataURL("image/png");
	img.width = w;
	img.height = h;
	return img;
}

function dump(obj){
	var str = "";
	for(var key in obj){
		str += "key:"+key+";value="+obj[key]+"\n";
	}
	trace(str);
}

function random(b1,b2){
	return Math.round(Math.random()*(b2-b1)+b1);
}

