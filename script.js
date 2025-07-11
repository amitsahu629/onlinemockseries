// Application State
let currentUser = null;
let currentTest = null;
let currentQuestionIndex = 0;
let testTimer = null;
let testDuration = 150 * 60; // 150 minutes in seconds
let userAnswers = {};
let testStartTime = null;
let questions = [];

// Sample user data (in real app, this would be in a database)
let users = JSON.parse(localStorage.getItem("mockTestUsers") || "[]");
let testResults = JSON.parse(localStorage.getItem("testResults") || "[]");

// Sample questions database
const questionsDB = {
  english: [
    {
      id: 1,
      question: "Choose the correct synonym for 'Abundant':",
      options: ["Scarce", "Plentiful", "Limited", "Rare"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Which of the following is a correct passive voice construction?",
      options: [
        "The book was read by me",
        "The book read by me",
        "The book is read by me",
        "The book reading by me",
      ],
      correctAnswer: 0,
    },
    // Add more English questions...
  ],
  math: [
    {
      question:
        "If the average marks of three classes of 60, 65 and 70 students are 60, 65, 70 respectively, find the average marks of all the students. (Approximately)",
      options: ["69.25", "67.25", "71.25", "65.25"],
      answer: "D",
    },
    {
      question:
        "3 litres are drawn from a cask full of wine and is then filled with water. This operation is performed once more. The ratio of the quantity of wine now left in cask to that of the water is 16:9. How much wine does the cask hold originally? (In liters)",
      options: ["15", "9", "11", "13"],
      answer: "A",
    },
    {
      question:
        "31 people can cut 62 trees in 36 days. In how many days, 32 people can cut 96 trees?",
      options: ["52", "58", "54", "56"],
      answer: "C",
    },
    {
      question: "If 23a=24b and 31b = 23c find a:b:c.",
      options: ["23:24:31", "24:31:24", "24:23:31", "31:24:23"],
      answer: "C",
    },
    {
      question:
        "A lent a part of Rs.25800 to X at 9% simple interest and the rest to Y at 5% simple interest. After 4 years, if he got an amount of Rs.33540 in total, then what is the amount lent to Y? (In Rs.)",
      options: ["9775", "9675", "9575", "9875"],
      answer: "B",
    },
    {
      question:
        "What will come in place of question mark(?) in the following equation? 1171.58-499.31 1076.84-?",
      options: ["404.57", "408.57", "406.57", "402.57"],
      answer: "A",
    },
    {
      question:
        "Ramesh is on a 9 day trip with his college mates. He had decided to keep his average expense for 9 days at Rs.215. However, at the end of eighth day he realized that his expenses on first eight days were Rs. 188, Rs. 194, Rs.218, Rs.220, Rs, 180, Rs.204, Rs.208, and Rs.206 respectively. How much should he spend on the 9th day to ensure that he meets his targeted average expense?(in Rs.)",
      options: ["327", "317", "337", "307"],
      answer: "B",
    },
    {
      question:
        "Jenny gets successive discounts of 10% and then 20% on his food bill of Rs. 4550. What is the amount paid by Jenny?(In Rs.)",
      options: ["2976", "3276", "3076", "3176"],
      answer: "B",
    },
    {
      question:
        "A boat goes 150 km upstream in 30 hours and a distance of 217 km downstream in 31 hours. Find the speed of the boat in still water. (In kmph)",
      options: ["2", "6", "4", "8"],
      answer: "B",
    },
    {
      question:
        "A five digit number is formed with the digits 2, 3, 4, 5 and 6 without repetition. Find the probability that the number is divisible by 5.",
      options: ["4/5", "2/5", "3/5", "1/5"],
      answer: "D",
    },
    {
      question:
        "In a college of 25000 students, 55% of them are boys. If 30% of the girls and 50% of the boys failed in the examination, then find the number of students who passed in the examination.",
      options: ["15750", "13750", "16750", "14750"],
      answer: "D",
    },
    {
      question:
        "The printed price of a system monitor is Rs. 12500. If a sales tax of 6% is realised from the buyer, find the price at which the system monitor is sold. (In Rs.)",
      options: ["13550", "13450", "13350", "13250"],
      answer: "D",
    },
    {
      question:
        "A dealer bought a washing machine for Rs. 18800 and sold at a gain of 40%. Find its selling price. (In Rs.)",
      options: ["26620", "26420", "26520", "26320"],
      answer: "D",
    },
    {
      question:
        "A can contains 72 litres of rose milk at Rs. 13.5 per litre. How much water which is free of cost must be added to this can so that the cost of rose milk reduces to Rs. 12 per litre? (In litres)",
      options: ["15", "9", "13", "11"],
      answer: "B",
    },
    {
      question:
        "A person cycles from hostel to college at a speed of 20 kmph and reaches 17.5 minutes late. If he cycles at a speed of 24 kmph and reaches early by 17.5 minutes, find the distance between hostel and college.(In km)",
      options: ["67", "70", "65", "69"],
      answer: "B",
    },
    {
      question:
        "X can do a piece of work in 272 days. X worked at it for 56 days and then Y finished the remaining work in 216 days. In how many days can X and Y together finish the work?",
      options: ["136", "140", "144", "148"],
      answer: "A",
    },
    {
      question:
        "Find the Principal (Rs.) when simple interest = Rs.3645, rate = 15% p.a. and time = 2 years.",
      options: ["11150", "12350", "12250", "12150"],
      answer: "D",
    },
    {
      question:
        "If the average of three consecutive even numbers is 258, find the largest of these numbers.",
      options: ["265", "275", "270", "260"],
      answer: "D",
    },
    {
      question:
        "The average of 11 numbers is 110.9. If the average of first six is 110.3 and that of the last six is 111.5, then the sixth number is:",
      options: ["112.9", "114.9", "116.9", "110.9"],
      answer: "B",
    },
    {
      question:
        "A fraction is greater than twice its reciprocal by 17/28. What is the fraction?",
      options: ["7/5", "7/3", "7/2", "7/4"],
      answer: "E",
    },
    {
      question:
        "What value should come in the place of question mark (?) in the following question? 0.527 + 0.325 + 0.224 = ?",
      options: ["432/990", "422/990", "412/990", "402/990"],
      answer: "B",
    },
    {
      question:
        "A travels from X to Y at a speed of 132 kmph and reaches 180 minutes late. If he travels at a speed of 220 kmph and reaches early by 180 minutes, find the distance between X and Y.(In km)",
      options: ["2180", "1980", "2080", "2280"],
      answer: "B",
    },
    {
      question:
        "Arun ,Bala, Chandru enter into a partnership. Arun contributes one-third of the whole capital while Bala contributes as much as the contribution of Arun and Chandru together. If the profit at the end of the year is Rs.84,000, how much would Chandru receive?(in Rs.)",
      options: ["14000", "28000", "16000", "42000"],
      answer: "A",
    },
    {
      question:
        "X and Y invest Rs.5600 and Rs.6600 respectively in a business. If X doubles his capital after 6 months, in what ratio should X and Y divide that year's profit?",
      options: ["13:14", "14:11", "11:14", "14:13"],
      answer: "B",
    },
    {
      question:
        "Milk and water are in the ratio of 3:2 in a mixture of 90 litres. How much water should be added so that the ratio of milk and water becomes 2:3? (In litres)",
      options: ["45", "47", "49", "51"],
      answer: "A",
    },
    {
      question:
        "A can do a piece of work in 216 days and B can do the same work in 540 days. With the help of C, they finished the work in 108 days. Working alone, C can do the same work in how many days?",
      options: ["360", "330", "340", "350"],
      answer: "A",
    },
    {
      question:
        "Simple interest on a sum at 20% per annum for 2 years is Rs.1040. Find the amount under compound interest on the same sum for the same period and same rate of interest.(in Rs)",
      options: ["3644", "3844", "3744", "3544"],
      answer: "C",
    },
    {
      question:
        "Two vessels containing 35 litres and 47 litres quantity of solution, have milk and water in the ratio of 17:18 and 28:19 respectively. If the solutions are mixed with each other, then how many litres of water has to be added in the final solution to make the resulting solution in the ratio 1:1?",
      options: ["12", "6", "8", "10"],
      answer: "C",
    },
    {
      question:
        "XYZ mixes 42 kg of rice worth Rs.40 per kg with 58 kg of rice worth Rs.60 per kg. At what rate should he sell the mixture to gain 20%? (Cost per kg in Rs.)",
      options: ["61.92", "65.96", "67.92", "63.92"],
      answer: "A",
    },
    {
      question:
        "The ratio of three numbers is 12:13:14 and their sum is 1872. Find the second number of the three numbers.",
      options: ["594", "604", "614", "624"],
      answer: "D",
    },
    {
      question:
        "The length, breadth and height of a room in the shape of a cuboid are increased by 10%, 20% and 25% respectively. Find the percentage change in the volume of the cuboid.",
      options: ["70% decrease", "75% increase", "65% increase", "60% decrease"],
      answer: "C",
    },
    {
      question:
        "The amount doubles itself under Simple interest in 2.5 years. In how many years will it become 42 times of itself?",
      options: ["106.5", "104.5", "100.5", "102.5"],
      answer: "D",
    },
    {
      question:
        "In a moderately asymmetrical series, the values of arithmetic mean and median are 143 and 143.5 respectively. What is the value of the mode?",
      options: ["148.5", "150.5", "144.5", "146.5"],
      answer: "C",
    },
    {
      question:
        "The price of a CPU is Rs.19425 inclusive of sales tax. If the rate of sales tax is 11%, find the printed price of the CPU. (In Rs.)",
      options: ["17800", "17600", "17700", "17500"],
      answer: "D",
    },
    {
      question:
        "Three pipes A, B and C can fill a cistern in 270 hours. After working together for 90 hours, C is closed, then A and B filled the remaining part in 270 hours. Find the number of hours taken by C required to fill the empty cistern.",
      options: ["820", "810", "800", "790"],
      answer: "B",
    },
    {
      question:
        "A and B, working together can finish a piece of work in 339 days, while A alone can do it in 565 days. How many days will B alone take to finish it?",
      options: ["857.5", "837.5", "847.5", "867.5"],
      answer: "C",
    },
    {
      question:
        "A man travels at a speed of 540 kmph and covers a certain distance in 36 minutes. Find the distance covered in metres.",
      options: ["344000", "314000", "334000", "324000"],
      answer: "D",
    },
    {
      question:
        "If the arithmetic mean of 13 observations 385, 386, 388, 379, 387, 381, 383, 378, 386, 387, X, 381, 385 is 375. Find the value of 'X' in the observations.",
      options: ["269", "273", "275", "271"],
      answer: "A",
    },
    {
      question:
        "Sultan bought a new plot which needs to be fenced immediately. Due to this, the length and as well as the breadth of the rectangular working place is reduced by 9%. Find the % decrease in the area.",
      options: ["18.00%", "13.56%", "16.96%", "17.19%"],
      answer: "D",
    },
    {
      question: "What percent of 7.3 kg is 2044 gms?",
      options: ["48%", "28%", "38%", "18%"],
      answer: "B",
    },
    {
      question:
        "A monitor for personal computer is bought for Rs.22500 and sold at Rs.15750. Find its loss percentage.",
      options: ["40", "30", "35", "45"],
      answer: "B",
    },
    {
      question:
        "220 litres of a mixture of milk and water contains 45% water. How much water should be added so that the mixture has 80% water? (In litres)",
      options: ["385", "395", "390", "400"],
      answer: "A",
    },
    {
      question: "13.6895 divided by 0.131 gives:",
      options: ["102.5", "106.5", "104.5", "108.5"],
      answer: "C",
    },
    {
      question:
        "From a group of 28 men and 22 women, 3 persons are selected at random. Find the probability that out of the selected three persons, two are men and one is a woman. (Approximately in %)",
      options: ["42.43", "44.53", "46.53", "48.53"],
      answer: "A",
    },
    {
      question:
        "How many seconds will a train take to cover a distance of 5120 meters, if it runs at a speed of 288 km/hr?",
      options: ["60", "66", "62", "64"],
      answer: "D",
    },
    {
      question:
        "A sum of money invested at simple interest triples itself in 15 years. Find in how many years will it become 13 times of itself at the same rate of interest.",
      options: ["80", "95", "90", "97"],
      answer: "C",
    },
    {
      question:
        "The average weight of 36 students in a class is 54.25 kg, and that of the remaining 20 students is 51 kg. Find the average weight of all the students in the class. (Approximately)",
      options: ["49", "51", "53", "47"],
      answer: "C",
    },
    {
      question: "What is 20% of 40% of 30% of 75% of 3400?",
      options: ["61.5", "61.4", "61.2", "61.1"],
      answer: "C",
    },
    {
      question:
        "Three friends A, B, C invested in a business in the ratio of 2:3:4. After 6 months C withdraw half his capital. If the total profit earned for the year is Rs.110000 then find the profit earned by C.(In Rs.)",
      options: ["42250", "41250", "43250", "44250"],
      answer: "B",
    },
    {
      question:
        "A fraction is greater than its reciprocal by 27/182. What is the fraction?",
      options: ["11/10", "14/13", "13/12", "12/11"],
      answer: "B",
    },

    // Add more Math questions...
  ],
  general: [
    {
      id: 1,
      question: "Who is the current President of India?",
      options: [
        "Ram Nath Kovind",
        "Droupadi Murmu",
        "Pranab Mukherjee",
        "A.P.J. Abdul Kalam",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    // Add more General Awareness questions...
  ],
  odia: [
    {
      id: 1,
      question: "ଓଡ଼ିଆ ସାହିତ୍ୟର ଆଦିକବି କିଏ?",
      options: ["ସରଳାଦାସ", "ଜଗନ୍ନାଥ ଦାସ", "ବଳରାମ ଦାସ", "ଅଚ୍ୟୁତାନନ୍ଦ ଦାସ"],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "ଓଡ଼ିଶାର ରାଜଧାନୀ କଣ?",
      options: ["କଟକ", "ଭୁବନେଶ୍ୱର", "ବେରହାମପୁର", "ସମ୍ବଲପୁର"],
      correctAnswer: 1,
    },
    // Add more Odia questions...
  ],
  computer: [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Program Unit",
        "Computer Program Unit",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Which of the following is a programming language?",
      options: ["HTTP", "HTML", "Java", "URL"],
      correctAnswer: 2,
    },
    // Add more Computer questions...
  ],
};

// Generate complete question set for a test
function generateQuestions() {
  const testQuestions = [];

  // Generate English questions (40)
  for (let i = 0; i < 40; i++) {
    const baseQuestion = questionsDB.english[i % questionsDB.english.length];
    testQuestions.push({
      ...baseQuestion,
      id: i + 1,
      subject: "english",
      question: ` (Q${i + 1})` + " " + baseQuestion.question,
    });
  }

  // Generate Math questions (40)
  for (let i = 0; i < 40; i++) {
    const baseQuestion = questionsDB.math[i % questionsDB.math.length];
    testQuestions.push({
      ...baseQuestion,
      id: i + 41,
      subject: "math",
      question: ` (Q${i + 41})` + " " + baseQuestion.question,
    });
  }

  // Generate General Awareness questions (40)
  for (let i = 0; i < 40; i++) {
    const baseQuestion = questionsDB.general[i % questionsDB.general.length];
    testQuestions.push({
      ...baseQuestion,
      id: i + 81,
      subject: "general",
      question: ` (Q${i + 81})` + " " + baseQuestion.question,
    });
  }

  // Generate Odia questions (20)
  for (let i = 0; i < 20; i++) {
    const baseQuestion = questionsDB.odia[i % questionsDB.odia.length];
    testQuestions.push({
      ...baseQuestion,
      id: i + 121,
      subject: "odia",
      question: ` (Q${i + 121})` + " " + baseQuestion.question,
    });
  }

  // Generate Computer questions (40)
  for (let i = 0; i < 40; i++) {
    const baseQuestion = questionsDB.computer[i % questionsDB.computer.length];
    testQuestions.push({
      ...baseQuestion,
      id: i + 141,
      subject: "computer",
      question: ` (Q${i + 141})` + " " + baseQuestion.question,
    });
  }

  return testQuestions;
}

// Initialize the application
function init() {
  // Check if user is logged in
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showScreen("dashboardScreen");
    loadDashboard();
  } else {
    showScreen("loginScreen");
  }
}

// Screen management
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

// Authentication
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    showScreen("dashboardScreen");
    loadDashboard();
    showMessage("loginMessage", "Login successful!", "success");
  } else {
    showMessage("loginMessage", "Invalid email or password!", "error");
  }
});

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      showMessage("registerMessage", "Passwords do not match!", "error");
      return;
    }

    if (users.find((u) => u.email === email)) {
      showMessage("registerMessage", "Email already exists!", "error");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      joinDate: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("mockTestUsers", JSON.stringify(users));
    showMessage(
      "registerMessage",
      "Registration successful! Please login.",
      "success"
    );

    // Clear form
    document.getElementById("registerForm").reset();

    // Switch to login screen after 2 seconds
    setTimeout(() => {
      showScreen("loginScreen");
    }, 2000);
  });

