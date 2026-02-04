
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startButton = document.getElementById('start-test-button');
    const diagnosisSection = document.getElementById('ai-diagnosis');
    const successSection = document.getElementById('success-stories');
    const quizContainer = document.getElementById('quiz');
    const nextButton = document.getElementById('next-button');
    const mainElement = document.querySelector('main');

    const questions = [
        { question: "1. 韓国ドラマや映画はよく見ますか？", options: ["はい、とても楽しんで見ています", "たまに見ます", "あまり見ません", "全く見ません"], key: "culture" },
        { question: "2. 辛い食べ物はどのくらい食べられますか？", options: ["とてもよく食べられます", "少しは食べられます", "ほとんど食べられません", "全く食べられません"], key: "food" },
        { question: "3. 新しい人との交流は好きですか？", options: ["はい、とても好きです", "状況によります", "一人でいる方が好きです", "かなり人見知りする方です"], key: "social" },
        { question: "4. 記念日を祝うことについてどう思いますか？", options: ["重要で特別に祝うべきです", "簡単にでも祝うのが良いです", "お互いの合意があれば祝わなくても大丈夫です", "あまり重要だとは思いません"], key: "anniversary" },
        { question: "5. 恋人との連絡頻度はどのくらいが適切だと思いますか？", options: ["頻繁であるほど良いです", "必要な時だけで良いです", "一日に一度くらいで十分です", "メッセージより通話を好みます"] , key: "contact" },
        { question: "6. 争いが生じたとき、どのように解決することを好みますか？", options: ["すぐに話し合って解決すべきです", "一人で考える時間が必要です", "友達にアドバイスを求めます", "時間が解決してくれるのを待ちます"], key: "conflict" },
        { question: "7. 将来の子供の計画について考えたことがありますか？", options: ["はい、前向きに考えています", "まだよくわかりません", "計画はありません", "相手の意見に従います"], key: "family" }
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
                alert("回答を選択してください！");
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
            <div class="question-text">診断完了！</div>
            <p>貴重なご回答ありがとうございます。あなただけのカスタマイズレポートをご確認ください。</p>
            <button id="see-report-button">レポートを見る</button>
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
                <h3>AI診断レポート</h3>
                <div class="score-container">
                    <p>あなたの韓国恋愛/結婚適応度は...</p>
                    <div class="score">${score}%</div>
                </div>
                <div class="report-details">
                    <h4>詳細分析</h4>
        `;
        
        // Detailed feedback based on answers
        const feedback = {
            culture: `<strong>文化適応度:</strong> 「${userAnswers.culture}」と答えましたね。韓国の大衆文化への関心は、韓国での生活や文化を理解する上で大きな助けになるでしょう。`,
            food: `<strong>食生活適応度:</strong> 辛い食べ物について「${userAnswers.food}」と答えましたね。韓国には辛くない美味しい料理もたくさんあるのでご心配なく！`,
            social: `<strong>社会性および関係性:</strong> 「${userAnswers.social}」という性格は、新しい環境で友人を作るのに良い影響を与えるでしょう。`,
            anniversary: `<strong>記念日の価値観:</strong> 「${userAnswers.anniversary}」と答えましたね。韓国では記念日を大切にする傾向があるので、相手と意見を調整する過程も楽しいはずです。`,
            contact: `<strong>連絡スタイル:</strong> 連絡頻度について「${userAnswers.contact}」と答えましたね。正直な話し合いを通じて、お互いに合ったスタイルを見つけることが大切です。`,
            conflict: `<strong>葛藤解決方法:</strong> 葛藤が生じたときに「${userAnswers.conflict}」のように解決するのですね。あなたの賢明な対処法が関係をより強固にするでしょう。`,
            family: `<strong>将来の計画:</strong> 子供の計画について「${userAnswers.family}」と答えましたね。未来についての正直な話し合いは、信頼を築く上で重要な過程です。`
        };
        
        for (const key in userAnswers) {
            if(feedback[key]) {
                reportHTML += `<div class="report-item"><p>${feedback[key]}</p></div>`;
            }
        }
        
        reportHTML += `
                </div>
                <button id="restart-button">テストをやり直す</button>
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
