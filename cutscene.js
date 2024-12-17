var starscore = 0;
var heartscore = 0;
var moneyscore = 0;
var clockscore = 0;

let heartGet = false;
let moneyGet = false;
let clockGet = false;

function createCutscene() {
    class Dialogue {
        constructor(line, type) {
            // this.portait = portait
            this.line = line;
            this.type = type;
        }

        draw() {
            noStroke();
            // 배경
            //fill(50);
            fill(50, 50, 50, 180);
            rect(0, 600, 1200, 300);

            /*
            // dialog icon
            if (dialogIconImages[this.type]) {
                image(dialogIconImages[this.type], 0, 600);

                fill(200);
                textSize(40);
                textAlign(LEFT);
                text(dialogTitle[this.type], 300, 700); // when CENTER
            }
             */

            fill(200);
            textSize(30);
            //textAlign(LEFT);
            //text("- " + this.line, 320, 750); // when CENTER
            textAlign(CENTER);
            text(this.line, 600, 750); // when CENTER
            //if (dialogIconImages[this.type]) {
                triangle(1083, 839, 1149, 839, 1116, 871);
            //}
        }
    }

    class StartButton {
        constructor() {
            this.isFocused = false;
        }

        reset() {
            this.isFocused = false;
        }

        draw() {
            let c = color(200);
            if (this.isFocused) {
                c.setAlpha(255);
            } else {
                c.setAlpha(100);
            }
            fill(c);
            rect(500,505,200,50);

            if (this.isFocused) {
                fill(0);
            } else {
                fill(255);
            }
            textSize(20);
            textFont(fontMyeongjo);
            text('시작하기',600,535);
        }

        focused() {
            this.isFocused = true;
        }

        unfocused() {
            this.isFocused = false;
        }
    }

    //--------------------------------------------------------------------------
    // Start - cutscene
    //--------------------------------------------------------------------------
    let fontNamu, fontMyeongjo;
    let soundCutscene_0;
    let dialogIconImages = {}; // dialog icon을 담을 객체
    let dialogTitle = {
        "mc": "",
        "mc_4": "",
        "self_broken": "???",
        "young_mc": "꼬마"
    };
    let sceneImages = []; // 컷신 이미지 배열
    let currentScene = 1; // 현재 컷신 번호
    let stepInScene = 1;

    let sceneSwitched = false; // 맵이 전환된 상태를 추적
    let transitionTime = 1000; // 1초
    let transitionStartTime = -1; // 전환 시작 시간

    const startButton = new StartButton();

    let keyIgnoreTime = 200; // 200ms
    let keyIgnoreStartTime = -1; // key ignore start time

    function resetCutscene() {
        currentScene = 1;
        stepInScene = 1
        sceneSwitched = false
        transitionStartTime = -1;
        startButton.reset();
    }

    function _preload(){
        sceneImages[2] = loadImage('assets/cutscene/0_0.png');
        sceneImages[3] = loadImage('assets/cutscene/0_1.png');
        sceneImages[4] = loadImage('assets/cutscene/0_2.png');
        sceneImages[5] = loadImage('assets/cutscene/0_3.png');
        sceneImages[6] = loadImage('assets/cutscene/0_4.png');
        sceneImages[7] = loadImage('assets/cutscene/0_5.png');

        dialogIconImages = {
            "mc": loadImage('assets/dialog_icon/mc.png'),
            "mc_4": loadImage('assets/dialog_icon/mc_4.png'),
            "self_broken": loadImage('assets/dialog_icon/self_broken.png'),
            "young_mc": loadImage('assets/dialog_icon/young_mc.png'),
        };

        fontLush = loadFont('assets/fonts/Lush.ttf');
        fontNamu = loadFont('assets/fonts/namu.ttf');
        fontMyeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');
        //fontJungwon = loadFont('assets/fonts/NanumNanumJungwon.ttf');

        soundCutscene_0 = loadSound('assets/sound/0/cutscene_0.mp3');
    }

    function _setup(){
        createCanvas(1200,900);
    }

    function _draw(){
        console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
        let result = null;

        let passedTime = millis() - transitionStartTime;
        if (transitionStartTime > 0 && passedTime < transitionTime) {
            // 전환 화면(검은 화면) 출력
            fill(0);
            rect(0, 0, width, height);
            return; // 검은 화면이 그려지는 동안 다른 맵을 그리지 않음
        } else if (transitionStartTime > 0 && passedTime >= transitionTime) {
            // 전환이 끝나면 다음 맵 그리기
            transitionStartTime = -1; // 타이머 리셋
        }

        // 키 입력 일정 시간 무시
        passedTime = millis() - keyIgnoreStartTime;
        if (keyIgnoreStartTime > 0 && passedTime < keyIgnoreTime) {
            return;
        } else if (keyIgnoreStartTime > 0 && passedTime >= keyIgnoreTime) {
            keyIgnoreStartTime = -1; // 타이머 리셋
        }

        //컷신 넘기기
        background(0);
        drawScene(currentScene);
        switch (currentScene) {
            case 1:
                if (isStartButtonPressed()) {
                    changeScene(2);
                }
                break;

            case 2:
                if (keyIsPressed && keyCode === ENTER) {
                    keyIgnoreStartTime = millis();
                    changeScene(3);
                }
                break;

            case 3:
                if (!soundCutscene_0.isPlaying()) {
                    soundCutscene_0.play();
                }

                let scene3d1 = new Dialogue('"..."', "mc");
                scene3d1.draw();
                switch (stepInScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(4);
                        }
                        break;
                }
                break;

            case 4:
                let scene4d1 = new Dialogue('매일같이 그런 생각이 든다.', "mc");
                let scene4d2 = new Dialogue('나는 왜 살고 있는 걸까?', "mc");
                switch (stepInScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 2;
                        }
                        break;
                    case 2:
                        scene4d1.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 3;
                        }
                        break;
                    case 3:
                        scene4d2.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(5);
                        }
                        break;
                }
                break;

            case 5:
                let scene5d1 = new Dialogue('천문학의 꿈을 포기하고 금융계에 취직한지도 벌써 3년이 되었다.', "mc");
                let scene5d2 = new Dialogue('진로를 잘 선택했다고 생각했는데... 자꾸만 이상한 생각이 든다.', "mc");
                let scene5d3 = new Dialogue('내가 이렇게 삶을 보내도 괜찮은 걸까?', "mc");
                let scene5d4 = new Dialogue('나는 무엇을 하기 위해 태어난 걸까?', "mc");
                let scene5d5 = new Dialogue('내가 죽으면, 나는 무엇을 남기고 떠나게 될까...', "mc");
                switch (stepInScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 2;
                        }
                        break;
                    case 2:
                        scene5d1.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 3;
                        }
                        break;
                    case 3:
                        scene5d2.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 4;
                        }
                        break;
                    case 4:
                        scene5d3.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 5;
                        }
                        break;
                    case 5:
                        scene5d4.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 6;
                        }
                        break;
                    case 6:
                        scene5d5.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(6);
                        }
                        break;
                }
                break;

            case 6:
                let scene6d1 = new Dialogue('"이런 생각은 하고 싶지 않은데,"', "mc");
                let scene6d2 = new Dialogue('"잊어버리더라도... \n나도 모르는 순간에 생각들이 다시 나타나 내 살을 파고든다."', "mc");
                let scene6d3 = new Dialogue('"내 삶의 목적이 이러한 생각들을 \n떨쳐내기 위한 것이라는 생각마저도 든다."', "mc");
                let scene6d4 = new Dialogue('"나는..."', "mc");
                switch (stepInScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 2;
                        }
                        break;
                    case 2:
                        scene6d1.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 3;
                        }
                        break;
                    case 3:
                        scene6d2.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 4;
                        }
                        break;
                    case 4:
                        scene6d3.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 5;
                        }
                        break;
                    case 5:
                        scene6d4.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(7);
                        }
                        break;
                }
                break;

            case 7:
                let scene7d1 = new Dialogue('"..."', "mc");
                let scene7d2 = new Dialogue('"...내려야겠다"', "mc");
                switch (stepInScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 2;
                        }
                        break;
                    case 2:
                        scene7d1.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            stepInScene = 3;
                        }
                        break;
                    case 3:
                        scene7d2.draw()
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();

                            result = "start";
                            resetCutscene();
                            if (soundCutscene_0.isPlaying()) {
                                soundCutscene_0.stop();
                            }

                            if (!soundTrain_leave_0.isPlaying()) {
                                soundTrain_leave_0.play();
                                soundTrain_leave_0StartTime = millis();
                            }
                        }
                        break;
                }
                break;
        }

        if (sceneSwitched) {
            sceneSwitched = false;
        }

        return result;
    }

    //--------------------------------------------------------------------------
    function drawScene(sceneNumber) {
        switch (sceneNumber) {
            case 1:
                drawFirstScene();
                break;

            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                if (sceneImages[sceneNumber]) {
                    if (sceneNumber === 2) {
                        image(sceneImages[sceneNumber], 0, 0, 1200, 900);
                    } else {
                        image(sceneImages[sceneNumber], 0, 0);
                    }
                } else {
                    console.error('cutscene::drawScene(), number=' + sceneNumber);
                }
                break;
        }
    }

    function drawFirstScene() {
        background(0);
        textAlign(CENTER);
        fill(255);
        textSize(100);
        textFont(fontLush);
        text('DIE EINHEIT', 600,320);
        textSize(70);
        textFont(fontNamu);
        text('나의 방향을 찾아서 ', 600, 400);

        /*
        fill(200);
        rect(500,505,200,50);

        fill(255);
        textSize(20);
        textFont(fontMyeongjo);
        text('시작하기',600,535);
         */
        startButton.draw();
    }

    function isStartButtonPressed() {
        let result = false;
        if (mouseIsPressed && mouseX > 500 && mouseX < 700 && mouseY > 505 && mouseY < 555) {
            result = true;
        }
        /*
        console.log('cutscene::isStartButtonPressed(), result=' + result +
                ', mouseIsPressed=' + mouseIsPressed +
                ', mouseX=' + mouseX +
                ', mouseY=' + mouseY);
         */
        return result;
    }

    function changeScene(sceneNumber, useFadeIn = false) {
        console.log('cutscene::changeScene(), sceneNumber=' + sceneNumber);
        sceneSwitched = true;
        if (useFadeIn) {
            transitionStartTime = millis();
        }
        currentScene = sceneNumber;
        stepInScene = 1;
    }

    function _keyPressed() {
        console.log('cutscene::keyPressed(), key=' + key);
    }

    // for a test.
    /*
    function _mousePressed() {
        console.log('cutscene::_mousePressed()')
    }

    function _mouseDragged() {
        console.log('cutscene::_mouseDragged()')
    }

    function _mouseReleased() {
        console.log('cutscene::_mouseReleased()')
    }
     */
    function _mouseMoved() {
        //console.log('cutscene::_mouseMoved()')
        if (mouseX > 500 && mouseX < 700 && mouseY > 505 && mouseY < 555) {
            startButton.focused();
        } else {
            startButton.unfocused();
        }
    }

    return {
        stageName : "cutscene",
        preload: _preload,
        setup: _setup,
        draw: _draw,
        // for a test.
        keyPressed: _keyPressed,
        /*
        mousePressed: _mousePressed,
        mouseDragged: _mouseDragged,
        mouseReleased: _mouseReleased,
         */
        mouseMoved: _mouseMoved,
    }
}

const cutScene = createCutscene();

