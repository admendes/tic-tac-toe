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

    const playFirst = () => {
        const human = playerFactory("X");
        const computer = playerFactory("O");
        gb.newGame();
        for (let i=0; i<9; i++){
            if (i%2 == 0) {
                humanPlayer(human);
                if (checkWinCondition(gb.getXPositions())) {
                    console.log("You win!")
                }
            }
            else {
                computerPlayer(computer);
                if (checkWinCondition(gb.getOPositions())) {
                    console.log("You lose!")
                }
            }
        }
        console.log(board)
    }

    const playSecond = () => {
        const human = playerFactory("O");
        const computer = playerFactory("X");
        gb.newGame();
        for (let i=0; i<9; i++){
            if (i%2 == 0) {
                computerPlayer(computer);
                if (checkWinCondition(gb.getXPositions())) {
                    console.log("You lose!")
                }
            }
            else {
                humanPlayer(human);
                if (checkWinCondition(gb.getOPositions())) {
                    console.log("You win!")
                }
            }
        }
        console.log(board)
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

    const humanPlayer = (human) => {
        let square = prompt("where?");
        gb.setSquare(parseInt(square), human);
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
        console.log(board)
    }

    return {
        playFirst,
        playSecond
    }


})();

game.playSecond();
game.playFirst();