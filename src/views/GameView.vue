<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import router from '@/router'
import CardComponent from '@/components/CardComponent.vue'
import { CardFactory } from '@/classes/CardFactory.js'
import { duplicateImages, getAllImages, getAmountOfImages } from '@/utils/imageUtils.js'
import { EASY, useDifficultyStore } from '@/stores/difficultyStore.js'
import { useTimer } from '@/composables/useTimer.js'
import { useCardGameKeyboardNavigation } from '@/composables/useCardGameKeyboardNavigation.js'
import { playSound, SUCCESS, CARD_FLIP, WINNER, RESTART} from '@/utils/soudUtils.js'
import { useScoreboard } from '@/composables/useScoreboard.js'

/*CREATE CARDS*/
const gridSize = ref(null)

function createCardFactory () {
  const uniqueImages = getAllImages()
  const correctAmountOfImages = getAmountOfImages(uniqueImages, gridSize.value*gridSize.value / 2)
  const duplicatedImages = duplicateImages(correctAmountOfImages)

  return  new CardFactory ({
    images: duplicatedImages,
    rows: gridSize.value,
    columns: gridSize.value,
  })
}

const cards = ref(null)

function createCards () {
  cards.value = createCardFactory().createCards()
}

/*MAIN LOGIC*/
const attempts = ref(0)
const selectedCards = ref([])
const winGame = ref(false)


function cardFlip(index) {
  const card = cards.value[index]

  if (!canFlipCard(card)) return

  flipCard(card)
  selectedCards.value.push(card)
  playSound(CARD_FLIP)

  if (selectedCards.value.length === 2) {
    handlePairSelection()
  }
}

function canFlipCard(card) {
  return (
    selectedCards.value.length < 2 &&
    !card.isFlipped &&
    !card.isMatched
  )
}

function flipCard(card) {
  card.isFlipped = true
}

function handlePairSelection() {
  attempts.value++

  const [first, second] = selectedCards.value

  if (isMatch(first, second)) {
    markAsMatched(first, second)
    checkGameWin()
  } else {
    resetFlippedCards(first, second)
  }
}

function isMatch(first, second) {
  return first.image === second.image
}

function markAsMatched(first, second) {
  first.isMatched = true
  second.isMatched = true
  selectedCards.value = []
  playSound(SUCCESS)
}

let flipTimeout = null

function resetFlippedCards(first, second) {
  flipTimeout = setTimeout(() => {
    first.isFlipped = false
    second.isFlipped = false
    selectedCards.value = []
    flipTimeout = null
  }, 1000)
}

function checkGameWin() {
  if (cards.value.every((card) => card.isMatched)) {
    winGame.value = true
    updateScoreBoard(timerData.value, attempts.value)
    stopTimer()
    playSound(WINNER)
  }
}

function resetGame ()  {
  attempts.value = 0
  winGame.value = false
  selectedCards.value = []
  createCards()

  stopTimer()
  resetTimer()
  startTimer()
  playSound(RESTART)
}

function menuClick () {
  router.push({name: 'home'})
}

/*DIFFICULTY*/
const difficultyStore = useDifficultyStore()

watch(
  () => difficultyStore.difficulty,
  (newValue) => {
    if (newValue === EASY) {
      gridSize.value = 4
    } else {
      gridSize.value = 6
    }
    createCards()
  },
  { immediate: true }
)

/*TIMER*/
const { timerData, startTimer, resetTimer, stopTimer } = useTimer()

/*SCOREBOARD*/
const { formatedBestScores, updateScoreBoard } = useScoreboard()

/*ACCESSIBILITY*/
const totalCards = ref(gridSize.value * gridSize.value)

const { focusedIndex, addKeyboardListeners, removeKeyboardListeners } = useCardGameKeyboardNavigation(
  totalCards.value,
  gridSize.value,
  cardFlip
)

onMounted(() => {
  startTimer()
  addKeyboardListeners()
})

onBeforeUnmount(() => {
  stopTimer()
  removeKeyboardListeners()

  if (flipTimeout) {
    clearTimeout(flipTimeout)
  }
})
</script>

<template>
  <div class="game-wrapper">
    <div class="controls-wrapper">

      <div class="buttons-wrapper">
        <button class="menu-btn medium-text" @click="menuClick">Menu</button>
        <button class="reset-btn medium-text" @click="resetGame">Reset</button>
      </div>

      <div class="game-info-wrapper">

        <div class="measures-wrapper">
          <div class="timer big-text">TIMER: {{ timerData.seconds }}s</div>
          <div class="attempts big-text">ATTEMPTS: {{ attempts }}</div>
        </div>

        <div v-if="formatedBestScores" class="stats-wrapper">

          <div class="best-times medium-text">
            Best Times:
            <div>
              {{formatedBestScores.bestTimes.map(item => `${item}s`).join(', ')}}
            </div>
          </div>

          <div class="best-attempts medium-text">
            Best Attempts:
            <div>
              {{formatedBestScores.bestAttempts.join(', ')}}
            </div>
          </div>
        </div>
      </div>
      <div :class="winGame ? 'visible' : ''" class="win-game big-text">
        Congratulations! You won in {{ attempts }} attempts!
      </div>
    </div>

    <div class="game-grid" :class="`grid grid-${gridSize}`">
      <card-component
        v-for="(card, index) in cards"
        :key="card.id"
        :focused-index="focusedIndex"
        :grid-size="gridSize"
        :image="card.image"
        :isMatched="card.isMatched"
        :isFlipped="card.isFlipped"
        :index="index"
        @flip="cardFlip"
        @mouseenter="focusedIndex = null"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--gradient-1);
  padding: 20px;
}
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-6 {
  grid-template-columns: repeat(6, 1fr);
}

.controls-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.buttons-wrapper {
  display: flex;
  gap: 10px;
}

.menu-btn,
.reset-btn {
  padding: 10px 20px;
  background: var(--gradient-2);
  border: none;
  border-radius: 12px;
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-btn:hover,
.reset-btn:hover {
  background: var(--gradient-3);
  box-shadow: 0 4px 15px var(--transparent-black-2);
}

.game-info-wrapper {
  display: flex;
  text-align: center;
  justify-content: space-between;
  gap: 30px;
}

.measures-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-wrap: nowrap;
}

.stats-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 4px;
  background: var(--transparent-white-1);
  border-radius: 12px;
  box-shadow: 0 4px 10px var(--transparent-black-1);
}

.best-times,
.best-attempts {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px;
  border: 1px solid var(--transparent-black-2);
  border-radius: 8px;
  background: var(--transparent-white-2);
}

.timer,
.attempts {
  font-weight: bold;
  text-align: center;
}

.win-game {
  font-weight: bold;
  color: var(--yellow);
  text-align: center;
  visibility: hidden;
}
.win-game.visible {
  visibility: visible;
}

.game-grid {
  display: grid;
  gap: 10px;
  justify-items: center;
  justify-content: center;
  align-items: center;
}


@media (max-width: 767px) {
  .game-wrapper {
    padding: 10px;
    justify-content: center;
  }

  .controls-wrapper {
    flex-direction: column
  }

  .buttons-wrapper {
    flex-direction: row;
    gap: 15px;
  }

  .game-info-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .game-grid {
    gap: 8px;
  }
}

@media (max-height: 600px) {
  .measures-wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
  }

  .stats-wrapper {
    display: none;
  }

  .controls-wrapper {
    gap: 0;
  }
}
</style>
