import { SelectItem } from '@mantine/core'
import { ApiEnumType } from 'app/types/server/ApiCommonTypes'

export const convertDataToSelectItems = (
  apiEnums: ApiEnumType[] | undefined,
): SelectItem[] => {
  // { value: 'react', label: 'React' },
  if (!apiEnums || !apiEnums.length) return []

  const inputSelectData: SelectItem[] = apiEnums.map((apiEnum) => {
    return {
      value: apiEnum.id.toString(),
      label: apiEnum.name.toString(),
    }
  })

  return inputSelectData
}
