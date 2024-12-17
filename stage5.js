// starscore = 2;
// heartscore = 1;
// moneyscore = 0;
// clockscore = 0;
// candyscore = 1;

function createStage5() {
class ego {
        constructor(X,Y) {
            this.X = X;
            this.Y = Y;
            this.num = 0;
        }
    
        draw() {
            let egos= [ego_0,ego_1,ego_0,ego_2];
            if(frameCount%4==0) {
                this.num++;
            }
            push();
            imageMode(CENTER);
            image(egos[this.num%4],this.X,this.Y);
            pop();
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
    
    let items = [];
    
    let back_0, back_1, back_2, front_0, front_1, front_2, left_0, left_1, left_2, right_0, right_1, right_2;
    
    let page = 0;
    
    let page0 = 0;
    let page1 = 0;
    let page2 = 0;
    let page3 = 0;
    let page4 = 0;
    let page5 = 0;
    
    let alpha = 51;
    
    let i = 0;
    let n = 0;
    
    let star1,star2,star3;

    let looping = false;
    let resetting = false;
    
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
    
        namu = loadFont("asset/namu.ttf");
        myeongjo = loadFont("asset/Nanummyeongjo.ttf");
    
        portrait = loadImage("asset/mc.png");
        
        star1 = loadImage("asset/star/star1.png");
        star2 = loadImage("asset/star/star2.png");
        star3 = loadImage("asset/star/star3.png");
    
        i_clock = loadImage("asset/icon/clock.png");
        i_heart = loadImage("asset/icon/heart.png");
        i_money = loadImage("asset/icon/money.png");
        i_star = loadImage("asset/icon/star.png");
        i_candy = loadImage("asset/icon/candy.png");
    
        ego_0 = loadImage("asset/ego/ego_0.png");
        ego_1 = loadImage("asset/ego/ego_1.png");
        ego_2 = loadImage("asset/ego/ego_2.png");
        ego1 = loadImage("asset/ego/ego1.png");
        ego2 = loadImage("asset/ego/ego2.png");
        ego3 = loadImage("asset/ego/ego3.png");
        ego4 = loadImage("asset/ego/ego4.png");
    
        hug1 = loadImage("asset/hug/hug1.png");
        hug2 = loadImage("asset/hug/hug2.png");
        hug3 = loadImage("asset/hug/hug3.png");
        hug4 = loadImage("asset/hug/hug4.png");
        hug5 = loadImage("asset/hug/hug5.png");

        walk = loadSound("asset/sound/walk_default.mp3");
    
    }
    
    function _setup() {
        createCanvas(1200, 900);
        myego = new ego(600,300+star1.height/2,160,0);
        frameRate(30);
        for (let i=0; i<starscore; i++) {
            console.log('i am pushed, star');
            items.push(i_star);
        }

        if (heartscore ==1) {
            console.log('i am pushed, heart');
            items.push(i_heart);
        }

        if(moneyscore == 1) {
            console.log('i am pushed, money');
            items.push(i_money);
        }

        if (clockscore == 1) {
            console.log('i am pushed, clock');
            items.push(i_clock);
        }

        items.push(i_candy);

    }
    
    function _draw() {
        console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);

        if (resetting) {
            return "cutscene";
        }

        if (!looping) {
            winds.loop();
            looping = true;
          }

        if (page==0) {
            image(back_0,600-back_0.width/2,800-back_0.height);
            noStroke();
            fill(0,0,0,constrain(5*alpha,0,255));
            rect(0,0,1200,900);
            alpha--;
            if(alpha<=0) {
                alpha=0;
                page=1;
            }
    
        }
        
        else if (page==1) {
            background(0);
            image(back_0,600-back_0.width/2,800-back_0.height);
            switch (page1) {
                case 0:
                    let d1 = new dialogue(portrait,"",'여긴 어디지...');
                    d1.draw();
                    break;
    
                case 1:
                    if(i>=4) {
                        page1=2;
                        i=0;
                    } else {
                        let stars = [star3,star2,star3,star1];
                        image(stars[i],600-star3.width/2,300);
                        if(frameCount%10==0) {
                            i++;
                        }
                    }
                    break;
    
                case 2:
                    image(star1,600-star3.width/2,300);
                    let d2 = new dialogue(portrait,"",'별...?');
                    d2.draw();
                    break;
                case 3:
                    image(star1,600-star3.width/2,300);
                    let d3 = new dialogue(createImage(300,300),"",'[가방이 꿈틀거린다.]');
                    d3.draw();
                    break;
                case 4:
                    page1=0;
                    page=2;
                break;
            }
    
        }
    
        else if (page==2) {
            background(0);
    
            switch (page2) {
                case 0:
                    // if (frameCount%2==0) {
                        n++;
                    // }
                    push();
                    imageMode(CENTER);
                    image(items[0],600,750-10*n-star1.height/2,30,30);
                    image(star1,600,300+star1.height/2);
                    pop();
                    // image(star1,600,300);
                    if (n>=35) {
                        n=0;
                        page2=1;
                    }
                    break;
    
                case 1:
                    // if (frameCount%2==0) {
                        n++;
                    // }
                    push();
                    imageMode(CENTER);
                    image(items[1],600,750-10*n,30,30);
                    image(star1,600,300+star1.height/2,90,100);
                    pop();
                    if (n>=35) {
                        n=0;
                        page2=2;
                    }
                    break;
    
                case 2:
                    // if (frameCount%2==0) {
                        n++;
                    // }
                    push();
                    imageMode(CENTER);
                    image(items[2],600,750-10*n,30,30);
                    image(star1,600,300+star1.height/2,100,110);
                    pop();
                    if (n>=35) {
                        n=0;
                        page2=3;
                    }
                    break;
    
                case 3:
                    // if (frameCount%2==0) {
                        n++;
                    // }
                    push();
                    imageMode(CENTER);
                    image(items[3],600,750-10*n,30,30);
                    image(star1,600,300+star1.height/2,110,120);
                    pop();
                    if (n>=35) {
                        n=0;
                        page2=4;
                    }
                    break;
                
                case 4:
                    let egos = [star1,ego1,ego2,ego3,ego4,ego_0];
                    if(n>=5) {
                        n=0;
                        page=3;
                        page2==0;
                    } else {
                        push();
                        imageMode(CENTER);
                        if (n==0) {
                            image(star1,600,300+star1.height/2,120,130);
                        } else {
                            image(egos[n],600,300+star1.height/2);
                        }
                        pop();
                        if (frameCount%5==0) {
                            n++;
                        }
                    }
    
            }
            image(back_0,600-back_0.width/2,800-back_0.height);
    
        }
    
    
        else if (page==3) {
            switch (page3) {
                case 0:
                    background(0);
                    myego.draw();
                    image(back_0,600-back_0.width/2,800-back_0.height);
                    let d1 = new dialogue(portrait,"",'너는...!');
                    d1.draw();
                    break;
    
                case 1:
                    background(0);
                    myego.draw();
                    let move = [back_1, back_0, back_2, back_0]
                    if(n>=3) {
                        n=0;
                        page3=2;
                    } else {
                        if (frameCount%4==0) {
                            n++;
                        }
                        image(move[n],600-back_0.width/2-n*22,800-back_0.height-n*32);
                        if(n%4==1) {
                            walk.play();
                        }
                    }
                    break;
    
                case 2:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d2 = new dialogue(portrait,"",'나... 이제 알 것 같아. 왜 나를 이 세계로 데려온 건지.');
                    d2.draw();
                    break;
    
                case 3:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d3 = new dialogue(portrait,"",'내가 무슨 길을 걸어왔는지 알게 되었어.');
                    d3.draw();
                    break;
                
                case 4:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d4 = new dialogue(portrait,"",'내가 무엇을 소중하게 생각하는지도...');
                    d4.draw();
                    break;
    
                case 5:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d5 = new dialogue(portrait,"",'그리고,');
                    d5.draw();
                    break;
    
                case 6:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d6 = new dialogue(portrait,"",'내가 어떤 길을 나아가야 하는 사람인지.');
                    d6.draw();
                    break;
    
                case 7:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d7 = new dialogue(portrait,"",'.....');
                    d7.draw();
                    break;
    
                case 8:
                    background(0);
                    image(back_0,600-back_0.width/2-88,800-back_0.height-128);
                    myego.draw();
                    let d8 = new dialogue(portrait,"",'...고마워, 또다른 나.');
                    d8.draw();
                    break;
                
                case 9:
                    background(0);
                    let hug = [hug1, hug2, hug3, hug4, hug5, hug5, hug5, hug5, hug5, hug5, hug5]
                    if(n>=hug.length) {
                        n=0;
                        page3=10;
                    } else {
                        push();
                        imageMode(CENTER);
                        image(hug[n],600-back_0.width/2,800-back_0.height-80);
                        pop();
                        if (frameCount%12==0) {
                            n++;
                        }
                    }
                    break;
                
                case 10:
                    winds.pause();
                    page3=0;
                    return "stage6";
                    // page=4;
                    break;
            }
        }
        // if (mouseX > 50 && mouseX < 170 && mouseY > 50 && mouseY < 100){
        //     fill(255);
        //     rect(50,50,120,50);
    
        //     fill(0);
        //     textFont(myeongjo);
        //     textAlign(CENTER,CENTER);
        //     textSize(22);
        //     text("[처음으로]",110,75);
        //   }
        //   else {
        //     console.log("a")
        //     fill(255,100);
        //     rect(50,50,120,50);
    
        //     fill(0);
        //     textFont(myeongjo);
        //     textAlign(CENTER,CENTER)
        //     textSize(22);
        //     text("[처음으로]",110,75);
        //   }
    }
    
    function _keyPressed() {
        if (page==1 && keyCode == ENTER) {
            page1++;
        }
    
        if (page==3 && keyCode == ENTER) {
            page3++;
        }
    }

    function _mouseClicked() {
        if (mouseX > 50 && mouseX < 170 && mouseY > 50 && mouseY < 100){
            starscore = 0;
            heartscore = 0;
            moneyscore = 0;
            clockscore = 0;
            resetting = true;
        }
    }


    return {
        preload: _preload,
        setup: _setup,
        draw: _draw,
        keyPressed: _keyPressed,
        mouseClicked: _mouseClicked
      };
}

const stage5 = createStage5();