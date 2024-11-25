import { useCardThemeStore } from '@/stores/cardThemeStore.js'
import { FRUITS, ANIMALS } from '@/stores/cardThemeStore.js'

const cardThemeStore = useCardThemeStore()
/**
 * Retrieves all image file paths from the specified folder.
 * Uses Vite's `import.meta.glob` to dynamically import assets.
 * @returns {Array<string>} Array of image file paths shuffeled.
 */
export function getAllImages ()  {
  let images

  switch (cardThemeStore.cardTheme) {
    case FRUITS:
      // Use Vite's import.meta.glob to load all images in the folder
      images = import.meta.glob('@/assets/card-images/fruits/*.{png,jpg,jpeg,svg}')
      break

    case ANIMALS:
      // Use Vite's import.meta.glob to load all images in the folder
      images = import.meta.glob('@/assets/card-images/animals/*.{png,jpg,jpeg,svg}')
      break
  }
  const result = Object.keys(images)
  return shuffleArray(result)
}

/**
 * Selects a specific number of images from the provided array.
 * Throws an error if the requested amount exceeds available images.
 * @param {Array<string>} images - Array of image paths.
 * @param {number} amount - Number of images to select.
 * @returns {Array<string>} Array of selected image paths.
 */
export function getAmountOfImages (images, amount) {
  if (amount > images.length) {
    throw new Error('Requested amount of images exceeds available images');
  }
  return images.slice(0, amount);
}

/**
 * Shuffles an array using a random comparison function.
 * @param {Array} array - Array to shuffle.
 * @returns {Array} Shuffled array.
 */
export function shuffleArray (array) {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Duplicates each image in the provided array, useful for matching card pairs.
 * @param {Array<string>} images - Array of image paths.
 * @returns {Array<string>} Array with each image duplicated.
 */
export function duplicateImages (images) {
  return images.concat(images)
}
