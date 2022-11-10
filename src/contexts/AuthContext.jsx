import React, { createContext, useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

import api from 'src/services/api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const recoverUserInfo = useCallback(async () => {
    const response = await api.get(`/entity/${user?.id}`)
    return response
  }, [user])

  useEffect(() => {
    const token = localStorage.getItem('rejuma-token')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
      recoverUserInfo().then(({ data }) => {
        setUser(data)
      })
    }
    setLoading(false)
  }, [recoverUserInfo])

  async function signIn({ contact, password }) {
    try {
      const { data } = await api.post('/sessao', { email: contact, senha: password })

      localStorage.setItem('rejuma-token', JSON.stringify(data.token))

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      setAuthenticated(true)
      setUser(data.existEmail)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `${error.response?.data?.error}`, 'error')
    }
  }

  async function signOut() {
    setAuthenticated(false)
    localStorage.removeItem('rejuma-token')
    api.defaults.headers.common.Authorization = undefined
    setUser(null)
    history.push('/login')
  }

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
