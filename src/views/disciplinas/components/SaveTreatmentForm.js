import React from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useSubject } from '../hooks/useSubject'

export const SaveTreatmentForm = (props) => {
  const { handlePostSubject, loading } = useSubject()
  const { inputFields } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <form onSubmit={handleSubmit(handlePostSubject)}>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="disciplina">Disciplina</CFormLabel>
        <div className="d-flex g-12">
          <CFormInput
            placeholder="Disciplina"
            value={inputFields?.nome}
            {...register('nome', { required: 'Este campo é Obrigatório' })}
          />
        </div>
        {errors?.nome ? <span className="text-danger text-sm">{errors.nome?.message}</span> : null}
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="curso">Descrição</CFormLabel>
        <div className="d-flex g-12">
          <CFormInput id="description" placeholder="Descrição da disciplina" />
        </div>
      </div>

      <CButton disabled={loading} type="submit">
        {loading ? <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : null}
        Salvar
      </CButton>
    </form>
  )
}
