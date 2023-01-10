import React from 'react'
import { CFormLabel, CFormSelect } from '@coreui/react'

export function FilterSelect({ fields }) {
  return (
    <>
      <CFormLabel htmlFor="searchType">Filtrar por</CFormLabel>

      <CFormSelect name="searchType" id="searchType">
        <option disabled>Selecione um Campo</option>
        {fields.map(({ value, desc }) => (
          <option key={value} value={value}>
            {desc}
          </option>
        ))}
      </CFormSelect>
    </>
  )
}
