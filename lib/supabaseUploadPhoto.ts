import { supabase } from './supabaseClient'

export async function uploadPhotoToSupabase(file: File, userId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('hair-photos') // bucket adı
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  const { data: publicUrlData } = supabase
    .storage
    .from('hair-photos')
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
} 