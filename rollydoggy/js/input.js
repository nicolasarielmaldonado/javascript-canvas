export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.code === "KeyS" ||
          e.code === "KeyW" ||
          e.code === "KeyA" ||
          e.code === "KeyD" ||
          e.code === "Enter") &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code);
      } else if (e.code === "KeyE") {
        this.game.debug = !this.game.debug;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.code === "KeyS" ||
        e.code === "KeyW" ||
        e.code === "KeyA" ||
        e.code === "KeyD" ||
        e.code === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });
  }
}
