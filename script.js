const emojis = [
    '🍎', '🍌', '🍇', '🍉', '🍒', '🍍', 
    '🍋', '🍑', '🥭', '🍓', '🥝', '🍈', 
    '🍎', '🍌', '🍇', '🍉', '🍒', '🍍', 
    '🍋', '🍑', '🥭', '🍓', '🥝', '🍈'
]; // เพิ่มจำนวนอิโมจิเป็น 12 คู่ (24 แผ่นป้าย)

let shuffledEmojis = [];
let flippedTiles = [];
let matchedTiles = [];

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    shuffledEmojis = shuffle([...emojis]);
    shuffledEmojis.forEach((emoji, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = index;
        tile.addEventListener('click', flipTile);
        board.appendChild(tile);
    });
}

function flipTile() {
    if (flippedTiles.length === 2) return;
    const tile = this;
    const index = tile.dataset.index;

    if (!tile.classList.contains('flipped')) {
        tile.classList.add('flipped');
        tile.textContent = shuffledEmojis[index];
        flippedTiles.push(tile);

        if (flippedTiles.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [tile1, tile2] = flippedTiles;
    const emoji1 = shuffledEmojis[tile1.dataset.index];
    const emoji2 = shuffledEmojis[tile2.dataset.index];

    if (emoji1 === emoji2) {
        tile1.style.backgroundColor = '#90EE90'; // สีเขียวแสดงว่าแมตช์
        tile2.style.backgroundColor = '#90EE90';
        matchedTiles.push(tile1, tile2);
    } else {
        tile1.classList.remove('flipped');
        tile2.classList.remove('flipped');
        tile1.textContent = '';
        tile2.textContent = '';
    }

    flippedTiles = [];

    if (matchedTiles.length === emojis.length) {
        setTimeout(() => {
            alert('คุณชนะเกมแล้ว!');
            resetGame();
        }, 500);
    }
}

function resetGame() {
    flippedTiles = [];
    matchedTiles = [];
    createBoard();
}

document.getElementById('reset-btn').addEventListener('click', resetGame);

// เริ่มเกมตอนโหลดหน้า
window.onload = createBoard;
