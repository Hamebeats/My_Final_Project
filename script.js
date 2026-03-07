// WAIT FOR PAGE TO LOAD FIRST
document.addEventListener("DOMContentLoaded", function () {

    // QUESTIONS
    let questions = [
      {
        question: "Which fruit is actually a berry?",
        answers: ["Strawberry", "Banana", "Apple", "Grape"],
        correct: "Banana"
      },
      {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: ["Elephant", "Tiger", "Lion", "Giraffe"],
        correct: "Lion"
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
      },
      {
        question: "Which country is home to the Kangaroo?",
        answers: ["South Africa", "Australia", "Brazil", "India"],
        correct: "Australia"
      },
      {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Mt. Everest", "Kilimanjaro", "Mt. Kenya"],
        correct: "Mt. Everest"
      },
      {
        question: "How many colors are there in a rainbow?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
      },
      {
        question: "What is the fastest land animal?",
        answers: ["Lion", "Horse", "Cheetah", "Gazelle"],
        correct: "Cheetah"
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: "Carbon Dioxide"
      },
      {
        question: "How many days are in a leap year?",
        answers: ["365", "364", "366", "367"],
        correct: "366"
      },
      {
        question: "Which is the largest planet in our solar system?",
        answers: ["Earth", "Saturn", "Jupiter", "Neptune"],
        correct: "Jupiter"
      },
      {
        question: "What is the capital city of France?",
        answers: ["Berlin", "Madrid", "Rome", "Paris"],
        correct: "Paris"
      },
      {
        question: "Which organ in the human body is responsible for pumping blood?",
        answers: ["Lungs", "Brain", "Liver", "Heart"],
        correct: "Heart"
      },
      {
        question: "What is the longest river in the world?",
        answers: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correct: "Nile"
      },
      {
        question: "In which year did the first iPhone come out?",
        answers: ["2005", "2007", "2010", "2012"],
        correct: "2007"
      }
    ];
  
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

      // 2. Check if name already exists in Local Storage
    let leaderboard = JSON.parse(localStorage.getItem("quizScores")) || [];
    
    // This looks through the list to see if the name matches
    let alreadyPlayed = leaderboard.some(function(entry) {
        return entry.name.trim().toLowerCase() === playerName.trim().toLowerCase();
    });

    if (alreadyPlayed) {
        alert("Sorry, " + playerName + " has already played!");
        return; // This stops the quiz from starting
    }
  
      startPage.style.display = "none"
      quizPage.style.display = "block"
  
      showQuestion()
    }
  
    // SHOW QUESTION
    function showQuestion() {
  
      answerButtons.innerHTML = ""
      let activate = document.getElementById("nextBtn");
      activate.style.display = "none";
  
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
      document.getElementById("nextBtn").style.display = "block"
  
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
  
       

      let next = document.getElementById("nextBtn");
      next.addEventListener("click", function() {

        currentQuestion++

        if (currentQuestion < questions.length) {
               showQuestion()
             } else {
               showResult()
             }
      })
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