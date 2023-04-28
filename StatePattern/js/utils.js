export function drawStatusText(context, input, player, fps) {
  context.font = "28px Helvetica";
  context.fillStyle = "#FFF";
  context.fillText("Last input: " + input.lastKey, 20, 50);
  context.fillText("Active state: " + player.currentState.state, 20, 90);
  context.fillText("FPS: " + fps, 20, 130);
}
