document.getElementById('playMusicBtn').addEventListener('click', function() {
    // Play the background music
    const music = document.getElementById('backgroundMusic');
    music.play();

    // Hide the "Play" button
    document.getElementById('playMusicBtn').style.display = 'none';
    

    // Show the question and buttons
    document.querySelector('.question-container').style.display = 'block';

    // Initialize the heart particle animation
    initHeartParticles();
    showEmojis();
});

document.getElementById('yesBtn').addEventListener('click', function() {
    alert("Congratulations! You are now Tanushree's Property ❤️");
});

const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.buttons');

// Function to move the "No" button to a random position within the container
function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new position
    const offsetX = Math.random() * (containerRect.width - btnRect.width);
    const offsetY = Math.random() * (containerRect.height - btnRect.height);

    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${offsetX}px`;
    noBtn.style.top = `${offsetY}px`;
}
noBtn.addEventListener('click', function() {
    alert("You can't say no! bcz ur only mine 😊");
    moveNoButton(); // Move the "No" button after it is clicked
});

// Event listeners for both mouse and touch interactions
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevents the default touch behavior
    moveNoButton();
});

function initHeartParticles() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    function createHeartParticle(x, y) {
        const size = Math.random() * 40 + 20; // Increased the size range
        const speed = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        return { x, y, size, speed, angle };
    }

    function drawHeart(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size, size); // Scaling the heart shape to make it bigger
        ctx.beginPath();
        ctx.moveTo(0, -5); // Adjusted for bigger heart
        ctx.bezierCurveTo(2.5, -7, 5, -3, 0, 5); // Adjusted control points
        ctx.bezierCurveTo(-5, -3, -2.5, -7, 0, -5); // Adjusted control points
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.size *= 0.98; // Shrink the particle over time
            drawHeart(p.x, p.y, p.size / 40); // Adjust size for drawing
            if (p.size < 0.5) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(updateParticles);
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(createHeartParticle(canvas.width / 2, canvas.height / 2));
    }

    updateParticles();
}
function showEmojis() {
    const emojiContainer = document.getElementById('emojiContainer');
    const emojis = ['❤️', '😍', '😘', '💖', '💌', '💋', '🌹']; // Array of loving emojis

    for (let i = 0; i < 10; i++) {
        const emojiElement = document.createElement('div');
        emojiElement.classList.add('emoji');
        emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        emojiContainer.appendChild(emojiElement);
    }
}