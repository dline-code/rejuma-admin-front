import React, { useState } from 'react'
import { CForm, CFormInput, CFormLabel, CRow, CCol, CFormSelect } from '@coreui/react'

import ActionButtons from '../actionsButtons'

function Step2(props) {
  console.log('props2', props.user)
  const [showCurso, setShowCurso] = useState(true)
  const [info2, setInfo2] = useState({})
  const [error, setError] = useState('')

  const onInputChanged = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value

    if (targetName === 'classe') {
      if (Number(targetValue) < 10) {
        setShowCurso(false)
      } else {
        setShowCurso(true)
      }
    }

    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue,
    }))
  }

  const validate2 = () => {
    if (!info2.sponsorEducation) setError('Campo obritatório')
    else {
      setError('')
      props.nextStep()
      props.userCallback(info2)
    }
  }
  return (
    <div>
      <span style={{ color: 'red' }}>{error}</span>
      <h1>Dados pessoais</h1>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel> Classe </CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              name="classe"
              onChange={onInputChanged}
            >
              <option value="1">1ª classe</option>
              <option value="2">2ª classe</option>
              <option value="3">3ª classe</option>
              <option value="4">4ª classe</option>
              <option value="5">5ª classe</option>
              <option value="6">6ª classe</option>
              <option value="7">7ª classe</option>
              <option value="8">8ª classe</option>
              <option value="9">9ª classe</option>
              <option value="10">10ª classe</option>
              <option value="11">11ª classe</option>
              <option value="12">12ª classe</option>
            </CFormSelect>
          </CCol>
          {showCurso && (
            <CCol>
              <CFormLabel> Curso </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                name="curso"
                onChange={onInputChanged}
              >
                <option value="1">Informática</option>
                <option value="2">Contablidade</option>
                <option value="3">Pedagogia</option>
                <option value="3">Gestão</option>
              </CFormSelect>
            </CCol>
          )}
          <CCol>
            <CFormLabel> Turno </CFormLabel>
            <CFormSelect aria-label="Default select example" name="turno" onChange={onInputChanged}>
              <option value="1">Manhã</option>
              <option value="2">Tarde</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Nome do Encarregado de Educação </CFormLabel>
            <CFormInput name="sponsorEducation" onChange={onInputChanged} />
          </CCol>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Residência </CFormLabel>
            <CFormInput name="morada" onChange={onInputChanged} />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Profissão </CFormLabel>
            <CFormInput name="profissao" onChange={onInputChanged} />
          </CCol>

          <CCol>
            <CFormLabel style={{ marginTop: '15px' }}> Contacto </CFormLabel>
            <CFormInput type="tel" name="contacto" onChange={onInputChanged} />
          </CCol>
        </CRow>
      </CForm>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  )
}

export default Step2
