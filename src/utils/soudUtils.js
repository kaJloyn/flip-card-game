
export const SUCCESS = '../src/assets/sounds/success.mp3'
export const CARD_FLIP = '../src/assets/sounds/flipcard.mp3'
export const WINNER = '../src/assets/sounds/winner.mp3'
export const RESTART = '../src/assets/sounds/restart.mp3'

export async function playSound (path) {
  const sound = new Audio(path)
  try {
    await sound.play()
  } catch (error) {
    console.error(error)
  } finally {
    sound.remove()
  }

}
