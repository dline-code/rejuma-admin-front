import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TreatmentListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { CreateGradeCostForm } from './components/CreateGradeCostForm'
import { useQuery } from 'react-query'
import { deleteGradeCost, getGradeCosts } from 'src/services/gradeCostsQueryMethods'
import Swal from 'sweetalert2'
import { EditGradeCostForm } from './components/EditGradeCostForm'

export default function GradeCosts() {
  useQuery('getsGradeCostData', async () => {
    const response = await getGradeCosts()
    setgradeCosts(response.data)

    return response.data
  })

  const [gradeCosts, setgradeCosts] = useState([])
  const [currentGradeCosts, setCurrentgradeCosts] = useState({})
  const [isGradeEdit, setIsGradeEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState()
  const history = useHistory()

  const handleOpenCreateModal = () => {
    setIsModalOpen(true)
  }

  const handleEdit = (gradeCost) => {
    setCurrentgradeCosts(gradeCost)
    setIsGradeEdit(true)
    setIsModalOpen(true)
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Tem a certeza que pretende eliminar?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGradeCost(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
        } catch (error) {
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go(0)
      }
    })
  }

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Inserir Classe e seus Preços </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {isGradeEdit ? (
            <EditGradeCostForm gradeCostData={currentGradeCosts} />
          ) : (
            <CreateGradeCostForm />
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>

      <br />
      <CCard>
        <CCardBody>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <h4>Classes e Preços</h4>

            <CButton onClick={handleOpenCreateModal} size="sm" color="primary">
              Novo
              <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
            </CButton>
          </div>

          <div className="mb-40">
            <div className="mb-3" width="100px">
              <CFormLabel htmlFor="exampleFormControlInput1">Pesquise por algo</CFormLabel>
              <CFormInput type="search" id="exampleFormControlInput1" />
            </div>
          </div>

          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Classes</CTableHeaderCell>
                <CTableHeaderCell scope="col">Valor das Propinas</CTableHeaderCell>
                <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {gradeCosts?.map((gradeCost, idx) => (
                <CTableRow key={gradeCost.id}>
                  <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                  <CTableDataCell>{gradeCost.classe}</CTableDataCell>
                  <CTableDataCell>{gradeCost.preco}</CTableDataCell>
                  <CTableDataCell>
                    <TreatmentListItemActionsDropdown
                      onEdit={() => handleEdit(gradeCost)}
                      onRemove={() => handleRemove(gradeCost.id)}
                    />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
