// JavaScript code for the kitty

const heading = document.getElementById('color-changing-heading');
let index = 0;
let isHovered = false;
let hoverStartTime = null;
let purrSound = null;
let lastClickTime = 0;
const clickDelay = 1000; // Delay in milliseconds between each click

function changeHeadingColor() {
  const colors = ['#E8F6EF', '#D5F5E3', '#C5E1A5', '#FFE0B2', '#FFCCBC', '#FFAB91']; // Calm and soothing colors

  heading.style.color = colors[index]; // Set the initial color of the heading
  heading.style.transition = 'color 4.0s'; // Add a transition effect to the color change

  index = (index + 1) % colors.length; // Use modulo operator to reset the index

  setTimeout(changeHeadingColor, 1000); // Call the function recursively after 1 second
}

changeHeadingColor(); // Call the function to start the color-changing loop

// Function to play meow sound when header is clicked
function playMeowSound() {
  const currentTime = Date.now();
  if (currentTime - lastClickTime >= clickDelay) {
    const meowSound = new Audio('Files/SFX/meow.mp3'); // Create an audio element for the meow sound
    meowSound.play(); // Play the meow sound
    lastClickTime = currentTime; // Update the last click time
  }
}

// Event listener to play meow sound when header is clicked
heading.addEventListener('click', playMeowSound);

// Function to create and play the purr sound
function createAndPlayPurrSound() {
  purrSound = new Audio('Files/SFX/purr.mp3'); // Create an audio element for the purr sound
  purrSound.loop = true; // Set the purr sound to play in a loop
  purrSound.play(); // Play the purr sound
}

// Function to stop and reset the purr sound
function stopAndResetPurrSound() {
  if (purrSound) {
    purrSound.pause(); // Pause the purr sound
    purrSound.currentTime = 0; // Reset the playback position to the beginning
    purrSound = null; // Reset the purr sound variable
  }
}

// Event listener to start the purr sound when the header is hovered over for 1.5 seconds
heading.addEventListener('mouseenter', () => {
  if (!isHovered) {
    hoverStartTime = Date.now(); // Record the start time of the hover
    isHovered = true;
    
    heading.style.cursor = 'grab';

    setTimeout(() => {
      const hoverDuration = Date.now() - hoverStartTime;
      if (isHovered && hoverDuration >= 1500) {
        createAndPlayPurrSound(); // Play the purr sound if the hover duration is longer than 1.5 seconds
      }
    }, 1500);
  }
});

// Event listener to stop and reset the purr sound when the header is no longer hovered
heading.addEventListener('mouseleave', () => {
  if (isHovered) {
    isHovered = false;
    stopAndResetPurrSound();
    heading.style.cursor = 'default'; // Reset the cursor to the default style
  }
});

// Event listener to set userInteracted flag when the user interacts with the document
document.addEventListener('click', () => {
  userInteracted = true;
});