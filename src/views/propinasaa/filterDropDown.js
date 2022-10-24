import React from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

const FilterDropDown = () => {
  return (
    <CDropdown variant="button">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={true}>
        Filtrar
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Filtrar Propinas</CDropdownHeader>
        <CDropdownItem>Nenhum</CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem>Preços</CDropdownItem>
        <CDropdownItem>Turmas</CDropdownItem>
        <CDropdownItem>Classes</CDropdownItem>
        <CDropdownItem>Por Data</CDropdownItem>
        <CDropdownItem>Meses Pagos</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default FilterDropDown
