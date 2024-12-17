let curStage = "cutscene";
const stages = {
    "cutscene": cutScene,
    "start": start,
    "stage1": stage1,
    "stage2": stage2,
    "stage3": stage3,
    "stage4": stage4,
    "stage5": stage5,
    "stage6": stage6
}

function setup(){
    console.log('setup() called');
    for (const key in stages) {
        if (stages[key].setup) {
            stages[key].setup();
        }
    }
}

function preload() {
    console.log('preload() called');
    for (const key in stages) {
        if (stages[key].preload) {
            stages[key].preload();
        }
    }
}

function draw(){
    const stage = stages[curStage];
    //console.log('draw(), curStage = ' + curStage + ', stage = ', stage);
    if (stage) {
        const result = stage.draw();
        if (result) {
            curStage = result;
        }
    }
}

function keyPressed() {
    if (stages[curStage] && stages[curStage].keyPressed) {
        stages[curStage].keyPressed();
    }
}

function mousePressed() {
    if (stages[curStage] && stages[curStage].mousePressed) {
        stages[curStage].mousePressed();
    }
}

function mouseDragged() {
    if (stages[curStage] && stages[curStage].mouseDragged) {
        stages[curStage].mouseDragged();
    }
}

function mouseReleased() {
    if (stages[curStage] && stages[curStage].mouseReleased) {
        stages[curStage].mouseReleased();
    }
}

function mouseClicked() {
    if (stages[curStage] && stages[curStage].mouseClicked) {
        stages[curStage].mouseClicked();
    }
}

console.log('main.js loaded');
