import { HandPalm, Play } from 'phosphor-react'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton
} from './styles'
import { useEffect, useState } from 'react'
import NewCycleForm from './components/NewCycleForm'
import CountDown from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}

function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const task = watch('task')

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setActiveCycleId(null)

    setCycles(
      cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton disabled={!task} type="button">
            <HandPalm size={24} />
            Interromper{' '}
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar{' '}
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export default Home
