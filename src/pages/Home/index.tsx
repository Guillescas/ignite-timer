import { Play } from 'phosphor-react'

import * as Styles from './styles'

export function Home() {
  return (
    <Styles.Container>
      <form>
        <Styles.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <Styles.MinutesAmountInput
            type="text"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </Styles.FormContainer>

        <Styles.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Styles.Separator>:</Styles.Separator>
          <span>0</span>
          <span>0</span>
        </Styles.CountdownContainer>

        <Styles.StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </Styles.StartCountdownButton>
      </form>
    </Styles.Container>
  )
}
