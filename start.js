function createStart() {
    class InteractionGuide {
        draw() {
            //console.log('InteractionGuide::draw()');
            noStroke();

            // 투명도 추가
            fill(50, 50, 50, 180);
            rect(1050, 10, 130, 50);

            fill(200);
            textAlign(LEFT);

            textSize(20);
            textFont(fontJungwon);
            text("이동: wasd", 1050 + 10, 10 + 20);
            text("인터랙션: ENTER", 1050 + 10, 10 + 40);
        }
    }

    class Dialogue {
        constructor(line, type) {
            // this.portait = portait
            this.line = line;
            this.type = type;
        }

        draw() {
            noStroke();
            // 배경
            if (currentMap === 6) {
                fill(50);
            } else {
                // 투명도 추가
                fill(50, 50, 50, 100);
            }
            fill(50, 50, 50, 100);
            rect(0, 600, 1200, 300);

            // dialog icon
            if (dialogIconImages[this.type]) {
                image(dialogIconImages[this.type], 0, 600);

            }

            fill(255);
            textSize(30);
            textFont(fontMyeongjo);
            if (dialogIconImages[this.type]) {
                textAlign(LEFT);
                text(/*"- " +*/ this.line, 320, 750); // when CENTER
            } else {
                textAlign(CENTER);
                text(this.line, 600, 750); // when CENTER
            }

            //if (dialogIconImages[this.type]) {
                triangle(1083, 839, 1149, 839, 1116, 871);
            //}
        }
    }

    class EnteredDialogue {
        constructor(line, type) {
            // this.portait = portait
            this.line = line;
            this.type = type;
            this.isCompleted = false;
        }

        reset() {
            this.isCompleted = false;
        }

        draw() {
            if (!this.isCompleted) {
                noStroke();
                // 배경
                if (currentMap === 6) {
                    fill(50);
                } else {
                    // 투명도 추가
                    fill(50, 50, 50, 100);
                }
                fill(50, 50, 50, 100);
                rect(0, 600, 1200, 300);

                // dialog icon
                if (dialogIconImages[this.type]) {
                    image(dialogIconImages[this.type], 0, 600);

                    fill(255);
                    textSize(40);
                    textFont(fontMyeongjo);
                    textAlign(LEFT);
                    text(dialogTitle[this.type], 300, 700); // when CENTER
                }

                fill(255);
                textSize(30);
                textFont(fontMyeongjo);
                if (dialogIconImages[this.type]) {
                    textAlign(LEFT);
                    text("- " + this.line, 320, 750); // when CENTER
                } else {
                    textAlign(CENTER);
                    text(this.line, 600, 750); // when CENTER
                }

                //if (dialogIconImages[this.type]) {
                triangle(1083, 839, 1149, 839, 1116, 871);
                //}
            }
        }

        enter() {
            this.isCompleted = true;
        }
    }

    class InteractionDialogue {
        constructor(line, type) {
            this.enterCount = 0;
            this.dialogue = new Dialogue(line, type);
        }

        reset() {
            this.enterCount = 0;
        }

        draw() {
            if (this.enterCount === 1) {
                this.dialogue.draw();
            }
        }

        enter() {
            this.enterCount++;
        }
    }

    class Map3IntroDialog {
        constructor() {
            this.currentStep = 0;
            this.dialogues = [
                new Dialogue('어서 집에 가고 싶어...', "mc"),
                new Dialogue('[이동키를 눌러 집으로 이동하세요.]'),
            ];
        }

        reset() {
            this.currentStep = 0;
        }

        draw() {
            if (this.dialogues[this.currentStep]) {
                this.dialogues[this.currentStep].draw();
            }
        }

        enter() {
            this.currentStep++;
        }

        isComplete() {
            return this.dialogues[this.currentStep] ? false : true;
            //return (this.currentStep >= 5)
        }
    }

    class Map4IntroDialog {
        constructor() {
            this.currentStep = 0;
            this.dialogues = [
                new Dialogue('집을 좀 살펴볼까...', "mc"),
                new Dialogue('[ENTER 키를 눌러 방을 탐색하세요.]'),
            ];
        }

        reset() {
            this.currentStep = 0;
        }

        draw() {
            if (this.dialogues[this.currentStep]) {
                this.dialogues[this.currentStep].draw();
            }
        }

        enter() {
            this.currentStep++;
        }

        isComplete() {
            return this.dialogues[this.currentStep] ? false : true;
            //return (this.currentStep >= 5)
        }
    }

    class Map7IntroDialog {
        constructor() {
            this.currentStep = 0;
            this.dialogues = [
                new Dialogue('여기는... 강의실이잖아.', "mc"),
                new Dialogue('바닥에 무언가 떨어져 있는 것 같아.', "mc"),
                new Dialogue('....시험지인가...?', "mc"),
                new Dialogue('맞아. 그때 여기서 시험지를 찢어버렸었는데.', "mc"),
                new Dialogue('시험지를 다시... 찾아봐야겠어', "mc"),
                new Dialogue('[ENTER 키로 시험지 조각을 모으세요.]'),
            ];
        }

        reset() {
            this.currentStep = 0;
        }

        draw() {
            if (this.dialogues[this.currentStep]) {
                this.dialogues[this.currentStep].draw();
            }
        }

        enter() {
            this.currentStep++;
        }

        isComplete() {
            return this.dialogues[this.currentStep] ? false : true;
            //return (this.currentStep >= 5)
        }
    }

    class ResetButton {
        constructor() {
            this.isFocused = false;
        }

        reset() {
            this.isFocused = false;
        }

        draw() {
            let c = color(0);
            if (this.isFocused) {
                c.setAlpha(255);
            } else {
                c.setAlpha(100);
            }
            fill(c);
            rect(10, 10, 120, 50);

            fill(255);
            textAlign(CENTER);
            textSize(25);
            textFont(fontMyeongjo);
            text('[처음으로]', 70, 45);
        }

        focused() {
            this.isFocused = true;
        }

        unfocused() {
            this.isFocused = false;
        }
    }

    class SelectionGuide {
        constructor() {
            this.COLOR_RECT_NORMAL = 180;
            this.COLOR_TEXT_NORMAL = 255;

            this.COLOR_RECT_SELECTION = 255;
            this.COLOR_TEXT_SELECTION = 0;

            this.clockDialog = new Dialogue("[시계를 얻었다.]");
            this.starDialog = new Dialogue("[별을 얻었다.]");
            //this.resetGameButton = new ResetButton();

            this.selectionStartTime = -1;
        }

        reset() {
            //this.resetGameButton.reset();
        }

        draw() {
            if (currentMap === 7 && map7PieceDialog.currentStep === 2) {
                //this.resetGameButton.draw();

                fill(50, 50, 50, 100);
                rect(100, 700, 1000, 200);

                if (isMap7Selected) {
                    if (shouldShowClock) {
                        this.clockDialog.draw();
                        giveClock();
                        if (!isClockCounted) {
                            clockscore++;
                            console.log('clockscore 1개 추가');
                            console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
                            isClockCounted = true;
                        }
                    }

                    if (shouldShowStar) {
                        // this.starDialog.draw();
                        // giveStar();
                        // if (!isStarCounted) {
                        //     console.log('starscore 1개 추가');
                        //    starscore++;
                        //    isStarCounted = true;
                        // }
                    }

                    let passedTime = millis() - this.selectionStartTime;
                    if (this.selectionStartTime > 0 && passedTime < 1000) {
                        return;
                    } else {
                        this.selectionStartTime = -1;
                    }

                    if (map7Selection === 'up') {
                        return "stage2";
                    } else {
                        return "stage1";
                    }
                } else {
                    if (map7Selection === 'up') {
                        this.drawUpperLine(true);
                        this.drawLowerLine(false);
                    } else if (map7Selection === 'down') {
                        this.drawUpperLine(false);
                        this.drawLowerLine(true);
                    } else {
                        this.drawUpperLine(false);
                        this.drawLowerLine(false);
                    }
                }
            }
        }

        goToNextStep() {
            this.selectionStartTime = millis();
        }

        drawUpperLine(isSelected) {
            const colorText = isSelected ? this.COLOR_TEXT_SELECTION : this.COLOR_TEXT_NORMAL;
            const colorRect = isSelected ? this.COLOR_RECT_SELECTION : this.COLOR_RECT_NORMAL

            if (isSelected) {
                fill(colorRect);
                rect(180, 725, 400, 50);
            }
            fill(colorText);
            textSize(30);
            textFont(fontMyeongjo);
            textAlign(LEFT);
            text('시험지를 그대로 둔다.', 200, 760);
        }

        drawLowerLine(isSelected) {
            const colorText = isSelected ? this.COLOR_TEXT_SELECTION : this.COLOR_TEXT_NORMAL;
            const colorRect = isSelected ? this.COLOR_RECT_SELECTION : this.COLOR_RECT_NORMAL

            if (isSelected) {
                fill(colorRect);
                rect(180, 775, 400, 50);
            }
            fill(colorText);
            textSize(30);
            textFont(fontMyeongjo);
            textAlign(LEFT);
            text('시험지를 다시 맞춰본다.', 200, 810);
        }
    }

    class Map7PieceDialog {
        constructor() {
            this.isStarted = false;
            this.currentStep = 0;
            this.dialogues = [
                new Dialogue('시험지를 다 모은 것 같아...',"mc"),
                new Dialogue('그런데, 이걸 다시 맞춰야 할까...?', "mc"),
                new Dialogue('meow', "mc"),
            ];
            /*
            this.selectionDialog = new SelectionGuide();
            this.selection = null;
            this.selectionStartTime = -1;
             */
        }

        reset() {
            this.isStarted = false;
            this.currentStep = 0;
            /*
            this.selection = null;
            this.selectionStartTime = -1;
             */
        }

        start() {
            this.isStarted = true;
        }

        draw() {
            if (this.isStarted && this.currentStep !== 2) {
                if (this.dialogues[this.currentStep]) {
                    this.dialogues[this.currentStep].draw();
                }
            }
        }

        enter() {
            if (this.currentStep === 2) {
                /*
                this.selection = map7Selection;
                this.selectionStartTime = millis();

                if (map7Selection === 'up') {
                    shouldShowClock = true;
                    shouldShowStar = false;
                } else if (map7Selection === 'down') {
                    shouldShowClock = false;
                    shouldShowStar = true;
                }
                 */
            }
            if (this.currentStep < 2) {
                this.currentStep++;
            }
        }

        isComplete() {
            return this.currentStep === 1;
        }
    }

    class Map7ScoreBoard {
        draw() {
            fill(255);
            textAlign(RIGHT);
            textSize(100);
            textFont(fontJungwon);
            const score = `${collectedCount}/5`;
            text(score, 1170, 100);
        }
    }

    class Player {
        constructor(state, X, Y) {
            this.X = X;
            this.Y = Y;
            this.state = state;
            if ([right_0, right_1, right_2].includes(state)) {
                this.direction = "right";
            } else if ([left_0, left_1, left_2].includes(state)) {
                this.direction = "left";
            } else if ([front_0, front_1, front_2].includes(state)) {
                this.direction = "front";
            } else if ([back_0, back_1, back_2].includes(state)) {
                this.direction = "back";
            }
            this.speed = 5;
            this.moveCount = 0;
            this.count = 4;
        }

        getPressedKey() {
            let result = null;
            if (keyIsPressed) {
                if (isThisKeyDown('w')) {
                    result = 'w';
                }
                if (isThisKeyDown('a')) {
                    result = 'a';
                }
                if (isThisKeyDown('s')) {
                    result = 's';
                }
                if (isThisKeyDown('d')) {
                    result = 'd';
                }
            }
            return result;
        }

        draw(x, y) {
            let skipUpdateMotion = false;
            if (currentMap === 3) {
                if (!map3IntroDialog.isComplete()) {
                    skipUpdateMotion = true;
                }
            }
            if (currentMap === 4) {
                if (!map4IntroDialog.isComplete()) {
                    skipUpdateMotion = true;
                }
            }
            if (currentMap === 7) {
                if (!map7IntroDialog.isComplete()) {
                    skipUpdateMotion = true;
                } else if (collectedCount === 5) {
                    skipUpdateMotion = true;
                }
            }
            /*
            if (currentMap === 4) {
                if (!map4IntroDialog.isComplete()) {
                    skipUpdateMotion = true;
                } else if (collectedCount === 5) {
                    skipUpdateMotion = true;
                }
            }
             */

            //if (currentMap === 5 && userAnimator.isStarted) {
            //    skipUpdateMotion = true;
            //}

            this.X = x;
            this.Y = y;

            if (!skipUpdateMotion) {
                const lowerKey = this.getPressedKey();
                if (lowerKey) {
                    if (!soundWalkDefault.isPlaying()) {
                        soundWalkDefault.play();
                    }
                }
                if (keyIsPressed &&
                        (lowerKey === 'w' || lowerKey === 'a' ||
                         lowerKey === 's' || lowerKey === 'd' )) {
                    this.move(lowerKey);
                } else {
                    //this.moveCount=0;
                    //if (soundWalkDefault.isPlaying()) {
                    //    soundWalkDefault.stop();
                    //}
                    this.stop();
                    if (soundWalkDefault.isPlaying()) {
                        soundWalkDefault.stop();
                    }
                }
            }

            push();
            rectMode(CENTER);
            image(this.state, this.X, this.Y);
            pop();

            // for a TEST
            // for map - 2, 3, 5
            //fill(0, 100, 0, 150);
            //rect(this.X + 5, this.Y + 5, 95 - 10, 240 - 10);
            // for map - 4, 6
            //fill(0, 100, 0, 150);
            //rect(this.X + 5, this.Y + 130, 95 - 10, 100);
        }

        move(key) {
            if (key === "d") {
                this.right();
            } else if (key === "a") {
                this.left();
            } else if (key === "w") {
                this.back();
            } else if (key === "s") {
                this.front();
            }

            /*
            console.log('start::Player::move, key=' + key +
                    ', x=' + this.X +
                    ', y=' + this.Y +
                    ', frameCount=' + frameCount +
                    ', moveCount=' + this.moveCount +
                    ', count=' + this.count);
             */
        }

        stop() {
            if (this.state === right_1 || this.state === right_2) {
                this.state = right_0;
            } else if (this.state === left_1 || this.state === left_2) {
                this.state = left_0;
            } else if (this.state === front_1 || this.state === front_2) {
                this.state = front_0;
            } else if (this.state === back_1 || this.state === back_2) {
                this.state = back_0;
            }
        }

        right() {
            let order = [right_1, right_0, right_2, right_0];
            if (this.direction !== "right" || (frameCount % this.count) === 0) {
                if (this.direction !== "right") {
                    this.moveCount = 0;
                }
                this.state = order[this.moveCount%4];
                this.moveCount++;
            }
            this.direction = "right";
            //console.log('start::Player::right, state = ', this.state);
        }

        left() {
            let order = [left_1, left_0, left_2, left_0];
            if (this.direction !== "left" || (frameCount % this.count) === 0) {
                if (this.direction !== "left") {
                    this.moveCount = 0;
                }
                this.state = order[this.moveCount%4];
                this.moveCount++;
            }
            this.direction = "left";
            //console.log('start::Player::left, state = ', this.state);
        }

        front() {
            let order = [front_1, front_0, front_2, front_0];
            if (this.direction !== "front" || (frameCount % this.count) === 0) {
                if (this.direction !== "front") {
                    this.moveCount = 0;
                }
                this.state = order[this.moveCount%4];
                this.moveCount++;
            }
            this.direction = "front";
            //console.log('start::Player::front, state = ', this.state);
        }

        back() {
            let order = [back_1, back_0, back_2, back_0];
            if (this.direction !== "back" || (frameCount % this.count) === 0) {
                if (this.direction !== "back") {
                    this.moveCount = 0;
                }
                this.state = order[this.moveCount%4];
                this.moveCount++;
            }
            this.direction = "back";
            //console.log('start::Player::back, state = ', this.state);
        }

        center() {
            let center = [this.X + parseInt(back_0.width/2), this.Y + parseInt(back_0.height/2)]
            //console.log('start::Player::center');
            return center;
        }

        reset(X, Y) {
            //console.error('start::Player::reset');
            this.X = X;
            this.Y = Y;
            this.state = front_0;
            this.direction = "front";
            this.moveCount = 0;
            this.count = 4;
        }
    }

    class UserAnimator {
        constructor() {
            this.isStarted = false;
            this.current = 0;
            this.portalCurrent = 0;
            this.firstDialog = new Dialogue('...도...', "self_broken");
            this.secondDialog = new Dialogue('...?', "mc");
            this.thirdDialog = new Dialogue('뭐야...?', "mc");
            this.forthDialog = new Dialogue('도와...', "self_broken");
            this.fifth_0Dialog = new Dialogue('무슨 일이....', 'mc');
            this.fifthDialog = new Dialogue('... 들어가보자.', "mc");
            this.isCrackingSoundPlayed = false;
        }

        start() {
            this.isStarted = true;
        }

        reset() {
            this.isStarted = false;
            this.current = 0;
            this.portalCurrent = 0;
            this.isCrackingSoundPlayed = false;
            animationStartTime = -1;
        }

        // draw_SelfAnimation(){
        //     drawingContext.save();
        //     drawingContext.beginPath();
        //     drawingContext.rect(280,81,645,270);
        //     drawingContext.clip();
        //     push();
        //     translate(0,411);
        //     fill(255,255,0,100);
        //     tint(255,200);

        // }

        drawCrackingAinmation() {
            drawingContext.save();
            drawingContext.beginPath();
            drawingContext.rect(280, 81, 645, 270); // 클리핑 영역 정의
            drawingContext.clip();

            push();
            translate(0, 411);
            fill(255, 255, 0, 100);
            tint(255, 200);

            if (frameCount % 15 === 0) {
                image(breakSelf[this.current], 550, -300);
                this.current++;
                userY += 40;
                if (this.current > 3) {
                    this.current = 3;
            
                }
            } else {
                //console.log("start::UserAnimator::draw(), current=" + this.current);
                image(breakSelf[this.current], 550, -300);
            }
            pop();

            // 클리핑 해제
            drawingContext.restore();

            //싱넣
            image(sink, 500, 300);
        }

        drawPortalAnimation() {
            if (frameCount % 6 === 0) {
                image(portal[this.portalCurrent], 500, 250);
                this.portalCurrent++;
                if (this.portalCurrent > 2) {
                    this.portalCurrent = 0;
                }
            } else {
                image(portal[this.portalCurrent], 500, 250);
            }
        }

        drawBroken() {
            // 클리핑 설정
            drawingContext.save();
            drawingContext.beginPath();
            drawingContext.rect(280, 81, 645, 270); // 클리핑 영역 정의
            drawingContext.clip();

            // 이미지 그리기
            push();
            translate(0, 411);
            fill(255, 255, 0, 100);
            tint(255, 200);
            image(breakSelf[0], 550, -300);
            pop();

            // 클리핑 해제
            drawingContext.restore();
            image(sink, 500, 300);
        }

        draw() {
            if (this.isStarted) {
                switch (dialSwitch) {
                    case 0:
                        this.firstDialog.draw();
                        break;

                    case 1:
                        this.secondDialog.draw();
                        break;

                    case 2:
                        this.drawBroken();
                        this.thirdDialog.draw();
                        break;

                    case 3:
                        this.drawBroken();
                        this.forthDialog.draw();
                        break;

                    case 4:
                        if (!this.isCrackingSoundPlayed && !soundCracking.isPlaying()) {
                            this.isCrackingSoundPlayed = true;
                            soundCracking.play();
                        }
                        //console.log('start::UserAnimator::draw(), case 1');

                        this.drawCrackingAinmation();

                        let elapsedTime = millis() - animationStartTime;
                        if (elapsedTime > 2000){
                            animationStartTime = millis();
                            dialSwitch = 5;
                        }
                        break;

                    case 5:
                        background(0);
                        if (soundCracking.isPlaying()) {
                            soundCracking.stop();
                        }
                        if (!soundPortalForm.isPlaying()) {
                            soundPortalForm.play();
                        }

                        this.drawPortalAnimation();

                        this.fifth_0Dialog.draw();

                        let elapsedTime2 = millis() - animationStartTime;
                        if (elapsedTime2 > 1000){
                            dialSwitch = 6;
                        }


                        break;

                    case 6:
                        background(0);
                        if (soundPortalForm.isPlaying()) {
                            soundPortalForm.stop();
                        }
                        if (!soundPortalDefault.isPlaying()) {
                            soundPortalDefault.play();
                        }

                        this.drawPortalAnimation();
                        break;

                    case 7:
                        background(0);
                        this.drawPortalAnimation();

                        this.fifthDialog.draw();
                        break;
                }
            }
        }
    }

    //--------------------------------------------------------------------------
    // Start - start
    //--------------------------------------------------------------------------
    const PLAYER_WIDTH = 95;
    const PLAYER_HEIGHT = 240;
    const PIECE_WIDTH = 35;
    const PIECE_HEIGHT = 40;

    let fontLush, fontNamu, fontMyeongjo, fontJungwon;
    let soundWalkDefault, soundStreet0, soundWater0;
    let soundRoom1, soundPaperPick;
    let soundCracking, soundPortalForm, soundPortalDefault;
    let soundChoice;
    let platform, escalator, ticketGate, outdoor, odf;
    let home, homeDoor, homeMirror, homePoster, chair, table, sink;
    let bathroom;
    let cm, ct, cc, ld, tc;
    let clock, star;
    let pb1, pb2, pb3, pb4, pb5;
    let pm1, pm2, pm3, pm4, pm5;
    let ps1, ps2, ps3, ps4, ps5;
    let plate;
    let back_0, back_1, back_2;
    let front_0, front_1, front_2;
    let left_0, left_1, left_2;
    let right_0, right_1, right_2;
    let user;
    let dialogIconImages = {}; // dialog icon을 담을 객체
    let dialogTitle = {
        "mc": "",
        "mc_4": "",
        "self_broken": "???",
        "young_mc": "꼬마"
    };

    let userX = 100;
    let userY = 620;
    let moveSpeed = 8;
    let currentMap = 1;
    //let currentMap = 6; // for a test
    let mapSwitched = false; // 맵이 전환된 상태를 추적
    let resetGameButton = new ResetButton();

    let map1Obstacles = [
        //{x: 700, y: 405, w: 500, h: 100}, // escalator parts
        //{x: 550, y: 475, w: 650, h: 5}, // escalator bottom
        {x: 800, y: 475, w: 400, h: 25}, // bench
        {x: 550, y: 375, w: 700, h: 25},

        {x: 0, y: 250, w: 1200, h: 5}, // map top
        {x: 0, y: 0, w: 5, h: 900}, // map left
        {x: 1195, y: 0, w: 5, h: 900}, // map right
        {x: 0, y: 900, w: 1200, h: 5}, // map bottom
    ];
    let map2Obstacles = [
        { x: 0, y: 300, w: 65, h: 260 },
        { x: 290, y: 300, w: 65, h: 260 },
        { x: 570, y: 300, w: 65, h: 260 },
        { x: 855, y: 300, w: 65, h: 260 },
        { x: 1135, y: 300, w: 65, h: 260 },
        //{ x: 0, y: 665, w: 215, h: 35 },
        { x: 0, y: 665, w: 180, h: 35 },
        { x: 0, y: 875, w: 215, h: 35 },

        {x: 0, y: 0, w: 1200, h: 5}, // map top
        {x: 0, y: 0, w: 5, h: 900}, // map left
        {x: 1195, y: 0, w: 5, h: 900}, // map right
        {x: 0, y: 900, w: 1200, h: 5}, // map bottom
    ];

    const map3IntroDialog = new Map3IntroDialog();
    let map3Obstacles = [
        {x: 0, y: 0, w: 2270, h: 215},
        {x: 0, y: 565, w: 2270, h: 350},

        //{x: 885, y: 0, w: 300, h: 315},
        {x: 0, y: 0, w: 10, h: 900},
    ];

    const map4IntroDialog = new Map4IntroDialog();
    let map4dLast1 = new Dialogue('음... 이제 씻고 나와야겠어.', "mc");
    let map4dLast2 = new EnteredDialogue('[화장실로 이동하세요.]');
    let map4LastStep = 1;
    let map4Dialogue;
    let map4InteractingCount = 0;
    let currentMap4InteractingObstacle = null;
    let map4PosterDimension = {x: 520, y: 150, w: 220, h: 80};
    let map4MirrorDimension = {x: 0, y: 400, w: 70, h: 215}; // mirrorside
    //let map4SinkDimension = {x: 910, y: 710, w: 260, h: 100}; // sink
    let map4InteractingObstacleInfo = [{
        type: 'poster',
        dim: map4PosterDimension,
        dialogue: new InteractionDialogue('별과 우주에 대한 포스터들이 벽에 붙어있다... \n언제봐도 정말 예뻐.', "mc"),
        isInteracted: false,
    }, {
        type: 'mirror',
        dim: map4MirrorDimension,
        dialogue: new InteractionDialogue('....별로야', "mc"),
        isInteracted: false,
        /*
    }, {
        type: 'sink',
        dim: map4SinkDimension,
        dialogue: new InteractionDialogue('"그냥... 싱크대네"', "mc"),
        isInteracted: false,
         */
    }];
    let map4Obstacles = [
        // 인터랙션이 있는 장매물이 배열 앞에 있어야 함.
        // - collision 장애물이 여러 개 있어도 첫번째 장애물을 기준으로 판단하므로
        map4PosterDimension,
        map4MirrorDimension,
        //map4SinkDimension,
        {x: 910, y: 710, w: 260, h: 100}, // sink
        {x: 0, y: 150, w: 1200, h: 5}, // room upper bound
        {x: 800, y: 200, w: 400, h: 130}, // bedside table
        {x: 920, y: 180, w: 280, h: 320}, // bed
        {x: 520, y: 380, w: 90, h: 165}, // chair
        {x: 350, y: 380, w: 235, h: 180}, // table
        {x: 730, y: 710, w: 470, h: 175}, // whole sink

        //{x: 0, y: 0, w: 1200, h: 5}, // map top
        {x: 0, y: 0, w: 5, h: 900}, // map left
        {x: 1195, y: 0, w: 5, h: 900}, // map right
        {x: 0, y: 900, w: 1200, h: 5}, // map bottom
    ];

    let map5Obstacles = [
        {x: 0, y: 0, w: 1200, h: 300},
        {x: 515, y: 320, w: 150, h: 20},

        {x: 130, y: 0, w: 10, h: 900}, // map left
        {x: 1060, y: 0, w: 10, h: 900}, // map right
        {x: 0, y: 900, w: 1200, h: 5}, // map bottom
    ];

    const map7FixedObstacles = [
        {x: 0, y: 0, w: 5, h: 1500}, // map left
        {x: 1195, y: 0, w: 5, h: 1500}, // map right
        {x: 0, y: 1500, w: 1200, h: 5}, // map bottom
    ];
    let map7Obstacles = [];
    let map7Pieces = [];
    const map7IntroDialog = new Map7IntroDialog();
    let map7Selection = null;
    let isMap7Selected = false;
    const map7PieceDialog = new Map7PieceDialog();
    const map7SelectionGuide = new SelectionGuide();
    const map7ScoreBoard = new Map7ScoreBoard();
    let shouldShowClock = false;
    let isClockCounted = false;
    let shouldShowStar = false;
    let isStarCounted = false;

    let outdoorX = 0;
    let cmY = 0;
    let map3OffsetX, map5OffsetY;

    let interactionGuide = new InteractionGuide();
    let map1d1 = new Dialogue('[이동키를 눌러 지하철역에서 나가세요.]');
    let showMap1Dialog = true;

    let transitionTime = 500; // 0.5초 (500ms)
    let transitionStartTime = -1; // 전환 시작 시간

    let keyIgnoreTime = 200; // 200ms
    let keyIgnoreStartTime = -1; // key ignore start time

// 시험지 조각의 위치와 수집 상태 저장
    let paperPieces = [
        { x: 187, y: 280, collected: false },
        { x: 80, y: 1300, collected: false },
        { x: 1100, y: 600, collected: false },
        { x: 400, y: 800, collected: false },
        { x: 750, y: 1200, collected: false }
    ];
    let collectedCount = 0; // 수집된 조각 개수
    let ptext = false;
    let showText = true;
    let textCount = 0;

    let sceneImages = []; // 컷신 이미지 배열
    let currentScene = 1; // 현재 컷신 번호
    let stepInScene = 1;
    let sceneSwitched = false; // 맵이 전환된 상태를 추적


    // for an animation - map5
    let breakSelf = [];
    let portal = [];
    let dialSwitch = 0;
    let animationStartTime = -1;
    let userAnimator = new UserAnimator();

    function resetStart() {
        user.front();
        userX = 100;
        userY = 620;

        showMap1Dialog = true;
        userAnimator.reset();

        currentMap = 1;
        mapSwitched = false;
        resetGameButton.reset();

        map4LastStep = 1;
        map4dLast2.reset();
        map4Dialogue = null;
        map4InteractingCount = 0;
        currentMap4InteractingObstacle = null;
        map4InteractingObstacleInfo.forEach((obstacleInfo) => {
            obstacleInfo.isInteracted = false;
            obstacleInfo.dialogue.reset();
        });

        map3IntroDialog.reset();
        map4IntroDialog.reset();

        map7IntroDialog.reset();
        map7PieceDialog.reset();
        map7SelectionGuide.reset();
        paperPieces.forEach((piece) => {
            piece.collected = false;
        });
        map7Selection = null;
        isMap7Selected = false;
        shouldShowClock = false;
        isClockCounted = false;
        shouldShowStar = false;
        isStarCounted = false;

        // clockscore = 0;
        // starscore = 0;

        outdoorX = 0;
        cmY = 0;

        collectedCount = 0;

        currentScene = 1;
        stepInScene = 1;
        sceneSwitched = false;

        dialSwitch = 0;

        soundTrain_leave_0StartTime = -1; // 타이머 리셋

        if (soundTrain_leave_0.isPlaying()) {
            soundTrain_leave_0.stop();
        }
        if (soundCracking.isPlaying()) {
            soundCracking.stop();
        }
        if (soundPortalDefault.isPlaying()) {
            soundPortalDefault.stop();
        }
        if (soundPortalForm.isPlaying()) {
            soundPortalForm.stop();
        }
        if (soundStreet0.isPlaying()) {
            soundStreet0.stop();
        }
        if (soundWater0.isPlaying()) {
            soundWater0.stop();
        }
    }

    // function getUserMirrorX() {
    //     return userX + 10;
    // }

    // function getUserMirrorY(noMargin = false) {
    //     let result = -userY;
    //     if (!noMargin) {
    //         result -= 50;
    //     }
    //     return result;
    // }

    function pstext() {
        /*
        if (collectedCount > 0 && collectedCount < 5 && ptext === true && showText === true) {
            fill(255);
            rect(450, 785, 300, 20);
            fill(0);
            textAlign(CENTER);
            text('시험지 조각이 더 있을거야', 600, 800);
        } else if (collectedCount === 5 && ptext === false && showText === true) {
            fill(255);
            rect(450, 785, 300, 20);
            fill(0);
            text('시험지 조각을 다 모았어', 600, 800);
            textCount++;
            if (keyIsPressed && keyCode === ENTER && textCount > 20) {
                ptext = true;
                showText = false;
            }
        }
         */
    }

    function psChoice() {
    }

    function giveClock() {
        fill(20);
        rect(0,0,1200,900);
        push();
        imageMode(CENTER);
        image(clock, 600,400);
        pop();
        fill(255);
        text('[시계를 얻었다.]',600,600);
    }

    function giveStar() {
        image(star, userX, userY - star.height - 20);
    }

    function drawInitMap() {
        switch (currentMap) {
            case 1:
                image(platform, 0, 0);
                image(escalator, 0, 0);
                // for a test
                //fill(100, 0, 0, 150);
                //rect(0, 250, 1200, 5); // room upper
                break;
            case 2:
                image(ticketGate, 0, 0);
                break;
            case 3:
                image(odf, 0, 0);
                image(outdoor, outdoorX, 0);
                break;
            case 4:
                image(home, 0, 0);
                image(homeDoor, 0, 0);
                image(homeMirror, 0, 0);
                
                image(homePoster, 0, 0);
                image(chair, 520, 380);
                image(table, 350, 380);
                break;
            case 5:
                image(bathroom, 0, 0);
                image(sink, 500, 300);
                break;
            case 6:
                drawScene(currentScene);
                break;
            case 7:
                image(plate, 0, 0);
                break;
        }
    }

    function drawAfterUser() {
        switch (currentMap) {
            case 1:
                interactionGuide.draw();
                if (showMap1Dialog){
                    map1d1.draw();
                }
                break;
            case 2:
                interactionGuide.draw();
                // map2d1.draw();
                break;
            case 3:
                interactionGuide.draw();

                if (!mapSwitched) {
                    if (!map3IntroDialog.isComplete()) {
                        map3IntroDialog.draw();
                    }
                }
                break;
            case 4:
                interactionGuide.draw();
                map4Dialogue && map4Dialogue.draw();

                if (!mapSwitched) {
                    if (!map4IntroDialog.isComplete()) {
                        map4IntroDialog.draw();
                    }
                }
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                if (!mapSwitched && !sceneSwitched) {
                    if (!map7IntroDialog.isComplete()) {
                        map7IntroDialog.draw();
                    }
                    map7ScoreBoard.draw();

                    //return map7PieceDialog.draw();
                    map7PieceDialog.draw();
                    const result = map7SelectionGuide.draw();
                    if (result) {
                        return result;
                    }
                }
                break;
        }
    }

    function drawScene(sceneNumber) {
        switch (sceneNumber) {
            case 1:
                drawFirstScene();
                break;

            case 2:
            case 3:
            case 4:
            case 5:
                if (sceneImages[sceneNumber]) {
                    image(sceneImages[sceneNumber], 0, 0);
                } else {
                    console.error('start::drawScene(), number=' + sceneNumber);
                }
                break;
        }
    }

    function drawFirstScene() {
        background(0);
        fill(255);
        textSize(100);
        textAlign(CENTER);
        textFont(fontNamu);
        text('1. 결정', 600, 450);
    }

    function moveMap(direction) {
        switch (direction) {
            case 'up':
                if (currentMap === 7) {
                    cmY += moveSpeed
                }
                break;

            case 'down':
                if (currentMap === 7) {
                    cmY -= moveSpeed
                }
                break;

            case 'left':
                if (currentMap === 3) {
                    outdoorX += moveSpeed
                }
                break;

            case 'right':
                if (currentMap === 3) {
                    outdoorX -= moveSpeed
                }
                break;
        }
    }

    // for 'w', 'a', 's', 'd'
    function isThisKeyDown(key) {
        let result = false;
        if (key === 'w') {
            if (keyIsDown(119) || keyIsDown(87)) {
                result = true;
            }
        }

        if (key === 'a') {
            if (keyIsDown(97) || keyIsDown(65)) {
                result = true;
            }
        }

        if (key === 's') {
            if (keyIsDown(115) || keyIsDown(83)) {
                result = true;
            }
        }

        if (key === 'd') {
            if (keyIsDown(100) || keyIsDown(68)) {
                result = true;
            }
        }
        return result;
    }

    function userMovement() {
        let nextX = userX;
        let nextY = userY;
        let direction = 'unknown';

        if (isThisKeyDown('w') && userY - 35 > -cm.height) { // W 키 (위로 이동)
            nextY -= moveSpeed;
            //if (currentMap === 7) {
            //    cmY += moveSpeed
            //}
            direction = 'up';
        } else if (isThisKeyDown('s') && userY + 35 < cm.height) { // S 키 (아래로 이동)
            nextY += moveSpeed;
            //if (currentMap === 7) {
            //    cmY -= moveSpeed
            //}
            direction = 'down';
        } else if (isThisKeyDown('a') && userX - 35 > -cm.width) { // A 키 (왼쪽으로 이동)
            nextX -= moveSpeed;
            //if (currentMap === 3) {
            //    outdoorX += moveSpeed
            //}
            direction = 'left';
        } else if (isThisKeyDown('d') && userX + 35 < cm.width) { // D 키 (오른쪽으로 이동)
            nextX += moveSpeed;
            //if (currentMap === 3) {
            //    outdoorX -= moveSpeed
            //}
            direction = 'right';
        }

        if (direction !== 'unknown') {
            if (currentMap === 3) {
                if (!map3IntroDialog.isComplete()) {
                    return;
                }
            }
            if (currentMap === 4) {
                if (!map4IntroDialog.isComplete()) {
                    return;
                }
            }
            if (currentMap === 7) {
                if (!map7IntroDialog.isComplete() || collectedCount === 5) {
                    return;
                }
            }

            //if (currentMap === 5 && userAnimator.isStarted) {
            //    return;
            //}

            let isColliding = isCollidingWithObstacle(nextX, nextY, direction);
            if (!isColliding) {
                userX = nextX;
                userY = nextY;
                moveMap(direction);
            }
        }
    }

    function getAdjustedObstacleX(x) {
        let adjustedX = x;
        if (currentMap === 3) {
            adjustedX += outdoorX;
        }
        return adjustedX;
    }

    function getAdjustedObstacleY(y) {
        let adjustedY = y;
        //if (currentMap === 7) {
        //    adjustedY += cmY;
        //}
        return adjustedY;
    }

    function findObstacleInfoByDim(obstacleInfo, targetDim) {
        return obstacleInfo.find(obstacle => {
            const { dim } = obstacle;
            return (
                    dim.x === targetDim.x &&
                    dim.y === targetDim.y &&
                    dim.w === targetDim.w &&
                    dim.h === targetDim.h
            );
        });
    }

    function findDirectionalObstacles(obstacles, point, direction, distance, area) {
        const { x, y } = point;
        const { width, height } = area;

        return obstacles.filter(obstacle => {
            const adjustedX = getAdjustedObstacleX(obstacle.x);
            const adjustedY = getAdjustedObstacleY(obstacle.y);

            // 장애물의 범위
            const obstacleLeft = adjustedX;
            const obstacleRight = adjustedX + obstacle.w;
            const obstacleTop = adjustedY;
            const obstacleBottom = adjustedY + obstacle.h;

            // 검색 영역의 범위
            const areaLeft = x;
            const areaRight = x + width;
            const areaTop = y;
            const areaBottom = y + height;

            switch (direction) {
                case 'up': // 위쪽으로 이동
                    return (
                            areaLeft < obstacleRight && areaRight > obstacleLeft && // x축 범위가 겹침
                            areaTop - distance < obstacleBottom && areaTop > obstacleBottom // 위쪽 거리 확인
                    );

                case 'down': // 아래쪽으로 이동
                    return (
                            areaLeft < obstacleRight && areaRight > obstacleLeft && // x축 범위가 겹침
                            areaBottom + distance > obstacleTop && areaBottom <= obstacleTop // 아래쪽 거리 확인
                    );

                case 'left': // 왼쪽으로 이동
                    return (
                            areaTop < obstacleBottom && areaBottom > obstacleTop && // y축 범위가 겹침
                            areaLeft - distance < obstacleRight && areaLeft > obstacleRight // 왼쪽 거리 확인
                    );

                case 'right': // 오른쪽으로 이동
                    return (
                            areaTop < obstacleBottom && areaBottom > obstacleTop && // y축 범위가 겹침
                            areaRight + distance > obstacleLeft && areaRight <= obstacleLeft // 오른쪽 거리 확인
                    );

                default:
                    return false; // 잘못된 방향
            }
        });
    }

    function isCollidingWithObstacle(x, y, direction) {
        const point = { x: x + 5, y: y + 5 }; // 특정 좌표
        const area = { width: PLAYER_WIDTH - 10, height: PLAYER_HEIGHT - 10 };

        if (currentMap === 1) {
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map1Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                return true;
            }
            return false;
        }

        if (currentMap === 2) {
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map2Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                return true;
            }
            return false;
        }

        if (currentMap === 3) {
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map3Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                return true;
            }
            return false;
        }

        if (currentMap === 4) {
            const point = { x: x + 5, y: y + 130 }; // 특정 좌표
            const area = { width: PLAYER_WIDTH - 10, height: 100 };
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map4Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                const obstacleInfo = findObstacleInfoByDim(map4InteractingObstacleInfo, directionalObstacles[0]);
                if (obstacleInfo) {
                    currentMap4InteractingObstacle = obstacleInfo;
                }
                return true;
            }
            //console.log('start::isCollidingWithObstacle(), obstacleInfo=', null);
            currentMap4InteractingObstacle = null;
            return false;
        }

        if (currentMap === 5) {
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map5Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                return true;
            }
            return false;
        }

        if (currentMap === 7) {
            const point = { x: x + 5, y: y + 130 }; // 특정 좌표
            const area = { width: PLAYER_WIDTH - 10, height: 100 };
            const distance = 15;
            const directionalObstacles =
                    findDirectionalObstacles(map7Obstacles, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                return true;
            }
            return false;
        }
    }

    function changeMap(mapNumber) {
        transitionStartTime = millis();
        currentMap = mapNumber;
        mapSwitched = true;
    }

    function changeScene(sceneNumber, useFadeIn = false) {
        sceneSwitched = true;
        if (useFadeIn) {
            transitionStartTime = millis();
        }
        currentScene = sceneNumber;
        stepInScene = 1;
    }

    function keyPressedForMap3() {
        if (keyCode === ENTER) {
            if (!map3IntroDialog.isComplete()) {
                map3IntroDialog.enter();
            }
        }
    }

    function keyPressedForMap4() {
        if (keyCode === ENTER) {
            if (!map4IntroDialog.isComplete()) {
                map4IntroDialog.enter();
            }

            if (map4InteractingCount === 2) {
                map4Dialogue.enter && map4Dialogue.enter();

                switch (map4LastStep) {
                    case 1:
                        map4Dialogue = map4dLast1;
                        map4LastStep++;
                        break;
                    case 2:
                        map4Dialogue = map4dLast2;
                        break;
                }

                return;
            }

            if (currentMap4InteractingObstacle) {
                if (!currentMap4InteractingObstacle.isInteracted) {
                    currentMap4InteractingObstacle.isInteracted = true;
                    map4InteractingCount++;
                }

                map4Dialogue = currentMap4InteractingObstacle.dialogue;
                map4Dialogue.enter && map4Dialogue.enter();
            } else {
                map4Dialogue && map4Dialogue.enter && map4Dialogue.enter();
            }
        }
    }

    function goNextStep(step) {
        dialSwitch = step;
        animationStartTime = millis();
        keyIgnoreStartTime = millis();
    }

    function keyPressedForMap5() {
        if (userAnimator.isStarted && keyCode === ENTER) {
            switch (dialSwitch) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 6:
                    goNextStep(dialSwitch + 1);
                    break;
            }
        }
    }

    function canCollectPiece(userDim, pieceDim, buffer = 30) {
        const { x: userX, y: userY, w: userW, h: userH } = userDim;
        const { x: pieceX, y: pieceY, w: pieceW, h: pieceH } = pieceDim;

        // 사용자 영역에 buffer를 적용
        const userLeft = userX - buffer;
        const userRight = userX + userW + buffer;
        const userTop = userY - buffer;
        const userBottom = userY + userH + buffer;

        // 조각 영역
        const pieceLeft = pieceX;
        const pieceRight = pieceX + pieceW;
        const pieceTop = pieceY;
        const pieceBottom = pieceY + pieceH;

        // AABB 충돌 감지: 두 사각형이 겹치는지 확인
        const result = (
                userLeft < pieceRight &&
                userRight > pieceLeft &&
                userTop < pieceBottom &&
                userBottom > pieceTop
        );

        return result;
    }

    function keyPressedForMap7() {
        if (map7PieceDialog.currentStep === 2) {
            if (isThisKeyDown('w')) {
                map7Selection = 'up';
                if (soundChoice.isPlaying()) {
                    soundChoice.stop();
                }
                soundChoice.play();
            } else if (isThisKeyDown('s')) {
                map7Selection = 'down';
                if (soundChoice.isPlaying()) {
                    soundChoice.stop();
                }
                soundChoice.play();
            }
        }

        if (keyCode === ENTER) {
            if (collectedCount === 5) {
                map7PieceDialog.enter();
            }

            if (map7IntroDialog.isComplete()) {
                for (let piece of paperPieces) {
                    let pieceX = piece.x;
                    let pieceY = cmY + piece.y; // 화면 내에서의 Y 좌표

                    const canCollect = canCollectPiece({
                        x: userX, y: userY, w: PLAYER_WIDTH, h: PLAYER_HEIGHT
                    }, {
                        x: pieceX, y: pieceY, w: PIECE_WIDTH, h: PIECE_HEIGHT
                    });
                    // 거리가 100 이하이고 아직 수집되지 않은 경우
                    if (canCollect && !piece.collected) {
                        piece.collected = true; // 수집 상태로 변경
                        collectedCount++; // 수집된 개수 증가

                        if (collectedCount === 5) {
                            map7PieceDialog.start();
                        }
                        /*
                        // 메시지 출력
                        if (collectedCount < paperPieces.length) {
                            ptext = true;
                        } else {
                            ptext = !ptext;
                        }
                        break; // 하나만 수집 후 루프 종료
                         */
                        if (!soundPaperPick.isPlaying()) {
                            soundPaperPick.play();
                        }
                    }
                }
                /*
                if (keyCode === ENTER) {
                    // Enter 키를 누르면 텍스트 창을 없앰
                    showText = false;
                }
                 */
            } else {
                map7IntroDialog.enter();
            }

            if (map7PieceDialog.currentStep === 2) {
                if (map7Selection) {
                    if (map7Selection === 'up') {
                        shouldShowClock = true;
                        shouldShowStar = false;
                    } else {
                        shouldShowClock = false;
                        shouldShowStar = true;
                    }

                    if (!isMap7Selected) {
                        isMap7Selected = true;
                        map7SelectionGuide && map7SelectionGuide.goToNextStep();
                    }
                }
            }
        }

        if (collectedCount === 5) {
            if (isThisKeyDown('w')) {
                map7Selection = 'up';
            } else if (isThisKeyDown('s')) {
                map7Selection = 'down';
            }
        }
    }

    function _preload(){
        platform = loadImage('assets/subway_platform.png');
        escalator = loadImage('assets/escalator.png');
        ticketGate = loadImage('assets/ticketGate.png');
        outdoor = loadImage('assets/outdoorLoad.png');
        odf = loadImage('assets/outdoorFrame.png');
        home = loadImage('assets/homeMap.png');
        homeDoor = loadImage('assets/homeDoor.png');
        homeMirror = loadImage('assets/homeMirror.png');
        homeMirror_def = loadImage('assets/mirror_back.png');
        homePoster = loadImage('assets/homePoster.png');
        bathroom = loadImage('assets/bathroomMap.png');
        chair = loadImage('assets/chair.png');
        table = loadImage('assets/table.png');
        sink = loadImage('assets/sink.png');
        cm = loadImage('assets/classroomMap.png');
        ct = loadImage('assets/classroomTable.png');
        cc = loadImage('assets/classroomChair.png');
        ld = loadImage('assets/lectureDesk.png');
        tc = loadImage('assets/teacherChair.png');
        clock = loadImage('assets/clock.png');
        star = loadImage('assets/star.png');
        pb1 = loadImage('assets/paper/big/big1.png');
        pb2 = loadImage('assets/paper/big/big2.png');
        pb3 = loadImage('assets/paper/big/big3.png');
        pb4 = loadImage('assets/paper/big/big4.png');
        pb5 = loadImage('assets/paper/big/big5.png');
        pm1 = loadImage('assets/paper/middle/middle1.png');
        pm2 = loadImage('assets/paper/middle/middle2.png');
        pm3 = loadImage('assets/paper/middle/middle3.png');
        pm4 = loadImage('assets/paper/middle/middle4.png');
        pm5 = loadImage('assets/paper/middle/middle5.png');
        ps1 = loadImage('assets/paper/small/small1.png');
        ps2 = loadImage('assets/paper/small/small2.png');
        ps3 = loadImage('assets/paper/small/small3.png');
        ps4 = loadImage('assets/paper/small/small4.png');
        ps5 = loadImage('assets/paper/small/small5.png');
        plate = loadImage('assets/paper/plate.png');

        // player
        back_0 = loadImage("assets/player/back_0.png");
        back_1 = loadImage("assets/player/back_1.png");
        back_2 = loadImage("assets/player/back_2.png");
        front_0 = loadImage("assets/player/front_0.png");
        front_1 = loadImage("assets/player/front_1.png");
        front_2 = loadImage("assets/player/front_2.png");
        left_0 = loadImage("assets/player/left_0.png");
        left_1 = loadImage("assets/player/left_1.png");
        left_2 = loadImage("assets/player/left_2.png");
        right_0 = loadImage("assets/player/right_0.png");
        right_1 = loadImage("assets/player/right_1.png");
        right_2 = loadImage("assets/player/right_2.png");

        dialogIconImages = {
            "mc": loadImage('assets/dialog_icon/mc.png'),
            "mc_4": loadImage('assets/dialog_icon/mc_4.png'),
            "self_broken": loadImage('assets/dialog_icon/self_broken.png'),
            "young_mc": loadImage('assets/dialog_icon/young_mc.png'),
        };

        sceneImages[2] = loadImage('assets/cutscene/1_1.png');
        sceneImages[3] = loadImage('assets/cutscene/1_2.png');
        sceneImages[4] = loadImage('assets/cutscene/1_3.png');
        sceneImages[5] = loadImage('assets/cutscene/1_4.png');

        breakSelf = [
            loadImage('assets/animation/self/0.png'),
            loadImage('assets/animation/self/1.png'),
            loadImage('assets/animation/self/2.png'),
            loadImage('assets/animation/self/3.png'),
        ];
        portal = [
            loadImage('assets/animation/portal/1.png'),
            loadImage('assets/animation/portal/2.png'),
            loadImage('assets/animation/portal/3.png'),
        ];

        fontLush = loadFont('assets/fonts/Lush.ttf');
        fontNamu = loadFont('assets/fonts/namu.ttf');
        fontMyeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');
        fontJungwon = loadFont('assets/fonts/NanumNanumJungwon.ttf');

        soundWalkDefault = loadSound('assets/sound/walk_default.mp3');
        soundChoice = loadSound('assets/sound/choice.mp3');

        soundTrain_leave_0 = loadSound('assets/sound/0/train_leave_0.mp3');

        soundStreet0 = loadSound('assets/sound/0/street_0.mp3');
        soundWater0 = loadSound('assets/sound/0/water_0.mp3');
        soundCracking = loadSound('assets/sound/0/cracking_0.mp3');
        soundPortalForm = loadSound('assets/sound/0/portal_form_0.mp3');
        soundPortalDefault = loadSound('assets/sound/0/portal_default_0.mp3');

        soundRoom1 = loadSound('assets/sound/1/room_1.mp3');
        soundPaperPick = loadSound('assets/sound/1/paper_pick_1.mp3');
    }

    function _setup() {
        createCanvas(1200,900);

        user = new Player(front_0, 100, 400);
    }

    function _draw() {
        if (soundTrain_leave_0.isPlaying()) {
            fill(0);
            rect(0, 0, width, height);
            // let passedTime = millis() - soundTrain_leave_0StartTime;
            // if (soundTrain_leave_0StartTime > 0 && passedTime < 1000) {
            //     return;
            // } else if (soundTrain_leave_0StartTime > 0 && passedTime >= 1000) {
            //     soundTrain_leave_0StartTime = -1; // 타이머 리셋
            // }
            soundTrain_leave_0.stop();
        }

        if (currentMap < 4 && !soundStreet0.isPlaying()) {
            soundStreet0.play();
        }

        if (currentMap === 5 && !userAnimator.isStarted && !soundWater0.isPlaying()) {
            soundWater0.play();
        }

        //console.log('start::_draw() called');
        if (currentMap !== 6) {
            background(220);
        }

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

        if (currentMap === 6) {
            background(0);
        }
        drawInitMap();
        switch (currentMap) {
            case 1:
                if (userX >= 440 && /*userX < 620 &&*/ userY > 200 && userY < 310) {
                    changeMap(2);
                }
                /*
                // for a test
                fill(100, 0, 0, 150);
                rect(550, 375, 700, 25);
                fill(100, 0, 0, 150);
                rect(800, 475, 400, 25); // bench
                fill(0, 0, 0, 150);
                rect(0, 250, 1200, 5);
                fill(0, 0, 0, 150);
                rect(0, 0, 5, 900);
                fill(0, 0, 0, 150);
                rect(1195, 0, 5, 900);
                fill(0, 0, 0, 150);
                rect(0, 900, 1200, 5);
                 */
                break;

            case 2:
                if (userX > 390 && userX < 710 && userY < 45){
                    changeMap(3);
                }
                break;

            case 3:
                outdoorX = constrain(outdoorX, -outdoor.width + width, 0);
                userX = constrain(userX, 0, width);

                const realUserX = userX - outdoorX;
                if (keyIsPressed && keyCode === ENTER &&
                        realUserX > 1955 && realUserX < 2085 && userY > 220 && userY < 310) {
                    changeMap(4);
                }
                break;

            case 4:
                if (soundStreet0.isPlaying()) {
                    soundStreet0.stop();
                }
                if (map4InteractingCount === 2 && userX >= 70 && userX <= 160 && userY < 140){
                    changeMap(5);
                }

                /*
                // for test
                fill(100, 0, 0, 150);
                rect(0, 150, 1200, 5); // room upper
                fill(100, 100, 0, 150);
                rect(520, 150, 220, 80); // poster
                fill(0, 0, 100, 150);
                rect(920, 180, 280, 320); // bed
                rect(520, 420, 90, 165); // chair
                fill(0, 100, 0, 150);
                rect(350, 420, 235, 180); // table
                rect(730, 710, 470, 175); // whole sink
                fill(0, 0, 100, 150);
                rect(910, 700, 260, 100); // sink
                 */
                break;

            case 5:
                // TODO: interaction 시작 초건 필요. insteraction 시작하면 water0 재생 멈춰야 함.
                if (userAnimator.isStarted && soundWater0.isPlaying()) {
                    soundWater0.stop();
                }

                if (userAnimator.isStarted && keyIsPressed && keyCode === ENTER) {
                    if (dialSwitch === 7) {
                        changeMap(6);
                        if (soundPortalDefault.isPlaying()) {
                            soundPortalDefault.stop();
                        }
                        keyIgnoreStartTime = millis();
                    }
                }

                if (!userAnimator.isStarted && keyCode === ENTER &&
                        userX > 490 && userX < 590 && userY > 310 && userY < 415) {
                    //console.log('start::draw(), case 5 - animator start!, dialSwitch=' + dialSwitch);
                    //changeMap(6);
                    userAnimator.start();
                    keyIgnoreStartTime = millis();
                }
                break;

            case 6:
                if (/*currentScene > 1 &&*/ !soundRoom1.isPlaying()) {
                    soundRoom1.play();
                }
                switch (currentScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(2);
                        }
                        break;

                    case 2:
                        let scene2d1 = new Dialogue('... 시험 곧 시작합니다... 전자기기...');
                        let scene2d2 = new Dialogue('시험지 곧 배부하겠습니다...');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene2d1.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene2d2.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeScene(3);
                                }
                                break;
                        }
                        break;

                    case 3:
                        let scene3d1 = new Dialogue('이번에 최선을 다 했으니까 잘 볼 수 있을거야...');
                        let scene3d2 = new Dialogue('내가 정말 사랑한 천문학이니까...');
                        let scene3d3 = new Dialogue('...?');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene3d1.draw()
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene3d1.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene3d2.draw()
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene3d2.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene3d3.draw()
                                    stepInScene = 4;
                                }
                                break;
                            case 4:
                                scene3d3.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeScene(4);
                                }
                                break;
                        }
                        break;

                    case 4:
                        let scene4d1 = new Dialogue('... 왜지?...');
                        let scene4d2 = new Dialogue('아무것도... 안 보여...');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene4d1.draw()
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene4d1.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene4d1.draw()
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
                        let scene5d1 = new Dialogue('난 정말 열심히 공부했는데...');
                        let scene5d2 = new Dialogue('난 천문학이...');
                        let scene5d3 = new Dialogue('난 정말...');
                        let scene5d4 = new Dialogue('...');
                        switch (stepInScene) {
                            case 1:
                                // enter if (enter...) { dialog..; stepInScene = 2;}
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene5d1.draw()
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene5d1.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene5d2.draw()
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene5d2.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene5d3.draw()
                                    stepInScene = 4;
                                }
                                break;
                            case 4:
                                scene5d3.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    //scene5d4.draw()
                                    stepInScene = 5;
                                }
                                break;
                            case 5:
                                scene5d4.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeMap(7);
                                    if (soundRoom1.isPlaying()) {
                                        soundRoom1.stop();
                                    }
                                }
                                break;
                        }
                        break;
                }
                break;

            case 7:
                cmY = constrain(cmY, -cm.height+height, 0);
                userY = constrain(userY, 0, height);

                // map
                image(cm, 0, cmY);

                // 시험지 조각
                map7Pieces = [];
                for (let piece of paperPieces) {
                    if (!piece.collected) {
                        image(ps1, piece.x, cmY + piece.y); // 같은 이미지 사용
                        map7Pieces.push({
                            x: piece.x, y: cmY + piece.y, w: PIECE_WIDTH, h: PIECE_HEIGHT
                        });
                    }
                }

                map7Obstacles = [...map7FixedObstacles];
                map7Obstacles.push({
                    x: 0, y: cmY + 220, w: 1200, h: 15,
                });

                // lecture desk
                image(ld, 190, cmY + 220);
                map7Obstacles.push({
                    x: 190, y: cmY + 220, w: 115, h: 185,
                });

                // teacher chair
                image(tc, 300, cmY + 270);
                map7Obstacles.push({
                    x: 300, y: cmY + 300, w: 395, h: 105,
                });
                //fill(0, 0, 100, 150);
                //rect(300, cmY + 300, 395, 105);

                // classroom chair
                image(cc, 165, cmY + 550);
                map7Obstacles.push({
                    x: 165, y: cmY + 550, w: 850, h: 50,
                });
                //fill(0, 0, 100, 150);
                //rect(165, cmY + 550, 850, 50);

                image(cc, 165, cmY + 750);
                map7Obstacles.push({
                    x: 165, y: cmY + 750, w: 850, h: 50,
                });
                //fill(0, 0, 100, 150);
                //rect(165, cmY + 750, 850, 50);

                image(cc, 165, cmY + 950);
                map7Obstacles.push({
                    x: 165, y: cmY + 950, w: 850, h: 50,
                });
                //fill(0, 0, 100, 150);
                //rect(165, cmY + 950, 850, 50);

                image(cc, 165, cmY + 1150);
                map7Obstacles.push({
                    x: 165, y: cmY + 1150, w: 850, h: 50,
                });
                //fill(0, 0, 100, 150);
                //rect(165, cmY + 1150, 850, 50);

                //pstext();
                //psChoice();
                break;

            default:
                fill(0);
                return;
        }

        //ellipse(userX,userY,50,50); // 픽셀로 바꿀 예정
        if (currentMap !== 6/*curscene*/ && !mapSwitched) {
            fill(250, 100, 0);
            userMovement();
        }
        if (currentMap === 5) {
            userAnimator.draw();
        }

        if (currentMap !== 6 && !mapSwitched){
            user && user.draw(userX, userY);
        }
        const result = drawAfterUser();
        if (result) {
            resetStart();
            return result;
        }

        if (currentMap !== 6) {
            resetGameButton.draw();

            if (mouseIsPressed && mouseX >= 10 && mouseX <= 130 && mouseY >= 10 && mouseY <= 60) {
                resetStart();
                return "cutscene";
            }
        }

        if (mapSwitched) {
            if (currentMap === 2) {
                userX = 215;
                userY = 640;
                user && user.right();
            } else if (currentMap === 3) {
                userX = 175;
                userY = 305;
                user && user.right();
                map3OffsetX = 0; // map3의 시작 위치 초기화
            } else if (currentMap === 4) {
                userX = 200;
                userY = 450;
                user && user.front();
            } else if(currentMap === 5) {
                userX = 540;
                userY = 620;
                user && user.back();
            } else if(currentMap === 7) {
                userX = 900;
                userY = 250;
                user && user.front();
                map5OffsetY = 0;
            }
            mapSwitched = false; // 초기화 후 상태 리셋
        }

        if (sceneSwitched) {
            sceneSwitched = false;
        }
    }

    function _keyPressed() {

        if (currentMap ===1 && keyCode == ENTER && showMap1Dialog){
            showMap1Dialog = false;
            return;
        }
        if (currentMap === 3) {
            keyPressedForMap3();
        }

        if (currentMap === 4) {
            keyPressedForMap4();
        }

        if (currentMap === 5) {
            keyPressedForMap5()
        }

        if (currentMap === 7) {
            keyPressedForMap7();
        }
    }

    function _mouseMoved() {
        if (mouseX >= 50 && mouseX <= 170 && mouseY >= 50 && mouseY <= 100) {
            //map7SelectionGuide && map7SelectionGuide.resetGameButton && map7SelectionGuide.resetGameButton.focused();
            resetGameButton.focused();
        } else {
            //map7SelectionGuide && map7SelectionGuide.resetGameButton && map7SelectionGuide.resetGameButton.unfocused();
            resetGameButton.unfocused()
        }
    }

    return {
        stageName : "start",
        preload: _preload,
        setup: _setup,
        draw: _draw,
        keyPressed: _keyPressed,
        mouseMoved: _mouseMoved,
    }
}

const start = createStart();
