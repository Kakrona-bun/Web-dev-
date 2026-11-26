import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const newGame = () => new Chess();

export default function App() {
  const gameRef = useRef(newGame());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [moveHistory, setMoveHistory] = useState([]);
  const [mode, setMode] = useState('computer');
  const [orientation, setOrientation] = useState('white');
  const [selected, setSelected] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [thinking, setThinking] = useState(false);

  const game = gameRef.current;
  const sync = () => {
    setFen(gameRef.current.fen());
    setMoveHistory(gameRef.current.history());
  };

  const gameOver = game.isGameOver();
  const computerTurn = mode === 'computer' && game.turn() === 'b' && !gameOver;
  const turn = game.turn() === 'w' ? 'White' : 'Black';

  let status = `${turn} to move`;
  if (game.isCheckmate()) status = `Checkmate — ${game.turn() === 'w' ? 'White' : 'Black'} loses`;
  else if (game.isStalemate()) status = 'Draw — stalemate';
  else if (game.isThreefoldRepetition()) status = 'Draw — repetition';
  else if (game.isInsufficientMaterial()) status = 'Draw — insufficient material';
  else if (game.isDraw()) status = 'Game drawn';
  else if (game.isCheck()) status += ' — check!';

  // The GitHub example chooses a random legal move after a short delay.
  // This effect waits until the React position has updated, avoiding stale state.
  useEffect(() => {
    if (!computerTurn) {
      setThinking(false);
      return;
    }
    setThinking(true);
    const timer = setTimeout(() => {
      const current = gameRef.current;
      if (current.turn() !== 'b' || current.isGameOver()) return;
      const moves = current.moves({ verbose: true });
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      if (!randomMove) return;
      const played = current.move(randomMove);
      setLastMove([played.from, played.to]);
      setSelected(null);
      sync();
      setThinking(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [fen, computerTurn]);

  function attemptMove(from, to) {
    if (!to || gameRef.current.isGameOver() || thinking || computerTurn) return false;
    const current = gameRef.current;
    // For beginners, promote to a queen automatically.
    try {
      const played = current.move({ from, to, promotion: 'q' });
      if (!played) return false;
      setLastMove([played.from, played.to]);
      setSelected(null);
      sync();
      return true;
    } catch {
      return false;
    }
  }

  function onPieceDrop({ sourceSquare, targetSquare }) {
    return attemptMove(sourceSquare, targetSquare);
  }

  function onSquareClick({ square }) {
    if (thinking || computerTurn || gameRef.current.isGameOver()) return;
    if (selected && attemptMove(selected, square)) return;
    const piece = gameRef.current.get(square);
    setSelected(piece?.color === gameRef.current.turn() ? square : null);
  }

  function restart() {
    gameRef.current = newGame();
    setSelected(null);
    setLastMove(null);
    setThinking(false);
    sync();
  }

  function undo() {
    const current = gameRef.current;
    if (!current.history().length || thinking || computerTurn) return;
    current.undo();
    if (mode === 'computer' && current.turn() === 'b' && current.history().length) current.undo();
    setSelected(null);
    const history = current.history({ verbose: true });
    const last = history.at(-1);
    setLastMove(last ? [last.from, last.to] : null);
    sync();
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    // A new game removes confusing halfway-turn situations on mode change.
    gameRef.current = newGame();
    setSelected(null);
    setLastMove(null);
    setThinking(false);
    sync();
  }

  const legalTargets = selected
    ? game.moves({ square: selected, verbose: true }).map((move) => move.to)
    : [];
  const squareStyles = {};
  for (const square of lastMove || []) squareStyles[square] = { backgroundColor: 'rgba(214,180,120,.35)' };
  if (selected) squareStyles[selected] = { backgroundColor: 'rgba(214,180,120,.6)' };
  for (const square of legalTargets) squareStyles[square] = { backgroundColor: 'rgba(83,158,112,.55)' };

  const chessboardOptions = {
    position: fen,
    boardOrientation: orientation,
    onPieceDrop,
    onSquareClick,
    canDragPiece: ({ piece }) => !thinking && !computerTurn && !gameOver &&
      piece?.[0] === game.turn(),
    lightSquareStyle: { backgroundColor: '#e8d9b5' },
    darkSquareStyle: { backgroundColor: '#866443' },
    squareStyles,
    boardStyle: { borderRadius: '6px', overflow: 'hidden' },
    animationDurationInMs: 180,
  };

  return (
    <>
      <main className="page">
        <section className="intro">
          <h1>Make your next <em>move.</em></h1>
          <p>Practice against a random-move computer or share the board with a friend.</p>
        </section>

        <section className="game-layout">
          <div className="board-column">
            <div className="player-label"><span className="piece-dot black-dot" /> Black {mode === 'computer' ? '· Computer' : '· Player 2'}</div>
            <div className="board-frame"><Chessboard options={chessboardOptions} /></div>
            <div className="player-label"><span className="piece-dot white-dot" /> White · Player 1</div>
          </div>

          <aside className="sidebar">
            <div className="sidebar-title">GAME ROOM <span>♛</span></div>
            <label className="field-label" htmlFor="game-mode">Game mode</label>
            <select id="game-mode" value={mode} onChange={(e) => changeMode(e.target.value)}>
              <option value="computer">Play vs computer (random)</option>
              <option value="local">Two players (local)</option>
            </select>
            <div className="status" role="status">{thinking ? 'Computer is thinking…' : status}</div>
            <div className="action-grid">
              <button onClick={restart}>↻ New game</button>
              <button onClick={undo} disabled={!moveHistory.length || thinking || computerTurn}>↶ Undo</button>
              <button onClick={() => setOrientation((o) => o === 'white' ? 'black' : 'white')}>⇅ Flip board</button>
            </div>
            <div className="history-heading">MOVE HISTORY <span>{moveHistory.length} half-moves</span></div>
            <div className="history" aria-label="Chess move history">
              {moveHistory.length === 0 ? <p className="empty">No moves yet. White begins.</p> :
                Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, i) => (
                  <div className="move-row" key={i}>
                    <span className="move-number">{i + 1}.</span>
                    <span>{moveHistory[i * 2]}</span>
                    <span>{moveHistory[i * 2 + 1] || '—'}</span>
                  </div>
                ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
