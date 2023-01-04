import React, { useEffect } from 'react'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { FuncionariosListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { useState } from 'react'
import { SaveTreatmentForm } from './components/SaveTreatmentForm'
// import { fetchTreatmentSalon } from './services/useFetchTreatmentSalon'
import api from 'src/services/api'
import { useHistory } from 'react-router-dom'
import { useEmployees } from './hooks/useEmployees'
import { Table } from './components/table'
import { DeleteFetchFunciarios, fetchFuncionarios } from './services/useFetchFuncionario'

function Funcionarios() {
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()
  const [isfilter, setIsFilter] = useState(false)
  const history = useHistory()
  const { role } = useEmployees()

  const searchBy = (event) => {
    const { value } = event.target
    const newData = filteredData?.filter(
      (item) => String(item[filterBy]).toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1,
    )
    setFilteredData(newData)
  }

  const handleEdit = () => {
    console.log('delete')
    setIsModalOpen(true)
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Tem a certeza que pretende eliminar?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteFetchFunciarios(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
        } catch (error) {
          console.log(error?.response?.data)
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go(0)
      }
    })
  }

  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  const fields = ['cargo']

  function handleFilterby(event) {
    console.log(event.target.value)
    if (event?.target.value === 'cargo') {
      setIsFilter(true)
      return
    }
    setIsFilter(false)
  }
  const handleFilter = async (desc) => {
    console.log(desc)
    const data = await fetchFuncionarios(desc)
    console.log(data)
    setFilteredData(data)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Inserir Funcionário </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <SaveTreatmentForm />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>

      <div>
        <CCard>
          <CCardHeader>Dados de Pesquisa</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CCol md="5">
                  <CFormLabel htmlFor="selectSm">Filtrar por</CFormLabel>
                  <CFormSelect name="selectSm" id="SelectLm" onChange={handleFilterby}>
                    <option value="null">Please select</option>
                    {fields?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </CFormSelect>
                  {isfilter ? (
                    <CFormSelect
                      name="selectSm"
                      className="mt-2"
                      id="SelectLm"
                      onChange={(e) => handleFilter(e?.target.value)}
                    >
                      <option value="null">Please select</option>
                      {role?.map((item, index) => (
                        <option key={index} value={item.designacao}>
                          {item.designacao}
                        </option>
                      ))}
                    </CFormSelect>
                  ) : null}
                </CCol>
                <CCol md="7">
                  <CFormLabel htmlFor="pesq" onChange={(event) => setFilterBy(event.target.value)}>
                    Pesquisar
                  </CFormLabel>
                  <CForm inline>
                    <CFormInput
                      className="mr-sm-2"
                      placeholder="Search"
                      id="pesq"
                      style={{ width: '80%' }}
                      onChange={searchBy}
                    />
                    {/* <CButton color="outline-info" className="my-2 my-sm-0" type="submit">
                      Search
                    </CButton> */}
                  </CForm>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        <br />
        <CCard>
          <CCardBody>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <h4>Funcionários</h4>

              <CButton onClick={handleClickNewAppointment} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </div>
            <div className="mb-40">
              <div className="mb-3" width="100px">
                <CFormLabel htmlFor="exampleFormControlInput1">Pesquise por algo</CFormLabel>
                <CFormInput type="search" id="exampleFormControlInput1" />
              </div>
            </div>
            <Table data={filteredData} handleEdit={handleEdit} handleRemove={handleRemove} />
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Funcionarios
