import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movePiece, isValidMove, handlePieceCapture } from '../redux/checkersSlice';
import './Chessboard.css';
import blackPieceImg from '../assets/images/piece_black.png';
import whitePieceImg from '../assets/images/piece_white.png';

function Chessboard() {
    const dispatch = useDispatch();
    const pieces = useSelector(state => state.checkers.pieces);
    const currentPlayer = useSelector(state => state.checkers.currentPlayer);
    const board = useSelector(state => state.checkers.board);

    const [selectedPiece, setSelectedPiece] = useState(null);

    const renderPiece = (piece) => {
        const pieceImg = piece.type === 'white' ? whitePieceImg : blackPieceImg;
        return <img style={{ maxWidth: 65, cursor: 'pointer' }} src={pieceImg} alt="piece" />;
    };

    const handleSquareClick = (targetSquare) => {
        if (selectedPiece === targetSquare) {
            setSelectedPiece(null);
            return;
        }
        if (selectedPiece) {
            const selectedPieceObj = pieces.find(piece => piece.square === selectedPiece);
            if (selectedPieceObj) {
                const isValid = isValidMove(selectedPieceObj, targetSquare, pieces, currentPlayer);
                if (isValid) {
                    dispatch(movePiece({ sourceSquare: selectedPiece, targetSquare }));
                    setSelectedPiece(null);
                    handlePieceCapture(selectedPiece, targetSquare, currentPlayer, pieces);

                }
            }
        } else {
            setSelectedPiece(targetSquare);
        }
    };
    const renderSquare = (position) => {
        const piece = pieces.find(piece => piece.square === position);
        const isWhiteTile = (position.charCodeAt(0) + parseInt(position[1])) % 2 === 1;
        const isSelected = selectedPiece === position;

        let isMoveValid = false;
        if (selectedPiece) {
            const selectedPieceObj = pieces.find(piece => piece.square === selectedPiece);
            if (selectedPieceObj) {
                isMoveValid = isValidMove(selectedPieceObj, position, pieces, currentPlayer);
            }
        }

        return (
            <div
                key={position}
                className={`tile ${isWhiteTile ? 'white-tile' : 'black-tile'} ${isSelected ? 'selected' : ''} ${isMoveValid ? 'valid-move' : ''}`}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => handleSquareClick(position)}
            >
                {piece && renderPiece(piece)}
            </div>
        );
    };

    return (
        <div id='chessboard'>
            {board.map(square => renderSquare(square.position))}
        </div>
    );
}

export default Chessboard;
