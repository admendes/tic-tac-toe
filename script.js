const playerFactory = (side) => {
    return { side };
}

const gameBoard = (() => {
    let board = new Array(9);
    const newGame = () => {
        for (let i = 0; i < 9; i++)
            board[i] = "";
    };
    const getSquare = (pos) => {
        return board[pos]
    }
    const setSquare = (pos, player) => {
        board[pos] = player.side;
    }

    const getBoard = () => {
        return board;
    }
    return {
        newGame,
        getSquare,
        setSquare,
        getBoard
    };
})();

const game = (() => {
    const gb = gameBoard;
    const board = gb.getBoard();

    const playFirst = () => {
        const human = playerFactory("X");
        const computer = playerFactory("O");
        gb.newGame();
        for (let i=0; i<9; i++){
            if (i%2 == 0) {
                humanPlayer(human);
            }
            else {
                computerPlayer(computer);
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
            }
            else {
                humanPlayer(human);
            }
        }
        console.log(board)
    }

    const humanPlayer = (human) => {
        let square = prompt("where?");
        gb.setSquare(square, human);
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