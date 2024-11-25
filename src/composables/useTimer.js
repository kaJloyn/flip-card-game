import { ref } from 'vue'

export function useTimer() {
  let timerId

  const timerData = ref({
    seconds: 0,
  })

  function timer () {
    timerData.value.seconds += 1
  }

  function startTimer () {
    if (timerId) {
      clearInterval(timerId)
    }
    timerId = setInterval(timer, 1000)
  }

  function resetTimer () {
    timerData.value.seconds = 0
  }

  function stopTimer() {
    clearInterval(timerId)
  }

  return { timerData, startTimer, resetTimer, stopTimer  }

}
