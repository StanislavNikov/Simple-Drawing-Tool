// IIFE
(function() {
    const
        changeColor = document.querySelector('#changeColor'),
        changeLineWidth = document.querySelector('#changeLineWidth'),
        changePattern = document.querySelector('#changePattern'),
        canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    let currentColor = changeColor.value,
        currentLineWidth = changeLineWidth.value,
        currentPattern = changePattern.value,
        isDrawing = false,
        previousCoords = { x: null, y: null };

    captureCanvasDimensions();

    // Function sets isDrawing to true
    function handleStart() {
        isDrawing = true;
    }

    // Function to stop drawing and reseting previousCoords
    function handleEnd() {
        isDrawing = false;
        previousCoords.x = null;
        previousCoords.y = null;
    }

    // Function checks the value of isDrawing() then sets x,y to match the cursor coordinates and calls draw(x, y)
    function handleMove(e) {
        // To prevent drawing on hover
        if (!isDrawing) {
            return;
        }

        let x = e.pageX;
        let y = e.pageY;

        draw(x, y);
    }

    // Function to draw a line from previousCoords to x, y
    function draw(x, y) {
        if (!previousCoords.x) {
            previousCoords.x = x;
            previousCoords.y = y;
        }

        // Draw a line from previousX/previousY to x/y
        ctx.beginPath();
        ctx.moveTo(previousCoords.x, previousCoords.y);
        ctx.lineTo(x, y);

        // Set the style of the line
        ctx.lineWidth = currentLineWidth;
        ctx.strokeStyle = currentColor;
        ctx.stroke();

        previousCoords.x = x;
        previousCoords.y = y;
    }

    // Function captures the Dimensions of the Canvas
    function captureCanvasDimensions() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Function clears a rectangle starting from x=0, y=0 with width canvas.with and height canvas.height
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function handleChangeColor() {
        currentColor = changeColor.value;
    }

    function handleChangeLineWidth() {
        currentLineWidth = changeLineWidth.value;
    }

    function handleChangePattern() {
        currentPattern = changePattern.value;
    }

    changeColor.addEventListener('change', handleChangeColor);
    changeLineWidth.addEventListener('change', handleChangeLineWidth);
    changePattern.addEventListener('change', handleChangePattern);
    document.querySelector('#clearCanvas').addEventListener('click', clearCanvas);
    canvas.addEventListener('pointerdown', handleStart);
    canvas.addEventListener('pointerup', handleEnd);
    canvas.addEventListener('pointercancel', handleEnd);
    canvas.addEventListener('pointermove', handleMove);
    window.addEventListener('resize', captureCanvasDimensions);
})();