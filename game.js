// ===== Memory Game Logic =====

const emojis = ['🚀', '📚', '🎓', '💡', '🔬', '📐', '🖥️', '🎯'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameTimer = null;
let seconds = 0;
let isLocked = false;

// Initialize game
function initGame() {
    createCards();
    renderCards();
    startTimer();
}

// Create cards
function createCards() {
    const cardPairs = [...emojis, ...emojis];
    cards = cardPairs
        .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }))
        .sort(() => Math.random() - 0.5);
}

// Render cards
function renderCards() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = cards.map((card, index) => `
        <div class="card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}" 
             data-index="${index}" 
             onclick="flipCard(${index})">
            <div class="card-inner">
                <div class="card-front">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <div class="card-back">
                    <span class="card-emoji">${card.emoji}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Flip card
function flipCard(index) {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedCards.length >= 2) return;
    
    cards[index].isFlipped = true;
    flippedCards.push(index);
    renderCards();
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('movesCount').textContent = moves;
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    isLocked = true;
    const [first, second] = flippedCards;
    
    if (cards[first].emoji === cards[second].emoji) {
        cards[first].isMatched = true;
        cards[second].isMatched = true;
        matchedPairs++;
        document.getElementById('matchesCount').textContent = `${matchedPairs}/8`;
        
        flippedCards = [];
        isLocked = false;
        renderCards();
        
        if (matchedPairs === 8) {
            endGame();
        }
    } else {
        setTimeout(() => {
            cards[first].isFlipped = false;
            cards[second].isFlipped = false;
            flippedCards = [];
            isLocked = false;
            renderCards();
        }, 1000);
    }
}

// Start timer
function startTimer() {
    seconds = 0;
    updateTimerDisplay();
    gameTimer = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('gameTimer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

// End game
function endGame() {
    clearInterval(gameTimer);
    
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('winModal').classList.add('active');
}

// Reset game
function resetGame() {
    clearInterval(gameTimer);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    isLocked = false;
    document.getElementById('movesCount').textContent = moves;
    document.getElementById('matchesCount').textContent = `${matchedPairs}/8`;
    document.getElementById('winModal').classList.remove('active');
    initGame();
}