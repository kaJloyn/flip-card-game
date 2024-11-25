import { Card } from './Card.js'
import { shuffleArray } from '@/utils/imageUtils.js'


/**
 * Factory class responsible for creating Card objects.
 * This class ensures cards are created based on provided images, rows, and columns.
 * Cards are shuffled before being returned.
 */
class CardFactory {

  constructor(data) {

    /**
     * @property {number} columns - Number of columns in the grid.
     * @property {number} rows - Number of rows in the grid.
     * @property {Array} images - Array of image paths used to create cards.
     */

    this.columns = data.columns
    this.rows = data.rows
    this.images = data.images
  }


  /**
   * Creates a list of Card objects using the provided images.
   * Ensures the total number of cards matches the grid size (rows * columns).
   * @returns {Array<Card>} Shuffled array of Card objects.
   */
  createCards () {
    let cards = [];

    this.images.forEach(image => {
      const card = new Card({
        image: image,
      });

      if (cards.length < this.rows * this.columns) {
        cards.push(card);
      }
    })

    return shuffleArray(cards)
  }
}

export {
  CardFactory
}
