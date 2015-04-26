(function(Q){
	var Props = window.Props = function(params){
		this.layerParent = null;
		this.size = 0;
		this.props = [];
		
		Q.merge(this, params);
		this.init();
	};
	Props.prototype.init = function(){
		if(this.size<0) this.size = 0;
		this.addProps(this.size);
	};
	
	Props.prototype.addProps = function(size){
		var me = this;
		for(var i = 0;i<size;i++){
			var p = new Prop(
					{
						manager:me,
						x:random(150,650),
						y:random(100,450)
					}
					);
			this.props.push(p);
			this.layerParent.addChild(p);
		}
		this.size = this.props.length;
	};
	
	Props.prototype.removeProp = function(m){
		this.layerParent.removeChild(m);
		this.props.deleteBy(m);
		this.size = this.props.length;
	};
	
	Props.prototype.removeAllProps = function(){
		for(var i = 0;i<this.props.length;i++){
			this.removeProp(this.props[i]);
			i--;
		}
		this.size = 0;
	};
	Props.prototype.hitTestWithPlayer = function(player,monsters,gameData){
		var hits = 0;
		for(var i = 0;i<this.props.length;i++){
			var p = this.props[i];
			if(p.state!="normal")continue;
			if(p.getCollisionObj().hitTestObject(player.getCollisionObj(),true)){
				p.state = "out";
				hits++;
				switch(p.type){
				case "hide":
					player.hide();
					p.showScore(40);
					gameData.propHideCount++;
					gameData.targetScore += 40;
					p.switchAnim(p.pt_hide_out);
					break;
				case "frozen":
					monsters.usingFrozen();
					p.showScore(30);
					gameData.propFrozenCount ++;
					gameData.targetScore += 30;
					p.switchAnim(p.pt_freeze_out);
					break;
				case "repel":
					monsters.usingRepel();
					p.showScore(50);
					gameData.propRepelCount++;
					gameData.targetScore+=50;
					p.switchAnim(p.pt_repel_out);
					break;
				}
				
				
			}
		}
		return hits;
	};
	
	Props.prototype.update = function(){
		for(var i = 0;i<this.props.length;i++){
			this.props[i].stepFrame();
		}
	};
	
	var Prop = function(params){
		this.state = "normal";//分normal和out两种状态
		this.type = null;
		
		Prop.superClass.constructor.call(this,params);
		this.init();
	};
	Q.inherit(Prop,Q.GameElement);
	Prop.maxLiveFrames = 300;
	
	Prop.prototype.init = function(){
		var me = this;
		this.pt_freeze_normal = new Q.MovieClip(R.prop.pt_freeze_normal);
		this.pt_freeze_out = new Q.MovieClip(R.prop.pt_freeze_out);
		this.pt_freeze_out.addEventListener("loopend",function(){
			me.manager.removeProp(me);
		});
		this.pt_hide_normal = new Q.MovieClip(R.prop.pt_hide_normal);
		this.pt_hide_out = new Q.MovieClip(R.prop.pt_hide_out);
		this.pt_hide_out.addEventListener("loopend",function(){
			me.manager.removeProp(me);
		});
		this.pt_repel_normal = new Q.MovieClip(R.prop.pt_repel_normal);
		this.pt_repel_out = new Q.MovieClip(R.prop.pt_repel_out);
		this.pt_repel_out.addEventListener("loopend",function(){
			me.manager.removeProp(me);
		});
		
		this.textScore = new Q.Text({font:"28px arial",color:"#f00",regX:100,regY:25, width:200, height:50, lineWidth:200, lineSpacing:0, textAlign:"center"});	
		
		this.scale();
		this.liveFrames = 0;
		var x = random(1,120);
		if(x < 40){
			this.type = "hide";
			this.switchAnim(this.pt_hide_normal);
		}else if(x < 90){
			this.type = "frozen";
			this.switchAnim(this.pt_freeze_normal);
		}else{
			this.type = "repel";
			this.switchAnim(this.pt_repel_normal);
		}
	};
	
	Prop.prototype.stepFrame = function(){
		this.liveFrames++;
		if(this.liveFrames>=Prop.maxLiveFrames){
			this.visible = true;
			this.liveFrames = 0;
			this.state = "out";
			this.manager.removeProp(this);
		}else{
			var p80 = 0.8*Prop.maxLiveFrames;
			if(this.liveFrames>p80){
				this.visible = (this.liveFrames%4==1)?false:true;
			}else{
				this.visible = true;
			}
		}
	};
	
	Prop.prototype.showScore = function(score){
		var me = this;
		this.textScore.text = "+"+score;
		this.textScore.x = this.currentAnim.x;
		this.textScore.y = this.currentAnim.y;
		this.addChildAt(this.textScore,0);
		Q.Tween.to(this.textScore,{y:this.currentAnim.y - 100,alpha:0.2},{time:1000,onComplete:function(){
			me.removeChild(me.textScore);
		}});
	};
})(Quark);
