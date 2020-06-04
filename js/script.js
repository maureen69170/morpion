class Player {

    constructor(name) {
        this.name = name;
    }

}


class Game {

    constructor() {
        this.caseBoard = document.getElementsByClassName("game-item")
        this.reset = document.getElementById("reset-game");
        this.message = document.getElementById("message");
        this.counter = 0;
        this.combosGagnant = [
            [1, 2, 3],
            [1, 4, 7],
            [1, 5, 9],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [4, 5, 6],
            [7, 8, 9]
        ];
        this.arrayX = [];
        this.arrayO = [];
        this.playerX = new Player("X");
        this.playerO = new Player("O");
        this.currentPlayer = this.playerX.name || this.playerO.name;

        //propriétés pour le compteur
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.timer = document.querySelector('.timer');
        this.timer.innerHTML = "0:0";
        this.interval;

        //propriétés pour le compteur
        this.moves = 0;
        this.counterCount = document.querySelector('.nbMoves');

        console.log(this.currentPlayer);
    }

    /*randomPlayer(){
        return Math.random()
    }*/


    addPlayerX() {

        this.boundCurrentStep = this.currentStep.bind(this);
        for (let i = 0; i < this.caseBoard.length; i++) {
            this.caseBoard[i].addEventListener("click", this.boundCurrentStep);

        }
    }

    changePlayer() {
        this.currentPlayer === 'X' ? (this.currentPlayer = "O") : (this.currentPlayer = "X");
    }


    checkWin(arr, number) {

        for (let win = 0, winLenght = this.combosGagnant.length; win < winLenght; win++) {
            let someWinArr = this.combosGagnant[win],
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
            this.startCounter();
            ClickEvent.target.innerText = this.currentPlayer;

            this.currentPlayer === "X" ?
                this.arrayX.push(num) && ClickEvent.target.classList.add("X") :
                this.arrayO.push(num) && ClickEvent.target.classList.add("O");
            if (
                (this.arrayO.length > 2 || this.arrayX.length > 2) &&
                (this.checkWin(this.arrayO, num) || this.checkWin(this.arrayX, num))
            ) {
                for (let i = 0; i < this.caseBoard.length; i++) {
                    this.caseBoard[i].removeEventListener("click", this.boundCurrentStep);

                }
                return (this.message.innerText = alert("Le gagant est le joueur " + this.currentPlayer));

            }

            this.changePlayer();
            this.counter++;
            (this.counter === 9) ? (this.message.innerText = alert('Match Null !')) : (this.message.innerText = 'Tour du joueur ' + this.currentPlayer);
        }
    }
    resetGame() {
        this.reset.addEventListener("click", () => {

            for (let i = 0; i < this.caseBoard.length; i++) {
                this.caseBoard[i].innerText = "";
            }
            this.arrayO = [];
            this.arrayX = [];
            this.currentPlayer = "X";
            this.counter = 0;
            this.message.innerText = "Le joueur  " + this.currentPlayer + " commence";
            for (let i = 0; i < this.caseBoard.length; i++) {
                this.caseBoard[i].classList.remove("X", "O");


            }

        });
    }

    startTimer() {

        this.interval = setInterval(() =>{

            this.timer.innerHTML= this.minute+":"+this.second;
            this.second++;

            if(this.second == 60){
                this.minute++;
                this.second = 0;
            }

            if(this.minute == 60){
                this.hour++;
                this.minute = 0;
            }

        }, 1000);
    }

    startCounter() {
        this.moves++;
        console.log(this.moves);
        console.log(this.counterCount);

        /*this.counter.querySelector('span').innerHTML;*/
        this.counterCount.innerHTML = this.moves;


        if(this.moves == 0){
            this.startTimer();
        }
    }
}


/*fonction timer a rebourd

function timer(s, m, h) {
    var timeText = document.getElementById("timer");
    if (s == 0 && m == 0 && h == 0) {
        setInterval(function () {
            s += 1;
            if (s == 60) {
                s = 0;
                m += 1;
            }
            if (m == 60) {
                m = 0;
                h += 1;
            }
            timeText.innerHTML = h + ":" + m + ":" + s;
        }, 1000);
    } else {
        setInterval(function () {
            if (s == 0) {
                s = 60;
                m -= 1;
            }
            if (m == 0 || m == -1) {
                m = 59;
                h -= 1;
            }
            s -= 1;
            timeText.innerHTML = h + ":" + m + ":" + s;
        }, 1000);
    }
}*/
//    s,m,h
/*timer(0, 0, 1);*/

// fonction timer non poo qui fonctionne

   /* let counter = 10;
    let intervalId = null;
    function finish() {
        clearInterval(/!*this.*!/intervalId);
        document.getElementById("bip").innerHTML = "TERMINE!";
    }
    function bip() {
        /!*this.*!/counter--;
        if(/!*this.*!/counter == 0) this.finish();
        else {
            document.getElementById("bip").innerHTML = /!*this.*!/counter + " secondes restantes";
        }
    }
    function start(){
        /!*this.*!/intervalId = setInterval(this.bip, 1000);
    }*/








const game = new Game();
game.addPlayerX();
game.resetGame();