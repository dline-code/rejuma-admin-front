import React from 'react'
import { useRecordsContext } from 'src/contexts/RecordsContext'
import ActionButtons from '../actionsButtons'

import styles from './styles.module.scss'

function Step3(props) {
  const { lastStep, completeCallback } = props
  const {
    dataRecords: { grades, shifts, usersKind, classes },
    applicant,
  } = useRecordsContext()

  const handleLastStep = () => {
    lastStep()
    completeCallback()
  }

  const cursos = [
    { id: '1', name: 'Informática' },
    { id: '2', name: 'Contablidade' },
    { id: '3', name: 'Pedagogia' },
    { id: '4', name: 'Gestão' },
  ]

  const filterToShow = (array, objectId) => {
    const filterObject = array.filter((item) => item.id === objectId)
    console.log(filterObject)
  }

  filterToShow(grades, applicant.classeId)
  return (
    <div>
      <h2>Confirme seus dados</h2>
      <div className={styles.confirmContainer}>
        <p>
          <span>Número de BI:</span>
          {applicant.n_BI}
        </p>
        <p>
          <span>Natural:</span>
          {applicant.natural}
        </p>
        <p>
          <span>Nacionalidade:</span>
          {applicant.nacionalidade}
        </p>
        <p>
          <span>Nome:</span>
          {`${applicant.nome}  ${applicant.sobrenome}`}
        </p>
        <p>
          <span>Data Nascimento:</span>
          {applicant.dataNascimento}
        </p>
        <p>
          <span>Nome do Pai:</span>
          {applicant.nome_do_pai}
        </p>
        <p>
          <span>Nome da Mãe:</span>
          {applicant.nome_da_mae}
        </p>
        <p>
          <span>classe:</span>
          {grades.filter(({ id }) => id === applicant.classeId)[0]?.classe}
        </p>
        <p>
          <span>curso:</span>
          {cursos.filter(({ id }) => id === applicant.cursoId)[0]?.name}
        </p>
        <p>
          <span>turno:</span>
          {shifts.filter(({ id }) => id === applicant.turnoId)[0]?.designacao}
        </p>
        <p>
          <span>Turma:</span>
          {classes.filter(({ id }) => id === applicant.turmaId)[0]?.nome}
        </p>
        <p>
          <span>Está a se Matricular:</span>
          {usersKind.filter(({ id }) => id === applicant.tipoUsuarioId)[0]?.designacao}
        </p>
      </div>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  )
}

export default Step3
