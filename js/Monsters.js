(function(Q){
	var Monsters = window.Monsters = function(props){
		this.velocityRatio = 1.5;
		this.layerParent == null;
		this.size = 0;
		this.monsters = [];
		
		Q.merge(this, props);
		this.init();
	};
	
	Monsters.prototype.init = function(){
		if(this.size<=0) this.size = 5;
		this.addMonsters(this.size);
	};
	
	Monsters.prototype.addMonsters = function(size){
		for(var i = 0;i<size;i++){
			var m = new Monster(
					{	
						manager:this,
						x:random(150,650),
						y:random(100,450),
						v:{x:Math.cos(random(1,359))*2,y:Math.sin(random(1,359)*2)},
					}
					);
			this.monsters.push(m);
			this.layerParent.addChild(m);
		}
		this.size = this.monsters.length;
	};
	
	Monsters.prototype.removeMonster = function(m){
		this.layerParent.removeChild(m);
		this.monsters.deleteBy(m);
		this.size = this.monsters.length;
	};
	
	Monsters.prototype.removeAllMonsters = function(){
		for(var i = 0;i<this.monsters.length;i++){
			this.removeMonster(this.monsters[i]);
			i--;
		}
		this.size = 0;
	};
	
	Monsters.prototype.usingFrozen = function(){
		for(var i = 0;i<this.monsters.length;i++){
			var m = this.monsters[i];
			if(m.state != "normal")continue;
			m.frozen();
		}
		return false;
	};
	Monsters.prototype.usingRepel = function(){
		for(var i = 0;i<this.monsters.length;i++){
			var m = this.monsters[i];
			if(m.state != "normal")continue;
			m.exit();
			return true;
		}
		return false;
	};
	//进化一个僵尸
	Monsters.prototype.evolveOne = function(){
		for(var i = this.monsters.length - 1;i>=0;i--){
			var m = this.monsters[random(0,this.monsters.length-1)];
			if(m.state != "normal")continue;
			if(m.evolve())return true;
		}
		return false;
	};
	/**
	 * AI根据玩家与怪物的直线距离，如果距离小于预定值，这里设为150，怪物将发现玩家，否则，怪物丢失视野，在场景内自由移动
	 * @param player
	 */
	Monsters.prototype.doAI = function(player){
		var sqrt, vector;
		var nearPlayer = [];
		if(player.state == "walk"){
			var fpl = 100/this.monsters.length;
			for(var i = 0;i<this.monsters.length;i++){
				var m = this.monsters[i];
				vector = {x:player.x - m.x +0.1, y:player.y - m.y+0.1};
				sqrt = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
				if(sqrt<m.level*30+100){
					/**
					 * 发现玩家时怪物更新速度
					 * @author qiuzht
					 */
					nearPlayer.push({i:i, sqrt:sqrt});
					m.lostTarget  = 0;
					m.getTarget++;
	//				this.mUpdateV1(i,player, sqrt*5/200);
				}else{
					/**
					 * 丢失后怪物更新速度
					 * @author qiuzht 
					 */
					m.lostTarget ++;
					m.getTarget = 0;
					if(m.lostTarget==1){//记录第一次丢失目标
						this.mUpdateV2(i, player);
					}
					if (m.lostTarget % 100 == Math.round(fpl*i)) {
						//trace('update '+i+'   '+this.monsters.length+'  '+fpl+'   '+ m.lostTarget );
						this.mUpdateV2(i, player);
					}
				}
			}
			/**
			 * 实现围剿
			 * @author qiuzht
			 */
			for (var i = 0; i < nearPlayer.length; ++i) {
				if (this.monsters[nearPlayer[i].i].getTarget % 2 == 1) {
					this.mUpdateV1(nearPlayer[i].i, player, nearPlayer, nearPlayer[i].sqrt*5/200);
				}
			}
		}else if (player.state == "hide"){
			// hide 
			var fpl = 100/this.monsters.length;
			for(var i = 0;i<this.monsters.length;i++){
				var m = this.monsters[i];
				m.lostTarget ++;
				m.getTarget = 0;
				if(m.lostTarget==1){//记录第一次丢失目标
					this.mUpdateV2(i, player);
				}
				if (m.lostTarget % 100 == Math.round(fpl*i)) {
					//trace('update '+i+'   '+this.monsters.length+'  '+fpl+'   '+ m.lostTarget );
					this.mUpdateV2(i, player);
				}
			}
		}
	};
	Monsters.prototype.hitTestWithPlayer = function(player){
		var hits = 0;
		if(player.state != "walk") return 0;
		for(var i = 0;i<this.monsters.length;i++){
			var m = this.monsters[i];
			if(m.state!="normal")continue;
			if(m.getCollisionObj().hitTestObject(player.getCollisionObj(),true))hits++;
		}
		return hits;
	};
	Monsters.prototype.hitTestWithObstacles = function(obstacles){
		var hits = 0;
		
		for(var i = 0;i<this.monsters.length;i++){
			var m = this.monsters[i];
			if(m.state!="normal")continue;
			
			for(var j = 0;j<obstacles.obstacles.length;j++){
				var o = obstacles.obstacles[j];
				if(o.state!="normal")continue;
				if(m.getCollisionObj().hitTestObject(o.getCollisionObj(),true)){
					switch(o.type){
					case "stone":
						m.reset();
						m.v.x = -m.v.x;
						m.v.y = -m.v.y;
						break;
					case "stick":
						break;
					}
					hits++;
				}
			}
		}
		return hits;
	};
	
	
	Monsters.prototype.update = function(){
		
		for(var i = 0;i<this.monsters.length;i++){
			var m = this.monsters[i];
			m.stepFrame();
		}
		
	};
	Monsters.prototype.mUpdateV1 = function(i, player, nearPlayer, ratio) {    //怪物更新速度，离玩家较近时
		var sqrt, vector;
		var m = this.monsters[i];
		var vx = 0, vy = 0;

		vector = {x:player.x + (player.x-player.oldp.x)*ratio - m.x +0.1, y:player.y + (player.y-player.oldp.y)*ratio - m.y+0.1};
		sqrt = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
		
		if (nearPlayer.length > 1 && m.getTarget % 20 == 19) {

			var dist;
			for (var j = 0;j < nearPlayer.length; ++j) {
				if (i != nearPlayer[j].i) {

					dist = Math.sqrt((m.x-this.monsters[nearPlayer[j].i].x)*(m.x-this.monsters[nearPlayer[j].i].x)+(m.y-this.monsters[nearPlayer[j].i].y)*(m.y-this.monsters[nearPlayer[j].i].y));
					vx += (m.x-this.monsters[nearPlayer[j].i].x)/dist/dist;
					vy += (m.y-this.monsters[nearPlayer[j].i].y)/dist/dist;
				}
			}
			vx *= 0.5;
			vx -= vector.x/sqrt*vx;
			vy -= vector.y/sqrt*vy;			
			dist = Math.sqrt(vx*vx+vy*vy);

			//trace('prev: x: '+vector.x+'  y: '+vector.y);

			var r = Math.random();
			vector.x += vx/dist*sqrt*r;
			vector.y += vy/dist*sqrt*r;
			//trace('now: x: '+vector.x+'  y: '+vector.y);
			sqrt = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
				

		}
		

		//trace("v: x: "+player.x+"  y: "+player.y+"  oldx: "+player.oldp.x+"  oldy: "+player.oldp.y);
		vsqrt = Math.sqrt(m.v.x*m.v.x+m.v.y*m.v.y);
		vector.x = m.v.x/vsqrt*0.6+vector.x/sqrt*0.4;
		vector.y = m.v.y/vsqrt*0.6+vector.y/sqrt*0.4;
		sqrt = Math.sqrt(vector.x*vector.x+vector.y*vector.y);
		m.v = {x:(vector.x/sqrt)*this.velocityRatio*m.level,y:(vector.y/sqrt)*this.velocityRatio*m.level};		
	};
	
	Monsters.prototype.mUpdateV2 = function(i, player){   //怪物更新速度，离玩家较远时
		var vx = 0, vy = 0;
		var m = this.monsters[i];
		var angle = random(0,359);
		var r = random(30,100)/100.0;
		m.v = {x:Math.cos(angle)*this.velocityRatio*r*m.level,y:Math.sin(angle)*this.velocityRatio*r*m.level};  //随机速度	
		//trace('sudu: '+m.v.x+'  '+m.v.y);
		
		for (var j = 0; j < this.monsters.length; ++j) {
			if (j != i) {
				var dist = 1.0/Math.sqrt((m.x-this.monsters[j].x)*(m.x-this.monsters[j].x)+(m.y-this.monsters[j].y)*(m.y-this.monsters[j].y));
				vx += (m.x-this.monsters[j].x)*dist*dist;
				vy += (m.y-this.monsters[j].y)*dist*dist;
			}
		}
		if ( m.y < 80+80 )
			vy *= (m.y-80)/80;
		else if (m.x > 480-80)
			vy *= (480-m.y)/80;
		if (m.x < 100) 
			vx = 0;
		else if (m.x < 100+80) 
			vx *= (m.x-100)/80;
		else if (m.x > 700)
			vx = 0;
		else if (m.x >700-80)
			vx *= (700-m.x)/80;
		m.v.x += vx*10;
		m.v.y += vy*10;
		if (m.lostTarget > 200) {
			var dtx = player.x-m.x, dty = player.y-m.y;
			var dist = Math.sqrt(dtx*dtx+dty*dty);
			m.v.x += dtx/dist*m.level*0.2*Math.log(m.lostTarget);
			m.v.y += dty/dist*m.level*0.2*Math.log(m.lostTarget);
		}
		var velocity = Math.sqrt(m.v.x*m.v.x+m.v.y*m.v.y);
		//trace(' x:  '+m.v.x+' y: '+m.v.y);
		var r = random(50,100)/100.0;
		if (velocity > m.level*this.velocityRatio*r) {
			m.v.x = m.v.x / velocity * (m.level*this.velocityRatio*r);
			m.v.y = m.v.y / velocity * (m.level*this.velocityRatio*r);
		}
		//trace('level: '+m.level+'velocity: '+velocity+' x:  '+m.v.x+' y: '+m.lostTarget);
	};
	
	
	
	
	
	var Monster = function(params){	
		this.lostTarget = 0;
		this.getTarget = 0;
		this.state = "entrance";//怪兽的过场状态，最多有6种：进场(entrance)、正常(normal)、冰冻(frozen)、离场(exit)、进化(evolve)、死亡状态(dead)
		
		Q.merge(this, params);

		this.level = 1;//怪兽的级别，包括1,2,3级
		this.frozenFrames = 0;
		
		Monster.superClass.constructor.call(this,params);
		this.init();
	};
	Q.inherit(Monster, Q.GameElement);
	
	Monster.maxFrozenFrames = 100;
	
	Monster.prototype.init = function(){
		//初始化怪物动画数据
		/*
		 * 例如：this.monster1_normal_left:表示怪物等级1时的进场动画
		 * */
		var me = this;
		this.monster1_normal_left = new Q.MovieClip(R.monster1.normal_left);//ok
		this.monster1_normal_right = new Q.MovieClip(R.monster1.normal_right);//ok
		this.monster1_entrance_right = new Q.MovieClip(R.monster1.entrance_right);//ok
		this.monster1_entrance_right.addEventListener("loopend",function(){
			me.switchAnim(me.monster1_normal_right);
			me.state = "normal";
			me.level = 1;
		});
		this.monster1_entrance_left = new Q.MovieClip(R.monster1.entrance_left);//ok
		this.monster1_entrance_left.addEventListener("loopend",function(){
			me.switchAnim(me.monster1_normal_left);
			me.state = "normal";
			me.level = 1;
		});
		
		this.monster1_evolve_left = new Q.MovieClip(R.monster1.evolve_left);//ok
		this.monster1_evolve_left.addEventListener("loopend",function(){
			me.switchAnim(me.monster2_normal_left);
			me.state = "normal";
			me.level = 2;
		});
		this.monster1_evolve_right = new Q.MovieClip(R.monster1.evolve_right);//ok
		this.monster1_evolve_right.addEventListener("loopend",function(){
			me.switchAnim(me.monster2_normal_right);
			me.state = "normal";
			me.level = 2;
		});
		this.monster1_frozen_left = new Q.MovieClip(R.monster1.frozen_left);//ok
		this.monster1_frozen_right= new Q.MovieClip(R.monster1.frozen_right);//ok
		
		this.monster1_exit_left = new Q.MovieClip(R.monster1.exit_left);//ok
		this.monster1_exit_left.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
			//me.manager.addMonsters(1);
			//trace("end");
		});
		this.monster1_exit_right = new Q.MovieClip(R.monster1.exit_right);//ok
		this.monster1_exit_right.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
			//me.manager.addMonsters(1);
			//trace("end");
		});
		
		
		this.monster2_normal_left = new Q.MovieClip(R.monster2.normal_left);//ok
		this.monster2_normal_right = new Q.MovieClip(R.monster2.normal_right);//ok
		
		this.monster2_frozen_left = new Q.MovieClip(R.monster2.frozen_left);//ok
		this.monster2_frozen_right= new Q.MovieClip(R.monster2.frozen_right);//ok
		
		this.monster2_exit_left = new Q.MovieClip(R.monster2.exit_left);//ok
		this.monster2_exit_left.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
		});
		this.monster2_exit_right = new Q.MovieClip(R.monster2.exit_right);//ok
		this.monster2_exit_right.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
		});
		
		this.monster2_evolve_left = new Q.MovieClip(R.monster2.evolve_left);//ok
		this.monster2_evolve_left.addEventListener("loopend",function(){
			me.switchAnim(me.monster3_normal_left);
			me.state = "normal";
			me.level = 3;
		});
		this.monster2_evolve_right = new Q.MovieClip(R.monster2.evolve_right);//ok
		this.monster2_evolve_right.addEventListener("loopend",function(){
			me.switchAnim(me.monster3_normal_right);
			me.state = "normal";
			me.level = 3;
		});
		
		
		this.monster3_normal_left = new Q.MovieClip(R.monster3.normal_left);//ok
		this.monster3_normal_right = new Q.MovieClip(R.monster3.normal_right);//ok
		
		this.monster3_frozen_left = new Q.MovieClip(R.monster3.frozen_left);//ok
		this.monster3_frozen_right= new Q.MovieClip(R.monster3.frozen_right);//ok
		
		this.monster3_exit_left = new Q.MovieClip(R.monster3.exit_left);//ok
		this.monster3_exit_left.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
		});
		this.monster3_exit_right = new Q.MovieClip(R.monster3.exit_right);//ok
		this.monster3_exit_right.addEventListener("loopend",function(){
			me.manager.removeMonster(me);
		});
		
		this.scale();
		this.entrance();
		
	};
	Monster.prototype.entrance = function(){
		this.state = "entrance";
		if(random(1,100)%2 == 1){
			this.direction = "left";
			this.switchAnim(this.monster1_entrance_left);
		}else{
			this.direction = "right";
			this.switchAnim(this.monster1_entrance_right);
		}
	};
	
	Monster.prototype.exit = function(){
		this.state = "exit";
		switch(this.level){
		case 1:
			if(this.direction == "left")this.switchAnim(this.monster1_exit_left);
			else this.switchAnim(this.monster1_exit_right);
			break;
		case 2:
			if(this.direction == "left")this.switchAnim(this.monster2_exit_left);
			else this.switchAnim(this.monster2_exit_right);
			break;
		case 3:
			if(this.direction == "left")this.switchAnim(this.monster3_exit_left);
			else this.switchAnim(this.monster3_exit_right);
			break;
		}
	};
	
	Monster.prototype.normal = function(){
		this.state = "normal";
		switch(this.level){
		case 1:
			if(this.direction == "left")this.switchAnim(this.monster1_normal_left);
			else this.switchAnim(this.monster1_normal_right);
			break;
		case 2:
			if(this.direction == "left")this.switchAnim(this.monster2_normal_left);
			else this.switchAnim(this.monster2_normal_right);
			break;
		case 3:
			if(this.direction == "left")this.switchAnim(this.monster3_normal_left);
			else this.switchAnim(this.monster3_normal_right);
			break;
		}
	};
	
	Monster.prototype.evolve = function(){
		this.state = "evolve";
		switch(this.level){
		case 1:
			if(this.direction == "left")this.switchAnim(this.monster1_evolve_left);
			else this.switchAnim(this.monster1_evolve_right);
			return true;
		case 2:
			if(this.direction == "left")this.switchAnim(this.monster2_evolve_left);
			else this.switchAnim(this.monster2_evolve_right);
			return true;
		}
		this.state = "normal";
		return false;
	};
	
	Monster.prototype.frozen = function(){
		this.state = "frozen";
		this.frozenFrames = 0;
		switch(this.level){
		case 1:
			if(this.direction == "left")this.switchAnim(this.monster1_frozen_left);
			else this.switchAnim(this.monster1_frozen_right);
			break;
		case 2:
			if(this.direction == "left")this.switchAnim(this.monster2_frozen_left);
			else this.switchAnim(this.monster2_frozen_right);
			break;
		case 3:
			if(this.direction == "left")this.switchAnim(this.monster3_frozen_left);
			else this.switchAnim(this.monster3_frozen_right);
			break;
		}
	};
	
	/**
	 * 怪物根据当前的速度移动一步
	 */
	Monster.prototype.move = function(){
		var ratio = this.scale();
		this.oldp.x = this.x;
		this.oldp.y = this.y;
		
		this.x += this.v.x * ratio;
		this.y += this.v.y * ratio;
		
		if(this.v.x!=0){
			if(this.v.x<0){
				if(this.direction!="left"){
					this.direction = "left";
					switch(this.level){
					case 1:
						this.switchAnim(this.monster1_normal_left);
						break;
					case 2:
						this.switchAnim(this.monster2_normal_left);
						break;
					case 3:
						this.switchAnim(this.monster3_normal_left);
						break;
					}
					
				}
			}else{
				if(this.direction!="right"){
					this.direction = "right";
					switch(this.level){
					case 1:
						this.switchAnim(this.monster1_normal_right);
						break;
					case 2:
						this.switchAnim(this.monster2_normal_right);
						break;
					case 3:
						this.switchAnim(this.monster3_normal_right);
						break;
					}
				}
			}
		}
	};
	
	Monster.prototype.stepFrame = function(){
		switch(this.state){
		case "entrance":
			break;
		case "normal":
			this.move();
			break;
		case "frozen":
			this.frozenFrames++;
			if(this.frozenFrames>=Monster.maxFrozenFrames){
				this.visible = true;
				this.frozenFrames = 0;
				this.normal();
			}else{
				var p80 = 0.8*Monster.maxFrozenFrames;
				if(this.frozenFrames>p80){
					this.visible = (this.frozenFrames%4==1)?false:true;
				}else{
					this.visible = true;
				}
			}
			
			break;
		case "exit":
			
			break;
		case "evolve":
			
			break;
		}
	};
})(Quark);