import React, { useState } from 'react'
import { CButton, CFormLabel, CFormInput, CSpinner } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
// import { fetchTreatments } from '../services/useFetchTreatment'

export const SaveTreatmentForm = () => {
  // const [treatments, setTreatments] = useState([])
  const [designacao, setDesignacao] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post(`https://rejuma.herokuapp.com/turno/post`, { designacao })
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
    <form>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="curso">Descrição do turno</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput
            id="designacao"
            placeholder="Descrição do turno"
            required
            onChange={(event) => setDesignacao(event.target.value)}
          />
        </div>
      </div>

      <CButton disabled={loading || false} onClick={handleSubmit}>
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </form>
  )
}
