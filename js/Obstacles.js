(function(Q){
	/**
	 * 障碍物管理器
	 */
	var Obstacles = window.Obstacles = function(params){
		this.layerParent = null;
		this.size = 0;
		this.obstacles = [];
		
		Q.merge(this, params);
		this.init();
	};
	Obstacles.prototype.init = function(){
		if(this.size<0) this.size = 0;
		this.addObstacles(this.size);
	};
	
	Obstacles.prototype.addObstacles = function(size){
		var me = this;
		var type;
		for(var i = 0;i<size;i++){
			if(random(1,10)%2 == 0) type="stick";
			else type = "stone";
			var m = new Obstacle(
					{
						manager:me,
						x:random(150,650),
						y:random(100,450),
						type:type,
						v:{x:Math.cos(random(1,359))*2,y:Math.sin(random(1,359)*2)},
					}
					);
			this.obstacles.push(m);
			this.layerParent.addChild(m);
		}
		this.size = this.obstacles.length;
	};
	
	Obstacles.prototype.removeObstacle = function(m){
		this.layerParent.removeChild(m);
		this.obstacles.deleteBy(m);
		this.size = this.obstacles.length;
	};
	
	Obstacles.prototype.removeAllObstacles = function(){
		for(var i = 0;i<this.obstacles.length;i++){
			this.removeObstacle(this.obstacles[i]);
			i--;
		}
		this.size = 0;
	};
	
	Obstacles.prototype.update = function(){
		for(var i = 0;i<this.obstacles.length;i++){
			this.obstacles[i].stepFrame();
		}
	};
	
	Obstacles.prototype.hitTestWithPlayer = function(player){
		if(player.state != "walk"){
			return 0;
		}
		for(var i = 0;i<this.obstacles.length;i++){
			var o = this.obstacles[i];
			if(o.state!="normal") continue;
			if(o.getCollisionObj().hitTestObject(player.getCollisionObj())){
				switch(o.type){
				case "stone":
					player.reset();
					break;
				case "stick":
					player.reset(0.7);
					break;
				}
			}
		}
	};
	
	/**
	 * 障碍物类，继承至Q.GameElement
	 */
	var Obstacle = function(params){
		this.state = "in";
		this.liveFrames = 0;//障碍物的生存帧数
		this.type = "stone";
		Q.merge(this, params);
		Obstacle.superClass.constructor.call(this,params);
		this.init();
	};
	Q.inherit(Obstacle,Q.GameElement);
	
	Obstacle.maxLiveFrames = 300;
	
	Obstacle.prototype.init = function(){
		var me = this;
		this.ot_stone_normal = new Q.MovieClip(R.obstacle.stone_normal);
		this.ot_stone_in = new Q.MovieClip(R.obstacle.stone_in);
		this.ot_stone_in.addEventListener("loopend",function(){
			me.state = "normal";
			me.switchAnim(me.ot_stone_normal);
			me.manager.layerParent.scene.resortGameElements();
		});
		this.ot_stone_out = new Q.MovieClip(R.obstacle.stone_out);
		this.ot_stone_out.addEventListener("loopend",function(){
			me.manager.removeObstacle(me);
		});
		
		this.ot_stick_in = new Q.MovieClip(R.obstacle.stick_in);
		this.ot_stick_in.addEventListener("loopend",function(){
			me.state = "normal";
			me.switchAnim(me.ot_stick_normal);
			me.manager.layerParent.scene.resortGameElements();
		});
		
		this.ot_stick_normal = new Q.MovieClip(R.obstacle.stick_normal);
		this.ot_stick_out = new Q.MovieClip(R.obstacle.stick_out);
		this.ot_stick_out.addEventListener("loopend",function(){
			me.manager.removeObstacle(me);
		});
		
		this.scale();
		switch(this.type){
		case "stick":
			this.switchAnim(this.ot_stick_in);
			break;
		case "stone":
			this.switchAnim(this.ot_stone_in);
			break;
		}
		
	};
	
	Obstacle.prototype.stepFrame = function(){
		this.liveFrames++;
		if(this.liveFrames>=Obstacle.maxLiveFrames){
			this.visible = true;
			this.liveFrames = 0;
			this.state = "out";
			switch(this.type){
			case "stone":
				this.switchAnim(this.ot_stone_out);
				break;
			case "stick":
				this.switchAnim(this.ot_stick_out);
				break;
			};
			
		}else{
			var p80 = 0.8*Obstacle.maxLiveFrames;
			if(this.liveFrames>p80){
				this.visible = (this.liveFrames%4==1)?false:true;
			}else{
				this.visible = true;
			}
		}
	};
})(Quark);
