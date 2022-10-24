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

function NewPropinaPayment() {
  const [dateIsInterval, setDateIsInterval] = useState(true)

  return (
    <>
      <CCard>
        <CCardHeader>Pagamento de Propinas</CCardHeader>
        <CCardBody>
          <CForm>
            <CContainer>
              <CRow>
                <CCol>
                  <CFormLabel htmlFor="name"> Nome do Aluno </CFormLabel>
                  <CFormInput id="name" />
                </CCol>

                <CCol>
                  <CFormLabel htmlFor="classe"> Classe do Aluno </CFormLabel>
                  <CFormInput id="classe" />
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
                  <CFormInput id="valueToPay" />

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
                  <CButton> Adicionar Novo Pagamento </CButton>
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
