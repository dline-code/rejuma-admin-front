import React from 'react'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import PropTypes from 'prop-types'

export const TreatmentListItemActionsDropdown = ({ onEdit, onRemove }) => {
  return (
    <CDropdown>
      <CDropdownToggle color="primary">Ação</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={onEdit}>Editar</CDropdownItem>
        <CDropdownItem onClick={onRemove}>Remover</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

TreatmentListItemActionsDropdown.propTypes = {
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
}
