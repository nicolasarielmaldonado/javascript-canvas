export class InputHandler {
  constructor() {
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
