import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { Stepper, Step } from 'react-form-stepper'
import StepWizard from 'react-step-wizard'
import { MdDescription } from 'react-icons/md'
import Swal from 'sweetalert2'

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

function NewMatricula({ setIsModalOpen, onFormData = { function() {} } }) {
  const [_, setStepWizard] = useState(null)
  const [user, setUser] = useState({})
  const [activeStep, setActiveStep] = useState(0)

  const assignStepWizard = (instance) => {
    setStepWizard(instance)
  }

  const handleStepChange = (e) => {
    console.log(_)
    setActiveStep(e.activeStep - 1)
  }

  const handleComplete = () => {
    console.log('finnaly', user)
    onFormData(user)
    Swal.fire({
      title: 'Tem certeza que deseja salvar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Salvo!', '', 'success')
        setIsModalOpen(false)
      } else if (result.isDenied) {
        Swal.fire('Dados não inseridos', '', 'info')
      }
    })
  }

  const assignUser = (val) => {
    console.log(val)
    setUser((user) => ({
      ...user,
      ...val,
    }))
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
            <Step1 userCallback={assignUser} />
            <Step2 user={user} userCallback={assignUser} />
            <Step3 user={user} completeCallback={handleComplete} />
          </StepWizard>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NewMatricula
