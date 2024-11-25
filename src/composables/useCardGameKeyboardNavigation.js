import { ref } from 'vue'

export function useCardGameKeyboardNavigation(totalCards, gridSize, cardFlip) {
  const focusedIndex = ref(null)

  function handleKeydown(event) {
    switch (event.key) {
      case 'ArrowRight':
        if (focusedIndex.value === null) {
          focusedIndex.value = 0
          break
        }
        focusedIndex.value = (focusedIndex.value + 1) % totalCards
        break
      case 'ArrowLeft':
        focusedIndex.value = (focusedIndex.value - 1 + totalCards) % totalCards
        break
      case 'ArrowDown':
        focusedIndex.value = (focusedIndex.value + gridSize) % totalCards
        break
      case 'ArrowUp':
        focusedIndex.value = (focusedIndex.value - gridSize + totalCards) % totalCards
        break
      case 'Enter':
        if (focusedIndex.value !== null) cardFlip(focusedIndex.value)
        break
      case 'Escape':
        focusedIndex.value = null
        break
    }
  }

  function addKeyboardListeners() {
    window.addEventListener('keydown', handleKeydown)
  }

  function removeKeyboardListeners() {
    window.removeEventListener('keydown', handleKeydown)
  }

  return {
    focusedIndex,
    addKeyboardListeners,
    removeKeyboardListeners,
  }
}
