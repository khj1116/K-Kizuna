
document.addEventListener('DOMContentLoaded', () => {
    // Existing Quiz Logic
    const startButton = document.getElementById('start-test-button');
    const diagnosisSection = document.getElementById('ai-diagnosis');
    const quizContainer = document.getElementById('quiz');
    const nextButton = document.getElementById('next-button');

    const questions = [
        { question: "1. 한국 드라마나 영화를 즐겨보시나요?", options: ["네, 매우 즐겨봐요", "가끔 보는 편이에요", "별로 보지 않아요", "전혀 보지 않아요"] },
        { question: "2. 매운 음식을 어느 정도 드실 수 있나요?", options: ["아주 잘 먹어요", "조금은 먹을 수 있어요", "거의 못 먹어요", "전혀 못 먹어요"] },
        { question: "3. 새로운 사람들과 어울리는 것을 좋아하시나요?", options: ["네, 매우 좋아해요", "상황에 따라 달라요", "혼자 있는 것을 더 좋아해요", "많이 낯을 가리는 편이에요"] },
        { question: "4. 기념일을 챙기는 것에 대해 어떻게 생각하시나요?", options: ["중요하고 특별하게 챙겨야 해요", "간단하게라도 챙기는게 좋아요", "서로 합의하에 챙기지 않아도 괜찮아요", "별로 중요하지 않다고 생각해요"] },
        { question: "5. 연인과의 연락 빈도는 어느 정도가 적당하다고 생각하시나요?", options: ["자주 할수록 좋아요", "필요할 때만 하면 돼요", "하루에 한 번 정도면 충분해요", "문자보다는 통화를 선호해요"] },
        { question: "6. 갈등이 생겼을 때, 어떻게 해결하는 것을 선호하시나요?", options: ["바로 대화로 풀어나가야 해요", "혼자 생각할 시간이 필요해요", "친구들에게 조언을 구해요", "시간이 해결해주길 기다려요"] },
        { question: "7. 미래의 자녀 계획에 대해 생각해본 적이 있나요?", options: ["네, 긍정적으로 생각하고 있어요", "아직 잘 모르겠어요", "계획이 없어요", "상대방의 의견에 따를래요"] }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];

    if (startButton) {
        startButton.addEventListener('click', () => {
            diagnosisSection.classList.remove('hidden');
            startButton.classList.add('hidden');
            displayQuestion();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (!selectedOption) {
                alert("답변을 선택해주세요!");
                return;
            }
            userAnswers.push(selectedOption.value);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResult();
            }
        });
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div class="question-text">${currentQuestion.question}</div>
            <div class="options">
                ${currentQuestion.options.map((option, index) => `
                    <input type="radio" id="option${index}" name="option" value="${option}">
                    <label for="option${index}">${option}</label>
                `).join('')}
            </div>
        `;
    }

    function showResult() {
        quizContainer.innerHTML = `
            <div class="question-text">진단 완료!</div>
            <p>소중한 답변 감사합니다. 당신만을 위한 커스터마이징 리포트를 확인해보세요.</p>
            <button id="see-report-button">리포트 보기</button>
        `;
        nextButton.classList.add('hidden');
    }

    // Theme Switcher Logic
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        // Apply the saved theme on page load
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                themeSwitch.checked = true;
            }
        }

        themeSwitch.addEventListener('change', function(event) {
            if (event.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
});
