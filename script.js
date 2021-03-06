const playerFactory = (side) => {
    return { side };
}

const gameBoard = (() => {
    let board = new Array(9);
    let xPositions = [];
    let oPositions = [];

    const newGame = () => {
        xPositions = [];
        oPositions = []
        for (let i = 0; i < 9; i++)
            board[i] = "";
    };

    const getSquare = (pos) => {
        return board[pos]
    }
    const setSquare = (pos, player) => {
        board[pos] = player.side;
        if (player.side == "X"){
            xPositions.push(pos);
        }
        else {
            oPositions.push(pos);
        }
    }

    const getBoard = () => {
        return board;
    }

    const getXPositions = () => {
        return xPositions;
    }

    const getOPositions = () => {
        return oPositions;
    }

    return {
        newGame,
        getSquare,
        setSquare,
        getBoard,
        getXPositions,
        getOPositions
    };
})();

const game = (() => {
    const gb = gameBoard;
    const board = gb.getBoard();
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; 
    let gameInProgress = false;
    let turn = 0;
    let human = playerFactory("X");
    let computer = playerFactory("O");
    let gameOver = false;
    let playfirst = true;

    const play = (playFirst, n) => {
        if (playFirst) {
            console.log(turn)
            if (!gameOver && (board[n]=="" || board[n]==undefined)) {
                document.getElementById("playFirst").className = 'hidden'; 
                document.getElementById("playSecond").className = 'hidden'; 

                if (!gameInProgress) {
                    human = playerFactory("X");
                    computer = playerFactory("O");
                    gb.newGame();
                    gameInProgress = true;
                    turn = 0;
                }
                //for (let i=0; i<9; i++){
                
                
                if (turn%2 == 0) {
                    humanPlayer(human, n);
                    if (checkWinCondition(gb.getXPositions())) {
                        console.log("You win!")
                        gameOver = true;
                        document.getElementById("resetGame").className = 'show'; 
                    }
                }
                else {
                    computerPlayer(computer);
                    if (checkWinCondition(gb.getOPositions())) {
                        console.log("You lose!")
                        gameOver = true;
                        document.getElementById("resetGame").className = 'show'; 
                    }
                }
                turn++

                if (turn>=9){
                    gameOver = true;
                    document.getElementById("resetGame").className = 'show'; 
                }
                //}
                console.log(board)
            }
        }
        else {
            console.log(turn)

            if (!gameOver && (board[n]=="" || board[n]==undefined)) {
                document.getElementById("playFirst").className = 'hidden'; 
                document.getElementById("playSecond").className = 'hidden'; 
                
                if (!gameInProgress) {
                    human = playerFactory("O");
                    computer = playerFactory("X");
                    gb.newGame();
                    gameInProgress = true;
                    turn = 0;
                }

                if (turn%2 == 0) {
                    computerPlayer(computer);
                    if (checkWinCondition(gb.getXPositions())) {
                        console.log("You lose!")
                        gameOver = true;
                        document.getElementById("resetGame").className = 'show'; 
                    }
                }
                else {
                    humanPlayer(human, n);
                    if (checkWinCondition(gb.getOPositions())) {
                        console.log("You win!")
                        gameOver = true;
                        document.getElementById("resetGame").className = 'show'; 
                    }
                }
                turn++

                if (turn>=9){
                    gameOver = true;
                    document.getElementById("resetGame").className = 'show'; 
                }
                console.log(board)
            }
        }
    }

    const checkWinCondition = (positions) => {
        console.log(positions);
        for (let i = 0; i < 8; i++) {
            if ((positions.indexOf(winConditions[i][0]) > - 1) && (positions.indexOf(winConditions[i][1]) > - 1) && (positions.indexOf(winConditions[i][2]) > - 1)) {
                return true;
            }
        }
        return false;
    }

    const humanPlayer = (human, n) => {
        let square = n;
        gb.setSquare(parseInt(square), human);
        if (human.side == "X")
            displayController.addX(square);
        else displayController.addO(square);
    }

    const computerPlayer = (computer) => {
        let free = [];
        for (i = 0; i < 9; i++) {
            if (gb.getSquare(i) == "") {
                free.push(i);
            }
        }
        let random = free[Math.floor(Math.random() * free.length)];
        gb.setSquare(random, computer);
        displayController.addX(random);
        if (computer.side == "X")
            displayController.addX(random);
        else displayController.addO(random);

        console.log(board)
    }

    const resetGame = () => {
        window.location.reload();
    }

    const firstPlayer = (playFirst) => {
        this.playFirst = playFirst
        
    }

    return {
        play,
        resetGame
    }


})();

const displayController = (() => {

    function makeRows(rows, cols, first) {
        container.style.setProperty('--grid-rows', rows);
        container.style.setProperty('--grid-cols', cols);
        
        for (c = 0; c < (rows * cols); c++) {
            let cell = document.createElement("div");
            cell.addEventListener("click", function() {

                game.play(first ,parseInt(cell.classList[1][3]))
                game.play(first)

                //console.log(parseInt(cell.classList[1][3]))
            });

            container.appendChild(cell).className = `grid-item box${c}`;

        };
        game.play(first)

    };

    function addX(pos) {
        let elem = document.getElementsByClassName(`box${pos}`);
        elem[0].innerHTML = "X";
    }

    function addO(pos) {
        let elem = document.getElementsByClassName(`box${pos}`);
        elem[0].innerHTML = "0";
    }

    return {
        makeRows,
        addX,
        addO
    }
})();


//displayController.makeRows(3,3)
