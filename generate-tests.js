/**
 * Test Generation Script for Academic Word Forge
 * Generates printable tests with MCQ, odd-one-out, and missing word questions
 */

const fs = require('fs');
const path = require('path');

// Import the week data (we'll need to export it from constants.ts)
// For now, we'll define a simplified structure
const WEEK_DATA = require('./week-data.json');

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generate MCQ questions from vocabulary
 */
function generateMCQ(vocabulary, count = 4) {
    const questions = [];
    const shuffledVocab = shuffle(vocabulary);

    for (let i = 0; i < Math.min(count, shuffledVocab.length); i++) {
        const correctWord = shuffledVocab[i];
        const distractors = shuffledVocab
            .filter(w => w.term !== correctWord.term)
            .slice(0, 3)
            .map(w => w.term);

        const options = shuffle([correctWord.term, ...distractors]);
        const correctIndex = options.indexOf(correctWord.term);

        questions.push({
            type: 'MCQ',
            question: `Which word means "${correctWord.definition}"?`,
            questionMalay: `Perkataan mana yang bermaksud "${correctWord.definition}"?`,
            options: options,
            correctAnswer: String.fromCharCode(65 + correctIndex), // A, B, C, D
            correctTerm: correctWord.term
        });
    }

    return questions;
}

/**
 * Generate odd-one-out questions
 */
function generateOddOneOut(vocabulary, count = 4) {
    const questions = [];

    // Group words by context/subject if available
    const subjectGroups = {};
    vocabulary.forEach(word => {
        if (word.contexts && word.contexts.length > 0) {
            word.contexts.forEach(ctx => {
                if (!subjectGroups[ctx.subject]) {
                    subjectGroups[ctx.subject] = [];
                }
                subjectGroups[ctx.subject].push(word.term);
            });
        }
    });

    const subjects = Object.keys(subjectGroups);

    for (let i = 0; i < count && subjects.length >= 2; i++) {
        const mainSubject = subjects[i % subjects.length];
        const oddSubject = subjects[(i + 1) % subjects.length];

        const mainWords = shuffle(subjectGroups[mainSubject]).slice(0, 3);
        const oddWord = shuffle(subjectGroups[oddSubject])[0];

        if (mainWords.length === 3 && oddWord) {
            const allWords = shuffle([...mainWords, oddWord]);
            const correctIndex = allWords.indexOf(oddWord);

            questions.push({
                type: 'OddOneOut',
                question: 'Which word does not belong with the others?',
                questionMalay: 'Perkataan mana yang tidak tergolong dengan yang lain?',
                options: allWords,
                correctAnswer: String.fromCharCode(65 + correctIndex),
                correctTerm: oddWord,
                reason: `${oddWord} relates to ${oddSubject}, while the others relate to ${mainSubject}`
            });
        }
    }

    return questions;
}

/**
 * Generate missing word (cloze) questions
 */
function generateMissingWord(vocabulary, count = 4) {
    const questions = [];
    const shuffledVocab = shuffle(vocabulary);

    for (let i = 0; i < Math.min(count, shuffledVocab.length); i++) {
        const correctWord = shuffledVocab[i];

        if (correctWord.contexts && correctWord.contexts.length > 0) {
            const context = correctWord.contexts[0];
            const sentence = context.sentence.replace(correctWord.term, '________');

            const distractors = shuffledVocab
                .filter(w => w.term !== correctWord.term)
                .slice(0, 3)
                .map(w => w.term);

            const options = shuffle([correctWord.term, ...distractors]);
            const correctIndex = options.indexOf(correctWord.term);

            questions.push({
                type: 'MissingWord',
                question: `Complete the sentence: "${sentence}"`,
                questionMalay: `Lengkapkan ayat: "${sentence}"`,
                options: options,
                correctAnswer: String.fromCharCode(65 + correctIndex),
                correctTerm: correctWord.term,
                fullSentence: context.sentence
            });
        }
    }

    return questions;
}

/**
 * Generate HTML for a single level test
 */
