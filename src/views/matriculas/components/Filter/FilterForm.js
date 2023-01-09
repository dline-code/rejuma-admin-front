import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React from 'react'
import { FilterSelect } from './FilterSelect'

const fields = [
  { desc: 'Nome', value: 'name' },
  { desc: 'Número de BI', value: 'biNumber' },
]

export function FilterForm({ handleSubmit }) {
  return (
    <CForm onSubmit={handleSubmit}>
      <CRow className="mb-3 d-flex align-items-end">
        <CCol md="3">
          <FilterSelect fields={fields} />
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
  )
}
