import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

export const AutoSubmit = ({ time = 500 }) => {
  const { watch } = useFormContext()
  const submitRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const subscription = watch(() => {
      clearTimeout(timeoutRef?.current)

      timeoutRef.current = setTimeout(() => {
        submitRef?.current?.click()
      }, time)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutRef?.current)
    }
  }, [time, watch])

  return <button type="submit" hidden ref={submitRef} />
}
