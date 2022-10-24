import React, { useState, useEffect } from 'react'
import { CButton, CFormLabel, CFormInput, CFormSelect, CSpinner } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import api from 'src/services/api'
import Swal from 'sweetalert2'
import { fetchTreatments } from '../services/useFetchTreatment'

export const SaveTreatmentForm = () => {
  const [treatments, setTreatments] = useState([])
  const [treatmentId, setTreatmentId] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    fetchTreatments()
      .then((result) => {
        setTreatments(result)
      })
      .catch((error) => {
        console.log(error?.response)
      })
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const salonId = JSON.parse(String(localStorage.getItem('user-id')))
      const sendData = {
        salonId,
        price: Number(price),
        treatmentId,
      }
      await api.post(`/treatmentsalon`, sendData)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  const treatmentsAdapt = [
    {
      id: 1,
      name: 'Professor',
    },
    {
      id: 2,
      name: 'Diretor',
    },
    {
      id: 3,
      name: 'Secretário',
    },
  ]

  return (
    <form>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Nome do funcionário</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput
            id="nomeFuncionario"
            placeholder="Nome do funcionário"
            required
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Serviço</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          required
          onChange={(event) => setTreatmentId(event.target.value)}
        >
          <option>Selecione um cargo</option>
          {treatmentsAdapt?.map(({ name, id }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </CFormSelect>
      </div>

      <CButton disabled={loading || false} onClick={handleSubmit}>
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </form>
  )
}
