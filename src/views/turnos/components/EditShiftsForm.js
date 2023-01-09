import React, { useState } from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner, CForm, CCol } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { updateShift } from '../service/fetchMethods'

export const EditShiftsForm = ({ shiftData }) => {
  const [newShift, setNewShift] = useState(shiftData)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleChangeCourseData = async (data) => {
    setLoading(true)
    try {
      await updateShift(data.id, data)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  return (
    <CForm onSubmit={handleSubmit(handleChangeCourseData)}>
      <CFormInput type="hidden" {...register('id')} value={shiftData.id} />

      <CCol className="mb-3" width="100px">
        <CFormLabel htmlFor="designacao">Descrição do turno</CFormLabel>
        <CFormInput
          id="designacao"
          placeholder="Descrição do turno"
          {...register('designacao', { required: 'insira a descrição da turma' })}
          value={newShift.designacao}
          onChange={(e) => setNewShift(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errors.designacao?.message}</span>
      </CCol>

      <CButton type="submit" disabled={loading}>
        {loading ? <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : null}
        Alterar
      </CButton>
    </CForm>
  )
}