// Dashboard functions
function loadDashboard() {
  document.getElementById("userName").textContent = currentUser.name;

  // Calculate user statistics
  const userResults = testResults.filter((r) => r.userId === currentUser.id);
  document.getElementById("totalTests").textContent = userResults.length;

  if (userResults.length > 0) {
    const avgScore =
      userResults.reduce((sum, r) => sum + r.score, 0) / userResults.length;
    document.getElementById("avgScore").textContent = Math.round(avgScore);
  } else {
    document.getElementById("avgScore").textContent = "0";
  }

  // Generate mock test cards
  generateMockTestCards();
}

function generateMockTestCards() {
  const grid = document.getElementById("mockTestGrid");
  grid.innerHTML = "";

  for (let i = 1; i <= 40; i++) {
    const userResult = testResults.find(
      (r) => r.userId === currentUser.id && r.testId === i
    );
    const isCompleted = !!userResult;

    const card = document.createElement("div");
    card.className = "mock-test-card";
    card.innerHTML = `
                    <h3>Mock Test ${i}</h3>
                    <div class="test-info">
                        <span>180 Questions</span>
                        <span>150 Minutes</span>
                    </div>
                    <div class="test-info">
                        <span>English: 40</span>
                        <span>Math: 40</span>
                    </div>
                    <div class="test-info">
                        <span>General: 40</span>
                        <span>Odia: 20</span>
                    </div>
                    <div class="test-info">
                        <span>Computer: 40</span>
                        <span>${isCompleted ? "Completed" : "Not Taken"}</span>
                    </div>
                    ${
                      isCompleted
                        ? `<div style="margin-top: 10px; color: #28a745; font-weight: 600;">Score: ${userResult.score}</div>`
                        : ""
                    }
                    <button class="btn" onclick="startMockTest(${i})" style="margin-top: 15px; width: 100%;">
                        ${isCompleted ? "Retake Test" : "Start Test"}
                    </button>
                `;
    grid.appendChild(card);
  }
}

