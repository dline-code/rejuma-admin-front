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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { SaveTreatmentForm } from './components/SaveTreatmentForm'
import { useEmployees } from './hooks/useEmployees'
import { Table } from './components/table'
import { Select } from './components/Select'

function Funcionarios() {
  const {
    role,
    handleRemove,
    fields,
    filterBy,
    setIsModalOpen,
    setSearch,
    handleFilterby,
    searchData,
    filteredData,
    handleFilter,
    isModalOpen,
    isfilter,
    search,
  } = useEmployees()

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const resultSearch = filterBy.length ? searchData(search) : []

  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Inserir Funcionário</CModalTitle>
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
                  {isfilter ? <Select data={role} func={handleFilter} label="" /> : null}
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
                <CFormInput
                  type="search"
                  id="exampleFormControlInput1"
                  onChange={(e) => setSearch(e?.target.value)}
                />
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
