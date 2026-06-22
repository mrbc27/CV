document.addEventListener("DOMContentLoaded", () => {
   const roundLabel = document.querySelector("#round")
   const humanScoreLabel = document.querySelector("#human-score")
   const computerScoreLabel = document.querySelector("#computer-score")
   const statusLabel = document.querySelector("#status")
   const lastRoundLabel = document.querySelector("#last-round")
   const resetButton = document.querySelector("#reset")
   const choiceButtons = Array.from(document.querySelectorAll(".choice"))

   let humanScore = 0
   let computerScore = 0
   let roundNumber = 1
   let gameFinished = false

   function getComputerChoice() {
      const nombre = Math.floor(Math.random() * 3)

      if (nombre === 0) {
         return "pierre"
      }

      if (nombre === 1) {
         return "feuille"
      }

      return "ciseau"
   }

   function playRound(humanChoice, computerChoice) {
      if (humanChoice === computerChoice) {
         return 0
      }

      if (
         (humanChoice === "pierre" && computerChoice === "ciseau") ||
         (humanChoice === "feuille" && computerChoice === "pierre") ||
         (humanChoice === "ciseau" && computerChoice === "feuille")
      ) {
         return 1
      }

      return -1
   }

   function renderScore() {
      roundLabel.textContent = `${Math.min(roundNumber, 5)} / 5`
      humanScoreLabel.textContent = String(humanScore)
      computerScoreLabel.textContent = String(computerScore)
   }

   function finishGame() {
      gameFinished = true
      choiceButtons.forEach((button) => {
         button.disabled = true
      })

      if (humanScore > computerScore) {
         statusLabel.textContent = `Vous avez gagne la partie ${humanScore} a ${computerScore}.`
      } else if (computerScore > humanScore) {
         statusLabel.textContent = `Vous avez perdu la partie ${humanScore} a ${computerScore}.`
      } else {
         statusLabel.textContent = `Match nul ${humanScore} partout.`
      }

      lastRoundLabel.textContent = "Cliquez sur Recommencer pour rejouer."
   }

   function handleChoice(humanChoice) {
      if (gameFinished) {
         return
      }

      const computerChoice = getComputerChoice()
      const roundResult = playRound(humanChoice, computerChoice)

      if (roundResult === 1) {
         humanScore += 1
         statusLabel.textContent = "Vous gagnez cette manche."
      } else if (roundResult === -1) {
         computerScore += 1
         statusLabel.textContent = "Vous perdez cette manche."
      } else {
         statusLabel.textContent = "Egalite sur cette manche."
      }

      lastRoundLabel.textContent = `Vous: ${humanChoice} | Ordinateur: ${computerChoice}`
      roundNumber += 1
      renderScore()

      if (roundNumber > 5) {
         finishGame()
      }
   }

   function resetGame() {
      humanScore = 0
      computerScore = 0
      roundNumber = 1
      gameFinished = false
      statusLabel.textContent = "Choisissez votre coup pour lancer la premiere manche."
      lastRoundLabel.textContent = ""
      choiceButtons.forEach((button) => {
         button.disabled = false
      })
      renderScore()
   }

   choiceButtons.forEach((button) => {
      button.addEventListener("click", () => {
         handleChoice(button.dataset.choice)
      })
   })

   resetButton.addEventListener("click", resetGame)

   renderScore()
})

























































