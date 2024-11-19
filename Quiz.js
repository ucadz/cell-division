const questions = [
    { question: "1. What is the primary event that occurs during the S phase of interphase?", choices: ["A) DNA replication", "B) Cytokinesis", "C) Chromosome segregation", "D) Cell differentiation"], correct: 0 },
    { question: "2. During which phase do sister chromatids align at the cell equator?", choices: ["A) Prophase", "B) Metaphase", "C) Anaphase", "D) Telophase"], correct: 1 },
    { question: "3. Which of the following correctly describes what happens during anaphase?", choices: ["A) Chromatids are pulled apart to opposite poles.", "B) Chromosomes are duplicated.", "C) The nuclear envelope re-forms.", "D) Spindle fibers break down."], correct: 0 },
    { question: "4. In which phase of interphase does the cell prepare for mitosis?", choices: ["A) G1 phase", "B) S phase", "C) G2 phase", "D) M phase"], correct: 2 },
    { question: "5. What happens to the nuclear envelope during prophase?", choices: ["A) It breaks down.", "B) It re-forms.", "C) It remains intact.", "D) It dissolves completely."], correct: 0 },
    
    // More questions...

    { question: "6. What is the main role of the spindle apparatus during mitosis?", choices: ["A) To replicate DNA", "B) To segregate chromosomes", "C) To provide energy for the cell", "D) To form the nuclear envelope"], correct: 1 },
    { question: "7. Which event occurs first during prophase?", choices: ["A) Chromosomes align at the equator.", "B) Chromosomes condense.", "C) Spindle fibers attach to kinetochores.", "D) Cytokinesis occurs."], correct: 1 },
    { question: "8. During which phase are chromatin first visible as distinct chromosomes?", choices: ["A) G1 phase", "B) S phase", "C) Prophase", "D) Telophase"], correct: 2 },
    { question: "9. Which phase includes both the separation of sister chromatids and the reformation of the nuclear envelope?", choices: ["A) Anaphase", "B) Telophase", "C) Metaphase", "D) G1 phase"], correct: 1 },
    { question: "10. What is the role of the G1 checkpoint?", choices: ["A) It ensures DNA is replicated.", "B) It confirms the cell is ready for synthesis.", "C) It allows all cells to enter mitosis.", "D) It checks for apoptosis."], correct: 1 },
   
    
];

let currentSet = 0;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Function to load a set of 5 questions
function loadQuiz() {
    const quizSection = document.getElementById('quiz-section');
    quizSection.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        let questionObj = questions[currentQuestionIndex + i];
        let questionDiv = document.createElement('div');
        questionDiv.classList.add('question-block');
        
        questionDiv.innerHTML = `
            <p>${questionObj.question}</p>
            ${questionObj.choices.map((choice, index) => 
                `<label id="label-${i}-${index}">
                    <input type="radio" name="q${i}" value="${index}" onchange="checkAnswer(${i}, ${index})"> 
                    ${choice}
                </label>`
            ).join('<br>')}
            <p class="correct-answer" id="correct${i}" style="display:none;">Correct answer: ${questionObj.choices[questionObj.correct]}</p>
        `;
        quizSection.appendChild(questionDiv);
    }
}

// Function to check the selected answer
function checkAnswer(qIndex, selected) {
    const questionObj = questions[currentQuestionIndex + qIndex];
    const correctElem = document.getElementById(`correct${qIndex}`);
    const selectedLabel = document.getElementById(`label-${qIndex}-${selected}`);
    const correctLabel = document.getElementById(`label-${qIndex}-${questionObj.correct}`);

    const options = document.getElementsByName(`q${qIndex}`);
    options.forEach(option => option.disabled = true);

    if (selected === questionObj.correct) {
        userAnswers[currentQuestionIndex + qIndex] = true;
        selectedLabel.style.color = 'green';
        selectedLabel.innerHTML += ' <span class="checkmark">✔️</span>';
    } else {
        userAnswers[currentQuestionIndex + qIndex] = false;
        correctElem.style.display = 'block';
        correctElem.closest('.question-block').querySelector('p').classList.add('question-wrong');
        selectedLabel.style.color = 'red';
    }

    if (userAnswers.slice(currentQuestionIndex, currentQuestionIndex + 5).filter(ans => ans !== undefined).length === 5) {
        document.getElementById('next-btn').disabled = false;
    }
}

// Function to load the next set of questions
function nextSet() {
    const quizSection = document.getElementById('quiz-section');
    quizSection.classList.add('fade-out');

    setTimeout(() => {
        currentSet++;
        currentQuestionIndex += 5;

        loadQuiz();
        quizSection.classList.remove('fade-out');
        quizSection.classList.add('fade-in');

        setTimeout(() => {
            quizSection.classList.remove('fade-in');
        }, 500);

        if (currentSet < 1) {
            document.getElementById('next-btn').disabled = true;
        } else if (currentSet === 1) {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        }
    }, 500);
}

// Function to submit the quiz and show the score
function submitQuiz() {
    score = userAnswers.filter(ans => ans).length;
    document.getElementById('score').textContent = `You scored: ${score} out of 10`;
    document.getElementById('score-popup').style.display = 'flex';
}

// Function to close the score popup and show completion popup
function closeScorePopup() {
    document.getElementById('score-popup').style.display = 'none';
    document.getElementById('completion-popup').style.display = 'flex';
}

// Function to continue to the next page
function continueToNextPage() {
    window.location.href = 'DoneQuiz.html';
}

// Calculate score
function calculateScore() {
    let correctAnswers = userAnswers.filter(ans => ans).length;
    return `${correctAnswers}/${userAnswers.length}`;
}

// Initial load
loadQuiz();