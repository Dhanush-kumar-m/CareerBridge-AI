const companies = [
  {
    slug: "google",
    name: "Google",
    logo: "🔍",
    category: "Product-Based",
    package: "15 - 60 LPA",
    role: "Software Engineering Intern / SDE I",
    description: "Prepare for high-level Data Structures, Algorithms, System Design basics, and Googliness rounds.",
    readiness: 72,
    overview: {
      industry: "Technology / Internet",
      headquarters: "Mountain View, California, USA",
      founded: "1998",
      founder: "Larry Page, Sergey Brin",
      ceo: "Sundar Pichai",
      employees: "190,000+",
      marketValue: "$2.1 Trillion",
      description: "Google's mission is to organize the world's information and make it universally accessible and useful. It is one of the Big Five American information technology companies.",
      website: "https://google.com",
      careersUrl: "https://careers.google.com"
    },
    eligibility: {
      branches: ["CSE", "IT", "ECE", "EEE"],
      cgpa: "7.5",
      backlogs: "0",
      gradYear: "2026 / 2027",
      bond: "None",
      agreement: "None",
      location: "Bangalore, Hyderabad, Pune",
      mode: "Hybrid"
    },
    salary: {
      stipend: "₹1,00,000 / Month",
      ctc: "₹35 - ₹60 Lakhs / Annum",
      base: "₹18 - ₹22 Lakhs",
      bonus: "₹2.5 Lakhs / Annum",
      joiningBonus: "₹3 Lakhs",
      stocks: "₹15 - ₹25 Lakhs (RSUs over 4 years)",
      benefits: "Free meals, premium health insurance, transport allowance, education reimbursement"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Online Assessment (OA)", topics: ["Data Structures", "Algorithms", "Graph / Tree Problems", "Time Complexity Checks"] },
        { roundNum: 2, title: "Technical Interview I", topics: ["Array manipulation", "Two-pointer strategy", "Sliding window", "Complexity Analysis"] },
        { roundNum: 3, title: "Technical Interview II", topics: ["Dynamic Programming", "Graph traversals (BFS/DFS)", "Design Pattern basics"] },
        { roundNum: 4, title: "Managerial / Googliness Round", topics: ["Behavioral questions", "Conflict resolution", "Cultural fitment", "Leadership principles"] },
        { roundNum: 5, title: "HR Interview", topics: ["Self Introduction", "Strengths / Weaknesses", "Location preferences", "Salary structure discussion"] }
      ]
    },
    stats: {
      avgPackage: "₹30.5 LPA",
      highestPackage: "₹60 LPA",
      selectionRate: "1.2%",
      difficulty: "Hard",
      codingDifficulty: "Hard",
      aptitude: 200,
      coding: 350,
      interview: 120
    },
    roadmap: [
      { days: "Day 1–7", topic: "Aptitude Basics, Bit Manipulation, String Parsing" },
      { days: "Day 8–15", topic: "Advanced DSA (Trees, Tries, Heaps, Graph traversals)" },
      { days: "Day 16–22", topic: "Dynamic Programming, Sliding Window, Greedy algorithms" },
      { days: "Day 23–26", topic: "Google Mock Assessments & Previous Years' Google coding sheets" },
      { days: "Day 27–30", topic: "Googliness situational mock interviews and final revision" }
    ]
  },
  {
    slug: "amazon",
    name: "Amazon",
    logo: "📦",
    category: "Product-Based",
    package: "12 - 45 LPA",
    role: "SDE I / SDE Intern",
    description: "Emphasis on Data Structures, Object Oriented Design, and Amazon's 16 Leadership Principles.",
    readiness: 64,
    overview: {
      industry: "E-Commerce / Cloud Computing",
      headquarters: "Seattle, Washington, USA",
      founded: "1994",
      founder: "Jeff Bezos",
      ceo: "Andy Jassy",
      employees: "1,500,000+",
      marketValue: "$1.9 Trillion",
      description: "Amazon focuses on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence. It is renowned for its customer-obsession philosophy.",
      website: "https://amazon.jobs",
      careersUrl: "https://amazon.jobs/en/teams/university-recruiting"
    },
    eligibility: {
      branches: ["CSE", "IT", "ECE", "EEE", "Mech", "Civil"],
      cgpa: "7.0",
      backlogs: "0",
      gradYear: "2026 / 2027",
      bond: "None",
      agreement: "None",
      location: "Bangalore, Hyderabad, Chennai, Delhi NCR",
      mode: "Hybrid / In-Office"
    },
    salary: {
      stipend: "₹80,000 / Month",
      ctc: "₹28 - ₹45 Lakhs / Annum",
      base: "₹15 - ₹18 Lakhs",
      bonus: "₹3.5 Lakhs (First Year)",
      joiningBonus: "₹2.5 Lakhs (Second Year)",
      stocks: "₹10 - ₹15 Lakhs (RSUs over 4 years)",
      benefits: "Comprehensive medical cover, internet subsidy, free transport shuttles, employee discounts"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Online Assessment (OA)", topics: ["Debugging", "Coding (2 Questions)", "Work Style Assessment", "Reasoning"] },
        { roundNum: 2, title: "Technical Interview I (DSA)", topics: ["Trees / Graphs", "Hash Maps usage", "Amazon Leadership Principles"] },
        { roundNum: 3, title: "Technical Interview II (System Design)", topics: ["OOD (Object Oriented Design)", "Cache basics", "Leadership check"] },
        { roundNum: 4, title: "Bar Raiser Interview", topics: ["Optimized Problem Solving", "Deep dive into Leadership Principles"] },
        { roundNum: 5, title: "HR Interview", topics: ["Relocation", "Stipend detail review", "Career objectives"] }
      ]
    },
    stats: {
      avgPackage: "₹22.5 LPA",
      highestPackage: "₹45 LPA",
      selectionRate: "2.5%",
      difficulty: "Hard",
      codingDifficulty: "Hard",
      aptitude: 220,
      coding: 320,
      interview: 100
    },
    roadmap: [
      { days: "Day 1–7", topic: "OOD Principles, Basic Arrays and List operations" },
      { days: "Day 8–15", topic: "Trees, Graph traversals, Hash tables" },
      { days: "Day 16–22", topic: "Recursion, Backtracking, and Greedy choice methods" },
      { days: "Day 23–26", topic: "Leadership principles interview training and OA simulations" },
      { days: "Day 27–30", topic: "Final review of past Amazon interview experiences" }
    ]
  },
  {
    slug: "tcs",
    name: "TCS",
    logo: "🏢",
    category: "Service-Based",
    package: "3.5 - 9 LPA",
    role: "Ninja / Digital / Prime Developer",
    description: "Focus on aptitude, logical reasoning, verbal ability, and programming foundations (C, C++, Java).",
    readiness: 85,
    overview: {
      industry: "IT Services / Consulting",
      headquarters: "Mumbai, Maharashtra, India",
      founded: "1968",
      founder: "Tata Group",
      ceo: "K. Krithivasan",
      employees: "600,000+",
      marketValue: "$160 Billion",
      description: "Tata Consultancy Services (TCS) is an Indian multinational information technology service and consulting company operating in 150 locations across 46 countries.",
      website: "https://tcs.com",
      careersUrl: "https://nextstep.tcs.com"
    },
    eligibility: {
      branches: ["All Branches", "CSE", "IT", "ECE", "EEE", "Mech", "Civil"],
      cgpa: "6.0",
      backlogs: "Max 1 active backlog",
      gradYear: "2026",
      bond: "1 Year Service Agreement",
      agreement: "₹50,000 penalty on early termination",
      location: "PAN India (Mumbai, Chennai, Bangalore, Pune, Kolkata)",
      mode: "In-Office"
    },
    salary: {
      stipend: "₹15,000 / Month",
      ctc: "₹3.36 (Ninja) / ₹7.0 (Digital) / ₹9.0 (Prime) LPA",
      base: "₹3.3 - ₹8.2 Lakhs",
      bonus: "Performance linked quarterly allowances",
      joiningBonus: "None",
      stocks: "None",
      benefits: "Health insurance, gratuity, Tata Group brand employee discounts"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "TCS NQT Online Exam", topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Basic Coding (2 tasks)"] },
        { roundNum: 2, title: "Technical Interview", topics: ["OOP Concepts", "DBMS & SQL queries", "Core programming theory", "Final Year Projects"] },
        { roundNum: 3, title: "Managerial Interview", topics: ["Problem-solving puzzles", "Team management scenarios", "Flexibility and shift works"] },
        { roundNum: 4, title: "HR Interview", topics: ["Document Verification", "Willingness to relocate", "Service agreement consent"] }
      ]
    },
    stats: {
      avgPackage: "₹4.5 LPA",
      highestPackage: "₹9.0 LPA",
      selectionRate: "15.0%",
      difficulty: "Medium",
      codingDifficulty: "Easy-Medium",
      aptitude: 250,
      coding: 150,
      interview: 80
    },
    roadmap: [
      { days: "Day 1–7", topic: "Quantitative Aptitude (Percentages, Numbers, Ratios)" },
      { days: "Day 8–15", topic: "Logical Reasoning puzzles and Verbal structure rules" },
      { days: "Day 16–22", topic: "Basic C/C++/Java loops, OOPs concepts, SQL Joins" },
      { days: "Day 23–26", topic: "TCS NQT Mock Tests and previous years' question sheets" },
      { days: "Day 27–30", topic: "Mock Technical & HR interview drills" }
    ]
  },
  {
    slug: "infosys",
    name: "Infosys",
    logo: "💻",
    category: "Service-Based",
    package: "3.6 - 9.5 LPA",
    role: "System Engineer / Specialist Programmer",
    description: "Emphasis on logical reasoning, analytical skills, code verification, and project descriptions.",
    readiness: 78,
    overview: {
      industry: "IT Services / Consulting",
      headquarters: "Bangalore, Karnataka, India",
      founded: "1981",
      founder: "N. R. Narayana Murthy",
      ceo: "Salil Parekh",
      employees: "320,000+",
      marketValue: "$75 Billion",
      description: "Infosys is a global leader in next-generation digital services and consulting. It enables clients in 56 countries to navigate their digital transformation.",
      website: "https://infosys.com",
      careersUrl: "https://career.infosys.com"
    },
    eligibility: {
      branches: ["CSE", "IT", "ECE", "EEE", "EIE", "Maths & Computing"],
      cgpa: "6.0",
      backlogs: "0 active backlogs",
      gradYear: "2026",
      bond: "1 Year Service Agreement",
      agreement: "₹1,00,000 training recovery cost",
      location: "Bangalore, Mysore, Hyderabad, Pune, Chennai",
      mode: "In-Office / Hybrid"
    },
    salary: {
      stipend: "₹20,000 / Month",
      ctc: "₹3.6 (SE) / ₹6.2 (SES) / ₹9.5 (SP) LPA",
      base: "₹3.4 - ₹8.7 Lakhs",
      bonus: "Yearly performance incentive",
      joiningBonus: "None",
      stocks: "None",
      benefits: "Free training at Infosys Mysore campus, medical insurance, transport coverage"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Infosys Online Exam", topics: ["Mathematical Ability", "Logical Reasoning", "Verbal English", "Pseudocodes parsing", "Puzzle Solving"] },
        { roundNum: 2, title: "Technical Interview", topics: ["Data Structures basics", "OOP principles", "SQL queries", "Project walk-through"] },
        { roundNum: 3, title: "HR Interview", topics: ["Hobbies and achievements", "Relocation flexibility", "Communication skills verification"] }
      ]
    },
    stats: {
      avgPackage: "₹5.2 LPA",
      highestPackage: "₹9.5 LPA",
      selectionRate: "12.0%",
      difficulty: "Medium",
      codingDifficulty: "Medium",
      aptitude: 220,
      coding: 120,
      interview: 70
    },
    roadmap: [
      { days: "Day 1–7", topic: "Mathematical reasoning, basic algebra, number series" },
      { days: "Day 8–15", topic: "Pseudocodes walkthroughs and logical deduction skills" },
      { days: "Day 16–22", topic: "Basic DBMS commands, Operating System memory models" },
      { days: "Day 23–26", topic: "Infosys Mock Exams and previous NQT question lists" },
      { days: "Day 27–30", topic: "Self-introduction structure and resume optimization" }
    ]
  },
  {
    slug: "swiggy",
    name: "Swiggy",
    logo: "🛵",
    category: "Startup",
    package: "10 - 28 LPA",
    role: "Associate Software Engineer / SDE I",
    description: "Rapid growth startup. Focus on scalable backend services, API designs, and multithreading.",
    readiness: 56,
    overview: {
      industry: "On-demand Delivery / Logistics",
      headquarters: "Bangalore, Karnataka, India",
      founded: "2014",
      founder: "Sriharsha Majety, Nandan Reddy, Rahul Jaimini",
      ceo: "Sriharsha Majety",
      employees: "6,000+",
      marketValue: "$10 Billion",
      description: "Swiggy is India's leading on-demand convenience platform, offering food delivery, grocery delivery (Instamart), dining out options, and concierge services.",
      website: "https://swiggy.com",
      careersUrl: "https://careers.swiggy.com"
    },
    eligibility: {
      branches: ["CSE", "IT", "ECE"],
      cgpa: "7.0",
      backlogs: "0",
      gradYear: "2026",
      bond: "None",
      agreement: "None",
      location: "Bangalore (Remote options available)",
      mode: "Remote / Hybrid"
    },
    salary: {
      stipend: "₹50,000 / Month",
      ctc: "₹12 - ₹28 Lakhs / Annum",
      base: "₹10 - ₹18 Lakhs",
      bonus: "Performance bonuses up to 10% base",
      joiningBonus: "₹1.5 Lakhs",
      stocks: "₹4 - ₹8 Lakhs (ESOPs)",
      benefits: "Remote setup allowance, dynamic fitness allowances, free Instamart deliveries"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Online Hackathon / Coding OA", topics: ["Data Structures", "Algorithms", "Concurrency / Queue systems"] },
        { roundNum: 2, title: "Technical Interview I (DSA)", topics: ["Dynamic programming", "Sorting optimization", "Array pointer bounds"] },
        { roundNum: 3, title: "Technical Interview II (System Design)", topics: ["API design", "Database indexing", "Caching algorithms (LRU)"] },
        { roundNum: 4, title: "Bar Raiser Interview", topics: ["Startup cultural fit", "Problem solving agility", "Past project details"] },
        { roundNum: 5, title: "HR Interview", topics: ["Expectation alignment", "CTC configuration discussions"] }
      ]
    },
    stats: {
      avgPackage: "₹16.5 LPA",
      highestPackage: "₹28 LPA",
      selectionRate: "3.5%",
      difficulty: "Hard",
      codingDifficulty: "Hard",
      aptitude: 180,
      coding: 280,
      interview: 95
    },
    roadmap: [
      { days: "Day 1–7", topic: "Array indexing, Hash Table operations, Sorting APIs" },
      { days: "Day 8–15", topic: "System queues, Concurrency locks, and Threading loops" },
      { days: "Day 16–22", topic: "API endpoints construction and database design basics" },
      { days: "Day 23–26", topic: "Swiggy mock hackathons and past selection paper drills" },
      { days: "Day 27–30", topic: "Mock system design discussions and final HR preparation" }
    ]
  },
  {
    slug: "jpmorgan-chase",
    name: "JPMorgan Chase",
    logo: "📊",
    category: "Banking & Finance",
    package: "14 - 22 LPA",
    role: "Software Engineer Program (SEP)",
    description: "Financial titan. Focus on Java fundamentals, Spring Boot, microservices, and database query tuning.",
    readiness: 68,
    overview: {
      industry: "Investment Banking / Financial Services",
      headquarters: "New York City, New York, USA",
      founded: "2000 (Roots to 1799)",
      founder: "J.P. Morgan, John Thompson",
      ceo: "Jamie Dimon",
      employees: "300,000+",
      marketValue: "$560 Billion",
      description: "JPMorgan Chase & Co. is an American multinational finance institution. It is the largest bank in the United States and the world's largest bank by market capitalization.",
      website: "https://jpmorganchase.com",
      careersUrl: "https://careers.jpmorgan.com"
    },
    eligibility: {
      branches: ["CSE", "IT", "ECE", "EEE", "Maths & Computing"],
      cgpa: "7.0",
      backlogs: "0 active backlogs",
      gradYear: "2026",
      bond: "None",
      agreement: "None",
      location: "Bangalore, Hyderabad, Mumbai",
      mode: "Hybrid (3 days in office)"
    },
    salary: {
      stipend: "₹75,000 / Month",
      ctc: "₹14.75 - ₹22 Lakhs / Annum",
      base: "₹12 - ₹15 Lakhs",
      bonus: "₹1.5 Lakhs variable bonus",
      joiningBonus: "₹1.0 Lakhs",
      stocks: "None (for freshers)",
      benefits: "Excellent health and life coverage, retirement match schemes, transport cabs"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "CodeForGood Hackathon", topics: ["Social Good coding task", "Teamwork", "Clean code", "Presentation skills"] },
        { roundNum: 2, title: "Technical Interview", topics: ["OOP principles in Java/Python", "SQL transactions & normalization", "Data structures (Queues, Stacks)"] },
        { roundNum: 3, title: "Behavioral & HR Round", topics: ["Puzzles", "Collaboration history", "Conflict handling", "Finance sector interest"] }
      ]
    },
    stats: {
      avgPackage: "₹17.0 LPA",
      highestPackage: "₹22 LPA",
      selectionRate: "4.5%",
      difficulty: "Medium-Hard",
      codingDifficulty: "Medium",
      aptitude: 200,
      coding: 220,
      interview: 85
    },
    roadmap: [
      { days: "Day 1–7", topic: "Java core concepts, collections framework, and SQL queries" },
      { days: "Day 8–15", topic: "Standard DSA (HashMaps, LinkedLists, Binary Search)" },
      { days: "Day 16–22", topic: "Database normalization, indexing, transaction states" },
      { days: "Day 23–26", topic: "JPMorgan CodeForGood Hackathon prep and past code review" },
      { days: "Day 27–30", topic: "Behavioral framework response drafting (STAR method)" }
    ]
  },
  {
    slug: "deloitte",
    name: "Deloitte",
    logo: "🟢",
    category: "Consulting Companies",
    package: "4.5 - 12 LPA",
    role: "Analyst / Consultant",
    description: "Big Four firm. Preparation focuses on logical reasoning, SQL database commands, and case studies.",
    readiness: 81,
    overview: {
      industry: "Professional Services / Consulting",
      headquarters: "London, United Kingdom",
      founded: "1845",
      founder: "William Welch Deloitte",
      ceo: "Joe Ucuzoglu",
      employees: "450,000+",
      marketValue: "$85 Billion (Revenue)",
      description: "Deloitte is a leading global provider of audit, assurance, consulting, financial advisory, risk advisory, and tax services.",
      website: "https://deloitte.com",
      careersUrl: "https://www2.deloitte.com/us/en/careers"
    },
    eligibility: {
      branches: ["All Branches", "CSE", "IT", "ECE", "EEE", "Mech", "Civil"],
      cgpa: "6.5",
      backlogs: "0 active backlogs",
      gradYear: "2026",
      bond: "None",
      agreement: "None",
      location: "Hyderabad, Bangalore, Mumbai, Gurgaon",
      mode: "Hybrid"
    },
    salary: {
      stipend: "₹25,000 / Month",
      ctc: "₹4.5 (Analyst) - ₹12 (US India Consultant) LPA",
      base: "₹4.2 - ₹10.5 Lakhs",
      bonus: "Variable yearly performance bonus",
      joiningBonus: "None",
      stocks: "None",
      benefits: "Global learning certifications, corporate medical coverage, work-from-home allowances"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Deloitte Aptitude Assessment", topics: ["Quantitative Analysis", "Logical Deduction", "Verbal Business English", "Coding MCQ"] },
        { roundNum: 2, title: "Group Discussion / Case Study", topics: ["Case formulation", "Communication", "Team solving strategy"] },
        { roundNum: 3, title: "Technical & HR Interview", topics: ["SQL queries", "Software Engineering SDLC", "Resume projects", "Client handling scenarios"] }
      ]
    },
    stats: {
      avgPackage: "₹6.8 LPA",
      highestPackage: "₹12 LPA",
      selectionRate: "8.5%",
      difficulty: "Medium",
      codingDifficulty: "Medium",
      aptitude: 180,
      coding: 110,
      interview: 65
    },
    roadmap: [
      { days: "Day 1–7", topic: "Aptitude and Business English structure drills" },
      { days: "Day 8–15", topic: "Case study frameworks and logical puzzle practices" },
      { days: "Day 16–22", topic: "Database fundamentals (SQL queries, SDLC models)" },
      { days: "Day 23–26", topic: "Deloitte mock tests and business communication preparation" },
      { days: "Day 27–30", topic: "Personal statement drills and resume review" }
    ]
  },
  {
    slug: "bosch",
    name: "Bosch",
    logo: "🔩",
    category: "Automobile Companies",
    package: "5.5 - 14 LPA",
    role: "Embedded Software Engineer / Graduate Apprentice",
    description: "Engineering pioneer. Focuses on Embedded C, Microcontrollers, Operating Systems (RTOS), and basic electronics.",
    readiness: 76,
    overview: {
      industry: "Automobile / Engineering",
      headquarters: "Gerlingen, Germany",
      founded: "1886",
      founder: "Robert Bosch",
      ceo: "Stefan Hartung",
      employees: "420,000+",
      marketValue: "$95 Billion (Revenue)",
      description: "Robert Bosch GmbH is a German multinational engineering and technology company. The company's core operating areas are spread across mobility (hardware/software), consumer goods, and industrial technology.",
      website: "https://bosch.com",
      careersUrl: "https://careers.bosch.com"
    },
    eligibility: {
      branches: ["ECE", "EEE", "EIE", "CSE", "IT", "Mechanical"],
      cgpa: "7.0",
      backlogs: "0 active backlogs",
      gradYear: "2026",
      bond: "None",
      agreement: "None",
      location: "Bangalore, Coimbatore, Pune",
      mode: "In-Office"
    },
    salary: {
      stipend: "₹30,000 / Month",
      ctc: "₹5.5 - ₹14 Lakhs / Annum",
      base: "₹5.0 - ₹11.5 Lakhs",
      bonus: "Performance quarterly allowances",
      joiningBonus: "None",
      stocks: "None",
      benefits: "Canteen facilities, medical cards, higher education sponsor schemes"
    },
    hiringProcess: {
      rounds: [
        { roundNum: 1, title: "Technical Online Test", topics: ["Embedded C concepts", "Microcontrollers 8051/ARM", "C Programming Tasks", "Electronics Fundamentals"] },
        { roundNum: 2, title: "Technical Interview I", topics: ["Embedded C pointer arithmetic", "Interrupt service routines", "Microprocessor configurations"] },
        { roundNum: 3, title: "Technical Interview II", topics: ["Operating Systems basics (RTOS)", "C++ / Python automation basics", "Project showcase"] },
        { roundNum: 4, title: "HR Interview", topics: ["Commitment to core engineering", "Relocation preferences", "Team compatibility checks"] }
      ]
    },
    stats: {
      avgPackage: "₹7.5 LPA",
      highestPackage: "₹14 LPA",
      selectionRate: "6.0%",
      difficulty: "Medium",
      codingDifficulty: "Medium",
      aptitude: 160,
      coding: 140,
      interview: 75
    },
    roadmap: [
      { days: "Day 1–7", topic: "Embedded C loops, pointer arithmetic, structures, bitwise operations" },
      { days: "Day 8–15", topic: "Microcontroller architectures (registers, timers, interrupts)" },
      { days: "Day 16–22", topic: "RTOS concepts (task states, semaphore vs mutex, schedules)" },
      { days: "Day 23–26", topic: "Bosch mock tests and electrical/embedded MCQ sheet revision" },
      { days: "Day 27–30", topic: "Mock technical panels and embedded product walkthroughs" }
    ]
  }
];

export default companies;