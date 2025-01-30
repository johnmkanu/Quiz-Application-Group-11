const quizData = [
    {
        question: "What is the capital of Sierra Leone?",
        options: ["London", "Berlin", "Freetown", "Paris"],
        correct: 2
    },
    {
        question: "Who is the Vice President of the computer Science Society?",
        options: ["Abu Bakarr Marah", "John Malimber Kanu", "Osman Kanu", "Abdulrahim Jalloh"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the name of our Project 1 lecturer?",
        options: ["Mr. Samura", "Mr. Brato", "Mr. Lukeman", "Mr. Kalokoh"],
        correct: 2
    },
    {
        question: "Who is the President of the Computer Science Society?",
        options: ["Haja Binta", "Alice Tity", "Olive", "Zainab Dumbuya"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const quizElement = document.getElementById('quiz');
const resultElement = document.getElementById('result');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');

function startTimer() {
    timeLeft = 30;
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    timerElement.textContent = `Time left: ${timeLeft}s`;
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });

    startTimer();
}

function selectOption(index) {
    const options = optionsElement.children;
    for (let option of options) {
        option.classList.remove('selected');
    }
    options[index].classList.add('selected');
}

function moveToNextQuestion() {
    clearInterval(timer);
    
    const selectedOption = optionsElement.querySelector('.selected');
    if (selectedOption) {
        const selectedAnswer = Array.from(optionsElement.children).indexOf(selectedOption);
        if (selectedAnswer === quizData[currentQuestion].correct) {
            score++;
        }
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizElement.style.display = 'block';
    resultElement.style.display = 'none';
    loadQuestion();
}

nextButton.addEventListener('click', moveToNextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
loadQuestion();