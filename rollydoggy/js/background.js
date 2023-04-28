class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0;
    } else {
      this.x -= this.game.gameSpeed * this.speedModifier;
    }
    this.x = Math.floor(this.x - this.game.gameSpeed);
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 2400;
    this.height = 720;
    this.layer5image = document.getElementById("layer5");
    this.layer4image = document.getElementById("layer4");
    this.layer3image = document.getElementById("layer3");
    this.layer2image = document.getElementById("layer2");
    this.layer1image = document.getElementById("layer1");
    this.backdrop = new Layer(
      game,
      this.width,
      this.height,
      0.0,
      this.layer1image
    );
    this.backgroundBuildings = new Layer(
      game,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.clouds = new Layer(
      game,
      this.width,
      this.height,
      0.1,
      this.layer3image
    );
    this.foregroundBuildings = new Layer(
      game,
      this.width,
      this.height,
      0.7,
      this.layer4image
    );
    this.ground = new Layer(game, this.width, this.height, 1, this.layer5image);
    this.backgroundLayers = [
      this.backdrop,
      this.backgroundBuildings,
      this.clouds,
      this.foregroundBuildings,
      this.ground,
    ];
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
