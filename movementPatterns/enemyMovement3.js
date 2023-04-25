/**  @type {HTMLCanvasElement}*/

const canvas3 = document.getElementById("canvas3");
canvas3.width = CANVAS_WIDTH;
canvas3.height = CANVAS_HEIGHT;
const ctx3 = canvas3.getContext("2d");

let gameFrame3 = 0;
const enemiesArray3 = [];

class EnemyFatBird {
  constructor() {
    this.image = new Image();
    this.image.src = "enemies/enemy3.png";
    this.speed = Math.random() * 2 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas3.width - this.width);
    this.y = Math.random() * (canvas3.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2 + 0.1;
    this.curve = Math.random() * 200 + 50;
  }

  update() {
    this.x =
      (canvas3.width / 2) * Math.sin((this.angle * Math.PI) / 50) +
      (canvas3.width / 2 - this.width / 2);
    this.angle += this.angleSpeed;

    this.y =
      (canvas3.height / 2) * Math.cos((this.angle * Math.PI) / 180) +
      (canvas3.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;

    /*  this.x -= this.speed; */

    // wave movement
    /*    this.y += this.curve * Math.sin(this.angle);
     */

    //move again to end of canvas
    if (this.x + this.width < 0) {
      this.x = canvas3.width;
    }

    //animate frames
    if (gameFrame3 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    //hitbox
    /*  ctx.strokeRect(this.x, this.y, this.width, this.height); */
    ctx3.drawImage(
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
  enemiesArray3.push(new EnemyFatBird());
}

let requestTime3;
let fps3;

function animate3(time) {
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx3.fillText(fps3, 0, 10);

  enemiesArray3.forEach((element) => {
    element.update();
    element.draw();
  });

  gameFrame3++;

  //check fps
  if (requestTime3) {
    fps3 = Math.round(1000 / (performance.now() - requestTime3));
  }
  requestTime3 = time;
  requestAnimationFrame((timeRes) => animate3(timeRes));
}
animate3();
