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
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 4;
    this.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("KeyA") || input.includes("KeyD")) {
      this.player.setState(STATES.RUNNING, 1);
    } else if (input.includes("Space")) {
      this.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 8;
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (input.includes("KeyS")) {
      this.player.setState(STATES.SITTING, 0);
    } else if (input.includes("KeyW")) {
      this.player.setState(STATES.JUMPING, 1);
    } else if (input.includes("Space")) {
      this.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    if (this.player.onGround()) {
      this.player.vy -= 25;
    }
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (this.player.vy > this.player.gravity) {
      this.player.setState(STATES.FALLING, 1);
    } else if (input.includes("Space")) {
      this.player.setState(STATES.ROLLING, 2);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(STATES.RUNNING, 1);
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
  }
  handleInput(input) {
    if (!input.includes("Space") && this.player.onGround()) {
      this.player.setState(STATES.RUNNING, 1);
    } else if (!input.includes("Space") && !this.player.onGround()) {
      this.player.setState(STATES.FALLING, 1);
    }
  }
}
