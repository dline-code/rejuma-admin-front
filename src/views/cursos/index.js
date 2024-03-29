import { useQuery } from 'react-query'
import React from 'react'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
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
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { cilPlus as cilPlusIcon } from '@coreui/icons'
import { TreatmentListItemActionsDropdown } from './components/ListItemActionsDropdown'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CreateCourseForm } from './components/CreateCourseForm'
import { deleteCourse, getCourses } from 'src/services/courseQueryMethods'
import { EditCourseForm } from './components/EditCourseForm'
import FilterSelect from './components/FilterSelect'

function Appointment() {
  const { data } = useQuery('CoursesData', async () => {
    const courses = await getCourses()
    setCoursesData(courses.data)

    return courses.data
  })

  const [coursesData, setCoursesData] = useState([])
  const [currentCourse, setCurrentCourse] = useState({})
  const [isCourseEdit, setisCourseEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState()
  const history = useHistory()

  const handleFilterData = (event) => {
    event.preventDefault()
    const newCoursesData = []

    const searchType = event.target.elements.searchType.value
    const searched = event.target.elements.searched.value.toLowerCase()

    data.forEach((courseData) => {
      for (const key in courseData) {
        if (key === searchType && courseData[key].toLowerCase().includes(searched)) {
          newCoursesData.push(courseData)
        }
      }
    })

    setCoursesData(newCoursesData)
  }

  const handleEdit = (courseData) => {
    setCurrentCourse(courseData)
    setisCourseEdit(true)
    setIsModalOpen(true)
  }

  const handleRemove = (courseId) => {
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
          await deleteCourse(courseId)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
        } catch (error) {
          console.log(error?.response?.data)
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go(0)
      }
    })
  }

  const handleOpenCreateCurseModal = () => {
    setisCourseEdit(false)
    setIsModalOpen((currentValue) => !currentValue)
  }

  const selectFilds = [
    { value: 'nome', desc: 'Nome' },
    { value: 'descricao', desc: 'Descrição' },
  ]

  return (
    <>
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Inserir Curso </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {isCourseEdit ? <EditCourseForm courseData={currentCourse} /> : <CreateCourseForm />}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>

      <div>
        <CCard>
          <CCardHeader>Dados de Pesquisa</CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleFilterData}>
              <CRow className="mb-3">
                <CCol md="3">
                  <FilterSelect fields={selectFilds} />
                </CCol>
                <CCol md="7">
                  <CFormLabel htmlFor="searched">Pesquisar</CFormLabel>
                  <CFormInput
                    name="searched"
                    className="mr-sm-2"
                    placeholder="Informe o que se quer pesquisar"
                    id="searched"
                    style={{ width: '80%' }}
                  />
                </CCol>
                <CCol style={{ marginTop: '30px' }}>
                  <CButton color="outline-info" className="my-2 my-sm-0" type="submit">
                    Search
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>

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
              <h4>Cursos</h4>

              <CButton onClick={handleOpenCreateCurseModal} size="sm" color="primary">
                Novo
                <CIcon style={{ marginLeft: '10px' }} icon={cilPlusIcon} className="me-2" />
              </CButton>
            </div>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Curso</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {coursesData?.map((courseData, idx) => (
                  <CTableRow key={courseData.id}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{courseData.nome}</CTableDataCell>
                    <CTableDataCell>{courseData.descricao}</CTableDataCell>
                    <CTableDataCell>
                      <TreatmentListItemActionsDropdown
                        onEdit={() => handleEdit(courseData)}
                        onRemove={() => handleRemove(courseData.id)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Appointment
