import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilCursor,
  cilNotes,
  cilStar,
  cilPeople,
  cilCursorMove,
  cilMoney,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'CEP-REJUMA',
  },
  {
    component: CNavGroup,
    name: 'Estudantes',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Efetuar matrícula',
        to: '/efectuar-matricula',
      },
      {
        component: CNavItem,
        name: 'Ver estudantes',
        to: '/estudantes',
      },
      // {
      //   component: CNavItem,
      //   name: 'Cadastro',
      //   to: '#',
      // },
    ],
  },
  {
    component: CNavItem,
    name: 'Cursos',
    to: '/cursos',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Funcionários',
    to: '/treatment',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Disciplinas',
    to: '/disciplinas',
    icon: <CIcon icon={cilCursorMove} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Propinas',
    to: '/propinas',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Classes',
    to: '/prices',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Turnos',
    to: '/turnos',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Estatísticas',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav
