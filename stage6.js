function createStage6() {

    let ending1, ending2, ending3, ending4, ending5;
    let alpha=0;

    let resetting = false;

    function ending(name) {
        fill(255,constrain(5*alpha,0,255));
        noStroke();
        textAlign(LEFT);
        textSize(100);
        textFont(lush);
        text("THE END",60,720);
        textSize(30);
        textFont(myeongjo);
        text(name,80,820);
    }
    
    function _preload() {
        ending1 = loadImage("asset/ending/ending1.png");
        ending2 = loadImage("asset/ending/ending2.png");
        ending3 = loadImage("asset/ending/ending3.png");
        ending4 = loadImage("asset/ending/ending4.png");
        ending5 = loadImage("asset/ending/ending5.png");

        lush = loadFont("asset/Lush.ttf");
        myeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');
    }
    
    function _setup() {
        createCanvas(1200, 900);
    }
    
    function _draw() {
        console.log(starscore,clockscore,moneyscore,heartscore);

        if (resetting) {
            return "cutscene";
        }
        background(0);
        noStroke();
        tint(255,constrain(5*alpha,0,255));
        alpha++;
        if (starscore==3) {
            image(ending1,0,0);
            ending("ENDING 1: 천문학자")
        } else if (starscore==2) {
            if (clockscore!=0) {
                image(ending2,0,0);
                ending("ENDING 2: 새로운 도전")
            } else if (moneyscore!=0) {
                image(ending2,0,0);
                ending("ENDING 2: 새로운 도전")
            } else if (heartscore!=0) {
                image(ending3,0,0);
                ending("ENDING 3: 다시 용기를 내서")
            }
        } else if (starscore==1) {
            image(ending4,0,0);
            ending("ENDING 4: 작게 타오르는 불꽃")
        } else {
            image(ending5,0,0);
            ending("ENDING 5: 만족")
        }
        if (mouseX > 1000 && mouseX < 1120 && mouseY > 800 && mouseY < 850){

            fill(255,100);
            stroke(255);
            strokeWeight(1);
            rect(1000,800,120,50);
    
            fill(255);
            textFont(myeongjo);
            textAlign(CENTER,CENTER);
            textSize(22);
            text("[처음으로]",1060,825);
          }
          else {
            noFill();
            stroke(255);
            strokeWeight(1);
            rect(1000,800,120,50);
    
            textFont(myeongjo);
            textAlign(CENTER,CENTER)
            textSize(22);
            fill(255);
            text("[처음으로]",1060,825);
          }
    }
    function _mouseClicked() {
        if (mouseX > 1000 && mouseX < 1120 && mouseY > 800 && mouseY < 850){
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
        mouseClicked: _mouseClicked
      };
}

const stage6 = createStage6();
