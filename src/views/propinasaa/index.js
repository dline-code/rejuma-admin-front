import * as React from 'react'
import { cilCaretLeft, cilCaretRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CContainer,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Link from 'react-router-dom/Link'
import FilterDropDown from './filterDropDown'
import { propinasData } from './data'

function Propinas() {
  return (
    <CContainer>
      <CCard>
        <CCardHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CCardTitle> Propinas </CCardTitle>
          <div>
            <CButton style={{ marginRight: '5px' }}>
              <FilterDropDown />
            </CButton>
            <Link to="/propinas/create">
              <CButton>Novo Pagamento</CButton>
            </Link>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Classe</CTableHeaderCell>
                <CTableHeaderCell width={'35%'}>Nome</CTableHeaderCell>
                <CTableHeaderCell>Último Mês Pago</CTableHeaderCell>
                <CTableHeaderCell>Data do último Pagamento</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {propinasData &&
                propinasData.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell> {index + 1} </CTableDataCell>
                    <CTableDataCell> {item.classe} </CTableDataCell>
                    <CTableDataCell> {item.name} </CTableDataCell>
                    <CTableDataCell> {item.lastMonthPaid} </CTableDataCell>
                    <CTableDataCell> {item.lastPaymentDate} </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
            <CTableFoot></CTableFoot>
          </CTable>
        </CCardBody>
        <CCardFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CPagination>
            <CPaginationItem>
              <CIcon icon={cilCaretLeft} />
            </CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>...</CPaginationItem>
            <CPaginationItem>60</CPaginationItem>
            <CPaginationItem>
              <CIcon icon={cilCaretRight} />
            </CPaginationItem>
          </CPagination>
        </CCardFooter>
      </CCard>
    </CContainer>
  )
}

export default Propinas
