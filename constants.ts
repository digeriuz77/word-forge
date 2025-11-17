import type { WeekData } from './types';

export const WEEK_DATA: WeekData[] = [
  {
    week: 1,
    title: "Identify & Report",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'struct', meaning: 'to build, put in order' },
      prefixes: [
        { text: 'con-', meaning: 'with, together' },
        { text: 'in-', meaning: 'in, into' },
        { text: 'de-', meaning: 'down, away from' },
        { text: 're-', meaning: 'again, back' },
      ],
      suffixes: [
        { text: '-ion', partOfSpeech: 'Noun' },
        { text: '-ive', partOfSpeech: 'Adjective' },
        { text: '-ing', partOfSpeech: 'Verb/Adjective' },
        { text: '-or', partOfSpeech: 'Noun (person)'},
      ],
      examples: [
        { word: 'construction', parts: ['con', 'struct', 'ion'], definition: 'The building of something, typically a large structure.'},
        { word: 'instruction', parts: ['in', 'struct', 'ion'], definition: 'Detailed information about how something should be done.'},
        { word: 'instructor', parts: ['in', 'struct', 'or'], definition: 'A person who teaches something.' },
        { word: 'destructive', parts: ['de', 'struct', 'ive'], definition: 'Causing great and irreparable damage.' },
        { word: 'restructuring', parts: ['re', 'struct', 'ing'], definition: 'The act of organizing a system in a new way.' },
      ]
    },
    vocabulary: [
      { 
        term: "Identify", 
        definition: "To recognize or establish who or what someone or something is.", 
        l1_translation: "Mengenal pasti",
        contexts: [
          { subject: "Science", sentence: "You must identify the different parts of the plant cell." },
          { subject: "Math", sentence: "First, identify the variables in the equation." }
        ] 
      },
      { 
        term: "Rule", 
        definition: "A principle or regulation governing conduct or procedure.", 
        l1_translation: "Peraturan",
        contexts: [
          { subject: "Science", sentence: "The safety rule is to always wear goggles in the lab." },
          { subject: "Math", sentence: "Follow the order of operations rule (BODMAS)." }
        ]
      },
      { 
        term: "Relate", 
        definition: "Make or show a connection between two or more things.", 
        l1_translation: "Menghubungkan",
        contexts: [
          { subject: "Science", sentence: "Explain how the amount of sunlight can relate to plant growth." },
          { subject: "Math", sentence: "How does the radius of a circle relate to its circumference?" }
        ]
      },
      { 
        term: "Instruct", 
        definition: "To direct or command someone to do something.", 
        l1_translation: "Memberi arahan",
        contexts: [
          { subject: "Science", sentence: "The manual will instruct you on how to use the microscope." },
          { subject: "Math", sentence: "The teacher will instruct the class on a new method for division." }
        ]
      },
      { 
        term: "Test", 
        definition: "A procedure to establish the quality or performance of something.", 
        l1_translation: "Ujian",
        contexts: [
          { subject: "Science", sentence: "We will test the hypothesis with an experiment." },
          { subject: "Math", sentence: "You need to test your answer to see if it is correct." }
        ]
      },
      { 
        term: "Observe", 
        definition: "To notice or perceive something and register it as significant.", 
        l1_translation: "Memerhati",
        contexts: [
          { subject: "Science", sentence: "Observe the chemical reaction and record what you see." },
          { subject: "Math", sentence: "Observe the pattern in the sequence of numbers." }
        ]
      },
    ],
    contextualActivities: [
       {
        type: 'WordConstruction',
        targets: [
          { definition: 'To build something together.', parts: ['con', 'struct'] },
          { definition: 'To give instructions; to teach.', parts: ['in', 'struct'] },
          { definition: 'The person that gives instructions.', parts: ['in', 'struct', 'or'] },
          { definition: 'Causing great damage.', parts: ['de', 'struct', 'ive'] },
          { definition: 'The building site is a _________ site.', parts: ['con', 'struct', 'ion'] },
          { definition: 'The lesson is very ______________ (adjective).', parts: ['in', 'struct', 'ive'] },
          { definition: 'To build again.', parts: ['re', 'con', 'struct'] },
          { definition: 'He had _________________ surgery to rebuild his face', parts: ['re', 'con', 'struct', 'ive'] },
          { definition: 'When there is a fire, follow the __________', parts: ['in', 'struct', 'ion'] }
        ],
        allParts: ['struct', 'con', 'in', 'or', 'de', 're', 'ive', 'ion']
      },
      {
        type: 'OddOneOut',
        sets: [
           {
  words: ['Infer', 'Predict', 'Guess', 'Measure'],
  oddOneOut: 'Measure',
  reason: 'The others involve using clues to make a conclusion, while "Measure" is about finding an exact value.'
},
{
  words: ['Instruction', 'Rule', 'Guideline', 'Opinion'],
  oddOneOut: 'Opinion',
  reason: 'The others are forms of direction or expectation, while "Opinion" is a personal belief.'
},
{
  words: ['Compare', 'Contrast', 'Explain', 'Create'],
  oddOneOut: 'Create',
  reason: 'The others involve analyzing existing ideas, while "Create" means making something new.'
},
{
  words: ['Fact', 'Evidence', 'Data', 'Feeling'],
  oddOneOut: 'Feeling',
  reason: 'The others are used to support or prove something, while "Feeling" is personal and subjective.'
},
{
  words: ['Sequence', 'Timeline', 'Order', 'Opinion'],
  oddOneOut: 'Opinion',
  reason: 'The others show how things happen in time, while "Opinion" is not based on time or events.'
},
{
  words: ['Cause', 'Effect', 'Impact', 'Title'],
  oddOneOut: 'Title',
  reason: 'The others describe results or changes, while "Title" is just a label or name.'
},
{
  words: ['Define', 'Describe', 'Explain', 'Imagine'],
  oddOneOut: 'Imagine',
  reason: 'The others involve giving clear information, while "Imagine" is about thinking creatively or pretending.'
},
{
  words: ['Question', 'Theory', 'Prediction', 'Answer'],
  oddOneOut: 'Answer',
  reason: 'The others are ways to start thinking or investigating, while "Answer" is the end result.'
}
        ]
      },
      {
        type: 'WordSort',
        categories: ["Science Lab Actions", "Classroom Rules"],
        words: [
          { text: "Observe", category: "Science Lab Actions" },
          { text: "Test", category: "Science Lab Actions" },
          { text: "Identify", category: "Science Lab Actions" },
          { text: "Rule", category: "Classroom Rules" },
          { text: "Instruct", category: "Classroom Rules" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["Following an 'instruction' is to a student as following a 'recipe' is to a", "."],
        correctAnswer: "Chef",
        distractors: ["Doctor", "Driver", "Pilot"]
      }
    ]
  },
  {
    week: 2,
    title: "Seeking Information",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'ana', meaning: 'up, back, again' },
      prefixes: [],
      suffixes: [],
      examples: []
    },
    vocabulary: [
      { term: "Measure", definition: "Ascertain the size, amount, or degree of (something) by using an instrument or device marked in standard units.", l1_translation: "Ukur" },
      { term: "Determine", definition: "Ascertain or establish exactly, typically as a result of research or calculation.", l1_translation: "Tentukan" },
    ],
    contextualActivities: []
  }
];