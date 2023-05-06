// explore.js

window.addEventListener('DOMContentLoaded', init);

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voice-select").appendChild(option);
  }
}

// function readingText() {
//   const text = document.querySelector('#text-to-speak');
//   const utterance = new SpeechSynthesisUtterance(text.value);
//   const voices = document.querySelector('#voice-select');
//   const selectedVoice = voices.selectedOptions[0].getAttribute('data-name');
//   utterance.voice = speechSynthesis.getVoices().find((voice) => voice.name === selectedVoice);
//   window.speechSynthesis.speak(utterance);
// }

function init() {
  populateVoiceList();
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  } 

  const speak = document.querySelector("button");
  speak.addEventListener('click', () => {
    const text = document.querySelector('#text-to-speak');
    const utterance = new SpeechSynthesisUtterance(text.value);
    const voices = document.querySelector('#voice-select');
    const selectedVoice = voices.selectedOptions[0].getAttribute('data-name');
    utterance.voice = speechSynthesis.getVoices().find((voice) => voice.name === selectedVoice);
    window.speechSynthesis.speak(utterance);

    const image = document.querySelector('img');
    utterance.addEventListener('start', () => {
      image.src = 'assets/images/smiling-open.png';
    });
    utterance.addEventListener('end', () => {
      image.src = 'assets/images/smiling.png';
    });
  });
  
}