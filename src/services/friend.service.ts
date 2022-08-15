import { httpService } from './http.service'
import { userService } from './user.service'

export const friendService = {
  sendFriendRequest,
  confirmFriendRequest,
  removeFriend,
}

async function sendFriendRequest(friendRequest: any) {
  await httpService.post('friend', friendRequest)
}

async function confirmFriendRequest(friendRequest: any) {
  await httpService.put('friend', friendRequest)
}

async function removeFriend(friendId: string) {
  await httpService.delete(
    `friend/${friendId}?userId=${userService.getLoggedinUser()?._id}`
  )
  userService.refreshLoggedinUser()
}
