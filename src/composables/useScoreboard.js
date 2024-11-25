import { ref, watch, computed } from 'vue'

export function useScoreboard() {
  const scoreBoard = ref(JSON.parse(localStorage.getItem('scoreBoard')) || [])
  const bestScores = ref(JSON.parse(localStorage.getItem('bestScore')) || null)

  function updateScoreBoard (timerData, attempts) {
    scoreBoard.value.push({
      gameTime: timerData.seconds,
      gameAttempts: attempts
    })

    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard.value))
  }

  watch(scoreBoard,
    (newValue) => {
      const sortedScores = newValue.sort((a, b) => a.gameTime - b.gameTime || a.gameAttempts - b.gameAttempts)

      if (sortedScores.length >= 3) {
        bestScores.value = sortedScores.slice(0, 3)
      } else {
        bestScores.value = sortedScores
      }
      localStorage.setItem('bestScore', JSON.stringify(bestScores.value))
    },
    { deep: true }
  )

  const formatedBestScores = computed (() => {
    if (bestScores.value) {
      return {
        bestTimes: bestScores.value.map(item => item.gameTime),
        bestAttempts: bestScores.value.map(item => item.gameAttempts)
      }
    }
    return null
  })

  return { scoreBoard, bestScores, formatedBestScores, updateScoreBoard }

}
