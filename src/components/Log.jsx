

export default function Log ({turns}) {
    return (
      <ol id="log">
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}> {/* Cria uma chave única para cada item da lista */}
            {`Jogador ${turn.player} marcou a posição ${turn.square.row}, ${turn.square.col}`} {/* Exibe a jogada */}
          </li>
        ))}
      </ol>
    );
}