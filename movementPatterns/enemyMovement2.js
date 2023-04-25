/**  @type {HTMLCanvasElement}*/

const canvas2 = document.getElementById("canvas2");
canvas2.width = CANVAS_WIDTH;
canvas2.height = CANVAS_HEIGHT;
const ctx2 = canvas2.getContext("2d");

let gameFrame2 = 0;
const enemiesArray2 = [];

class EnemyHorizontalBird {
  constructor() {
    this.image = new Image();
    this.image.src = "enemies/enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas2.width - this.width);
    this.y = Math.random() * (canvas2.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 5;
  }

  update() {
    this.x -= this.speed;

    // wave movement
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    //move again to end of canvas
    if (this.x + this.width < 0) {
      this.x = canvas2.width;
    }

    //animate frames
    if (gameFrame2 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    //hitbox
    /*  ctx.strokeRect(this.x, this.y, this.width, this.height); */
    ctx2.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray2.push(new EnemyHorizontalBird());
}

let requestTime2;
let fps2;

function animate2(time) {
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.fillText(fps2, 0, 10);

  enemiesArray2.forEach((element) => {
    element.update();
    element.draw();
  });

  gameFrame2++;

  //check fps
  if (requestTime2) {
    fps2 = Math.round(1000 / (performance.now() - requestTime2));
  }
  requestTime2 = time;
  requestAnimationFrame((timeRes) => animate2(timeRes));
}
animate2();