function startMockTest(testId) {
  currentTest = testId;
  showScreen("instructionsScreen");
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  showScreen("loginScreen");
}

// Test functions
function startTest() {
  questions = generateQuestions();
  userAnswers = {};
  currentQuestionIndex = 0;
  testStartTime = Date.now();

  showScreen("testScreen");
  document.getElementById("questionPalette").style.display = "block";

  // Initialize test UI
  generateQuestionPalette();
  loadQuestion();
  startTimer();
  updateProgress();
}

function generateQuestionPalette() {
  const paletteGrid = document.getElementById("paletteGrid");
  paletteGrid.innerHTML = "";

  for (let i = 0; i < 180; i++) {
    const item = document.createElement("div");
    item.className = "palette-item";
    item.textContent = i + 1;
    item.onclick = () => goToQuestion(i);
    paletteGrid.appendChild(item);
  }
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("currentQuestionNum").textContent =
    currentQuestionIndex + 1;
  document.getElementById("questionText").textContent = question.question;

  // Load options
  const optionsContainer = document.getElementById("questionOptions");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";
    if (userAnswers[question.id] === index) {
      optionDiv.classList.add("selected");
    }

    optionDiv.innerHTML = `
                    <input type="radio" name="answer" value="${index}" ${
      userAnswers[question.id] === index ? "checked" : ""
    }>
                    <span>${String.fromCharCode(65 + index)}. ${option}</span>
                `;

    optionDiv.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionDiv);
  });

  // Update navigation buttons
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").textContent =
    currentQuestionIndex === 179 ? "Submit Test" : "Next";

  // Update subject tabs
  updateSubjectTabs();
  updateQuestionPalette();
}

