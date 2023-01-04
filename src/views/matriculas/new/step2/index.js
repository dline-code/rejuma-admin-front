import React, { useState } from 'react'
import { CForm, CFormLabel, CRow, CCol, CFormSelect } from '@coreui/react'

import ActionButtons from '../actionsButtons'
import { useForm } from 'react-hook-form'
import { useRecordsContext } from 'src/contexts/RecordsContext'

function Step2(props) {
  const {
    dataRecords: { grades, courses, shifts, usersType, classes },
    setApplicant,
  } = useRecordsContext()
  const [showCurso, setShowCurso] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const handleChooseGrade = (event) => {
    console.log('targetValue')
    const targetName = event.target.name
    const targetValue = event.target.value

    if (targetName === 'classeId') {
      if (Number(targetValue.slice(0, 2)) >= 10) {
        setShowCurso(true)
        return
      }
      setShowCurso(false)
    }
  }

  const validate = () => {
    if (isValid) return
  }

  const handleIncrementApplicantInfo = (data) => {
    if (isValid) {
      props.nextStep()
      setApplicant((applicant) => ({
        ...applicant,
        ...data,
      }))
    }
  }

  return (
    <div>
      <h4>Informações Acádemicas</h4>
      <CForm onSubmit={handleSubmit(handleIncrementApplicantInfo)}>
        <CRow>
          <CCol>
            <CFormLabel> Classe </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              {...register('classeId', { required: 'Selecione uma classe' })}
              onSelect={handleChooseGrade}
            >
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.classe}
                </option>
              ))}
            </CFormSelect>
            <span style={{ color: 'red' }}>{errors.classeId?.message}</span>
          </CCol>

          {showCurso && (
            <CCol>
              <CFormLabel> Curso </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                {...register('cursoId', { required: 'Selecione um curso' })}
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.nome}
                  </option>
                ))}
              </CFormSelect>
              <span style={{ color: 'red' }}>{errors.cursoId?.message}</span>
            </CCol>
          )}
          <CCol>
            <CFormLabel> Turno </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              {...register('turnoId', { required: 'Selecione um Turno' })}
            >
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.designacao}
                </option>
              ))}
            </CFormSelect>
            <span style={{ color: 'red' }}>{errors.turnoId?.message}</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Turma </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              {...register('turmaId', { required: 'Selecione a Turma' })}
            >
              {classes.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.nome}
                </option>
              ))}
            </CFormSelect>
            <span style={{ color: 'red' }}>{errors.turmaId?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> A Matricular </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              {...register('tipoUsuarioId', { required: 'Selecione a pessoa a ser matriculada' })}
            >
              {usersType.map((userType) => (
                <option key={userType.id} value={userType.id}>
                  {userType.designacao}
                </option>
              ))}
            </CFormSelect>
            <span style={{ color: 'red' }}>{errors.tipoUsuarioId?.message}</span>
          </CCol>
        </CRow>
        <br />
        <ActionButtons {...props} nextStep={validate} />
      </CForm>
    </div>
  )
}

export default Step2
