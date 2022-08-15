import { useForm } from 'hooks/useForm'
import { UserCredEdit } from 'models/user.model'
import React, { useEffect, useRef } from 'react'
import { uploadAndGetImgUrl } from 'services/cloudinary.service'
import { utilService } from 'services/utils'
import defaultAvatar from '../assets/imgs/default-avatar.png'

export const EditUserModal = ({
  user,
  updateUserFn,
  addUserFn,
  closeModalFn,
}: {
  user: UserCredEdit
  updateUserFn: (cred: UserCredEdit) => void
  addUserFn: (cred: UserCredEdit) => void
  closeModalFn: () => void
}) => {
  const [register, credentials] = useForm({ ...user })
  const modalRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutsideMenu = ({ target }: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(target as Node)) {
        closeModalFn()
      }
    }

    document.addEventListener('mousedown', ev => handleClickOutsideMenu(ev))
    return () => {
      document.removeEventListener('mousedown', ev =>
        handleClickOutsideMenu(ev)
      )
    }
  }, [modalRef])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const avatarUrl = credentials.avatar
      ? await uploadAndGetImgUrl(credentials.avatar)
      : defaultAvatar
    user._id
      ? updateUserFn({ ...credentials, avatar: avatarUrl })
      : addUserFn({ ...credentials, avatar: avatarUrl })
    closeModalFn()
  }

  return (
    <div className="edit-user-modal">
      <form
        onSubmit={ev => {
          handleSubmit(ev)
        }}
        className="modal-content flex column"
        ref={modalRef}
      >
        {Object.keys(credentials).map((field: string) => {
          if (field === '_id') return
          return (
            <div key={field} className="form-group">
              {field === 'avatar' ? (
                <div className="avatar-container">
                  <label htmlFor="avatar">
                    <div className="img-container">
                      <img
                        src={
                          typeof credentials.avatar !== 'string'
                            ? URL.createObjectURL(credentials.avatar)
                            : user.avatar
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = defaultAvatar
                        }}
                        alt="User's avatar"
                      />
                      <div className="add-avatar-txt-container flex align-center justify-center">
                        {' '}
                        <div className="add-avatar-txt">
                          {credentials.password !== undefined
                            ? 'Add avatar'
                            : 'Update avatar'}
                        </div>{' '}
                      </div>
                    </div>
                  </label>
                  <input id="avatar" {...register(field, '', 'file')} />
                </div>
              ) : (
                <>
                  <input required {...register(field, ' ')} autoComplete="no" />
                  <label htmlFor={field}>
                    {utilService.capitalize(field) + ' '}
                  </label>
                </>
              )}
            </div>
          )
        })}
        <button className="btn-submit" type="submit">
          {credentials.password !== undefined ? 'Add' : 'Update'}
        </button>
      </form>
    </div>
  )
}
