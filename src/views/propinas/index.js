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
import { TreatmentListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { useState } from 'react'
// import { SaveTreatmentForm } from './components/SaveTreatmentForm'
import AddPropina from './new'

// import { fetchTreatmentSalon } from './services/useFetchTreatmentSalon'
import api from 'src/services/api'
import { useHistory } from 'react-router-dom'
import { propinasData } from './data'

function Appointment() {
  const [treatmentSalon, setTreatmentSalon] = useState([])
  const [filteredData, setFilteredData] = useState(treatmentSalon)
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()
  const history = useHistory()

  const searchBy = (event) => {
    const { value } = event.target
    const newData = filteredData?.filter(
      (item) => String(item[filterBy]).toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1,
    )
    setFilteredData(newData)
  }

  useEffect(() => {
    const dataFunc = [
      {
        id: 1,
        nome: 'Informática de Gestão',
        cargo: 'Lorem ipsum sit dolor amet',
      },
    ]
    setTreatmentSalon(dataFunc)
  }, [])

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

  const fields = ['nome', 'classe']

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
                  <CFormLabel htmlFor="selectSm">Filtrar por</CFormLabel>
                  <CFormSelect name="selectSm" id="SelectLm" onChange={(e) => console.log(e)}>
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
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Classe</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Último mês pago</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data do último pagamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {propinasData?.map(({ id, classe, name, lastMonthPaid, lastPaymentDate }, idx) => (
                  <CTableRow key={id}>
                    <CTableHeaderCell scope="row">{id}</CTableHeaderCell>
                    <CTableDataCell>{name}</CTableDataCell>
                    <CTableDataCell>{classe}</CTableDataCell>
                    <CTableDataCell>{lastMonthPaid}</CTableDataCell>
                    <CTableDataCell>{lastPaymentDate}</CTableDataCell>
                    <CTableDataCell>
                      <TreatmentListItemActionsDropdown
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

export default Appointment
