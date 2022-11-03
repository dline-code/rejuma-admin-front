import React, { useState } from 'react'
import { CForm, CFormInput, CFormLabel, CCol, CRow, CFormSelect } from '@coreui/react'
import ActionButtons from '../actionsButtons'

function Step1(props) {
  const [info1, setInfo1] = useState({})
  const [userData, setUserData] = useState({})
  const [error, setError] = useState('')

  const onInputChanged = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value

    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue,
    }))
  }

  const validate = () => {
    if (!info1.firstName) setError('Preencha os campos obrigatórios(*)')
    else {
      setError('')
      props.nextStep()
      props.userCallback(info1)
    }
  }

  const fillField = (event) => {
    console.log(userData)
    fetch(`https://ka6xhw.deta.dev/bi/${event?.target?.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserData(data[0])
          console.log('biNumber', data[0])
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return (
    <div>
      <span style={{ color: 'red' }}>{error}</span>
      <h2>Cadastro</h2>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel>Número do BI</CFormLabel>
            <CFormInput name="biNumber" onChange={onInputChanged} onBlur={fillField} />
          </CCol>
          <CCol>
            <CFormLabel> Data de Emissão </CFormLabel>
            <CFormInput type="date" name="emissionDate" onChange={onInputChanged} />
          </CCol>
          <CCol>
            <CFormLabel> Data de Expiração </CFormLabel>
            <CFormInput type="date" name="expirationDate" onChange={onInputChanged} />
          </CCol>
        </CRow>
        <br />

        <CRow>
          <CCol>
            <CFormLabel> Primeiro Nome </CFormLabel>
            <CFormInput name="firstName" onChange={onInputChanged} />
          </CCol>

          <CCol>
            <CFormLabel> Último Nome </CFormLabel>
            <CFormInput name="lastName" onChange={onInputChanged} />
          </CCol>
          <CCol>
            <CFormLabel> Data de Nascimento </CFormLabel>
            <CFormInput type="date" name="birthDate" onChange={onInputChanged} />
          </CCol>
        </CRow>
        <br />
        <CRow>
          <CCol>
            <CFormLabel> Género </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              name="gender"
              onChange={onInputChanged}
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormLabel> Nome do Pai </CFormLabel>
            <CFormInput name="fatherName" onChange={onInputChanged} />
          </CCol>

          <CCol>
            <CFormLabel> Nome da Mãe </CFormLabel>
            <CFormInput name="motherName" onChange={onInputChanged} />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Documentos </CFormLabel>
            <CFormInput
              type="file"
              name="file"
              onChange={onInputChanged}
              style={{ width: '285px' }}
            />
          </CCol>
        </CRow>
      </CForm>
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  )
}

export default Step1
