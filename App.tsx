import React, { useState, useMemo, useEffect, useCallback, FC } from 'react';
import type { ReviewItem, WeekData, ActivityState, Word, MorphologyBuilderData, WordSortData, AnalogyData, WordConstructionData, OddOneOutData } from './types';
import { WEEK_DATA } from './constants';
import { LogoIcon, CheckIcon, BookIcon, LockIcon, DailyRecallIcon, ArrowLeftIcon, ArrowRightIcon } from './components/Icons';


// --- CHILD COMPONENTS ---

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
    <header className="flex flex-col sm:flex-row items-center justify-between bg-blue-500 text-white p-4 rounded-xl shadow-lg mb-6">
        <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg">
                <LogoIcon className="w-10 h-10 text-orange-500"/>
            </div>
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">ACADEMIC</h1>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-orange-300 -mt-2">WORD FORGE</h2>
            </div>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex flex-col items-end">
                <span className="text-xs font-semibold">SELECT WEEK</span>
                <select value={currentWeek} onChange={onWeekChange} className="bg-white/20 border-2 border-white/50 rounded-lg px-3 py-1.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-black">
                    {WEEK_DATA.map(w => <option key={w.week} value={w.week} className="text-black">{w.week}: {w.title}</option>)}
                </select>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Sokongan L1</span>
                <span className="text-xs">Show L1 Support</span>
            </div>
            <button onClick={() => onL1SupportChange(!showL1Support)} className={`w-14 h-7 rounded-full p-1 transition-colors ${showL1Support ? 'bg-green-400' : 'bg-gray-400'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${showL1Support ? 'translate-x-7' : ''}`} />
            </button>
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

    // --- EVENT HANDLERS ---
    
    // Generic Drag-and-Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLElement>, data: string) => {
        e.dataTransfer.setData("text/plain", data);
    };
    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };

    // Word Construction Handlers
    const handleConstructionDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const part = e.dataTransfer.getData("text/plain");
        if (part && !droppedParts.includes(part)) {
            setDroppedParts(prev => [...prev, part]);
        }
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
                <p className="text-gray-600 mb-4">The Latin root <strong className="font-semibold text-gray-700">'{weekData.morphology.root.text}'</strong> means <strong className="font-semibold text-gray-700">'{weekData.morphology.root.meaning}'</strong>. See how it combines with prefixes and suffixes to make new words.</p>
                <div className="flex flex-wrap gap-2">
                    {weekData.morphology.examples.map(ex => (
                        <button key={ex.word} onClick={() => { setBuiltWord(ex); setProgress(p => ({ ...p, morphology: true })) }} className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full hover:bg-blue-200 hover:scale-105 transition-transform">
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
                        <p className="text-gray-600 mb-4">Drag the morphemes to build a word that means: <strong className="text-gray-800">"{currentConstructionTarget.definition}"</strong></p>
                        <div onDragOver={handleDragOver} onDrop={handleConstructionDrop} className="flex items-center justify-center gap-1 bg-gray-200 p-4 rounded-lg min-h-[60px] border-2 border-dashed border-gray-400 mb-4">
                            {droppedParts.map(p => <span key={p} className="bg-cyan-500 text-white font-bold px-3 py-1 rounded-md text-lg">{p}</span>)}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {constructionData.allParts.map(part => (
                                <button key={part} draggable onDragStart={(e) => handleDragStart(e, part)} className="bg-white shadow-md p-2 rounded-md font-semibold text-gray-700 cursor-grab active:cursor-grabbing hover:bg-cyan-100">{part}</button>
                            ))}
                        </div>
                        <div className="text-center">
                            {constructionFeedback === null ? (
                                <>
                                    <button onClick={checkConstruction} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg mr-2">Check</button>
                                    <button onClick={() => setDroppedParts([])} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Clear</button>
                                </>
                            ) : constructionFeedback === 'correct' ? (
                                <div className="p-3 rounded-lg animate-fade-in bg-green-100 text-green-800">
                                    <p className="font-bold">Correct!</p>
                                    <button onClick={nextConstruction} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full">Next Target &rarr;</button>
                                </div>
                            ) : (
                                <div className="p-3 rounded-lg animate-fade-in bg-red-100 text-red-800">
                                    <p className="font-bold">Not quite, try again!</p>
                                    <button onClick={() => { setConstructionFeedback(null); setDroppedParts([]); }} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full">Try Again</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                     <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <p className="font-bold text-lg">Great job! You've mastered word construction.</p>
                    </div>
                )}
            </section>

             {/* Section 3: Odd One Out */}
            <section className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-400 pb-2 mb-4">Odd One Out</h3>
                 {!oddOneOutComplete ? (
                    <>
                        <p className="text-gray-600 mb-4">Which word does not belong with the others?</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
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
                                    <button key={word} onClick={() => { if(!selectedOddOne) setSelectedOddOne(word) }} disabled={!!selectedOddOne} className={`p-3 rounded-lg font-semibold text-gray-800 text-center transition-all ${buttonClass}`}>
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
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showL1Support, setShowL1Support] = useState(false);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [showRecall, setShowRecall] = useState(false);

  const weekData = useMemo(() => WEEK_DATA.find(w => w.week === currentWeek) as WeekData, [currentWeek]);
  const allVocabulary = useMemo(() =>
    WEEK_DATA
      .filter(w => w.week <= currentWeek)
      .flatMap(w => w.vocabulary),
    [currentWeek]
  );

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
                  <button onClick={() => setShowRecall(true)} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                      <DailyRecallIcon className="w-6 h-6"/>
                      <span>DAILY RECALL CHALLENGE</span>
                  </button>
              </div>
          </main>
        </div>
      </div>
    </>
  );
}