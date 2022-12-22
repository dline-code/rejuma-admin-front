import React from 'react'
import { CFormSelect, CFormLabel } from '@coreui/react'
export function Select({ label, data, handlefilterBy }) {
  return (
    <>
      <CFormLabel htmlFor="selectSm">{label}</CFormLabel>
      <CFormSelect name="selectSm" id="SelectLm" onChange={handlefilterBy}>
        <option value="null">{'Please select'}</option>
        {data?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </CFormSelect>
    </>
  )
}
