import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import React from 'react'
import { useRecordsContext } from 'src/contexts/RecordsContext'
import ActionButtons from '../actionsButtons'

import styles from './styles.module.scss'

function Step3(props) {
  const { lastStep, completeCallback } = props
  const {
    dataRecords: { grades, courses, shifts },
    applicant,
  } = useRecordsContext()

  const handleLastStep = () => {
    lastStep()
    completeCallback(applicant)
  }
  return (
    <div>
      <h4>Confirme os dados</h4>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableBody className={styles.confirmContainer}>
          <CTableRow v-for="item in tableItems">
            <CTableDataCell>
              <span>Nome:</span>
              {`${applicant.nome}  ${applicant.sobrenome}`}
            </CTableDataCell>
            <CTableDataCell>
              <span>Número de BI:</span>
              {applicant.n_BI}
            </CTableDataCell>
            <CTableDataCell></CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell>
              <span>Nome do Pai:</span>
              {applicant.nome_do_pai}
            </CTableDataCell>
            <CTableDataCell>
              <span>Nome da Mãe:</span>
              {applicant.nome_da_mae}
            </CTableDataCell>
            <CTableDataCell></CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell>
              <span>Natural:</span>
              {applicant.natural}
            </CTableDataCell>
            <CTableDataCell>
              <span>Nacionalidade:</span>
              {applicant.nacionalidade}
            </CTableDataCell>
            <CTableDataCell>
              <span>Data Nascimento:</span>
              {applicant.dataNascimento}
            </CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell>
              <span>classe:</span>
              {grades.filter(({ id }) => id === applicant.classeId)[0]?.classe}
            </CTableDataCell>
            <CTableDataCell>
              <span>curso:</span>
              {courses.filter(({ id }) => id === applicant.cursoId)[0]?.nome}
            </CTableDataCell>
            <CTableDataCell>
              <span>turno:</span>
              {shifts.filter(({ id }) => id === applicant.turnoId)[0]?.designacao}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  )
}

export default Step3
