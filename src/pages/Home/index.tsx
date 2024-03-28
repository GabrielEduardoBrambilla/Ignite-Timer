import { Play } from 'phosphor-react'
import React from 'react'
import {
  CountDownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput
} from './styles'

function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput placeholder="De um nome para seu projeto" id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            step={5}
            min={5}
            max={5}
            placeholder="00"
            id="minutesAmount"
          />

          <span>minutos</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountDownButton type="submit">
          <Play />
          Começar{' '}
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}

export default Home
