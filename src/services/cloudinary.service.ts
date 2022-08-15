export const uploadAndGetImgUrl = async (imgUrl: string) => {
  if (!imgUrl) return
  // Defining our variables
  const UPLOAD_PRESET = 'xvn6hxjd' // Insert yours
  const CLOUD_NAME = 'da563p1yb' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  // Building the request body
  FORM_DATA.append('file', imgUrl)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
    const { url } = await res.json()
    return url
  } catch (err) {
    console.error('ERROR!', err)
  }
}
