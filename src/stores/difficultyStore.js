import { defineStore } from 'pinia'

const sessionStorageDifficulty = sessionStorage.getItem('difficulty')

export const EASY = 'easy'
export const HARD = 'hard'

export const useDifficultyStore = defineStore('difficulty', {
  state: () => ({
    difficulty: sessionStorageDifficulty ? sessionStorageDifficulty : null,
  }),

  actions :{
    updateDifficulty (value) {
      sessionStorage.setItem('difficulty', value)
      this.difficulty = value
    },
  }
})
