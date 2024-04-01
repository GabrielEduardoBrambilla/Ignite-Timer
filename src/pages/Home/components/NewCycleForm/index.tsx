import React from 'react'
import * as zod from 'zod'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>
export default function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        placeholder="De um nome para seu projeto"
        id="task"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        step={5}
        min={5}
        max={5}
        placeholder="00"
        id="minutesAmount"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  )
}
