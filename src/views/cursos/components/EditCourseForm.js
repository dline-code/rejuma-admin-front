import React, { useEffect, useState } from 'react'
import {
  CButton,
  CFormLabel,
  CFormInput,
  CSpinner,
  CForm,
  CRow,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { getCategoriesCourses, updateCourse } from 'src/services/courseQueryMethods'

export const EditCourseForm = ({ courseData }) => {
  const [categories, setCategories] = useState([])
  const [newCourseData, setNewCourseData] = useState(courseData)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const categories = await getCategoriesCourses()
      setCategories(categories)
    })()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleChangeCourseData = async (data) => {
    setLoading(true)
    try {
      await updateCourse(data.id, data)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  return (
    <CForm onSubmit={handleSubmit(handleChangeCourseData)}>
      <CFormInput type="hidden" {...register('id')} value={courseData.id} />

      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="course">Curso</CFormLabel>
        <CFormInput
          id="course"
          placeholder="Nome do Curso"
          {...register('nome', {
            required: 'O Nome do Curso é necessário',
          })}
          value={newCourseData.nome}
          onChange={(e) => setNewCourseData(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errors.nome?.message}</span>
      </CRow>

      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="description">Descrição do curso</CFormLabel>
        <CFormTextarea
          id="description"
          placeholder="Descrição do Curso"
          {...register('descricao', {
            required: 'A descrição é necessário',
          })}
          value={newCourseData.descricao}
          onChange={(e) => setNewCourseData(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errors.descricao?.message}</span>
      </CRow>

      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="searchKind">Escolha a categoria do curso</CFormLabel>
        <CFormSelect
          {...register('categoriaCursoId', {
            required: 'A categoria é necessário',
          })}
          defaultValue
        >
          {categories.map(({ id, designacao }) => (
            <option selected={courseData.categoriaCursoId === id} key={id} value={id}>
              {designacao}
            </option>
          ))}
        </CFormSelect>
        <span style={{ color: 'red' }}>{errors.categoriaCursoId?.message}</span>
      </CRow>

      <CButton type="submit" disabled={loading}>
        {loading ? <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : null}
        Alterar
      </CButton>
    </CForm>
  )
}
