const changePattern = document.querySelector('#changePattern'),
    changeLineWidth = document.querySelector('#changeLineWidth'),
    changeColor = document.querySelector('#changeColor'),
    canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');

captureCanvasDimensions();

// Function captures the Dimensions of the Canvas
function captureCanvasDimensions() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    clearCanvas();
}

// Function clears a rectangle starting from x=0, y=0 with width canvas.with and height canvas.height
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', captureCanvasDimensions);