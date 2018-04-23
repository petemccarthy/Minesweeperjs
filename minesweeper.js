class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._flipCount = 0;
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
        this.printBoard(this._bombBoard);
        this.printBoard(this._playerBoard);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    get flipCount() {
        return this._flipCount;
    }

    flipTile(row, column) {
        if (this._playerBoard[row][column] !== ' ') {
            console.log('This tile has already been flipped');
            return;
        } else if (this._bombBoard[row][column] === 'B') {
            this._playerBoard[row][column] = 'B';
            console.log('Kaboom!');
            return;
        } else {
            this._playerBoard[row][column] = this.getBombCount(row, column);
        }
        this._numberOfTiles++;
        this._flipCount++;
        console.log(`This is the end of turn #${this._flipCount}`);
    }

    generatePlayerBoard(rows, columns) {
        let board = [];
        for (let i=0; i<rows; i++) {
            board.push([]);
            for (let j=0; j<columns; j++) {
                board[i][j] = ' ';
            }
        }   
        return board;
    }

    generateBombBoard(rows, columns, bombs) {

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
        console.log(board.map(row => row.join(' | ')).join('\n'));
    }
    
}


//

let board = new Board(3, 4, 5);

board.flipTile(1, 2);

