(function(Q){
	var R = window.R = {
			resource:{},
			images:{}
	};
	//游戏页资源
	R.resource.sceneGame = [
	                        {id:"background",src:CORPSE.baseUrl+"/images/background.png"},
	                        {id:"bg_stastic",src:CORPSE.baseUrl+"/images/bg_stastic.png"},
	                        
	                        {id:"btn_play",src:CORPSE.baseUrl+"/images/btn_play.png",size:2},
	                        {id:"btn_pause",src:CORPSE.baseUrl+"/images/btn_pause.png",size:2},
	                        {id:"btn_back",src:CORPSE.baseUrl+"/images/btn_back.png",size:2},
	                        
	                        {id:"player_walk_left",src:CORPSE.baseUrl+"/images/bt_walk_left.png", size:51},
	                        {id:"player_walk_right",src:CORPSE.baseUrl+"/images/bt_walk_right.png", size:51},
	                        {id:"player_stand_left",src:CORPSE.baseUrl+"/images/bt_stand_left.png", size:79},
	                        {id:"player_stand_right",src:CORPSE.baseUrl+"/images/bt_stand_right.png", size:79},
	                        {id:"player_falldown_left",src:CORPSE.baseUrl+"/images/bt_falldown_left.png", size:34},
							{id:"player_falldown_right", src:CORPSE.baseUrl+"/images/bt_falldown_right.png", size: 34},
							{id:"player_hide_left", src:CORPSE.baseUrl+"/images/bt_hide_left.png", size:92},
							{id:"player_hide_right", src:CORPSE.baseUrl+"/images/bt_hide_right.png", size:92},
	                        
							{id:"monster1_entrance_left", src:CORPSE.baseUrl+"/images/ms1_entrance_left.png", size: 46},
							{id:"monster1_entrance_right", src:CORPSE.baseUrl+"/images/ms1_entrance_right.png", size: 46},
							{id:"monster1_evolve_left", src:CORPSE.baseUrl+"/images/ms1_evolve_left.png", size: 39},
							{id:"monster1_evolve_right", src:CORPSE.baseUrl+"/images/ms1_evolve_right.png", size: 39},
							{id:"monster1_exit_left", src:CORPSE.baseUrl+"/images/ms1_exit_left.png", size: 50},
							{id:"monster1_exit_right", src:CORPSE.baseUrl+"/images/ms1_exit_right.png", size: 50},
							{id:"monster1_frozen_left", src:CORPSE.baseUrl+"/images/ms1_frozen_left.png", size: 19},
							{id:"monster1_frozen_right", src:CORPSE.baseUrl+"/images/ms1_frozen_right.png", size: 19},
							{id:"monster1_normal_left", src:CORPSE.baseUrl+"/images/ms1_normal_left.png", size: 49},
							{id:"monster1_normal_right", src:CORPSE.baseUrl+"/images/ms1_normal_right.png", size: 49},
							
							/* 怪兽2 */
							{id:"monster2_evolve_left", src:CORPSE.baseUrl+"/images/ms2_evolve_left.png", size: 60},
							{id:"monster2_evolve_right", src:CORPSE.baseUrl+"/images/ms2_evolve_right.png", size: 60},
							{id:"monster2_exit_left", src:CORPSE.baseUrl+"/images/ms2_exit_left.png", size: 50},
							{id:"monster2_exit_right", src:CORPSE.baseUrl+"/images/ms2_exit_right.png", size: 50},
							{id:"monster2_frozen_left", src:CORPSE.baseUrl+"/images/ms2_frozen_left.png", size: 60},
							{id:"monster2_frozen_right", src:CORPSE.baseUrl+"/images/ms2_frozen_right.png", size: 60},
							{id:"monster2_normal_left", src:CORPSE.baseUrl+"/images/ms2_normal_left.png", size: 50},
							{id:"monster2_normal_right", src:CORPSE.baseUrl+"/images/ms2_normal_right.png", size: 50},
							
							/* 怪兽3 */
							{id:"monster3_exit_left", src:CORPSE.baseUrl+"/images/ms3_exit_left.png", size: 50},
							{id:"monster3_exit_right", src:CORPSE.baseUrl+"/images/ms3_exit_right.png", size: 50},
							{id:"monster3_frozen_left", src:CORPSE.baseUrl+"/images/ms3_frozen_left.png", size: 60},
							{id:"monster3_frozen_right", src:CORPSE.baseUrl+"/images/ms3_frozen_right.png", size: 60},
							{id:"monster3_normal_left", src:CORPSE.baseUrl+"/images/ms3_normal_left.png", size: 50},
							{id:"monster3_normal_right", src:CORPSE.baseUrl+"/images/ms3_normal_right.png", size: 50},
							
	                        {id:"pt_freeze",src:CORPSE.baseUrl+"/images/pt_freeze.png",size:33},
	                        /* 隐身符 */
							{id:"pt_hide", src:CORPSE.baseUrl+"/images/pt_hide.png", size: 100},

							/* 镇压符 */
							{id:"pt_repel", src:CORPSE.baseUrl+"/images/pt_repel.png", size: 100},
							/* 石头 */
							{id:"ot_stone_in", src:CORPSE.baseUrl+"/images/ot_stone_in.png", size: 100},
							{id:"ot_stone_out", src:CORPSE.baseUrl+"/images/ot_stone_out.png", size: 120},
							
							/* 粘液 */
							{id:"ot_stick_normal", src:CORPSE.baseUrl+"/images/ot_stick_normal.png", size: 100},
							{id:"ot_stick_out", src:CORPSE.baseUrl+"/images/ot_stick_out.png", size: 100}
	                        ];
	//菜单页资源
	R.resource.sceneMenu = [
	                        
	                        ];
	
	R.init = function(imgs,target){
		Q.merge(this.images, imgs);
		switch(target){
		case "sceneGame":
			this.initResourceForGame();
			break;
		case "sceneMenu":
			break;
		}
	};
	
	R.getImage = function(id){
		//trace("..."+this.images[id]);
		if(this.images[id] == undefined || this.images[id] == null){return createRect(50,100,"#dca");}
		return this.images[id].image;
	};
	
	R.initResourceForMenu = function(){
		
	};
	R.initResourceForGame = function(){
		this.background= {
				id:"background",
				image:R.getImage("background"),
				width:800,
				height:480
		};
		this.bg_stastic= {
				id:"bg_stastic",
				image:R.getImage("bg_stastic"),
				width:546,
				height:446,
				regX:273,
				regY:223
		};
		this.btn_play = {
			id:"btn_play", image:R.getImage("btn_play"), x:690, y:11, width:80, height:76,
			scaleX:0.5,
			scaleY:0.5,
			up:{rect:[80,0,80,76]},
			over:{rect:[0,0,80,76]},
			down:{rect:[0,0,80,76]},
			disabled:{rect:[0,0,80,76]}
			};
		this.btn_pause = {
				id:"btn_pause", image:R.getImage("btn_pause"),  x:690, y:11, width:80, height:76,
				scaleX:0.5,
				scaleY:0.5,
				up:{rect:[80,0,80,76]},
				over:{rect:[0,0,80,76]},
				down:{rect:[0,0,80,76]},
				disabled:{rect:[0,0,80,76]}
				};
		this.btn_back = {
				id:"btn_back", image:R.getImage("btn_back"),  x:740, y:11, width:80, height:76,
				scaleX:0.5,
				scaleY:0.5,
				up:{rect:[80,0,80,76]},
				over:{rect:[0,0,80,76]},
				down:{rect:[0,0,80,76]},
				disabled:{rect:[0,0,80,76]}
				};
		//trace("loading complete..."+dump(this.getImage("player_walk_left")));
		this.player = {
				walk_left:{//向左奔跑的动画,ok
					id:"player_walk_left",
					image:R.getImage("player_walk_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.5,
					scaleY:0.5,
					regX:46,//动画中心点，一般设为图片底线中心点
					regY:174,
					frames:[
		                    {rect:[0,0,100,174]},
		                    {rect:[100,0,100,174]},
		                    {rect:[200,0,100,174]},
		                    {rect:[300,0,100,174]},
		                    {rect:[400,0,100,174]},
		                    {rect:[500,0,100,174]},
		                    {rect:[600,0,100,174]},
		                    {rect:[700,0,100,174]}
		                    ],
		            polyArea:[{x:50,y:154},{x:85,y:164},{x:50,y:174},{x:15,y:164}]
				},
				walk_right:{//向左奔跑的动画,ok
					id:"player_walk_right",
					image:R.getImage("player_walk_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.5,
					scaleY:0.5,
					regX:54,//动画中心点，一般设为图片底线中心点
					regY:174,
					frames:[
		                    {rect:[0,0,100,174]},
		                    {rect:[100,0,100,174]},
		                    {rect:[200,0,100,174]},
		                    {rect:[300,0,100,174]},
		                    {rect:[400,0,100,174]},
		                    {rect:[500,0,100,174]},
		                    {rect:[600,0,100,174]},
		                    {rect:[700,0,100,174]}
		                    ],
		            polyArea:[{x:50,y:154},{x:85,y:164},{x:50,y:174},{x:15,y:164}]
				},
				stand_left:{//朝左站立的动画,ok
					id:"player_stand_left",
					image:R.getImage("player_stand_left"),
					useFrames:true,
					interval:4,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:167,
					scaleX:0.53,
					scaleY:0.53,
					frames:[
		                    {rect:[0,0,100,170]},
		                    {rect:[100,0,100,170]},
		                    {rect:[200,0,100,170]},
		                    {rect:[300,0,100,170]},
		                    {rect:[400,0,100,170]},
		                    {rect:[500,0,100,170]},
		                    {rect:[600,0,100,170]},
		                    {rect:[700,0,100,170]},
		                    {rect:[800,0,100,170]},
		                    {rect:[900,0,100,170]},
		                    {rect:[1000,0,100,170]},
		                    {rect:[1100,0,100,170]},
		                    {rect:[1200,0,100,170]},
		                    {rect:[1300,0,100,170]},
		                    {rect:[1400,0,100,170]},
		                    {rect:[1500,0,100,170]}
		                    ]
				},
				stand_right:{//朝左站立的动画,ok
					id:"player_stand_right",
					image:R.getImage("player_stand_right"),
					useFrames:true,
					interval:4,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:167,
					scaleX:0.53,
					scaleY:0.53,
					frames:[
		                    {rect:[0,0,100,170]},
		                    {rect:[100,0,100,170]},
		                    {rect:[200,0,100,170]},
		                    {rect:[300,0,100,170]},
		                    {rect:[400,0,100,170]},
		                    {rect:[500,0,100,170]},
		                    {rect:[600,0,100,170]},
		                    {rect:[700,0,100,170]},
		                    {rect:[800,0,100,170]},
		                    {rect:[900,0,100,170]},
		                    {rect:[1000,0,100,170]},
		                    {rect:[1100,0,100,170]},
		                    {rect:[1200,0,100,170]},
		                    {rect:[1300,0,100,170]},
		                    {rect:[1400,0,100,170]},
		                    {rect:[1500,0,100,170]}
		                    ]
				},
				falldown_left:{//掉下的动画,ok
					id:"player_falldown_left",
					image:R.getImage("player_falldown_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:48,//动画中心点，一般设为图片底线中心点
					regY:131,

					scaleX:0.7,
					scaleY:0.7,
					frames:[
		                    {rect:[00,0,100,137]},
		                    {rect:[100,0,100,137]},
		                    {rect:[200,0,100,137]},
		                    {rect:[300,0,100,137]},
		                    {rect:[400,0,100,137]},
		                    {rect:[500,0,100,137]},
		                    {rect:[600,0,100,137]},
		                    {rect:[700,0,100,137]},
		                    {rect:[800,0,100,137]},
		                    {rect:[900,0,100,137]},
		                    {rect:[1000,0,100,137]},
		                    {rect:[1100,0,100,137],label:"cry"},
		                    {rect:[1200,0,100,137]},
		                    {rect:[1300,0,100,137]},
		                    {rect:[1400,0,100,137],jump:"cry"}
		                    ]
				},

				falldown_right:{//掉下的动画,ok
					id:"player_falldown_right",
					image:R.getImage("player_falldown_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:52,//动画中心点，一般设为图片底线中心点
					regY:131,

					scaleX:0.7,
					scaleY:0.7,
					frames:[
		                    {rect:[00,0,100,137]},
		                    {rect:[100,0,100,137]},
		                    {rect:[200,0,100,137]},
		                    {rect:[300,0,100,137]},
		                    {rect:[400,0,100,137]},
		                    {rect:[500,0,100,137]},
		                    {rect:[600,0,100,137]},
		                    {rect:[700,0,100,137]},
		                    {rect:[800,0,100,137]},
		                    {rect:[900,0,100,137]},
		                    {rect:[1000,0,100,137]},
		                    {rect:[1100,0,100,137],label:"cry"},
		                    {rect:[1200,0,100,137]},
		                    {rect:[1300,0,100,137]},
		                    {rect:[1400,0,100,137],jump:"cry"}
		                    ]
				},

				hide_left: {//隐身动画,ok
					id:"player_hide_left",
					image:R.getImage("player_hide_left"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:52,
					regY:165,
					scaleX:0.6,
					scaleY:0.6,
					frames:[
						{ rect: [0, 0, 100, 171]},
						{ rect: [100, 0, 100, 171]},
						{ rect: [200, 0, 100, 171]},
						{ rect: [300, 0, 100, 171]},
						{ rect: [400, 0, 100, 171]},
						{ rect: [500, 0, 100, 171]},
						{ rect: [600, 0, 100, 171]},
						{ rect: [700, 0, 100, 171]}
					],
					polyArea:[{x:50,y:145},{x:85,y:155},{x:50,y:165},{x:15,y:155}]
},
				hide_right: {//隐身动画,ok
					id:"player_hide_right",
					image:R.getImage("player_hide_right"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:49,
					regY:164,
					scaleX:0.6,
					scaleY:0.6,
					frames:[
						{ rect: [0, 0, 100, 171]},
						{ rect: [100, 0, 100, 171]},
						{ rect: [200, 0, 100, 171]},
						{ rect: [300, 0, 100, 171]},
						{ rect: [400, 0, 100, 171]},
						{ rect: [500, 0, 100, 171]},
						{ rect: [600, 0, 100, 171]},
						{ rect: [700, 0, 100, 171]}
					],
					polyArea:[{x:50,y:145},{x:85,y:155},{x:50,y:165},{x:15,y:155}]
				}
		};
		
		this.wall = {
				left:{
					id:"wall_left", x:50, y:478,visible:false, image:createRect(100, 400, "#324"),
					polyArea:[{x:0,y:0},{x:100,y:0},{x:0,y:400}],
					regX:50,regY:400
				},
				right:{
					id:"wall_right", x:750, y:478, visible:false, image:createRect(100, 400, "#643"),
					polyArea:[{x:0,y:0},{x:100,y:0},{x:100,y:400}],
					regX:50,regY:400
				},
				top:{
					id:"wall_top", x:400, y:78, visible:false, image:createRect(800, 78, "#285"),
					regX:400,regY:78
				},
				bottom:{
					id:"wall_bottom", x:400, y:478, visible:false, image:createRect(800, 2, "#978"),
					regX:400,regY:2
				}
		};
		
		this.monster1 = {
			entrance_left:{//怪兽入场动画_左  ,ok
					id:"monster1_entrance_left",
					image:R.getImage("monster1_entrance_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:45,//动画中心点，一般设为图片底线中心点
					regY:142,
					frames:[
		                    {rect:[00,0,100,154]},
		                    {rect:[100,0,100,154]},
		                    {rect:[200,0,100,154]},
		                    {rect:[300,0,100,154]},
		                    {rect:[400,0,100,154]},
		                    {rect:[500,0,100,154]},
		                    {rect:[600,0,100,154]},
		                    {rect:[700,0,100,154]},
		                    {rect:[800,0,100,154]},
		                    {rect:[900,0,100,154]},
		                    {rect:[1000,0,100,154]},
		                    {rect:[1100,0,100,154]},
		                    {rect:[1200,0,100,154]},
		                    {rect:[1300,0,100,154]},
		                    {rect:[1400,0,100,154]},
		                    {rect:[1500,0,100,154]}
		                   ]
				},
			entrance_right:{//怪兽入场动画_右  ,ok
					id:"monster1_entrance_right",
					image:R.getImage("monster1_entrance_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:55,//动画中心点，一般设为图片底线中心点
					regY:142,
					frames:[
		                    {rect:[00,0,100,154]},
		                    {rect:[100,0,100,154]},
		                    {rect:[200,0,100,154]},
		                    {rect:[300,0,100,154]},
		                    {rect:[400,0,100,154]},
		                    {rect:[500,0,100,154]},
		                    {rect:[600,0,100,154]},
		                    {rect:[700,0,100,154]},
		                    {rect:[800,0,100,154]},
		                    {rect:[900,0,100,154]},
		                    {rect:[1000,0,100,154]},
		                    {rect:[1100,0,100,154]},
		                    {rect:[1200,0,100,154]},
		                    {rect:[1300,0,100,154]},
		                    {rect:[1400,0,100,154]},
		                    {rect:[1500,0,100,154]}
		                   ]
				},
			evolve_left:{//怪兽进化动画_左  ,ok
					id:"monster1_evolve_left",
					image:R.getImage("monster1_evolve_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.96,
					scaleY:0.96,
					regX:57,//动画中心点，一般设为图片底线中心点
					regY:105,
					frames:[
		                    {rect:[0, 0, 120,122]},
		                    {rect:[120, 0, 120,122]},
		                    {rect:[240, 0, 120,122]},
		                    {rect:[360, 0, 120,122]},
		                    {rect:[480, 0, 120,122]},
		                    {rect:[600, 0, 120,122]},
		                    {rect:[720, 0, 120,122]},
		                    {rect:[840, 0, 120,122]},
		                    {rect:[960, 0, 120,122]},
		                    {rect:[1080, 0, 120,122]},
		                    {rect:[1200, 0, 120,122]},
		                    {rect:[1320, 0, 120,122]},
		                    {rect:[1440, 0, 120,122]},
		                    {rect:[1560, 0, 120,122]},
		                    {rect:[1680, 0, 120,122]},
		                    {rect:[1800, 0, 120,122]},
		                    {rect:[1920, 0, 120,122]},
		                    {rect:[2040, 0, 120,122]}
		                    ]
				},
			evolve_right:{//怪兽入场动画_右  ,ok
					id:"monster1_evolve_right",
					image:R.getImage("monster1_evolve_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.96,
					scaleY:0.96,
					regX:64,//动画中心点，一般设为图片底线中心点
					regY:105,
					frames:[
		                    {rect:[0, 0, 120,122]},
		                    {rect:[120, 0, 120,122]},
		                    {rect:[240, 0, 120,122]},
		                    {rect:[360, 0, 120,122]},
		                    {rect:[480, 0, 120,122]},
		                    {rect:[600, 0, 120,122]},
		                    {rect:[720, 0, 120,122]},
		                    {rect:[840, 0, 120,122]},
		                    {rect:[960, 0, 120,122]},
		                    {rect:[1080, 0, 120,122]},
		                    {rect:[1200, 0, 120,122]},
		                    {rect:[1320, 0, 120,122]},
		                    {rect:[1440, 0, 120,122]},
		                    {rect:[1560, 0, 120,122]},
		                    {rect:[1680, 0, 120,122]},
		                    {rect:[1800, 0, 120,122]},
		                    {rect:[1920, 0, 120,122]},
		                    {rect:[2040, 0, 120,122]}
		                    ]
				},
			exit_left:{//怪兽退场动画_左  ,ok
					id:"monster1_exit_left",
					image:R.getImage("monster1_exit_left"),
					useFrames:true,
					interval:4,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:43,//动画中心点，一般设为图片底线中心点
					regY:379,
					frames:[
		                    {rect:[00, 0, 100,383]},
		                    {rect:[100, 0, 100,383]},
		                    {rect:[200, 0, 100,383]},
		                    {rect:[300, 0, 100,383]},
		                    {rect:[400, 0, 100,383]},
		                    {rect:[500, 0, 100,383]},
		                    {rect:[600, 0, 100,383]},
		                    {rect:[700, 0, 100,383]},
		                    {rect:[800, 0, 100,383]},
		                    {rect:[900, 0, 100,383]}
		                    
		                   ]
				},
			exit_right:{//怪兽退场动画_右  ,ok
					id:"monster1_exit_right",
					image:R.getImage("monster1_exit_right"),
					useFrames:true,
					interval:4,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:54,//动画中心点，一般设为图片底线中心点
					regY:379,
					frames:[
		                    {rect:[00, 0, 100,383]},
		                    {rect:[100, 0, 100,383]},
		                    {rect:[200, 0, 100,383]},
		                    {rect:[300, 0, 100,383]},
		                    {rect:[400, 0, 100,383]},
		                    {rect:[500, 0, 100,383]},
		                    {rect:[600, 0, 100,383]},
		                    {rect:[700, 0, 100,383]},
		                    {rect:[800, 0, 100,383]},
		                    {rect:[900, 0, 100,383]}
		                 
		                   ]
				},
			frozen_left:{//怪兽冻结动画_左  ,ok
					id:"monster1_frozen_left",
					image:R.getImage("monster1_frozen_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:54,//动画中心点，一般设为图片底线中心点
					regY:142,
					scaleX:0.55,
					scaleY:0.55,
					frames:[
		                    {rect:[0, 0, 120,159]},
		                    {rect:[120, 0, 120,159]},
		                    {rect:[240, 0, 120,159]},
		                    {rect:[360, 0, 120,159]},
		                    {rect:[480, 0, 120,159]},
		                    {rect:[600, 0, 120,159]},
		                    {rect:[720, 0, 120,159]},
		                    {rect:[840, 0, 120,159]},
		                    {rect:[960, 0, 120,159]},
		                    {rect:[1080, 0, 120,159]},
		                    {rect:[1200, 0, 120,159]},
		                    {rect:[1320, 0, 120,159]}
		                   ]
				},
			frozen_right:{//怪兽冻结动画_右  ,ok
					id:"monster1_frozen_right",
					image:R.getImage("monster1_frozen_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:68,//动画中心点，一般设为图片底线中心点
					regY:142,
					scaleX:0.55,
					scaleY:0.55,
					frames:[
		                    {rect:[0, 0, 120,159]},
		                    {rect:[120, 0, 120,159]},
		                    {rect:[240, 0, 120,159]},
		                    {rect:[360, 0, 120,159]},
		                    {rect:[480, 0, 120,159]},
		                    {rect:[600, 0, 120,159]},
		                    {rect:[720, 0, 120,159]},
		                    {rect:[840, 0, 120,159]},
		                    {rect:[960, 0, 120,159]},
		                    {rect:[1080, 0, 120,159]},
		                    {rect:[1200, 0, 120,159]},
		                    {rect:[1320, 0, 120,159]}
		                   ]
				},
			normal_left:{//怪兽常规动画_左  ,ok
					id:"monster1_normal_left",
					image:R.getImage("monster1_normal_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.5,
					scaleY:0.5,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:160,
					frames:[
		                    {rect:[0,0,100,164]},
		                    {rect:[100,0,100,164]},
		                    {rect:[200,0,100,164]},
		                    {rect:[300,0,100,164]},
		                    {rect:[400,0,100,164]},
		                    {rect:[500,0,100,164]},
		                    {rect:[600,0,100,164]},
		                    {rect:[700,0,100,164]},
		                    {rect:[800,0,100,164]},
		                    {rect:[900,0,100,164]},
		                    {rect:[1000,0,100,164]}
		                    ],
		            polyArea:[{x:50,y:135},{x:85,y:154},{x:50,y:164},{x:15,y:154}]
				},
			normal_right:{//怪兽常规动画_右  ,ok
					id:"monster1_normal_right",
					image:R.getImage("monster1_normal_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.5,
					scaleY:0.5,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:160,
					frames:[
		                    {rect:[0,0,100,164]},
		                    {rect:[100,0,100,164]},
		                    {rect:[200,0,100,164]},
		                    {rect:[300,0,100,164]},
		                    {rect:[400,0,100,164]},
		                    {rect:[500,0,100,164]},
		                    {rect:[600,0,100,164]},
		                    {rect:[700,0,100,164]},
		                    {rect:[800,0,100,164]},
		                    {rect:[900,0,100,164]},
		                    {rect:[1000,0,100,164]}
		                    ],
		            polyArea:[{x:50,y:135},{x:85,y:154},{x:50,y:164},{x:15,y:154}]
				}
				

		};	
		this.monster2 = {
			evolve_left:{//怪兽进化动画_左   ok
					id:"monster2_evolve_left",
					image:R.getImage("monster2_evolve_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.9,
					scaleY:0.9,
					regX:60,//动画中心点，一般设为图片底线中心点
					regY:110,
					frames:[
		                    {rect:[0, 0, 120,128]},
		                    {rect:[120, 0, 120,128]},
		                    {rect:[240, 0, 120,128]},
		                    {rect:[360, 0, 120,128]},
		                    {rect:[480, 0, 120,128]},
		                    {rect:[600, 0, 120,128]},
		                    {rect:[720, 0, 120,128]},
		                    {rect:[840, 0, 120,128]},
		                    {rect:[960, 0, 120,128]},
		                    {rect:[1080, 0, 120,128]},
		                    {rect:[1200, 0, 120,128]},
		                    {rect:[1320, 0, 120,128]},
		                    {rect:[1440, 0, 120,128]},
		                    {rect:[1560, 0, 120,128]},
		                    {rect:[1680, 0, 120,128]},
		                    {rect:[1800, 0, 120,128]},
		                    {rect:[1920, 0, 120,128]},
		                    {rect:[2040, 0, 120,128]}
		                    ]
				},
			evolve_right:{//怪兽入场动画_右  ok
					id:"monster2_evolve_right",
					image:R.getImage("monster2_evolve_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.9,
					scaleY:0.9,
					regX:62,//动画中心点，一般设为图片底线中心点
					regY:111,
					frames:[
		                    {rect:[0, 0, 120,128]},
		                    {rect:[120, 0, 120,128]},
		                    {rect:[240, 0, 120,128]},
		                    {rect:[360, 0, 120,128]},
		                    {rect:[480, 0, 120,128]},
		                    {rect:[600, 0, 120,128]},
		                    {rect:[720, 0, 120,128]},
		                    {rect:[840, 0, 120,128]},
		                    {rect:[960, 0, 120,128]},
		                    {rect:[1080, 0, 120,128]},
		                    {rect:[1200, 0, 120,128]},
		                    {rect:[1320, 0, 120,128]},
		                    {rect:[1440, 0, 120,128]},
		                    {rect:[1560, 0, 120,128]},
		                    {rect:[1680, 0, 120,128]},
		                    {rect:[1800, 0, 120,128]},
		                    {rect:[1920, 0, 120,128]},
		                    {rect:[2040, 0, 120,128]}
		                    ]
				},
			exit_left:{//怪兽退场动画_左  ok
					id:"monster2_exit_left",
					image:R.getImage("monster2_exit_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:42,//动画中心点，一般设为图片底线中心点
					regY:381,
					frames:[
					        {rect:[0, 0, 100,382]},
		                    {rect:[100, 0, 100,382]},
		                    {rect:[200, 0, 100,382]},
		                    {rect:[300, 0, 100,382]},
		                    {rect:[400, 0, 100,382]},
		                    {rect:[500, 0, 100,382]},
		                    {rect:[600, 0, 100,382]},
		                    {rect:[700, 0, 100,382]},
		                    {rect:[800, 0, 100,382]},
		                    {rect:[900, 0, 100,382]}
		                   ]
				},
			exit_right:{//怪兽退场动画_右  ok
					id:"monster2_exit_right",
					image:R.getImage("monster2_exit_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:60,//动画中心点，一般设为图片底线中心点
					regY:381,
					frames:[
					        {rect:[0, 0, 100,382]},
		                    {rect:[100, 0, 100,382]},
		                    {rect:[200, 0, 100,382]},
		                    {rect:[300, 0, 100,382]},
		                    {rect:[400, 0, 100,382]},
		                    {rect:[500, 0, 100,382]},
		                    {rect:[600, 0, 100,382]},
		                    {rect:[700, 0, 100,382]},
		                    {rect:[800, 0, 100,382]},
		                    {rect:[900, 0, 100,382]}
		                   ]
				},
			frozen_left:{//怪兽冻结动画_左  ok
					id:"monster2_frozen_left",
					image:R.getImage("monster2_frozen_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:58,//动画中心点，一般设为图片底线中心点
					regY:146,
					frames:[
		                    {rect:[0, 0, 120,164]},
		                    {rect:[120, 0, 120,164]},
		                    {rect:[240, 0, 120,164]},
		                    {rect:[360, 0, 120,164]},
		                    {rect:[480, 0, 120,164]},
		                    {rect:[600, 0, 120,164]},
		                    {rect:[720, 0, 120,164]},
		                    {rect:[840, 0, 120,164]},
		                    {rect:[960, 0, 120,164]},
		                    {rect:[1080, 0, 120,164]},
		                    {rect:[1200, 0, 120,164]},
		                    {rect:[1320, 0, 120,164]}
		                   ]
				},
			frozen_right:{//怪兽冻结动画_右  ok
					id:"monster2_frozen_right",
					image:R.getImage("monster2_frozen_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.6,
					scaleY:0.6,
					regX:62,//动画中心点，一般设为图片底线中心点
					regY:146,
					frames:[
		                    {rect:[0, 0, 120,164]},
		                    {rect:[120, 0, 120,164]},
		                    {rect:[240, 0, 120,164]},
		                    {rect:[360, 0, 120,164]},
		                    {rect:[480, 0, 120,164]},
		                    {rect:[600, 0, 120,164]},
		                    {rect:[720, 0, 120,164]},
		                    {rect:[840, 0, 120,164]},
		                    {rect:[960, 0, 120,164]},
		                    {rect:[1080, 0, 120,164]},
		                    {rect:[1200, 0, 120,164]},
		                    {rect:[1320, 0, 120,164]}
		                   ]
				},
			normal_left:{//怪兽常规动画_左  ok
					id:"monster2_normal_left",
					image:R.getImage("monster2_normal_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.58,
					scaleY:0.58,
					regX:48,//动画中心点，一般设为图片底线中心点
					regY:137,
					frames:[
		                    {rect:[0,0,  100,139]},
		                    {rect:[100,0,  100,139]},
		                    {rect:[200,0,  100,139]},
		                    {rect:[300,0,  100,139]},
		                    {rect:[400,0,  100,139]},
		                    {rect:[500,0,  100,139]},
		                    {rect:[600,0,  100,139]},
		                    {rect:[700,0,  100,139]},
		                    {rect:[800,0,  100,139]},
		                    {rect:[900,0,  100,139]},
		                    {rect:[1000,0,  100,139]}
		                    ],
		            polyArea:[{x:50,y:110},{x:85,y:125},{x:50,y:137},{x:15,y:125}]
				},
			normal_right:{//怪兽常规动画_右  ok
					id:"monster2_normal_right",
					image:R.getImage("monster2_normal_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.58,
					scaleY:0.58,
					regX:52,//动画中心点，一般设为图片底线中心点
					regY:137,
					frames:[
		                    {rect:[0,0,  100,139]},
		                    {rect:[100,0,  100,139]},
		                    {rect:[200,0,  100,139]},
		                    {rect:[300,0,  100,139]},
		                    {rect:[400,0,  100,139]},
		                    {rect:[500,0,  100,139]},
		                    {rect:[600,0,  100,139]},
		                    {rect:[700,0,  100,139]},
		                    {rect:[800,0,  100,139]},
		                    {rect:[900,0,  100,139]},
		                    {rect:[1000,0,  100,139]}
		                    ],
		            polyArea:[{x:50,y:110},{x:85,y:125},{x:50,y:137},{x:15,y:125}]
				}
		};

		this.monster3 = {
			exit_left:{//怪兽退场动画_左  ok
					id:"monster3_exit_left",
					image:R.getImage("monster3_exit_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.60,
					scaleY:0.60,
					regX:43,//动画中心点，一般设为图片底线中心点
					regY:393,
					frames:[
		                    {rect:[0, 0, 100,394]},
		                    {rect:[100, 0, 100,394]},
		                    {rect:[200, 0, 100,394]},
		                    {rect:[300, 0, 100,394]},
		                    {rect:[400, 0, 100,394]},
		                    {rect:[500, 0, 100,394]},
		                    {rect:[600, 0, 100,394]},
		                    {rect:[700, 0, 100,394]},
		                    {rect:[800, 0, 100,394]},
		                    {rect:[900, 0, 100,394]}
		                   ]
				},
			exit_right:{//怪兽退场动画_右  ok
					id:"monster3_exit_right",
					image:R.getImage("monster3_exit_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.60,
					scaleY:0.60,
					regX:60,//动画中心点，一般设为图片底线中心点
					regY:393,
					frames:[
		                    {rect:[0, 0, 100,394]},
		                    {rect:[100, 0, 100,394]},
		                    {rect:[200, 0, 100,394]},
		                    {rect:[300, 0, 100,394]},
		                    {rect:[400, 0, 100,394]},
		                    {rect:[500, 0, 100,394]},
		                    {rect:[600, 0, 100,394]},
		                    {rect:[700, 0, 100,394]},
		                    {rect:[800, 0, 100,394]},
		                    {rect:[900, 0, 100,394]}
		                   ]
				},
			frozen_left:{//怪兽冻结动画_左  ok
					id:"monster3_frozen_left",
					image:R.getImage("monster3_frozen_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.65,
					scaleY:0.65,
					regX:58,//动画中心点，一般设为图片底线中心点
					regY:150,
					frames:[
		                    {rect:[0, 0, 120,166]},
		                    {rect:[120, 0, 120,166]},
		                    {rect:[240, 0, 120,166]},
		                    {rect:[360, 0, 120,166]},
		                    {rect:[480, 0, 120,166]},
		                    {rect:[600, 0, 120,166]},
		                    {rect:[720, 0, 120,166]},
		                    {rect:[840, 0, 120,166]},
		                    {rect:[960, 0, 120,166]},
		                    {rect:[1080, 0, 120,166]},
		                    {rect:[1200, 0, 120,166]},
		                    {rect:[1320, 0, 120,166]}
		                   ]
				},
			frozen_right:{//怪兽冻结动画_右  ok
					id:"monster3_frozen_right",
					image:R.getImage("monster3_frozen_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					scaleX:0.65,
					scaleY:0.65,
					regX:65,//动画中心点，一般设为图片底线中心点
					regY:150,
					frames:[
		                    {rect:[0, 0, 120,166]},
		                    {rect:[120, 0, 120,166]},
		                    {rect:[240, 0, 120,166]},
		                    {rect:[360, 0, 120,166]},
		                    {rect:[480, 0, 120,166]},
		                    {rect:[600, 0, 120,166]},
		                    {rect:[720, 0, 120,166]},
		                    {rect:[840, 0, 120,166]},
		                    {rect:[960, 0, 120,166]},
		                    {rect:[1080, 0, 120,166]},
		                    {rect:[1200, 0, 120,166]},
		                    {rect:[1320, 0, 120,166]}
		                   ]
				},
			normal_left:{//怪兽常规动画_左  ok
					id:"monster3_normal_left",
					image:R.getImage("monster3_normal_left"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:46,//动画中心点，一般设为图片底线中心点
					regY:165,
					scaleX:0.55,
					scaleY:0.55,
					frames:[
		                    {rect:[0,0,  100,168]},
		                    {rect:[100,0,  100,168]},
		                    {rect:[200,0,  100,168]},
		                    {rect:[300,0,  100,168]},
		                    {rect:[400,0,  100,168]},
		                    {rect:[500,0,  100,168]},
		                    {rect:[600,0,  100,168]},
		                    {rect:[700,0,  100,168]},
		                    {rect:[800,0,  100,168]},
		                    {rect:[900,0,  100,168]},
		                    {rect:[1000,0,  100,168]}
		                    ],
		            polyArea:[{x:46,y:139},{x:85,y:150},{x:46,y:165},{x:15,y:150}]
				},
			normal_right:{//怪兽常规动画_右  ok
					id:"monster3_normal_right",
					image:R.getImage("monster3_normal_right"),
					useFrames:true,
					interval:2,
					x:0,//此段动画相对于人物的坐标
					y:0,
					regX:56,//动画中心点，一般设为图片底线中心点
					regY:165,
					scaleX:0.55,
					scaleY:0.55,
					frames:[
		                    {rect:[0,0,  100,168]},
		                    {rect:[100,0,  100,168]},
		                    {rect:[200,0,  100,168]},
		                    {rect:[300,0,  100,168]},
		                    {rect:[400,0,  100,168]},
		                    {rect:[500,0,  100,168]},
		                    {rect:[600,0,  100,168]},
		                    {rect:[700,0,  100,168]},
		                    {rect:[800,0,  100,168]},
		                    {rect:[900,0,  100,168]},
		                    {rect:[1000,0,  100,168]}
		                    ],
				   polyArea:[{x:50,y:139},{x:85,y:150},{x:50,y:165},{x:15,y:150}]
				}
				
		};
		this.prop = {
				pt_freeze_normal:{
					id:"pt_freeze_normal",
					image:R.getImage("pt_freeze"),
					useFrames:false,
					interval:9999,
					x:0,
					y:0,
					regX:30,
					regY:112,
					frames:[
					        {rect:[0,0,100,112]}
					        ],
					polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				},
				pt_freeze_out:{
					id:"pt_freeze_out",
					image:R.getImage("pt_freeze"),
					useFrames:false,
					interval:2,
					x:0,
					y:0,
					regX:30,
					regY:112,
					frames:[
					        {rect:[0,0,100,112]},
					        {rect:[100,0,100,112]},
					        {rect:[200,0,100,112]},
					        {rect:[300,0,100,112]},
					        {rect:[400,0,100,112]},
					        {rect:[500,0,100,112]},
					        {rect:[600,0,100,112]},
					        {rect:[700,0,100,112]},
					        {rect:[800,0,100,112]},
					        {rect:[900,0,100,112]},
					        {rect:[1000,0,100,112]},
					        {rect:[1100,0,100,112]},
					        {rect:[1200,0,100,112]},
					        {rect:[1300,0,100,112]},
					        {rect:[1400,0,100,112]},
					        {rect:[1500,0,100,112]},
					        {rect:[1600,0,100,112]},
					        {rect:[1700,0,100,112]},
					        {rect:[1800,0,100,112]},
					        {rect:[1900,0,100,112]},
					        {rect:[2000,0,100,112]}
					        ],
					polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				},
				pt_hide_normal:{
					id:"pt_hide_normal",
					image:R.getImage("pt_hide"),
					useFrames:false,
					interval:9999,
					x:0,
					y:0,
					regX:30,
					regY:112,
					frames:[
					        {rect:[0,0,100,112]}
					        ],
					polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				},
				// 隐身
				pt_hide_out:{
						id:"pt_hide",
						image:R.getImage("pt_hide"),
						useFrames:true,
						interval:2,
						x:0,
						y:0,
						regX:30,//动画中心点，一般设为图片底线中心点
						regY:112,
						frames:[
				                {rect:[0,0,  100,112]},
				                {rect:[100,0,100,112]},
				                {rect:[200,0,100,112]},
				                {rect:[300,0,100,112]},
				                {rect:[400,0,100,112]},
				                {rect:[500,0,100,112]},
				                {rect:[600,0,100,112]},
				                {rect:[700,0,100,112]},
				                {rect:[800,0,100,112]},
				                {rect:[900,0,100,112]},
				                {rect:[1000,0,100,112]},
				                {rect:[1100,0,100,112]},
				                {rect:[1200,0,100,112]},
				                {rect:[1300,0,100,112]},
				                {rect:[1400,0,100,112]},
				                {rect:[1500,0,100,112]},
				                {rect:[1600,0,100,112]},
				                {rect:[1700,0,100,112]},
				                {rect:[1800,0,100,112]},
				                {rect:[1900,0,100,112]},
				                {rect:[2000,0,100,112]}
				                ],
				       polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				
				},

				pt_repel_normal:{
					id:"pt_repel_normal",
					image:R.getImage("pt_repel"),
					useFrames:false,
					interval:9999,
					x:0,
					y:0,
					regX:30,
					regY:112,
					frames:[
					        {rect:[0,0,100,112]}
					        ],
					polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				},
				
				pt_repel_out:{
						id:"pt_repel",
						image:R.getImage("pt_repel"),
						useFrames:true,
						interval:2,
						x:0,
						y:0,
						regX:30,//动画中心点，一般设为图片底线中心点
						regY:112,
						frames:[
				                {rect:[0,0,  100,112]},
				                {rect:[100,0,100,112]},
				                {rect:[200,0,100,112]},
				                {rect:[300,0,100,112]},
				                {rect:[400,0,100,112]},
				                {rect:[500,0,100,112]},
				                {rect:[600,0,100,112]},
				                {rect:[700,0,100,112]},
				                {rect:[800,0,100,112]},
				                {rect:[900,0,100,112]},
				                {rect:[1000,0,100,112]},
				                {rect:[1100,0,100,112]},
				                {rect:[1200,0,100,112]},
				                {rect:[1300,0,100,112]},
				                {rect:[1400,0,100,112]},
				                {rect:[1500,0,100,112]},
				                {rect:[1600,0,100,112]},
				                {rect:[1700,0,100,112]},
				                {rect:[1800,0,100,112]},
				                {rect:[1900,0,100,112]},
				                {rect:[2000,0,100,112]}
				                ],
				       polyArea:[{x:30,y:98},{x:50,y:105},{x:30,y:112},{x:10,y:105}]
				
				}
		};
		
		this.obstacle = {
				stone_normal:{
					id:"ot_stone_normal",
					image:R.getImage("ot_stone_out"),
					useFrames:false,
					interval:9999,
					x:0,
					y:0,
					regX:60,
					regY:99,
					frames:[
					        {rect:[0,0,120,116]}
					        ],
					polyArea:[{x:60,y:80},{x:90,y:90},{x:60,y:100},{x:30,y:90}]
				},
				stone_in:{ // 石头进场动画 in为保留字，故改用_in
					id:"ot_stone_in",
					image:R.getImage("ot_stone_in"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					scaleX:0.95,
					scaleY:0.95,
					regX:46,//动画中心点，一般设为图片底线中心点
					regY:303,
					frames:[
			                {rect:[0,0,  100,310]},
			                {rect:[100,0,100,310]},
			                {rect:[200,0,100,310]},
			                {rect:[300,0,100,310]},
			                {rect:[400,0,100,310]},
			                {rect:[500,0,100,310]},
			                {rect:[600,0,100,310]},
			                {rect:[700,0,100,310]},
			                {rect:[800,0,100,310]},
			                {rect:[900,0,100,310]},
			                {rect:[1000,0,100,310]},
			                {rect:[1100,0,100,310]},
			                {rect:[1200,0,100,310]},
			                {rect:[1300,0,100,310]},
			                {rect:[1400,0,100,310]}
			                ]
				
				},
				stone_out:{
					id:"ot_stone_out",
					image:R.getImage("ot_stone_out"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:60,//动画中心点，一般设为图片底线中心点
					regY:99,
					frames:[
			                {rect:[0,0,  120,116]},
			                {rect:[120,0,120,116]},
			                {rect:[240,0,120,116]},
			                {rect:[360,0,120,116]},
			                {rect:[480,0,120,116]},
			                {rect:[600,0,120,116]},
			                {rect:[720,0,120,116]}
			                ]
				
				},
				stick_in:{
					id:"ot_stick_in",
					image:R.getImage("ot_stick_out"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:7,
					frames:[
			                {rect:[800,0,100,45]},
			                {rect:[700,0,100,45]},
			                {rect:[600,0,100,45]},
			                {rect:[500,0,100,45]},
			                {rect:[400,0,100,45]},
			                {rect:[300,0,100,45]},
			                {rect:[200,0,100,45]},
			                {rect:[100,0,100,45]},
			                {rect:[0,0,  100,45]}
			                ],
			        polyArea:[{x:50,y:7},{x:100,y:25},{x:50,y:40},{x:0,y:25}] //碰撞区域参数待定
				},
				stick_normal:{ // 粘液常规动画
					id:"ot_stick_normal",
					image:R.getImage("ot_stick_normal"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:19,
					frames:[
			                {rect:[0,0,  100,57]},
			                {rect:[100,0,100,57]},
			                {rect:[200,0,100,57]},
			                {rect:[300,0,100,57]},
			                {rect:[400,0,100,57]},
			                {rect:[500,0,100,57]},
			                {rect:[600,0,100,57]},
			                {rect:[700,0,100,57]},
			                {rect:[800,0,100,57]}
			                ],
			        polyArea:[{x:50,y:19},{x:100,y:38},{x:50,y:54},{x:0,y:38}] //碰撞区域参数待定
				
				},
				stick_out:{ // 粘液退出动画
					id:"ot_stick_out",
					image:R.getImage("ot_stick_out"),
					useFrames:true,
					interval:2,
					x:0,
					y:0,
					regX:50,//动画中心点，一般设为图片底线中心点
					regY:7,
					frames:[
			                {rect:[0,0,  100,45]},
			                {rect:[100,0,100,45]},
			                {rect:[200,0,100,45]},
			                {rect:[300,0,100,45]},
			                {rect:[400,0,100,45]},
			                {rect:[500,0,100,45]},
			                {rect:[600,0,100,45]},
			                {rect:[700,0,100,45]},
			                {rect:[800,0,100,45]}
			                ],
			        polyArea:[{x:50,y:7},{x:100,y:25},{x:50,y:40},{x:0,y:25}] //碰撞区域参数待定
				
				}
	
		};
	};
})(Quark);