function selectOption(optionIndex) {
  const question = questions[currentQuestionIndex];
  userAnswers[question.id] = optionIndex;

  // Update UI
  document.querySelectorAll(".option").forEach((opt, index) => {
    opt.classList.toggle("selected", index === optionIndex);
    opt.querySelector("input").checked = index === optionIndex;
  });

  updateQuestionPalette();
}

function updateSubjectTabs() {
  const currentSubject = questions[currentQuestionIndex].subject;
  document.querySelectorAll(".subject-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.subject === currentSubject);
  });
}

function updateQuestionPalette() {
  const paletteItems = document.querySelectorAll(".palette-item");
  paletteItems.forEach((item, index) => {
    item.classList.remove("answered", "current");
    if (index === currentQuestionIndex) {
      item.classList.add("current");
    } else if (userAnswers[questions[index].id] !== undefined) {
      item.classList.add("answered");
    }
  });
}

function nextQuestion() {
  if (currentQuestionIndex < 179) {
    currentQuestionIndex++;
    loadQuestion();
    updateProgress();
  } else {
    confirmSubmit();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
    updateProgress();
  }
}

function goToQuestion(questionIndex) {
  currentQuestionIndex = questionIndex;
  loadQuestion();
  updateProgress();
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / 180) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

function startTimer() {
  let timeLeft = testDuration;

  testTimer = setInterval(() => {
    timeLeft--;

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(testTimer);
      submitTest();
    }
  }, 1000);
}

