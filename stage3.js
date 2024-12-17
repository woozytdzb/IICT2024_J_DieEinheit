function createStage3() {
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
    
            this.speed =40;
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

            this.mdisp= false;
        }
    
        draw() {
            if (this.get == "headphone") {
                this.images = [[h_right_1,h_right_0,h_right_2,h_right_0],[h_left_1,h_left_0,h_left_2,h_left_0],[h_front_1,h_front_0,h_front_2,h_front_0],[h_back_1,h_back_0,h_back_2,h_back_0]];
            } else if (this.get == "pouch") {
                this.images = [[p_right_1,p_right_0,p_right_2,p_right_0],[p_left_1,p_left_0,p_left_2,p_left_0],[p_front_1,p_front_0,p_front_2,p_front_0],[p_back_1,p_back_0,p_back_2,p_back_0]];
            } else {
                this.images = [[right_1,right_0,right_2,right_0],[left_1,left_0,left_2,left_0],[front_1,front_0,front_2,front_0],[back_1,back_0,back_2,back_0]];
            }

            if (M.fadeout) {
                this.stop();
            } else {
                if((keyIsDown(68)||keyIsDown(65)||keyIsDown(83)||keyIsDown(87))&&(keyCode!=ENTER)) {
                    this.move();
                } else {
                    this.stop();
                }
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
            if (this.moveCount%2==1) {
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
        
        isRectangleTriangleIntersecting() {
            // 사각형의 좌표 (this.X, this.Y), (this.X + back_0.width, this.Y + back_0.height)
            const rect = [
                [this.X, this.Y], // 왼쪽 상단
                [this.X + back_0.width, this.Y], // 오른쪽 상단
                [this.X + back_0.width, this.Y + back_0.height], // 오른쪽 하단
                [this.X, this.Y + back_0.height] // 왼쪽 하단
            ];
        
            // 삼각형의 3 꼭지점
            const triangle = [
                [500 + 34 * 3 / 4, 600 + 285 * 3 / 4],  // A
                [500 + 700 * 3 / 4, 600 + 285 * 3 / 4], // B
                [500 + 375 * 3 / 4, 600]   // C
            ];
        
            // 벡터 외적 계산 (2D)
            function crossProduct(x1, y1, x2, y2) {
                return x1 * y2 - y1 * x2;
            }
        
            // 점이 삼각형 내부에 있는지 확인하는 함수
            function isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
                const cross1 = crossProduct(x2 - x1, y2 - y1, px - x1, py - y1);
                const cross2 = crossProduct(x3 - x2, y3 - y2, px - x2, py - y2);
                const cross3 = crossProduct(x1 - x3, y1 - y3, px - x3, py - y3);
                const hasSameSign = (cross1 > 0 && cross2 > 0 && cross3 > 0) || (cross1 < 0 && cross2 < 0 && cross3 < 0);
                return hasSameSign;
            }
        
            // 사각형의 각 꼭지점이 삼각형 내부에 있는지 확인
            function isRectangleInTriangle(rect, triangle) {
                const [x1, y1] = rect[0];
                const [x2, y2] = rect[1];
                const [x3, y3] = rect[2];
                const [x4, y4] = rect[3];
                const [t1, t2, t3] = triangle;
                return (
                    isPointInTriangle(x1, y1, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x2, y2, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x3, y3, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x4, y4, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1])
                );
            }
        
            // 삼각형의 각 꼭지점이 사각형 내부에 있는지 확인
            function isTriangleInRectangle(triangle, rect) {
                const [x1, y1] = triangle[0];
                const [x2, y2] = triangle[1];
                const [x3, y3] = triangle[2];
                const [r1, r2, r3, r4] = rect;
                return (
                    isPointInTriangle(x1, y1, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1]) ||
                    isPointInTriangle(x2, y2, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1]) ||
                    isPointInTriangle(x3, y3, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1])
                );
            }
        
            // 사각형과 삼각형이 겹치는지 확인
            return isRectangleInTriangle(rect, triangle) || isTriangleInRectangle(triangle, rect);
        }
    
        right() {
            this.direction = "right";
            if (frameCount%this.count==0) {

                if (this.X >= this.moveWall()[0] && this.X < this.moveWall()[1] && this.playerX >= this.moveWall()[2]) {
                    this.bgXChange -= this.speed;
                }
                this.X += this.speed;
                if (door1.o||door2.o||door3.o){
                    if(this.isRectangleTriangleIntersecting() || !(this.X+back_0.width < 500 || this.X > 500+(chairs.width*3/4)-35 || this.Y+back_0.height < 600+(chairs.height*3/4)/2 || this.Y > 600+(chairs.height*3/4)-200)) {
                        if (this.X >= this.moveWall()[0] && this.X < this.moveWall()[1] && this.playerX >= this.moveWall()[2]) {
                            this.bgXChange += this.speed;
                        }
                        this.X -= this.speed;
                    }
                }
                this.state = this.images[0][this.moveCount%4];
                this.moveCount++;
            }
        }
    
        left() {
            this.direction = "left";
            if (frameCount%this.count==0) {
                if (this.X <= this.moveWall()[0] && this.X > this.moveWall()[1] && this.playerX <= this.moveWall()[2]) {
                    this.bgXChange += this.speed;
                }
                this.X -= this.speed;
                if (door1.o||door2.o||door3.o){
                    if(this.isRectangleTriangleIntersecting() || !(this.X+back_0.width < 500 || this.X > 500+(chairs.width*3/4)-35 || this.Y+back_0.height < 600+(chairs.height*3/4)/2 || this.Y > 600+(chairs.height*3/4)-200)) {
                        if (this.X <= this.moveWall()[0] && this.X > this.moveWall()[1] && this.playerX <= this.moveWall()[2]) {
                            this.bgXChange -= this.speed;
                        }
                        this.X += this.speed;
                    }
                }
                this.state = this.images[1][this.moveCount%4];
                this.moveCount++;
            }
        }
    
        front() {
            this.direction = "front";
            if (frameCount%this.count==0) {
                if (this.Y >= this.moveWall()[0] && this.Y < this.moveWall()[1] && this.playerY >= this.moveWall()[2]) {
                    this.bgYChange -= this.speed;
                }
                this.Y += this.speed;
                if (door1.o||door2.o||door3.o){
                    if(this.isRectangleTriangleIntersecting() || !(this.X+back_0.width < 500 || this.X > 500+(chairs.width*3/4)-35 || this.Y+back_0.height < 600+(chairs.height*3/4)/2 || this.Y > 600+(chairs.height*3/4)-200)) {
                        if (this.Y >= this.moveWall()[0] && this.Y < this.moveWall()[1] && this.playerY >= this.moveWall()[2]) {
                            this.bgYChange += this.speed;
                        }
                        this.Y -= this.speed;
                    }
                }
                this.state = this.images[2][this.moveCount%4];
                this.moveCount++;
            }
        }
    
        back() {
            this.direction = "back";
            if (frameCount%this.count==0) {
                if (this.Y <= this.moveWall()[0] && this.Y > this.moveWall()[1] && this.playerY <= this.moveWall()[2]) {
                    this.bgYChange += this.speed;
                }
                this.Y -= this.speed;
                if (door1.o||door2.o||door3.o){
                    if(this.isRectangleTriangleIntersecting() || !(this.X+back_0.width < 500 || this.X > 500+(chairs.width*3/4)-35 || this.Y+back_0.height < 600+(chairs.height*3/4)/2 || this.Y > 600+(chairs.height*3/4)-200)) {
                        if (this.Y <= this.moveWall()[0] && this.Y > this.moveWall()[1] && this.playerY <= this.moveWall()[2]) {
                            this.bgYChange -= this.speed;
                        }
                        this.Y += this.speed
                    }
                }
                this.state = this.images[3][this.moveCount%4];
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

    class monster {
        constructor(X,Y,constrX,constrY) {
            this.X = X
            this.Y = Y
            this.W = 465;
            this.H = 175;
            this.speed = 85;
            this.constrX = constrX;
            this.constrY = constrY;
    
            this.state = monster_0;
            this.images = [monster_1,monster_0,monster_2,monster_0];
    
            this.isMoving = true;
            this.fadeout = false;
            this.dis = 0;
            this.moveCount=0;
        }

        draw() {
            if (me.center()[0] < this.center()[0]) {
                this.images = [monster_1,monster_0,monster_2,monster_0];
            } else {
                this.images = [monster_1,monster_0,monster_2,monster_0];
            }
    
            if (this.isMoving) {
                this.move();
            } else {
                this.stop();
            }
    
            if (this.fadeout) {
                if(!this.mdisp) {
                    mdis.play();
                    this.mdisp = true;
                }
                this.isMoving = false;
                let fade_list = [monfade_1,monfade_2,monfade_3,monfade_4,monfade_5,monfade_6,];
                if (frameCount%9==0) {
                    this.dis++;
                }
                if (this.dis<=5) {
                    this.state = fade_list[this.dis];
                } else {
                    page = 5;
                }
    
            }
            
            image(this.state,this.X+me.bgXChange,this.Y+me.bgYChange);
        }

        isRectangleTriangleIntersecting() {
            // 사각형의 좌표 (this.X, this.Y), (this.X + back_0.width, this.Y + back_0.height)
            const rect = [
                [this.X, this.Y], // 왼쪽 상단
                [this.X + monster_0.width, this.Y], // 오른쪽 상단
                [this.X + monster_0.width, this.Y + monster_0.height], // 오른쪽 하단
                [this.X, this.Y + monster_0.height] // 왼쪽 하단
            ];
        
            // 삼각형의 3 꼭지점
            const triangle = [
                [500 + 34 * 3 / 4, 600 + 285 * 3 / 4],  // A
                [500 + 700 * 3 / 4, 600 + 285 * 3 / 4], // B
                [500 + 375 * 3 / 4, 600]   // C
            ];
        
            // 벡터 외적 계산 (2D)
            function crossProduct(x1, y1, x2, y2) {
                return x1 * y2 - y1 * x2;
            }
        
            // 점이 삼각형 내부에 있는지 확인하는 함수
            function isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
                const cross1 = crossProduct(x2 - x1, y2 - y1, px - x1, py - y1);
                const cross2 = crossProduct(x3 - x2, y3 - y2, px - x2, py - y2);
                const cross3 = crossProduct(x1 - x3, y1 - y3, px - x3, py - y3);
                const hasSameSign = (cross1 > 0 && cross2 > 0 && cross3 > 0) || (cross1 < 0 && cross2 < 0 && cross3 < 0);
                return hasSameSign;
            }
        
            // 사각형의 각 꼭지점이 삼각형 내부에 있는지 확인
            function isRectangleInTriangle(rect, triangle) {
                const [x1, y1] = rect[0];
                const [x2, y2] = rect[1];
                const [x3, y3] = rect[2];
                const [x4, y4] = rect[3];
                const [t1, t2, t3] = triangle;
                return (
                    isPointInTriangle(x1, y1, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x2, y2, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x3, y3, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1]) ||
                    isPointInTriangle(x4, y4, t1[0], t1[1], t2[0], t2[1], t3[0], t3[1])
                );
            }
        
            // 삼각형의 각 꼭지점이 사각형 내부에 있는지 확인
            function isTriangleInRectangle(triangle, rect) {
                const [x1, y1] = triangle[0];
                const [x2, y2] = triangle[1];
                const [x3, y3] = triangle[2];
                const [r1, r2, r3, r4] = rect;
                return (
                    isPointInTriangle(x1, y1, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1]) ||
                    isPointInTriangle(x2, y2, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1]) ||
                    isPointInTriangle(x3, y3, r1[0], r1[1], r2[0], r2[1], r3[0], r3[1])
                );
            }
        
            // 사각형과 삼각형이 겹치는지 확인
            return isRectangleInTriangle(rect, triangle) || isTriangleInRectangle(triangle, rect);
        }
    
        move() {
            if (frameCount%9==0) {
                if (frameCount%18) {
                    mwalk.play();
                }

                let x = this.X;
                let y = this.Y;

                if (abs(me.center()[0]-this.center()[0]) > abs(me.center()[1]-this.center()[1])) {
                    if (me.center()[0] > this.center()[0]) {
                        this.X += this.speed;
                    } else {
                        this.X -= this.speed;
                    }
                } else {
                    if (me.center()[1] > this.center()[1]) {
                        this.Y += this.speed;
                    } else {
                        this.Y -= this.speed;
                    }
                }

                if (door1.o||door2.o||door3.o){
                    if (this.isRectangleTriangleIntersecting() || !(this.X+back_0.width < 500 || this.X > 500+(chairs.width*3/4)-35 || this.Y+back_0.height < 600+(chairs.height*3/4)/2 || this.Y > 600+(chairs.height*3/4)-200)) {
                        this.X = x;
                        this.Y = y;
                    }
                }

    
                this.state = this.images[this.moveCount%4];
                this.moveCount++;
            }
    
            this.X = constrain(this.X,this.constrX[0],this.constrX[1]);
            this.Y = constrain(this.Y,this.constrY[0],this.constrY[1]);
            
            this.check();
        }
    
        stop() {
            this.moveCount = 0;
    
            if (this.state == (monster_1||monster_2)) {
                this.state = monster_0;
            }
        }
    
        check() {
            if (!(me.X+back_0.width < this.X+50 || me.X > this.X+monster_0.width-50 || me.Y+back_0.height < this.Y+50 || me.Y > this.Y+monster_0.width-50)) {
                if (!headphone && !pouch) {
                    meet = true;
                } else {
                    items = true;
                }
            } else {
                meet = false;
            }
        }
    
        reset(X,Y) {
            this.X = X
            this.Y = Y
    
            this.state = monster_0;
            this.images = [monster_1,monster_0,monster_2,monster_0];
    
            this.isMoving = true;
            this.fadeout = false;
            this.dis = 0;
            this.moveCount=0;
        }
    
        center() {
            let center = [this.X+this.W/2, this.Y+this.H/2];
            return center;
        }
    }

    class door {
        constructor(X, Y, right) {
            this.W = 180;
            this.H = 305;
            this.X = X-this.W/2;
            this.Y = Y;
            this.center = [this.X+this.W/2,this.Y+this.H/2];
            this.dist = false;
            this.right = right;
            this.o = false;
        }
    
        draw() {
            if (dist(me.center()[0],me.center()[1],this.center[0],this.center[1]) < 200) {
                strokeWeight(5);
                stroke(255,255,0);
                noFill();
                rect(this.X+me.bgXChange,this.Y,this.W,this.H);
                this.open();
            } else {
                noStroke();
            }
        }
    
        open() {
            if (keyIsPressed && keyCode == ENTER) {
                this.o = true;
                me.reset(front_0,800,200);
                me.mapX=1200;
                me.startX=0;
                me.moveX=0;
                me.constrX=[0,1200-back_0.width];
                me.mapY=1500;
                me.startY=0;
                me.moveY=200;
                me.constrY=[100,1500-back_0.height];
    
                M.reset(1100,100);
                M.constrX=[0,1200-back_0.width];
                M.constrY=[100,1500-back_0.height];
                page = 3;

                if(this.right) {
                    roomnum = 1;
                } else {
                    roomnum = 0;
                }
            }

        }
    }

    class dialogue {
        constructor(portait,name,line) {
            this.portait = portait
            this.line = line;
            this.name = name;
        }

        draw() {
            noStroke();
            // 투명도 추가
            fill(50, 50, 50, 150);
            rect(0, 600, 1200, 300);

            // dialog icon
            if (this.portait) {
                image(this.portait, 0, 600);

                fill(200);
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

    class classroom {
        constructor() {
            this.right = false;
            this.istaken = false;
            // this.chair = false;
        }
    
        draw() {
            // this.check();

            if (M.fadeout) {
                image(classfloor,0,me.bgYChange);
                image(doorlight,1200-doorlight.width,300+me.bgYChange);
                image(chairs,500,600+me.bgYChange,605,375);
            } else{
                image(classfloor,0,me.bgYChange);
                image(doorlight,1200-doorlight.width,300+me.bgYChange);
                image(chairs,500,600+me.bgYChange,605,375);
                if (this.right) {
                    this.item();
                }
            }
        }
    
    
        item() {
            if(this.istaken) {
            } else {
                if (dist(me.center()[0], me.center()[1], 800, 1200)<250) {
                    push();
                    imageMode(CENTER);
                    image(i_headphone,700,1200+me.bgYChange,156,120);
                    image(i_pouch,900,1200+me.bgYChange,156,120);
                    pop();
                    if (keyIsPressed && keyCode == ENTER && this.istaken==false) {
                        this.choice();
                    }
                } else {
                    push();
                    imageMode(CENTER);
                    image(i_headphone,700,1200+me.bgYChange,126,96);
                    image(i_pouch,900,1200+me.bgYChange,126,96);
                    pop();
                }
            }
        }
    
        choice() {
            M.isMoving = false;
            page = 4;
            this.istaken = true;
        }
    
        reset(){
            this.right = false;
            this.istaken = false;
        }

        // check() {
        //     if (!(me.X+back_0.width <= 200 || me.X >= 200+chairs.width || me.Y+back_0.height <= 1000 || me.Y >= 1000-chairs.height-50)) {
        //         this.chair = true;
        //     } else {
        //         this.chair = false;
        //     }
        // }
    }


    let back_0, back_1, back_2, front_0, front_1, front_2, left_0, left_1, left_2, right_0, right_1, right_2;
    let p_back_0, p_back_1, p_back_2, p_front_0, p_front_1, p_front_2, p_left_0, p_left_1, p_left_2, p_right_0, p_right_1, p_right_2;
    let h_back_0, h_back_1, h_back_2, h_front_0, h_front_1, h_front_2, h_left_0, h_left_1, h_left_2, h_right_0, h_right_1, h_right_2;
    let monster_0, monster_1, monster_2;
    let array, classfloor, portrait;
    let meet = false;
    let page = 0;
    let c_1 = false;
    let c_2 = false;
    let headphone = false;
    let pouch = false;
    let roomnum = 0;
    let dots = [];
    let stars = [];
    let currentDot = null; // 현재 활성화된 점
    let a = 0;
    let a_l = [0,150];
    
    let page0 = 0;
    let page1 = 0;
    let page2 = 0;
    let page3 = 0;
    let page4 = 0;
    let page5 = 0;
    
    
    let me, door1, door2, door3, M, cr;
    
    let blackCount = 0;
    let alpha=0;
    let i=0;
    let bgX=0;
    let bgY=0;
    
    let get=null;
    let resetting = false;

    let items = false;
    
    
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
      
      monster_0 = loadImage("asset/monster/monster_0.png");
      monster_1 = loadImage("asset/monster/monster_1.png");
      monster_2 = loadImage("asset/monster/monster_2.png");
      monfade_1 = loadImage("asset/fade/monfade_1.png");
      monfade_2 = loadImage("asset/fade/monfade_2.png");
      monfade_3 = loadImage("asset/fade/monfade_3.png");
      monfade_4 = loadImage("asset/fade/monfade_4.png");
      monfade_5 = loadImage("asset/fade/monfade_5.png");
      monfade_6 = loadImage("asset/fade/monfade_6.png");
    
      namu = loadFont("asset/namu.ttf");
      myeongjo = loadFont("asset/Nanummyeongjo.ttf");
    
      array = loadImage("asset/array.png")
      classfloor = loadImage("asset/classfloor.png");
      doorlight = loadImage("asset/doorlight.png");
      road = loadImage("asset/road.png");
      chairs = loadImage("asset/chairs.png");
      blackpng = loadImage("asset/voicepng.png");
      
      cut1 = loadImage("asset/cut/3_1 imsi.png");
      cut2 = loadImage("asset/cut/3_2 imsi.png");
      cut3 = loadImage("asset/cut/3_3 imsi.png");
      cut4 = loadImage("asset/cut/3_4 imsi.png");
    
      i_pouch = loadImage("asset/pouch.png");
      i_headphone = loadImage("asset/headphone.png");
    
      i_star = loadImage("asset/icon/star.png");
      i_heart = loadImage("asset/icon/heart.png");
    
      portrait = loadImage("asset/mc.png");

      cutscenes = loadSound("asset/sound/cutscene_3.mp3");
      walk = loadSound("asset/sound/walk_default.mp3");
      mwalk = loadSound("asset/sound/monster_walk_3.mp3");
      mdis = loadSound("asset/sound/monster_death_3.mp3");
    }
    
    function _setup() {
      createCanvas(1200, 900);
      door1 = new door(933,152,false);
      door2 = new door(22,152,false);
      door3 = new door(-888,152,true);
      me = new player(right_0, 100, 350, [-1200,1200-back_0.width], [250,900-back_0.height], 2400, 900, -1200, 0, 100, 0);
      M = new monster(700,300,[-1200, 1200-monster_0.width], [250, 900-monster_0.height]);
      cr = new classroom();
      frameRate(60);
    }
    
    
    function _draw() {
        console.log('starscore: '+starscore,'clockscore: '+clockscore,'moneyscore: '+moneyscore,'heartscore: '+heartscore);
        if (resetting) {
            return "cutscene";
        }
      switch (page) {
        //컷신
        case 0:
          switch (page0) {
            case 0:
              alpha++;
              noStroke();
              fill(0,constrain(5*alpha,0,255));
              rect(0,0,1200,900);
              fill(255,constrain(5*alpha,0,255));
              textSize(100);
              textAlign(CENTER,CENTER);
              textFont(namu);
              text("3. 친구",600,450);
              if (alpha>=51) {
                alpha=51;
                page0=1;
              }
              break;
            
            case 1:
              image(cut1,0,0);
              let d1 = new dialogue(createImage(300,300),"",'.....');
              d1.draw();
              break;
            
            
            case 2:
              image(cut2,0,0);
              let d3 = new dialogue(createImage(300,300),"",'.....재밌겠다.');
              d3.draw();
              break;
            
            case 3:
              image(cut2,0,0);
              let d4 = new dialogue(createImage(300,300),"",'나도...같이 천문학 이야기해 볼까?');
              d4.draw();
              break;
    
            case 4:
            image(cut3,0,0);
            let d5 = new dialogue(createImage(300,300),"",'.....!!!!!!!!');
            d5.draw();
            break;

            case 5:
                image(cut4,0,0);
                let d6 = new dialogue(createImage(300,300),"",'.....');
                d6.draw();
                break;
            
            case 6:
                image(cut4,0,0);
                let d7 = new dialogue(createImage(300,300),"",'...나는 역시, 겁이 나서 말을 못 걸겠어.');
                d7.draw();
                break;
    
            case 7:
              page0 = 1;
              page = 1;
              break;
          }
          break;
        
        // 다이얼로그
        case 1:
          image(array,-1200,0);
          image(right_0,100,350);
    
          switch(page1) {
            case 0:
              d1 = new dialogue(portrait,"",'"여기는..."');
              d1.draw();
              break;
              
            case 1:
              let mon=[monster_1,monster_0,monster_2,monster_0];
              let m_show;
              if (frameCount%9==0) {
                i++;
              }

              if (i>=11) {
                m_show = monster_0;
              } else {
                if (frameCount%20==19) {
                    mwalk.play();
                  }
                m_show = mon[i%4]
              }
              image(m_show,1200-constrain(60*i,0,500),300);
              d1.draw();
              break;
    
            
            case 2:
              image(monster_0,700,300);
              d2 = new dialogue(portrait,"",'"그때 보였던….친구들…..?"');
              d2.draw();
              break;
    
            case 3:
              page1 = 0;
              page = 2;
              break;
            }
            break;
    
        // 복도
        case 2:
          if (meet) {
            image(blackpng,0,0,1200,900);
            textAlign(CENTER,CENTER);
            strokeWeight(2);
            stroke(200,0,0);
            fill(180,0,0);
            textFont(myeongjo);
            textSize(80);
            text('"도망쳐야 해!"',600,450);
            blackCount++;
            if (blackCount >= 50) {
              blackCount=0;
              meet=false;
              arrayReset();
            }
          }  else {
              background(220);
              image(array,-1200+me.bgXChange,0);
              door1.draw();
              door2.draw();
              door3.draw();

              if (items){
                image(me.state, me.playerX, me.playerY);
                image(M.state, M.X+me.bgXChange, M.Y+me.bgYChange);
                let d = new dialogue(portrait,"", "........!");
                d.draw();
                if (keyIsPressed, keyCode == ENTER){
                    M.fadeout = true;
                    items = false;
                }
              }else{
                me.draw();
                M.draw();
              }

              if (frameCount%7==0) {
                a += 1;
              }
              noStroke();
              fill(0,0,0,a_l[a%2]);
              rect(0,0,1200,900);
          }
          break;
    
        // 교실
        case 3:
          if (meet) {
            image(blackpng,0,0,1200,900);
            textAlign(CENTER,CENTER);
            textAlign(CENTER,CENTER);
            strokeWeight(2);
            stroke(200,0,0);
            fill(180,0,0);
            textFont(myeongjo);
            textSize(80);
            text('"도망쳐야 해!"',600,450);
            blackCount++;
            if (blackCount >= 50) {
              blackCount=0;
              meet=false;
              arrayReset();
            }
          } else {
            background(225);
              if (roomnum == 1) {
                cr.right = true;
              }
              cr.draw();
              if (items){
                image(me.state, me.playerX, me.playerY);
                image(M.state, M.X+me.bgXChange, M.Y+me.bgYChange);
                let d = new dialogue(portrait,"", "........!");
                d.draw();
                if (keyIsPressed, keyCode == ENTER){
                    M.fadeout = true;
                    items = false;
                }
              }else{
                me.draw();
                M.draw();
              }

              if (frameCount%7==0) {
                a += 1;
              }
              noStroke();
              fill(0,0,0,a_l[a%2]);
              rect(0,0,1200,900);
          }
          
          break;
    
        // 선택지
        case 4:
          background(101,84,78);
          noStroke();
          push();
          imageMode(CENTER);
          image(i_headphone,400,400,306,240);
          image(i_pouch,800,400,306,240);
          pop();
    
          textAlign(CENTER,CENTER);
          textSize(30);
          textAlign(CENTER, CENTER);
          textFont(myeongjo);
          fill(255);
          
          text("헤드셋을 선택한다[a]",400,550);
          text("파우치를 선택한다[d]",800,550);
          if(c_1) {
            background(101,84,78);
            push();
            imageMode(CENTER);
            image(i_headphone,400,400,356,280);
            image(i_pouch,800,400,306,240);
            pop();
            text("[ENTER]",600,600);
            if (keyIsPressed && keyCode == ENTER) {
              headphone = true;
              M.isMoving = true;
              page = 3;
              me.get = "headphone";
              cr.draw();
              me.draw();
              M.draw();
            }
          }
          if(c_2) {
            background(101,84,78);
            push();
            imageMode(CENTER);
            image(i_headphone,400,400,306,240);
            image(i_pouch,800,400,356,280);
            pop();
            text("[ENTER]",600,600);
              if (keyIsPressed && keyCode == ENTER) {
                pouch = true;
                M.isMoving = true;
                page = 3;
                me.get = "pouch";
                cr.draw();
                me.draw();
                M.draw();
              }
          }
          break;
    
        // 결과
        case 5:
          switch (page5) {
            case 0:
              // let n;
              let d = new dialogue(portrait,"",'다행이야...');
              d.draw();
              break;

            case 1:
                // let n;
                let d1 = new dialogue(portrait,"",'맞아, 남의 말 신경 안쓰고 내가 원하는 걸 선택하면 돼.');
                let d2 = new dialogue(portrait,"",'그때 친구들이 좋아하는 것에 다가갔으면… 좋았을 텐데.');
                
                if(headphone) {
                    d1.draw();
                } else {
                    d2.draw();
                }
                break;
              
            case 2:
              imageMode(CORNER);
              me.draw();
              if (headphone) {
                n = i_star;
                get = "별";
              } else {
                n = i_heart;
                get = "하트"
              }
    
              if (me.direction=="right") {
                image(n,me.playerX+85,me.playerY+100);
              } else if (me.direction=="left") {
                image(n,me.playerX-115,me.playerY+100);
              } else if (me.direction=="front") {
                image(n,me.playerX-15,me.playerY+250);
              } else if (me.direction=="back") {
                image(n,me.playerX-15,me.playerY+50);
              }
    
              image(me.state,me.playerX,me.playerY);
              break;
            
            // case 3:
            //     imageMode(CORNER);
            //     image(classfloor,0,me.bgYChange);
            //     image(doorlight,1200-doorlight.width,300+me.bgYChange);
            //     image(me.state,me.playerX,me.playerY);
            // break;            
            
            case 3:
              fill(20);
              rect(0,0,1200,900);
              push();
              imageMode(CENTER);
              image(n,600,400);
              pop();
              fill(255);
              textAlign(CENTER,CENTER);
              text(get+"을/를 얻었다.",600,600);
              break;
            
            case 4:
                page=0;
                page4=0;
                if (get=="별") {
                    starscore++;
                    console.log('starscore 한개 추가');
                } else if (get=="하트") {
                    heartscore++;
                    console.log('heartscore 한개 추가');
                }
                page = 0;
                page5 = 0;
            return "stage4";
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
      if (page==0 && keyCode==ENTER) {
        page0++;
        if(page0==1) {
            cutscenes.play();
        } else if(page0==4) {
            cutscenes.pause();
        }
       }
    
      if (page==1 && keyCode==ENTER) {
        page1++;
      }
    
      if ((door1.o || door2.o || door3.o) && keyCode==ENTER) {
        // 교실에서 나오기
        if (!(me.X+back_0.width<850 || me.X>1200 || me.Y+back_0.height>500 || me.Y<200)) {
            arrayReset();
        }
      }
    
      if (page==4) {
        if (key == "a") {
          c_1 = true;
          c_2 = false;
        } else if (key == "d") {
          c_2 = true;
          c_1 = false;
        }
      }
      if (page==5 && keyCode==ENTER) {
        page5++;
      }
    }

    function _mouseClicked() {
        if (mouseX > 10 && mouseX < 130 && mouseY > 10 && mouseY < 60){
            starscore = 0;
            heartscore = 0;
            moneyscore = 0;
            clockscore = 0;
            resetting = true;
        }
    }
    
    
    function arrayReset() {
        door1.o = false;
        door2.o = false;
        door3.o = false;
        me.reset(right_0,100,400);
        me.mapX=2400-back_0.width;
        me.startX=-1200;
        me.moveX=100;
        me.constrX=[-1200,1200-back_0.width];
        me.mapY=900-back_0.height;
        me.startY=0;
        me.moveY=0;
        me.constrY=[250,900-back_0.height];

        M.constrX=[-1200,1200-monster_0.width];
        M.constrY=[250, 900-monster_0.height];
        
        M.reset(700,300);
        page = 2;
    }

    return {
        preload: _preload,
        setup: _setup,
        draw: _draw,
        keyPressed: _keyPressed,
        mouseClicked: _mouseClicked
    };
}


const stage3 = createStage3();
