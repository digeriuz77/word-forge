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
      root: { text: 'spect', meaning: 'to look, see' },
      prefixes: [
        { text: 'in-', meaning: 'in, into' },
        { text: 're-', meaning: 'back, again' },
        { text: 'ex-', meaning: 'out' },
      ],
      suffixes: [
        { text: '-or', partOfSpeech: 'Noun (person)' },
        { text: '-ion', partOfSpeech: 'Noun' },
        { text: '-ive', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'inspect', parts: ['in', 'spect'], definition: 'To look at something carefully to find problems.' },
        { word: 'inspector', parts: ['in', 'spect', 'or'], definition: 'A person who inspects things.' },
        { word: 'respect', parts: ['re', 'spect'], definition: 'To look back at someone with admiration.' },
        { word: 'expect', parts: ['ex', 'spect'], definition: 'To look out for something to happen.' },
        { word: 'inspection', parts: ['in', 'spect', 'ion'], definition: 'The act of inspecting.' },
      ]
    },
    vocabulary: [
      {
        term: "Measure",
        definition: "Ascertain the size, amount, or degree of something using standard units.",
        l1_translation: "Ukur",
        contexts: [
          { subject: "Science", sentence: "Use a ruler to measure the length of the leaf." },
          { subject: "Math", sentence: "Measure the angle using a protractor." }
        ]
      },
      {
        term: "Determine",
        definition: "Find out or establish precisely through research or calculation.",
        l1_translation: "Tentukan",
        contexts: [
          { subject: "Science", sentence: "We need to determine which liquid is an acid." },
          { subject: "Math", sentence: "Determine the value of x in the equation." }
        ]
      },
      {
        term: "Estimate",
        definition: "Roughly calculate or judge the value, amount, or size of something.",
        l1_translation: "Anggarkan",
        contexts: [
          { subject: "Science", sentence: "Estimate how much water the plant needs each day." },
          { subject: "Math", sentence: "Estimate the answer before you calculate it exactly." }
        ]
      },
      {
        term: "Analysis",
        definition: "Detailed examination of the elements or structure of something.",
        l1_translation: "Analisis",
        contexts: [
          { subject: "Science", sentence: "Our analysis of the data shows a clear pattern." },
          { subject: "Math", sentence: "The analysis of the graph reveals the trend." }
        ]
      },
      {
        term: "Interpret",
        definition: "Explain the meaning of information or data.",
        l1_translation: "Tafsirkan",
        contexts: [
          { subject: "Science", sentence: "Interpret the results of the experiment." },
          { subject: "Math", sentence: "How do you interpret this bar chart?" }
        ]
      },
      {
        term: "Examine",
        definition: "Inspect something closely and thoroughly.",
        l1_translation: "Periksa",
        contexts: [
          { subject: "Science", sentence: "Examine the specimen under the microscope." },
          { subject: "Math", sentence: "Examine the pattern in the number sequence." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To look into something carefully', parts: ['in', 'spect'] },
          { definition: 'A person who looks into things', parts: ['in', 'spect', 'or'] },
          { definition: 'To look out for something', parts: ['ex', 'spect'] },
          { definition: 'Looking back with admiration', parts: ['re', 'spect'] },
          { definition: 'The act of looking carefully', parts: ['in', 'spect', 'ion'] },
        ],
        allParts: ['spect', 'in', 'ex', 're', 'or', 'ion']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Measure', 'Estimate', 'Determine', 'Imagine'],
            oddOneOut: 'Imagine',
            reason: 'The others involve finding specific information, while "Imagine" is about creating ideas.'
          },
          {
            words: ['Analysis', 'Examine', 'Inspect', 'Ignore'],
            oddOneOut: 'Ignore',
            reason: 'The others mean to look carefully at something, while "Ignore" means not to pay attention.'
          },
          {
            words: ['Data', 'Evidence', 'Information', 'Guess'],
            oddOneOut: 'Guess',
            reason: 'The others are based on facts, while "Guess" is without certainty.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Finding Exact Values", "Making Approximations"],
        words: [
          { text: "Measure", category: "Finding Exact Values" },
          { text: "Determine", category: "Finding Exact Values" },
          { text: "Estimate", category: "Making Approximations" },
          { text: "Calculate", category: "Finding Exact Values" },
          { text: "Approximate", category: "Making Approximations" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["A microscope helps you 'examine' cells, just as a telescope helps you", "stars."],
        correctAnswer: "observe",
        distractors: ["measure", "create", "destroy"]
      }
    ]
  },
  {
    week: 3,
    title: "Compare & Classify",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'sequ', meaning: 'to follow' },
      prefixes: [
        { text: 'con-', meaning: 'together, with' },
        { text: 'sub-', meaning: 'under, after' },
      ],
      suffixes: [
        { text: '-ence', partOfSpeech: 'Noun' },
        { text: '-ent', partOfSpeech: 'Adjective' },
        { text: '-al', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'sequence', parts: ['sequ', 'ence'], definition: 'A set of things that follow in order.' },
        { word: 'consequent', parts: ['con', 'sequ', 'ent'], definition: 'Following as a result or effect.' },
        { word: 'consequence', parts: ['con', 'sequ', 'ence'], definition: 'A result that follows an action.' },
        { word: 'subsequent', parts: ['sub', 'sequ', 'ent'], definition: 'Coming after in time or order.' },
        { word: 'sequential', parts: ['sequ', 'ent', 'al'], definition: 'Forming or following a logical order.' },
      ]
    },
    vocabulary: [
      {
        term: "Classify",
        definition: "Arrange items into groups according to shared characteristics.",
        l1_translation: "Kelaskan",
        contexts: [
          { subject: "Science", sentence: "Classify these animals as vertebrates or invertebrates." },
          { subject: "Math", sentence: "Classify these shapes by the number of sides they have." }
        ]
      },
      {
        term: "Category",
        definition: "A group of things with shared characteristics.",
        l1_translation: "Kategori",
        contexts: [
          { subject: "Science", sentence: "Each category of living things has different features." },
          { subject: "Math", sentence: "Put these numbers into the correct category: odd or even." }
        ]
      },
      {
        term: "Pattern",
        definition: "A repeated or regular arrangement.",
        l1_translation: "Pola/Corak",
        contexts: [
          { subject: "Science", sentence: "There is a pattern in how the moon changes shape." },
          { subject: "Math", sentence: "Continue the pattern: 2, 4, 6, 8..." }
        ]
      },
      {
        term: "Compare",
        definition: "Examine to find similarities between two or more things.",
        l1_translation: "Bandingkan",
        contexts: [
          { subject: "Science", sentence: "Compare the life cycles of a butterfly and a frog." },
          { subject: "Math", sentence: "Compare the fractions: which is larger?" }
        ]
      },
      {
        term: "Similar",
        definition: "Alike or resembling in appearance or nature.",
        l1_translation: "Serupa",
        contexts: [
          { subject: "Science", sentence: "Dolphins and sharks look similar but are very different." },
          { subject: "Math", sentence: "These two triangles are similar in shape." }
        ]
      },
      {
        term: "Sequence",
        definition: "A particular order in which related things follow each other.",
        l1_translation: "Urutan",
        contexts: [
          { subject: "Science", sentence: "Arrange the steps of photosynthesis in the correct sequence." },
          { subject: "Math", sentence: "What is the next number in this sequence?" }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'Things that follow in order', parts: ['sequ', 'ence'] },
          { definition: 'Following together as a result', parts: ['con', 'sequ', 'ence'] },
          { definition: 'Coming after something', parts: ['sub', 'sequ', 'ent'] },
          { definition: 'In a following order', parts: ['sequ', 'ent', 'al'] },
        ],
        allParts: ['sequ', 'con', 'sub', 'ence', 'ent', 'al']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Compare', 'Contrast', 'Classify', 'Destroy'],
            oddOneOut: 'Destroy',
            reason: 'The others involve analyzing similarities and differences, while "Destroy" means to break something.'
          },
          {
            words: ['Pattern', 'Sequence', 'Order', 'Chaos'],
            oddOneOut: 'Chaos',
            reason: 'The others describe organized arrangements, while "Chaos" means disorder.'
          },
          {
            words: ['Similar', 'Alike', 'Resembling', 'Opposite'],
            oddOneOut: 'Opposite',
            reason: 'The others mean things are the same, while "Opposite" means completely different.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Words About Sameness", "Words About Differences"],
        words: [
          { text: "Similar", category: "Words About Sameness" },
          { text: "Alike", category: "Words About Sameness" },
          { text: "Differ", category: "Words About Differences" },
          { text: "Contrast", category: "Words About Differences" },
          { text: "Resemble", category: "Words About Sameness" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["'Classify' is to grouping as 'sequence' is to", "."],
        correctAnswer: "ordering",
        distractors: ["mixing", "removing", "hiding"]
      }
    ]
  },
  {
    week: 4,
    title: "Contrast & Structure",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'fer', meaning: 'to carry, bear' },
      prefixes: [
        { text: 'dif-', meaning: 'apart, away' },
        { text: 'pre-', meaning: 'before' },
        { text: 'trans-', meaning: 'across' },
        { text: 're-', meaning: 'back' },
      ],
      suffixes: [
        { text: '-ence', partOfSpeech: 'Noun' },
        { text: '-ent', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'differ', parts: ['dif', 'fer'], definition: 'To be unlike or distinct from something else.' },
        { word: 'different', parts: ['dif', 'fer', 'ent'], definition: 'Not the same as another.' },
        { word: 'difference', parts: ['dif', 'fer', 'ence'], definition: 'The way things are not the same.' },
        { word: 'prefer', parts: ['pre', 'fer'], definition: 'To carry forward one choice before others.' },
        { word: 'transfer', parts: ['trans', 'fer'], definition: 'To carry across from one place to another.' },
        { word: 'refer', parts: ['re', 'fer'], definition: 'To carry back or direct attention to something.' },
      ]
    },
    vocabulary: [
      {
        term: "Differ",
        definition: "Be unlike or dissimilar.",
        l1_translation: "Berbeza",
        contexts: [
          { subject: "Science", sentence: "Plants and animals differ in how they get energy." },
          { subject: "Math", sentence: "These two angles differ by 15 degrees." }
        ]
      },
      {
        term: "Contrast",
        definition: "Compare to show differences.",
        l1_translation: "Bezakan",
        contexts: [
          { subject: "Science", sentence: "Contrast the properties of solids and liquids." },
          { subject: "Math", sentence: "Contrast multiplication and division operations." }
        ]
      },
      {
        term: "Model",
        definition: "A simplified representation of something complex.",
        l1_translation: "Model",
        contexts: [
          { subject: "Science", sentence: "This is a model of the solar system." },
          { subject: "Math", sentence: "Use a model to show how fractions work." }
        ]
      },
      {
        term: "Process",
        definition: "A series of actions or steps to achieve a result.",
        l1_translation: "Proses",
        contexts: [
          { subject: "Science", sentence: "Photosynthesis is the process plants use to make food." },
          { subject: "Math", sentence: "Follow the process to solve the equation." }
        ]
      },
      {
        term: "Structure",
        definition: "The arrangement of parts in something.",
        l1_translation: "Struktur",
        contexts: [
          { subject: "Science", sentence: "The structure of a cell includes many different parts." },
          { subject: "Math", sentence: "Understanding the structure of numbers helps with place value." }
        ]
      },
      {
        term: "Feature",
        definition: "A distinctive characteristic or aspect of something.",
        l1_translation: "Ciri",
        contexts: [
          { subject: "Science", sentence: "A key feature of mammals is that they feed milk to their young." },
          { subject: "Math", sentence: "An important feature of rectangles is that opposite sides are equal." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To carry apart; to be unlike', parts: ['dif', 'fer'] },
          { definition: 'The state of being unlike', parts: ['dif', 'fer', 'ence'] },
          { definition: 'To carry before; to like better', parts: ['pre', 'fer'] },
          { definition: 'To carry across', parts: ['trans', 'fer'] },
          { definition: 'Not the same', parts: ['dif', 'fer', 'ent'] },
        ],
        allParts: ['fer', 'dif', 'pre', 'trans', 're', 'ence', 'ent']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Model', 'Diagram', 'Representation', 'Reality'],
            oddOneOut: 'Reality',
            reason: 'The others are simplified versions of something, while "Reality" is the actual thing.'
          },
          {
            words: ['Structure', 'Organization', 'System', 'Mess'],
            oddOneOut: 'Mess',
            reason: 'The others describe ordered arrangements, while "Mess" means disorder.'
          },
          {
            words: ['Process', 'Method', 'Procedure', 'Random'],
            oddOneOut: 'Random',
            reason: 'The others describe organized steps, while "Random" has no pattern.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Things With Steps", "Static Things"],
        words: [
          { text: "Process", category: "Things With Steps" },
          { text: "Procedure", category: "Things With Steps" },
          { text: "Structure", category: "Static Things" },
          { text: "Model", category: "Static Things" },
          { text: "Method", category: "Things With Steps" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["A blueprint is a 'model' for a building, just as a recipe is a", "for a meal."],
        correctAnswer: "guide",
        distractors: ["problem", "mistake", "enemy"]
      }
    ]
  },
  {
    week: 5,
    title: "Function & Systems",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'funct', meaning: 'to perform, work' },
      prefixes: [
        { text: 'dys-', meaning: 'bad, difficult' },
        { text: 'mal-', meaning: 'bad, wrong' },
      ],
      suffixes: [
        { text: '-ion', partOfSpeech: 'Noun' },
        { text: '-al', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'function', parts: ['funct', 'ion'], definition: 'The purpose or role something performs.' },
        { word: 'functional', parts: ['funct', 'ion', 'al'], definition: 'Working properly and serving its purpose.' },
        { word: 'dysfunction', parts: ['dys', 'funct', 'ion'], definition: 'Not working properly.' },
        { word: 'malfunction', parts: ['mal', 'funct', 'ion'], definition: 'Failure to work correctly.' },
      ]
    },
    vocabulary: [
      {
        term: "Function",
        definition: "The purpose or role that something performs.",
        l1_translation: "Fungsi",
        contexts: [
          { subject: "Science", sentence: "The function of roots is to absorb water from the soil." },
          { subject: "Math", sentence: "In this function, y equals two times x." }
        ]
      },
      {
        term: "System",
        definition: "A set of connected things working together as a whole.",
        l1_translation: "Sistem",
        contexts: [
          { subject: "Science", sentence: "The digestive system breaks down food into nutrients." },
          { subject: "Math", sentence: "The decimal system is based on powers of ten." }
        ]
      },
      {
        term: "Organize",
        definition: "Arrange systematically; order.",
        l1_translation: "Mengatur",
        contexts: [
          { subject: "Science", sentence: "Organize your observations into a table." },
          { subject: "Math", sentence: "Organize the data from smallest to largest." }
        ]
      },
      {
        term: "Apply",
        definition: "Put something to practical use.",
        l1_translation: "Gunakan/Terapkan",
        contexts: [
          { subject: "Science", sentence: "Apply what you learned about magnets to solve this problem." },
          { subject: "Math", sentence: "Apply the formula to find the area of the rectangle." }
        ]
      },
      {
        term: "Effect",
        definition: "A change that is the result of an action or cause.",
        l1_translation: "Kesan",
        contexts: [
          { subject: "Science", sentence: "What effect does sunlight have on plant growth?" },
          { subject: "Math", sentence: "Adding zero has no effect on the number." }
        ]
      },
      {
        term: "Factor",
        definition: "Something that contributes to a result or outcome.",
        l1_translation: "Faktor",
        contexts: [
          { subject: "Science", sentence: "Temperature is an important factor in how fast ice melts." },
          { subject: "Math", sentence: "The factors of 12 are 1, 2, 3, 4, 6, and 12." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'The work or role something does', parts: ['funct', 'ion'] },
          { definition: 'Working correctly', parts: ['funct', 'ion', 'al'] },
          { definition: 'Working badly', parts: ['dys', 'funct', 'ion'] },
          { definition: 'Working wrongly; a breakdown', parts: ['mal', 'funct', 'ion'] },
        ],
        allParts: ['funct', 'dys', 'mal', 'ion', 'al']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['System', 'Network', 'Organization', 'Individual'],
            oddOneOut: 'Individual',
            reason: 'The others describe connected parts working together, while "Individual" is a single unit.'
          },
          {
            words: ['Cause', 'Reason', 'Source', 'Effect'],
            oddOneOut: 'Effect',
            reason: 'The others describe what makes something happen, while "Effect" is what happens as a result.'
          },
          {
            words: ['Function', 'Purpose', 'Role', 'Decoration'],
            oddOneOut: 'Decoration',
            reason: 'The others describe the job something does, while "Decoration" is just for appearance.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Cause Words", "Effect Words"],
        words: [
          { text: "Factor", category: "Cause Words" },
          { text: "Reason", category: "Cause Words" },
          { text: "Effect", category: "Effect Words" },
          { text: "Result", category: "Effect Words" },
          { text: "Consequence", category: "Effect Words" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["The heart's 'function' is to pump blood, just as the brain's function is to", "information."],
        correctAnswer: "process",
        distractors: ["ignore", "delete", "waste"]
      }
    ]
  },
  {
    week: 6,
    title: "Cause & Effect",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'bio', meaning: 'life' },
      prefixes: [
        { text: 'micro-', meaning: 'small' },
        { text: 'macro-', meaning: 'large' },
      ],
      suffixes: [
        { text: '-logy', partOfSpeech: 'Noun (study of)' },
        { text: '-sphere', partOfSpeech: 'Noun (sphere, ball)' },
      ],
      examples: [
        { word: 'biology', parts: ['bio', 'logy'], definition: 'The study of living things.' },
        { word: 'biosphere', parts: ['bio', 'sphere'], definition: 'The parts of Earth where life exists.' },
        { word: 'microbe', parts: ['micro', 'bio'], definition: 'A tiny living organism.' },
        { word: 'microbiology', parts: ['micro', 'bio', 'logy'], definition: 'The study of tiny living things.' },
      ]
    },
    vocabulary: [
      {
        term: "Explain",
        definition: "Make something clear by describing it in detail.",
        l1_translation: "Terangkan",
        contexts: [
          { subject: "Science", sentence: "Explain why ice floats on water." },
          { subject: "Math", sentence: "Explain how you solved the problem." }
        ]
      },
      {
        term: "Consequently",
        definition: "As a result; therefore.",
        l1_translation: "Akibatnya",
        contexts: [
          { subject: "Science", sentence: "The plant had no water; consequently, it died." },
          { subject: "Math", sentence: "We rounded the number; consequently, the answer is approximate." }
        ]
      },
      {
        term: "Pressure",
        definition: "Continuous force exerted on or against something.",
        l1_translation: "Tekanan",
        contexts: [
          { subject: "Science", sentence: "Water pressure increases as you go deeper in the ocean." },
          { subject: "Math", sentence: "Pressure equals force divided by area." }
        ]
      },
      {
        term: "Contribute",
        definition: "Help to cause or bring about something.",
        l1_translation: "Menyumbang",
        contexts: [
          { subject: "Science", sentence: "Carbon dioxide can contribute to climate change." },
          { subject: "Math", sentence: "Each member will contribute data to the class survey." }
        ]
      },
      {
        term: "Impact",
        definition: "A marked effect or influence.",
        l1_translation: "Impak/Kesan",
        contexts: [
          { subject: "Science", sentence: "Deforestation has a huge impact on wildlife." },
          { subject: "Math", sentence: "Changing one variable has an impact on the result." }
        ]
      },
      {
        term: "Interaction",
        definition: "The way two or more things affect each other.",
        l1_translation: "Interaksi",
        contexts: [
          { subject: "Science", sentence: "Study the interaction between predators and prey." },
          { subject: "Math", sentence: "There is an interaction between multiplication and addition." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'The study of life', parts: ['bio', 'logy'] },
          { definition: 'The zone of life on Earth', parts: ['bio', 'sphere'] },
          { definition: 'Study of small life forms', parts: ['micro', 'bio', 'logy'] },
          { definition: 'A tiny living thing', parts: ['micro', 'bio'] },
        ],
        allParts: ['bio', 'micro', 'macro', 'logy', 'sphere']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Explain', 'Clarify', 'Describe', 'Confuse'],
            oddOneOut: 'Confuse',
            reason: 'The others make something clearer, while "Confuse" makes things unclear.'
          },
          {
            words: ['Impact', 'Effect', 'Result', 'Ignore'],
            oddOneOut: 'Ignore',
            reason: 'The others describe outcomes of actions, while "Ignore" means to pay no attention.'
          },
          {
            words: ['Contribute', 'Add to', 'Help', 'Prevent'],
            oddOneOut: 'Prevent',
            reason: 'The others mean to support or cause something, while "Prevent" means to stop it.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Greek Roots (Life/Small)", "Regular Words"],
        words: [
          { text: "Biology", category: "Greek Roots (Life/Small)" },
          { text: "Microscope", category: "Greek Roots (Life/Small)" },
          { text: "Pressure", category: "Regular Words" },
          { text: "Explain", category: "Regular Words" },
          { text: "Microbe", category: "Greek Roots (Life/Small)" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["High temperature can 'contribute' to ice melting, just as rain can contribute to", "flooding."],
        correctAnswer: "cause",
        distractors: ["prevent", "stop", "avoid"]
      }
    ]
  },
  {
    week: 7,
    title: "Analysis & Diagrams",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'graph', meaning: 'write, draw' },
      prefixes: [
        { text: 'dia-', meaning: 'through, across' },
        { text: 'para-', meaning: 'beside' },
        { text: 'tele-', meaning: 'far' },
      ],
      suffixes: [
        { text: '-ic', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'graph', parts: ['graph'], definition: 'A diagram showing relationships between variables.' },
        { word: 'graphic', parts: ['graph', 'ic'], definition: 'Relating to visual art or drawing.' },
        { word: 'diagram', parts: ['dia', 'gram'], definition: 'A drawing that shows how something works.' },
        { word: 'paragraph', parts: ['para', 'graph'], definition: 'A section of writing beside the main flow.' },
        { word: 'telegraph', parts: ['tele', 'graph'], definition: 'A system for writing messages from far away.' },
      ]
    },
    vocabulary: [
      {
        term: "Analyze",
        definition: "Examine in detail to understand or explain.",
        l1_translation: "Analisis",
        contexts: [
          { subject: "Science", sentence: "Analyze the data from your experiment." },
          { subject: "Math", sentence: "Analyze the graph to find the trend." }
        ]
      },
      {
        term: "Develop",
        definition: "Grow or cause to grow and become more advanced.",
        l1_translation: "Membangun",
        contexts: [
          { subject: "Science", sentence: "Seeds develop into plants over time." },
          { subject: "Math", sentence: "Develop a strategy to solve word problems." }
        ]
      },
      {
        term: "Improve",
        definition: "Make or become better.",
        l1_translation: "Meningkatkan",
        contexts: [
          { subject: "Science", sentence: "How can we improve our experiment design?" },
          { subject: "Math", sentence: "Practice will improve your calculation speed." }
        ]
      },
      {
        term: "Illustrate",
        definition: "Explain or make clear by using examples or pictures.",
        l1_translation: "Menggambarkan",
        contexts: [
          { subject: "Science", sentence: "Illustrate the water cycle with a diagram." },
          { subject: "Math", sentence: "Illustrate your answer with a drawing." }
        ]
      },
      {
        term: "Demonstrate",
        definition: "Show clearly by giving proof or evidence.",
        l1_translation: "Tunjukkan",
        contexts: [
          { subject: "Science", sentence: "The teacher will demonstrate how to use the equipment." },
          { subject: "Math", sentence: "Demonstrate that your solution is correct." }
        ]
      },
      {
        term: "Sustain",
        definition: "Support or maintain over time.",
        l1_translation: "Mengekalkan",
        contexts: [
          { subject: "Science", sentence: "Plants need sunlight to sustain their growth." },
          { subject: "Math", sentence: "Can you sustain this pattern for 10 more terms?" }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'A visual showing data', parts: ['graph'] },
          { definition: 'Related to pictures or drawing', parts: ['graph', 'ic'] },
          { definition: 'A drawing showing how something works', parts: ['dia', 'gram'] },
          { definition: 'Writing from far away', parts: ['tele', 'graph'] },
        ],
        allParts: ['graph', 'gram', 'dia', 'para', 'tele', 'ic']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Analyze', 'Examine', 'Study', 'Ignore'],
            oddOneOut: 'Ignore',
            reason: 'The others mean to look carefully at something, while "Ignore" means not to pay attention.'
          },
          {
            words: ['Illustrate', 'Diagram', 'Demonstrate', 'Hide'],
            oddOneOut: 'Hide',
            reason: 'The others mean to show something clearly, while "Hide" means to conceal.'
          },
          {
            words: ['Improve', 'Enhance', 'Better', 'Worsen'],
            oddOneOut: 'Worsen',
            reason: 'The others mean to make better, while "Worsen" means to make worse.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Showing/Explaining", "Changing/Growing"],
        words: [
          { text: "Illustrate", category: "Showing/Explaining" },
          { text: "Demonstrate", category: "Showing/Explaining" },
          { text: "Develop", category: "Changing/Growing" },
          { text: "Improve", category: "Changing/Growing" },
          { text: "Analyze", category: "Showing/Explaining" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["To 'illustrate' with pictures is like to 'explain' with", "."],
        correctAnswer: "words",
        distractors: ["silence", "confusion", "secrets"]
      }
    ]
  },
  {
    week: 8,
    title: "Interpretation & Expression",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'scrib/script', meaning: 'write' },
      prefixes: [
        { text: 'de-', meaning: 'down, completely' },
        { text: 'in-', meaning: 'in, on' },
        { text: 'pre-', meaning: 'before' },
        { text: 'sub-', meaning: 'under' },
      ],
      suffixes: [
        { text: '-tion', partOfSpeech: 'Noun' },
        { text: '-ive', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'describe', parts: ['de', 'scribe'], definition: 'To write down or tell about something in detail.' },
        { word: 'description', parts: ['de', 'script', 'ion'], definition: 'A spoken or written account of something.' },
        { word: 'inscribe', parts: ['in', 'scribe'], definition: 'To write or carve words on something.' },
        { word: 'prescribe', parts: ['pre', 'scribe'], definition: 'To write beforehand; to order or recommend.' },
        { word: 'subscription', parts: ['sub', 'script', 'ion'], definition: 'An arrangement to receive something regularly by signing up.' },
      ]
    },
    vocabulary: [
      {
        term: "Describe",
        definition: "Give a detailed account of something.",
        l1_translation: "Huraikan",
        contexts: [
          { subject: "Science", sentence: "Describe what you observed during the experiment." },
          { subject: "Math", sentence: "Describe the pattern you see in the numbers." }
        ]
      },
      {
        term: "Express",
        definition: "Convey a thought or feeling in words or actions.",
        l1_translation: "Ungkapkan",
        contexts: [
          { subject: "Science", sentence: "Express your hypothesis as a clear statement." },
          { subject: "Math", sentence: "Express the answer as a fraction." }
        ]
      },
      {
        term: "Represent",
        definition: "Stand for or symbolize something.",
        l1_translation: "Mewakili",
        contexts: [
          { subject: "Science", sentence: "In this diagram, blue arrows represent water flow." },
          { subject: "Math", sentence: "Let x represent the unknown number." }
        ]
      },
      {
        term: "Indicate",
        definition: "Point out or show.",
        l1_translation: "Menunjukkan",
        contexts: [
          { subject: "Science", sentence: "The thermometer indicates that the temperature is rising." },
          { subject: "Math", sentence: "The graph indicates a positive correlation." }
        ]
      },
      {
        term: "Conclude",
        definition: "Arrive at a judgment based on reasoning.",
        l1_translation: "Membuat kesimpulan",
        contexts: [
          { subject: "Science", sentence: "What can you conclude from the evidence?" },
          { subject: "Math", sentence: "We can conclude that the pattern continues indefinitely." }
        ]
      },
      {
        term: "Infer",
        definition: "Deduce information from evidence and reasoning.",
        l1_translation: "Membuat inferens",
        contexts: [
          { subject: "Science", sentence: "From the fossils, we can infer what ancient animals ate." },
          { subject: "Math", sentence: "Infer the rule from these examples." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To write about in detail', parts: ['de', 'scribe'] },
          { definition: 'A written account', parts: ['de', 'script', 'ion'] },
          { definition: 'To write on something', parts: ['in', 'scribe'] },
          { definition: 'To write orders beforehand', parts: ['pre', 'scribe'] },
          { definition: 'Writing under; signing up', parts: ['sub', 'script', 'ion'] },
        ],
        allParts: ['scribe', 'script', 'de', 'in', 'pre', 'sub', 'ion', 'ive']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Describe', 'Explain', 'Express', 'Conceal'],
            oddOneOut: 'Conceal',
            reason: 'The others mean to communicate information, while "Conceal" means to hide it.'
          },
          {
            words: ['Infer', 'Deduce', 'Conclude', 'Guess'],
            oddOneOut: 'Guess',
            reason: 'The others involve reasoning from evidence, while "Guess" is without evidence.'
          },
          {
            words: ['Represent', 'Symbolize', 'Stand for', 'Ignore'],
            oddOneOut: 'Ignore',
            reason: 'The others mean to show or indicate something, while "Ignore" means to pay no attention.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Communicating Information", "Drawing Conclusions"],
        words: [
          { text: "Describe", category: "Communicating Information" },
          { text: "Express", category: "Communicating Information" },
          { text: "Infer", category: "Drawing Conclusions" },
          { text: "Conclude", category: "Drawing Conclusions" },
          { text: "Indicate", category: "Communicating Information" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["To 'describe' is to paint with words, just as to 'illustrate' is to paint with", "."],
        correctAnswer: "pictures",
        distractors: ["numbers", "silence", "darkness"]
      }
    ]
  },
  {
    week: 9,
    title: "Prefixes: Negation",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'vert/vers', meaning: 'turn' },
      prefixes: [
        { text: 'un-', meaning: 'not, opposite of' },
        { text: 'dis-', meaning: 'not, opposite of, away' },
        { text: 'in-', meaning: 'not' },
      ],
      suffixes: [
        { text: '-ible', partOfSpeech: 'Adjective' },
        { text: '-ed', partOfSpeech: 'Past tense' },
      ],
      examples: [
        { word: 'invert', parts: ['in', 'vert'], definition: 'To turn upside down or inside out.' },
        { word: 'invertebrate', parts: ['in', 'vert', 'ebr', 'ate'], definition: 'An animal without a backbone (not turned inward).' },
        { word: 'reverse', parts: ['re', 'verse'], definition: 'To turn back or opposite.' },
        { word: 'convert', parts: ['con', 'vert'], definition: 'To turn together; to change form.' },
        { word: 'divert', parts: ['di', 'vert'], definition: 'To turn away from a course.' },
      ]
    },
    vocabulary: [
      {
        term: "Unlike",
        definition: "Different from; not similar to.",
        l1_translation: "Tidak seperti",
        contexts: [
          { subject: "Science", sentence: "Unlike solids, liquids can flow freely." },
          { subject: "Math", sentence: "Unlike terms cannot be combined in addition." }
        ]
      },
      {
        term: "Disagree",
        definition: "Have a different opinion.",
        l1_translation: "Tidak bersetuju",
        contexts: [
          { subject: "Science", sentence: "Scientists may disagree about the interpretation of data." },
          { subject: "Math", sentence: "My answer disagrees with yours; let's check our work." }
        ]
      },
      {
        term: "Unequal",
        definition: "Not equal in quantity, size, or value.",
        l1_translation: "Tidak sama",
        contexts: [
          { subject: "Science", sentence: "The forces are unequal, so the object will move." },
          { subject: "Math", sentence: "These fractions are unequal: 1/2 ≠ 1/3." }
        ]
      },
      {
        term: "Disconnect",
        definition: "Break the connection of something.",
        l1_translation: "Putuskan sambungan",
        contexts: [
          { subject: "Science", sentence: "Disconnect the battery before changing the circuit." },
          { subject: "Math", sentence: "These data points seem disconnected from the pattern." }
        ]
      },
      {
        term: "Irregular",
        definition: "Not regular or consistent.",
        l1_translation: "Tidak teratur",
        contexts: [
          { subject: "Science", sentence: "The heartbeat became irregular during exercise." },
          { subject: "Math", sentence: "An irregular polygon has sides of different lengths." }
        ]
      },
      {
        term: "Invisible",
        definition: "Unable to be seen.",
        l1_translation: "Tidak kelihatan",
        contexts: [
          { subject: "Science", sentence: "Air is invisible but we know it exists." },
          { subject: "Math", sentence: "The pattern may be invisible until you organize the data." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To turn inside; flip', parts: ['in', 'vert'] },
          { definition: 'Animal without backbone', parts: ['in', 'vert', 'ebr', 'ate'] },
          { definition: 'To turn back', parts: ['re', 'verse'] },
          { definition: 'To turn away', parts: ['di', 'vert'] },
          { definition: 'To change form (turn with)', parts: ['con', 'vert'] },
        ],
        allParts: ['vert', 'verse', 'in', 're', 'di', 'con', 'ebr', 'ate']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Unlike', 'Different', 'Dissimilar', 'Identical'],
            oddOneOut: 'Identical',
            reason: 'The others mean not the same, while "Identical" means exactly the same.'
          },
          {
            words: ['Disagree', 'Dispute', 'Contest', 'Agree'],
            oddOneOut: 'Agree',
            reason: 'The others mean to have opposing views, while "Agree" means to have the same view.'
          },
          {
            words: ['Invisible', 'Hidden', 'Concealed', 'Visible'],
            oddOneOut: 'Visible',
            reason: 'The others mean cannot be seen, while "Visible" means can be seen.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Words With un-", "Words With dis-"],
        words: [
          { text: "Unlike", category: "Words With un-" },
          { text: "Unequal", category: "Words With un-" },
          { text: "Disagree", category: "Words With dis-" },
          { text: "Disconnect", category: "Words With dis-" },
          { text: "Unusual", category: "Words With un-" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["'Visible' is to 'invisible' as 'complete' is to", "."],
        correctAnswer: "incomplete",
        distractors: ["finished", "whole", "total"]
      }
    ]
  },
  {
    week: 10,
    title: "Prefixes: In/Re/Mis",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'duct/duc', meaning: 'lead, bring' },
      prefixes: [
        { text: 'in-/im-', meaning: 'not, into' },
        { text: 're-', meaning: 'again, back' },
        { text: 'mis-', meaning: 'wrong, badly' },
        { text: 'over-', meaning: 'too much' },
      ],
      suffixes: [
        { text: '-tion', partOfSpeech: 'Noun' },
        { text: '-ive', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'introduce', parts: ['intro', 'duce'], definition: 'To lead or bring in for the first time.' },
        { word: 'introduction', parts: ['intro', 'duct', 'ion'], definition: 'The act of bringing something in or presenting it.' },
        { word: 'reduce', parts: ['re', 'duce'], definition: 'To lead back; to make smaller.' },
        { word: 'produce', parts: ['pro', 'duce'], definition: 'To lead forward; to make or create.' },
        { word: 'productive', parts: ['pro', 'duct', 'ive'], definition: 'Leading to good results; efficient.' },
      ]
    },
    vocabulary: [
      {
        term: "Impossible",
        definition: "Not able to occur, exist, or be done.",
        l1_translation: "Mustahil",
        contexts: [
          { subject: "Science", sentence: "It is impossible for water to flow uphill without force." },
          { subject: "Math", sentence: "It's impossible to divide by zero." }
        ]
      },
      {
        term: "Rebuild",
        definition: "Build something again after it has been damaged.",
        l1_translation: "Membina semula",
        contexts: [
          { subject: "Science", sentence: "The coral reef will rebuild over many years." },
          { subject: "Math", sentence: "If you make a mistake, rebuild your equation from the start." }
        ]
      },
      {
        term: "Revise",
        definition: "Examine and improve or amend.",
        l1_translation: "Menyemak semula",
        contexts: [
          { subject: "Science", sentence: "Revise your hypothesis based on new evidence." },
          { subject: "Math", sentence: "Revise your calculations to check for errors." }
        ]
      },
      {
        term: "Mistrust",
        definition: "Lack of trust; suspicion.",
        l1_translation: "Tidak percaya",
        contexts: [
          { subject: "Science", sentence: "Mistrust of unverified data is important in research." },
          { subject: "Math", sentence: "You might mistrust a result that seems too perfect." }
        ]
      },
      {
        term: "Overreact",
        definition: "React more strongly than is necessary.",
        l1_translation: "Bertindak berlebihan",
        contexts: [
          { subject: "Science", sentence: "Don't overreact if your first experiment doesn't work." },
          { subject: "Math", sentence: "Students sometimes overreact to difficult problems." }
        ]
      },
      {
        term: "Incomplete",
        definition: "Not complete; lacking some parts.",
        l1_translation: "Tidak lengkap",
        contexts: [
          { subject: "Science", sentence: "Your lab report is incomplete without a conclusion." },
          { subject: "Math", sentence: "This number sentence is incomplete: 5 + ___ = 12." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To lead into; present for first time', parts: ['intro', 'duce'] },
          { definition: 'The act of presenting', parts: ['intro', 'duct', 'ion'] },
          { definition: 'To lead back; make smaller', parts: ['re', 'duce'] },
          { definition: 'To lead forward; create', parts: ['pro', 'duce'] },
          { definition: 'Creating good results', parts: ['pro', 'duct', 'ive'] },
        ],
        allParts: ['duce', 'duct', 'intro', 're', 'pro', 'ion', 'ive']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Rebuild', 'Reconstruct', 'Recreate', 'Destroy'],
            oddOneOut: 'Destroy',
            reason: 'The others mean to make again, while "Destroy" means to break completely.'
          },
          {
            words: ['Mistrust', 'Doubt', 'Question', 'Believe'],
            oddOneOut: 'Believe',
            reason: 'The others indicate lack of confidence, while "Believe" means to accept as true.'
          },
          {
            words: ['Impossible', 'Unfeasible', 'Unworkable', 'Possible'],
            oddOneOut: 'Possible',
            reason: 'The others mean cannot be done, while "Possible" means can be done.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Prefix re- (again)", "Prefix in-/im- (not)"],
        words: [
          { text: "Rebuild", category: "Prefix re- (again)" },
          { text: "Revise", category: "Prefix re- (again)" },
          { text: "Impossible", category: "Prefix in-/im- (not)" },
          { text: "Incomplete", category: "Prefix in-/im- (not)" },
          { text: "Rewrite", category: "Prefix re- (again)" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["'Complete' is to 'incomplete' as 'possible' is to", "."],
        correctAnswer: "impossible",
        distractors: ["probable", "likely", "certain"]
      }
    ]
  },
  {
    week: 11,
    title: "Suffixes: Changing Forms",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'ceive/cept', meaning: 'take, receive' },
      prefixes: [
        { text: 'per-', meaning: 'through, thoroughly' },
        { text: 'con-', meaning: 'with, together' },
        { text: 'de-', meaning: 'down, from' },
      ],
      suffixes: [
        { text: '-ion', partOfSpeech: 'Noun' },
        { text: '-ive', partOfSpeech: 'Adjective' },
        { text: '-able', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'perceive', parts: ['per', 'ceive'], definition: 'To become aware through the senses.' },
        { word: 'perception', parts: ['per', 'cept', 'ion'], definition: 'The ability to see or understand something.' },
        { word: 'perceptive', parts: ['per', 'cept', 'ive'], definition: 'Having good understanding or insight.' },
        { word: 'concept', parts: ['con', 'cept'], definition: 'An idea taken together in the mind.' },
        { word: 'deceptive', parts: ['de', 'cept', 'ive'], definition: 'Misleading; giving a false impression.' },
      ]
    },
    vocabulary: [
      {
        term: "Persuade",
        definition: "Cause someone to believe something through reasoning.",
        l1_translation: "Memujuk",
        contexts: [
          { subject: "Science", sentence: "Use evidence to persuade others of your conclusion." },
          { subject: "Math", sentence: "Can you persuade me that your method is correct?" }
        ]
      },
      {
        term: "Observation",
        definition: "The action of watching carefully or a remark based on what has been noticed.",
        l1_translation: "Pemerhatian",
        contexts: [
          { subject: "Science", sentence: "Record your observations in the science journal." },
          { subject: "Math", sentence: "My observation is that the pattern increases by 3 each time." }
        ]
      },
      {
        term: "Organization",
        definition: "The action of organizing or the way in which something is organized.",
        l1_translation: "Organisasi/Penyusunan",
        contexts: [
          { subject: "Science", sentence: "The organization of cells forms tissues and organs." },
          { subject: "Math", sentence: "Good organization of your work makes it easier to check." }
        ]
      },
      {
        term: "Predictable",
        definition: "Able to be predicted; behaving in an expected way.",
        l1_translation: "Boleh diramal",
        contexts: [
          { subject: "Science", sentence: "The motion of planets is predictable using math." },
          { subject: "Math", sentence: "This sequence is predictable: each term doubles the previous one." }
        ]
      },
      {
        term: "Acceptable",
        definition: "Satisfactory; able to be agreed upon.",
        l1_translation: "Boleh diterima",
        contexts: [
          { subject: "Science", sentence: "An acceptable hypothesis must be testable." },
          { subject: "Math", sentence: "Your rounding is acceptable for this estimation." }
        ]
      },
      {
        term: "Variable",
        definition: "Something that can change or vary; not consistent.",
        l1_translation: "Pembolehubah",
        contexts: [
          { subject: "Science", sentence: "Temperature is an important variable in this experiment." },
          { subject: "Math", sentence: "In the equation y = 2x, both x and y are variables." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To receive through the senses', parts: ['per', 'ceive'] },
          { definition: 'The act of receiving information', parts: ['per', 'cept', 'ion'] },
          { definition: 'Good at receiving information', parts: ['per', 'cept', 'ive'] },
          { definition: 'An idea received together', parts: ['con', 'cept'] },
          { definition: 'Able to be received', parts: ['re', 'ceive', 'able'] },
        ],
        allParts: ['ceive', 'cept', 'per', 'con', 'de', 're', 'ion', 'ive', 'able']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Observation', 'Notation', 'Perception', 'Action'],
            oddOneOut: 'Action',
            reason: 'The others are about noticing and recording, while "Action" is about doing.'
          },
          {
            words: ['Predictable', 'Variable', 'Acceptable', 'Comfortable'],
            oddOneOut: 'Comfortable',
            reason: 'The others are academic terms with -able, while "Comfortable" is about physical feeling.'
          },
          {
            words: ['Persuade', 'Convince', 'Influence', 'Confuse'],
            oddOneOut: 'Confuse',
            reason: 'The others are about making someone understand, while "Confuse" makes understanding harder.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Nouns (with -ion)", "Adjectives (with -able/-ive)"],
        words: [
          { text: "Observation", category: "Nouns (with -ion)" },
          { text: "Organization", category: "Nouns (with -ion)" },
          { text: "Predictable", category: "Adjectives (with -able/-ive)" },
          { text: "Acceptable", category: "Adjectives (with -able/-ive)" },
          { text: "Perception", category: "Nouns (with -ion)" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["Changing 'observe' to 'observation' is like changing 'perceive' to", "."],
        correctAnswer: "perception",
        distractors: ["perceptive", "perceiving", "perceiver"]
      }
    ]
  },
  {
    week: 12,
    title: "Root Mastery & Review",
    morphology: {
      type: 'MorphologyBuilder',
      root: { text: 'solve/solv', meaning: 'loosen, solve' },
      prefixes: [
        { text: 're-', meaning: 'again' },
        { text: 'dis-', meaning: 'apart' },
      ],
      suffixes: [
        { text: '-tion', partOfSpeech: 'Noun' },
        { text: '-able', partOfSpeech: 'Adjective' },
      ],
      examples: [
        { word: 'solve', parts: ['solve'], definition: 'To find an answer to a problem.' },
        { word: 'solution', parts: ['solut', 'ion'], definition: 'The answer to a problem.' },
        { word: 'resolve', parts: ['re', 'solve'], definition: 'To solve again or settle a problem.' },
        { word: 'dissolve', parts: ['dis', 'solve'], definition: 'To loosen apart; to break down in liquid.' },
        { word: 'solvable', parts: ['solv', 'able'], definition: 'Able to be solved.' },
      ]
    },
    vocabulary: [
      {
        term: "Solve",
        definition: "Find an answer to or explanation for a problem.",
        l1_translation: "Selesaikan",
        contexts: [
          { subject: "Science", sentence: "Scientists work to solve problems about climate change." },
          { subject: "Math", sentence: "Solve for x in the equation 2x + 5 = 13." }
        ]
      },
      {
        term: "Verify",
        definition: "Make sure or demonstrate that something is true or accurate.",
        l1_translation: "Sahkan",
        contexts: [
          { subject: "Science", sentence: "Repeat the experiment to verify your results." },
          { subject: "Math", sentence: "Verify your answer by substituting it back into the equation." }
        ]
      },
      {
        term: "Justify",
        definition: "Show or prove to be right or reasonable.",
        l1_translation: "Wajarkan",
        contexts: [
          { subject: "Science", sentence: "Justify your conclusion with evidence from the data." },
          { subject: "Math", sentence: "Justify each step in your solution." }
        ]
      },
      {
        term: "Evaluate",
        definition: "Assess the value, importance, or quality of something.",
        l1_translation: "Nilaikan",
        contexts: [
          { subject: "Science", sentence: "Evaluate the effectiveness of the different materials." },
          { subject: "Math", sentence: "Evaluate this expression: 3 × (4 + 2)." }
        ]
      },
      {
        term: "Construct",
        definition: "Build or form by putting parts together.",
        l1_translation: "Binakan",
        contexts: [
          { subject: "Science", sentence: "Construct a food web showing the relationships." },
          { subject: "Math", sentence: "Construct a triangle with sides of 3cm, 4cm, and 5cm." }
        ]
      },
      {
        term: "Formulate",
        definition: "Create or devise a plan, method, or system.",
        l1_translation: "Merumuskan",
        contexts: [
          { subject: "Science", sentence: "Formulate a hypothesis before you begin testing." },
          { subject: "Math", sentence: "Formulate an equation to represent this word problem." }
        ]
      },
    ],
    contextualActivities: [
      {
        type: 'WordConstruction',
        targets: [
          { definition: 'To find an answer', parts: ['solve'] },
          { definition: 'An answer to a problem', parts: ['solut', 'ion'] },
          { definition: 'To solve again or settle', parts: ['re', 'solve'] },
          { definition: 'To break apart in liquid', parts: ['dis', 'solve'] },
          { definition: 'Can be solved', parts: ['solv', 'able'] },
        ],
        allParts: ['solve', 'solv', 'solut', 're', 'dis', 'ion', 'able']
      },
      {
        type: 'OddOneOut',
        sets: [
          {
            words: ['Solve', 'Answer', 'Resolve', 'Question'],
            oddOneOut: 'Question',
            reason: 'The others are about finding answers, while "Question" is what you start with.'
          },
          {
            words: ['Verify', 'Confirm', 'Check', 'Assume'],
            oddOneOut: 'Assume',
            reason: 'The others mean to prove something is true, while "Assume" means to accept without proof.'
          },
          {
            words: ['Justify', 'Explain', 'Support', 'Ignore'],
            oddOneOut: 'Ignore',
            reason: 'The others involve giving reasons, while "Ignore" means to pay no attention.'
          },
        ]
      },
      {
        type: 'WordSort',
        categories: ["Academic Action Verbs", "Forms of Those Verbs"],
        words: [
          { text: "Solve", category: "Academic Action Verbs" },
          { text: "Solution", category: "Forms of Those Verbs" },
          { text: "Construct", category: "Academic Action Verbs" },
          { text: "Construction", category: "Forms of Those Verbs" },
          { text: "Verify", category: "Academic Action Verbs" },
        ]
      },
      {
        type: 'Analogy',
        sentence: ["To 'solve' a problem in math is like to 'resolve' a", "in science."],
        correctAnswer: "question",
        distractors: ["pencil", "classroom", "holiday"]
      }
    ]
  }
];