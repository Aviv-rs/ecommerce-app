import { httpService } from './http.service'

export const chatService = {
  getById,
}

async function getById(chatId: string) {
  const user = await httpService.get(`chat/${chatId}`)
  return user
}
