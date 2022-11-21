import React, { createContext, useContext, useState } from 'react'

const AppointmentContext = createContext({})

export function AppointmentProvider({ children }) {
  const [applicant, setApplicant] = useState({})
  const [attachment, setAttachment] = useState()

  const completeApplicantAppointment = () => {
    console.log(applicant)
  }

  return (
    <AppointmentContext.Provider
      value={{ setAttachment, attachment, applicant, setApplicant, completeApplicantAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointmentContext() {
  return useContext(AppointmentContext)
}
