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
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { TreatmentListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { useState } from 'react'
import { SaveTreatmentForm } from './components/SaveTreatmentForm'
// import { fetchTreatmentSalon } from './services/useFetchTreatmentSalon'
import api from 'src/services/api'
import { useHistory } from 'react-router-dom'
import { useSubject } from './hooks/useSubject'
import { useFilterSubject } from './hooks/useFilterSubject'

function Appointment() {
  const [isModalOpen, setIsModalOpen] = useState()
  const { handleDatas, subjectData, handleDeleteSubject } = useSubject()
  const { fields, searching, filteredData, searchBySubject, handlefilterBy } = useFilterSubject()

  useEffect(() => {
    handleDatas()
  }, [])

  const handleEdit = () => {
    console.log('delete')
    setIsModalOpen(true)
  }
  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Inserir Disciplina </CModalTitle>
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
                  <CFormSelect name="selectSm" id="SelectLm" onChange={handlefilterBy}>
                    <option value="null">Please select</option>
                    {fields?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                    /
                  </CFormSelect>
                </CCol>
                <CCol md="7">
                  <CFormLabel htmlFor="pesq">Pesquisar</CFormLabel>
                  <CForm inline>
                    <CFormInput
                      className="mr-sm-2"
                      placeholder="Search"
                      id="pesq"
                      style={{ width: '80%' }}
                      onChange={searchBySubject}
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
              <h4>Disciplinas</h4>

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
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Disciplina</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {!searching
                  ? subjectData?.map(({ id, nome }, idx) => (
                      <CTableRow key={id}>
                        <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                        <CTableDataCell>{nome}</CTableDataCell>
                        <CTableDataCell>{null}</CTableDataCell>
                        <CTableDataCell>
                          <TreatmentListItemActionsDropdown
                            onEdit={handleEdit}
                            onRemove={() => handleDeleteSubject(id)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  : filteredData?.map(({ id, nome }, idx) => (
                      <CTableRow key={id}>
                        <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                        <CTableDataCell>{nome}</CTableDataCell>
                        <CTableDataCell>{null}</CTableDataCell>
                        <CTableDataCell>
                          <TreatmentListItemActionsDropdown
                            onEdit={handleEdit}
                            onRemove={() => handleDeleteSubject(id)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Appointment
