import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { TreatmentListItemActionsDropdown } from '../ListItemActionsDropdown'
import { useBribe } from '../../hooks/useBribe'

export function Table({ data, handleEdit, handleRemove }) {
  const { monthData } = useBribe()
  const getLastMonth = (id) => {
    const data = monthData?.find((month) => month.id === id)
    return data?.designacao
  }
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
            <CTableHeaderCell scope="col">Classe</CTableHeaderCell>
            <CTableHeaderCell scope="col">valor</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pago em</CTableHeaderCell>
            <CTableHeaderCell scope="col">Até mês de</CTableHeaderCell>
            <CTableHeaderCell scope="col">Quantidade de meses</CTableHeaderCell>
            <CTableHeaderCell scope="col">Multa</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.map(({ id, estudante, valor, mesDe, multa, ateMesId, quantidadeMes }, idx) => (
            <CTableRow key={idx}>
              <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{estudante?.nome}</CTableDataCell>
              <CTableDataCell>{estudante?.classe?.classe}</CTableDataCell>
              <CTableDataCell>{valor?.toString() + 'Kz'}</CTableDataCell>
              <CTableDataCell>{mesDe?.designacao}</CTableDataCell>
              <CTableDataCell>{getLastMonth(ateMesId)}</CTableDataCell>
              <CTableDataCell>{quantidadeMes}</CTableDataCell>
              <CTableDataCell>{multa + 'Kz'}</CTableDataCell>
              <CTableDataCell>
                <TreatmentListItemActionsDropdown
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