function confirmSubmit() {
  document.getElementById("confirmModal").classList.add("active");
}

function closeModal() {
  document.getElementById("confirmModal").classList.remove("active");
}

function submitTest() {
  clearInterval(testTimer);
  document.getElementById("confirmModal").classList.remove("active");
  document.getElementById("questionPalette").style.display = "none";

  // Calculate results
  const results = calculateResults();

  // Save results
  const testResult = {
    userId: currentUser.id,
    testId: currentTest,
    score: results.totalScore,
    correctAnswers: results.correctAnswers,
    wrongAnswers: results.wrongAnswers,
    unanswered: results.unanswered,
    accuracy: results.accuracy,
    subjectScores: results.subjectScores,
    timeTaken: Date.now() - testStartTime,
    date: new Date().toISOString(),
  };

  testResults.push(testResult);
  localStorage.setItem("testResults", JSON.stringify(testResults));

  // Show results
  displayResults(results);
  showScreen("resultsScreen");
}

function calculateResults() {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let unanswered = 0;
  let totalScore = 0;

  const subjectScores = {
    english: { correct: 0, wrong: 0, unanswered: 0, score: 0 },
    math: { correct: 0, wrong: 0, unanswered: 0, score: 0 },
    general: { correct: 0, wrong: 0, unanswered: 0, score: 0 },
    odia: { correct: 0, wrong: 0, unanswered: 0, score: 0 },
    computer: { correct: 0, wrong: 0, unanswered: 0, score: 0 },
  };

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    const subject = question.subject;

    if (userAnswer === undefined) {
      unanswered++;
      subjectScores[subject].unanswered++;
    } else if (userAnswer === question.correctAnswer) {
      correctAnswers++;
      subjectScores[subject].correct++;
      totalScore += 1;
      subjectScores[subject].score += 1;
    } else {
      wrongAnswers++;
      subjectScores[subject].wrong++;
      totalScore -= 0.33;
      subjectScores[subject].score -= 0.33;
    }
  });

  const accuracy =
    correctAnswers > 0
      ? (correctAnswers / (correctAnswers + wrongAnswers)) * 100
      : 0;

  return {
    totalScore: Math.round(totalScore * 100) / 100,
    correctAnswers,
    wrongAnswers,
    unanswered,
    accuracy: Math.round(accuracy * 100) / 100,
    subjectScores,
    percentile: Math.floor(Math.random() * 40) + 60, // Mock percentile
  };
}