function generateLevelTestHTML(level, weekData) {
    const allVocab = [...weekData.vocabulary];

    // Generate questions
    const mcqQuestions = generateMCQ(allVocab, 4);
    const oddOneOutQuestions = generateOddOneOut(allVocab, 4);
    const missingWordQuestions = generateMissingWord(allVocab, 4);

    const allQuestions = [...mcqQuestions, ...oddOneOutQuestions, ...missingWordQuestions];

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level ${level} Test - Academic Word Forge</title>
    <style>
        @media print {
            @page { margin: 1cm; }
            body { margin: 0; }
            .no-print { display: none; }
        }
        body {
            font-family: 'Times New Roman', Times, serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            color: black;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 5px 0;
            font-size: 24px;
        }
        .header h2 {
            margin: 5px 0;
            font-size: 18px;
            font-weight: normal;
        }
        .student-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border: 1px solid black;
            padding: 10px;
        }
        .student-info div {
            flex: 1;
        }
        .question {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        .question-number {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .question-type {
            font-size: 11px;
            font-style: italic;
            color: #555;
            margin-bottom: 5px;
        }
        .question-text {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        .malay-support {
            font-size: 12px;
            color: #666;
            font-style: italic;
            margin-bottom: 10px;
        }
        .options {
            margin-left: 20px;
        }
        .option {
            margin-bottom: 8px;
            display: flex;
            align-items: baseline;
        }
        .option-letter {
            font-weight: bold;
            margin-right: 8px;
            min-width: 20px;
        }
        .answer-key {
            margin-top: 40px;
            border-top: 2px solid black;
            padding-top: 20px;
            page-break-before: always;
        }
        .answer-key h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .answer-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .answer-item {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }
        .answer-explanation {
            font-size: 12px;
            margin-top: 20px;
            border: 1px solid black;
            padding: 15px;
        }
        .marking-sheet {
            margin-top: 20px;
            border: 2px solid black;
            padding: 15px;
        }
        .marking-sheet h3 {
            margin-top: 0;
            text-align: center;
        }
        .score-box {
            text-align: center;
            font-size: 18px;
            margin-top: 10px;
            padding: 10px;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ACADEMIC WORD FORGE</h1>
        <h2>Level ${level} Vocabulary Test</h2>
        <h2>${weekData.title}</h2>
    </div>

    <div class="student-info">
        <div>Name: _______________________________</div>
        <div>Date: _______________________________</div>
    </div>

    <div class="instructions" style="margin-bottom: 30px; border: 1px solid black; padding: 15px;">
        <strong>Instructions:</strong> This test contains 12 questions testing your understanding of Level ${level} vocabulary.
        Answer all questions by selecting the best option (A, B, C, or D).
        <br><br>
        <em style="font-size: 12px;">Arahan: Ujian ini mengandungi 12 soalan yang menguji pemahaman anda tentang perbendaharaan kata Tahap ${level}.
        Jawab semua soalan dengan memilih pilihan terbaik (A, B, C, atau D).</em>
    </div>

    <div class="questions">
`;

    // Add questions
    allQuestions.forEach((q, index) => {
        html += `
        <div class="question">
            <div class="question-number">Question ${index + 1}</div>
            <div class="question-type">[${q.type}]</div>
            <div class="question-text">${q.question}</div>
            <div class="malay-support">${q.questionMalay}</div>
            <div class="options">
`;
        q.options.forEach((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex);
            html += `                <div class="option">
                    <span class="option-letter">${letter}.</span>
                    <span>${option}</span>
                </div>
`;
        });
        html += `            </div>
        </div>
`;
    });

    html += `    </div>

    <!-- Answer Key -->
    <div class="answer-key">
        <h2>ANSWER KEY - FOR TEACHER USE ONLY</h2>
        <h2>KUNCI JAWAPAN - UNTUK KEGUNAAN GURU SAHAJA</h2>

        <div class="answer-grid">
`;

    allQuestions.forEach((q, index) => {
        html += `            <div class="answer-item">
                <strong>Q${index + 1}:</strong> ${q.correctAnswer}
            </div>
`;
    });

    html += `        </div>

        <div class="answer-explanation">
            <h3 style="margin-top: 0;">Answer Explanations</h3>
`;

    allQuestions.forEach((q, index) => {
        html += `            <p><strong>${index + 1}. ${q.correctAnswer}</strong> - ${q.correctTerm}`;
        if (q.reason) {
            html += ` (${q.reason})`;
        }
        if (q.fullSentence) {
            html += ` - Full sentence: "${q.fullSentence}"`;
        }
        html += `</p>
`;
    });

    html += `        </div>

        <div class="marking-sheet">
            <h3>Marking Sheet / Lembaran Penilaian</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                <div>
                    <strong>Total Questions:</strong> ${allQuestions.length}<br>
                    <strong>Jumlah Soalan:</strong> ${allQuestions.length}
                </div>
                <div>
                    <strong>Pass Mark (60%):</strong> ${Math.ceil(allQuestions.length * 0.6)}<br>
                    <strong>Markah Lulus (60%):</strong> ${Math.ceil(allQuestions.length * 0.6)}
                </div>
            </div>
            <div class="score-box">
                Score: _____ / ${allQuestions.length} = _____%
            </div>
        </div>
    </div>

    <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: #333; color: white; border: none; border-radius: 5px;">
            Print Test
        </button>
    </div>
</body>
</html>`;

    return html;
}

/**
 * Generate HTML for formal tests (covering multiple levels)
 */
function generateFormalTestHTML(testNumber, levelRange, allWeekData) {
    const [startLevel, endLevel] = levelRange;
    const title = `Levels ${startLevel}-${endLevel}`;

    // Combine vocabulary from all levels in range
    const allVocab = [];
    for (let i = startLevel - 1; i < endLevel; i++) {
        if (allWeekData[i]) {
            allVocab.push(...allWeekData[i].vocabulary);
        }
    }

    // Generate 20 questions with spaced retrieval practice
    const mcqQuestions = generateMCQ(allVocab, 10);
    const oddOneOutQuestions = generateOddOneOut(allVocab, 5);
    const missingWordQuestions = generateMissingWord(allVocab, 5);

    const allQuestions = shuffle([...mcqQuestions, ...oddOneOutQuestions, ...missingWordQuestions]).slice(0, 20);

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formal Test ${testNumber} (${title}) - Academic Word Forge</title>
    <style>
        @media print {
            @page { margin: 1cm; }
            body { margin: 0; }
            .no-print { display: none; }
        }
        body {
            font-family: 'Times New Roman', Times, serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            color: black;
        }
        .header {
            text-align: center;
            border: 3px double black;
            padding: 15px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 5px 0;
            font-size: 26px;
        }
        .header h2 {
            margin: 5px 0;
            font-size: 20px;
            font-weight: normal;
        }
        .student-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border: 2px solid black;
            padding: 15px;
        }
        .student-info div {
            flex: 1;
        }
        .question {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        .question-number {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .question-type {
            font-size: 11px;
            font-style: italic;
            color: #555;
            margin-bottom: 5px;
        }
        .question-text {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        .malay-support {
            font-size: 12px;
            color: #666;
            font-style: italic;
            margin-bottom: 10px;
        }
        .options {
            margin-left: 20px;
        }
        .option {
            margin-bottom: 8px;
            display: flex;
            align-items: baseline;
        }
        .option-letter {
            font-weight: bold;
            margin-right: 8px;
            min-width: 20px;
        }
        .answer-key {
            margin-top: 40px;
            border-top: 3px double black;
            padding-top: 20px;
            page-break-before: always;
        }
        .answer-key h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .answer-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .answer-item {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
            font-weight: bold;
        }
        .answer-explanation {
            font-size: 12px;
            margin-top: 20px;
            border: 2px solid black;
            padding: 15px;
        }
        .marking-sheet {
            margin-top: 20px;
            border: 3px double black;
            padding: 20px;
        }
        .marking-sheet h3 {
            margin-top: 0;
            text-align: center;
        }
        .score-box {
            text-align: center;
            font-size: 20px;
            margin-top: 15px;
            padding: 15px;
            border: 2px solid black;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ACADEMIC WORD FORGE</h1>
        <h2>FORMAL ASSESSMENT TEST ${testNumber}</h2>
        <h2>Comprehensive Vocabulary Test: ${title}</h2>
    </div>

    <div class="student-info">
        <div>
            <strong>Student Name:</strong><br>
            _______________________________
        </div>
        <div>
            <strong>Class:</strong><br>
            _______________________________
        </div>
        <div>
            <strong>Date:</strong><br>
            _______________________________
        </div>
    </div>

    <div class="instructions" style="margin-bottom: 30px; border: 2px solid black; padding: 20px; background: #f9f9f9;">
        <strong style="font-size: 16px;">Instructions:</strong><br>
        • This is a formal assessment test covering vocabulary from ${title}.<br>
        • The test contains 20 multiple-choice questions.<br>
        • Answer ALL questions by selecting the best option (A, B, C, or D).<br>
        • You have 45 minutes to complete this test.<br>
        • Each question is worth 1 mark. Total marks: 20.<br>
        <br>
        <em style="font-size: 12px;"><strong>Arahan:</strong><br>
        • Ini adalah ujian penilaian formal yang merangkumi perbendaharaan kata dari ${title}.<br>
        • Ujian ini mengandungi 20 soalan aneka pilihan.<br>
        • Jawab SEMUA soalan dengan memilih pilihan terbaik (A, B, C, atau D).<br>
        • Anda mempunyai 45 minit untuk menyiapkan ujian ini.<br>
        • Setiap soalan bernilai 1 markah. Jumlah markah: 20.</em>
    </div>

    <div class="questions">
`;

    // Add questions
    allQuestions.forEach((q, index) => {
        html += `
        <div class="question">
            <div class="question-number">Question ${index + 1} of 20</div>
            <div class="question-type">[${q.type}]</div>
            <div class="question-text">${q.question}</div>
            <div class="malay-support">${q.questionMalay}</div>
            <div class="options">
`;
        q.options.forEach((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex);
            html += `                <div class="option">
                    <span class="option-letter">${letter}.</span>
                    <span>${option}</span>
                </div>
`;
        });
        html += `            </div>
        </div>
`;
    });

    html += `    </div>

    <!-- Answer Key -->
    <div class="answer-key">
        <h2>ANSWER KEY - FOR TEACHER USE ONLY</h2>
        <h2>KUNCI JAWAPAN - UNTUK KEGUNAAN GURU SAHAJA</h2>
        <h3 style="text-align: center; color: #666;">Password Protected: SMPWGary2026</h3>

        <div class="answer-grid">
`;

    allQuestions.forEach((q, index) => {
        html += `            <div class="answer-item">
                Q${index + 1}: ${q.correctAnswer}
            </div>
`;
    });

    html += `        </div>

        <div class="answer-explanation">
            <h3 style="margin-top: 0;">Detailed Answer Explanations</h3>
`;

    allQuestions.forEach((q, index) => {
        html += `            <p><strong>${index + 1}. Answer: ${q.correctAnswer}</strong> - Correct term: <em>${q.correctTerm}</em>`;
        if (q.reason) {
            html += `<br>Explanation: ${q.reason}`;
        }
        if (q.fullSentence) {
            html += `<br>Full sentence: "${q.fullSentence}"`;
        }
        html += `</p>
`;
    });

    html += `        </div>

        <div class="marking-sheet">
            <h3>Marking Sheet & Performance Analysis</h3>
            <h3>Lembaran Penilaian & Analisis Prestasi</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                <div>
                    <strong>Total Questions / Jumlah Soalan:</strong> 20<br>
                    <strong>Pass Mark (60%) / Markah Lulus:</strong> 12<br>
                    <strong>Good Performance (75%):</strong> 15<br>
                    <strong>Excellent Performance (90%):</strong> 18
                </div>
                <div>
                    <strong>Performance Bands:</strong><br>
                    18-20: Excellent (A)<br>
                    15-17: Good (B)<br>
                    12-14: Satisfactory (C)<br>
                    0-11: Needs Improvement (D)
                </div>
            </div>
            <div class="score-box">
                Final Score: _____ / 20 = _____% <br>
                Grade: _____
            </div>
            <div style="margin-top: 15px; border-top: 1px solid black; padding-top: 15px;">
                <strong>Teacher Comments:</strong><br>
                <div style="border: 1px solid black; min-height: 80px; padding: 10px; margin-top: 10px;"></div>
            </div>
        </div>
    </div>

    <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 12px 24px; font-size: 16px; cursor: pointer; background: #333; color: white; border: none; border-radius: 5px;">
            Print Test
        </button>
    </div>
</body>
</html>`;

    return html;
}

/**
 * Main function to generate all tests
 */
function generateAllTests() {
    console.log('Starting test generation...');

    // Create output directory
    const outputDir = path.join(__dirname, 'teacher-materials');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const levelTestsDir = path.join(outputDir, 'level-tests');
    if (!fs.existsSync(levelTestsDir)) {
        fs.mkdirSync(levelTestsDir);
    }

    const formalTestsDir = path.join(outputDir, 'formal-tests');
    if (!fs.existsSync(formalTestsDir)) {
        fs.mkdirSync(formalTestsDir);
    }

    // Generate 12 level tests
    console.log('Generating 12 level tests...');
    for (let i = 0; i < WEEK_DATA.length && i < 12; i++) {
        const level = i + 1;
        const weekData = WEEK_DATA[i];
        const html = generateLevelTestHTML(level, weekData);
        const filename = path.join(levelTestsDir, `level-${level}-test.html`);
        fs.writeFileSync(filename, html);
        console.log(`  ✓ Generated Level ${level} test`);
    }

    // Generate 3 formal tests
    console.log('Generating 3 formal tests...');
    const formalTests = [
        { number: 1, range: [1, 4] },
        { number: 2, range: [5, 8] },
        { number: 3, range: [9, 12] }
    ];

    formalTests.forEach(test => {
        const html = generateFormalTestHTML(test.number, test.range, WEEK_DATA);
        const filename = path.join(formalTestsDir, `formal-test-${test.number}.html`);
        fs.writeFileSync(filename, html);
        console.log(`  ✓ Generated Formal Test ${test.number} (Levels ${test.range[0]}-${test.range[1]})`);
    });

    // Generate index.html for the teacher materials section
    console.log('Generating teacher materials index...');
    const indexHTML = generateTeacherMaterialsIndex();
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexHTML);
    console.log('  ✓ Generated index.html');

    console.log('\n✅ All tests generated successfully!');
    console.log(`📁 Output directory: ${outputDir}`);
}

/**
 * Generate index page for teacher materials
 */
function generateTeacherMaterialsIndex() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Materials - Academic Word Forge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }
        h2 {
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .test-card {
            border: 2px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            background: #f9f9f9;
            transition: all 0.3s;
            text-align: center;
        }
        .test-card:hover {
            border-color: #667eea;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
            transform: translateY(-2px);
        }
        .test-card h3 {
            margin-top: 0;
            color: #333;
        }
        .test-card a {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
            font-weight: bold;
        }
        .test-card a:hover {
            background: #5568d3;
        }
        .formal-test-card {
            border-color: #764ba2;
        }
        .formal-test-card:hover {
            border-color: #764ba2;
            box-shadow: 0 4px 12px rgba(118, 75, 162, 0.2);
        }
        .formal-test-card a {
            background: #764ba2;
        }
        .formal-test-card a:hover {
            background: #653a8b;
        }
        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .back-button {
            display: inline-block;
            background: #666;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
        }
        .back-button:hover {
            background: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ACADEMIC WORD FORGE</h1>
        <p class="subtitle">Teacher Materials & Assessment Resources</p>

        <div class="info-box">
            <strong>📋 About These Materials:</strong><br>
            All tests include MCQ, odd-one-out, and missing word questions with Bahasa Melayu L1 support.
            Each test comes with a complete answer key and marking sheet.
            Designed for easy printing in black and white.
        </div>

        <h2>📝 Level Tests (12 Tests)</h2>
        <p>Individual tests for each level, containing 12 questions each.</p>
        <div class="test-grid">
            ${Array.from({ length: 12 }, (_, i) => i + 1).map(level => `
            <div class="test-card">
                <h3>Level ${level} Test</h3>
                <p style="font-size: 14px; color: #666;">12 questions</p>
                <a href="level-tests/level-${level}-test.html" target="_blank">Open Test</a>
            </div>
            `).join('')}
        </div>

        <h2>🎓 Formal Assessment Tests (3 Tests)</h2>
        <p>Comprehensive tests covering multiple levels with 20 MCQ questions each.</p>
        <div class="test-grid">
            <div class="test-card formal-test-card">
                <h3>Formal Test 1</h3>
                <p style="font-size: 14px; color: #666;">Levels 1-4 • 20 questions</p>
                <a href="formal-tests/formal-test-1.html" target="_blank">Open Test</a>
            </div>
            <div class="test-card formal-test-card">
                <h3>Formal Test 2</h3>
                <p style="font-size: 14px; color: #666;">Levels 5-8 • 20 questions</p>
                <a href="formal-tests/formal-test-2.html" target="_blank">Open Test</a>
            </div>
            <div class="test-card formal-test-card">
                <h3>Formal Test 3</h3>
                <p style="font-size: 14px; color: #666;">Levels 9-12 • 20 questions</p>
                <a href="formal-tests/formal-test-3.html" target="_blank">Open Test</a>
            </div>
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <a href="../" class="back-button">← Back to Student App</a>
        </div>
    </div>
</body>
</html>`;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateAllTests,
        generateLevelTestHTML,
        generateFormalTestHTML,
        generateMCQ,
        generateOddOneOut,
        generateMissingWord
    };
}

// Run if called directly
if (require.main === module) {
    // Check if week-data.json exists
    if (!fs.existsSync('./week-data.json')) {
        console.error('❌ Error: week-data.json not found!');
        console.log('Please create week-data.json by exporting WEEK_DATA from constants.ts');
        console.log('You can use: node export-week-data.js');
        process.exit(1);
    }

    generateAllTests();
}
