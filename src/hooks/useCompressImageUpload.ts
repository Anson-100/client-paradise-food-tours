import imageCompression from "browser-image-compression"

const useCompressedImageUpload = () => {
  const compressImage = async (file: File): Promise<File> => {
    const MAX_SIZE_MB = 1
    const MAX_DIMENSION = 1920

    // If already small enough, return original
    if (file.size <= MAX_SIZE_MB * 1024 * 1024) return file

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: MAX_SIZE_MB,
        maxWidthOrHeight: MAX_DIMENSION,
        useWebWorker: true,
      })
      return compressed
    } catch (err) {
      console.error("Image compression failed:", err)
      return file // fallback to original
    }
  }

  return { compressImage }
}

export default useCompressedImageUpload
