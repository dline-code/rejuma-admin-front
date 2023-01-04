import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { useState } from 'react'
import { SaveTreatmentForm } from './components/SaveTreatmentForm'
import { useHistory } from 'react-router-dom'
import { useEmployees } from './hooks/useEmployees'
import { Table } from './components/table'
import { DeleteFetchFunciarios, fetchFuncionarios } from './services/useFetchFuncionario'
import { Select } from './components/Select'

function Funcionarios() {
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()
  const [isfilter, setIsFilter] = useState(false)
  const history = useHistory()
  const [search, setSearch] = useState('')
  const { role } = useEmployees()

  const handleEdit = () => {
    console.log('delete')
    setIsModalOpen(true)
  }

  const resultSearch = filterBy.length ? searchData(search) : []

  function searchData(search) {
    const data = filteredData.filter((data) => {
      return data?.nome?.toLowerCase().includes(search.toLowerCase())
    })
    return data
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
    if (event?.target.value === 'cargo') {
      setFilterBy('cargo')
      setIsFilter(true)
      return
    }
    setIsFilter(false)
  }
  const handleFilter = async (event) => {
    const { value } = event.target
    const data = await fetchFuncionarios(value)
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
                  <Select label={'Filtrar por'} func={handleFilterby} data={fields} />
                  {isfilter ? <Select data={role} func={handleFilter} label="Filtrar por" /> : null}
                </CCol>
                <CCol md="7">
                  <CFormLabel htmlFor="pesq">Pesquisar</CFormLabel>
                  <CForm inline>
                    <CFormInput
                      className="mr-sm-2"
                      placeholder="Search"
                      id="pesq"
                      style={{ width: '80%' }}
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
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
            {search ? (
              <Table data={resultSearch} handleEdit={handleEdit} handleRemove={handleRemove} />
            ) : (
              <Table data={filteredData} handleEdit={handleEdit} handleRemove={handleRemove} />
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Funcionarios
