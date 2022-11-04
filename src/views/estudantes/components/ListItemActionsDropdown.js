import React from 'react'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import PropTypes from 'prop-types'

export const EstudantesListItemActionsDropdown = ({ onEdit, onRemove }) => {
  return (
    <CDropdown>
      <CDropdownToggle color="primary">Ação</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={onEdit}>Editar</CDropdownItem>
        <CDropdownItem onClick={onRemove}>Adicionar à lista negra</CDropdownItem>
        <CDropdownItem onClick={onRemove}>Remover</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

EstudantesListItemActionsDropdown.propTypes = {
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
}
