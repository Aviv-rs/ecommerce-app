import { setUserMsg } from 'features/user.slice'
import { useEffectUpdate } from 'hooks/useEffectUpdate'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux-store/store'

export const UserMsg = () => {
  const msg = useSelector((state: RootState) => state.user.userMsg)
  const dispatch = useDispatch()

  let timeoutIdRef = useRef<ReturnType<typeof setTimeout>>()

  const onCloseMsg = () => {
    dispatch(setUserMsg(null))
  }

  useEffectUpdate(() => {
    if (!msg) return
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)

    timeoutIdRef.current = setTimeout(() => {
      onCloseMsg()
    }, 3000)

    return () => {
      clearTimeout(timeoutIdRef.current)
      dispatch(setUserMsg(null))
    }
  }, [msg])

  const msgClass = msg?.type || ''
  return (
    <section className="user-msg-container">
      {msg && (
        <>
          {/* <button className="btn-close-msg" onClick={onCloseMsg}>
            x
          </button> */}
          <div className={'user-msg ' + msgClass}>{msg.txt}</div>{' '}
        </>
      )}
    </section>
  )
}
