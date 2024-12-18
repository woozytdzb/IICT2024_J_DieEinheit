
function createStage4() {
  class SelectionGuide {
    constructor() {
        this.COLOR_RECT_NORMAL = 180;
        this.COLOR_TEXT_NORMAL = 70;

        this.COLOR_RECT_SELECTION = 255;
        this.COLOR_TEXT_SELECTION = 0;
    }

    draw() {
        if (currentMap === 2 && map2DialogStep === 3) {
            if (map2Selection === 'up') {
                this.drawUpperLine(true);
                this.drawLowerLine(false);
            } else {
                this.drawUpperLine(false);
                this.drawLowerLine(true);
            }

            if (shouldShowMoney) {
                this.giveMoney();
            }

            if (shouldShowStar) {
                this.giveStar();
            }
        }
    }

    drawUpperLine(isSelected) {
        const colorText = isSelected ? this.COLOR_TEXT_SELECTION : this.COLOR_TEXT_NORMAL;
        const colorRect = isSelected ? this.COLOR_RECT_SELECTION : this.COLOR_RECT_NORMAL

        fill(colorRect);
        rect(450, 445, 300, 20);
        fill(colorText);
        textAlign(CENTER);
        text('부모님의 말씀을 듣는다', 600, 460);
    }

    drawLowerLine(isSelected) {
        const colorText = isSelected ? this.COLOR_TEXT_SELECTION : this.COLOR_TEXT_NORMAL;
        const colorRect = isSelected ? this.COLOR_RECT_SELECTION : this.COLOR_RECT_NORMAL

        fill(colorRect);
        rect(450, 475, 300, 20);
        fill(colorText);
        textAlign(CENTER);
        text('나의 소신을 이어간다', 600, 490);
    }

    giveStar() {
        image(star, 800, 400);
    }

    giveMoney() {
        image(money, 800, 400);
    }
  }

  class dialogue {
  constructor(portrait,name,line) {
      this.portrait = portrait
      this.line = line;
      this.name = name;
  }

  draw() {
      noStroke();
      // 투명도 추가
      fill(50, 50, 50, 150);
      rect(0, 600, 1200, 300);

      // dialog icon
      if (this.portrait) {
          image(this.portrait, 0, 600);

          fill(255);
          textFont(myeongjo);
          textSize(40);
          textAlign(LEFT);
          text(this.name, 300, 680);
          
          textSize(30);
          // text("- " + this.line, 320, 750);
          text(this.line, 310, 750);
      }

      triangle(1083, 839, 1149, 839, 1116, 871);
  }
  }
  
  class dot {
      constructor(X,Y,num) {
          this.X = X;
          this.Y = Y;
          this.on = false;
          this.name = num
          if (num == 1){
            stars[0] = this.name;
            this.on = true;
          }
      }
  
      draw() {
          if(this.on) {
              push();
              imageMode(CENTER);
              image(starOn,this.X,this.Y);
              pop();
          } else {
              push();
              imageMode(CENTER);
              image(starOff,this.X,this.Y);
              pop();
          }
      }
  }
  
  class player {
  constructor(state, X, Y, constrX, constrY, mapX, mapY, startX, startY, moveX, moveY) {
      this.X = X;
      this.Y = Y;
      this.get = null;
      this.images = [[right_1,right_0,right_2,right_0],[left_1,left_0,left_2,left_0],[front_1,front_0,front_2,front_0],[back_1,back_0,back_2,back_0]];
      this.state = state;
      if (this.images[0].includes(this.state)) {
          this.direction = "right";
      } else if(this.images[1].includes(this.state)) {
          this.direction = "left";
      } if(this.images[2].includes(this.state)) {
          this.direction = "front";
      } if(this.images[3].includes(this.state)) {
          this.direction = "back";
      }

      this.speed = 30;
      this.moveCount = 0;
      this.count = 4;
      
      this.bgXChange = 0;
      this.bgYChange = 0;
      this.playerX = this.X;
      this.playerY = this.Y;

      this.mapX=mapX;
      this.startX=startX;
      this.moveX=moveX;
      this.constrX=constrX;

      this.mapY=mapY;
      this.startY=startY;
      this.moveY=moveY;
      this.constrY=constrY;
  }

  draw() {
      if (this.get == "headphone") {
          this.images = [[h_right_1,h_right_0,h_right_2,h_right_0],[h_left_1,h_left_0,h_left_2,h_left_0],[h_front_1,h_front_0,h_front_2,h_front_0],[h_back_1,h_back_0,h_back_2,h_back_0]];
      } else if (this.get == "pouch") {
          this.images = [[p_right_1,p_right_0,p_right_2,p_right_0],[p_left_1,p_left_0,p_left_2,p_left_0],[p_front_1,p_front_0,p_front_2,p_front_0],[p_back_1,p_back_0,p_back_2,p_back_0]];
      } else {
          this.images = [[right_1,right_0,right_2,right_0],[left_1,left_0,left_2,left_0],[front_1,front_0,front_2,front_0],[back_1,back_0,back_2,back_0]];
      }

      if((keyIsDown(68)||keyIsDown(65)||keyIsDown(83)||keyIsDown(87))&&(keyCode!=ENTER)) {
          this.move();
      } else {
          this.stop();
      }

      this.playerX = constrain(this.X + this.bgXChange,max(this.constrX[0],0),min(this.constrX[1],1200-back_0.width));
      this.playerY = constrain(this.Y + this.bgYChange,max(this.constrY[0],0),min(this.constrY[1],900-back_0.height));

      image(this.state, this.playerX, this.playerY);
  }

  findKey() {
      let arrowKey = [68,65,83,87];
      for (let i=0; i<arrowKey.length; i++) {
          if (keyIsDown(arrowKey[i])) {
              if((keyIsDown(arrowKey[(i+1)%4])||keyIsDown(arrowKey[(i+2)%4])||keyIsDown(arrowKey[(i+3)%4]))&&key!=arrowKey[i]) {
                  return keyCode;
              } else {
                  return arrowKey[i];
              }
          }
      }   
  }

  move() {
    if(this.moveCount%2==0) {
      walk.play();
    } 
      let arrowKey = [68,65,83,87];
      let arrowFunction = [
          () => this.right(),
          () => this.left(),
          () => this.front(),
          () => this.back()];
                  
      if (arrowFunction[arrowKey.indexOf(this.findKey())] != -1) {
          arrowFunction[arrowKey.indexOf(this.findKey())]();
      }

      this.X = constrain(this.X,this.constrX[0],this.constrX[1]);
      this.Y = constrain(this.Y,this.constrY[0],this.constrY[1]);

  }
  
  stop() {
      this.moveCount=0;
      if (this.direction=="right") {
          this.state = this.images[0][1];
      } else if (this.direction=="left") {
          this.state = this.images[1][1];
      } else if (this.direction=="front") {
          this.state = this.images[2][1];
      } else if (this.direction=="back") {
          this.state = this.images[3][1];
      }
  }

  moveWall() {
      if (this.direction=="right") {
          return [1200-this.moveX-back_0.width+this.startX, this.mapX-this.moveX-back_0.width+this.startX, 1200-this.moveX-back_0.width];
      } else if (this.direction=="left") {
          return [1200+this.moveX+this.startX, this.startX+this.moveX, this.moveX];
      } else if (this.direction=="front") {
          return [900-back_0.height-this.moveY+this.startY, this.mapY-this.moveY-back_0.height+this.startY, 900-back_0.height-this.moveY];
      } else if (this.direction=="back") {
          return [900+this.moveY+this.startY, this.startY+this.moveY, this.moveY]
      }
  }

  right() {
      this.direction = "right";
      if (frameCount%this.count==0) {
          if (this.X >= this.moveWall()[0] && this.X < this.moveWall()[1] && this.playerX >= this.moveWall()[2]) {
              this.bgXChange -= this.speed;
          }
          this.state = this.images[0][this.moveCount%4];
          this.X += this.speed;
          this.moveCount++;
      }
  }

  left() {
      this.direction = "left";
      if (frameCount%this.count==0) {
          if (this.X <= this.moveWall()[0] && this.X > this.moveWall()[1] && this.playerX <= this.moveWall()[2]) {
              this.bgXChange += this.speed;
          }
          this.state = this.images[1][this.moveCount%4];
          this.X -= this.speed;
          this.moveCount++;
      }
  }

  front() {
      this.direction = "front";
      if (frameCount%this.count==0) {
          if (this.Y >= this.moveWall()[0] && this.Y < this.moveWall()[1] && this.playerY >= this.moveWall()[2]) {
              this.bgYChange -= this.speed;
          }
          this.state = this.images[2][this.moveCount%4];
          this.Y += this.speed;
          this.moveCount++;
      }
  }

  back() {
      this.direction = "back";
      if (frameCount%this.count==0) {
          if (this.Y <= this.moveWall()[0] && this.Y > this.moveWall()[1] && this.playerY <= this.moveWall()[2]) {
              this.bgYChange += this.speed;
          }
          this.state = this.images[3][this.moveCount%4];
          this.Y -= this.speed;
          this.moveCount++;
      }
  }

  center() {
      let center = [this.X+back_0.width/2,this.Y+back_0.height/2]
      return center;
  }

  reset(state,X,Y) {
      this.X = X;
      this.Y = Y;
      this.state = state;
      if (this.images[0].includes(this.state)) {
          this.direction = "right";
      } else if(this.images[1].includes(this.state)) {
          this.direction = "left";
      } if(this.images[2].includes(this.state)) {
          this.direction = "front";
      } if(this.images[3].includes(this.state)) {
          this.direction = "back";
      }

      this.moveCount = 0;

      this.bgXChange = 0;
      this.bgYChange = 0;
      this.playerX = this.X;
      this.playerY = this.Y;
  }
  }
  
  class starset {
      constructor(X,Y,set,num,bg) {
        this.X = X;
        this.Y = Y;
        this.set = set.bind(this);
        this.end = false;
        this.num = num;
        this.bg = bg;
        this.select = false;
      }
  
      draw() {
        if (!(this.end)) {
          if (page==2) {
            if (dist(this.X+bgX,this.Y+bgY,600,450)<300) {
              fill(255);
              push();
              noStroke();
              textAlign(CENTER,CENTER);
              textSize(25);
              textFont(myeongjo);
              text("[ENTER]",600,750);
              pop();
              if (keyIsPressed && keyCode == ENTER) {
                  this.select = true;
                  page = 3;
              }
            }
          } if (page==3 && this.select) {
              this.link();
              this.set();
          }
        }
      }
  
  
  link() {
    image(this.bg,0,0);
    for (let i = 0; i<dots.length; i++) {
        if (stars.includes(dots[i].name)) {
            dots[i].on = true;
        }
    }
    // 점
    for (let i=0; i<dots.length; i++) {
        dots[i].draw();
      }
  
    // 선
    for (let i = 0; i < stars.length - 1; i++) {
        startDot = dots.find(dot => dot.name == stars[i]);
        endDot = dots.find(dot => dot.name == stars[i+1]);

        if (startDot && endDot) {
            stroke(255,231,143);
            strokeWeight(10);
            line(startDot.X, startDot.Y, endDot.X, endDot.Y);
        }
    }
    if(stars.length<this.num) {
      if (stars.length == 1) {
        currentDot = dots[0];
      }
      if (currentDot) {
          stroke(255,250,200);
          strokeWeight(10);
          line(currentDot.X, currentDot.Y, mouseX, mouseY);
      }
    }
    this.check();
  }
  
  check() {
    if (stars.length == this.num) {
        let correctOrder = true;
        let reverseOrder = true;

        if (this.num==5 || this.num==7) {
          reverseOrder = false;
            // 정방향 순서 확인
            for (let i = 0; i < this.num; i++) {
                if (stars[i] != i + 1) {
                    correctOrder = false;
                    break;
                }
            }
        
        } else if (this.num==6) {
          let order1 = [1,2,3,4,5,1];
          let order2 = [1,5,4,3,2,1];
            // 정방향 순서 확인
            for (let i = 1; i < this.num; i++) {
                if (stars[i] !== order1[i]) {
                    correctOrder = false;
                    break;
                }
            }
        
            // 역방향 순서 확인
            for (let i = 0; i < this.num; i++) {
                if (stars[i] != order2[i]) {
                    reverseOrder = false;
                    break;
                }
            }
        }


        for (let i=0; i<dots.length; i++) {
            dots[i].on = false;
        }

        stars=[];
        currentDot = null;
        dots = [];

        if (correctOrder || reverseOrder) {
            this.end = true;
            page = 2;
        }
      }
    }
  }
    
    let back_0, back_1, back_2, front_0, front_1, front_2, left_0, left_1, left_2, right_0, right_1, right_2;
    let p_back_0, p_back_1, p_back_2, p_front_0, p_front_1, p_front_2, p_left_0, p_left_1, p_left_2, p_right_0, p_right_1, p_right_2;
    let h_back_0, h_back_1, h_back_2, h_front_0, h_front_1, h_front_2, h_left_0, h_left_1, h_left_2, h_right_0, h_right_1, h_right_2;
    let road, roadwd, scope, young_back, young_side, telescope;
    let page = 0;

    let dots = [];
    let stars = [];
    let currentDot = null; // 현재 활성화된 점
    
    let page0 = 0;
    let page1 = 0;
    let page2 = 0;
    let page3 = 0;
    let page4 = 0;
    let page5 = 0;
    let explain = true;

    let portrait, portrait_y;

    let startDot, endDot;
    let looping = false;
    let resetting = false;


    
    // let background = null;
    
    
    function _preload() {
      back_0 = loadImage("asset/character_normal/back_0.png");
      back_1 = loadImage("asset/character_normal/back_1.png");
      back_2 = loadImage("asset/character_normal/back_2.png");
      front_0 = loadImage("asset/character_normal/front_0.png");
      front_1 = loadImage("asset/character_normal/front_1.png");
      front_2 = loadImage("asset/character_normal/front_2.png");
      left_0 = loadImage("asset/character_normal/left_0.png");
      left_1 = loadImage("asset/character_normal/left_1.png");
      left_2 = loadImage("asset/character_normal/left_2.png");
      right_0 = loadImage("asset/character_normal/right_0.png");
      right_1 = loadImage("asset/character_normal/right_1.png");
      right_2 = loadImage("asset/character_normal/right_2.png");
      h_back_0 = loadImage("asset/character_headphone/back_0.png");
      h_back_1 = loadImage("asset/character_headphone/back_1.png");
      h_back_2 = loadImage("asset/character_headphone/back_2.png");
      h_front_0 = loadImage("asset/character_headphone/front_0.png");
      h_front_1 = loadImage("asset/character_headphone/front_1.png");
      h_front_2 = loadImage("asset/character_headphone/front_2.png");
      h_left_0 = loadImage("asset/character_headphone/left_0.png");
      h_left_1 = loadImage("asset/character_headphone/left_1.png");
      h_left_2 = loadImage("asset/character_headphone/left_2.png");
      h_right_0 = loadImage("asset/character_headphone/right_0.png");
      h_right_1 = loadImage("asset/character_headphone/right_1.png");
      h_right_2 = loadImage("asset/character_headphone/right_2.png");
      p_back_0 = loadImage("asset/character_pouch/back_0.png");
      p_back_1 = loadImage("asset/character_pouch/back_1.png");
      p_back_2 = loadImage("asset/character_pouch/back_2.png");
      p_front_0 = loadImage("asset/character_pouch/front_0.png");
      p_front_1 = loadImage("asset/character_pouch/front_1.png");
      p_front_2 = loadImage("asset/character_pouch/front_2.png");
      p_left_0 = loadImage("asset/character_pouch/left_0.png");
      p_left_1 = loadImage("asset/character_pouch/left_1.png");
      p_left_2 = loadImage("asset/character_pouch/left_2.png");
      p_right_0 = loadImage("asset/character_pouch/right_0.png");
      p_right_1 = loadImage("asset/character_pouch/right_1.png");
      p_right_2 = loadImage("asset/character_pouch/right_2.png");
    
      namu = loadFont("asset/namu.ttf");
      myeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');
    
      road = loadImage("asset/road.png");
      roadwd = loadImage("asset/roadwd.png");
      scope = loadImage("asset/scope.png");
      telescope = loadImage("asset/telescope.png");
      young_back = loadImage("asset/young_back.png");
      young_side = loadImage("asset/young_side.png");
      night_bg = loadImage("asset/night.png");
    
      portrait = loadImage("asset/mc_4.png");
      portrait_y = loadImage("asset/young_mc.png");
      i_candy = loadImage("asset/icon/candy.png")
    
      starMap = loadImage("asset/starmap/starMap.png");
      starOn = loadImage("asset/starmap/star_on.png");
      starOff = loadImage("asset/starmap/star_off.png");
      scope = loadImage("asset/starmap/scopeSight.png");
      minor = loadImage("asset/starmap/minor.png");
      cepheus = loadImage("asset/starmap/cepheus.png");
      cassiopeia = loadImage("asset/starmap/cassiopeia.png");

      mi_end = loadImage("asset/sm_end.png");
      ce_end = loadImage("asset/ce_end.png");
      ca_end = loadImage("asset/ca_end.png");

      walk = loadSound("asset/sound/walking_grass_4.mp3");
      teles = loadSound("asset/sound/telescope_4.mp3");
      winds = loadSound("asset/sound/wind_blow_4.mp3");
      clicks = loadSound("asset/sound/paper_right_1.mp3");

    }
    let me;
    
    function _setup() {
      createCanvas(1200, 900);
      me = new player(back_0, 590-back_0.width/2, 800-back_0.height, [470,700-back_0.width], [-400,900-back_0.height],1200,1800,0,-900,0,449);
      star1 = new starset(0,850,cassiopeiaing,5,cassiopeia);
      star2 = new starset(700,50,cepheusing,6,cepheus);
      star3 = new starset(1200,550,minoring,7,minor);
      me2 = new player(back_0, 590-back_0.width/2,700-back_0.height,[470,700-back_0.width],[300,900-back_0.height],1200,900,0,0,0,0);
      frameRate(60);
    }
    
    let alpha=0;
    let i=0;
    let bgX=0;
    let bgY=0;
    
    function _draw() {
      console.log('starscore: '+starscore,'clockscore: '+clockscore,'moneyscore: '+moneyscore,'heartscore: '+heartscore);
      if (resetting) {
        return "cutscene";
      }

      if (!looping) {
        winds.loop();
        looping = true;
      }

      // 이동까지
      if (page==0) {
        if(page0==0) {
          alpha++;
          noStroke();
          fill(0,0,0,constrain(5*alpha,0,255));
          rect(0,0,1200,900);
          fill(255);
          textSize(100);
          textAlign(CENTER,CENTER);
          textFont(namu);
          text("4. 나의 어린 시절",600,450);
          if(alpha>=51) {
            alpha=51;
            page0=1;
          }
        }

        else if (page0==1) {
          image(road,0,-900);
          image(young_back,600,-450);
          image(telescope,500,-450);
          image(back_0, 590-back_0.width/2, 800-back_0.height);
          let d = new dialogue(portrait,"",'.....여기는...');
          d.draw();
        }

        else if (page0==2) {
          image(road,0,-900);
          image(young_back,600,-450);
          image(telescope,500,-450);
          image(back_0, 590-back_0.width/2, 800-back_0.height);
          let d = new dialogue(portrait,"",'내가 어릴 때... 별 보러 자주 왔던 들판인데.');
          d.draw();
        }

        else if(page0==3) {
          image(road,0,-900+me.bgYChange);
          image(young_back,600,-450+me.bgYChange);
          image(telescope,500,-450+me.bgYChange);
          me.draw();
          if (me.Y <= -400) {
            page = 1;
            page0==0;
          }
        }
      }
      
      // 꼬마
      else if(page==1) {
        image(night_bg,0,0);
        image(young_back,600,450);
        image(back_0, 470,385);
        let d1 = new dialogue(portrait_y,"꼬마",'"어, 안녕하세요!"');
        let d2 = new dialogue(portrait," ",'"너는..."');
        let d3 = new dialogue(portrait_y,"꼬마",'"저, 별을 보고 싶은데 망원경 쓰는 게 조금 어려워서요..."');
        let d4 = new dialogue(portrait_y,"꼬마",'"도와주시면 안 될까요?"');
        if (page1==0) {
          d1.draw();
        } else if (page1==1) {
          d2.draw();
        } else if (page1==2) {
          d3.draw();
        } else if (page1==3) {
          d4.draw();
        }
        else if (page1==4) {
          page1=0;
          page = 2;
        }
      }
    
      else if (page==2) {
        if(mouseIsPressed) {
          explain = false;
          bgX += mouseX - pmouseX;
          bgY += mouseY - pmouseY;
        }

        bgX = constrain(bgX,-600,600);
        bgY = constrain(bgY,-450,450);
        image(starMap,-600+bgX,-450+bgY);
        star1.draw();
        star2.draw();
        star3.draw();

        let num=0;
        if (star1.end){
          num++;
          image(ca_end,310-600+bgX,1025-450+bgY);
        }
        if (star2.end) {
          num++;
          image(ce_end,935-600+bgX,230-450+bgY); 
        }
        if (star3.end) {
          num++;
          image(mi_end,1605-600+bgX,795-450+bgY);
        }
    
        image(scope,0,0,1200,900);
        if(explain) {
          let d1 = new dialogue(portrait,"",'[마우스로 망원경을 움직여 별을 찾아보세요.]');
          d1.draw();
        }

        fill(255);
        noStroke();
        textSize(100);
        textFont(namu);
        text(num+"/3",1050,50);
      }
    
      else if (page==3) {
        star1.draw();
        star2.draw();
        star3.draw();
        answer();
      }
    
      else if (page==4) {
        image(night_bg,0,0);
        image(young_back,600,450);
        image(back_0, 470,385);
        let d1 = new dialogue(portrait_y,"꼬마",'와, 언니 정말 대단한 것 같아요! 감사합니다!');
        let d2 = new dialogue(portrait_y,"꼬마",'그런데 언니, 언니도 별을 좋아하세요?');
        let d3 = new dialogue(portrait_y,"꼬마",'언니는 무엇을 하더라도 정말 멋있을 것 같아요.');
        let d4 = new dialogue(portrait,"",'...고마워');
        let d5 = new dialogue(portrait_y,"꼬마",'언니, 손 주세요.');
        let d6 = new dialogue(createImage(300,300),"","[사탕을 얻었다.]");
        let d7 = new dialogue(portrait,"",'고마워.');
        let d8 = new dialogue(portrait,"",'응, 엄청 좋아해.');
        let d9 = new dialogue(portrait,"",'응, 좋아하긴 해.');
        if (page4==0) {
          d1.draw();
        } else if (page4==1) {
          d2.draw();
        } else if (page4==2) {
          if (starscore>=2) {
            d8.draw();
          } else {
            d9.draw();
          }
        } else if (page4==3) {
          d3.draw();
        } else if (page4==4) {
          d4.draw();
        } else if (page4==5) {
          d5.draw();
        } else if (page4==6) {
          d6.draw();
          image(i_candy,350,790);
        } else if (page4==7) {
          d7.draw();
        } else if (page4==8) {
          page4=0;
          page = 5;
          stage = 5;
        }
      }
    
      else if (page==5) {
          image(roadwd,0,0,1200,900);
          image(young_back,900,450);
          image(telescope,800,450);
          let d1 = new dialogue(portrait_y,"꼬마",'이제 저쪽으로 가면 돼요.');
          let d2 = new dialogue(portrait_y,"꼬마",'지금까지, 정말 수고 많았어요.');
          let d3 = new dialogue(portrait,"",'...!');
          let d4 = new dialogue(portrait,"",'.....');
          let d5 = new dialogue(portrait,"",'...고마워.');
          if (page5==0) {
            d1.draw();
          } else if (page5==1) {
            d2.draw();
          } else if (page5==2) {
            d3.draw();
          } else if (page5==3) {
            d4.draw();
          } else if (page5==4) {
            d5.draw();
          } else {
            image(young_back,900,450);
            image(telescope,800,450);
            me2.draw();
            if (me2.Y <= 300) {
              page5==0;
              return "stage5";
            }
          }
        }
        if (mouseX > 10 && mouseX < 130 && mouseY > 10 && mouseY < 60){
          fill(0);
          strokeWeight(1);
          rect(10,10,120,50);
  
          fill(255);
          strokeWeight(1);
          textFont(myeongjo);
          textAlign(CENTER,CENTER);
          textSize(22);
          text("[처음으로]",70,30);
        }
        else {
          fill(0,100);
          strokeWeight(1);
          rect(10,10,120,50);
  
          fill(255);
          strokeWeight(1);
          textFont(myeongjo);
          textAlign(CENTER,CENTER)
          textSize(22);
          text("[처음으로]",70,30);
        }
      }
    
    
    function _keyPressed() {
      if(page==0 && keyCode == ENTER) {
        if (page0<3) {
          page0++;
        }
      }
      if (page==1 && keyCode==ENTER) {
        page1++;
      }
      if (page==4 && keyCode==ENTER) {
        page4++;
      }
      if (page==5 && keyCode==ENTER) {
        page5++;
      }
    }
    
    function answer() {
      // 정답 확인
      if (star1.end && star2.end && star3.end) {
        page = 4;
      }
    }


    function _mouseClicked() {
      if (page==2) {
        teles.play();
      }

      if (page==3) {
        // 점 클릭 확인
        for (let i = 0; i < dots.length; i++) {
          if (dist(mouseX, mouseY, dots[i].X, dots[i].Y) < 50) {
            stars.push(dots[i].name); // 클릭된 점의 ID 추가
            currentDot = dots[i]; // 현재 점 업데이트
            clicks.play();
            break;
          }
        }
      }
      if (mouseX > 10 && mouseX < 130 && mouseY > 10 && mouseY < 60){
        starscore = 0;
        heartscore = 0;
        moneyscore = 0;
        clockscore = 0;
        winds.pause();
        resetting = true;
      }


    }
    
    function minoring () {
      dots = [];
      dots[0] = new dot(37*5,30*5,1);
      dots[1] = new dot(50*5,65*5,2);
      dots[2] = new dot(75*5,85*5,3);
      dots[3] = new dot(112*5,93*5,4);
      dots[4] = new dot(120*5,122*5,5);
      dots[5] = new dot(182*5,117*5,6);
      dots[6] = new dot(169*5,82*5,7);
    }
    
    function cepheusing () {
      dots = [];
      dots[0] = new dot(84*5,47*5,1);
      dots[1] = new dot(61*5,99*5,2);
      dots[2] = new dot(120*5,128*5,3);
      dots[3] = new dot(159*5,72*5,4);
      dots[4] = new dot(157*5,15*5,5);
    }
    
    function cassiopeiaing () {
      dots = [];
      dots[0] = new dot(52*5,57*5,1);
      dots[1] = new dot(92*5,106*5,2);
      dots[2] = new dot(119*5,59*5,3);
      dots[3] = new dot(167*5,100*5,4);
      dots[4] = new dot(175*5,45*5,5);
    }

    return {
      preload: _preload,
      setup: _setup,
      draw: _draw,
      mouseClicked: _mouseClicked,
      keyPressed: _keyPressed,
    };
  }

  const stage4 = createStage4();
