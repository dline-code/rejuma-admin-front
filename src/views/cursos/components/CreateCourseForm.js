import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
import Swal from 'sweetalert2'
import { getCategoriesCourses, setNewCourse } from 'src/services/courseQueryMethods'

export const CreateCourseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const categories = await getCategoriesCourses()
      setCategories(categories)
    })()
  }, [])

  const handleAddNewCourse = async (data) => {
    setLoading(true)
    try {
      await setNewCourse(data)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
    } catch (error) {
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go(0)
  }

  return (
    <CForm onSubmit={handleSubmit(handleAddNewCourse)}>
      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="course">Curso</CFormLabel>
        <CFormInput
          id="course"
          placeholder="Nome do Curso"
          {...register('nome', {
            required: 'O Nome do Curso é necessário',
          })}
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
        />
        <span style={{ color: 'red' }}>{errors.descricao?.message}</span>
      </CRow>

      <CRow className="mb-3" width="100px">
        <CFormLabel htmlFor="searchKind">Escolha a categoria do curso</CFormLabel>
        <CFormSelect
          {...register('categoriaCursoId', {
            required: 'A categoria é necessário',
          })}
        >
          {categories.map(({ id, designacao }) => (
            <option key={id} value={id}>
              {designacao}
            </option>
          ))}
        </CFormSelect>
        <span style={{ color: 'red' }}>{errors.categoriaCursoId?.message}</span>
      </CRow>

      <CButton type="submit" disabled={loading}>
        {loading ? <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : null}
        Salvar
      </CButton>
    </CForm>
  )
}
