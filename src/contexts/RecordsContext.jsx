import React, { createContext, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { getClasses, getCourses, getGrade, getShiftS, getUsersType } from 'src/services/methods'

const RecordsContext = createContext({})

export function RecordsContextProvider({ children }) {
  const [applicant, setApplicant] = useState({})
  const [dataRecords, setdataRecords] = useState({})

  useQuery(
    'RecordsData',
    async () => {
      const classes = await getClasses()
      const courses = await getCourses()
      const grades = await getGrade()
      const shifts = await getShiftS()
      const usersType = await getUsersType()

      setdataRecords({
        classes,
        courses,
        grades,
        shifts,
        usersType,
      })
    },
    {
      staleTime: Infinity,
    },
  )

  return (
    <RecordsContext.Provider value={{ dataRecords, applicant, setApplicant }}>
      {children}
    </RecordsContext.Provider>
  )
}

export function useRecordsContext() {
  return useContext(RecordsContext)
}
