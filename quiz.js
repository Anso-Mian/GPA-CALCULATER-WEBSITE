// ===== Quiz Logic =====

const quizData = {
    programming: {
        title: "Programming Fundamentals",
        time: 15,
        questions: [
            {
                question: "What is the correct syntax for a for loop in C++?",
                options: ["for (i = 0; i < 10; i++)", "for (int i = 0; i < 10; i++)", "for i = 0 to 10", "loop (i < 10)"],
                correct: 1
            },
            {
                question: "Which data type is used to store a single character in C++?",
                options: ["string", "char", "character", "text"],
                correct: 1
            },
            {
                question: "What does the 'cout' statement do in C++?",
                options: ["Takes input", "Outputs to console", "Declares a variable", "Creates a loop"],
                correct: 1
            },
            {
                question: "Which operator is used for comparison in C++?",
                options: ["=", "==", "===", ":="],
                correct: 1
            },
            {
                question: "What is an array in programming?",
                options: ["A single variable", "A collection of similar data types", "A function", "A loop"],
                correct: 1
            },
            {
                question: "Which keyword is used to define a function in C++?",
                options: ["function", "def", "void/int/etc.", "func"],
                correct: 2
            },
            {
                question: "What is the purpose of the 'break' statement?",
                options: ["Pause the program", "Exit a loop", "Skip an iteration", "End the program"],
                correct: 1
            },
            {
                question: "Which symbol is used for single-line comments in C++?",
                options: ["#", "//", "/*", "--"],
                correct: 1
            },
            {
                question: "What is a pointer in C++?",
                options: ["A variable that stores memory address", "A type of loop", "A function", "An array"],
                correct: 0
            },
            {
                question: "What does 'cin' do in C++?",
                options: ["Outputs data", "Takes input from user", "Declares a variable", "Creates a function"],
                correct: 1
            }
        ]
    },
    calculus: {
        title: "Calculus",
        time: 20,
        questions: [
            {
                question: "What is the derivative of x²?",
                options: ["x", "2x", "x²", "2x²"],
                correct: 1
            },
            {
                question: "What is the integral of 2x?",
                options: ["x²", "x² + C", "2x²", "x"],
                correct: 1
            },
            {
                question: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
                options: ["0", "1", "2", "Undefined"],
                correct: 2
            },
            {
                question: "The derivative of sin(x) is:",
                options: ["-sin(x)", "cos(x)", "-cos(x)", "tan(x)"],
                correct: 1
            },
            {
                question: "What is the chain rule used for?",
                options: ["Adding functions", "Differentiating composite functions", "Integrating", "Finding limits"],
                correct: 1
            },
            {
                question: "The integral of 1/x is:",
                options: ["x", "ln|x| + C", "1/x²", "e^x"],
                correct: 1
            },
            {
                question: "What is the derivative of e^x?",
                options: ["e^x", "xe^(x-1)", "ln(x)", "1/x"],
                correct: 0
            },
            {
                question: "L'Hopital's rule is used when a limit is:",
                options: ["Finite", "Infinite", "Indeterminate (0/0 or ∞/∞)", "Zero"],
                correct: 2
            },
            {
                question: "The second derivative represents:",
                options: ["Velocity", "Acceleration/Concavity", "Position", "Jerk"],
                correct: 1
            },
            {
                question: "What is the derivative of ln(x)?",
                options: ["1/x", "x", "e^x", "ln(x)/x"],
                correct: 0
            }
        ]
    },
    physics: {
        title: "Applied Physics",
        time: 15,
        questions: [
            {
                question: "What is Newton's First Law also known as?",
                options: ["Law of Acceleration", "Law of Inertia", "Law of Action-Reaction", "Law of Gravity"],
                correct: 1
            },
            {
                question: "The SI unit of force is:",
                options: ["Joule", "Watt", "Newton", "Pascal"],
                correct: 2
            },
            {
                question: "What is the formula for kinetic energy?",
                options: ["mgh", "½mv²", "mv", "ma"],
                correct: 1
            },
            {
                question: "Sound waves are:",
                options: ["Transverse waves", "Longitudinal waves", "Electromagnetic waves", "Standing waves"],
                correct: 1
            },
            {
                question: "What is the speed of light in vacuum?",
                options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
                correct: 1
            },
            {
                question: "Ohm's Law states that:",
                options: ["V = IR", "P = IV", "F = ma", "E = mc²"],
                correct: 0
            },
            {
                question: "What is the unit of electric current?",
                options: ["Volt", "Ohm", "Ampere", "Watt"],
                correct: 2
            },
            {
                question: "Which type of lens is used to correct myopia?",
                options: ["Convex", "Concave", "Bifocal", "Cylindrical"],
                correct: 1
            },
            {
                question: "The phenomenon of splitting of white light is called:",
                options: ["Reflection", "Refraction", "Dispersion", "Diffraction"],
                correct: 2
            },
            {
                question: "What is the SI unit of power?",
                options: ["Joule", "Newton", "Watt", "Pascal"],
                correct: 2
            }
        ]
    },
    ict: {
        title: "ICT",
        time: 10,
        questions: [
            {
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
                correct: 0
            },
            {
                question: "Which is an input device?",
                options: ["Monitor", "Printer", "Keyboard", "Speaker"],
                correct: 2
            },
            {
                question: "What is RAM?",
                options: ["Permanent storage", "Temporary memory", "Output device", "Software"],
                correct: 1
            },
            {
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
                correct: 0
            },
            {
                question: "Which is an operating system?",
                options: ["Microsoft Word", "Windows", "Google Chrome", "Photoshop"],
                correct: 1
            },
            {
                question: "What is the main function of a router?",
                options: ["Store data", "Connect networks", "Display output", "Process data"],
                correct: 1
            },
            {
                question: "What does URL stand for?",
                options: ["Uniform Resource Locator", "Universal Resource Link", "Unified Resource Locator", "Universal Reference Link"],
                correct: 0
            },
            {
                question: "Which is a programming language?",
                options: ["HTML", "CSS", "Python", "HTTP"],
                correct: 2
            },
            {
                question: "What is cloud computing?",
                options: ["Weather prediction", "Internet-based computing services", "Local storage", "Hardware manufacturing"],
                correct: 1
            },
            {
                question: "What is cybersecurity?",
                options: ["Building computers", "Protecting systems from digital attacks", "Creating websites", "Data entry"],
                correct: 1
            }
        ]
    },
    pakistan: {
        title: "Pakistan Studies",
        time: 15,
        questions: [
            {
                question: "When did Pakistan gain independence?",
                options: ["1945", "1946", "1947", "1948"],
                correct: 2
            },
            {
                question: "Who was the founder of Pakistan?",
                options: ["Allama Iqbal", "Liaquat Ali Khan", "Muhammad Ali Jinnah", "Sir Syed Ahmad Khan"],
                correct: 2
            },
            {
                question: "What is the national language of Pakistan?",
                options: ["English", "Punjabi", "Urdu", "Sindhi"],
                correct: 2
            },
            {
                question: "Which city is the capital of Pakistan?",
                options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
                correct: 2
            },
            {
                question: "The Lahore Resolution was passed in which year?",
                options: ["1930", "1935", "1940", "1945"],
                correct: 2
            },
            {
                question: "K2 is the _____ highest mountain in the world.",
                options: ["First", "Second", "Third", "Fourth"],
                correct: 1
            },
            {
                question: "Which river is the longest in Pakistan?",
                options: ["Jhelum", "Chenab", "Indus", "Ravi"],
                correct: 2
            },
            {
                question: "The national flower of Pakistan is:",
                options: ["Rose", "Jasmine", "Tulip", "Lily"],
                correct: 1
            },
            {
                question: "Pakistan's first constitution was adopted in:",
                options: ["1947", "1956", "1962", "1973"],
                correct: 1
            },
            {
                question: "Which is the largest province of Pakistan by area?",
                options: ["Punjab", "Sindh", "Balochistan", "KPK"],
                correct: 2
            }
        ]
    },
    english: {
        title: "Functional English",
        time: 15,
        questions: [
            {
                question: "Which is a noun in this sentence: 'The cat sat on the mat'?",
                options: ["sat", "on", "cat", "the"],
                correct: 2
            },
            {
                question: "What is the past tense of 'go'?",
                options: ["goed", "gone", "went", "going"],
                correct: 2
            },
            {
                question: "Which is a conjunction?",
                options: ["quickly", "and", "beautiful", "run"],
                correct: 1
            },
            {
                question: "What type of sentence is: 'What time is it?'",
                options: ["Declarative", "Imperative", "Interrogative", "Exclamatory"],
                correct: 2
            },
            {
                question: "Which word is an adjective?",
                options: ["run", "beautiful", "quickly", "happiness"],
                correct: 1
            },
            {
                question: "What is the plural of 'child'?",
                options: ["childs", "childes", "children", "childrens"],
                correct: 2
            },
            {
                question: "Which is the correct spelling?",
                options: ["recieve", "receive", "receve", "receeve"],
                correct: 1
            },
            {
                question: "What is a synonym for 'happy'?",
                options: ["sad", "joyful", "angry", "tired"],
                correct: 1
            },
            {
                question: "Which sentence is grammatically correct?",
                options: ["He don't like pizza", "He doesn't likes pizza", "He doesn't like pizza", "He not like pizza"],
                correct: 2
            },
            {
                question: "What is an antonym for 'ancient'?",
                options: ["old", "modern", "historic", "antique"],
                correct: 1
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestion = 0;
let userAnswers = [];
let timerInterval = null;
let timeRemaining = 0;

// Start quiz
function startQuiz(subject) {
    currentQuiz = quizData[subject];
    currentQuestion = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    timeRemaining = currentQuiz.time * 60;
    
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    
    renderQuestion();
    startTimer();
}

// Render current question
function renderQuestion() {
    const q = currentQuiz.questions[currentQuestion];
    
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of ${currentQuiz.questions.length}`;
    document.getElementById('progressFill').style.width = `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%`;
    document.getElementById('questionText').textContent = q.question;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = q.options.map((option, index) => `
        <div class="option-item ${userAnswers[currentQuestion] === index ? 'selected' : ''}" onclick="selectOption(${index})">
            <span class="option-marker">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        </div>
    `).join('');
    
    // Update buttons
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === currentQuiz.questions.length - 1 ? 'Finish' : 'Next';
}

// Select option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    renderQuestion();
}

// Previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// Next question
function nextQuestion() {
    if (currentQuestion < currentQuiz.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// Start timer
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 60) {
            document.getElementById('quizTimer').classList.add('warning');
        }
        
        if (timeRemaining <= 0) {
            finishQuiz();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Finish quiz
function finishQuiz() {
    clearInterval(timerInterval);
    
    let score = 0;
    currentQuiz.questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizResults').style.display = 'flex';
    
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('scorePercentage').textContent = `${percentage}% Correct`;
    
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You have mastered this subject!';
    } else if (percentage >= 70) {
        message = 'Great job! You have a solid understanding of the material.';
    } else if (percentage >= 50) {
        message = 'Good effort! Review the topics you missed and try again.';
    } else {
        message = 'Keep practicing! Review the study materials and retake the quiz.';
    }
    document.getElementById('scoreMessage').textContent = message;
    
    // Save score
    saveQuizScore(currentQuiz.title, score, currentQuiz.questions.length);
}

// Save quiz score
function saveQuizScore(subject, score, total) {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    scores.push({
        subject,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        date: new Date().toISOString()
    });
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

// Review answers
function reviewAnswers() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'block';
    
    currentQuestion = 0;
    renderReviewQuestion();
}

// Render review question
function renderReviewQuestion() {
    const q = currentQuiz.questions[currentQuestion];
    
    document.getElementById('questionNumber').textContent = `Review: Question ${currentQuestion + 1} of ${currentQuiz.questions.length}`;
    document.getElementById('questionText').textContent = q.question;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = q.options.map((option, index) => {
        let className = 'option-item';
        if (index === q.correct) className += ' correct';
        else if (userAnswers[currentQuestion] === index) className += ' incorrect';
        
        return `
            <div class="${className}">
                <span class="option-marker">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === currentQuiz.questions.length - 1 ? 'Back to Results' : 'Next';
    document.getElementById('nextBtn').onclick = () => {
        if (currentQuestion < currentQuiz.questions.length - 1) {
            currentQuestion++;
            renderReviewQuestion();
        } else {
            document.getElementById('quizInterface').style.display = 'none';
            document.getElementById('quizResults').style.display = 'flex';
        }
    };
    document.getElementById('prevBtn').onclick = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderReviewQuestion();
        }
    };
}

// Retake quiz
function retakeQuiz() {
    const subject = Object.keys(quizData).find(key => quizData[key].title === currentQuiz.title);
    startQuiz(subject);
}

// Back to subjects
function backToSubjects() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('quizTimer').classList.remove('warning');
}
