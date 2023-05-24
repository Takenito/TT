const clickSound = new Audio('Files/SFX/click-sound.mp3'); // Create an audio element for the click sound
const copySound = new Audio('Files/SFX/copy-sound.mp3'); // Create an audio element for the copy sound

function generateLanguage() {
  const outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = "";

  const getCheckedValues = (name) =>
    Array.from(document.querySelectorAll(`input[name='${name}']:checked`)).map(checkbox => checkbox.value);

  const selectedLanguages = getCheckedValues("language");
  const selectedWords = getCheckedValues("word");

  if (selectedLanguages.length === 0 || selectedWords.length === 0) {
    outputContainer.style.display = "none"; // Hide the output container if no languages or words are selected
    return;
  }

  outputContainer.style.display = "block"; // Show the output container if languages and words are selected

const createListItem = (value, index) => {
  const listItem = document.createElement("li");
  if (index > 0) {
    listItem.textContent = `<li>&bull; ${value}</li>`;
  } else {
    listItem.textContent = value;
  }
  return listItem;
};

  selectedLanguages.forEach(language => {
    const languageBox = document.createElement("div");
    languageBox.classList.add("language-box");

    const languageHeading = document.createElement("h3");
    languageHeading.textContent = language;
    languageBox.appendChild(languageHeading);

    const wordList = document.createElement("ul");
    wordList.classList.add("word-list");

selectedWords.forEach((word, index) => {
  const wordValue = word_library[language][word];
  const listItem = createListItem(wordValue, index);
  wordList.appendChild(listItem);
});

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy!";
    copyButton.classList.add("copy-button");
    copyButton.addEventListener("click", function () {
      const textToCopy = Array.from(wordList.querySelectorAll("li")).map(li => li.textContent).join("\n");
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          copySound.play(); // Play the copy sound effect      
        
          copyButton.textContent = "Copied!";
          setTimeout(() => {
            copyButton.textContent = "Copy!";
            // Remove the language query after 2 seconds
            languageBox.remove();
          }, 250);
        })
        .catch(error => {
          console.error("Unable to copy text: ", error);
        });
    });

    languageBox.appendChild(wordList);
    languageBox.appendChild(copyButton);
    outputContainer.appendChild(languageBox);
  });

  clickSound.play(); // Play the click sound effect
}

document.addEventListener("DOMContentLoaded", function() {
  const generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", generateLanguage);
  
  const toggleIframeBtn = document.getElementById("toggle-iframe-btn");
  const cosmicIframe = document.getElementById("cosmic-iframe");

  toggleIframeBtn.addEventListener("click", function() {
    cosmicIframe.style.display = cosmicIframe.style.display === "none" ? "block" : "none";
  });
});
