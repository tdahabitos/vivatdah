export * from './payload-types'

export type PandaFolder = {
  id: string
  name: string
  user_id: string
  parent_folder_id: string
  status: boolean
  created_at: string
  updated_at: string
  videos_count: string
}

export type PandaVideo = {
  id: string
  title: string
  description: string
  status: 'CONVERTED' | 'CONVERTING' | 'PENDING' | 'WAITING' | 'ERROR'
  user_id: string
  folder_id: string
  library_id: string
  live_id: string | null
  video_external_id: string
  converted_at: string | null
  created_at: string
  updated_at: string
  storage_size: number
  length: number
  video_player: string
  video_hls: string
  width: number
  height: number
  playable: boolean
  backup: boolean
  preview: string
  thumbnail: string
  playback: Array<'1080p' | '720p' | '480p' | '360p' | '240p' | '144p'>
}
