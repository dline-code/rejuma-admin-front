import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCol,
  CRow,
  CFormCheck,
  CButton,
} from '@coreui/react'
import Swal from 'sweetalert2'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  getClass,
  getFecthYear,
  getfetchClass,
  getMonths,
  postfetchPropinas,
} from '../services/useFetchPropinas'
// import { meses } from './data'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

function NewPropinaPayment({ setIsModalOpen }) {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [dateIsInterval, setDateIsInterval] = useState(true)
  const [classData, setClassData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [price, setPrice] = useState(0)
  const [yearCurrent, setYearCurrent] = useState([])
  const [monthsData, setMonthsData] = useState([])
  // const [quantity, setQuantity] = useState(1)
  // const [month, setMonth] = useState({
  //   month1: '',
  //   month2: '',
  // })
  // const [monthTo, setMonthTo] = useState()
  // const [monthNumber1, setMonthNumber1] = useState(0)
  // const [monthNumber2, setMonthNumber2] = useState(0)

  useEffect(() => {
    handleFecthClass()
    handleGetMonths()
    handleGetYear()
  }, [])

  async function handleFecthClass() {
    const data = await getClass()
    setClassData(data)
  }

  async function handleGetYear() {
    const data = await getFecthYear()
    setYearCurrent(data)
  }

  // function getNameOfMonth(id) {
  //   console.log(month)
  //   const data = monthsData?.find((month) => month?.id === id)
  //   console.log(data?.designacao)
  //   return data?.designacao?.toLowerCase()
  // }

  // function getNumberOfMonth(name) {
  //   const data = meses?.find((month) => month?.value?.toLowerCase() === name)

  //   return data?.index
  // }

  // function updateValue() {
  //   setPrice((current) => current * quantity)
  // }

  // function selectQuantity(data) {
  //   if (!data) return
  //   if (data) {
  //     data?.month1
  //       ? setMonth({ ...month, month1: data?.month1 })
  //       : setMonth({ ...month, month2: data?.month2 })
  //   }
  //   if (!(month && price)) return
  //   console.log(month)

  //   const month1 = getNameOfMonth(month)
  //   const month2To = getNameOfMonth(monthTo)
  //   console.log(month1, month2To)
  //   // const monthNumber11 = getNumberOfMonth(month1)
  //   // const monthNumber22 = getNumberOfMonth(month2To)
  //   // setMonthNumber1(monthNumber11)
  //   // setMonthNumber2(monthNumber22)
  //   //console.log(monthNumber1)
  //   // console.log(monthNumber2)

  //   // if (monthNumber1 === monthNumber2) {
  //   //   setQuantity(1)
  //   //   updateValue()
  //   //   return
  //   // }
  //   // if (monthNumber1 > monthNumber2) {
  //   //   setQuantity(monthNumber2 - monthNumber1)
  //   //   updateValue()
  //   //   return
  //   // }
  //   // if (monthNumber1 < monthNumber2) {
  //   //   const result = 12 - monthNumber1 + (monthNumber2 + 1)
  //   //   setQuantity(result)
  //   //   updateValue()
  //   //   return
  //   // }
  // }

  function getPrice(classe) {
    classData?.map((item) => {
      if (item.classe === classe) {
        setPrice(item?.preco)
        return item
      }
      return []
    })
  }

  async function handleGetMonths() {
    const data = await getMonths()
    setMonthsData(data)
  }

  async function handleFecthEstudanteByClass(classe) {
    getPrice(classe)
    const data = await getfetchClass(classe)
    setFilteredData(data)
  }

  async function handleSubmitDatas(data) {
    try {
      await postfetchPropinas(data)
      Swal.fire('Sucesso!', `Inserido com sucesso`, 'success')
      history.go('/propinas')
    } catch (error) {
      Swal.fire('Erro!', `Erro inesperdo!`, 'error')
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>Pagamento de Propinas</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(handleSubmitDatas)}>
            <CContainer>
              <CRow>
                <CCol>
                  <CFormLabel> Nome do Aluno </CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                    name="name"
                    {...register('estudanteId', { required: 'campo obrigatório' })}
                  >
                    <option value={null}>Por favor selecione o aluno</option>
                    {filteredData?.map((item) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.nome + ' ' + item?.sobrenome}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>

                <CCol>
                  <CFormLabel> Classe do Aluno </CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                    name="classe"
                    onChange={(e) => handleFecthEstudanteByClass(e?.target.value)}
                    required={true}
                  >
                    <option value={null}>Por favor selecione uma classe</option>
                    {classData?.map((item) => (
                      <option value={item.classe} key={item?.id}>
                        {item?.classe}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <br />

              <CRow>
                <CCol>
                  <CFormLabel htmlFor="selectMeses"> O mês que pretende Pagar </CFormLabel>
                  <CFormSelect
                    id="selectMeses"
                    // onChange={(e) => selectQuantity({ month1: e?.target.value })}
                    {...register('mesDeId', { required: 'campo obrigatório' })}
                  >
                    <option value={null}>Por favor selecione um mês</option>
                    {monthsData?.map((item) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.designacao}
                      </option>
                    ))}
                  </CFormSelect>
                  <br />
                  <CFormLabel htmlFor="selectAnos"> Ano lectivo </CFormLabel>
                  <CFormSelect
                    id="selectAnos"
                    {...register('anoLetivoId', { required: 'campo obrigatório' })}
                  >
                    {yearCurrent?.map((item) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.designacao}
                      </option>
                    ))}
                  </CFormSelect>
                  <br />
                  <CFormLabel htmlFor="addInterval">Adicionar intervalo</CFormLabel>
                  <CFormCheck
                    id="addInterval"
                    style={{ marginLeft: 5 }}
                    onChange={(e) =>
                      e.target.checked ? setDateIsInterval(false) : setDateIsInterval(true)
                    }
                  />
                </CCol>

                <CCol>
                  <CFormLabel htmlFor="selectMesesTo"> Até mes de </CFormLabel>
                  <CFormSelect
                    id="selectMesesTo"
                    disabled={dateIsInterval}
                    // onChange={(e) => selectQuantity({ month2: e?.target.value })}
                    {...register('anoLetivoId', { required: 'campo obrigatório' })}
                  >
                    <option value={null}>Por favor selecione um mês</option>
                    {monthsData?.map((item) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.designacao}
                      </option>
                    ))}
                  </CFormSelect>

                  <br />
                  <CFormLabel htmlFor="valueToPay"> Quantidade de meses </CFormLabel>
                  <CFormInput
                    id="valueToPay"
                    type="number"
                    {...register('quantidadeMes', { required: 'campo obrigatório' })}
                  />
                  <br />
                </CCol>
                <CCol>
                  <CFormLabel htmlFor="valueToPay">Valor a Pagar </CFormLabel>
                  <CFormInput id="valueToPay" type="number" value={price} />
                  <br />
                  <CFormLabel htmlFor="valueToPay">Multa</CFormLabel>
                  <CFormInput id="valueToPay" type="number" {...register('multa')} />
                </CCol>
              </CRow>
              <CRow>
                <CCol
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    alignItems: 'flex-end',
                  }}
                >
                  <CButton type="submit"> Adicionar Novo Pagamento </CButton>
                </CCol>
              </CRow>
            </CContainer>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default NewPropinaPayment
