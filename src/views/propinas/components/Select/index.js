import React from 'react'
import { CFormLabel, CFormSelect } from '@coreui/react'

export function Select({ data, func, label }) {
  return (
    <>
      <CFormLabel htmlFor="selectSm">{label}</CFormLabel>
      <CFormSelect name="selectSm" id="SelectLm" onChange={func}>
        <option value={null}>Please select</option>
        {data?.map((item, index) => (
          <option key={index} value={item?.designacao}>
            {item?.designacao ? item?.designacao : item}
          </option>
        ))}
      </CFormSelect>
    </>
  )
}
