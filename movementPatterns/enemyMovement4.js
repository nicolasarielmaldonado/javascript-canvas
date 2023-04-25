/**  @type {HTMLCanvasElement}*/

const canvas4 = document.getElementById("canvas4");
canvas4.width = CANVAS_WIDTH;
canvas4.height = CANVAS_HEIGHT;
const ctx4 = canvas4.getContext("2d");

let gameFrame4 = 0;
const enemiesArray4 = [];

class EnemySaw {
  constructor() {
    this.image = new Image();
    this.image.src = "enemies/enemy4.png";
    this.speed = Math.random() * 2 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas4.width - this.width);
    this.y = Math.random() * (canvas4.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.newX = Math.random() * (canvas4.width - this.width);
    this.newY = Math.random() * (canvas4.height - this.height);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    if (gameFrame4 % this.interval === 0) {
      this.newX = Math.random() * (canvas4.width - this.width);
      this.newY = Math.random() * (canvas4.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx / 70;
    this.y -= dy / 70;

    //move again to end of canvas
    if (this.x + this.width < 0) {
      this.x = canvas4.width;
    }

    //animate frames
    if (gameFrame4 % this.flapSpeed === 0) {
      this.frame > 7 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    //hitbox
    /*  ctx.strokeRect(this.x, this.y, this.width, this.height); */
    ctx4.drawImage(
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
  enemiesArray4.push(new EnemySaw());
}

let requestTime4;
let fps4;

function animate4(time) {
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx4.fillText(fps4, 0, 10);

  enemiesArray4.forEach((element) => {
    element.update();
    element.draw();
  });

  gameFrame4++;

  //check fps
  if (requestTime4) {
    fps4 = Math.round(1000 / (performance.now() - requestTime4));
  }
  requestTime4 = time;
  requestAnimationFrame((timeRes) => animate4(timeRes));
}
animate4();
