import React from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner, CFormSelect } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useTurma } from '../hooks/useTurma'

export const SaveTreatmentForm = (props) => {
  const { handlePostTurma, loading, classData, cursoData, turnoData } = useTurma()
  const { inputFields } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <form onSubmit={handleSubmit(handlePostTurma)}>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="disciplina">Turma</CFormLabel>
        <div className="d-flex g-12">
          <CFormInput
            placeholder="Turma"
            value={inputFields?.nome}
            {...register('nome', { required: 'Este campo é Obrigatório' })}
          />
        </div>
        {errors?.nome ? <span className="text-danger text-sm">{errors.nome?.message}</span> : null}
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Turno</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          {...register('turnoId', { required: 'campo obrigatório' })}
        >
          <option>Selecione um turno</option>
          {turnoData.length
            ? turnoData?.map(({ designacao, id }) => (
                <option value={id} key={id}>
                  {designacao}
                </option>
              ))
            : null}
        </CFormSelect>
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Classe</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          {...register('classeId', { required: 'campo obrigatório' })}
        >
          <option>Selecione uma classe</option>
          {classData.length
            ? classData?.map(({ classe, id }) => (
                <option value={id} key={id}>
                  {classe}
                </option>
              ))
            : null}
        </CFormSelect>
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Curso</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          {...register('cursoId', { required: 'campo obrigatório' })}
        >
          <option>Selecione um curso</option>
          {cursoData.length
            ? cursoData?.map(({ nome, id }) => (
                <option value={id} key={id}>
                  {nome}
                </option>
              ))
            : null}
        </CFormSelect>
      </div>

      <CButton disabled={loading} type="submit">
        {loading ? <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : null}
        Salvar
      </CButton>
    </form>
  )
}
