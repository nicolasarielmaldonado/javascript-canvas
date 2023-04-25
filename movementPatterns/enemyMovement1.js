/**  @type {HTMLCanvasElement}*/

const canvas1 = document.getElementById("canvas1");
canvas1.width = CANVAS_WIDTH;
canvas1.height = CANVAS_HEIGHT;
const ctx1 = canvas1.getContext("2d");

let gameFrame1 = 0;
const enemiesArray1 = [];

class EnemyCirclingBird {
  constructor() {
    this.image = new Image();
    this.image.src = "enemies/enemy1.png";
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas1.width - this.width);
    this.y = Math.random() * (canvas1.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;

    //animate frames
    if (gameFrame1 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    //hitbox
    /*  ctx.strokeRect(this.x, this.y, this.width, this.height); */
    ctx1.drawImage(
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
  enemiesArray1.push(new EnemyCirclingBird());
}

let requestTime1;
let fps1;
function animate1(time) {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx1.fillText(fps1, 0, 10);

  enemiesArray1.forEach((element) => {
    element.update();
    element.draw();
  });

  gameFrame1++;

  //check fps
  if (requestTime1) {
    fps1 = Math.round(1000 / (performance.now() - requestTime1));
  }
  requestTime1 = time;
  requestAnimationFrame((timeRes) => animate1(timeRes));
}
animate1();
