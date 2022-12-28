import React from 'react'
import {
  CTableDataCell,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
} from '@coreui/react'
import { TreatmentListItemActionsDropdown } from '../ListItemActionsDropdown'

export function Table({ data, handleDeleteSubject, handleEdit }) {
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Disciplina</CTableHeaderCell>
            <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.map(({ id, nome }, idx) => (
            <CTableRow key={id}>
              <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{nome}</CTableDataCell>
              <CTableDataCell>{null}</CTableDataCell>
              <CTableDataCell>
                <TreatmentListItemActionsDropdown
                  onEdit={() => handleEdit({ id, nome })}
                  data={{ id, nome }}
                  onRemove={() => handleDeleteSubject(id)}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
