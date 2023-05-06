// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const image = document.querySelector('img');
  const audio = document.querySelector(".hidden");

  // Get a reference to the select element
  const select = document.querySelector('#horn-select');

  // Listen for changes on the select element
  select.addEventListener('input', () => {
    // Get the value of the selected option
    const selectedHorn = select.value;

    // Update the image source based on the selected option
    switch (selectedHorn) {
      case 'air-horn':
        image.src = 'assets/images/air-horn.svg';
        audio.src = 'assets/audio/air-horn.mp3';
        break;
      case 'car-horn':
        image.src = 'assets/images/car-horn.svg';
        audio.src = 'assets/audio/car-horn.mp3';
        break;
      case 'party-horn':
        image.src = 'assets/images/party-horn.svg';
        audio.src = 'assets/audio/party-horn.mp3';
        break;
      default:
        image.src = 'assets/images/no-image.png';
        break;
    }
  });

  const volumeCtrl = document.getElementById("volume-controls");
  volumeCtrl.addEventListener('change', () => {
    const volume = document.getElementById("volume");
    volume.addEventListener('input', () => {
      const volImg = volumeCtrl.querySelector("img");
      if (volume.value == 0) {
        volImg.src = 'assets/icons/volume-level-0.svg';
      } else if (volume.value >= 1 && volume.value <= 32) {
        volImg.src = 'assets/icons/volume-level-1.svg';
      } else if (volume.value >= 33 && volume.value <= 66) {
        volImg.src = 'assets/icons/volume-level-2.svg';
      } else {
        volImg.src = 'assets/icons/volume-level-3.svg';
      }
    });

    const volumeLevel = volume.value / 100;
    audio.volume = volumeLevel;
  });

  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    // Play the audio when the button is clicked
    // audio.src = document.querySelector("#horn-select").value + ".mp3";
    audio.play();
    if (select.value == 'party-horn') {
      const jsConfetti = new JSConfetti();
      // const confetti = document.querySelector("button");
      jsConfetti.addConfetti();
    }
  });
};