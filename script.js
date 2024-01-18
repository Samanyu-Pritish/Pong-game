const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 60;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Ball properties
const ballSize = 18;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

// Scores
let leftScore = 0;
let rightScore = 0;

// Update function
function update() {
    // Move right paddle
    if (rightPaddleY + paddleHeight / 2 < ballY - paddleHeight / 4) {
        rightPaddleY += 5;
    } else if (rightPaddleY + paddleHeight / 2 > ballY + paddleHeight / 4) {
        rightPaddleY -= 5;
    }

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom walls
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce off paddles
    if (
        (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX > canvas.width - paddleWidth - ballSize && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball position if it goes off the sides
    if (ballX < 0) {
        rightScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        leftScore++;
        resetBall();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawPaddle(0, leftPaddleY, paddleWidth, paddleHeight);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw the ball
    drawBall(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

    // Draw scores
    drawScores();

    // Request the next animation frame
    requestAnimationFrame(update);
}

// Function to draw a paddle
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);
}

// Function to draw the ball
function drawBall(x, y, width, height) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);
}

// Function to draw scores
function drawScores() {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText(leftScore.toString(), canvas.width / 4, 30);
    ctx.fillText(rightScore.toString(), (3 * canvas.width) / 4, 30);
}

// Function to reset the ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction on reset
}

// Event listener for mouse movement to control left paddle
canvas.addEventListener("mousemove", (e) => {
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    leftPaddleY = mouseY - paddleHeight / 2;
});

// Start the game loop
update();
