//your JS code here. If required.

const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

playerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name1 = document.getElementById("player-1").value.trim();
    const name2 = document.getElementById("player-2").value.trim();

    if (!name1 || !name2) {
        return;
    }

    players = [
        { name: name1, symbol: "x" },
        { name: name2, symbol: "o" }
    ];

    playerForm.hidden = true;
    game.hidden = false;

    startGame();
});

function startGame() {
    board = Array(9).fill("");
    currentPlayer = 0;
    gameOver = false;

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.style.color = "";
    });

    message.textContent = players[0].name + ", you're up";
}

cells.forEach(function(cell, index) {
    cell.addEventListener("click", function() {
        if (gameOver || board[index] !== "") {
            return;
        }

        const player = players[currentPlayer];

        board[index] = player.symbol;
        cell.textContent = player.symbol;

        const hasWon = winningCombinations.some(function(combination) {
            return combination.every(function(position) {
                return board[position] === player.symbol;
            });
        });

        if (hasWon) {
            message.textContent =
                player.name + " congratulations you won!";
            gameOver = true;
            return;
        }

        if (board.every(function(value) {
            return value !== "";
        })) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;

        message.textContent =
            players[currentPlayer].name + ", you're up";
    });
});

restartButton.addEventListener("click", startGame);
