(function(Q){
	var me = null;
	var mode = 1;//游戏选用canvas画图，忽略DOMContext
	
	var gameState = "pause";//running、pause
	var gameFrames = 0;
	var fpsInterval = null;
	var gameData = {};
	var loading_text;
	
	
	var container = null;
	var context = null;
	var stage = null;
	var timer = null;
	var em = null;
	var events = [];
	var frames = null;
	
	var imageLoader = null;
	
	var layerBackground = null; //背景层
	var layerUI = null; //UI层
	var layerGame = null; //游戏场景层
	var layerMessage = null; // 消息层

	var player = null; //玩家
	var wall = null;//墙壁
	var monsters = null;//怪物管理器
	var props = null; //！道具管理器，不是属性property的意思
	var obstacles = null;//障碍物管理器
	
	
	
	
	var SceneGame = window.SceneGame = function(){
		me = this;
		me.init();
	};
	
	SceneGame.prototype.init = function(){
		this.__initialize();
		this.__showLoading();
		
	};
	SceneGame.prototype.__showLoading = function(){
		
		
		var temp_loader = new Q.ImageLoader();
		loading_text = new Q.Text({font:"28px arial",color:"#fff",text:"游戏正在加载中...", x:400,y:450, regX:300,regY:50,width:600, height:100, lineWidth:600, lineSpacing:0, textAlign:"center"});
		
		stage.addChild(loading_text);
		stage.refresh();
		
		temp_loader.addEventListener("complete",function(e){
			var bmp = new Q.Bitmap({id:"loading_img",image:e.images.loading_img.image,width:264,height:368,regX:132,regY:184,x:400,y:230,scaleX:0.8,scaleY:0.8});
			stage.addChild(bmp);
			stage.refresh();
			
			imageLoader = new Q.ImageLoader();
			imageLoader.addEventListener("loaded",onLoad);
			imageLoader.addEventListener("complete",onComplete);
			imageLoader.load(R.resource.sceneGame);
		});
		temp_loader.load([{id:"loading_img",src:CORPSE.baseUrl+"/images/loading_img.png"}]);
		
		
	};
	SceneGame.prototype.__hideLoading = function(){
		stage.removeAllChildren();
	};
	
	
	SceneGame.prototype.__initialize = function(){
		
		
		container = Q.getDOM("corpse-container");
		if(mode == 1){
			var canvas = Q.getDOM("canvas");
			if(canvas == undefined || canvas == null){
				canvas = Q.createDOM("canvas", {id:"canvas",width:window.APP.W,height:window.APP.H,style:{marginLeft:"auto",marginRight:"auto",width:window.APP.W+"px",height:window.APP.H+"px",backgroundcolor:"#abc"}});
				container.appendChild(canvas);
			}
			
			if(context == undefined || context == null)context = new Q.CanvasContext({canvas:canvas});
		}
		
		
		if(stage == undefined || stage == null)stage = new Q.Stage({
			context:context,
			width:window.APP.W,
			height:window.APP.H,
			update:update
		});
		
		gameState = "loading";
		//Q.toggleDebugRect(stage);//开启调试矩形
		
	};
	SceneGame.prototype.startGame = function(){
		if(em == undefined || em == null){
			em = new Q.EventManager();
			events =  Q.supportTouch ? ["touchstart","touchmove","touchend"] : ["mousedown","mousemove","mouseup", "mouseout"];			
		}
		em.registerStage(stage,events,true,true);
		clearInterval(fpsInterval);
		this.loadGameData();
		
		if(timer == undefined || timer == null){
			timer = new Q.Timer(1000/30);
		}
		timer.addListener(stage);
		timer.addListener(Q.Tween);
		timer.start();
	};
	
	/**
	 * 导入游戏幕所需元素，主要是显示元素
	 */
	SceneGame.prototype.loadGameData = function(){
		
		gameFrames = 0;
		gameState = "pause";
		gameData.time = 0;
		gameData.targetScore = 0;
		gameData.currentScore = 0;
		gameData.propHideCount = 0;
		gameData.propRepelCount = 0;
		gameData.propFrozenCount = 0;
		
		
		window.removeEventListener("keydown",onkeydown);
		window.removeEventListener("keyup",onkeyup);
		
		window.addEventListener("keydown",onkeydown);
		window.addEventListener("keyup",onkeyup);
		
		layerBackground = new LayerBackground({scene:me}); //背景层
		layerGame = new LayerGame({scene:me,width:window.APP.W,height:window.APP.H}); //游戏场景层
		layerMessage = new LayerMessage({scene:me}); // 消息层
		layerUI = new LayerUI({scene:me}); //UI层
	
	
		/**
		 * 创建墙壁等游戏层元素
		 */
		wall = new Wall({
			id:"wall",
			x:0,
			y:0,
			layerParent:layerGame,
			autoSize:true
		});
		player = new Player({
			id:"player",
			x:200,
			y:470,
			v:{x:0,y:0},
			layerParent:layerGame,
			autoSize:true
		});
		monsters = new Monsters({
			size:8,
			layerParent:layerGame
		});
		props = new Props({
			layerParent:layerGame
		});
		obstacles = new Obstacles({
			layerParent:layerGame
		});
		
		stage.addChild(layerBackground,layerGame,layerUI,layerMessage);
		this.resortGameElements();
		
		fpsInterval = setInterval(function()
				{
					layerUI.setFPS(frames);
					frames = 0;
				}, 1000);
		trace("children numbers of layerGame:"+layerGame.getNumChildren());
	};
	
	SceneGame.prototype.pauseGame = function(){
		gameState = "pause";
		if(player.state == "walk")player.stand();
		//player.falldown();
	};
	SceneGame.prototype.resumeGame = function(){
		gameState = "running";
		if(player.state == "stand")player.walk();
	};
	SceneGame.prototype.restartGame = function(){
		//trace(events.length);
		stage.removeAllChildren();
		clearInterval(fpsInterval);
		this.loadGameData();
		
	};
	SceneGame.prototype.quitGame = function(){
		em.unregisterStage(stage, events);
		stage.removeAllChildren();
		stage.refresh();
		timer.removeListener(stage);
		timer.removeListener(Q.Tween);
		timer.stop();

		trace("quitGame");
	};
	
	SceneGame.prototype.resortGameElements = function(){
		layerGame.sortChildren(function(a,b){
			return (a.regY+a.y) - (b.regY+b.y);
		});
	};
	
	SceneGame.prototype.updateGameData = function(){
		gameData.time = Math.round(gameFrames*0.03);
		if(gameData.currentScore < gameData.targetScore) {
			gameData.currentScore++;
		}else if(gameData.currentScore>gameData.targetScore){
			gameData.currentScore = gameData.targetScore;
		}
		
		layerUI.setTime(gameData.time);
		layerUI.setScores(gameData.currentScore);
		
	};
	
	SceneGame.prototype.gameLogic = function(){
		if(gameFrames % 100 == 0){
			var r = random(1,100);
			if(r<40){
				if(!monsters.evolveOne()) monsters.addMonsters(1);
			}else monsters.addMonsters(1);
		}
		
		if(gameFrames % 200 == 0){
			var r = random(2,3);
			props.addProps(r);
			r = random(2,5);
			obstacles.addObstacles(r);
		}
	};
	
	function update(){
		frames++;
		if(gameState == "loading")return;
		if(gameState == "running"){
			gameFrames++;
			me.gameLogic();
			
			props.hitTestWithPlayer(player,monsters,gameData);//道具的检测是即发的，因此放在更新之前
			
			var hits = monsters.hitTestWithPlayer(player);//怪物的碰撞也是即发产生效果，因此放在更新之前，但道具的检测优先级更高
			if(hits>0) {//如果碰到怪物，游戏结束
				//me.restartGame();
				trace("gameover");
				player.falldown();
				me.pauseGame();
				layerMessage.showStastic(gameData);
			}
			
			player.move();
			monsters.doAI(player);
			monsters.update();
			obstacles.update();
			props.update();
			
			wall.hitTestWithPlayer(player);
			wall.hitTestWithMonsters(monsters);
			monsters.hitTestWithObstacles(obstacles);
			obstacles.hitTestWithPlayer(player);
			
			
			me.resortGameElements();
			me.updateGameData();
		}else{
			layerMessage.stastic(gameData);
		}
		
	};
	
	
	function onkeyup(e){
		var v = player.v;
		switch(e.keyCode){
		case Q.KEY.LEFT:
			v.x = 0;
			break;
		case Q.KEY.RIGHT:
			v.x = 0;
			break;
		case Q.KEY.UP:
			v.y = 0;
			break;
		case Q.KEY.DOWN:
			v.y = 0;
			break;
		case Q.KEY.P:
			break;
		case Q.KEY.Q:
			break;
		case Q.KEY.SPACE:
			if(e.returnValue)e.returnValue = false;
			else e.preventDefault();
			if(gameState == "running"){
				layerUI.removeChild(layerUI.btn_pause);layerUI.addChild(layerUI.btn_play);
				me.pauseGame();
			}else{
				layerUI.removeChild(layerUI.btn_play);layerUI.addChild(layerUI.btn_pause);
				me.resumeGame();
			}
			break;
		}
		player.v = v;
	};
	
	function onkeydown(e){
		var v = player.v;
		switch(e.keyCode){
		case Q.KEY.LEFT:
			if(e.returnValue)e.returnValue = false;
			else e.preventDefault();
			v.x = -Player.maxV;
			break;
		case Q.KEY.RIGHT:
			if(e.returnValue)e.returnValue = false;
			else e.preventDefault();
			v.x = Player.maxV;
			break;
		case Q.KEY.UP:
			if(e.returnValue)e.returnValue = false;
			else e.preventDefault();
			v.y = -Player.maxV;
			break;
		case Q.KEY.DOWN:
			if(e.returnValue)e.returnValue = false;
			else e.preventDefault();//firefox 支持
			v.y = Player.maxV;
			break;
		}
		player.v = v;
	};
	
	function onLoad(e){
		loading_text.text = "游戏正在加载中..."+(e.target.getLoaded()/e.target.getTotal()*100).toString().substring(0,4)+"%("+e.target.getLoaded()+"/"+e.target.getTotal()+")<br>";
		stage.refresh();
	}
	
	function onComplete(e){
		R.init(e.images,"sceneGame");
		trace("oncomplete");
		setTimeout(function(){
			me.__hideLoading();
			me.startGame();
		},1000);
		
	}
})(Quark);