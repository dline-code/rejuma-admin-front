import React, { useState } from 'react'
import { CFormSelect, CFormLabel } from '@coreui/react'
export function Select({ label, data, handleFilterBy }) {
  return (
    <>
      <CFormLabel htmlFor="selectSm">{label}</CFormLabel>
      <CFormSelect name="selectSm" id="SelectLm" onChange={handleFilterBy}>
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
