// import { storageService } from './async-storage.service'
import { socketService } from './socket.service'
import { httpService } from './http.service'
import {
  User,
  UserCredEdit,
  UserCredLogin,
  UserCredSignup,
} from 'models/user.model'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  refreshLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyUser,
  add,
}

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId: string) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return user
}

function remove(userId: string) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function refreshLoggedinUser() {
  const loggedinUser = getLoggedinUser()
  if (!loggedinUser || !loggedinUser._id) return
  const newLoggedinUser = await getById(loggedinUser._id)
  saveLocalUser(newLoggedinUser)
  return newLoggedinUser as User
}

async function add(userCred: UserCredSignup) {
  const user: User = await httpService.post('user', userCred)
  // socketService.emit('set-user-socket', user._id);
  return user
}

async function update(user: User) {
  // await storageService.put('user', user)
  user = await httpService.put('user', user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()?._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred: UserCredLogin) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  // return _saveLocalUser(user)

  const user = await httpService.post('auth/login', userCred)
  // socketService.emit('set-user-socket', user._id);
  if (user) {
    socketService.login(user._id)
    return saveLocalUser(user)
  }
}
async function signup(userCred: UserCredSignup) {
  const user = await httpService.post('auth/signup', userCred)
  socketService.emit('set-user-socket', user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  socketService.emit('unset-user-socket', '')
  return await httpService.post('auth/logout')
}

function saveLocalUser(user: User) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  ) as User | null
}

function getEmptyUser(): UserCredEdit {
  return {
    avatar: '',
    fullname: '',
    username: '',
    password: '',
  }
}
