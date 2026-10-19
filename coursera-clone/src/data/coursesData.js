export const COURSERA_PARTNERS = [
  { id: 'stanford', name: 'Stanford University', logo: '🌲', color: '#8c1515' },
  { id: 'deeplearning', name: 'DeepLearning.AI', logo: '🧠', color: '#ff4f40' },
  { id: 'google', name: 'Google', logo: '🌐', color: '#4285f4' },
  { id: 'ibm', name: 'IBM', logo: '💻', color: '#0f62fe' },
  { id: 'michigan', name: 'University of Michigan', logo: '〽️', color: '#00274c' },
  { id: 'imperial', name: 'Imperial College London', logo: '🏛️', color: '#002147' },
];

export const COURSES_DATA = [
  {
    id: 'machine-learning-specialization',
    slug: 'machine-learning-specialization',
    title: 'Supervised Machine Learning: Regression and Classification',
    specialization: 'Machine Learning Specialization',
    partner: 'DeepLearning.AI & Stanford Online',
    partnerLogo: '🧠',
    partnerColor: '#ff4f40',
    instructor: {
      name: 'Andrew Ng',
      title: 'Founder, DeepLearning.AI | Adjunct Professor, Stanford University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      bio: 'Andrew Ng is Co-founder of Coursera, founder of DeepLearning.AI, and Adjunct Professor at Stanford University. He has taught AI to over 8 million learners worldwide.',
      coursesCount: 14,
      learnersCount: '8.4M',
    },
    rating: 4.9,
    reviewsCount: '194,312',
    level: 'Beginner',
    duration: 'Approx. 33 hours',
    enrolledCount: '1,420,800',
    category: 'Data Science & AI',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    description: 'In this course, you will build machine learning models in Python using popular machine-learning libraries NumPy and scikit-learn. Build and train supervised machine learning models for prediction and binary classification tasks, including linear regression and logistic regression.',
    whatYouWillLearn: [
      'Build machine learning models in Python using NumPy & scikit-learn',
      'Build & train supervised machine learning models for prediction & binary classification tasks',
      'Build linear regression models and understand cost function minimization',
      'Implement gradient descent optimization algorithm from scratch',
      'Apply best practices for machine learning development and feature scaling'
    ],
    skillsGained: ['Supervised Learning', 'Linear Regression', 'Logistic Regression', 'Gradient Descent', 'NumPy', 'Scikit-Learn', 'Cost Function'],
    modules: [
      {
        id: 'mod-1',
        week: 1,
        title: 'Introduction to Machine Learning & Linear Regression',
        description: 'Understand the difference between supervised and unsupervised learning, and build your first linear regression model with gradient descent.',
        estimatedHours: '3 hours',
        items: [
          {
            id: 'item-101',
            title: 'Welcome to Machine Learning',
            type: 'video',
            duration: '7 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: [
              { time: 0, text: 'Welcome to the Machine Learning Specialization!' },
              { time: 6, text: 'Machine learning is one of the most exciting and transformative technologies in the world today.' },
              { time: 14, text: 'From speech recognition in your phone to self-driving cars, AI is changing every industry.' },
              { time: 23, text: 'In this first week, we will explore the core distinction between supervised learning and unsupervised learning.' },
              { time: 35, text: 'Supervised learning algorithms learn to predict an output label given an input feature set.' },
              { time: 48, text: 'For example, predicting house prices given square footage is a canonical regression problem.' },
              { time: 60, text: 'Next, we will formulate the mathematical model for linear regression and our cost function, squared error loss.' },
              { time: 75, text: 'Let’s dive into our first algorithm: Gradient Descent!' }
            ],
            notesDefault: [
              { id: 'n1', timestamp: 14, noteText: 'Supervised learning: mapping X (features) to Y (target label).' },
              { id: 'n2', timestamp: 48, noteText: 'Regression predicts continuous numbers; classification predicts discrete categories.' }
            ]
          },
          {
            id: 'item-102',
            title: 'Applications of Machine Learning in Modern Industry',
            type: 'reading',
            duration: '10 min',
            content: `### Why Machine Learning Matters
Machine learning is powering modern products across:
1. **Automated Healthcare**: Computer vision detecting medical anomalies in radiographs earlier than traditional diagnostics.
2. **Natural Language Processing**: Large language models capable of code generation, language translation, and automated summarization.
3. **Autonomous Navigation**: Real-time perception and trajectory planning.

#### Terminology Review:
* **Training Set**: Data used to fit the model parameters.
* **$x$**: Input variable (feature).
* **$y$**: Output variable (target).
* **$m$**: Number of training examples.
* **$(x^{(i)}, y^{(i)})$**: Single training example at index $i$.`
          },
          {
            id: 'item-103',
            title: 'Practice Quiz: Supervised vs Unsupervised Learning',
            type: 'quiz',
            duration: '15 min',
            passingScore: 80,
            questions: [
              {
                id: 'q1',
                question: 'Which of the following is an example of a supervised learning regression problem?',
                options: [
                  'Grouping news articles into clusters by topic without labels',
                  'Predicting the sale price of a used car given its mileage and year',
                  'Detecting anomalous credit card transactions with no prior fraud flags',
                  'Sorting customer emails into spam vs non-spam categories'
                ],
                correctAnswer: 1,
                explanation: 'Predicting car sale price is a regression task because the target variable (price) is a continuous numerical value.'
              },
              {
                id: 'q2',
                question: 'What is the role of the Cost Function $J(w, b)$ in linear regression?',
                options: [
                  'To speed up the Python code execution',
                  'To measure how well parameters $w$ and $b$ fit the training data by calculating difference between predictions and actual values',
                  'To automatically normalize the data',
                  'To determine the learning rate $\\alpha$'
                ],
                correctAnswer: 1,
                explanation: 'The cost function calculates the mean squared error between model predictions $\\hat{y}$ and actual labels $y$.'
              },
              {
                id: 'q3',
                question: 'If the learning rate $\\alpha$ in gradient descent is too large, what happens?',
                options: [
                  'The algorithm is guaranteed to converge instantly',
                  'Gradient descent may overshoot the minimum and fail to converge or even diverge',
                  'The cost function will remain exactly zero',
                  'The weights $w$ and bias $b$ will become negative'
                ],
                correctAnswer: 1,
                explanation: 'A learning rate that is too large causes gradient descent to take oversized steps, oscillating and diverging away from the global minimum.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        week: 2,
        title: 'Regression with Multiple Input Variables',
        description: 'Extend linear regression to handle multiple features using vectorization, feature scaling, and polynomial regression.',
        estimatedHours: '4 hours',
        items: [
          {
            id: 'item-201',
            title: 'Multiple Linear Regression & Vectorization with NumPy',
            type: 'video',
            duration: '12 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: [
              { time: 0, text: 'Now let’s look at linear regression with multiple features.' },
              { time: 10, text: 'Instead of just predicting house price using size, we might also use bedrooms, floors, and age.' },
              { time: 22, text: 'We represent our features as vector x and parameter weights as vector w.' },
              { time: 35, text: 'Vectorization allows us to use matrix dot products in NumPy, running hundreds of times faster.' },
              { time: 55, text: 'Next, we discuss Feature Scaling: why normalizing features between -1 and +1 speeds up gradient descent.' }
            ],
            notesDefault: []
          },
          {
            id: 'item-202',
            title: 'Feature Scaling and Mean Normalization Guide',
            type: 'reading',
            duration: '12 min',
            content: `### Feature Scaling Techniques
When features have vastly different numerical ranges (e.g. $x_1$ = size in sqft: 500-4000, while $x_2$ = bedrooms: 1-5), the contours of the cost function become highly elongated ellipses.

Gradient descent oscillates back and forth and takes much longer to find the minimum.

#### Methods:
1. **Min-Max Normalization**:
   $$x_{norm} = \\frac{x - x_{min}}{x_{max} - x_{min}}$$
2. **Z-Score Standardization**:
   $$x_{scaled} = \\frac{x - \\mu}{\\sigma}$$`
          },
          {
            id: 'item-203',
            title: 'Practice Quiz: Vectorization & Feature Scaling',
            type: 'quiz',
            duration: '15 min',
            passingScore: 80,
            questions: [
              {
                id: 'vq1',
                question: 'Why is vectorization preferred over explicit Python "for" loops for matrix math?',
                options: [
                  'It uses parallel hardware instructions (SIMD) and C optimized backends for vastly superior speed',
                  'Python syntax does not support "for" loops for arrays',
                  'It decreases memory usage to exactly 0 bytes',
                  'It automatically trains neural networks'
                ],
                correctAnswer: 0,
                explanation: 'NumPy vectorized routines leverage SIMD CPU extensions and optimized BLAS libraries, executing operations in parallel.'
              },
              {
                id: 'vq2',
                question: 'True or False: Performing feature scaling changes the optimal parameter predictions $\\hat{y}$?',
                options: [
                  'True: It changes the model completely',
                  'False: It only speeds up the convergence of gradient descent, the final prediction quality is identical'
                ],
                correctAnswer: 1,
                explanation: 'Feature scaling reshapes the gradient search space into circular contours so gradient descent converges directly to the minimum.'
              }
            ]
          }
        ]
      }
    ],
    discussions: [
      {
        id: 'disc-1',
        author: 'Elena Rostova',
        timeAgo: '2 hours ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        title: 'How do I choose the initial learning rate alpha?',
        body: 'When tuning gradient descent, Andrew mentioned plotting J(w,b) against the number of iterations. How do I know if alpha is too small versus too large?',
        upvotes: 24,
        repliesCount: 3,
        answers: [
          {
            author: 'David Chen (Teaching Assistant)',
            timeAgo: '1 hour ago',
            body: 'Great question! Try plotting learning curves with values: 0.001, 0.003, 0.01, 0.03, 0.1. If J increases or oscillates, alpha is too large. If J decreases too slowly, alpha is too small.',
            isInstructor: true
          }
        ]
      },
      {
        id: 'disc-2',
        author: 'Marcus Vance',
        timeAgo: '1 day ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        title: 'NumPy vectorization vs pure Python speed benchmark',
        body: 'I tested a 100,000 element dot product. Pure python took ~14ms, whereas np.dot took 0.04ms! That is over 300x faster!',
        upvotes: 56,
        repliesCount: 5,
        answers: []
      }
    ]
  },
  {
    id: 'google-data-analytics',
    slug: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    specialization: 'Google Career Certificates',
    partner: 'Google',
    partnerLogo: '🌐',
    partnerColor: '#4285f4',
    instructor: {
      name: 'Google Career Certificates Staff',
      title: 'Top Google Data Analysts & Educators',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      bio: 'Taught by experienced Google professionals with decades of hands-on data analysis, SQL, R programming, and Tableau visualization expertise.',
      coursesCount: 8,
      learnersCount: '2.1M'
    },
    rating: 4.8,
    reviewsCount: '138,200',
    level: 'Beginner',
    duration: 'Approx. 6 months at 10 hrs/week',
    enrolledCount: '1,950,000',
    category: 'Data Science & AI',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    description: 'Prepare for a new career in the high-growth field of data analytics, with no experience required. Get professional training designed by Google and have the opportunity to connect with top employers.',
    whatYouWillLearn: [
      'Gain an immersive understanding of the practices and processes used by junior data analysts',
      'Learn key analytical skills: data cleaning, analysis, & visualization',
      'Master tools: Spreadsheets, SQL, Tableau, and R programming',
      'Complete a hands-on capstone project you can share with potential employers'
    ],
    skillsGained: ['Data Analysis', 'SQL Queries', 'Tableau Dashboards', 'R Programming', 'Spreadsheets', 'Data Cleansing'],
    modules: [
      {
        id: 'g-mod-1',
        week: 1,
        title: 'Foundations: Data, Data, Everywhere',
        description: 'Explore the role of data analytics, the data life cycle, and career paths for data analysts.',
        estimatedHours: '4 hours',
        items: [
          {
            id: 'g-item-1',
            title: 'Welcome to Google Data Analytics',
            type: 'video',
            duration: '5 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            transcript: [
              { time: 0, text: 'Hello and welcome! My name is Tony, and I’m a data analyst at Google.' },
              { time: 8, text: 'In this program, you will learn the exact workflows Google analysts use every day.' },
              { time: 18, text: 'We will work with real datasets, use SQL to query databases, and visualize findings in Tableau.' }
            ],
            notesDefault: []
          },
          {
            id: 'g-item-2',
            title: 'Practice Assessment: The Data Analysis Process',
            type: 'quiz',
            duration: '10 min',
            passingScore: 80,
            questions: [
              {
                id: 'gq1',
                question: 'What are the six phases of the data analysis process emphasized by Google?',
                options: [
                  'Ask, Prepare, Process, Analyze, Share, Act',
                  'Guess, Code, Clean, Deploy, Delete, Review',
                  'Input, Compute, Output, Save, Email, Print',
                  'Hypothesize, Experiment, Test, Reject, Publish, Archive'
                ],
                correctAnswer: 0,
                explanation: 'Ask, Prepare, Process, Analyze, Share, and Act represent the foundational Google data analysis lifecycle.'
              }
            ]
          }
        ]
      }
    ],
    discussions: []
  },
  {
    id: 'stanford-algorithms',
    slug: 'stanford-algorithms',
    title: 'Algorithms: Design and Analysis',
    specialization: 'Computer Science Fundamentals',
    partner: 'Stanford University',
    partnerLogo: '🌲',
    partnerColor: '#8c1515',
    instructor: {
      name: 'Tim Roughgarden',
      title: 'Professor of Computer Science, Columbia & Stanford',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      bio: 'Renowned computer science educator and author of the Algorithms Illuminated book series.',
      coursesCount: 5,
      learnersCount: '920K'
    },
    rating: 4.9,
    reviewsCount: '89,450',
    level: 'Intermediate',
    duration: 'Approx. 40 hours',
    enrolledCount: '640,000',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c6600c8?auto=format&fit=crop&q=80&w=600',
    description: 'Learn the fundamentals of algorithm design and analysis. Asymptotic analysis, divide-and-conquer, Master Theorem, randomized algorithms, Quicksort, and graph primitives.',
    whatYouWillLearn: [
      'Master asymptotic notation (Big-O, Big-Omega, Big-Theta)',
      'Divide-and-conquer algorithms including Merge Sort and counting inversions',
      'The Master Method for solving recurrence relations',
      'Graph search (BFS/DFS), topological sort, and strongly connected components'
    ],
    skillsGained: ['Algorithms', 'Big-O Analysis', 'Divide and Conquer', 'Dynamic Programming', 'Graph Theory'],
    modules: [
      {
        id: 's-mod-1',
        week: 1,
        title: 'Asymptotic Analysis & Divide and Conquer',
        description: 'MergeSort, Big-Oh notation, and asymptotic bounds.',
        estimatedHours: '5 hours',
        items: [
          {
            id: 's-item-1',
            title: 'Divide and Conquer: Merge Sort',
            type: 'video',
            duration: '9 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            transcript: [
              { time: 0, text: 'Welcome to Algorithms! Today we study Divide and Conquer with MergeSort.' },
              { time: 10, text: 'MergeSort breaks the array in half, recursively sorts both halves, and merges them in linear time O(n).' },
              { time: 24, text: 'Overall running time is O(n log n), which beats insertion sort’s O(n^2).' }
            ],
            notesDefault: []
          }
        ]
      }
    ],
    discussions: []
  },
  {
    id: 'ibm-full-stack',
    slug: 'ibm-full-stack',
    title: 'IBM Full Stack Software Developer Certificate',
    specialization: 'IBM Career Certification',
    partner: 'IBM',
    partnerLogo: '💻',
    partnerColor: '#0f62fe',
    instructor: {
      name: 'IBM Skills Network',
      title: 'Senior Cloud Architects & Software Engineers',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      bio: 'Curated by senior full-stack developers and cloud architects at IBM.',
      coursesCount: 12,
      learnersCount: '1.4M'
    },
    rating: 4.7,
    reviewsCount: '62,110',
    level: 'Beginner to Intermediate',
    duration: 'Approx. 4 months at 10 hrs/week',
    enrolledCount: '580,000',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    description: 'Kickstart your career as a software engineer. Learn front-end, back-end, and cloud native technologies including HTML, CSS, JavaScript, React, Node.js, Python, Django, Containers, and DevOps.',
    whatYouWillLearn: [
      'Build dynamic user interfaces using React, JavaScript (ES6+), and modern CSS',
      'Create scalable back-end REST APIs with Node.js, Express, and Python Django',
      'Deploy applications using Docker, Kubernetes, and Serverless on Cloud',
      'Collaborate using Git, GitHub, and agile CI/CD pipelines'
    ],
    skillsGained: ['React', 'Node.js', 'Express', 'Python', 'Docker', 'Cloud Native', 'Git'],
    modules: [],
    discussions: []
  },
  {
    id: 'michigan-python',
    slug: 'michigan-python',
    title: 'Python for Everybody Specialization',
    specialization: 'University of Michigan Specialization',
    partner: 'University of Michigan',
    partnerLogo: '〽️',
    partnerColor: '#00274c',
    instructor: {
      name: 'Charles Severance (Dr. Chuck)',
      title: 'Clinical Professor, University of Michigan School of Information',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bio: 'Dr. Chuck has taught millions of learners how to program from scratch with passion and humor.',
      coursesCount: 9,
      learnersCount: '4.8M'
    },
    rating: 4.9,
    reviewsCount: '280,410',
    level: 'Beginner',
    duration: 'Approx. 3 months at 8 hrs/week',
    enrolledCount: '3,200,000',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600',
    description: 'Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data using Python data structures, web scrapers, and SQLite databases.',
    whatYouWillLearn: [
      'Install Python, write your first script, and understand variables and conditionals',
      'Use core data structures: lists, dictionaries, tuples for complex data processing',
      'Scrape web pages using BeautifulSoup and extract structured JSON/XML APIs',
      'Store and query data using relational SQLite databases'
    ],
    skillsGained: ['Python 3', 'Data Structures', 'Web Scraping', 'SQL & SQLite', 'APIs'],
    modules: [],
    discussions: []
  }
];

export const INITIAL_USER_STATE = {
  name: 'Learner',
  email: 'learner@coursera.org',
  streakDays: 4,
  enrolledCourseIds: ['machine-learning-specialization'],
  completedItemIds: ['item-101'],
  quizScores: { 'item-103': 100 },
  weeklyGoalHours: 3.5,
  completedGoalHours: 2.1,
  certificates: [
    {
      courseId: 'machine-learning-specialization',
      issueDate: 'October 2026',
      verificationHash: 'COURSERA-VERIFIED-9B8A72',
      grade: '98.5%'
    }
  ]
};
