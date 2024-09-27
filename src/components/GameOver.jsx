export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Jogo terminou!</h2>
      {winner && <p>{winner} venceu!</p>}
      {!winner && <p>Empate!</p>}
      <p>
        <button onClick={onRestart}>Reiniciar jogo</button>
      </p>
    </div>
  );
}
