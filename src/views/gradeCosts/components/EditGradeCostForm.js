import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CButton, CFormLabel, CFormInput, CSpinner, CForm, CRow } from '@coreui/react'
import Swal from 'sweetalert2'
import { updateGradeCost } from 'src/services/gradeCostsQueryMethods'

export const EditGradeCostForm = ({ gradeCostData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [gradeCost, setGradeCost] = useState(gradeCostData)
  const history = useHistory()

  const handleNewGradeCost = async (data) => {
    setLoading(true)
    console.log(data)
    try {
      const response = await updateGradeCost(data)
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
      <CFormInput type="hidden" value={gradeCostData.id} />
      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="classe">Classe</CFormLabel>
        <CFormInput
          id="classe"
          placeholder="Informe a Classe"
          {...register('classe', {
            required: 'A classe é necessário',
          })}
          value={gradeCost.classe}
          onChange={(e) => setGradeCost(e.target.value)}
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
          value={gradeCost.preco}
          onChange={(e) => setGradeCost(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errors.preco?.message}</span>
      </CRow>

      <CButton type="submit" disabled={loading || false}>
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Alterar
      </CButton>
    </CForm>
  )
}
