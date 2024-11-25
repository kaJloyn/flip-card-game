import { defineStore } from 'pinia'

const sessionStorageCardTheme = sessionStorage.getItem('cardTheme')

export const FRUITS = 'fruits'
export const ANIMALS = 'animals'

export const useCardThemeStore = defineStore('cardTheme', {
  state: () => ({
    cardTheme: sessionStorageCardTheme ? sessionStorageCardTheme : FRUITS
  }),

  actions: {
    updateCardTheme (value) {
      sessionStorage.setItem('cardTheme', value)
      this.cardTheme = value
    }
  }
})
