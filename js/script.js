let caseBoard = document.getElementsByClassName("game-item"),
    reset = document.getElementById("reset-game"),
    message = document.getElementById("message"),
    counter = 0,
    combosGagnant = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ],
    arrayX = [],
    arrayO = [];

class Player {

    constructor(name) {
        this.name = name;
    }
}


class Game {

    constructor() {
        this.playerX = new Player("X");
        this.currentPlayer = this.playerX.name;

        console.log(this.currentPlayer);
    }

    addPlayerX() {
        this.boundCurrentStep = this.currentStep.bind(this);
        for (let i = 0; i < caseBoard.length; i++) {
            caseBoard[i].addEventListener("click", this.boundCurrentStep);
        }
    }

    changePlayer() {
        this.currentPlayer === 'X' ? (this.currentPlayer = "O") : (this.currentPlayer = "X");
    }


    checkWin(arr, number) {

        for (let win = 0, winLenght = combosGagnant.length; win < winLenght; win++) {
            let someWinArr = combosGagnant[win],
                count = 0;
            if (someWinArr.indexOf(number) !== -1) {
                for (let k = 0, kLen = someWinArr.length; k < kLen; k++) {
                    if (arr.indexOf(someWinArr[k]) !== -1) {
                        count++;
                        if (count === 3) {
                            return true;
                        }
                    }
                }
                count = 0;
            }
        }
    }
    currentStep(ClickEvent) {
        let num = + ClickEvent.target.getAttribute("data-case");
        if (!ClickEvent.target.textContent) {
            ClickEvent.target.innerText = this.currentPlayer;

            this.currentPlayer === "X" ?
                arrayX.push(num) && ClickEvent.target.classList.add("X") :
                arrayO.push(num) && ClickEvent.target.classList.add("O");
            if (
                (arrayO.length > 2 || arrayX.length > 2) &&
                (this.checkWin(arrayO, num) || this.checkWin(arrayX, num))
            ) {
                for (let i = 0; i < caseBoard.length; i++) {
                    caseBoard[i].removeEventListener("click", this.boundCurrentStep);
                }
                return (message.innerText = alert("Le gagant est le joueur " + this.currentPlayer));
            }

            this.changePlayer();
            counter++;
            (counter === 9) ? (message.innerText = alert('Match Null !')) : (message.innerText = 'Tour du joueur ' + this.currentPlayer);
        }
    }
    resetGame() {
        reset.addEventListener("click", function() {
            for (let i = 0; i < caseBoard.length; i++) {
                caseBoard[i].innerText = "";
            }
            arrayO = [];
            arrayX = [];
            this.currentPlayer = "X";
            counter = 0;
            message.innerText = "Le joueur  " + this.currentPlayer + " commence";
            for (let i = 0; i < caseBoard.length; i++) {
                caseBoard[i].classList.remove("X", "O");
                caseBoard[i].addEventListener("click", this.boundCurrentStep);
            }
        }.bind(this));
    }
}

const game = new Game();
game.addPlayerX();
game.resetGame();