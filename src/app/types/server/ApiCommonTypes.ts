export type ApiEnumType = {
  id: number
  name: string
}

export type ApiDeleteResposne = unknown

//Photos Types

export type ApiSetPhotoBody = {
  photoId: string
}

export type TApiSetFileBody = {
  fileId: string
}

export type ApiSetPhotoResponse = unknown
export type ApiDeletePhotoResponse = unknown

export type TPhotoListItem = {
  photoId: string
  pigeonPhotoId: string
  createdAt: string
}
