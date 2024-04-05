import { createSlice } from "@reduxjs/toolkit";

const createBoard = () => {
    const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const board = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const position = horizontalAxis[i] + verticalAxis[j];
            board.push({ position });
        }
    }
    return board;
};

const isOwnPiece = (targetSquare, pieces, currentPlayer) => {
    const pieceOnTargetSquare = pieces.find(piece => piece.square === targetSquare);
    return pieceOnTargetSquare && pieceOnTargetSquare.type === currentPlayer;
};

const isOpponentPiece = (square, pieces, currentPlayer) => {
    const pieceOnSquare = pieces.find(piece => piece.square === square);
    return pieceOnSquare && pieceOnSquare.type !== currentPlayer;
};



export const isValidMove = (piece, targetSquare, pieces, currentPlayer) => {
    const { square, type } = piece;
    const [startCol, startRow] = square.split('');
    const colIndex = 'abcdefgh'.indexOf(startCol);
    const directions = (type === 'white') ? [1] : [-1];
    const possibleMoves = [];
    let isEatable = false;

    directions.forEach(dir => {
        const newRow = startCol + (parseInt(startRow) + dir);
        console.log("newRow", newRow);

        const leftMove = (colIndex > 0) ? 'abcdefgh'[colIndex - 1] + startRow : null;
        const rightMove = (colIndex < 7) ? 'abcdefgh'[colIndex + 1] + startRow : null;

        if (isOpponentPiece(leftMove, pieces, currentPlayer)) {
            const nextLeftSquare = String.fromCharCode(leftMove.charCodeAt(0) - 1) + (parseInt(startRow));
            console.log("leftMove", nextLeftSquare);
            if (!pieces.some(piece => piece.square === nextLeftSquare)) {
                possibleMoves.push(nextLeftSquare);
                isEatable = true
            }
        }
        if (isOpponentPiece(rightMove, pieces, currentPlayer)) {
            const nextRightSquare = String.fromCharCode(rightMove.charCodeAt(0) + 1) + (parseInt(startRow));
            console.log("rightMove", nextRightSquare);
            if (!pieces.some(piece => piece.square === nextRightSquare)) {
                possibleMoves.push(nextRightSquare);
                isEatable = true

            }
        }
        if (isOpponentPiece(newRow, pieces, currentPlayer)) {
            const nextRowSquare = startCol + (parseInt(startRow) + 2 * dir);
            console.log("nextRowSquare", nextRowSquare);
            if (!pieces.some(piece => piece.square === nextRowSquare)) {
                possibleMoves.push(nextRowSquare);
                isEatable = true

            }
        }


        if (!isEatable) {
            if (!isOwnPiece(leftMove, pieces, currentPlayer) && !isOpponentPiece(leftMove, pieces, currentPlayer)) {
                possibleMoves.push(leftMove);
            }
            if (!isOwnPiece(rightMove, pieces, currentPlayer) && !isOpponentPiece(rightMove, pieces, currentPlayer)) {
                possibleMoves.push(rightMove);
            }
            if (!isOwnPiece(newRow, pieces, currentPlayer) && !isOpponentPiece(newRow, pieces, currentPlayer)) {
                possibleMoves.push(newRow);
            }
        }


    });

    if (type !== currentPlayer) {
        return false;
    }

    const isValid = possibleMoves.includes(targetSquare);

    return isValid;
};


export const handlePieceCapture = () => {

}

export const checkersSlice = createSlice({
    name: 'checkers',
    initialState: {
        board: createBoard(),
        pieces: [
            { id: 1, square: 'a2', type: 'white', isKing: false },
            { id: 2, square: 'b2', type: 'white', isKing: false },
            { id: 3, square: 'c2', type: 'white', isKing: false },
            { id: 4, square: 'd2', type: 'white', isKing: false },
            { id: 5, square: 'e2', type: 'white', isKing: false },
            { id: 6, square: 'f2', type: 'white', isKing: false },
            { id: 7, square: 'g2', type: 'white', isKing: false },
            { id: 8, square: 'h2', type: 'white', isKing: false },
            { id: 9, square: 'a3', type: 'white', isKing: false },
            { id: 10, square: 'b3', type: 'white', isKing: false },
            { id: 11, square: 'c3', type: 'white', isKing: false },
            { id: 12, square: 'd3', type: 'white', isKing: false },
            { id: 13, square: 'e3', type: 'white', isKing: false },
            { id: 14, square: 'f3', type: 'white', isKing: false },
            { id: 15, square: 'g3', type: 'white', isKing: false },
            { id: 16, square: 'h3', type: 'white', isKing: false },
            { id: 17, square: 'a7', type: 'black', isKing: false },
            { id: 18, square: 'b7', type: 'black', isKing: false },
            { id: 19, square: 'c7', type: 'black', isKing: false },
            { id: 20, square: 'd7', type: 'black', isKing: false },
            { id: 21, square: 'e7', type: 'black', isKing: false },
            { id: 22, square: 'f7', type: 'black', isKing: false },
            { id: 23, square: 'g7', type: 'black', isKing: false },
            { id: 24, square: 'h7', type: 'black', isKing: false },
            { id: 25, square: 'a6', type: 'black', isKing: false },
            { id: 26, square: 'b6', type: 'black', isKing: false },
            { id: 27, square: 'c6', type: 'black', isKing: false },
            { id: 28, square: 'd6', type: 'black', isKing: false },
            { id: 29, square: 'e6', type: 'black', isKing: false },
            { id: 30, square: 'f6', type: 'black', isKing: false },
            { id: 31, square: 'g6', type: 'black', isKing: false },
            { id: 32, square: 'h6', type: 'black', isKing: false },
        ],
        currentPlayer: 'white'
    },
    reducers: {
        movePiece: (state, action) => {
            const { sourceSquare, targetSquare } = action.payload;
            const pieceToMove = state.pieces.find(piece => piece.square === sourceSquare);
            const targetSquareOccupied = state.pieces.some(piece => piece.square === targetSquare);

            if (pieceToMove) {
                pieceToMove.square = targetSquare
                if (targetSquareOccupied) {
                    handlePieceCapture()
                }
                state.currentPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
            }

        }
    }
});

export const { movePiece, } = checkersSlice.actions;
export default checkersSlice.reducer;

