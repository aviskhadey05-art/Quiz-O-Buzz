let questions = [
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<hyper>"],
        answer: "<a>"
    },
    {
        question: "Which property is used to change text color in CSS?",
        options: ["font-color", "color", "text-style", "bgcolor"],
        answer: "color"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "var", "define", "dim"],
        answer: "var"
    },
    {
        question: "Which symbol is used in Regular Expressions for digit?",
        options: ["\\d", "\\w", ".", "*"],
        answer: "\\d"
    }
];

let currentQuestion = 0;
let score = 0;
let time = 60;
let timer;

function startQuiz() {
    const name = document.getElementById("username").value;
    if (!name) return alert("Enter name");

    localStorage.setItem("username", name);
    window.location.href = "quiz.html";
}

function loadQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";
    q.options.forEach(opt => {
        optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button><br>`;
    });
    document.getElementById("options").innerHTML = optionsHTML;

    updateProgress();
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function updateProgress() {
    let percent = ((currentQuestion) / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = "Time: " + time;
        if (time <= 0) finishQuiz();
    }, 1000);
}

function finishQuiz() {
    clearInterval(timer);

    let name = localStorage.getItem("username");
    let result = { name, score };

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(result);

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 3);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    localStorage.setItem("latestScore", score);

    window.location.href = "result.html";
}

function showResult() {
    let score = localStorage.getItem("latestScore");
    document.getElementById("finalScore").innerText = "Your Score: " + score;

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    let list = "";
    leaderboard.forEach(l => {
        list += `<li>${l.name} - ${l.score}</li>`;
    });

    document.getElementById("leaderboard").innerHTML = list;
}

function restartQuiz() {
    window.location.href = "index.html";
}

function toggleTheme() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}

if (window.location.pathname.includes("quiz.html")) {
    questions.sort(() => Math.random() - 0.5);
    loadQuestion();
    startTimer();
}

if (window.location.pathname.includes("result.html")) {
    showResult();
}
