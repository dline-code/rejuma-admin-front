import { CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React from 'react'
import { FilterSelect } from './FilterSelect'

const fields = [
  { desc: 'Nome', value: 'name' },
  { desc: 'Número de BI', value: 'biNumber' },
]

export function FilterForm({ search, setFilterBy }) {
  return (
    <CForm>
      <CRow className="mb-3 d-flex align-items-end">
        <CCol md="3">
          <FilterSelect fields={fields} setFilterBy={setFilterBy} />
        </CCol>
        <CCol md="6">
          <CFormLabel htmlFor="search">Pesquisar</CFormLabel>
          <CFormInput
            name="search"
            className="mr-sm-2"
            placeholder="Digite aqui a pesquisa"
            style={{ width: '80%' }}
            onChange={search}
          />
        </CCol>
      </CRow>
    </CForm>
  )
}
