import React, { useState, useMemo, useEffect, useCallback, FC } from 'react';
import type { ReviewItem, WeekData, ActivityState, Word, MorphologyBuilderData, WordSortData, AnalogyData, WordConstructionData, OddOneOutData } from './types';
import { WEEK_DATA } from './constants';
import { LogoIcon, CheckIcon, BookIcon, LockIcon, DailyRecallIcon, ArrowLeftIcon, ArrowRightIcon } from './components/Icons';

// Password for teacher materials
const TEACHER_PASSWORD = 'SMPWGary2026';


// --- CHILD COMPONENTS ---

const PerformanceDashboard = ({ reviewItems, onClose }: { reviewItems: ReviewItem[], onClose: () => void }) => {
    const stats = useMemo(() => {
        const totalWords = reviewItems.length;
        const wordsWithRule = reviewItems.filter(item => item.rule).length;
        const wordsWithRelate = reviewItems.filter(item => item.relate).length;
        const wordsWithTest = reviewItems.filter(item => item.test).length;
        const fullyMastered = reviewItems.filter(item => item.rule && item.relate && item.test).length;

        // Calculate comprehension percentage (average of all three areas)
        const comprehensionPercentage = totalWords > 0
            ? Math.round(((wordsWithRule + wordsWithRelate + wordsWithTest) / (totalWords * 3)) * 100)
            : 0;

        // Level-by-level breakdown (assuming 12 levels/weeks)
        const levelStats = Array.from({ length: 12 }, (_, i) => {
            const level = i + 1;
            const levelWords = WEEK_DATA[i]?.vocabulary.map(v => v.term) || [];
            const levelMorphologyWords = WEEK_DATA[i]?.morphology.examples.map(e => e.word) || [];
            const allLevelWords = [...levelWords, ...levelMorphologyWords];

            const completedInLevel = reviewItems.filter(item =>
                allLevelWords.some(w => w.toLowerCase() === item.term.toLowerCase()) &&
                item.rule && item.relate && item.test
            ).length;

            return {
                level,
                total: allLevelWords.length,
                completed: completedInLevel,
                percentage: allLevelWords.length > 0 ? Math.round((completedInLevel / allLevelWords.length) * 100) : 0
            };
        });

        return {
            totalWords,
            wordsWithRule,
            wordsWithRelate,
            wordsWithTest,
            fullyMastered,
            comprehensionPercentage,
            levelStats
        };
    }, [reviewItems]);

    const nextSteps = useMemo(() => {
        const incompleteLevels = stats.levelStats.filter(l => l.percentage < 100);
        if (incompleteLevels.length === 0) {
            return "Congratulations! You've mastered all levels!";
        }
        const nextLevel = incompleteLevels[0];
        return `Focus on Level ${nextLevel.level} to continue your progress (${nextLevel.percentage}% complete)`;
    }, [stats]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl transform transition-all animate-slide-in-up my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">How are we doing?</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
                </div>

                {/* Overall Progress Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold">{stats.totalWords}</div>
                        <div className="text-sm opacity-90">Total Words</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold">{stats.fullyMastered}</div>
                        <div className="text-sm opacity-90">Fully Mastered</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold">{stats.levelStats.filter(l => l.percentage === 100).length}</div>
                        <div className="text-sm opacity-90">Levels Completed</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold">{stats.comprehensionPercentage}%</div>
                        <div className="text-sm opacity-90">Comprehension</div>
                    </div>
                </div>

                {/* Progress Areas */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Progress by Area</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-semibold text-gray-700">Rule Understanding</span>
                                <span className="text-sm font-bold text-green-600">{stats.wordsWithRule}/{stats.totalWords}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${stats.totalWords > 0 ? (stats.wordsWithRule / stats.totalWords) * 100 : 0}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-semibold text-gray-700">Contextual Relations</span>
                                <span className="text-sm font-bold text-yellow-600">{stats.wordsWithRelate}/{stats.totalWords}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full transition-all" style={{ width: `${stats.totalWords > 0 ? (stats.wordsWithRelate / stats.totalWords) * 100 : 0}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-semibold text-gray-700">Knowledge Testing</span>
                                <span className="text-sm font-bold text-blue-600">{stats.wordsWithTest}/{stats.totalWords}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${stats.totalWords > 0 ? (stats.wordsWithTest / stats.totalWords) * 100 : 0}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Level-by-Level Breakdown */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Level-by-Level Progress</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {stats.levelStats.map(level => (
                            <div key={level.level} className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-gray-700">Level {level.level}</span>
                                    <span className={`text-xs font-semibold ${level.percentage === 100 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {level.percentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${level.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                        style={{ width: `${level.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{level.completed}/{level.total} words</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                    <h3 className="text-sm font-bold text-blue-800 mb-1">Next Steps</h3>
                    <p className="text-sm text-blue-700">{nextSteps}</p>
                </div>

                <div className="text-center">
                    <button onClick={onClose} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};

const TeacherMaterials = ({ onClose }: { onClose: () => void }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedTest, setSelectedTest] = useState<{ type: 'level' | 'formal', level?: number, range?: [number, number] } | null>(null);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === TEACHER_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Teacher Materials</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
                    </div>
                    <div className="flex justify-center mb-6">
                        <LockIcon className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-6 text-center">Please enter the teacher password to access assessment materials.</p>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            autoFocus
                        />
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                            Access Teacher Materials
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (selectedTest) {
        return (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
                {selectedTest.type === 'level' && selectedTest.level ? (
                    <LevelTest level={selectedTest.level} onBack={() => setSelectedTest(null)} onClose={onClose} />
                ) : selectedTest.type === 'formal' && selectedTest.range ? (
                    <FormalTest range={selectedTest.range} onBack={() => setSelectedTest(null)} onClose={onClose} />
                ) : null}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-6xl my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Teacher Materials</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>📋 About These Materials:</strong> All tests include MCQ, odd-one-out, and missing word questions
                        with Bahasa Melayu L1 support. Each test comes with a complete answer key and marking sheet.
                        Designed for easy printing in black and white.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Level Tests (12 Tests)</h3>
                    <p className="text-gray-600 mb-4">Individual tests for each level, containing 12 questions each.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(level => (
                            <button
                                key={level}
                                onClick={() => setSelectedTest({ type: 'level', level })}
                                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                <div className="font-bold text-lg">Level {level}</div>
                                <div className="text-xs opacity-90">12 questions</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">🎓 Formal Assessment Tests (3 Tests)</h3>
                    <p className="text-gray-600 mb-4">Comprehensive tests covering multiple levels with 20 MCQ questions each.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { number: 1, range: [1, 4] as [number, number], title: 'Levels 1-4' },
                            { number: 2, range: [5, 8] as [number, number], title: 'Levels 5-8' },
                            { number: 3, range: [9, 12] as [number, number], title: 'Levels 9-12' }
                        ].map(test => (
                            <button
                                key={test.number}
                                onClick={() => setSelectedTest({ type: 'formal', range: test.range })}
                                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                <div className="font-bold text-xl mb-2">Formal Test {test.number}</div>
                                <div className="text-sm opacity-90">{test.title}</div>
                                <div className="text-xs opacity-80 mt-1">20 questions</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Test question generation helpers
function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

interface TestQuestion {
    type: 'MCQ' | 'OddOneOut' | 'MissingWord';
    question: string;
    questionMalay: string;
    options: string[];
    correctAnswer: string;
    correctTerm: string;
    explanation?: string;
}

function generateTestQuestions(vocabulary: Word[], count: { mcq: number, oddOneOut: number, missingWord: number }): TestQuestion[] {
    const questions: TestQuestion[] = [];

    // Generate MCQ questions
    const shuffledVocab = shuffle(vocabulary);
    for (let i = 0; i < Math.min(count.mcq, shuffledVocab.length); i++) {
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
            options,
            correctAnswer: String.fromCharCode(65 + correctIndex),
            correctTerm: correctWord.term
        });
    }

    // Generate odd-one-out questions
    const subjectGroups: Record<string, string[]> = {};
    vocabulary.forEach(word => {
        if (word.contexts && word.contexts.length > 0) {
            word.contexts.forEach(ctx => {
                if (!subjectGroups[ctx.subject]) {
                    subjectGroups[ctx.subject] = [];
                }
                if (!subjectGroups[ctx.subject].includes(word.term)) {
                    subjectGroups[ctx.subject].push(word.term);
                }
            });
        }
    });

    const subjects = Object.keys(subjectGroups).filter(s => subjectGroups[s].length >= 3);
    for (let i = 0; i < count.oddOneOut && subjects.length >= 2; i++) {
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
                explanation: `${oddWord} relates to ${oddSubject}, while the others relate to ${mainSubject}`
            });
        }
    }

    // Generate missing word questions
    for (let i = 0; i < Math.min(count.missingWord, shuffledVocab.length); i++) {
        const correctWord = shuffledVocab[i];
        if (correctWord.contexts && correctWord.contexts.length > 0) {
            const context = correctWord.contexts[0];
            const sentence = context.sentence.replace(new RegExp(correctWord.term, 'gi'), '________');
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
                options,
                correctAnswer: String.fromCharCode(65 + correctIndex),
                correctTerm: correctWord.term,
                explanation: `Full sentence: "${context.sentence}"`
            });
        }
    }

    return questions;
}

const LevelTest: FC<{ level: number, onBack: () => void, onClose: () => void }> = ({ level, onBack, onClose }) => {
    const weekData = WEEK_DATA[level - 1];
    const questions = useMemo(() => {
        return generateTestQuestions(weekData.vocabulary, { mcq: 4, oddOneOut: 4, missingWord: 4 });
    }, [weekData]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white print:p-0">
            <div className="no-print mb-4 flex gap-2">
                <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </button>
                <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Print Test
                </button>
                <button onClick={onClose} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg ml-auto">
                    Close
                </button>
            </div>

            <div className="border-b-2 border-black pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold">ACADEMIC WORD FORGE</h1>
                <h2 className="text-xl mt-2">Level {level} Vocabulary Test</h2>
                <h3 className="text-lg text-gray-600">{weekData.title}</h3>
            </div>

            <div className="border border-black p-4 mb-6 flex justify-between">
                <div>Name: _______________________________</div>
                <div>Date: _______________________________</div>
            </div>

            <div className="border border-black p-4 mb-6">
                <strong>Instructions:</strong> This test contains 12 questions testing your understanding of Level {level} vocabulary.
                Answer all questions by selecting the best option (A, B, C, or D).
                <br /><br />
                <em className="text-sm text-gray-600">Arahan: Ujian ini mengandungi 12 soalan yang menguji pemahaman anda tentang perbendaharaan kata Tahap {level}.
                Jawab semua soalan dengan memilih pilihan terbaik (A, B, C, atau D).</em>
            </div>

            <div className="space-y-6 mb-8">
                {questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                        <div className="font-bold mb-1">Question {index + 1}</div>
                        <div className="text-sm text-gray-500 italic mb-2">[{q.type}]</div>
                        <div className="mb-2">{q.question}</div>
                        <div className="text-sm text-gray-600 italic mb-3">{q.questionMalay}</div>
                        <div className="ml-4 space-y-2">
                            {q.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-baseline gap-2">
                                    <span className="font-semibold min-w-[20px]">{String.fromCharCode(65 + optIndex)}.</span>
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t-2 border-black pt-6 mt-8 page-break-before">
                <h2 className="text-2xl font-bold text-center mb-4">ANSWER KEY - FOR TEACHER USE ONLY</h2>
                <h3 className="text-xl text-center mb-6">KUNCI JAWAPAN - UNTUK KEGUNAAN GURU SAHAJA</h3>

                <div className="grid grid-cols-4 gap-3 mb-6">
                    {questions.map((q, index) => (
                        <div key={index} className="border border-black p-2 text-center">
                            <strong>Q{index + 1}:</strong> {q.correctAnswer}
                        </div>
                    ))}
                </div>

                <div className="border border-black p-4 mb-4">
                    <h4 className="font-bold mb-3">Answer Explanations</h4>
                    {questions.map((q, index) => (
                        <p key={index} className="mb-2 text-sm">
                            <strong>{index + 1}. {q.correctAnswer}</strong> - {q.correctTerm}
                            {q.explanation && <span className="text-gray-600"> ({q.explanation})</span>}
                        </p>
                    ))}
                </div>

                <div className="border-2 border-black p-4">
                    <h4 className="font-bold text-center mb-3">Marking Sheet / Lembaran Penilaian</h4>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <strong>Total Questions:</strong> {questions.length}<br />
                            <strong>Jumlah Soalan:</strong> {questions.length}
                        </div>
                        <div>
                            <strong>Pass Mark (60%):</strong> {Math.ceil(questions.length * 0.6)}<br />
                            <strong>Markah Lulus (60%):</strong> {Math.ceil(questions.length * 0.6)}
                        </div>
                    </div>
                    <div className="text-center border border-black p-3 text-lg">
                        Score: _____ / {questions.length} = _____%
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormalTest: FC<{ range: [number, number], onBack: () => void, onClose: () => void }> = ({ range, onBack, onClose }) => {
    const [startLevel, endLevel] = range;
    const testNumber = startLevel === 1 ? 1 : startLevel === 5 ? 2 : 3;

    const allVocab = useMemo(() => {
        const vocab: Word[] = [];
        for (let i = startLevel - 1; i < endLevel; i++) {
            if (WEEK_DATA[i]) {
                vocab.push(...WEEK_DATA[i].vocabulary);
            }
        }
        return vocab;
    }, [startLevel, endLevel]);

    const questions = useMemo(() => {
        const allQuestions = generateTestQuestions(allVocab, { mcq: 10, oddOneOut: 5, missingWord: 5 });
        return shuffle(allQuestions).slice(0, 20);
    }, [allVocab]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white print:p-0">
            <div className="no-print mb-4 flex gap-2">
                <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </button>
                <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Print Test
                </button>
                <button onClick={onClose} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg ml-auto">
                    Close
                </button>
            </div>

            <div className="border-4 border-double border-black p-4 mb-6 text-center">
                <h1 className="text-3xl font-bold">ACADEMIC WORD FORGE</h1>
                <h2 className="text-2xl mt-2">FORMAL ASSESSMENT TEST {testNumber}</h2>
                <h3 className="text-xl text-gray-700">Comprehensive Vocabulary Test: Levels {startLevel}-{endLevel}</h3>
            </div>

            <div className="border-2 border-black p-4 mb-6 flex flex-wrap gap-4">
                <div className="flex-1">
                    <strong>Student Name:</strong><br />
                    _______________________________
                </div>
                <div className="flex-1">
                    <strong>Class:</strong><br />
                    _______________________________
                </div>
                <div className="flex-1">
                    <strong>Date:</strong><br />
                    _______________________________
                </div>
            </div>

            <div className="border-2 border-black p-5 mb-6 bg-gray-50">
                <strong className="text-lg">Instructions:</strong><br />
                • This is a formal assessment test covering vocabulary from Levels {startLevel}-{endLevel}.<br />
                • The test contains 20 multiple-choice questions.<br />
                • Answer ALL questions by selecting the best option (A, B, C, or D).<br />
                • You have 45 minutes to complete this test.<br />
                • Each question is worth 1 mark. Total marks: 20.<br />
                <br />
                <em className="text-sm"><strong>Arahan:</strong><br />
                • Ini adalah ujian penilaian formal yang merangkumi perbendaharaan kata dari Tahap {startLevel}-{endLevel}.<br />
                • Ujian ini mengandungi 20 soalan aneka pilihan.<br />
                • Jawab SEMUA soalan dengan memilih pilihan terbaik (A, B, C, atau D).<br />
                • Anda mempunyai 45 minit untuk menyiapkan ujian ini.<br />
                • Setiap soalan bernilai 1 markah. Jumlah markah: 20.</em>
            </div>

            <div className="space-y-6 mb-8">
                {questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                        <div className="font-bold mb-1">Question {index + 1} of 20</div>
                        <div className="text-sm text-gray-500 italic mb-2">[{q.type}]</div>
                        <div className="mb-2">{q.question}</div>
                        <div className="text-sm text-gray-600 italic mb-3">{q.questionMalay}</div>
                        <div className="ml-4 space-y-2">
                            {q.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-baseline gap-2">
                                    <span className="font-semibold min-w-[20px]">{String.fromCharCode(65 + optIndex)}.</span>
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t-4 border-double border-black pt-6 mt-8 page-break-before">
                <h2 className="text-2xl font-bold text-center mb-2">ANSWER KEY - FOR TEACHER USE ONLY</h2>
                <h3 className="text-xl text-center mb-2">KUNCI JAWAPAN - UNTUK KEGUNAAN GURU SAHAJA</h3>
                <p className="text-center text-gray-600 mb-6">Password Protected: SMPWGary2026</p>

                <div className="grid grid-cols-5 gap-3 mb-6">
                    {questions.map((q, index) => (
                        <div key={index} className="border border-black p-2 text-center font-bold">
                            Q{index + 1}: {q.correctAnswer}
                        </div>
                    ))}
                </div>

                <div className="border-2 border-black p-4 mb-4">
                    <h4 className="font-bold mb-3">Detailed Answer Explanations</h4>
                    {questions.map((q, index) => (
                        <p key={index} className="mb-2 text-sm">
                            <strong>{index + 1}. Answer: {q.correctAnswer}</strong> - Correct term: <em>{q.correctTerm}</em>
                            {q.explanation && <><br />Explanation: {q.explanation}</>}
                        </p>
                    ))}
                </div>

                <div className="border-4 border-double border-black p-5">
                    <h4 className="font-bold text-center mb-3">Marking Sheet & Performance Analysis</h4>
                    <h4 className="font-bold text-center mb-4">Lembaran Penilaian & Analisis Prestasi</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <strong>Total Questions / Jumlah Soalan:</strong> 20<br />
                            <strong>Pass Mark (60%) / Markah Lulus:</strong> 12<br />
                            <strong>Good Performance (75%):</strong> 15<br />
                            <strong>Excellent Performance (90%):</strong> 18
                        </div>
                        <div>
                            <strong>Performance Bands:</strong><br />
                            18-20: Excellent (A)<br />
                            15-17: Good (B)<br />
                            12-14: Satisfactory (C)<br />
                            0-11: Needs Improvement (D)
                        </div>
                    </div>
                    <div className="text-center border-2 border-black p-4 text-xl font-bold mb-4">
                        Final Score: _____ / 20 = _____% <br />
                        Grade: _____
                    </div>
                    <div className="border-t border-black pt-3">
                        <strong>Teacher Comments:</strong><br />
                        <div className="border border-black min-h-[80px] p-3 mt-2"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    .page-break-before { page-break-before: always; }
                }
            `}</style>
        </div>
    );
};

const DailyRecallModal = ({ allWords, onClose }: { allWords: Word[], onClose: () => void }) => {
    const questions = useMemo(() => {
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        const selectedWords = shuffled.slice(0, 3);

        return selectedWords.map(correctWord => {
            const distractors = shuffled
                .filter(w => w.term !== correctWord.term)
                .slice(0, 3)
                .map(w => w.term);
            const options = [correctWord.term, ...distractors].sort(() => 0.5 - Math.random());
            return {
                definition: `Which word means: "${correctWord.definition}"?`,
                options,
                correctAnswer: correctWord.term,
            };
        });
    }, [allWords]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selection, setSelection] = useState<{ answer: string; correct: boolean } | null>(null);
    const question = questions[currentQuestionIndex];
    const isFinished = currentQuestionIndex >= questions.length;

    const handleSelect = (option: string) => {
        if (selection) return;
        setSelection({ answer: option, correct: option === question.correctAnswer });
    };

    const handleNext = () => {
        setSelection(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const getButtonClass = (option: string) => {
        if (!selection) return "bg-white hover:bg-blue-100";
        if (option === question.correctAnswer) return "bg-green-200 ring-2 ring-green-500";
        if (option === selection.answer) return "bg-red-200 ring-2 ring-red-500";
        return "bg-gray-100 opacity-60";
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl transform transition-all animate-slide-in-up">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Daily Recall Challenge</h2>
                {!isFinished ? (
                    <div>
                        <p className="text-lg text-gray-600 mb-4">{question.definition}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {question.options.map(opt => (
                                <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selection} className={`p-3 rounded-lg shadow font-semibold text-gray-800 text-left transition-all ${getButtonClass(opt)}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {selection && (
                            <div className="mt-4 text-right">
                                <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl font-semibold text-green-600 mb-4">Great work!</p>
                        <p className="text-gray-700 mb-6">You've completed the recall challenge. Keep practicing!</p>
                        <button onClick={onClose} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg">Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ReviewBox = ({ items }: { items: ReviewItem[] }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 h-fit">
        <h3 className="font-bold text-center text-gray-700 mb-4">REVIEW BOX</h3>
        <div className="space-y-2">
            {items.map(item => (
                <div key={item.term} className="flex items-center justify-between bg-gray-100 p-2 rounded-md transition-all">
                    <span className="font-semibold text-gray-600">{item.term.toUpperCase()}</span>
                    <div className="flex gap-1.5">
                       <span title="Rule" className={`w-5 h-5 rounded-full border-2 border-white ${item.rule ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                       <span title="Relate" className={`w-5 h-5 rounded-full border-2 border-white ${item.relate ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                       <span title="Test" className={`w-5 h-5 rounded-full border-2 border-white ${item.test ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Header = ({ currentWeek, onWeekChange, showL1Support, onL1SupportChange }: {
    currentWeek: number;
    onWeekChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showL1Support: boolean;
    onL1SupportChange: (show: boolean) => void;
}) => (
    <header className="flex flex-col sm:flex-row items-center justify-between bg-blue-500 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
            <div className="bg-white p-2 rounded-lg">
                <LogoIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500"/>
            </div>
            <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">ACADEMIC</h1>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-orange-300 -mt-1 sm:-mt-2">WORD FORGE</h2>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                <span className="text-xs font-semibold mb-1">SELECT WEEK</span>
                <select value={currentWeek} onChange={onWeekChange} className="bg-white/20 border-2 border-white/50 rounded-lg px-3 py-2 sm:py-1.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-black w-full sm:w-auto min-h-[44px] sm:min-h-0">
                    {WEEK_DATA.map(w => <option key={w.week} value={w.week} className="text-black">{w.week}: {w.title}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold">Sokongan L1</span>
                    <span className="text-xs hidden sm:inline">Show L1 Support</span>
                </div>
                <button onClick={() => onL1SupportChange(!showL1Support)} className={`w-14 h-8 sm:h-7 rounded-full p-1 transition-colors min-h-[44px] sm:min-h-0 ${showL1Support ? 'bg-green-400' : 'bg-gray-400'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${showL1Support ? 'translate-x-6 sm:translate-x-7' : ''}`} />
                </button>
            </div>
        </div>
    </header>
);

const ProgressBar = ({ value, label }: { value: number; label: string }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
             <span className="text-sm font-semibold text-gray-700">Weekly Progress</span>
             <span className="text-sm font-bold text-green-600">{label}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);


// --- WEEK 1 PAGE COMPONENT ---

const Week1Page: FC<{ weekData: WeekData; l1Support: boolean; onReviewUpdate: (term: string, key: 'rule' | 'relate' | 'test', value: boolean) => void; }> = ({ weekData, l1Support, onReviewUpdate }) => {

    // --- STATE MANAGEMENT ---

    const [progress, setProgress] = useState({
        morphology: false,
        construction: false,
        oddOneOut: false,
        sort: false,
        analogy: false,
    });

    const completionPercentage = useMemo(() => {
        const completedCount = Object.values(progress).filter(Boolean).length;
        const totalCount = Object.keys(progress).length;
        return (completedCount / totalCount) * 100;
    }, [progress]);

    // Morphology Builder State
    const [builtWord, setBuiltWord] = useState<{ word: string, definition: string } | null>(null);

    // Word Construction State
    const [constructionIndex, setConstructionIndex] = useState(0);
    const [droppedParts, setDroppedParts] = useState<string[]>([]);
    const [selectedPart, setSelectedPart] = useState<string | null>(null); // For click-to-place
    const [constructionFeedback, setConstructionFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [constructionComplete, setConstructionComplete] = useState(false);
    const constructionData = weekData.contextualActivities.find(a => a.type === 'WordConstruction') as WordConstructionData;
    const currentConstructionTarget = constructionData.targets[constructionIndex];

    // Odd One Out State
    const [oddOneOutIndex, setOddOneOutIndex] = useState(0);
    const [selectedOddOne, setSelectedOddOne] = useState<string | null>(null);
    const [oddOneOutComplete, setOddOneOutComplete] = useState(false);
    const oddOneOutData = weekData.contextualActivities.find(a => a.type === 'OddOneOut') as OddOneOutData;
    const currentOddOneOutSet = oddOneOutData.sets[oddOneOutIndex];

    // Word Sort State
    const [sortedWords, setSortedWords] = useState<Record<string, string>>({});
    const [sortFeedback, setSortFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const wordSortData = weekData.contextualActivities.find(a => a.type === 'WordSort') as WordSortData;
    const allWordsSorted = wordSortData.words.length === Object.keys(sortedWords).length;


    // Analogy State
    const [analogyAnswer, setAnalogyAnswer] = useState<string | null>(null);
    const analogyData = weekData.contextualActivities.find(a => a.type === 'Analogy') as AnalogyData;
    const analogyOptions = useMemo(() => [...analogyData.distractors, analogyData.correctAnswer].sort(() => Math.random() - 0.5), [analogyData]);

    // --- HELPER FUNCTIONS ---

    // Get meaning of a morpheme part
    const getPartMeaning = (part: string): string => {
        const prefix = weekData.morphology.prefixes.find(p => p.text === part || p.text === part + '-');
        if (prefix) return prefix.meaning;
        const suffix = weekData.morphology.suffixes.find(s => s.text === part || s.text === '-' + part);
        if (suffix) return suffix.meaning;
        if (part.toLowerCase() === weekData.morphology.root.text.toLowerCase()) {
            return weekData.morphology.root.meaning;
        }
        // Check if it's a variant of the root
        if (weekData.morphology.root.text.includes('/')) {
            const rootVariants = weekData.morphology.root.text.split('/');
            if (rootVariants.some(v => v.toLowerCase() === part.toLowerCase())) {
                return weekData.morphology.root.meaning;
            }
        }
        return '';
    };

    // --- EVENT HANDLERS ---

    // Generic Drag-and-Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLElement>, data: string) => {
        e.dataTransfer.setData("text/plain", data);
    };
    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    // Word Construction Handlers - supports both drag-and-drop and click-to-place
    const handleConstructionDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const part = e.dataTransfer.getData("text/plain");
        if (part && !droppedParts.includes(part)) {
            setDroppedParts(prev => [...prev, part]);
            setSelectedPart(null);
        }
    };

    const handlePartClick = (part: string) => {
        if (constructionFeedback) return; // Don't allow changes after feedback
        if (droppedParts.includes(part)) return; // Don't select already placed parts
        if (selectedPart === part) {
            setSelectedPart(null); // Deselect
        } else {
            setSelectedPart(part);
        }
    };

    const handleDropZoneClick = () => {
        if (selectedPart && !droppedParts.includes(selectedPart)) {
            setDroppedParts(prev => [...prev, selectedPart]);
            setSelectedPart(null);
        }
    };

    const handleRemovePart = (partToRemove: string) => {
        if (constructionFeedback) return; // Don't allow changes after feedback
        setDroppedParts(prev => prev.filter(p => p !== partToRemove));
    };

    const checkConstruction = () => {
        const isCorrect = droppedParts.length === currentConstructionTarget.parts.length &&
            currentConstructionTarget.parts.every(p => droppedParts.includes(p));
        setConstructionFeedback(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            onReviewUpdate(currentConstructionTarget.parts.join(''), 'rule', true);
        }
    };
    
    const nextConstruction = () => {
        setConstructionFeedback(null);
        setDroppedParts([]);
        if (constructionIndex < constructionData.targets.length - 1) {
            setConstructionIndex(prev => prev + 1);
        } else {
            setConstructionComplete(true);
            setProgress(p => ({ ...p, construction: true }));
        }
    };

    // Word Sort Handler
    const handleSortDrop = (e: React.DragEvent<HTMLElement>, category: string) => {
        e.preventDefault();
        const word = e.dataTransfer.getData("text/plain");
        setSortedWords(prev => ({...prev, [word]: category}));
        const wordData = wordSortData.words.find(w => w.text === word);
        if (wordData?.category === category) {
            onReviewUpdate(word, 'relate', true);
        }
    };
    
    const checkSort = () => {
        const isCorrect = wordSortData.words.every(
            word => sortedWords[word.text] === word.category
        );
        setSortFeedback(isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            setProgress(p => ({ ...p, sort: true }));
        }
    };

    return (
        <div className="space-y-8">
            <ProgressBar value={completionPercentage} label={`${Math.round(completionPercentage)}% Complete`} />

            {/* Section 1: Morphology Lab */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-4">Morphology Lab: The Root <span className="text-orange-500">'{weekData.morphology.root.text}'</span></h3>
                <p className="text-gray-600 mb-4">
                    The root <strong className="font-semibold text-gray-700">'{weekData.morphology.root.text}'</strong> means <strong className="font-semibold text-gray-700">'{weekData.morphology.root.meaning}'</strong>. See how it combines with prefixes and suffixes to make new words.
                    {l1Support && <span className="block mt-2 text-sm text-gray-500 italic">Akar kata '{weekData.morphology.root.text}' bermaksud '{weekData.morphology.root.meaning}'</span>}
                </p>

                {/* Show available prefixes and suffixes with meanings */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Available Prefixes:</p>
                    <div className="flex flex-wrap gap-2">
                        {weekData.morphology.prefixes.map(prefix => (
                            <span key={prefix.text} className="group relative inline-block bg-blue-200 text-blue-900 px-2 py-1 rounded text-sm font-medium cursor-help">
                                {prefix.text}
                                <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                    {prefix.meaning}
                                </span>
                            </span>
                        ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-2 mt-3">Available Suffixes:</p>
                    <div className="flex flex-wrap gap-2">
                        {weekData.morphology.suffixes.map(suffix => (
                            <span key={suffix.text} className="group relative inline-block bg-purple-200 text-purple-900 px-2 py-1 rounded text-sm font-medium cursor-help">
                                {suffix.text}
                                <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                    {suffix.partOfSpeech}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {weekData.morphology.examples.map(ex => (
                        <button key={ex.word} onClick={() => { setBuiltWord(ex); setProgress(p => ({ ...p, morphology: true })) }} className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 sm:px-3 sm:py-1 rounded-full hover:bg-blue-200 hover:scale-105 transition-transform min-h-[44px] sm:min-h-0 flex items-center">
                            {ex.word}
                        </button>
                    ))}
                </div>
                {builtWord && (
                    <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 animate-fade-in">
                        <p className="font-bold text-green-800 text-xl">{builtWord.word}</p>
                        <p className="text-green-700">{builtWord.definition}</p>
                    </div>
                )}
            </section>

            {/* Section 2: Word Construction Zone */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-cyan-400 pb-2 mb-4">Word Construction Zone</h3>
                 {!constructionComplete ? (
                    <>
                        <div className="mb-4 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Literal meaning:</span> {currentConstructionTarget.literalMeaning}
                                {l1Support && <span className="block mt-1 text-gray-500 italic text-xs">Makna harfiah: {currentConstructionTarget.literalMeaning}</span>}
                            </p>
                            <p className="text-gray-800">
                                <span className="font-semibold">Build a word that means:</span> <strong className="text-cyan-700">"{currentConstructionTarget.definition}"</strong>
                                {l1Support && <span className="block mt-1 text-gray-600 italic text-sm">Bina perkataan yang bermaksud: "{currentConstructionTarget.definition}"</span>}
                            </p>
                        </div>

                        <p className="text-sm text-gray-500 mb-3 text-center">
                            {selectedPart ? '👆 Click the box below to place the selected morpheme, or click a morpheme to deselect' : '💡 Drag morphemes or click to select, then click the box to place them'}
                        </p>

                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleConstructionDrop}
                            onClick={handleDropZoneClick}
                            className="flex items-center justify-center gap-1 bg-gray-200 p-4 rounded-lg min-h-[60px] border-2 border-dashed border-gray-400 mb-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            {droppedParts.length === 0 ? (
                                <span className="text-gray-400 italic">Drop or click morphemes here</span>
                            ) : (
                                droppedParts.map(p => (
                                    <span
                                        key={p}
                                        onClick={(e) => { e.stopPropagation(); handleRemovePart(p); }}
                                        className="group relative bg-cyan-500 text-white font-bold px-3 py-1 rounded-md text-lg cursor-pointer hover:bg-cyan-600 transition-colors"
                                        title="Click to remove"
                                    >
                                        {p}
                                        <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                            {getPartMeaning(p) || p}
                                        </span>
                                    </span>
                                ))
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {constructionData.allParts.map(part => {
                                const isPlaced = droppedParts.includes(part);
                                const isSelected = selectedPart === part;
                                const partMeaning = getPartMeaning(part);
                                return (
                                    <button
                                        key={part}
                                        draggable={!isPlaced}
                                        onDragStart={(e) => !isPlaced && handleDragStart(e, part)}
                                        onClick={() => handlePartClick(part)}
                                        disabled={isPlaced}
                                        className={`group relative p-2 rounded-md font-semibold transition-all ${
                                            isPlaced ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' :
                                            isSelected ? 'bg-cyan-500 text-white shadow-lg ring-2 ring-cyan-600 scale-110' :
                                            'bg-white shadow-md text-gray-700 cursor-pointer hover:bg-cyan-100 active:cursor-grabbing'
                                        }`}
                                    >
                                        {part}
                                        {!isPlaced && partMeaning && (
                                            <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                                {partMeaning}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center">
                            {constructionFeedback === null ? (
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-center">
                                    <button onClick={checkConstruction} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 sm:py-2 sm:px-4 rounded-lg sm:mr-2 min-h-[44px]">Check</button>
                                    <button onClick={() => { setDroppedParts([]); setSelectedPart(null); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 sm:py-2 sm:px-4 rounded-lg min-h-[44px]">Clear</button>
                                </div>
                            ) : constructionFeedback === 'correct' ? (
                                <div className="p-4 rounded-lg animate-fade-in bg-green-100 text-green-800">
                                    <p className="font-bold text-base sm:text-sm">Correct! {l1Support && <span className="text-sm">(Betul!)</span>}</p>
                                    <button onClick={nextConstruction} className="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-1 sm:px-3 rounded-full min-h-[44px] sm:min-h-0">Next Target &rarr;</button>
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg animate-fade-in bg-red-100 text-red-800">
                                    <p className="font-bold text-base sm:text-sm">Not quite, try again! {l1Support && <span className="text-sm">(Cuba lagi!)</span>}</p>
                                    <button onClick={() => { setConstructionFeedback(null); setDroppedParts([]); setSelectedPart(null); }} className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:py-1 sm:px-3 rounded-full min-h-[44px] sm:min-h-0">Try Again</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                     <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <p className="font-bold text-lg">Great job! You've mastered word construction. {l1Support && <span className="block text-sm mt-1">(Kerja yang baik! Anda telah menguasai pembinaan perkataan.)</span>}</p>
                    </div>
                )}
            </section>

             {/* Section 3: Odd One Out */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-400 pb-2 mb-4">Odd One Out</h3>
                 {!oddOneOutComplete ? (
                    <>
                        <p className="text-gray-600 mb-4">Which word does not belong with the others?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {currentOddOneOutSet.words.map(word => {
                                const isSelected = selectedOddOne === word;
                                const isCorrect = isSelected && word === currentOddOneOutSet.oddOneOut;
                                const isIncorrect = isSelected && word !== currentOddOneOutSet.oddOneOut;
                                let buttonClass = "bg-white hover:bg-indigo-100 shadow";
                                if (isSelected) {
                                    buttonClass = isCorrect ? 'bg-green-200 ring-2 ring-green-500' : 'bg-red-200 ring-2 ring-red-500';
                                } else if (selectedOddOne) {
                                    buttonClass = 'bg-gray-100 opacity-60';
                                }
                                return (
                                    <button key={word} onClick={() => { if(!selectedOddOne) setSelectedOddOne(word) }} disabled={!!selectedOddOne} className={`p-4 sm:p-3 rounded-lg font-semibold text-gray-800 text-center transition-all min-h-[56px] sm:min-h-0 ${buttonClass}`}>
                                        {word}
                                    </button>
                                );
                            })}
                        </div>
                        {selectedOddOne && (
                            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-800 text-center animate-fade-in">
                                <p><strong className="font-bold">{currentOddOneOutSet.oddOneOut}</strong> is the odd one out. {currentOddOneOutSet.reason}</p>
                                <button onClick={() => { 
                                    if (oddOneOutIndex < oddOneOutData.sets.length - 1) {
                                        setOddOneOutIndex(p => p + 1);
                                    } else {
                                        setOddOneOutComplete(true);
                                        setProgress(p => ({...p, oddOneOut: true}));
                                    }
                                    setSelectedOddOne(null); 
                                }} className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-full">Next Set &rarr;</button>
                            </div>
                        )}
                    </>
                 ) : (
                    <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <p className="font-bold text-lg">Excellent critical thinking!</p>
                    </div>
                )}
            </section>

            {/* Section 4: Word Sort Challenge */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-teal-400 pb-2 mb-4">Word Sort Challenge</h3>
                 <p className="text-gray-600 mb-4">Drag and drop the words into the correct category to show you understand their context.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {wordSortData.categories.map(cat => (
                        <div key={cat} onDragOver={handleDragOver} onDrop={(e) => handleSortDrop(e, cat)} className="bg-gray-100 p-4 rounded-lg min-h-[150px] border-2 border-dashed border-gray-300">
                            <h4 className="font-bold text-center text-gray-700 mb-2">{cat}</h4>
                            <div className="mt-2 space-y-2">
                               {Object.entries(sortedWords).filter(([, c]) => c === cat).map(([word]) => <div key={word} className="bg-teal-200 text-teal-800 p-2 rounded-md font-semibold text-center">{word}</div>)}
                            </div>
                        </div>
                     ))}
                </div>
                 <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {wordSortData.words
                        .filter(w => !sortedWords[w.text])
                        .map(word => <button key={word.text} draggable onDragStart={(e) => handleDragStart(e, word.text)} className="bg-white shadow-md p-2 rounded-md font-semibold text-gray-700 cursor-grab active:cursor-grabbing hover:bg-teal-100">{word.text}</button>
                    )}
                </div>
                {allWordsSorted && sortFeedback === null && (
                    <div className="text-center mt-4">
                        <button onClick={checkSort} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg">Check My Sort</button>
                    </div>
                )}
                {sortFeedback !== null && (
                    <div className={`mt-4 text-center p-3 rounded-lg animate-fade-in font-bold ${sortFeedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {sortFeedback === 'correct' ? 'Perfectly sorted!' : 'Some words are in the wrong place. Try again!'}
                        {sortFeedback === 'incorrect' && <button onClick={() => { setSortedWords({}); setSortFeedback(null); }} className="ml-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">Reset</button>}
                    </div>
                )}
            </section>

             {/* Section 5: Analogy Puzzle */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-red-400 pb-2 mb-4">Analogy Puzzle</h3>
                <p className="text-gray-600 mb-4">Complete the analogy to show a deeper understanding of the word's relationships.</p>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-lg text-gray-800">{analogyData.sentence[0]} <strong className="text-red-600">{analogyAnswer || '______'}</strong>{analogyData.sentence[1]}</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {analogyOptions.map(opt => {
                         const isCorrect = analogyAnswer === analogyData.correctAnswer && opt === analogyData.correctAnswer;
                         const isIncorrect = analogyAnswer === opt && opt !== analogyData.correctAnswer;
                         const buttonClass = `font-semibold px-4 py-2 rounded-lg transition-all ${
                            !analogyAnswer ? 'bg-white text-gray-800 hover:bg-red-100 shadow' : 
                            isCorrect ? 'bg-green-200 text-green-900 ring-2 ring-green-500' :
                            isIncorrect ? 'bg-red-200 text-red-900 ring-2 ring-red-500' : 'bg-gray-100 text-gray-500'
                         }`;
                        return <button key={opt} onClick={() => {setAnalogyAnswer(opt); if(opt === analogyData.correctAnswer) { onReviewUpdate('Instruct', 'test', true); setProgress(p => ({...p, analogy: true})); }}} disabled={!!analogyAnswer} className={buttonClass}>{opt}</button>
                    })}
                </div>
            </section>

        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const saved = localStorage.getItem('currentWeek');
    return saved ? Number(saved) : 1;
  });
  const [showL1Support, setShowL1Support] = useState(() => {
    const saved = localStorage.getItem('showL1Support');
    return saved === 'true';
  });
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('reviewItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [showRecall, setShowRecall] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showTeacherMaterials, setShowTeacherMaterials] = useState(false);

  const weekData = useMemo(() => WEEK_DATA.find(w => w.week === currentWeek) as WeekData, [currentWeek]);
  const allVocabulary = useMemo(() =>
    WEEK_DATA
      .filter(w => w.week <= currentWeek)
      .flatMap(w => w.vocabulary),
    [currentWeek]
  );

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('currentWeek', String(currentWeek));
  }, [currentWeek]);

  useEffect(() => {
    localStorage.setItem('showL1Support', String(showL1Support));
  }, [showL1Support]);

  useEffect(() => {
    localStorage.setItem('reviewItems', JSON.stringify(reviewItems));
  }, [reviewItems]);

  useEffect(() => {
      // Get all words from current week and all previous weeks
      const allWordsUpToCurrentWeek = WEEK_DATA
          .filter(w => w.week <= currentWeek)
          .flatMap(w => [
              ...w.vocabulary.map(v => v.term),
              ...w.morphology.examples.map(e => e.word)
          ]);
      const uniqueWords = [...new Set(allWordsUpToCurrentWeek)];

      // Preserve existing progress for words we already have
      setReviewItems(prev => {
          const existingProgress = new Map(prev.map(item => [item.term.toLowerCase(), item]));
          return uniqueWords.map(term => {
              const existing = existingProgress.get(term.toLowerCase());
              return existing || { term, rule: false, relate: false, test: false };
          });
      });
  }, [currentWeek]);

  const updateReviewItem = useCallback((term: string, key: 'rule' | 'relate' | 'test', value: boolean) => {
      setReviewItems(prev => {
          const itemExists = prev.some(item => item.term.toLowerCase() === term.toLowerCase());
          if (itemExists) {
              return prev.map(item => item.term.toLowerCase() === term.toLowerCase() ? {...item, [key]: value} : item);
          }
          return [...prev, { term, rule: key === 'rule' && value, relate: key === 'relate' && value, test: key === 'test' && value }];
      });
  }, []);
  
  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentWeek(Number(e.target.value));
  };
  
  const renderWeekPage = () => {
    // All weeks use the same page component with different data
    return <Week1Page weekData={weekData} l1Support={showL1Support} onReviewUpdate={updateReviewItem} />;
  }

  return (
    <>
      {showRecall && <DailyRecallModal allWords={allVocabulary} onClose={() => setShowRecall(false)} />}
      {showDashboard && <PerformanceDashboard reviewItems={reviewItems} onClose={() => setShowDashboard(false)} />}
      {showTeacherMaterials && <TeacherMaterials onClose={() => setShowTeacherMaterials(false)} />}
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-sky-400 p-4 sm:p-8 font-sans">
        <div className="max-w-7xl mx-auto bg-slate-50/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
          <Header
            currentWeek={currentWeek}
            onWeekChange={handleWeekChange}
            showL1Support={showL1Support}
            onL1SupportChange={setShowL1Support}
          />

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                  {renderWeekPage()}
              </div>

              <div className="flex flex-col gap-6">
                  <ReviewBox items={reviewItems} />
                  <button onClick={() => setShowDashboard(true)} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 min-h-[56px]">
                      <CheckIcon className="w-6 h-6"/>
                      <span className="text-sm sm:text-base">HOW ARE WE DOING?</span>
                  </button>
                  <button onClick={() => setShowRecall(true)} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 min-h-[56px]">
                      <DailyRecallIcon className="w-6 h-6"/>
                      <span className="text-sm sm:text-base">DAILY RECALL CHALLENGE</span>
                  </button>
                  <button onClick={() => setShowTeacherMaterials(true)} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 min-h-[56px]">
                      <BookIcon className="w-6 h-6"/>
                      <span className="text-sm sm:text-base">TEACHER MATERIALS</span>
                  </button>
              </div>
          </main>
        </div>
      </div>
    </>
  );
}