import React, { useState } from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import api from 'src/services/api'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useSubject } from '../hooks/useSubject'

export const SaveTreatmentForm = () => {
  const { handlePostSubject, setLoading, loading } = useSubject()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(handlePostSubject)}>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="disciplina">Disciplina</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput placeholder="Disciplina" {...register('nome', { required: true })} />
        </div>
        {errors.nome && <span>Este campo é Obrigatório</span>}
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="curso">Descrição</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput id="description" placeholder="Descrição da disciplina" />
        </div>
      </div>

      <CButton disabled={loading || false} type="submit">
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </form>
  )
}
