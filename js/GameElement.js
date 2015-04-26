(function(){
	/**
	 * 构造函数.
	 * @name GameElement
	 */
	var GameElement = Quark.GameElement = function(params){
		this.manager = null;//管理器，在monsters、props和obstacles中用到
		this.currentAnim = null;//当前动画
		this.direction = null;//当前方向
		this.v = {x:0,y:0};//速度
		
		Quark.merge(this, params);
		this.oldp ={x:this.v.x,y:this.v.y};
		
		GameElement.superClass.constructor.call(this,params);
		this.id = params.id || Quark.UIDUtil.createUID("GameElement");
		this.init();
		
	};
	Quark.inherit(GameElement, Quark.DisplayObjectContainer);
	
	GameElement.prototype.init = function(){
		
	};

	GameElement.prototype.getCenter = function(){
		return {x:this.currentAnim.regX,y:this.currentAnim.regY};
	};
	
	GameElement.prototype.scale = function(){
		var ratio = 0.75+0.25*(this.y-80)/400;
		this.scaleX = ratio;
		this.scaleY = ratio;
		return ratio;
	};
	
	GameElement.prototype.reset = function(ratio){
		var r = ratio;
		if(r == undefined) r = 1;
		var dx = this.x - this.oldp.x;
		var dy = this.y - this.oldp.y;
		this.x = this.x - r*dx;
		this.y = this.y - r*dy;
	};
	
	GameElement.prototype.getCollisionObj = function(){
		return this.currentAnim;
	};
	
	GameElement.prototype.switchAnim = function(anim){
		if(this.currentAnim == anim) return false;
		this.removeChild(this.currentAnim);
		this.currentAnim = anim;
		this.addChild(this.currentAnim);
	};
})();