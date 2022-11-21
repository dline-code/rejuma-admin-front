import React, { createContext, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import api from 'src/services/api'

const RecordsContext = createContext({})

export function RecordsContextProvider({ children }) {
  const [applicant, setApplicant] = useState({})
  const [dataRecords, setdataRecords] = useState({})
  const [attachment, setAttachment] = useState()

  const completeApplicantAppointment = () => {
    console.log(applicant)
  }

  const getUsersKind = async () => {
    const response = await api.get(`/tipoUsuario/listar`)
    return response.data
  }

  const getCourses = async () => {
    const response = await api.get(`/curso/listar`)
    return response.data
  }

  const getGrade = async () => {
    const response = await api.get(`/classe/listar`)
    return response.data
  }

  const getClasses = async () => {
    const response = await api.get(`/turma/listar`)
    return response.data
  }

  const getShiftS = async () => {
    const response = await api.get(`/turno/listar`)
    return response.data
  }

  useQuery('RecordsData', async () => {
    const shifts = await getShiftS()
    const usersKind = await getUsersKind()
    //const courses = await getCourses()
    const grades = await getGrade()
    const classes = await getClasses()

    setdataRecords({
      shifts,
      usersKind,
      grades,
      classes,
    })
  })

  return (
    <RecordsContext.Provider
      value={{ dataRecords, applicant, setApplicant, completeApplicantAppointment }}
    >
      {children}
    </RecordsContext.Provider>
  )
}

export function useRecordsContext() {
  return useContext(RecordsContext)
}
