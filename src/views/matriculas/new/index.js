import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import { Stepper, Step } from 'react-form-stepper'
import StepWizard from 'react-step-wizard'
import { MdDescription } from 'react-icons/md'
import Swal from 'sweetalert2'

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import { useRecordsContext } from 'src/contexts/RecordsContext'
import { setenrollment } from 'src/services/methods'

function NewMatricula({ setIsModalOpen, onFormData = { function() {} } }) {
  const [_, setStepWizard] = useState(null)
  const [activeStep, setActiveStep] = useState(0)

  const { applicant } = useRecordsContext()

  const assignStepWizard = (instance) => {
    setStepWizard(instance)
  }

  const handleStepChange = (e) => {
    console.log(_)
    setActiveStep(e.activeStep - 1)
  }

  const handleComplete = () => {
    console.log('finnaly', applicant)
    onFormData(applicant)
    Swal.fire({
      title: 'Tem certeza que deseja salvar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const data = await setenrollment({
          ...applicant,
          tipoUsuarioId: 'beb7ad3d-3edf-4078-9f7b-0f098dab3679',
          cursoId: 'a59a5af8-2ed8-4fad-b6e5-df5b998375e9',
        })
        console.log(data)
        Swal.fire('Salvo!', '', 'success')
        setIsModalOpen(false)
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
            <Step3 completeCallback={handleComplete} />
          </StepWizard>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NewMatricula
