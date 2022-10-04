import { useContext } from 'react'

import ptBR from 'date-fns/esm/locale/pt-BR/index.js'
import { formatDistanceToNow } from 'date-fns'

import { CyclesContext } from '../../hooks/useCycles'

import * as Styles from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <Styles.Container>
      <h1>Meu histórico</h1>

      <Styles.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Incício</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startdDate), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Styles.Status statusColor="green">Concluído</Styles.Status>
                  )}
                  {cycle.interruptedDate && (
                    <Styles.Status statusColor="red">
                      Interrompido
                    </Styles.Status>
                  )}
                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Styles.Status statusColor="yellow">
                      Em andamento
                    </Styles.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styles.HistoryList>
    </Styles.Container>
  )
}
