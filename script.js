// WAIT FOR PAGE TO LOAD FIRST
document.addEventListener("DOMContentLoaded", function () {

    // QUESTIONS
    let questions = [
      {
        question: "What is the capital of France?",
        answers: ["Berlin", "Paris", "Madrid", "Rome"],
        correct: "Paris"
      },
      {
        question: "Which planet is called the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
      },
      {
        question: "Who invented JavaScript?",
        answers: ["Brendan Eich", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
        correct: "Brendan Eich"
      },
      {
        question: "Which language runs in the browser?",
        answers: ["Python", "Java", "C++", "JavaScript"],
        correct: "JavaScript"
      },
      {
        question: "What does HTML stand for?",
        answers: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Tool Mark Language",
          "Home Tool Mark Language"
        ],
        correct: "Hyper Text Markup Language"
      },
      {
        question: "Which company created Java?",
        answers: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        correct: "Sun Microsystems"
      },
      {
        question: "What does CSS do?",
        answers: ["Adds style", "Runs servers", "Stores data", "Builds hardware"],
        correct: "Adds style"
      },
      {
        question: "Which symbol is used for comments in JS?",
        answers: ["//", "**", "!!", "##"],
        correct: "//"
      },
      {
        question: "Which tag creates a link?",
        answers: ["a", "p", "h1", "div"],
        correct: "a"
      },
      {
        question: "Which keyword creates a variable?",
        answers: ["let", "make", "build", "create"],
        correct: "let"
      }
    ]
  
    // VARIABLES
    let currentQuestion = 0
    let score = 0
    let playerName = ""
    let board = document.getElementById("leaderboard")
  
    // DOM ELEMENTS
    let startBtn = document.getElementById("startBtn")
    let startPage = document.getElementById("startPage")
    let quizPage = document.getElementById("quizPage")
    let questionText = document.getElementById("question")
    let answerButtons = document.getElementById("answers")
    let resultBox = document.getElementById("result")
  
    // START BUTTON
    startBtn.addEventListener("click", startQuiz)
  
    // START QUIZ
    function startQuiz() {
  
      playerName = document.getElementById("playerName").value
  
      if (playerName === "") {
        alert("Please enter your name")
        return
      }
  
      startPage.style.display = "none"
      quizPage.style.display = "block"
  
      showQuestion()
    }
  
    // SHOW QUESTION
    function showQuestion() {
  
      answerButtons.innerHTML = ""
  
      let q = questions[currentQuestion]
  
      questionText.textContent = q.question;
  
      for (let i = 0; i < q.answers.length; i++) {
  
        let button = document.createElement("button")
        button.textContent = q.answers[i]
        button.classList.add("answer-btn")
  
        button.onclick = function () {
          checkAnswer(button, q.answers[i])
        }
  
        answerButtons.appendChild(button)
      }
    }
  
    // CHECK ANSWER
    function checkAnswer(button, answer) {
  
      let correctAnswer = questions[currentQuestion].correct
  
      let allButtons = document.querySelectorAll(".answer-btn")
  
      allButtons.forEach(function (btn) {
        btn.disabled = true
      })
  
      if (answer === correctAnswer) {
  
        button.style.backgroundColor = "green"
        score++
  
      } else {
  
        button.style.backgroundColor = "red"
  
        allButtons.forEach(function (btn) {
          if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "green"
          }
        })
      }
  
      setTimeout(function () {
  
        currentQuestion++
  
        if (currentQuestion < questions.length) {
          showQuestion()
        } else {
          showResult()
        }
  
      }, 1000)
    }
  
    // SHOW RESULT
    function showResult() {
  
      quizPage.style.display = "none"
      resultBox.style.display = "block"
  
      document.getElementById("scoreText").textContent =
        playerName + ", your score is " + score + " / " + questions.length
  
      saveScore()
    }
  
    // SAVE SCORE
    function saveScore() {
  
      let leaderboard = JSON.parse(localStorage.getItem("quizScores")) || []
  
      leaderboard.push({
        name: playerName,
        score: score
      })
  
      leaderboard.sort(function (a, b) {
        return b.score - a.score
      })
  
      localStorage.setItem("quizScores", JSON.stringify(leaderboard))
  
      showLeaderboard()
    }
  


    let resetButton = document.getElementById("btn-reset");
      resetButton.addEventListener("click", function() {
        localStorage.removeItem("quizScores");
        board.innerHTML = "<tr><td colspan='3'>Leaderboard Reset!</td></tr>";
      })

      // let nextPerson = document.getElementById("next-person");
      // nextPerson.addEventListener("click", function() {
      //   resultBox.style.display = "none"
      //   startPage.style.display = "block"
      //   playerName.textContent = "";
      // })



    // SHOW LEADERBOARD
    function showLeaderboard() {

      let leaderboard = JSON.parse(localStorage.getItem("quizScores")) || []
  
      
  
      board.innerHTML = ""
  
      for (let i = 0; i < leaderboard.length; i++) {
  
        let player = leaderboard[i]
  
        let row = document.createElement("tr")
  
        row.innerHTML =
          "<td>" + (i + 1) + "</td>" +
          "<td>" + player.name + "</td>" +
          "<td>" + player.score + "</td>"
  
        board.appendChild(row)
      }
      let nextPerson = document.getElementById("next-person");

nextPerson.addEventListener("click", function() {
  
    score = 0;
    currentQuestion = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("startPage").style.display = "block";
    document.getElementById("playerName").value = "";
});
      
    }
  
  })