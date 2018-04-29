class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board._bombBoard[rowIndex][columnIndex] === 'B') {
            console.log('You lose');
            this._board.printBoard(this._board);
        } else if (this._board._numberOfTiles === this._numberOfBombs) {
            console.log('You win');
        } else {
            console.log('Keep playing');
            console.log('Player Board:');
            this._board.printBoard(this._board);
        }
    }
}




class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
        console.log('The Board');
        this.printBoard(this._playerBoard);
    }

    get playerBoard() {
        return this._playerBoard;
    }


    flipTile(row, column) {
        if (this._playerBoard[row][column] !== ' ') {
            console.log('This tile has already been flipped');
            return;
        } else if (this._bombBoard[row][column] === 'B') {
            this._playerBoard[row][column] = 'B';
            return;
        } else {
            this._playerBoard[row][column] = this.getBombCount(row, column);
        }
        this._numberOfTiles--;
    }

    static generatePlayerBoard(rows, columns) {
        let board = [];
        for (let i=0; i<rows; i++) {
            board.push([]);
            for (let j=0; j<columns; j++) {
                board[i][j] = ' ';
            }
        }   
        return board;
    }

    static generateBombBoard(rows, columns, bombs) {

    let board = [];
    for (let i=0; i<rows; i++) {
        board.push([]);
        for (let j=0; j<columns; j++) {
            board[i][j] = null;
        }
    }
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
        let randRow = Math.floor(Math.random() * rows);
        let randColumn = Math.floor(Math.random() * columns);
        if (board[randRow][randColumn] == null) {
            board[randRow][randColumn] = "B";
            bombsPlaced++;
        }
    }
    return board;
    }

    getBombCount(rowIndex, columnIndex) {
        const neighborOffset = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        const rows = this._bombBoard.length;
        const columns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffset.forEach(offset  => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < this._bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex < this._bombBoard[0].length) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
    
            });
            return numberOfBombs;
    }

    printBoard(board) {
        console.log(this._playerBoard.map(space => space.join(' | ')).join('\n'));
    }

    hasSafeTiles() {
        return (this._numberOfTiles != this._numberOfBombs);
    }
    
}


//

const g = new Game(2, 2, 1);

g.playMove(0, 0);
g.playMove(0, 0);

