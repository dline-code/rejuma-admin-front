import React, { useState } from 'react'
import { CForm, CFormInput, CFormLabel, CRow, CCol, CFormSelect } from '@coreui/react'

import ActionButtons from '../actionsButtons'
import { useForm } from 'react-hook-form'
import { useRecordsContext } from 'src/contexts/RecordsContext'

function Step2(props) {
  const {
    dataRecords: { grades, shifts, usersKind, classes },
    setApplicant,
  } = useRecordsContext()
  const [showCurso, setShowCurso] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const handleChooseGrade = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value

    if (targetName === 'classe') {
      if (Number(targetValue) < 10) {
        setShowCurso(false)
      } else {
        setShowCurso(true)
      }
    }
  }

  const validate = () => {
    if (isValid) console.log('valido')
  }

  const handleIncrementApplicantInfo = (data) => {
    console.log(data)

    if (isValid) {
      props.nextStep()
      setApplicant((applicant) => ({
        ...applicant,
        ...data,
      }))
    }
  }

  console.log(usersKind)
  return (
    <div>
      <h1>Dados pessoais</h1>
      <CForm onSubmit={handleSubmit(handleIncrementApplicantInfo)}>
        <CRow>
          <CCol>
            <CFormLabel> Classe </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              {...register('classeId', { required: 'Selecione uma classe' })}
              onChange={handleChooseGrade}
            >
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.classe}
                </option>
              ))}
            </CFormSelect>
            <span style={{ color: 'red' }}>{errors.classe?.message}</span>
          </CCol>
          {showCurso && (
            <CCol>
              <CFormLabel> Curso </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                {...register('cursoId', { required: 'Selecione um curso' })}
              >
                <option value="1">Informática</option>
                <option value="2">Contablidade</option>
                <option value="3">Pedagogia</option>
                <option value="3">Gestão</option>
              </CFormSelect>
              <span style={{ color: 'red' }}>{errors.curso?.message}</span>
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
            <span style={{ color: 'red' }}>{errors.turno?.message}</span>
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
            <span style={{ color: 'red' }}>{errors.turno?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Nome do Encarregado de Educação </CFormLabel>
            <CFormInput
              {...register('sponsorEducation', { required: 'Informe o nome do resposavél' })}
            />
            <span style={{ color: 'red' }}>{errors.sponsorEducation?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Residência </CFormLabel>
            <CFormInput {...register('morada', { required: 'Digite a sua morada' })} />
            <span style={{ color: 'red' }}>{errors.morada?.message}</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Profissão </CFormLabel>
            <CFormInput {...register('profissao', { required: 'Escreva um emcargo' })} />
            <span style={{ color: 'red' }}>{errors.profissao?.message}</span>
          </CCol>

          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Contacto </CFormLabel>
            <CFormInput
              type="tel"
              {...register('telephone', {
                required: 'Informe o seu contacto',
                maxLength: { value: 9, message: 'Numero de telefone inválido' },
              })}
            />
            <span style={{ color: 'red' }}>{errors.telephone?.message}</span>
          </CCol>
        </CRow>
        <br />
        <ActionButtons {...props} nextStep={validate} />
      </CForm>
    </div>
  )
}

export default Step2
