import { useQueryContext } from './QueryProvider'
import { Card } from 'components/common/cards/Card'

type QueryIsErrorProps = {
  children?: React.ReactNode | undefined | null
}

export const QueryIsError = <T,>({ children }: QueryIsErrorProps) => {
  const queryData = useQueryContext<T>()

  return (
    <>
      {queryData?.status === 'error' ? (
        children ? (
          children
        ) : (
          <Card className="justify-center">
            <div className="text-base">
              Wystąpił błąd podczas pobierania danych
            </div>
          </Card>
        )
      ) : null}
    </>
  )
}
