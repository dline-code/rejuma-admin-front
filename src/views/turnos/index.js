import React, { useRef } from 'react'
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
import { TreatmentListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { useState } from 'react'
import { CreateShiftsForm } from './components/CreateShiftsForm'
import { useHistory } from 'react-router-dom'
import { EditShiftsForm } from './components/EditShiftsForm'
import { useShift } from './hook/useShift'
import { deleteShift } from './service/fetchMethods'

function Appointment() {
  const history = useHistory()
  const formFilterElement = useRef()
  const [shifts, setShifts] = useState([])
  const { data } = useShift(setShifts)

  const [currentShift, setCurrentShift] = useState({})
  const [isShiftEdit, setisShiftEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState()

  const handleFilterData = () => {
    const newData = []

    const searchType = formFilterElement.current.searchType.value
    const searched = formFilterElement.current.searched.value.toLowerCase()

    data.forEach((item) => {
      for (const key in item) {
        if (key === searchType && item[key].toLowerCase().includes(searched)) {
          newData.push(item)
        }
      }
    })

    setShifts(newData)
  }

  const handleEdit = (shift) => {
    setCurrentShift(shift)
    setisShiftEdit(true)
    setIsModalOpen(true)
  }

  const handleRemove = (turnoId) => {
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
          await deleteShift(turnoId)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
        } catch (error) {
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go(0)
      }
    })
  }

  const handleOpenCreateShiftsModal = () => {
    setisShiftEdit(false)
    setIsModalOpen((currentValue) => !currentValue)
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Turno </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {isShiftEdit ? <EditShiftsForm shiftData={currentShift} /> : <CreateShiftsForm />}
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
            <CForm ref={formFilterElement}>
              <CRow className="mb-3">
                <CCol md="5">
                  <CFormLabel htmlFor="searchType">Filtrar por</CFormLabel>
                  <CFormSelect defaultValue="" name="searchType" id="searchType">
                    <option value="" disabled>
                      Please select
                    </option>
                    <option value="designacao">Descrição</option>
                  </CFormSelect>
                </CCol>

                <CCol md="7">
                  <CFormLabel htmlFor="searched">Pesquisar</CFormLabel>
                  <CFormInput
                    name="searched"
                    className="mr-sm-2"
                    placeholder="Pesquise aqui!"
                    id="searched"
                    style={{ width: '80%' }}
                    onChange={handleFilterData}
                  />
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
              <h4>Turnos</h4>

              <CButton onClick={handleOpenCreateShiftsModal} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </div>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {shifts?.map((shift, idx) => (
                  <CTableRow key={shift.id}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{shift.designacao}</CTableDataCell>
                    <CTableDataCell>
                      <TreatmentListItemActionsDropdown
                        onEdit={() => handleEdit(shift)}
                        onRemove={() => handleRemove(shift.id)}
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
