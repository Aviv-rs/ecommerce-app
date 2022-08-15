import { useEffect, useRef } from 'react'

export const useEffectUpdate = (cb: Function, dependencies: any[]) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    return cb()
  }, dependencies)
}
