(function(Q){
	
	var LayerBackground = window.LayerBackground = function(props){
		this.scene = null;
		Q.merge(this, props);
		var me  = this;
		LayerBackground.superClass.constructor.call(this,props);
		
		this.background = new Q.Bitmap(R.background);
		this.addChild(this.background);
	}; //背景层
	Q.inherit(LayerBackground, Q.DisplayObjectContainer);
	
	
	var LayerUI = window.LayerUI = function(props){
		this.scene = null;
		
		Q.merge(this, props);
		
		
		var me = this;
		var x = 0;
		LayerUI.superClass.constructor.call(this,props);
		
		this.btn_pause = new Q.Button(R.btn_pause);
		this.btn_pause.removeAllEventListeners();
		this.btn_pause.addEventListener("mouseup",function(){
			me.removeChild(me.btn_pause);me.addChild(me.btn_play);me.scene.pauseGame();
			});
		
		this.btn_play = new Q.Button(R.btn_play);
		this.btn_play.removeAllEventListeners();
		this.btn_play.addEventListener("mouseup",function(){
			me.removeChild(me.btn_play);me.addChild(me.btn_pause);me.scene.resumeGame();
			
			});
		
		this.btn_back = new Q.Button(R.btn_back);
		this.btn_back.removeAllEventListeners();
		this.btn_back.addEventListener("mouseup",function(){
			me.scene.restartGame();
			});
		
		this.background = new Q.Graphics({width:790, height:50, x:5, y:5,alpha:0.5});
		this.background.lineStyle(5, "#d23a81").beginFill("#fdaed3").drawRoundRect(5, 5, 780, 40, 10).endFill().cache();
		var color = "#000";
		
		this.fps = new Q.Text({font:"28px arial", color:color,x:20,y:15, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.setFPS(0);
		
		this.time = new Q.Text({font:"28px arial", color:color,x:200,y:15, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.setTime(0);
		
		this.scores = new Q.Text({font:"28px arial", color:color,x:400,y:15, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.setScores(0);
		
		this.addChild(this.background,this.fps,this.time,this.scores,this.btn_play,this.btn_back);
	}; //UI层
	Q.inherit(LayerUI, Q.DisplayObjectContainer);
	
	LayerUI.prototype.setFPS = function(fps){
		this.fps.text = "FPS："+fps;
	};
	LayerUI.prototype.setTime = function(seconds){
		this.time.text = "时间："+seconds+"s";
	};
	LayerUI.prototype.setScores = function(scores){
		this.scores.text = "分数："+scores+"分";
	};
	
	
	var LayerGame = window.LayerGame = function(props){
		this.scene = null;
		
		Q.merge(this, props);
		LayerGame.superClass.constructor.call(this,props);
	}; //游戏场景层
	Q.inherit(LayerGame, Q.DisplayObjectContainer);
	
	
	var LayerMessage = window.LayerMessage = function(props){
		this.scene = null;
		
		Q.merge(this, props);
		LayerMessage.superClass.constructor.call(this,props);
		this.init();
		
	}; // 消息层
	Q.inherit(LayerMessage, Q.DisplayObjectContainer);
	
	LayerMessage.prototype.init = function(){
		var me = this;
		
		this.bg_stastic = new Q.GameElement(R.bg_stastic);
		this.bg_stastic.x = 400;
		this.bg_stastic.y = 240;
		this.bg_stastic.scaleX = 0;
		this.bg_stastic.scaleY = 0;
		this.shadow = new Q.Bitmap({image:createRect(800,480,"#654"),rotation:0,alpha:0.2,width:800,height:480});
		
		this.btn_play = new Q.Button(R.btn_play);
		this.btn_play.x = 380;
		this.btn_play.y = 315;
		this.btn_play.removeAllEventListeners();
		this.btn_play.addEventListener("mouseup",function(){
			me.scene.restartGame();
			me.hideStastic();
			});
		
		this.btn_back = new Q.Button(R.btn_back);
		this.btn_back.x = 425;
		this.btn_back.y = 315;
		this.btn_back.removeAllEventListeners();
		this.btn_back.addEventListener("mouseup",function(){
			
			//me.hideStastic();
			});
		
		this.hideCount = new Q.Text({font:"36px arial",text:"543", x:190,y:230, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.repelCount = new Q.Text({font:"36px arial", text:"435",x:190,y:155, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.frozenCount = new Q.Text({font:"36px arial",text:"435", x:370,y:155, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.timeText = new Q.Text({font:"36px arial", text:"435",x:350,y:230, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		this.totalText = new Q.Text({font:"36px arial", text:"435",x:190,y:310, width:200, height:100, lineWidth:200, lineSpacing:0, textAlign:"left"});
		
		this.tween = new Q.Text({font:"36px arial",color:"#f00", width:200, height:50, lineWidth:200, lineSpacing:0, textAlign:"center"});	
		
		this.bg_stastic.addChild(this.btn_play,this.btn_back,this.repelCount,this.hideCount,this.frozenCount,this.timeText,this.totalText);
	};
	
	LayerMessage.prototype.showStastic = function(gameData){
		var me = this, s;
		this.addChild(this.shadow,this.bg_stastic);
		gameData.currentScore = gameData.targetScore;
		Q.Tween.to(this.bg_stastic,{scaleX:1,scaleY:1,rotation:360},{time:500,onComplete:function(){
			me.tween.x = me.repelCount.x+50;
			me.tween.y = me.repelCount.y-20;
			s = gameData.propRepelCount*50;
			me.tween.text = "+"+s;
			
			Q.Tween.to(me.tween, {y:me.repelCount.y-100,alpha:0}, {delay:500,time:1000,onStart:function(){
				me.addChild(me.tween);
			},onComplete:function(){
				me.removeChild(me.tween);
				me.tween.alpha = 1;
				gameData.targetScore += s;
				
				me.tween.x = me.frozenCount.x+50;
				me.tween.y = me.frozenCount.y-20;
				s = gameData.propFrozenCount*30;
				me.tween.text = "+"+s;
				
				Q.Tween.to(me.tween, {y:me.frozenCount.y-100,alpha:0}, {delay:500,time:1000,onStart:function(){
					me.addChild(me.tween);
				},onComplete:function(){
					me.removeChild(me.tween);
					me.tween.alpha = 1;
					gameData.targetScore += s;
					
					me.tween.x = me.hideCount.x+50;
					me.tween.y = me.hideCount.y-20;
					s = gameData.propHideCount*40;
					me.tween.text = "+"+s;
					
					Q.Tween.to(me.tween, {y:me.hideCount.y-100,alpha:0}, {delay:500,time:1000,onStart:function(){
						me.addChild(me.tween);
					},onComplete:function(){
						me.removeChild(me.tween);
						me.tween.alpha = 1;
						gameData.targetScore += s;
						
						me.tween.x = me.timeText.x+50;
						me.tween.y = me.timeText.y-20;
						s = gameData.time*10;
						me.tween.text = "+"+s;
						
						Q.Tween.to(me.tween, {y:me.timeText.y-100,alpha:0}, {delay:500,time:1000,onStart:function(){
							me.addChild(me.tween);
						},onComplete:function(){
							me.removeChild(me.tween);
							me.tween.alpha = 1;
							gameData.targetScore += s;
							trace("stastic end");
							
						}});
					}});
				}});
			}});
		}});
	};
	
	LayerMessage.prototype.hideStastic = function(){
		var me = this;
		Q.Tween.to(this.bg_stastic,{scaleX:0,scaleY:0,rotation:0},{time:500,onComplete:function(){
			me.removeAllChildren();
		}});
	};
	
	LayerMessage.prototype.stastic = function(gameData){
		this.hideCount.text = ""+gameData.propHideCount;
		this.repelCount.text = ""+gameData.propRepelCount;
		this.frozenCount.text = ""+gameData.propFrozenCount;
		this.timeText.text = ""+gameData.time+"秒";
		this.totalText.text = ""+gameData.currentScore+"分";
		if(gameData.currentScore<gameData.targetScore)gameData.currentScore+=10;
	};
	
	
})(Quark);