function displayResults(results) {
  document.getElementById("totalScore").textContent = results.totalScore;
  document.getElementById("correctAnswers").textContent =
    results.correctAnswers;
  document.getElementById("wrongAnswers").textContent = results.wrongAnswers;
  document.getElementById("unanswered").textContent = results.unanswered;
  document.getElementById("accuracy").textContent = results.accuracy + "%";
  document.getElementById("percentile").textContent = results.percentile;

  // Display subject-wise scores
  const subjectScoresContainer = document.getElementById("subjectScores");
  subjectScoresContainer.innerHTML = "";

  const subjectNames = {
    english: "English",
    math: "Mathematics",
    general: "General Awareness",
    odia: "Odia",
    computer: "Computer",
  };

  Object.keys(results.subjectScores).forEach((subject) => {
    const subjectData = results.subjectScores[subject];
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject-score";
    subjectDiv.innerHTML = `
                    <h4>${subjectNames[subject]}</h4>
                    <div style="font-size: 20px; font-weight: 600; color: #667eea; margin: 5px 0;">${
                      Math.round(subjectData.score * 100) / 100
                    }</div>
                    <div style="font-size: 12px; color: #666;">
                        ✓ ${subjectData.correct} | ✗ ${subjectData.wrong} | - ${
      subjectData.unanswered
    }
                    </div>
                `;
    subjectScoresContainer.appendChild(subjectDiv);
  });
}

