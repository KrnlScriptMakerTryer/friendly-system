// --- INITIAL DATA ---
const initialDares = [
    "Scream at the middle of the night or scream in public.",
    "Eat a spoonful of hot sauce!",
    "Try doing science expirements.",
    "Put 5 mentos in a big bottle of coca-cola and put it in your mouth and drink it.",
    "Your male friend has to try and do a split.",
    "Message your friend and say "I kinda have a crush on you.." and see how he reacts."
];

// Dares array that will be modified by the user input
let dares = [...initialDares]; 

// --- GET HTML ELEMENTS ---
const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('resultDisplay');
const newDareInput = document.getElementById('newDareInput');
const addDareButton = document.getElementById('addDareButton');

// --- HELPER FUNCTION: DRAW WHEEL SEGMENTS ---
// This function updates the visual wheel based on the current 'dares' array.
function drawWheel() {
    wheel.innerHTML = ''; // Clear existing segments
    const numDares = dares.length;
    const degreesPerDare = 360 / numDares;
    
    // Simple color palette for segments
    const colors = ['#f44336', '#ff9800', '#4CAF50', '#2196F3', '#9c27b0', '#ffc107', '#00bcd4', '#8bc34a'];

    dares.forEach((dare, index) => {
        const segment = document.createElement('div');
        segment.className = 'segment';
        
        // Cycle through the colors
        segment.style.backgroundColor = colors[index % colors.length]; 
        
        // Rotate the segment into position
        segment.style.transform = `rotate(${index * degreesPerDare}deg) skewY(-${90 - degreesPerDare}deg)`;
        
        // Apply counter-rotation to the text so it's readable
        const textElement = document.createElement('div');
        textElement.className = 'segment-text';
        textElement.textContent = dare;
        
        // The text needs to be rotated to be readable despite the skew
        textElement.style.transform = `skewY(${90 - degreesPerDare}deg) rotate(${degreesPerDare / 2}deg) translate(20px, 0)`;

        segment.appendChild(textElement);
        wheel.appendChild(segment);
    });
}

// --- ADD DARE LOGIC ---
addDareButton.addEventListener('click', () => {
    const newDareText = newDareInput.value.trim();
    
    if (newDareText) {
        // 1. Add the new dare
        dares.push(newDareText);
        
        // 2. Redraw the wheel to include the new segment
        drawWheel(); 
        
        // 3. Clear the input
        newDareInput.value = '';
        
        resultDisplay.textContent = `Dare added! The wheel now has ${dares.length} options.`;
    } else {
        resultDisplay.textContent = "Please enter a dare before adding it!";
    }
});

// --- SPIN LOGIC ---
spinButton.addEventListener('click', () => {
    // Disable button to prevent re-spinning
    spinButton.disabled = true;
    resultDisplay.textContent = "Spinning...";

    // Recalculate dimensions based on current dares
    const numDares = dares.length;
    const degreesPerDare = 360 / numDares;

    // 1. Pick a random dare index
    const randomIndex = Math.floor(Math.random() * numDares);
    const selectedDare = dares[randomIndex];

    /* 2. Calculate the target rotation (in degrees)
       - (360 * 5) ensures the wheel spins multiple times for drama.
       - The rest calculates the angle needed to land the pointer on the center of the selected segment.
    */
    let targetRotation = (360 * 5) + (360 - (randomIndex * degreesPerDare) - (degreesPerDare / 2));
    
    // Add a small random offset for a less predictable feel
    targetRotation += Math.random() * (degreesPerDare * 0.8) - (degreesPerDare * 0.4);

    // 3. Apply the rotation and trigger the spin animation
    wheel.style.transition = 'all 5s cubic-bezier(0.2, 0.8, 0.7, 1.0)'; // Custom easing for a natural slow-down
    wheel.style.transform = `rotate(${targetRotation}deg)`;

    // 4. Display the result after the spin is complete
    setTimeout(() => {
        resultDisplay.textContent = `DARE: ${selectedDare}`;
        spinButton.disabled = false;
        
        // Clear the transition property for the next spin's setup
        wheel.style.transition = 'none'; 
        
        // Set the final transform so the next spin starts from the correct position
        // This prevents the wheel from 'jumping' back to 0 degrees.
        wheel.style.transform = `rotate(${targetRotation % 360}deg)`; 
    }, 5100); // Wait slightly longer than the 5-second spin duration
});

// Initialize the wheel drawing when the page loads
drawWheel();
          
