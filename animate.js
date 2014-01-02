
/** Setup the canvas, context and matrix. */
function setup() {
    canvas = document.getElementById("matrix");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx = canvas.getContext("2d");

    col_width = ctx.measureText('8').width + 10;
    var col_count = Math.floor(canvas.width / col_width);
    
    row_height = col_width * 1.25;
    var row_count = Math.floor(canvas.height / row_height);

    console.log("Canvas is " + canvas.width + "x" + canvas.height);
    console.log("col_width/row_height", col_width, row_height);

    matrix = new Matrix(col_count, row_count, TAIL_SIZE);
    skippedFrames = 0;
}


/** Display the current state of the matrix */
function display() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "16pt Matrix";
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";

    for (var col = 0; col < matrix.width; col++) {
        for (var c = 0; c < matrix.trail_size; c++) {
            var x = col*col_width;
            var y = (matrix.columns[col].y + c) * row_height - (row_height*matrix.trail_size);
            var opacity = (c+1) / TAIL_SIZE;
            ctx.fillStyle = 'rgba(0, 255, 0, ' + opacity + ')';
            ctx.fillText(matrix.columns[col].trail[c], x, y);
        };
    };
};


/** Perform the animation */
function tick() {
    // Most frames are skipped for a slow scroll effect
    skippedFrames += 1;
    if (skippedFrames > FRAME_SKIP) {
        skippedFrames = 0;
        display();
        matrix.next();
    }

    if (window.requestAnimationFrame)
        requestAnimationFrame(tick);
    else // older browser
        setTimeout(tick, 33);
  
};


window.onresize = function(event) {
    // on window resize, reset the canvas and context
    setup();
}

var TAIL_SIZE = 16;                 // Matrix tail size
var MAX_V_DELAY = 8;                // Maximum delay before spawning a new column. Avoids cols to be in sync.
var FRAME_SKIP = 6;                 // How many frames to skip for each animation frame

var canvas, ctx;
var skippedFrames, matrix, col_width, row_height;

setup();

tick();