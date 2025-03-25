let boxes = document.getElementsByClassName("box");
let turn = "X";
let start = false;
let gameOver = false;
let p1 = 0, p2 = 0;

let pp = document.querySelector(".player1");
let pe = document.querySelector(".player2");

let m = new Audio("img/ting.mp3");
let ss = new Audio("img/music.mp3");
let gg = new Audio("img/gameover.mp3");

let gc = document.querySelector(".gameCont");
let sg = document.querySelector("#startGame");

function addEventListeners() {
    Array.from(boxes).forEach((box) => {
        box.addEventListener("click", () => {
            if (!start || gameOver) return;
            let boxText = box.querySelector(".boxText");
            if (boxText.innerText === "") {
                m.play().catch(error => console.log("Audio play failed:", error));
                boxText.innerText = turn;
                if (checkWinner()) {
                    gameOver = true;
                    gg.play();
                    ss.pause();
                    gc.style.backgroundImage = "url('img/excited.gif')";
                } else {
                    turn = turn === "X" ? "O" : "X";
                    document.querySelector("#winnerText").innerText =`${ turn} turn`;
                }
                if (isBoardFull() && !gameOver) {
                    setTimeout(() => {
                        document.querySelectorAll(".boxText").forEach(box => box.innerText = "");
                        document.querySelector("#winnerText").innerText = "Game Draw! Restarted..."+`${turn} turn`;
                    }, 1000);
                }
            }
        });
    });
}

sg.addEventListener("click", () => {
    sg.style.backgroundColor = "red";
    gc.style.backgroundImage = "none";
    ss.currentTime = 0;
    ss.play();
    start = true;
    gameOver = false;
    document.querySelector("#winnerText").innerText = "Game Started!"+`${turn} turn`;
    document.querySelectorAll(".boxText").forEach(box => box.innerText = "");
    addEventListeners();
});

let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    let boxTexts = document.getElementsByClassName("boxText");

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (
            boxTexts[a].innerText !== "" &&
            boxTexts[a].innerText === boxTexts[b].innerText &&
            boxTexts[b].innerText === boxTexts[c].innerText
        ) {
            document.querySelector("#winnerText").innerText = boxTexts[a].innerText + " Won!";
            if (boxTexts[a].innerText === "X") {
                p1++;
                pp.innerText = p1;
            } else {
                p2++;
                pe.innerText = p2;
            }
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return [...document.getElementsByClassName("boxText")].every(box => box.innerText !== "");
}
