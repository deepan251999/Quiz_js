const quizData = [
  {
    question: "1. What do you understand by HTML?",
    choices: ["HTML describes the structure of a webpage", "HTML is a hyper text Markup Language", "HTML helps the browser how to view the content", "All of the above"],
    correctAnswer: 3,
    selectedAnswer: null
  },
  {
    question: "2. HTML stands for ___?",
    choices: ["HyperText Markup Language", "HyperText Machine Language", "HyperText Marking Language", "HighText Marking Language"],
    correctAnswer: 0,
    selectedAnswer: null
  },
  {
    question: "3. Which tag is used for inserting the largest heading in HTML?",
    choices: ["head", "<h1>", "<h6>", "heading"],
    correctAnswer: 1,
    selectedAnswer: null
  },
  {
    question: "4. Which is used to create Web Pages ?",
    choices: ["C++", "HTML", "JAVA", "PHP"],
    correctAnswer: 1,
    selectedAnswer: null
  },
  {
    question: "5.HTML program is saved using ___ extension?",
    choices: [".htmn", ".html", ".tmal", ".mntl"],
    correctAnswer: 1,
    selectedAnswer: null
  }
];



let currentQuestion = 0;
let score = 0;
const totalQuestions = quizData.length;


const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');


function displayQuestion() {
  const quizItem = quizData[currentQuestion];
  questionElement.textContent = quizItem.question;
  choicesElement.innerHTML = '';

  quizItem.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.setAttribute('data-choice', index);
    button.addEventListener('click', handleChoiceSelection);
    choicesElement.appendChild(button);


  if (quizItem.selectedAnswer === index) {
      button.classList.add('selected');
    }
  });
  if (currentQuestion === quizData.length - 5) {
    previousButton.style.display="none";
  }else{
    previousButton.style.display="block";
  }
  let totalQuestionParagraph = document.getElementById("totalQuestionParagraph");
  totalQuestionParagraph.textContent = `No of Questions ${currentQuestion+1}`;
  updateButtonStates();
}


function handleChoiceSelection(event) {
  const selectedChoice = event.target;
  const selectedAnswer = parseInt(selectedChoice.getAttribute('data-choice'));
  const quizItem = quizData[currentQuestion];

  quizItem.selectedAnswer = selectedAnswer;

  const choices = choicesElement.querySelectorAll('button');
  choices.forEach(choice => {
    choice.classList.remove('selected');
  });
  selectedChoice.classList.add('selected');
}


function checkAnswer() {
  const quizItem = quizData[currentQuestion];

  if (quizItem.selectedAnswer === quizItem.correctAnswer) {
    score++;
  }
}


function nextQuestion() {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < totalQuestions) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function previousQuestion() {
  currentQuestion--;

  if (currentQuestion >= 0) {
    const quizItem = quizData[currentQuestion + 1];
    if (quizItem.selectedAnswer === quizItem.correctAnswer) {
      score--;
    }
    displayQuestion();
  }
}


function displayResult() {
  questionElement.style.display = 'none';
  choicesElement.style.display = 'none';
  previousButton.style.display = 'none';
  nextButton.style.display = 'none';
  submitButton.style.display = 'none';

  resultElement.textContent = `You scored ${score} out of ${totalQuestions}!`;
  resultElement.parentNode.style.display = 'block';
  let homePage = document.getElementById("home-page-container");
  homePage.style.display="block";
}


function updateButtonStates() {
  if (currentQuestion === 0) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }

  if (currentQuestion === totalQuestions - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'block';
  } else {
    nextButton.style.display = 'block';
    submitButton.style.display = 'none';
  }
}


nextButton.addEventListener('click', () => {
  nextQuestion();
});

previousButton.addEventListener('click', () => {
  previousQuestion();
});

submitButton.addEventListener('click', () => {
  checkAnswer();
  displayResult();
});


displayQuestion();
