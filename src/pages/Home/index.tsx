import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'

import { HandPalm, Play } from 'phosphor-react'

import { CyclesContext } from '../../hooks/useCycles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import * as Styles from './styles'

import { IFormProps } from './types'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<IFormProps>({
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: IFormProps) {
    createNewCycle(data)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <Styles.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <Styles.StopCountdownButton
            type="button"
            onClick={interruptCurrentCycle}
          >
            <HandPalm size={24} />
            Interromper
          </Styles.StopCountdownButton>
        ) : (
          <Styles.StartCountdownButton
            type="submit"
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </Styles.StartCountdownButton>
        )}
      </form>
    </Styles.Container>
  )
}
