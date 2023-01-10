import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { Stepper, Step } from 'react-form-stepper'
import StepWizard from 'react-step-wizard'
import { MdDescription } from 'react-icons/md'
import Swal from 'sweetalert2'

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import { setEnrollment } from '../services/fetchMetheds'
import { useEnrollment } from '../hooks'

export function NewEnrollment({ setIsModalOpen }) {
  const [, setStepWizard] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const { refetch } = useEnrollment()

  const assignStepWizard = (instance) => {
    setStepWizard(instance)
  }

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1)
  }

  const handleCompleteEnrollment = (applicantData) => {
    Swal.fire({
      title: 'Tem certeza que deseja salvar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setEnrollment(applicantData)
        Swal.fire('Salvo!', '', 'success')
        setIsModalOpen(false)
        refetch()
      } else if (result.isDenied) {
        Swal.fire('Dados não inseridos', '', 'info')
      }
    })
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>Efectuar Matrícula</CCardHeader>
        <CCardBody>
          <Stepper activeStep={activeStep}>
            <Step label="Entidade">
              <MdDescription />
            </Step>
            <Step label="Detalhes da Conta" />
            <Step label="Confirmar" />
          </Stepper>
          <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
            <Step1 />
            <Step2 />
            <Step3 completeCallback={handleCompleteEnrollment} />
          </StepWizard>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}
