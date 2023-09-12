export const useSupabaseUrlImage = (url: string) => {
    return url ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pictures/${url}` : ''
}