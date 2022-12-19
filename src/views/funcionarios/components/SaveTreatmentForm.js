import React, { useCallback, useEffect, useState } from 'react'
import { CButton, CFormLabel, CFormInput, CFormSelect, CSpinner } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import api from 'src/services/api'
import Swal from 'sweetalert2'
import Funcionarios from '..'
import { getfetchFuncionarios } from '../services/useFetchFuncionario'
// import { fetchTreatments } from '../services/useFetchTreatment'

export const SaveTreatmentForm = ({ employeeDatas, setEmployeeDatas }) => {
  // const [treatments, setTreatments] = useState([])
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState({ id: 0, nome: '', designacao: '' })
  const history = useHistory()
  const [tipoUsuario, setTipoUsuario] = useState([])

  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const salonId = JSON.parse(String(localStorage.getItem('user-id')))
  //     const sendData = {
  //       salonId,
  //       price: Number(price),
  //       treatmentId,
  //     }
  //     await api.post(`/treatmentsalon`, sendData)
  //     // Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error.response)
  //     // Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
  //     setLoading(false)
  //   }
  //   history.go(0)
  // }

  const handleSubmit = (event) => {
    event?.preventDefault()
    setEmployee({ ...employee, id: employee.id + 1 })
    setEmployeeDatas([...employeeDatas, employee])
    Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
  }

  const handleFectFuncionarios = useCallback(async () => {
    const cargo = await getfetchFuncionarios()
    setTipoUsuario(cargo)
  }, [])

  useEffect(() => {
    handleFectFuncionarios()
  }, [handleFectFuncionarios])

  return (
    <form>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Nome do funcionário</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput
            id="nomeFuncionario"
            placeholder="Nome do funcionário"
            required
            onChange={(event) => setEmployee({ ...employee, nome: event.target.value })}
          />
        </div>
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Serviço</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          required
          onChange={(event) => setEmployee({ ...employee, designacao: event.target.value })}
        >
          <option>Selecione um cargo</option>
          {tipoUsuario?.map(({ designacao, id }) => (
            <option value={designacao} key={id}>
              {designacao}
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
