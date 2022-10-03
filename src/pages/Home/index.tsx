import { FormProvider, useForm } from 'react-hook-form'
import { createContext, useState } from 'react'

import { HandPalm, Play } from 'phosphor-react'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import * as Styles from './styles'

import { IFormProps } from './types'

interface ICycleProps {
  id: string
  task: string
  minutesAmount: number
  startdDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICyclesContextData {
  activeCycle: ICycleProps | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as ICyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<ICycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<IFormProps>({
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(prevState =>
      prevState.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function handleCreateNewCycle(data: IFormProps) {
    const newCycle: ICycleProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startdDate: new Date()
    }

    setCycles(prevState => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles(prevState =>
      prevState.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <Styles.Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <Styles.StopCountdownButton
            type="button"
            onClick={handleInterruptCycle}
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
