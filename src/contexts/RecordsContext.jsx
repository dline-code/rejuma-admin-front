import React, { createContext, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { getClasses, getGrade, getShiftS, getUsersKind } from 'src/services/methods'

const RecordsContext = createContext({})

export function RecordsContextProvider({ children }) {
  const [applicant, setApplicant] = useState({})
  const [dataRecords, setdataRecords] = useState({})

  useQuery('RecordsData', async () => {
    const shifts = await getShiftS()
    const usersKind = await getUsersKind()
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
    <RecordsContext.Provider value={{ dataRecords, applicant, setApplicant }}>
      {children}
    </RecordsContext.Provider>
  )
}

export function useRecordsContext() {
  return useContext(RecordsContext)
}
