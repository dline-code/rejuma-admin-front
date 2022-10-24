import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCol,
  CRow,
  CFormCheck,
  CButton,
} from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { anos, meses, formasDePagamento } from './data'

function NewPropinaPayment({ setIsModalOpen }) {
  const [dateIsInterval, setDateIsInterval] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsModalOpen(false)
  }

  return (
    <>
      <CCard>
        <CCardHeader>Pagamento de Propinas</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CContainer>
              <CRow>
                <CCol>
                  <CFormLabel> Nome do Aluno </CFormLabel>
                  <CFormSelect aria-label="Default select example" name="name">
                    <option value="1">André Pedro</option>
                    <option value="2">João Festo</option>
                    <option value="3">Felisberto Dande</option>
                    <option value="4">Paulo António</option>
                    <option value="5">Benedito Pedrosa</option>
                    <option value="6">Matuta Jorge</option>
                    <option value="7">Mário Varela</option>
                  </CFormSelect>
                </CCol>

                <CCol>
                  <CFormLabel> Classe do Aluno </CFormLabel>
                  <CFormSelect aria-label="Default select example" name="classe">
                    <option value="1">1ª classe</option>
                    <option value="2">2ª classe</option>
                    <option value="3">3ª classe</option>
                    <option value="4">4ª classe</option>
                    <option value="5">5ª classe</option>
                    <option value="6">6ª classe</option>
                    <option value="7">7ª classe</option>
                    <option value="8">8ª classe</option>
                    <option value="9">9ª classe</option>
                    <option value="10">10ª classe</option>
                    <option value="11">11ª classe</option>
                    <option value="12">12ª classe</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <br />

              <CRow>
                <CCol>
                  <CFormLabel htmlFor="selectMeses"> O mês que pretende Pagar </CFormLabel>
                  <CFormSelect id="selectMeses" options={meses} />

                  <br />

                  <CFormLabel htmlFor="selectAnos"> O ano que pretende Pagar </CFormLabel>
                  <CFormSelect id="selectAnos" options={anos} />

                  <br />
                  <CFormLabel htmlFor="addInterval">Adicionar intervalo</CFormLabel>
                  <CFormCheck
                    id="addInterval"
                    style={{ marginLeft: 5 }}
                    onChange={(e) =>
                      e.target.checked ? setDateIsInterval(false) : setDateIsInterval(true)
                    }
                  />
                </CCol>

                <CCol>
                  <CFormLabel htmlFor="selectMesesTo"> Até </CFormLabel>
                  <CFormSelect options={meses} id="selectMesesTo" disabled={dateIsInterval} />

                  <br />

                  <CFormLabel htmlFor="selectAnosTo"> Até </CFormLabel>
                  <CFormSelect options={anos} id="selectAnosTo" disabled={dateIsInterval} />
                </CCol>

                <CCol>
                  <CFormLabel htmlFor="valueToPay"> Valor a Pagar </CFormLabel>
                  <CFormInput id="valueToPay" type="number" />

                  <br />

                  <CFormLabel htmlFor="whoPaid"> A pessoa que pagou </CFormLabel>
                  <CFormInput id="whoPaid" />
                </CCol>

                <CCol>
                  <CFormLabel htmlFor="paymentMode"> Forma de pagamento </CFormLabel>
                  <CFormSelect options={formasDePagamento} id="paymentMode" />

                  <br />

                  <CFormLabel htmlFor="paymentReference"> Referência do Pagamento </CFormLabel>
                  <CFormInput id="paymentReference" />
                </CCol>
              </CRow>
              <CRow>
                <CCol
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    alignItems: 'flex-end',
                  }}
                >
                  <CButton type="submit"> Adicionar Novo Pagamento </CButton>
                </CCol>
              </CRow>
            </CContainer>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default NewPropinaPayment
