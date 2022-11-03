import React from 'react'

import { CButton, CFormLabel, CFormInput, CFormSelect } from '@coreui/react'

export const SaveAppointmentForm = () => {
  return (
    <form>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Nome do estudante</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput id="exampleFormControlInput1" />
        </div>
      </div>
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Cliente</CFormLabel>
        <CFormSelect aria-label="Default select example">
          <option>Selecione um cliente</option>
          <option value="1">João Amadeu</option>
          <option value="2">Mateus Alexandre</option>
          <option value="3">Genilson Araújo</option>
        </CFormSelect>
      </div>
      <CButton color="primary">Salvar</CButton>
    </form>
  )
}
