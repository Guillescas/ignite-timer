import { useForm } from 'react-hook-form'

import { Play } from 'phosphor-react'

import * as Styles from './styles'

import { IFormProps } from './types'

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<IFormProps>({
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  function handleCreateNewCycle(data: IFormProps) {
    console.log('a')
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <Styles.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <Styles.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <Styles.TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <Styles.MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <Styles.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </Styles.StartCountdownButton>
      </form>
    </Styles.Container>
  )
}
