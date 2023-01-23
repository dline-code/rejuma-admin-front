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

export function Table({ data, handleDeleteTurma, handleEdit }) {
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Turma</CTableHeaderCell>
            <CTableHeaderCell scope="col">Classe</CTableHeaderCell>
            <CTableHeaderCell scope="col">Turno</CTableHeaderCell>
            {/* <CTableHeaderCell scope="col">Curso</CTableHeaderCell> */}
            <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.map(({ id, nome, classe, turno }, idx) => (
            <CTableRow key={id}>
              <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{nome}</CTableDataCell>
              <CTableDataCell>{classe?.classe}</CTableDataCell>
              <CTableDataCell>{turno?.designacao}</CTableDataCell>
              {/* <CTableDataCell>{curso?.nome}</CTableDataCell> */}
              <CTableDataCell>
                <TreatmentListItemActionsDropdown
                  onEdit={() => handleEdit({ id, nome })}
                  data={{ id, nome }}
                  onRemove={() => handleDeleteTurma(id)}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
