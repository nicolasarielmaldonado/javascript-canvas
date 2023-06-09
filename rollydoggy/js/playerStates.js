import { Dust, Fire } from "./particles.js";

const STATES = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super("SITTING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("KeyA") || input.includes("KeyD")) {
      this.game.player.setState(STATES.RUNNING, 1);
    } else if (input.includes("Space")) {
      this.game.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(game) {
    super("RUNNING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }
  handleInput(input) {
    if (Math.random() < 0.45) {
      this.game.particles.push(
        new Dust(
          this.game,
          this.game.player.x + this.game.player.width * 0.4,
          this.game.player.y + this.game.player.height * 0.9
        )
      );
    }
    if (input.includes("KeyS")) {
      this.game.player.setState(STATES.SITTING, 0);
    } else if (input.includes("KeyW")) {
      this.game.player.setState(STATES.JUMPING, 1);
    } else if (input.includes("Space")) {
      this.game.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super("JUMPING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    if (this.game.player.onGround()) {
      this.game.player.vy -= 25;
    }
    this.game.player.frameY = 1;
  }
  handleInput(input) {
    if (this.game.player.vy > this.game.player.gravity) {
      this.game.player.setState(STATES.FALLING, 1);
    } else if (input.includes("Space")) {
      this.game.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Falling extends State {
  constructor(game) {
    super("FALLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(STATES.RUNNING, 1);
    } else if (!input.includes("Space") && !this.game.player.onGround()) {
      this.game.player.setState(STATES.FALLING, 1);
    }
  }
}

export class Rolling extends State {
  constructor(game) {
    super("ROLLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    if (Math.random() < 0.45) {
      this.game.particles.push(
        new Fire(
          this.game,
          this.game.player.x + this.game.player.width * 0.1,
          this.game.player.y + this.game.player.height * 0.1
        )
      );
    }

    if (!input.includes("Space") && this.game.player.onGround()) {
      this.game.player.setState(STATES.RUNNING, 1);
    } else if (!input.includes("Space") && !this.game.player.onGround()) {
      this.game.player.setState(STATES.FALLING, 1);
    }
  }
}
