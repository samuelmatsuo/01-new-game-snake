const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const snakeSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = snakeSize;
let dy = 0;
let score = 0;
let game;
let gameSpeed = 100; // Velocidade inicial do jogo

function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = '#008000';
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

function drawFood() {
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    createFood();
    if (score % 5 === 0) {
      gameSpeed -= 10; // Acelera o jogo a cada 5 pontos
      clearInterval(game);
      game = setInterval(gameLoop, gameSpeed);
    }
  } else {
    snake.pop();
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    gameOver();
  }
}

function resetGame() {
  clearInterval(game);
  snake = [{ x: 200, y: 200 }];
  dx = snakeSize;
  dy = 0;
  score = 0;
  gameSpeed = 100; // Reiniciando a velocidade do jogo
  createFood();
  game = setInterval(gameLoop, gameSpeed);
  updateScore(); // Atualiza a pontuação para zero ao reiniciar o jogo
}

function gameOver() {
  clearInterval(game);
  const gameOverContainer = document.getElementById('gameOverContainer');
  gameOverContainer.style.display = 'block';

  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', resetGame);
  
  score = 0; // Reinicia a pontuação ao fim do jogo (game over)
  updateScore(); // Atualiza a pontuação para zero ao fim do jogo
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

function showStartMessage() {
  const startMessage = document.getElementById('startMessage');
  startMessage.style.display = 'block';
  canvas.style.display = 'none';
  startMessage.addEventListener('click', startGame);
}

function updateScore() {
  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.textContent = `Pontuação: ${score}`;
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore(); // Atualiza a pontuação
    createFood();
    if (score % 5 === 0) {
      gameSpeed -= 10; // Acelera o jogo a cada 5 pontos
      clearInterval(game);
      game = setInterval(gameLoop, gameSpeed);
    }
  } else {
    snake.pop();
  }
}

function startGame() {
  const startMessage = document.getElementById('startMessage');
  startMessage.style.display = 'none';
  canvas.style.display = 'block';
  createFood();
  game = setInterval(gameLoop, gameSpeed);
}

showStartMessage();


document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && dy !== snakeSize) {
    dx = 0;
    dy = -snakeSize;
  } else if (event.key === 'ArrowDown' && dy !== -snakeSize) {
    dx = 0;
    dy = snakeSize;
  } else if (event.key === 'ArrowLeft' && dx !== snakeSize) {
    dx = -snakeSize;
    dy = 0;
  } else if (event.key === 'ArrowRight' && dx !== -snakeSize) {
    dx = snakeSize;
    dy = 0;
  }
});
