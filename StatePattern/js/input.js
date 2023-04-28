export default class InputHandler {
  constructor() {
    this.lastKey = "";

    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          this.lastKey = "PRESS left";
          break;

        case "ArrowRight":
        case "d":
        case "D":
          this.lastKey = "PRESS right";
          break;

        case "ArrowDown":
        case "s":
        case "S":
          this.lastKey = "PRESS down";
          break;

        case "ArrowUp":
        case "w":
        case "W":
          this.lastKey = "PRESS up";
          break;

        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          this.lastKey = "RELEASE left";
          break;

        case "ArrowRight":
        case "d":
        case "D":
          this.lastKey = "RELEASE right";
          break;

        case "ArrowDown":
        case "s":
        case "S":
          this.lastKey = "RELEASE down";
          break;

        case "ArrowUp":
        case "w":
        case "W":
          this.lastKey = "RELEASE up";
          break;

        default:
          break;
      }
    });
  }
}
