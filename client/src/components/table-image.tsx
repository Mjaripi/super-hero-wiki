import { UseQueryResult } from '@tanstack/react-query'
import { AllDataResponse } from '../response.types'

const tableImage = (
  supDataQueries: UseQueryResult<AllDataResponse, Error>[],
  index: number,
  name: string
) => {
  return (
    supDataQueries[index].data?.image?.url
      ? <img src={supDataQueries[index].data.image.url} alt={`SH_${name}_IMAGE`} width="100"/>
      : <svg width="100" height="133">
          <rect x="0" y="0" width="100" height="133" fill="grey"></rect>
          <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="50%" y="50%" textAnchor="middle">CARGANDO...</text>
        </svg>
  )
}

export default tableImage;