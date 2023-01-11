import React, { useState } from 'react'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
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
import { NewEnrollment } from './new/index'
import { FilterForm } from './components/Filter/FilterForm'
import { useEnrollment } from './hooks'

function Appointment() {
  const [matriculas, setMatriculas] = useState([])
  const { data } = useEnrollment(setMatriculas)
  const [isModalOpen, setIsModalOpen] = useState()
  const [filterBy, setFilterBy] = useState('name')

  const handleCreateNewEnrollment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  const handleFilterData = (event) => {
    const searched = event?.target.value.toLowerCase()
    console.log(data)

    const newData = data.filter((matriculaData) => {
      if (filterBy === 'name') {
        if (matriculaData.nome.toLowerCase().includes(searched)) {
          return matriculaData
        }
      }
      if (filterBy === 'biNumber') {
        if (matriculaData.n_BI.toLowerCase().includes(searched)) {
          return matriculaData
        }
      }
    })
    setMatriculas(newData)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} fullscreen>
        <CModalHeader>
          <CModalTitle>Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <NewEnrollment setIsModalOpen={setIsModalOpen} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>

      <div>
        <CCard className="mb-4">
          <CCardHeader>Dados de Pesquisa</CCardHeader>
          <CCardBody>
            <FilterForm search={handleFilterData} setFilterBy={setFilterBy} />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            <CCol className="d-flex justify-content-between mb-2">
              <h4>Efectuar Matrícula</h4>

              <CButton onClick={handleCreateNewEnrollment} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </CCol>

            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Nº</CTableHeaderCell>
                  <CTableHeaderCell>Nome Completo</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Nº do BI</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Data de nascimento</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {matriculas?.map(
                  (
                    { id, nome, sobrenome, createdAt, n_BI, dataNascimento, estadoUsuario },
                    idx,
                  ) => (
                    <CTableRow v-for="item in tableItems" key={id}>
                      <CTableDataCell>{idx + 1}</CTableDataCell>
                      <CTableDataCell>
                        <div>{`${nome} ${sobrenome}`}</div>
                        <div className="small text-medium-emphasis">Registrado em: {createdAt}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{n_BI}</CTableDataCell>
                      <CTableDataCell className="text-center">{dataNascimento}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {estadoUsuario === null ? null : (
                          <CRow>
                            <CCol>
                              <CButton color="success">Aprovar</CButton>
                            </CCol>
                            <CCol>
                              <CButton color="danger">Rejeitar</CButton>
                            </CCol>
                          </CRow>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ),
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Appointment
