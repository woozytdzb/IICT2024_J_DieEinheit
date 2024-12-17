function createStage1() {
    class InteractionGuide {
        draw() {
            //console.log('InteractionGuide::draw()');
            if (isAllPiecesLocked()) {

            }
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

            fill(200);
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

                /*
                fill(200);
                textSize(40);
                textAlign(LEFT);
                text(dialogTitle[this.type], 300, 700); // when CENTER
                 */
            }

            fill(255);
            textSize(30);
            if (dialogIconImages[this.type]) {
                textAlign(LEFT);
                text(/*"- " +*/ this.line, 320, 750); // when CENTER
            } else {
                textAlign(CENTER);
                text(this.line, 600, 750); // when CENTER
            }

            triangle(1083, 839, 1149, 839, 1116, 871);
        }
    }

    class EnteredDialogue {
        constructor(line, type) {
            // this.portait = portait
            this.line = line;
            this.type = type;
            this.isCompleted = false;
        }

        draw() {
            if (!this.isCompleted) {
                noStroke();
                // 투명도 추가
                fill(50, 50, 50, 100);
                rect(0, 600, 1200, 300);

                // dialog icon
                if (dialogIconImages[this.type]) {
                    image(dialogIconImages[this.type], 0, 600);

                    fill(200);
                    textSize(40);
                    textAlign(LEFT);
                    text(dialogTitle[this.type], 300, 700); // when CENTER
                }

                fill(255);
                textSize(30);
                if (dialogIconImages[this.type]) {
                    textAlign(LEFT);
                    text("- " + this.line, 320, 750); // when CENTER
                } else {
                    textAlign(CENTER);
                    text(this.line, 600, 750); // when CENTER
                }

                triangle(1083, 839, 1149, 839, 1116, 871);
            }
        }

        enter() {
            this.isCompleted = true;
        }

        reset() {
            this.isCompleted = false;
        }
    }

    // 퍼즐 조각 클래스
    class PuzzlePiece {
        constructor(name, x, y, imageDefault, imageClicked) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.startX = x; // 초기 위치 저장
            this.startY = y;
            this.imageDefault = imageDefault; // 기본 이미지
            this.imageClicked = imageClicked; // 클릭 후 변경될 이미지
            this.currentImage = imageDefault; // 현재 이미지
            this.isLocked = false; // 고정 여부
        }

        reset() {
            this.isLocked = false;
            this.x = this.startX;
            this.y = this.startY;
            this.currentImage = this.imageDefault;
        }

        show() {
            image(this.currentImage, this.x, this.y, this.currentImage.width, this.currentImage.height);
        }

        checkClick(mx, my) { //여기서 mx, my는 매개변수로, mouseX와 mouseY를 받음
            let imgWidth = this.currentImage.width;  // 이미지의 실제 가로 크기
            let imgHeight = this.currentImage.height;  // 이미지의 실제 세로 크기
            return mx > this.x && mx < this.x + imgWidth &&
                    my > this.y && my < this.y + imgHeight;
        }

        toggleImage() {
            // 현재 이미지를 전환
            if (this.currentImage === this.imageDefault) {
                this.currentImage = this.imageClicked;
            } else {
                this.currentImage = this.imageDefault;
            }
        }

        resetPosition() {
            // 원래 위치로 돌아감
            this.x = this.startX;
            this.y = this.startY;
            this.currentImage = this.imageDefault;
            this.show();
            if (!soundPaperWrong.isPlaying()) {
                soundPaperWrong.play();
            }
        }

        goRightPosition() {
            switch(this.name) {
                case 'middle1':
                    this.x = 875;
                    this.y = 105;
                    break;
                case 'middle2':
                    this.x = 655;
                    this.y = 105;
                    break;
                case 'middle3':
                    this.x = 905;
                    this.y = 230;
                    break;
                case 'middle4':
                    this.x = 715;
                    this.y = 520;
                    break;
                case 'middle5':
                    this.x = 655;
                    this.y = 315;
                    break;
            }

            this.currentImage = this.imageClicked;
            this.isLocked = true;
            this.show();
            if (!soundPaperRight.isPlaying()) {
                soundPaperRight.play();
            }
        }

        isRightPosition() {
            let result = false;

            switch(this.name) {
                case 'middle1':
                    if (this.x > 800 && this.x < 1000 && this.y > 50 && this.y < 200) {
                        result = true;
                    }
                    break;
                case 'middle2':
                    if (this.x > 600 && this.x < 800 && this.y > 45 && this.y < 205) {
                        result = true;
                    }
                    break;
                case 'middle3':
                    if (this.x > 800 && this.x < 1000 && this.y > 100 && this.y < 410) {
                        result = true;
                    }
                    break;
                case 'middle4':
                    if (this.x > 515 && this.x < 915 && this.y > 370 && this.y < 670) {
                        result = true;
                    }
                    break;
                case 'middle5':
                    if (this.x > 505 && this.x < 805 && this.y > 65 && this.y < 565) {
                        result = true;
                    }
                    break;
            }
            return result;
        }
    }

    //--------------------------------------------------------------------------
    // Start - stage1
    //--------------------------------------------------------------------------
    let fontMyeongjo;
    let soundPaperRight, soundPaperWrong;
    let plate;
    let pm1, pm2, pm3, pm4, pm5;
    let pb1, pb2, pb3, pb4, pb5;
    let star;
    let dialogIconImages = {}; // dialog icon을 담을 객체
    let dialogTitle = {
        "mc": "조디",
        "mc_4": "조디",
        "self_broken": "조디",
        "young_mc": "꼬마"
    };
    let puzzlePieces = [];
    let selectedPiece = null;
    let offsetX, offsetY; // 오프셋 값은 왼쪽 끝 기준점이랑 클릭점 사이의 거리. 기준점을 벗어나도 해당 객체 내에 마우스가 있다면 잡을 수 있게 하는데 쓰임

    let completionStep = 1;
    let guideDialog = new EnteredDialogue("[마우스를 이용하여 찢어진 시험지를 다시 맞추세요.]");
    let completeDialog = new EnteredDialogue('[시험지를 모두 맞췄다.]');
    let starDialog = new EnteredDialogue('[별을 얻었다.]');
    let currentDialog = guideDialog;

    let interactionGuide = new InteractionGuide();
    let resetGameButton = new ResetButton();

    let shouldShowStar = false;
    let _drawResult = null;
    let transitionTime = 1000; // 1s
    let transitionStartTime = -1; // 전환 시작 시간
    let keyIgnoreTime = 200; // 200ms
    let keyIgnoreStartTime = -1; // key ignore start time

    function resetStage1() {
        selectedPiece = null;
        offsetX = undefined;
        offsetY = undefined;
        resetGameButton.reset();

        puzzlePieces.forEach((piece) => {
            piece.reset();
        });

        completionStep = 1;
        guideDialog.reset();
        completeDialog.reset();
        starDialog.reset();
        currentDialog = guideDialog;

        shouldShowStar = false;
        _drawResult = null;
        transitionStartTime = -1;

        starscore = 0;
    }

    function isAllPiecesLocked() {
        let result = false;
        let lockedCount = 0;
        let pieceLength = puzzlePieces.length;
        if (puzzlePieces && pieceLength > 0) {
            puzzlePieces.forEach((piece) => {
                if (piece.isLocked) {
                    lockedCount++;
                }
            });

            if (lockedCount !== 0 && lockedCount === pieceLength) {
                result = true;
            }
        }
        return result;
    }

    function _preload(){
        plate = loadImage('assets/paper/plate.png');
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
        star = loadImage('assets/star.png');

        dialogIconImages = {
            "mc": loadImage('assets/dialog_icon/mc.png'),
            "mc_4": loadImage('assets/dialog_icon/mc_4.png'),
            "self_broken": loadImage('assets/dialog_icon/self_broken.png'),
            "young_mc": loadImage('assets/dialog_icon/young_mc.png'),
        };

        fontMyeongjo = loadFont('assets/fonts/NanumMyeongjo.ttf');

        soundPaperRight = loadSound('assets/sound/1/paper_right_1.mp3');
        soundPaperWrong = loadSound('assets/sound/1/paper_wrong_1.mp3');
    }

    function _setup(){
        createCanvas(1200, 900);

        puzzlePieces.push(new PuzzlePiece('middle1', 50, 100, pm1, pb1)); //pm의 x좌표, pm의 y좌표, pm=전환 전 이미지, pb=전환 후 이미지
        puzzlePieces.push(new PuzzlePiece('middle2', 300, 150, pm2, pb2));
        puzzlePieces.push(new PuzzlePiece('middle3', 200, 250, pm3, pb3));
        puzzlePieces.push(new PuzzlePiece('middle4', 50, 600, pm4, pb4));
        puzzlePieces.push(new PuzzlePiece('middle5', 350, 420, pm5, pb5));
    }

    function _draw(){
        console.log('starscore: '+starscore+' clockscore: '+clockscore+' moneyscore: '+moneyscore+' heartscore: '+heartscore);
        if (transitionStartTime > 0 && millis() - transitionStartTime < transitionTime) {
            return;
        } else if (transitionStartTime > 0 && millis() - transitionStartTime >= transitionTime) {
            transitionStartTime = -1; // 타이머 리셋
            _drawResult = "stage2";
        }

        // 키 입력 일정 시간 무시
        let passedTime = millis() - keyIgnoreStartTime;
        if (keyIgnoreStartTime > 0 && passedTime < keyIgnoreTime) {
            return;
        } else if (keyIgnoreStartTime > 0 && passedTime >= keyIgnoreTime) {
            keyIgnoreStartTime = -1; // 타이머 리셋
        }

        background(220);
        image(plate, 0, 0);
        //왼쪽 판에 pm 조각 늘어놓기
        for (let piece of puzzlePieces) {
            piece.show();
        }

        currentDialog && currentDialog.draw();
        //interactionGuide.draw();

        if (shouldShowStar) {
            fill(20);
            rect(0,0,1200,900);
            push();
            imageMode(CENTER);
            image(star, 600, 400);
            pop();
            fill(255);
            text('[별을 얻었다.]',600,600);
        }

        if (_drawResult) {
            const result = _drawResult;
            resetStage1();
            return result;
        }

        resetGameButton.draw();
        if (mouseIsPressed && mouseX >= 10 && mouseX <= 130 && mouseY >= 10 && mouseY <= 60) {
            resetStage1();
            return "cutscene";
        }
    }

    function _mousePressed() {
        // 클릭한 퍼즐 조각 확인
        for (let piece of puzzlePieces) {
            if (piece.checkClick(mouseX, mouseY)) {
                // 이미지 전환
                piece.toggleImage();
                // 드래그 시작
                selectedPiece = piece;
                offsetX = mouseX - piece.x;
                offsetY = mouseY - piece.y;
                break;
            }
        }
    }

    function _mouseDragged() {
        // 드래그 중일 때 퍼즐 조각 이동
        if (selectedPiece) {
            selectedPiece.x = mouseX - offsetX;
            selectedPiece.y = mouseY - offsetY;
        }
    }

    function _mouseReleased() {
        // 정위치에 놓였는지 확인하는 기능을 만들어야 함
        if (selectedPiece) {
            if (selectedPiece.isRightPosition()) {
                // 정위치면...
                selectedPiece.goRightPosition();
            } else {
                // 정위치가 아니면...
                selectedPiece.resetPosition();
            }
        }

        if (isAllPiecesLocked()) {
            currentDialog = completeDialog;
        }

        // 드래그가 끝났을 때 선택 해제
        selectedPiece = null;
    }

    function _keyPressed() {
        if (keyCode === ENTER) {
            currentDialog && currentDialog.enter();
            const isCompleted = isAllPiecesLocked();
            if (isCompleted) {
                switch (completionStep) {
                    case 1:
                        currentDialog = starDialog;
                        shouldShowStar = true;
                        console.log('starscore 1개 추가');
                        starscore++;
                        completionStep++;
                        break;
                    case 2:
                        completionStep++;
                        transitionStartTime = millis();
                        return;
                        /*
                    case 3:
                        _drawResult = "stage2";
                        break;
                         */
                }

            }
            keyIgnoreStartTime = millis();
        }
    }

    function _mouseMoved() {
        if (mouseX >= 10 && mouseX <= 130 && mouseY >= 10 && mouseY <= 60) {
            resetGameButton.focused();
        } else {
            resetGameButton.unfocused()
        }
    }

    return {
        stageName : "stage1",
        preload: _preload,
        setup: _setup,
        draw: _draw,
        mousePressed: _mousePressed,
        mouseDragged: _mouseDragged,
        mouseReleased: _mouseReleased,
        mouseMoved: _mouseMoved,
        keyPressed: _keyPressed,
    };
}

const stage1 = createStage1();
