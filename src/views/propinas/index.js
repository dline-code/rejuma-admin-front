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
import AddPropina from './new'
import { Table } from './components/table'
import { useBribe } from './hooks/useBribe'
import { Select } from './components/Select'

function Appointment() {
  const {
    handleRemove,
    fields,
    handleFilter,
    filteredData,
    isModalOpen,
    isfilter,
    search,
    searchData,
    handleFilterby,
    filterBy,
    setIsModalOpen,
    setSearch,
    monthData,
  } = useBribe()

  const resultSearch = filterBy.length ? searchData(search) : []

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} fullscreen>
        <CModalHeader>
          <CModalTitle>Efetuar novo pagamento de propina </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddPropina setIsModalOpen={setIsModalOpen} />
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
                  <Select
                    label={'Filtrar por'}
                    title="por favor selecione um campo"
                    func={handleFilterby}
                    data={fields}
                  />
                  {isfilter ? (
                    <Select
                      data={monthData}
                      title="por favor selecione o mês"
                      func={handleFilter}
                      label=""
                    />
                  ) : null}
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
              <h4>Propinas</h4>

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

export default Appointment
