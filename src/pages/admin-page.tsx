import { EditUserModal } from 'cmps/edit-user-modal'
import { User, UserCredEdit, UserCredSignup } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'

export const AdminPage = () => {
  const [users, setUsers] = useState([] as User[])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState({} as User)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedinUser = userService.getLoggedinUser()
    if (loggedinUser?.role !== 'admin') return navigate('/')

    loadUsers()
  }, [])

  const loadUsers = async () => {
    const users = await userService.getUsers()
    setUsers(users)
  }

  const onDeleteUser = async (userId: string) => {
    await userService.remove(userId)
    setUsers((prevUsers: User[]) =>
      prevUsers.filter((user: User) => user._id !== userId)
    )
  }

  const onUpdateUser = async (cred: User) => {
    const savedUser = await userService.update({
      ...cred,
    } as User)

    setUsers((prevUsers: User[]) => {
      const newUsers = prevUsers.map((user: User) => {
        if (user._id === savedUser._id) return { ...savedUser }
        return user
      })
      return newUsers
    })
  }

  const onAddUser = async (cred: UserCredEdit) => {
    const savedUser = await userService.add(cred as UserCredSignup)
    setUsers((prevUsers: User[]) => [...prevUsers, savedUser])
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="admin-page full-screen flex column align-center">
      <h1>Admin dashboard</h1>
      <div className="container">
        <button
          className="btn-add"
          onClick={() => {
            // setUserToUpdate(userService.getEmptyUser())
            setIsModalOpen(true)
          }}
        >
          Add user
        </button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th className="column1">User avatar</th>
            <th>Full name</th>
            <th>Username</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            if (user.role === 'admin') return
            const { fullname, username, _id } = user
            const updateFields = { fullname, username, _id }
            return (
              <tr key={user._id} className="user-info-row">
                <td className="column1"></td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>
                  <div className="actions flex">
                    <button
                      onClick={() => {
                        setIsModalOpen(true)
                      }}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteUser(user._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* {isModalOpen && (
        <EditUserModal
          user={userToUpdate}
          updateUserFn={onUpdateUser}
          addUserFn={onAddUser}
          closeModalFn={closeModal}
        />
      )} */}
    </section>
  )
}
