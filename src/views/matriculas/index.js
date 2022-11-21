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
  CAvatar,
  CProgress,
} from '@coreui/react'
import { cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import SaveAppointmentForm from './new/index'
import { AppointmentProvider } from 'src/contexts/AppointmentContext'
import api from 'src/services/api'
import { useQuery } from 'react-query'

function Appointment() {
  const [matriculas, setMatriculas] = useState([])
  const [isModalOpen, setIsModalOpen] = useState()

  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  const { data } = useQuery('enrolledData', async () => {
    const enrolled = await api.get('/matricula/listar')

    console.log('nova query')

    setMatriculas(enrolled.data)

    return enrolled.data
  })

  //---------------------------------------------------
  const fields = [
    { name: 'Nome', value: 'name' },
    { name: 'Número de BI', value: 'biNumber' },
  ]

  const handleFilterDataBy = (event) => {
    event.preventDefault()
    const searchKind = event.target.elements.searchKind.value
    const search = event.target.elements.search.value.toLowerCase()

    if (searchKind === 'name') {
      setMatriculas(
        data?.filter(
          ({ nome, sobrenome }) =>
            nome.toLowerCase().includes(search) || sobrenome.toLowerCase().includes(search),
        ),
      )
    } else if (searchKind === 'biNumber') {
      setMatriculas(data?.filter(({ n_BI }) => n_BI && n_BI.toLowerCase().includes(n_BI)))
    }
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} fullscreen>
        <CModalHeader>
          <CModalTitle>Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AppointmentProvider>
            <SaveAppointmentForm
              setIsModalOpen={setIsModalOpen}
              onFormData={(data) => setMatriculas([...matriculas, data])}
            />
          </AppointmentProvider>
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
            <CForm onSubmit={handleFilterDataBy}>
              <CRow className="mb-3 d-flex align-items-end">
                <CCol md="3">
                  <CFormLabel htmlFor="selectSm">Filtrar por</CFormLabel>
                  <CFormSelect name="searchKind" id="SelectLm">
                    {fields?.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                    /
                  </CFormSelect>
                </CCol>
                <CCol md="6">
                  <CFormLabel htmlFor="search">Pesquisar</CFormLabel>
                  <CFormInput
                    name="search"
                    className="mr-sm-2"
                    placeholder="Digite aqui a pesquisa"
                    style={{ width: '80%' }}
                  />
                </CCol>
                <CCol md="3">
                  <CButton color="outline-info" className="my-2 my-sm-0" type="submit">
                    Search
                  </CButton>
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
              <h4>Efectuar Matrícula</h4>

              <CButton onClick={handleClickNewAppointment} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </div>
            {/* <div className="mb-40">
              <div className="mb-3" width="100px">
                <CFormLabel htmlFor="exampleFormControlInput1">Pesquise por algo</CFormLabel>
                //filtrar aqui por pesquisa *
                <CFormInput type="search" id="exampleFormControlInput1" />
              </div>
            </div> */}
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Nome </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Nº do BI</CTableHeaderCell>
                  <CTableHeaderCell>Género</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Data de nascimento</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {matriculas?.map(
                  ({ id, nome, sobrenome, n_BI, gender, dataNascimento, estado }, idx) => (
                    <CTableRow v-for="item in tableItems" key={id}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src="https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
                          status="success"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{`${nome} ${sobrenome}`}</div>
                        <div className="small text-medium-emphasis">Registrado em: 21/10/2022</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{n_BI}</CTableDataCell>
                      <CTableDataCell>{gender}</CTableDataCell>
                      <CTableDataCell className="text-center">{dataNascimento}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="clearfix">
                          <small className="text-medium-emphasis">Activo</small>
                        </div>
                        <CProgress thin color={'success'} value={50} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CRow>
                          <CCol>
                            <CButton color="success">Aprovar</CButton>
                          </CCol>
                          <CCol>
                            <CButton color="danger">Rejeitar</CButton>
                          </CCol>
                        </CRow>
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
