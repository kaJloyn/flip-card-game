import { v4 as uuidv4 } from 'uuid';


/**
 * Represents a single Card in the game.
 * Each card has a unique ID, an image, and properties to track its state.
 */
class Card {
  constructor(data) {
    /**
     * @property {string} id - Unique identifier for the card.
     * @property {string} image - Path to the card's image.
     * @property {boolean} isMatched - Indicates if the card has been matched.
     * @property {boolean} isFlipped - Indicates if the card is currently flipped.
     */
    this.id = uuidv4();
    this.image = data.image;
    this.isMatched = false
    this.isFlipped = false
  }
}

export {
  Card
}
