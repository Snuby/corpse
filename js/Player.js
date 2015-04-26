(function(Q){
	var Player = window.Player = function(props){
		this.layerParent = null;
		this.hideFrames = 0;
		
		this.state = "walk";// 包括stand,walk,hide动画，falldown动画

		Q.merge(this,props);
		
		Player.superClass.constructor.call(this,props);
		this.init();
		
	};
	Q.inherit(Player, Q.GameElement);
	
	Player.maxV = 8;
	Player.maxHideFrames = 150;
	
	Player.prototype.init = function(){
		var me = this;
		var p = this.layerParent;
		this.scale();
		
		this.walk_left = new Q.MovieClip(R.player.walk_left);//ok
		this.walk_left.addEventListener("loopend",function(){
			//me.switchAnim(me.falldown_left);
		});
		
		this.walk_right = new Q.MovieClip(R.player.walk_right);//ok

		this.walk_right.addEventListener("loopend",function(){
			//me.switchAnim(me.falldown_right);
		});
		
		this.stand_left = new Q.MovieClip(R.player.stand_left);//ok
		this.stand_right = new Q.MovieClip(R.player.stand_right);//ok
		this.hide_left = new Q.MovieClip(R.player.hide_left);//ok
		
		this.hide_right = new Q.MovieClip(R.player.hide_right);//ok
		
		this.falldown_left = new Q.MovieClip(R.player.falldown_left);//ok
		this.falldown_left.addEventListener("loopend",function(){
			me.falldown_left.gotoAndPlay("cry");
		});
		this.falldown_right = new Q.MovieClip(R.player.falldown_right);//ok
		this.falldown_right.addEventListener("loopend",function(){
			me.falldown_right.gotoAndPlay("cry");
		});
		
		this.stand();
		
		this.layerParent.addChild(me);
		
	};
	Player.prototype.falldown = function(){
		this.state = "falldown";
		if(this.direction == "left"){
			this.switchAnim(this.falldown_left);
		}else{
			this.switchAnim(this.falldown_right);
		}
	};
	
	Player.prototype.hide = function(){
		
		this.state = "hide";
		this.hideFrames = 0;
		if(this.direction == "left"){
			this.switchAnim(this.hide_left);
		}else{
			this.switchAnim(this.hide_right);
		}
	};
	
	Player.prototype.stand = function(){
		this.state = "stand";
		if(this.direction == "left"){
			this.switchAnim(this.stand_left);
		}else{
			this.switchAnim(this.stand_right);
		}
	};
	
	Player.prototype.walk = function(){
		this.state = "walk";
		if(this.direction == "left"){
			this.switchAnim(this.walk_left);
		}else{
			this.switchAnim(this.walk_right);
		}
	};
	
	Player.prototype.move = function(){
		if(this.state == "hide"){
			this.hideFrames++;
			if(this.hideFrames>=Player.maxHideFrames){
				this.visible = true;
				this.hideFrames = 0;
				this.walk();
			}else{
				var p80 = 0.8*Player.maxHideFrames;
				if(this.hideFrames>p80){
					this.visible = (this.hideFrames%4==1)?false:true;
				}else{
					this.visible = true;
				}
			}
		}
		
		var ratio = this.scale();
		this.oldp.x = this.x;
		this.oldp.y = this.y;
		
		this.x += this.v.x * ratio;
		this.y += this.v.y * ratio;
		
		if(this.v.x!=0){
			if(this.v.x<0){
				if(this.direction!="left"){
					this.direction = "left";
					if(this.state == "hide"){
						this.switchAnim(this.hide_left);
					}else {
						this.switchAnim(this.walk_left);
					}
				}
			}else{
				if(this.direction!="right"){
					this.direction = "right";
					if(this.state == "hide"){
						this.switchAnim(this.hide_right);
					}else {
						this.switchAnim(this.walk_right);
					}
				}
			}
		}
		
	};
	
})(Quark);