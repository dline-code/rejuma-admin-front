import React, { useState } from 'react'
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
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { EstudantesListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { SaveTreatmentForm } from './components/SaveEstudanteForm'
import api from 'src/services/api'
import { useHistory } from 'react-router-dom'
import { useFetchEstudantes } from './services/useFetchEstudantes'
import { useFilterDataOfStudent } from './hooks/useFilterDataOfStudent'

function Estudantes() {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState()
  const { fieldsClass, fieldsTurno } = useFetchEstudantes()
  const {
    fields,
    filterBy,
    FilterByClass,
    FilterByTurno,
    filteredData,
    searchByName,
    setFilterBy,
    searching,
    studentData,
  } = useFilterDataOfStudent()

  const handleEdit = () => {
    console.log('delete')
    setIsModalOpen(true)
  }

  const handleRemove = (treatmentSalonId) => {
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
          await api.delete(`/treatmentsalon/${treatmentSalonId}`)
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
                  <CFormSelect
                    name="selectSm"
                    id="SelectLm"
                    onChange={(event) => setFilterBy(event.target.value)}
                  >
                    <option value="null">Please select</option>
                    {fields?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                    /
                  </CFormSelect>
                  {filterBy === 'Classe' ? (
                    <CFormSelect
                      name="selectSm"
                      id="SelectLm"
                      className="mt-2"
                      onChange={FilterByClass}
                    >
                      <option value="null">Por favor selecione a sua classe</option>
                      {fieldsClass?.map((item, index) => (
                        <option key={item.id} value={item.classe}>
                          {item.classe}
                        </option>
                      ))}
                    </CFormSelect>
                  ) : null}
                  {filterBy === 'Período' ? (
                    <CFormSelect
                      name="selectSm"
                      id="SelectLm"
                      className="mt-2"
                      onChange={FilterByTurno}
                    >
                      <option value="null">Por favor selecione o seu Turno</option>
                      {fieldsTurno?.map((item, index) => (
                        <option key={item.id} value={item.designacao}>
                          {item.designacao}
                        </option>
                      ))}
                    </CFormSelect>
                  ) : null}
                </CCol>
                <CCol md="7">
                  <CFormLabel htmlFor="pesq"> Pesquisar </CFormLabel>
                  <CForm inline>
                    <CFormInput
                      className="mr-sm-2"
                      placeholder="Search"
                      id="pesq"
                      style={{ width: '80%' }}
                      onChange={searchByName}
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
              <h4>Estudantes</h4>

              <CButton onClick={handleClickNewAppointment} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </div>
            <div className="mb-40">
              <div className="mb-3" width="100px">
                <CFormLabel htmlFor="exampleFormControlInput1">Pesquise por algo</CFormLabel>
                <CFormInput type="search" onChange={searchByName} id="exampleFormControlInput1" />
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome Completo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Turno</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Classe</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Turma</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {!searching
                  ? filteredData?.map(({ id, nome, classe, turma, turno }, idx) => (
                      <CTableRow key={id}>
                        <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                        <CTableDataCell>{nome}</CTableDataCell>
                        <CTableDataCell>{turno?.designacao}</CTableDataCell>
                        <CTableDataCell>{classe?.classe}</CTableDataCell>
                        <CTableDataCell>{turma?.nome}</CTableDataCell>
                        <CTableDataCell>
                          <div className="clearfix">
                            <small className="text-medium-emphasis">Activo</small>
                          </div>
                          <CProgress thin color={'success'} value={100} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <EstudantesListItemActionsDropdown
                            onEdit={handleEdit}
                            onRemove={() => handleRemove(id)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  : studentData?.map(({ id, nome, classe, turma, turno }, idx) => (
                      <CTableRow key={id}>
                        <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                        <CTableDataCell>{nome}</CTableDataCell>
                        <CTableDataCell>{turno?.designacao}</CTableDataCell>
                        <CTableDataCell>{classe?.classe}</CTableDataCell>
                        <CTableDataCell>{turma?.nome}</CTableDataCell>
                        <CTableDataCell>
                          <div className="clearfix">
                            <small className="text-medium-emphasis">Activo</small>
                          </div>
                          <CProgress thin color={'success'} value={100} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <EstudantesListItemActionsDropdown
                            onEdit={handleEdit}
                            onRemove={() => handleRemove(id)}
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

export default Estudantes
