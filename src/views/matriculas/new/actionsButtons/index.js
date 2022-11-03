import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react'

function ActionsButtons(props) {
  const handleBack = () => {
    props.previousStep()
  }

  const handleNext = () => {
    props.nextStep()
  }

  const handleFinish = () => {
    props.lastStep()
  }
  return (
    <div>
      <CRow>
        {props.currentStep > 1 && (
          <CCol>
            <CButton onClick={handleBack}>Voltar</CButton>
          </CCol>
        )}
        <CCol>
          {props.currentStep < props.totalSteps && <CButton onClick={handleNext}>Avançar</CButton>}
          {props.currentStep === props.totalSteps && (
            <CButton onClick={handleFinish}>Efectuar Matrícula</CButton>
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default ActionsButtons
