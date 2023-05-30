export function enterFullScreen(element) {
  if (element?.requestFullscreen) {
    element.requestFullscreen();
  } else if (element?.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element?.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element?.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}

export function exitFullscreen() {
  if (document?.exitFullscreen) {
    document?.exitFullscreen();
  } else if (document?.mozCancelFullScreen) {
    document?.mozCancelFullScreen();
  } else if (document?.webkitExitFullscreen) {
    document?.webkitExitFullscreen();
  }
}
