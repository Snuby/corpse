

/*var W = 800, H = 480;
(function(Q){
	var Wall = window.Wall = function(props){
		this.wall = null;
		Wall.superClass.constructor.call(this,props);
		this.init();
	};
	Q.inherit(Wall, Q.DisplayObjectContainer);
	
	Wall.prototype.init = function(){
		var wall_left = new Q.Bitmap({id:"wall_left", x:0, y:80,alpha:0.2, image:createRect(100, 400, "#324")});
		wall_left.polyArea = [{x:0,y:0},{x:100,y:0},{x:0,y:400}];
		
		var wall_right = new Q.Bitmap({id:"wall_right", x:700, y:80, alpha:0.2,image:createRect(100, 400, "#643")});
		wall_right.polyArea = [{x:0,y:0},{x:100,y:0},{x:100,y:400}];
		
		
		var wall_top = new Q.Bitmap({id:"wall_top", x:2, y:2,alpha:0.2, image:createRect(798, 78, "#285")});
		var wall_bottom = new Q.Bitmap({id:"wall_bottom", x:0, y:478, alpha:0.2,image:createRect(800, 2, "#978")});
		
		this.addChild(wall_top,wall_bottom,wall_left,wall_right);
	};
	
	Wall.prototype.hitTest = function(target){
		var hitWall = new Array();
		for(var i=0;i<this.children.length; i++){
			var ch = this.getChildAt(i);
			if(ch.hitTestObject(target,true)){
				hitWall.push(ch.id);
			}
		}
		if(hitWall.length>0)trace(hitWall.length);
		return hitWall.length>0?{isHit:true,hitWall:hitWall}:{isHit:false};
		
	};
	
})(Quark);

(function(Q){
	var Player = window.Player = function(props){
		this.v = {x:0,y:0};
		
		this.walk = null;
		
		Q.merge(this,props);
		this.oldp = {x:this.x,y:this.y};
		
		Player.superClass.constructor.call(this,props);
		this.init();
		
	};
	Q.inherit(Player, Q.DisplayObjectContainer);
	
	Player.maxV = 8;
	
	Player.prototype.init = function(){
		this.walk = new Q.MovieClip({
			id:"player_walk",
			image:Q.getDOM("player_walk"),
			useFrames:true,
			interval:2,
			x:0,
			y:0
		});
		this.walk.addFrame([
		                    {rect:[0,0,50,87]},
		                    {rect:[50,0,50,87]},
		                    {rect:[100,0,50,87]},
		                    {rect:[150,0,50,87]},
		                    {rect:[200,0,50,87]},
		                    {rect:[250,0,50,87]},
		                    {rect:[300,0,50,87]},
		                    {rect:[350,0,50,87]}
		                    ]);
		this.addChild(this.walk);
		
		this.walk.polyArea = [{x:25,y:73},{x:50,y:80},{x:25,y:87},{x:0,y:80}];
		
	};
	
	Player.prototype.move = function(){
		var ratio = 0.75+0.25*(this.y-80)/400;
		this.oldp.x = this.x;
		this.oldp.y = this.y;
		
		this.x += this.v.x * ratio;
		this.y += this.v.y * ratio;
		
		this.scaleX = ratio;
		this.scaleY = ratio;
	};
	
	Player.prototype.reset = function(){
		this.x = this.oldp.x;
		this.y = this.oldp.y;
	};
	
	Player.prototype.getCollisionObj = function(){
		return this.walk;
	};
	
})(Quark);

var container,context,stage,timer,em,events,frames = 0,player,wall,fpsContainer;

(function(Q){

	window.onload = init;
	window.addEventListener("keydown",onkeydown);
	window.addEventListener("keyup",onkeyup);
	
	function init(){
		container = Q.getDOM("container");
		params = Q.getUrlParams();
		params.canvas = true;
		if(params.canvas){
			var canvas = Q.createDOM("canvas", {width:W,height:H,style:{position:"relative",x:"0px",y:"0px",width:W+"px",height:H+"px",backgroundcolor:"#abc"}});
			container.appendChild(canvas);
			context = new Q.CanvasContext({canvas:canvas});
		}else{
			context = new Q.DOMContext({canvas:container});
			
		}
		fpsContainer = Quark.getDOM("fps");
		
		stage = new Q.Stage({
			context:context,
			width:W,
			height:H,
			update:Update
		});
		Q.toggleDebugRect(stage);
		
		
		em = new Q.EventManager();
		events = Q.supportTouch?["touchend"]:["mouseup"];
		
		em.registerStage(stage,events,true,true);
		
		
		player = new Player({
			id:"player",
			x:200,
			y:50,
			v:{x:0,y:0},
			autoSize:true
		});
		
		
		wall = new Wall({
			id:"wall",
			x:0,
			y:0,
			autoSize:true
		});
		stage.addChild(wall,player);
		
		timer = new Q.Timer(1000/30);
		timer.addListener(stage);
		timer.start();
	}
	
	function Update(){
		frames++;
		player.move();
				
		var res = wall.hitTest(player.getCollisionObj());
		
		if(res.isHit)trace(res.isHit,res.hitWall);
		if(res.isHit){
			var hitwall;
			while((hitwall = res.hitWall.shift())!=null){
				//player.reset();
				switch(hitwall){
				case "wall_left":
					player.x = player.oldp.x;
					if(player.v.y<0)player.x -= player.v.y/4;
					break;
				case "wall_right":
					player.x = player.oldp.x;
					if(player.v.y<0)player.x += player.v.y/4;
					//player.x = player.oldp.x;
					break;
				case "wall_top":
				case "wall_bottom":
					//player.v.y = -0.2;
					player.y = player.oldp.y;
					break;
				}
			}
			
		}
	};
	
	function onkeydown(e){
		var v = player.v;
		switch(e.keyCode){
		case Q.KEY.LEFT:
			v.x = -Player.maxV;
			break;
		case Q.KEY.RIGHT:
			v.x = Player.maxV;
			break;
		case Q.KEY.UP:
			v.y = -Player.maxV;
			break;
		case Q.KEY.DOWN:
			v.y = Player.maxV;
			break;
		}
		player.v = v;
		trace("down",player.v.x,player.v.y);
	}
	
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
		}
		player.v = v;
		trace("up");
		
	}
	
	setInterval(function()
	{
		fpsContainer.innerText = "FPS:" + frames;
		frames = 0;
	}, 1000);
})(Quark);





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
*/
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
