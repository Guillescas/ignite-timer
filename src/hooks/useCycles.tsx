import { createContext, ReactNode, useReducer, useState } from 'react'

import { ActionTypes, cyclesReducer, ICycleProps } from '../reducers/cycles'

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesContextData {
  cycles: ICycleProps[]
  activeCycle: ICycleProps | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: ICreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface ICyclesContextoProviderprops {
  children: ReactNode
}

export const CyclesContext = createContext({} as ICyclesContextData)

export function CyclesContextoProvider({
  children
}: ICyclesContextoProviderprops) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    })
  }

  function createNewCycle(data: ICreateCycleData) {
    const newCycle: ICycleProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startdDate: new Date()
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle
      }
    })

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId
      }
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
