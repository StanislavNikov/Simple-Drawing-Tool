// IIFE
(function() {
    const changePattern = document.querySelector('#changePattern'),
        changeLineWidth = document.querySelector('#changeLineWidth'),
        changeColor = document.querySelector('#changeColor'),
        canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    let isDrawing = false,
        previousX = null,
        previousY = null;

    captureCanvasDimensions();

    // Function initiates previousX & previousY
    function handleStart(e) {
        isDrawing = true;
        let x = e.pageX;
        let y = e.pageY;
        previousX = x;
        previousY = y;
    }

    // Function to stop drawing
    function handleEnd() {
        isDrawing = false;
    }

    // Function checks the value of isDrawing() and uses the previously initiated coordinates previousX, previousY to draw a line to x, y
    function handleMove(e) {
        // To prevent drawing on hover
        if (!isDrawing) {
            return;
        }

        let x = e.pageX;
        let y = e.pageY;

        // Draw a line from previousX/previousY to x/y
        ctx.beginPath();
        ctx.moveTo(previousX, previousY);
        ctx.lineTo(x, y);

        // Set the style of the line
        ctx.lineWidth = changeLineWidth.value;
        ctx.strokeStyle = changeColor.value;
        ctx.stroke();

        // Set previous coordinates for next move event
        previousX = x;
        previousY = y;
    }

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

    document.querySelector('#clearCanvas').addEventListener('click', clearCanvas);
    canvas.addEventListener('pointerdown', handleStart);
    canvas.addEventListener('pointerup', handleEnd);
    canvas.addEventListener('pointercancel', handleEnd);
    canvas.addEventListener('pointermove', handleMove);
    window.addEventListener('resize', captureCanvasDimensions);
})();