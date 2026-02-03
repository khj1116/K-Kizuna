
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startButton = document.getElementById('start-test-button');
    const diagnosisSection = document.getElementById('ai-diagnosis');
    const successSection = document.getElementById('success-stories');
    const quizContainer = document.getElementById('quiz');
    const nextButton = document.getElementById('next-button');
    const mainElement = document.querySelector('main');

    const questions = [
        { question: "1. 한국 드라마나 영화를 즐겨보시나요?", options: ["네, 매우 즐겨봐요", "가끔 보는 편이에요", "별로 보지 않아요", "전혀 보지 않아요"], key: "culture" },
        { question: "2. 매운 음식을 어느 정도 드실 수 있나요?", options: ["아주 잘 먹어요", "조금은 먹을 수 있어요", "거의 못 먹어요", "전혀 못 먹어요"], key: "food" },
        { question: "3. 새로운 사람들과 어울리는 것을 좋아하시나요?", options: ["네, 매우 좋아해요", "상황에 따라 달라요", "혼자 있는 것을 더 좋아해요", "많이 낯을 가리는 편이에요"], key: "social" },
        { question: "4. 기념일을 챙기는 것에 대해 어떻게 생각하시나요?", options: ["중요하고 특별하게 챙겨야 해요", "간단하게라도 챙기는게 좋아요", "서로 합의하에 챙기지 않아도 괜찮아요", "별로 중요하지 않다고 생각해요"], key: "anniversary" },
        { question: "5. 연인과의 연락 빈도는 어느 정도가 적당하다고 생각하시나요?", options: ["자주 할수록 좋아요", "필요할 때만 하면 돼요", "하루에 한 번 정도면 충분해요", "문자보다는 통화를 선호해요"], key: "contact" },
        { question: "6. 갈등이 생겼을 때, 어떻게 해결하는 것을 선호하시나요?", options: ["바로 대화로 풀어나가야 해요", "혼자 생각할 시간이 필요해요", "친구들에게 조언을 구해요", "시간이 해결해주길 기다려요"], key: "conflict" },
        { question: "7. 미래의 자녀 계획에 대해 생각해본 적이 있나요?", options: ["네, 긍정적으로 생각하고 있어요", "아직 잘 모르겠어요", "계획이 없어요", "상대방의 의견에 따를래요"], key: "family" }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = {};

    if (startButton) {
        startButton.addEventListener('click', () => {
            diagnosisSection.classList.remove('hidden');
            successSection.classList.add('hidden'); // Hide success stories during quiz
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
            const currentKey = questions[currentQuestionIndex].key;
            userAnswers[currentKey] = selectedOption.value;
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
        
        const seeReportButton = document.getElementById('see-report-button');
        seeReportButton.addEventListener('click', generateReport);
    }
    
    function generateReport() {
        mainElement.innerHTML = ''; // Clear main content
        
        // Simple "AI" score generation
        const score = 70 + Math.floor(Math.random() * 30); // Random score between 70-99
        
        let reportHTML = `
            <section class="report-section">
                <h3>AI 진단 리포트</h3>
                <div class="score-container">
                    <p>당신의 한국 연애/결혼 적응도는...</p>
                    <div class="score">${score}%</div>
                </div>
                <div class="report-details">
                    <h4>상세 분석</h4>
        `;
        
        // Detailed feedback based on answers
        const feedback = {
            culture: `<strong>문화 적응도:</strong> "${userAnswers.culture}"라고 답하셨네요. 한국 대중문화에 대한 관심은 한국 생활과 문화를 이해하는 데 큰 도움이 될 거예요.`,
            food: `<strong>식생활 적응도:</strong> 매운 음식에 대해 "${userAnswers.food}"라고 답해주셨어요. 한국에는 맵지 않고 맛있는 음식도 정말 많으니 걱정하지 마세요!`,
            social: `<strong>사회성 및 관계:</strong> "${userAnswers.social}" 성향은 새로운 환경에서 친구를 사귀는 데 긍정적인 영향을 줄 수 있습니다.`,
            anniversary: `<strong>기념일 가치관:</strong> "${userAnswers.anniversary}"라고 하셨죠. 한국은 기념일을 중요하게 생각하는 경향이 있으니, 상대방과 생각을 조율하는 과정이 즐거울 거예요.`,
            contact: `<strong>연락 스타일:</strong> 연락 빈도에 대해 "${userAnswers.contact}"라고 답하셨군요. 솔직한 대화를 통해 서로에게 맞는 스타일을 찾아가는 것이 중요합니다.`,
            conflict: `<strong>갈등 해결 방식:</strong> 갈등이 생겼을 때 "${userAnswers.conflict}"과 같이 해결하는군요. 당신의 현명한 대처 방식이 관계를 더 단단하게 만들 거예요.`,
            family: `<strong>미래 계획:</strong> 자녀 계획에 대해 "${userAnswers.family}"라고 답해주셨어요. 미래에 대한 솔직한 대화는 신뢰를 쌓는 중요한 과정입니다.`
        };
        
        for (const key in userAnswers) {
            if(feedback[key]) {
                reportHTML += `<div class="report-item"><p>${feedback[key]}</p></div>`;
            }
        }
        
        reportHTML += `
                </div>
                <button id="restart-button">테스트 다시하기</button>
            </section>
        `;
        
        mainElement.innerHTML = reportHTML;
        
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Theme Switcher Logic
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
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