function downloadScorecard() {
  // Create a simple HTML content for PDF generation
  const scorecardContent = `
                <html>
                <head>
                    <title>Mock Test Scorecard</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .score-section { margin: 20px 0; }
                        .score-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                        .score-item { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
                        .subject-scores { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Mock Test Platform</h1>
                        <h2>Test Scorecard</h2>
                        <p>Student: ${currentUser.name}</p>
                        <p>Test: Mock Test ${currentTest}</p>
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div class="score-section">
                        <h3>Overall Performance</h3>
                        <div class="score-grid">
                            <div class="score-item">
                                <h4>Total Score</h4>
                                <div style="font-size: 24px; font-weight: bold;">${
                                  document.getElementById("totalScore")
                                    .textContent
                                }</div>
                            </div>
                            <div class="score-item">
                                <h4>Accuracy</h4>
                                <div style="font-size: 24px; font-weight: bold;">${
                                  document.getElementById("accuracy")
                                    .textContent
                                }</div>
                            </div>
                            <div class="score-item">
                                <h4>Percentile</h4>
                                <div style="font-size: 24px; font-weight: bold;">${
                                  document.getElementById("percentile")
                                    .textContent
                                }</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="score-section">
                        <h3>Answer Statistics</h3>
                        <div class="score-grid">
                            <div class="score-item">
                                <h4>Correct Answers</h4>
                                <div style="font-size: 20px; color: green;">${
                                  document.getElementById("correctAnswers")
                                    .textContent
                                }</div>
                            </div>
                            <div class="score-item">
                                <h4>Wrong Answers</h4>
                                <div style="font-size: 20px; color: red;">${
                                  document.getElementById("wrongAnswers")
                                    .textContent
                                }</div>
                            </div>
                            <div class="score-item">
                                <h4>Unanswered</h4>
                                <div style="font-size: 20px; color: orange;">${
                                  document.getElementById("unanswered")
                                    .textContent
                                }</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="score-section">
                        <h3>Subject-wise Performance</h3>
                        <div class="subject-scores">
                            ${Array.from(
                              document.getElementById("subjectScores").children
                            )
                              .map((child) => child.outerHTML)
                              .join("")}
                        </div>
                    </div>
                </body>
                </html>
            `;

  // Create and download the scorecard
  const blob = new Blob([scorecardContent], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `scorecard_mocktest_${currentTest}_${currentUser.name.replace(
    /\s+/g,
    "_"
  )}.html`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Subject tab functionality
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".subject-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const subject = this.dataset.subject;
      const subjectRanges = {
        english: { start: 0, end: 39 },
        math: { start: 40, end: 79 },
        general: { start: 80, end: 119 },
        odia: { start: 120, end: 139 },
        computer: { start: 140, end: 179 },
      };

      const range = subjectRanges[subject];
      if (range) {
        goToQuestion(range.start);
      }
    });
  });
});

// Utility functions
function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = type === "success" ? "success-message" : "error-message";

  setTimeout(() => {
    element.textContent = "";
    element.className = "";
  }, 5000);
}

// Prevent cheating measures
document.addEventListener("contextmenu", function (e) {
  if (document.getElementById("testScreen").classList.contains("active")) {
    e.preventDefault();
  }
});

document.addEventListener("keydown", function (e) {
  if (document.getElementById("testScreen").classList.contains("active")) {
    // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
      (e.ctrlKey && e.keyCode === 85)
    ) {
      e.preventDefault();
    }
  }
});

// Handle page visibility change
document.addEventListener("visibilitychange", function () {
  if (
    document.getElementById("testScreen").classList.contains("active") &&
    document.hidden
  ) {
    // Could implement warning system here
    console.log("User switched tabs during test");
  }
});

// Initialize the application
init();
