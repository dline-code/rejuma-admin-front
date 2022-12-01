import React from 'react'
import { CForm, CFormInput, CFormLabel, CCol, CRow } from '@coreui/react'
import ActionButtons from '../actionsButtons'
import { useForm } from 'react-hook-form'
import { useRecordsContext } from 'src/contexts/RecordsContext'

function Step1(props) {
  const { setApplicant } = useRecordsContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const validate = () => {
    if (isValid) props.nextStep()
  }

  const handleIncrementApplicantInfo = (data) => {
    setApplicant(data)
  }

  return (
    <div>
      <h2>Cadastro</h2>
      <CForm onSubmit={handleSubmit(handleIncrementApplicantInfo)}>
        <CRow>
          <CCol>
            <CFormLabel>Número do BI</CFormLabel>
            <CFormInput
              {...register('n_BI', {
                required: 'O Nº BI é necessário',
                pattern: {
                  value: /^[0-9]{9}[A-Z]{2}[0-9]{3}$/,
                  message: 'Número de Bilhete está inválido',
                },
              })}
            />
            <span style={{ color: 'red' }}>{errors.biNumber?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel> Natural </CFormLabel>
            <CFormInput
              placeholder="Provícia-Município"
              {...register('natural', {
                required: 'O local de nascimento é necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.emissionDate?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel> Nacionalidade </CFormLabel>
            <CFormInput
              {...register('nacionalidade', {
                required: 'Informe a sua nacionalidade',
              })}
            />
            <span style={{ color: 'red' }}>{errors.expirationDate?.message}</span>
          </CCol>
        </CRow>
        <br />

        <CRow>
          <CCol>
            <CFormLabel> Primeiro Nome </CFormLabel>
            <CFormInput
              {...register('nome', {
                required: 'O primeiro nome é necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.firstName?.message}</span>
          </CCol>

          <CCol>
            <CFormLabel> Último Nome </CFormLabel>
            <CFormInput
              {...register('sobrenome', {
                required: 'Este nome é necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.lastName?.message}</span>
          </CCol>
          <CCol>
            <CFormLabel> Data de Nascimento </CFormLabel>
            <CFormInput
              type="date"
              {...register('dataNascimento', {
                required: 'a Data de Nascimento é necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.birthDate?.message}</span>
          </CCol>
        </CRow>
        <br />
        <CRow>
          <CCol>
            <CFormLabel> Nome do Pai </CFormLabel>
            <CFormInput
              {...register('nome_do_pai', {
                required: 'Este campo necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.fatherName?.message}</span>
          </CCol>

          <CCol>
            <CFormLabel> Nome da Mãe </CFormLabel>
            <CFormInput
              {...register('nome_da_mae', {
                required: 'Este campo necessário',
              })}
            />
            <span style={{ color: 'red' }}>{errors.motherName?.message}</span>
          </CCol>
        </CRow>
        <br />
        <ActionButtons {...props} nextStep={validate} />
      </CForm>
      <br />
    </div>
  )
}

export default Step1
