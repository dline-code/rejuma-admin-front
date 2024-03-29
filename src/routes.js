import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const Appointment = React.lazy(() => import('./views/matriculas/index'))
const Funcionarios = React.lazy(() => import('./views/funcionarios'))

const Cursos = React.lazy(() => import('./views/cursos'))
const Disciplinas = React.lazy(() => import('./views/disciplinas'))
const Propinas = React.lazy(() => import('./views/propinas'))
const GradeCosts = React.lazy(() => import('./views/gradeCosts'))
const Turmas = React.lazy(() => import('./views/turmas'))

const Turnos = React.lazy(() => import('./views/turnos'))
const Estudantes = React.lazy(() => import('./views/estudantes'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/efectuar-matricula', name: 'EfetuarMatricula', component: Appointment },
  { path: '/cursos', name: 'Cursos', component: Cursos },
  { path: '/disciplinas', name: 'Disciplinas', component: Disciplinas },
  { path: '/propinas', name: 'Propinas', component: Propinas },
  { path: '/prices', name: 'Preços por Classes', component: GradeCosts },
  { path: '/turnos', name: 'Turnos', component: Turnos },
  { path: '/turmas', name: 'turmas', component: Turmas },
  { path: '/treatment', name: 'Appointment', component: Funcionarios },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/estudantes', name: 'Estudantes', component: Estudantes },
]

export default routes
