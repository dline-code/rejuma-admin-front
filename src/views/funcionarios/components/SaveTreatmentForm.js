import React, { useState } from 'react'
import { CButton, CFormLabel, CFormInput, CFormSelect, CSpinner, CFormCheck } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEmployees } from '../hooks/useEmployees'
import { useForm } from 'react-hook-form'
import { PostFetchFunciarios } from '../services/useFetchFuncionario'

export const SaveTreatmentForm = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { role, userState } = useEmployees()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleSubmitDatas = async (data) => {
    data = {
      ...data,
      senha: '1234',
    }
    setLoading(true)
    try {
      await PostFetchFunciarios(data)
      Swal.fire('Sucesso!', `Insreido com sucesso`, 'success')
      setLoading(false)
      history.go('/treatment')
    } catch (error) {
      Swal.fire('Erro!', `Erro inesperado`, 'error')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitDatas)}>
      {errors.nome && errors.sobrenome && errors.dataNascimento && errors.tipoUsuarioId ? (
        <span className="text-danger text-sm ">(*) preencha todos os campos por favor</span>
      ) : null}
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Nome do funcionário</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput
            placeholder="Nome do funcionário"
            {...register('nome', { required: 'campo obrigatório' })}
          />
        </div>
      </div>
      {errors.nome ? <span className="text-danger text-sm ">{errors?.nome.message}</span> : null}
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Sobrenome</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <CFormInput
            placeholder="Sobrenome do funcionario"
            {...register('sobrenome', { required: 'campo obrigatório' })}
          />
        </div>
      </div>
      {errors.sobrenome ? (
        <span className="text-danger text-sm ">{errors?.sobrenome.message}</span>
      ) : null}
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Data de Nascimento</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            type="date"
            style={{
              outline: 'none',
              border: '1px solid #ddd',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.3rem',
            }}
            max="2005-01-01"
            min="1930-01-01"
            {...register('dataNascimento', { required: 'campo obrigatório' })}
          />
        </div>
      </div>
      {errors.dataNascimento ? (
        <span className="text-danger text-sm ">{errors?.dataNascimento.message}</span>
      ) : null}
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="nomeFuncionario">Selecione o estado</CFormLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          {userState?.map((item) => (
            <CFormCheck
              key={item.id}
              type="radio"
              value={item?.id}
              name="id"
              label={item.designacao}
              {...register('estadoUsuarioId', { required: 'campo obrigatorio' })}
            />
          ))}
        </div>
      </div>
      {errors.estadoUsuarioId ? (
        <span className="text-danger text-sm ">{errors?.dataNascimento.message}</span>
      ) : null}
      <div className="mb-3" width="100px">
        <CFormLabel htmlFor="exampleFormControlInput1">Serviço</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          {...register('tipoUsuarioId', { required: 'campo obrigatório' })}
        >
          <option>Selecione um cargo</option>
          {role.length
            ? role?.map(({ designacao, id }) => (
                <option value={id} key={id}>
                  {designacao}
                </option>
              ))
            : null}
        </CFormSelect>
      </div>
      {errors.tipoUsuarioId ? (
        <span className="text-danger text-sm ">{errors?.tipoUsuarioId.message}</span>
      ) : null}

      <CButton disabled={loading || false} type="submit">
        {loading && <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />}
        Salvar
      </CButton>
    </form>
  )
}
