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
        previousCoords = [{ x: null, y: null }];

    captureCanvasDimensions();

    // Function sets isDrawing to true
    function handleStart() {
        isDrawing = true;
    }

    // Function to stop drawing and reseting previousCoords
    function handleEnd() {
        isDrawing = false;
        previousCoords.forEach(item => {
            item.x = null;
            item.y = null;
        })
    }

    // Function checks the value of isDrawing() then sets x,y to match the cursor coordinates and calls draw(x, y)
    function handleMove(e) {
        // To prevent drawing on hover
        if (!isDrawing) {
            return;
        }

        const top = +window.getComputedStyle(canvas).getPropertyValue('top').slice(0, -2),
            left = +window.getComputedStyle(canvas).getPropertyValue('left').slice(0, -2);
        x = e.pageX - left;
        y = e.pageY - top;

        draw(x, y);
    }

    // Function to draw a line from previousCoords to newX, Y
    function draw(x, y) {
        // Destructuring  
        const { width, height } = canvas;

        previousCoords.forEach((coords, i) => {
            let newX, newY;

            if (i === 0) {
                newX = x;
                newY = y;
            } else if (i === 1) {
                newX = width - x;
                newY = y;
            } else if (i === 2) {
                newX = width - x;
                newY = height - y;
            } else {
                newX = x;
                newY = height - y;
            }

            if (!coords.x) {
                coords.x = newX;
                coords.y = newY;
            }
            // Draw a line from the previousCoords to the new x/y
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
            ctx.lineTo(newX, newY); // ctx.lineTo(x, y); = nice weird effect


            // Set the style of the line
            ctx.lineWidth = currentLineWidth;
            ctx.strokeStyle = currentColor;
            ctx.stroke();

            coords.x = newX;
            coords.y = newY;
        })
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

        if (currentPattern === 'normal') {
            previousCoords = [{ x: null, y: null }]
        } else if (currentPattern === 'mirrorMode') {
            previousCoords = [...previousCoords, { x: null, y: null }]
        } else if (currentPattern === 'quadrants') {
            previousCoords = [...previousCoords, { x: null, y: null }, { x: null, y: null }, { x: null, y: null }]
        }
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