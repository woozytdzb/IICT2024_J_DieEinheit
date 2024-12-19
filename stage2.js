function createStage2() {
    class InteractionGuide {
        draw() {
            // //console.log('InteractionGuide::draw()');
            // noStroke();

            // // 투명도 추가
            // fill(50, 50, 50, 180);
            // rect(1050, 10, 130, 50);

            // fill(200);
            // textAlign(LEFT);
            // textSize(15);
            // textFont(fontJungwon);
            // if (currentMap === 2) {
            //     text("이동: wasd", 1050 + 10, 10 + 20);
            //     text("인터랙션: ENTER", 1050 + 10, 10 + 40);
            // } else if (currentMap === 3) {
            //     if (map3DialogStep === 3) {
            //         text("이동: w s", 1050 + 10, 10 + 20);
            //         text("인터랙션: ENTER", 1050 + 10, 10 + 40);
            //     } else {
            //         text("인터랙션: ENTER", 1050 + 10, 10 + 30);
            //     }
            // }
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

            this.starDialog = new Dialogue("[별을 얻었다.]");
            this.moneyDialog = new Dialogue("[돈을 얻었다.]");
            //this.resetGameButton = new ResetButton();

            this.selectionStartTime = -1;
        }

        reset() {
            //this.resetGameButton.reset();
        }

        draw() {
            /*
            console.log('stage2::draw(), selectionStartTime=' + this.selectionStartTime +
                    ', isMap3Selected=' + isMap3Selected +
                    ', map3DialogStep=' + map3DialogStep +
                    ', currentMap=' + currentMap);
             */
            if (currentMap === 3 && map3DialogStep === 3) {
                // 처음으로
                //this.resetGameButton.draw();

                fill(50, 50, 50, 100);
                rect(100, 700, 1000, 200);

                /*
                if (map3Selection === 'up') {
                    this.drawUpperLine(true);
                    this.drawLowerLine(false);
                } else if (map3Selection === 'down') {
                    this.drawUpperLine(false);
                    this.drawLowerLine(true);
                } else {
                    this.drawUpperLine(false);
                    this.drawLowerLine(false);
                }
                 */

                if (isMap3Selected) {
                    if (shouldShowMoney) {
                        this.moneyDialog.draw();
                        this.giveMoney();
                        if (!isMoneyCounted) {
                            moneyscore++;
                            console.log('moneyscore 한개 추가');
                            console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
                            isMoneyCounted = true;
                        }
                    }

                    if (shouldShowStar) {
                        this.starDialog.draw();
                        this.giveStar();
                        if (!isStarCounted) {
                            starscore++;
                            console.log('starscore 한개 추가');
                            console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
                            isStarCounted = true;
                        }
                    }

                    let passedTime = millis() - this.selectionStartTime;
                    if (this.selectionStartTime > 0 && passedTime < 1000) {
                        return;
                    } else {
                        this.selectionStartTime = -1;
                    }

                    if (map3Selection === 'up') {
                        resetStage2();
                        return "stage3";
                    } else {
                        resetStage2();
                        return "stage3";
                    }
                } else {
                    if (map3Selection === 'up') {
                        this.drawUpperLine(true);
                        this.drawLowerLine(false);
                    } else if (map3Selection === 'down') {
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
            text('부모님의 말씀을 듣는다', 200, 760);
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
            text('나의 소신을 이어간다', 200, 810);
        }

        giveStar() {
            fill(20);
            rect(0,0,1200,900);
            push();
            imageMode(CENTER);
            image(star, 600, 400);
            pop();
            fill(255);
            text('[별을 얻었다.]',600,600);
        }

        giveMoney() {
            fill(20);
            rect(0,0,1200,900);
            push();
            imageMode(CENTER);
            image(money, 600, 400);
            pop();
            fill(255);
            text('[돈을 얻었다.]',600,600);
        }
    }

    class EnteredFullScreenDialog {
        constructor(line) {
            this.line = line;
            this.isCompleted = false;
        }

        reset() {
            this.isCompleted = false;
        }

        draw() {
            if (!this.isCompleted) {
                fill(0);
                rect(0, 0, 1200, 900);

                fill(255);
                textAlign(CENTER);
                textSize(40);
                textFont(fontMyeongjo);
                text(this.line, 600, 450);

                triangle(1083, 839, 1149, 839, 1116, 871);
            }
        }

        enter() {
            this.isCompleted = true;
        }

        isComplete() {
            return this.isCompleted;
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
            // 투명도 추가
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
                text(this.line, 320, 750); // when CENTER
            } else {
                textAlign(CENTER);
                text(this.line, 600, 750); // when CENTER
            }

            triangle(1083, 839, 1149, 839, 1116, 871);
        }
    }

    class Map2IntroDialog {
        constructor() {
            this.currentStep = 0;
            this.dialogues = [
                new Dialogue('너무 멀리 와버렸어... 여기가 어디지...?', "mc"),
                new Dialogue('....집으로 가봐야겠어.', "mc"),
                new Dialogue('[이동키를 눌러 미로를 탈출하세요.]'),
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
            let result = '';
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
            let shouldNotDrawUser = false;
            if (currentMap === 2) {
                if (!map2IntroDialog.isComplete()) {
                    skipUpdateMotion = true;
                }
                if (map2Dialogues[map2DialogStep] && !map2Dialogues[map2DialogStep].isComplete()) {
                    skipUpdateMotion = true;
                    shouldNotDrawUser = true;
                }
            }
            if (currentMap === 3) {
                skipUpdateMotion = true;
            }

            this.X = x;
            this.Y = y;

            if (!skipUpdateMotion) {
                const lowerKey = this.getPressedKey();
                if (lowerKey) {
                    if (!soundWalkDefault.isPlaying()) {
                        soundWalkDefault.play();
                    }
                }
                if (keyIsPressed && currentMap === 2 &&
                        (lowerKey === 'w' || lowerKey === 'a' ||
                         lowerKey === 's' || lowerKey === 'd')) {
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

            if (!shouldNotDrawUser) {
                push();
                rectMode(CENTER);
                image(this.state, this.X, this.Y);
                pop();

                // for a TEST
                //fill(0, 100, 0, 150);
                //rect(this.X + 5, this.Y + 90, 95 - 10, 240 - 100);
            }
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
            console.log('stage2::Player::move, key=' + key +
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
            //console.log('stage2::Player::right, state = ', this.state);
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
            //console.log('stage2::Player::left, state = ', this.state);
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
            //console.log('stage2::Player::front, state = ', this.state);
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
            //console.log('stage2::Player::back, state = ', this.state);
        }

        center() {
            let center = [this.X + parseInt(back_0.width/2), this.Y + parseInt(back_0.height/2)]
            //console.log('stage2::Player::center');
            return center;
        }

        reset(X,Y) {
            //console.error('stage2::Player::reset');
            this.X = X;
            this.Y = Y;
            this.state = front_0;
            this.direction = "front";
            this.moveCount = 0;
            this.count = 4;
        }
    }

    //--------------------------------------------------------------------------
    // Start - stage2
    //--------------------------------------------------------------------------
    const MAP_HEIGHT = 2570;
    const ONE_SIXTH_MAP_HEIGHT = parseInt(MAP_HEIGHT/6);
    const PLAYER_WIDTH = 95;
    const PLAYER_HEIGHT = 240;
    const X_RATIO = 2.25;
    const Y_RATIO = 2.85;

    let fontNamu, fontMyeongjo, fontJungwon;
    let soundWalkDefault, soundDoorOpen, soundNightCity;
    let soundChoice;
    let isDoorOpenSoundPlayed = false;
    let frontDoor, maze, mazeMap, mazeExit, star, money;
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

    let currentMap = 1;
    let mapSwitched = false; // 맵이 전환된 상태를 추적
    let resetGameButton = new ResetButton();
    let userX = 570;
    let userY = 25;
    let moveSpeed = 5;
    let obstacles21 = [
        { x: 0, y: 0, w: 40, h: 2530 },
        { x: 0, y: 0, w: 417, h: 39 },
        { x: 375, y: 39, w: 40, h: 30 },
        { x: 730, y: 0, w: 2700, h: 39 },
        { x: 730, y: 39, w: 40, h: 30 },
        { x: 2669, y: 0, w: 40, h: 2530 },
        { x: 39, y: 2530, w: 1911, h: 40 },
        { x: 1950, y: 2495, w: 30, h: 75 },
        { x: 2285, y: 2530, w: 425, h: 40 },
        { x: 40, y: 655, w: 390, h: 40 },
        { x: 390, y: 655, w: 40, h: 300 },
        { x: 40, y: 1575, w: 380, h: 40 },
        { x: 380, y: 1285, w: 40, h: 330 },
        { x: 40, y: 1950, w: 335, h: 40 },
        { x: 335, y: 1950, w: 40, h: 285 },
        { x: 1700, y: 40, w: 40, h: 280 },
        { x: 405, y: 355, w: 335, h: 40 },
        { x: 700, y: 355, w: 40, h: 340 },
        { x: 700, y: 655, w: 380, h: 40 },
        { x: 1040, y: 320, w: 40, h: 375 },
        { x: 1040, y: 320, w: 870, h: 40 },
        { x: 2310, y: 345, w: 360, h: 40 },
        { x: 1970, y: 670, w: 40, h: 345 },
        { x: 1970, y: 975, w: 380, h: 30 },
        { x: 2310, y: 665, w: 40, h: 350 },
        { x: 2310, y: 665, w: 360, h: 40 },
        { x: 2320, y: 1285, w: 350, h: 40 },
        { x: 2320, y: 1285, w: 40, h: 365 },
        { x: 1980, y: 1610, w: 380, h: 40 },
        { x: 1980, y: 1270, w: 40, h: 380 },
        { x: 1025, y: 1270, w: 995, h: 40 },
        { x: 1375, y: 655, w: 320, h: 40 },
        { x: 1655, y: 655, w: 40, h: 365 },
        { x: 1350, y: 980, w: 345, h: 40 },
        { x: 1350, y: 980, w: 40, h: 290 },
        { x: 1025, y: 990, w: 40, h: 320 },
        { x: 695, y: 990, w: 370, h: 40 },
        { x: 695, y: 990, w: 40, h: 315 },
        { x: 1985, y: 1955, w: 40, h: 250 },
        { x: 1985, y: 2165, w: 340, h: 40 },
        { x: 2285, y: 1925, w: 40, h: 480 }, // 얘도 잘못된 값으로 판단됨.
        { x: 1635, y: 1980, w: 40, h: 590 },
        { x: 1340, y: 1610, w: 355, h: 40 },
        { x: 1340, y: 1610, w: 40, h: 645 },
        { x: 375, y: 39, w: 40, h: 30 },
        { x: 995, y: 1880, w: 345, h: 45 },
        { x: 995, y: 1620, w: 45, h: 305 },
        { x: 685, y: 1620, w: 355, h: 40 },
        { x: 685, y: 1620, w: 40, h: 650 },
        { x: 685, y: 2229, w: 355, h: 40 },
        { x: 1000, y: 2230, w: 40, h: 340 },
    ]
    let mazeX = 0;
    let mazeMapX = 0;
    let mazeY = 0;
    let mazeMapY = 0;

    let transitionTime = 500; // 0.5초 (500ms)
    let transitionStartTime = -1; // 전환 시작 시간
    let keyIgnoreTime = 200; // 200ms
    let keyIgnoreStartTime = -1; // key ignore start time
    let map3IntroDelayTime = 2000; // 2초
    let map3IntroDelayStartTime = -1;

    let interactionGuide = new InteractionGuide();

    const map2IntroDialog = new Map2IntroDialog();
    let map2DialogStep = 0;
    let map2Dialogues = [
        null,
        new EnteredFullScreenDialog('"나중에 대체 뭐 하고 살려고 그러는 거야!"'),
        new EnteredFullScreenDialog('"꿈이라고 그게 다인 줄 알아?"'),
        new EnteredFullScreenDialog('"내가 너 그런 거 하라고 지금까지 키워준 줄 알아?"'),
        new EnteredFullScreenDialog('"그런 건 나중에 취미로 해도 되는 거찮아!"'),
        new EnteredFullScreenDialog('"너한테 정말 실망했어!"'),
    ];

    let selectionGuide = new SelectionGuide();
    let map3IntroDialog = new Dialogue('이렇게 돌아왔어...', "mc");
    let map3DialogStep = 0;
    let map3Dialogues = [
        null,
        new Dialogue('...', "mc"),
        new Dialogue('그때... 무슨 말을 하는게 맞았을까.', "mc"),
    ];
    let map3Selection = null;
    let isMap3Selected = false;
    let shouldShowStar = false;
    let isStarCounted = false;
    let shouldShowMoney = false;
    let isMoneyCounted = false;

    let sceneImages = []; // 컷신 이미지 배열
    let currentScene = 1; // 현재 컷신 번호
    let stepInScene = 1;
    let sceneSwitched = false; // 맵이 전환된 상태를 추적

    function resetStage2() {
        currentMap = 1;
        mapSwitched = false;
        userX = 570;
        userY = 25;
        user.front();
        resetGameButton.reset();

        mazeX = 0;
        mazeMapX = 0;
        mazeY = 0;
        mazeMapY = 0;

        isDoorOpenSoundPlayed = false;

        map2DialogStep = 0;
        map2IntroDialog.reset();
        map2Dialogues.forEach((dialog) => {
            if (dialog && dialog.reset) {
                dialog.reset();
            }
        });

        selectionGuide.reset();
        map3DialogStep = 0;
        map3Selection = null;
        isMap3Selected = false;
        shouldShowStar = false;
        isStarCounted = false;
        shouldShowMoney = false;
        isMoneyCounted = false;

        currentScene = 1;
        stepInScene = 1;
        sceneSwitched = false;

        // starscore = 0;
        // moneyscore = 0;

        if (soundNightCity.isPlaying()) {
            soundNightCity.stop();
        }
    }

    function drawMap2(){
        image(mazeMap, mazeMapX, mazeMapY);
        image(maze, mazeX, mazeY);
        //interactionGuide.draw();

        tint(255, 180);
        image(mazeMap, 980, 50, 200, 190);
        image(maze, 980, 50, 200, 190);
        noTint();

        resetGameButton.draw();

        if (map2Dialogues[map2DialogStep]) {
            map2Dialogues[map2DialogStep].draw();
        }
    }

    function drawMap3(){
        image(frontDoor,0,0);
        //interactionGuide.draw();
        resetGameButton.draw();
    }

    function moveMap(direction) {
        //console.log('stage2::moveMap(), direction = ' + direction + ', moveSpeed = ' + moveSpeed);
        switch (direction) {
            case 'up':
                mazeY += parseInt(moveSpeed * Y_RATIO);
                mazeMapY += parseInt(moveSpeed * Y_RATIO);
                break;

            case 'down':
                mazeY -= parseInt(moveSpeed * Y_RATIO);
                mazeMapY -= parseInt(moveSpeed * Y_RATIO);
                break;

            case 'left':
                mazeX += parseInt(moveSpeed * X_RATIO);
                mazeMapX += parseInt(moveSpeed * X_RATIO);
                break;

            case 'right':
                mazeX -= parseInt(moveSpeed * X_RATIO);
                mazeMapX -= parseInt(moveSpeed * X_RATIO);
                break;
        }
    }

    function drawAfterUser() {
        switch (currentMap) {
            case 2:
                // show a dialogue
                if (!mapSwitched) {
                    if (!map2IntroDialog.isComplete()) {
                        map2IntroDialog.draw();
                    }
                }
                break;
            case 3:
                // show a dialogue
                if (map3DialogStep === 0) {
                    map3IntroDialog.draw();
                }
                if (map3Dialogues[map3DialogStep]) {
                    map3Dialogues[map3DialogStep].draw();
                }
                const result = selectionGuide.draw();
                if (result) {
                    return result;
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

    function userMovement(){
        let nextX = userX;
        let nextY = userY;
        let direction = 'unknown';

        if (isThisKeyDown('w') && userY - 25 > -mazeMap.width) { // W 키 (위로 이동)
            nextY -= moveSpeed;
            //if(currentMap===2){
            //    mazeY += moveSpeed;
            //    mazeMapY += moveSpeed;
            //}
            direction = 'up';
        } else if (isThisKeyDown('s') && userY + 25 < mazeMap.height) { // S 키 (아래로 이동)
            nextY += moveSpeed;
            //if(currentMap===2){
            //    mazeY -= moveSpeed;
            //    mazeMapY -= moveSpeed;
            //}
            direction = 'down';
        } else if (isThisKeyDown('a') && userX - 25 > -mazeMap.height) { // A 키 (왼쪽으로 이동)
            nextX -= moveSpeed;
            //if(currentMap===2){
            //    mazeX += moveSpeed;
            //    mazeMapX += moveSpeed;
            //}
            direction = 'left';
        } else if (isThisKeyDown('d') && userX + 25 < mazeMap.width) { // D 키 (오른쪽으로 이동)
            nextX += moveSpeed;
            //if(currentMap===2){
            //    mazeX -= moveSpeed;
            //    mazeMapX -= moveSpeed;
            //}
            direction = 'right';
        }

        if (currentMap === 2) {
            if (!map2IntroDialog.isComplete()) {
                return false;
            }
            if (map2Dialogues[map2DialogStep] && !map2Dialogues[map2DialogStep].isComplete()) {
                return;
            }
        }

        if (currentMap === 3) {
            return;
        }

        let isColliding = isCollidingWithObstacle(nextX, nextY, direction);
        //console.log('userMovement(), isColliding = ', isColliding);
        if (!isColliding) {
            const realUserX = nextX - mazeX;
            const realUserY = nextY - mazeY;
            if (currentMap === 2 && realUserY < 2310) {
                userX = nextX;
                userY = nextY;
                moveMap(direction);

                /*
                fill(0, 100, 0, 150);
                rect(40 + mazeX, 345 + mazeY, 365, 310);
                rect(380 + mazeX, 1245 + mazeY, 315, 375);
                rect(1320 + mazeX, 1200 + mazeY, 200, 410);
                rect(1645 + mazeX, 1200 + mazeY, 285, 410);
                rect(1675 + mazeX, 2155 + mazeY, 320, 340);
                 */
                if (realUserX >= 40 && realUserX <= (40 + 365) &&
                        realUserY >= 345 && realUserY < (345 + 310)) {
                    map2DialogStep = 1;
                } else if (realUserX >= 380 && realUserX <= (380 + 315) &&
                        realUserY >= 1245 && realUserY < (1245 + 375)) {
                    map2DialogStep = 2;
                } else if (realUserX >= 1320 && realUserX <= (1320 + 200) &&
                        realUserY >= 1200 && realUserY < (1200 + 410)) {
                    map2DialogStep = 3;
                } else if (realUserX >= 1645 && realUserX <= (1645 + 285) &&
                        realUserY >= 1200 && realUserY < (1200 + 410)) {
                    map2DialogStep = 4;
                } else if (realUserX >= 1675 && realUserX <= (1675 + 320) &&
                        realUserY >= 2155 && realUserY < (2155 + 340)) {
                    map2DialogStep = 5;
                }
            }
        }
    }

    function findDirectionalObstacles(obstacles, point, direction, distance, area) {
        const { x, y } = point;
        const { width, height } = area;

        return obstacles.filter(obstacle => {
            const adjustedX = obstacle.x + mazeX; // mazeX는 전역 또는 주어진 상수
            const adjustedY = obstacle.y + mazeY; // mazeY는 전역 또는 주어진 상수

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
                        /*
                    console.log('findDirectionalObstacles, obs.x=' + obstacle.x +
                            ', obs.y=' + obstacle.y +
                            ', adj.x=' + adjustedX +
                            ', adj.y=' + adjustedY +
                            ', areaLeft=' + areaLeft +
                            ', obsRight' + obstacleRight +
                            ', areaRight=' + areaRight +
                            ', obsLeft' + obstacleLeft);
                         */
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
        let result = false;

        if (currentMap === 2) {
            const point = { x: x + 5, y: y + 90 }; // 특정 좌표
            //const distance = 20;
            const distance = 25;
            const area = { width: PLAYER_WIDTH - 10, height: PLAYER_HEIGHT - 100 };
            const directionalObstacles = findDirectionalObstacles(obstacles21, point, direction, distance, area);
            if (directionalObstacles.length > 0) {
                result = true;
            }
            /*
            for (let obstacle of directionalObstacles) {
                const adjustedX = obstacle.x + mazeX;
                const adjustedY = obstacle.y + mazeY;

                const areaLeft = x;
                const areaRight = x + area.width;
                const areaTop = y;
                const areaBottom = y + area.height;

                // 오른쪽 충돌
                if (direction === 'right' && areaRight + distance > adjustedX) {
                    result = true;
                    console.log('stage2::isCollidingWithObstacle(), directionalObstacles=', directionalObstacles);
                    console.log('stage2::isCollidingWithObstacle(), result = ' + result +
                            ', direction = ' + direction +
                            ', x = ' + x + ', y =' + y);
                    break;
                }

                // 왼쪽 충돌
                if (direction === 'left' && areaLeft - distance < adjustedX + obstacle.w) {
                    result = true;
                    console.log('stage2::isCollidingWithObstacle(), directionalObstacles=', directionalObstacles);
                    console.log('stage2::isCollidingWithObstacle(), result = ' + result +
                            ', direction = ' + direction +
                            ', x = ' + x + ', y =' + y);
                    break;
                }

                // 아래 충돌
                if (direction === 'down' && areaBottom + distance > adjustedY) {
                    result = true;
                    console.log('stage2::isCollidingWithObstacle(), directionalObstacles=', directionalObstacles);
                    console.log('stage2::isCollidingWithObstacle(), result = ' + result +
                            ', direction = ' + direction +
                            ', x = ' + x + ', y =' + y);
                    break;
                }

                // 위 충돌
                if (direction === 'up' && areaTop - distance < adjustedY + obstacle.h) {
                    result = true;
                    console.log('stage2::isCollidingWithObstacle(), directionalObstacles=', directionalObstacles);
                    console.log('stage2::isCollidingWithObstacle(), result = ' + result +
                            ', direction = ' + direction +
                            ', x = ' + x + ', y =' + y);
                    break;
                }
            }
             */
        }

        /*
        console.log('stage2::isCollidingWithObstacle(), result = ' + result +
                ', direction = ' + direction +
                ', x = ' + x + ', y =' + y);
         */
        return result
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
        text('2. 나아가고 싶은 길', 600, 450);
    }

    function _preload() {
        frontDoor = loadImage('assets/stage2/frontDoor.png');
        maze = loadImage('assets/stage2/maze.png');
        mazeMap = loadImage('assets/stage2/mazeMap.png');
        star = loadImage('assets/star.png');
        money = loadImage('assets/money.png');

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

        fontNamu = loadFont('assets/fonts/namu.ttf');
        fontMyeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');
        fontJungwon = loadFont('assets/fonts/NanumNanumJungwon.ttf');

        sceneImages[2] = loadImage('assets/cutscene/2_1.png');
        sceneImages[3] = loadImage('assets/cutscene/2_2.png');
        sceneImages[4] = loadImage('assets/cutscene/2_3.png');
        sceneImages[5] = loadImage('assets/cutscene/2_4.png');

        soundWalkDefault = loadSound('assets/sound/walk_default.mp3');
        soundChoice = loadSound('assets/sound/choice.mp3');

        soundDoorOpen = loadSound('assets/sound/2/door_open_4.mp3');
        soundNightCity = loadSound('assets/sound/2/night_city_2.mp3');
    }

    function _setup() {
        createCanvas(1200,900);

        user = new Player(front_0, 100, 400);
    }

    function _draw() {
        console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
        if (transitionStartTime > 0 && millis() - transitionStartTime < transitionTime) {
            // 전환 화면(검은 화면) 출력
            fill(0);
            rect(0, 0, width, height);
            return; // 검은 화면이 그려지는 동안 다른 맵을 그리지 않음
        } else if (transitionStartTime > 0 && millis() - transitionStartTime >= transitionTime) {
            // 전환이 끝나면 다음 맵 그리기
            transitionStartTime = -1; // 타이머 리셋
        }

        // 키 입력 일정 시간 무시
        let passedTime = millis() - keyIgnoreStartTime;
        if (keyIgnoreStartTime > 0 && passedTime < keyIgnoreTime) {
            return;
        } else if (keyIgnoreStartTime > 0 && passedTime >= keyIgnoreTime) {
            keyIgnoreStartTime = -1; // 타이머 리셋
        }

        if (currentMap >= 2 && !soundNightCity.isPlaying()) {
            soundNightCity.play();
        }

        switch (currentMap) {
            case 1:
                drawScene(currentScene);
                switch (currentScene) {
                    case 1:
                        if (keyIsPressed && keyCode === ENTER) {
                            keyIgnoreStartTime = millis();
                            changeScene(2);
                        }
                        break;
                    case 2:
                        let scene2d1 = new Dialogue('"대체 넌 왜 말을..., !!!!"');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene2d1.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeScene(3);
                                }
                                break;
                        }
                        break;
                    case 3:
                        let scene3d1 = new Dialogue('"천문학자 해서 뭐가 되려고!.... 정신 안 차릴래!!"');
                        let scene3d2 = new Dialogue('그치만...\n"뭘 그치만이야!! ..."');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene3d1.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene3d2.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeScene(4);
                                }
                                break;
                        }
                        break;
                    case 4:
                        let scene4d1 = new Dialogue('대체 왜 내 말은 안들어주는건데!!');
                        let scene4d2 = new Dialogue('"너 엄마한테 한다는 말이..."');
                        let scene4d3 = new Dialogue('내가 정말 좋아하는 거에 신경써준 적은 있어?');
                        let scene4d4 = new Dialogue('"천문학은 취미로 해도..."');
                        let scene4d5 = new Dialogue('됐어!');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene4d1.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene4d2.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 4;
                                }
                                break;
                            case 4:
                                scene4d3.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 5;
                                }
                                break;
                            case 5:
                                scene4d4.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 6;
                                }
                                break;
                            case 6:
                                scene4d5.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeScene(5);
                                }
                                break;
                        }
                        break;
                    case 5:
                        if (isDoorOpenSoundPlayed === false) {
                            isDoorOpenSoundPlayed = true;
                            soundDoorOpen.play();
                        }
                        let scene5d1 = new Dialogue('"저런 못된..."');
                        let scene5d2 = new Dialogue('"나중에... 생각 하지 마!"');
                        switch (stepInScene) {
                            case 1:
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 2;
                                }
                                break;
                            case 2:
                                scene5d1.draw();
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    stepInScene = 3;
                                }
                                break;
                            case 3:
                                scene5d2.draw()
                                if (keyIsPressed && keyCode === ENTER) {
                                    keyIgnoreStartTime = millis();
                                    changeMap(2);
                                    if (soundDoorOpen.isPlaying()) {
                                        soundDoorOpen.stop();
                                    }
                                }
                                break;
                        }
                        break;
                }
                break;
            case 2:
                if (!sceneSwitched && !mapSwitched) {
                    drawMap2();
                }

                mazeX = constrain(mazeX, -maze.width + width, 0);
                mazeMapX = constrain(mazeMapX, -mazeMap.width + width, 0);
                userX = constrain(userX, 0, width);
                mazeY = constrain(mazeY, -maze.height + height, 0);
                mazeMapY = constrain(mazeMapY, -mazeMap.height + height, 0);
                userY = constrain(userY, 0, height);

                //if (keyIsPressed && keyCode === ENTER) {
                    const realUserX = userX - mazeX;
                    const realUserY = userY - mazeY;
                    //console.log('stage2::_draw(), realUserX = ' + realUserX + ', realUserY = ' + realUserY);
                    if (realUserX > 1990 && realUserX < 2285 && realUserY > 2300 && realUserY <= 2470) {
                        user && user.reset(userX, userY);
                        changeMap(3);
                        map3IntroDelayStartTime = millis();
                    }
                //}
                break;
            case 3:
                if (!sceneSwitched && !mapSwitched) {
                    drawMap3();
                    user && user.draw(userX, userY);
                }
                // show a dialogue
                if (map3DialogStep === 0 && map3IntroDelayStartTime !== -1) {
                    map3IntroDialog.draw();
                }

                let passedTime = millis() - map3IntroDelayStartTime;
                if (map3IntroDelayStartTime > 0 && passedTime < map3IntroDelayTime) {
                    return;
                } else if (map3IntroDelayStartTime > 0 && passedTime >= map3IntroDelayTime) {
                    map3IntroDelayStartTime = -1; // 타이머 리셋
                }
                break;
            default:
                fill(0);
                return;
        }

        fill(250, 100, 0);
        userMovement();
        //ellipse(userX,userY,50,50); // 픽셀로 바꿀 예정
        if (currentMap !== 1 && !sceneSwitched && !mapSwitched) {
            user && user.draw(userX, userY);
        }

        const result = drawAfterUser();
        if (result) {
            resetStage2();
            return result;
        }

        if (currentMap === 2 || currentMap === 3) {
            if (mouseIsPressed && mouseX >= 10 && mouseX <= 130 && mouseY >= 10 && mouseY <= 60) {
                starscore = 0;
                heartscore = 0;
                moneyscore = 0;
                clockscore = 0;

                resetStage2();
                return "cutscene";
            }
        }

        /*
        console.log('stage2::_draw(), curMap=' + currentMap +
                ', userX=' + userX +
                ', userY=' + userY +
                ', mazeX=' + mazeX +
                ', mazeY=' + mazeY +
                ', mazeMapX=' + mazeMapX +
                ', mazeMapY=' + mazeMapY);
         */

        if (mapSwitched) {
            if (currentMap === 3) {
                userX = 800;
                userY = 420;
            }
            mapSwitched = false; // 초기화 후 상태 리셋
        }

        if (sceneSwitched) {
            sceneSwitched = false;
        }
    }

    function _keyPressed() {
        if (currentMap === 3 && map3DialogStep === 3) {
            if (isThisKeyDown('w')) {
                map3Selection = 'up';
                if (soundChoice.isPlaying()) {
                    soundChoice.stop();
                }
                soundChoice.play();
            } else if (isThisKeyDown('s')) {
                map3Selection = 'down';
                if (soundChoice.isPlaying()) {
                    soundChoice.stop();
                }
                soundChoice.play();
            }
        }

        if (keyCode === ENTER) {
            switch (currentMap) {
                case 2:
                    if (!map2IntroDialog.isComplete()) {
                        map2IntroDialog.enter();
                    }

                    if (map2Dialogues[map2DialogStep] && map2Dialogues[map2DialogStep].enter) {
                        map2Dialogues[map2DialogStep].enter();
                    }
                    break;

                case 3:
                    switch (map3DialogStep) {
                        case 0:
                            map3DialogStep++;
                            break;

                        case 1:
                            map3DialogStep++;
                            break;

                        case 2:
                            map3DialogStep++;
                            break;

                        case 3:
                            if (map3Selection) {
                                if (map3Selection === 'up') {
                                    shouldShowMoney = true;
                                    shouldShowStar = false;
                                } else {
                                    shouldShowMoney = false;
                                    shouldShowStar = true;
                                }

                                if (!isMap3Selected) {
                                    isMap3Selected = true;
                                    selectionGuide && selectionGuide.goToNextStep();
                                }
                            }
                            break;
                    }
                    break;
            }
        }
    }

    function _mouseMoved() {
        if (mouseX >= 10 && mouseX <= 130 && mouseY >= 10 && mouseY <= 60) {
            //selectionGuide && selectionGuide.resetGameButton && selectionGuide.resetGameButton.focused();
            resetGameButton.focused();
        } else {
            //selectionGuide && selectionGuide.resetGameButton && selectionGuide.resetGameButton.unfocused();
            resetGameButton.unfocused();
        }
    }

    return {
        stageName : "stage2",
        preload: _preload,
        setup: _setup,
        draw: _draw,
        keyPressed: _keyPressed,
        mouseMoved: _mouseMoved,
    }
}

const stage2 = createStage2();
