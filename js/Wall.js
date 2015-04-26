(function(Q){
	var Wall = window.Wall = function(props){
		this.layerParent = null;
		this.wall = null;
		
		Q.merge(this, props);
		
		Wall.superClass.constructor.call(this,props);
		this.init();
	};
	Q.inherit(Wall, Q.DisplayObjectContainer);
	
	Wall.prototype.init = function(){
		var wall_left = new Q.Bitmap(R.wall.left);
		var wall_right = new Q.Bitmap(R.wall.right);
		var wall_top = new Q.Bitmap(R.wall.top);
		var wall_bottom = new Q.Bitmap(R.wall.bottom);
		
		this.addChild(wall_top,wall_bottom,wall_left,wall_right);
		this.layerParent.addChild(this);
	};
	
	Wall.prototype.hitTestWithPlayer = function(player){
		var hitWall = new Array();
		for(var i=0;i<this.children.length; i++){
			var ch = this.getChildAt(i);
			if(ch.hitTestObject(player.getCollisionObj(),true)){
				hitWall.push(ch.id);
			}
		}
		if(hitWall.length>0){
			var hitwall;
			while((hitwall = hitWall.shift())!=null){
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
	
	Wall.prototype.hitTestWithMonsters = function(monsters){
		var ms = monsters.monsters;
		for(var k = 0;k<ms.length;k++){
			var m = ms[k];
			if(m.state!="normal") continue;
			var hitWall = new Array();
			for(var i=0;i<this.children.length; i++){
				var ch = this.getChildAt(i);
				if(ch.hitTestObject(m.getCollisionObj(),true)){
					hitWall.push(ch.id);
				}
			}
			if(hitWall.length>0){
				var hitwall;
				while((hitwall = hitWall.shift())!=null){
					m.reset();
					switch(hitwall){
					case "wall_left":
						m.v.x = (m.v.x<0)?(-m.v.x+1):(m.v.x+1);
						break;
					case "wall_right":
						m.v.x = (m.v.x>0)?(-m.v.x-1):(m.v.x-1);
						break;
					case "wall_top":
					case "wall_bottom":
						m.v.y = -m.v.y;
						break;
					}
				}
			}
		}
	};
	
})(Quark);