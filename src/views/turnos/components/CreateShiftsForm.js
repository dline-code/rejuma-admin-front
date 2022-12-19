import React, { useState } from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner, CForm, CCol } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setNewShifts } from 'src/services/shiftsQueryMethods'
import { useForm } from 'react-hook-form'

export const CreateShiftsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleCreateShift = async (data) => {
    setLoading(true)
    try {
      await setNewShifts(data)
      Swal.fire('Sucesso!', `Inserido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  return (
    <CForm onSubmit={handleSubmit(handleCreateShift)}>
      <CCol className="mb-3" width="100px">
        <CFormLabel htmlFor="designacao">Descrição do turno</CFormLabel>
        <CFormInput
          id="designacao"
          placeholder="Descrição do turno"
          {...register('designacao', { required: 'insira a descrição da turma' })}
        />
        <span style={{ color: 'red' }}>{errors.designacao?.message}</span>
      </CCol>

      <CButton type="submit" disabled={loading || false}>
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </CForm>
  )
}
