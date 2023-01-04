import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { FuncionariosListItemActionsDropdown } from '../ListItemActionsDropdown'
export function Table({ data, handleEdit, handleRemove }) {
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cargo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.map(({ id, nome, tipoUsuario }, idx) => (
            <CTableRow key={id}>
              <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{nome}</CTableDataCell>
              <CTableDataCell>{tipoUsuario?.designacao}</CTableDataCell>
              <CTableDataCell>
                <FuncionariosListItemActionsDropdown
                  onEdit={handleEdit}
                  onRemove={() => handleRemove(id)}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
