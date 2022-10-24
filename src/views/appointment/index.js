import React, { useState, useContext, useEffect } from 'react'
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
import { AuthContext } from 'src/contexts/AuthContext'
//import { SaveAppointmentForm } from './components/SaveAppointmentForm'
import SaveAppointmentForm from './new/index'

import api from 'src/services/api'

function Appointment() {
  const { user } = useContext(AuthContext)
  const [matriculas, setMatriculas] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()

  const searchBy = (event) => {
    const { value } = event.target
    const newData = filteredData?.filter(
      (item) => String(item[filterBy]).toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1,
    )
    setFilteredData(newData)
  }

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       /*const result = await api.get(`/agendamento/${user?.id}`)
  //       console.log({ result: result?.data })
  //       setAgendamentos(result.data)*/
  //     } catch (error) {
  //       console.log(error.response.data)
  //     }
  //   })()
  // }, [user])

  const handleClickNewAppointment = () => {
    setIsModalOpen((currentValue) => !currentValue)
  }

  const fields = ['nome', 'biNumber']

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} fullscreen>
        <CModalHeader>
          <CModalTitle>Matrícula </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <SaveAppointmentForm
            setIsModalOpen={setIsModalOpen}
            onFormData={(data) => setMatriculas([...matriculas, data])}
          />
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
                  <CFormLabel
                    htmlFor="selectSm"
                    onChange={(event) => setFilterBy(event.target.value)}
                  >
                    Filtrar por
                  </CFormLabel>
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
                  <CFormLabel htmlFor="pesq">Pesquisar</CFormLabel>
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
              <h4>Efectuar Matrícula</h4>

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
                  ({ id, firstName, lastName, biNumber, gender, birthDate, estado }, idx) => (
                    <CTableRow v-for="item in tableItems" key={id}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src="https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
                          status="success"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{`${firstName} ${lastName}`}</div>
                        <div className="small text-medium-emphasis">Registrado em: 21/10/2022</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{biNumber}</CTableDataCell>
                      <CTableDataCell>{gender}</CTableDataCell>
                      <CTableDataCell className="text-center">{birthDate}</CTableDataCell>
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
