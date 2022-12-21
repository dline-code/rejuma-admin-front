import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CButton, CFormLabel, CFormInput, CSpinner, CForm, CRow } from '@coreui/react'
import Swal from 'sweetalert2'
import { setNewGradeCost } from 'src/services/gradeCostsQueryMethods'

export const CreateGradeCostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleNewGradeCost = async (data) => {
    setLoading(true)
    console.log(data)
    try {
      const response = await setNewGradeCost(data)
      console.log(response)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  return (
    <CForm onSubmit={handleSubmit(handleNewGradeCost)}>
      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="classe">Classe</CFormLabel>
        <CFormInput
          id="classe"
          placeholder="Informe a Classe"
          {...register('classe', {
            required: 'A classe é necessário',
          })}
        />
        <span style={{ color: 'red' }}>{errors.classe?.message}</span>
      </CRow>

      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="preco">Preço da classeo</CFormLabel>
        <CFormInput
          id="preco"
          placeholder="Propina da Classe"
          {...register('preco', {
            required: 'A descrição é necessário',
          })}
        />
        <span style={{ color: 'red' }}>{errors.preco?.message}</span>
      </CRow>

      <CButton type="submit" disabled={loading || false}>
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </CForm>
  )
}
