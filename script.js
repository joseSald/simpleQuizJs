const questions = [
  {
    question: 'Which is the largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Elephant', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Antartic polar desert', correct: true },
      { text: 'Kalahari', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Gobi', correct: false },
    ],
  },
  {
    question: 'Which is the smallest continent in the world?',
    answers: [
      { text: 'America', correct: false },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
      { text: 'Australia', correct: true },
    ],
  },
  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Nepal', correct: false },
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Sri Lanka', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answerButtons');
const nextButton = document.getElementById('next-btn');

console.log(questionElement);
console.log(answersButtons);
console.log(nextButton);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answersButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style, (display = 'none');
  while (answersButtons.firstChild) {
    answersButtons.removeChild(answersButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
