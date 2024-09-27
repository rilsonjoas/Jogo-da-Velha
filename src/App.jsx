import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";

//O componente App está sendo o responsável por controlar o estado do jogo, ou seja, ele é o componente pai dos demais componentes. Os outros componentes estão sendo atualizados por meio de props e callbacks.

const PLAYERS = {
  X: "Jogador 1",
  O: "Jogador 2",
}

const INICIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // Cria um tabuleiro vazio

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"; // Se não houver nenhum turno, o jogador X começa
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  } //Muda o jogador atual.
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INICIAL_GAME_BOARD.map((array) => [...array])]; // Cria uma cópia do tabuleiro inicial
  for (const turn of gameTurns) {
    const { square, player } = turn; // Desestrutura o objeto turn de acordo com as chaves square e player
    const { row, col } = square; // Desestrutura o objeto square de acordo com as chaves row e col.
    gameBoard[row][col] = player; // Atualiza o tabuleiro com a jogada feita.
  } // Atualiza o tabuleiro com as jogadas feitas de acordo com o histórico de turnos.
  return gameBoard;
}

function deriveWinner (gameBoard, players) {
  let winner = null; // Inicializa a variável winner como null.

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Se houver uma combinação vencedora, o vencedor é o símbolo da primeira posição da combinação.
    }
  } // Verifica se há uma combinação vencedora no tabuleiro ao comparar os símbolos das posições de cada combinação.
  return winner;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); // Armazena as jogadas em um array de objetos em ordem

  
  const activePlayer = deriveActivePlayer(gameTurns); // Determina o jogador ativo com base no histórico de turnos
  const gameBoard = deriveGameBoard(gameTurns); // Atualiza o tabuleiro com base no histórico de turnos
  const winner = deriveWinner(gameBoard, players); // Determina o vencedor com base no tabuleiro e nos jogadores

  const hasDraw = gameTurns.length === 9 && !winner; // Verifica se o jogo terminou em empate.

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      // Atualiza o estado do jogo com a nova jogada.
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      // Cria um objeto com as coordenadas da jogada e o jogador que a fez

      return updatedTurns;
    });
  }

  function handleRestartGame() {
    setGameTurns([]); // Reinicia o jogo ao limpar o histórico de turnos.
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  } // Atualiza o nome do jogador de acordo com o símbolo.

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            inicialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            inicialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}


export default App;
