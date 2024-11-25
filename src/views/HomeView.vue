<script setup>
import { computed } from 'vue'
import router from '@/router'
import { useDifficultyStore } from '@/stores/difficultyStore.js'
import { EASY, HARD } from '@/stores/difficultyStore.js'

import { useCardThemeStore } from '@/stores/cardThemeStore.js'
import { ANIMALS, FRUITS } from '@/stores/cardThemeStore.js'


function playNowClick() {
  router.push({ name: 'play-game' })
}

const isPlayBtnDisabled = computed(() => {
  return !difficultyStore.difficulty
})

const difficultyStore = useDifficultyStore()
function handleDifficultyClick(value) {
  difficultyStore.updateDifficulty(value)
}


const cardThemeStore = useCardThemeStore()
function handleCardThemeClick (value) {
  cardThemeStore.updateCardTheme(value)
}

</script>

<template>
  <div class="home-wrapper">
    <!-- Difficulty Selection -->
    <div class="settings-wrapper">

      <div>
        <p class="heading big-text">Select Difficulty Level</p>
        <div class="options">
          <div
            class="option medium-text"
            :class="{ selected: difficultyStore.difficulty === EASY }"
            @click="handleDifficultyClick(EASY)"
          >
            Easy 4x4 cards
          </div>
          <div
            class="option medium-text"
            :class="{ selected: difficultyStore.difficulty === HARD }"
            @click="handleDifficultyClick(HARD)"
          >
            Hard 6x6 cards
          </div>
        </div>
      </div>

      <div>
        <p class="heading big-text">Select Card Theme</p>
        <div class="options medium-text">
          <div
            class="option medium-text"
            :class="{selected: cardThemeStore.cardTheme === FRUITS}"
            @click="handleCardThemeClick(FRUITS)"
          >
            Fruits
          </div>
          <div
            class="option medium-text"
            :class="{selected: cardThemeStore.cardTheme === ANIMALS}"
            @click="handleCardThemeClick(ANIMALS)"
          >
            Animals
          </div>
        </div>
      </div>
    </div>

    <!-- Play Button -->
    <div class="button-wrapper">
      <button
        :disabled="isPlayBtnDisabled"
        class="play-btn big-text"
        @click="playNowClick"
      >
        Play Now
      </button>
      <span class="tooltip-text">Select a difficulty level first</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.home-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--gradient-1);
}

.heading {
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--white);
  text-align: center;
}

.settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.options {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.option {
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  color: var(--white);
  background: var(--transparent-white-2);
  transition: all 0.3s ease;
}

.option:hover,
.option.selected {
  background: var(--transparent-white-1);
  transform: scale(1.1);
  box-shadow: 0 4px 20px var(--transparent-white-1);
}

.button-wrapper {
  padding: 30px;
}

.tooltip-text {
  margin-top: 10px;
  color: var(--white);
  font-size: 0.8rem;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.play-btn:disabled + .tooltip-text {
  opacity: 1;
}
</style>
