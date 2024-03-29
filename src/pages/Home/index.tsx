import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput
} from './styles'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormSchema)
  })
  const task = watch('task')

  function handleCreateNewCycle() {}

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="De um nome para seu projeto"
            id="task"
            {...register('task')}
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            step={5}
            min={5}
            max={5}
            placeholder="00"
            id="minutesAmount"
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <CountDownButton disabled={!task} type="submit">
          <Play />
          Começar{' '}
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}

export default Home
