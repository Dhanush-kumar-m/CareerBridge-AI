const codingQuestions = [
  {
    id: 1,
    title: "Hello World",
    difficulty: "Easy",
    company: "TCS",
    description: "Write a program that returns the classic string 'Hello World'.",
    sampleInput: '""',
    sampleOutput: '"Hello World"',
    hint: "Simply return the exact string 'Hello World' from the function.",
    testCases: [
      {
        input: '""',
        expected: '"Hello World"',
      },
    ],
  },
  {
    id: 2,
    title: "Even or Odd Check",
    difficulty: "Easy",
    company: "Infosys",
    description: "Determine if a given integer is even or odd. Return 'Even' or 'Odd'.",
    sampleInput: "4",
    sampleOutput: '"Even"',
    hint: "Use the modulo operator %. If num % 2 === 0, return 'Even', else return 'Odd'.",
    testCases: [
      {
        input: "4",
        expected: '"Even"',
      },
      {
        input: "7",
        expected: '"Odd"',
      },
    ],
  },
  {
    id: 3,
    title: "Two Sum",
    difficulty: "Easy",
    company: "TCS",
    description: "Given an array of integers and a target value, return the indices of the two numbers that add up to the target.",
    sampleInput: "[2,7,11,15], target=9",
    sampleOutput: "[0,1]",
    hint: "Try using a HashMap/Dictionary to store the complement of each number (target - current_number) and its index to achieve O(N) time complexity.",
    testCases: [
      {
        input: "[2,7,11,15], 9",
        expected: "[0,1]",
      },
      {
        input: "[3,2,4], 6",
        expected: "[1,2]",
      },
    ],
  },
  {
    id: 4,
    title: "Reverse String",
    difficulty: "Easy",
    company: "Infosys",
    description: "Reverse the given string.",
    sampleInput: "hello",
    sampleOutput: "olleh",
    hint: "Use two pointers, one at the start and one at the end, and swap the characters as they move towards the center.",
    testCases: [
      {
        input: "hello",
        expected: "olleh",
      },
      {
        input: "career",
        expected: "reerac",
      },
    ],
  },
  {
    id: 5,
    title: "Palindrome Check",
    difficulty: "Easy",
    company: "Accenture",
    description: "Check whether a given string is palindrome.",
    sampleInput: "madam",
    sampleOutput: "true",
    hint: "A string is a palindrome if it reads the same backward as forward. Compare the string with its reversed version or use two pointers.",
    testCases: [
      {
        input: "madam",
        expected: "true",
      },
      {
        input: "hello",
        expected: "false",
      },
    ],
  },
  {
    id: 6,
    title: "Find Largest Number",
    difficulty: "Easy",
    company: "Zoho",
    description: "Find the largest number in an array.",
    sampleInput: "[10,20,5,40]",
    sampleOutput: "40",
    hint: "Initialize a variable max with the first element of the array. Iterate through the array and update max whenever you find a larger element.",
    testCases: [
      {
        input: "[10,20,5,40]",
        expected: "40",
      },
      {
        input: "[5,1,8]",
        expected: "8",
      },
    ],
  },
  {
    id: 7,
    title: "FizzBuzz",
    difficulty: "Easy",
    company: "TCS",
    description: "Write a program that returns an array of strings representing numbers from 1 to N. For multiples of 3 return 'Fizz', multiples of 5 return 'Buzz', and multiples of both return 'FizzBuzz'.",
    sampleInput: "5",
    sampleOutput: '["1","2","Fizz","4","Buzz"]',
    hint: "Use the modulo operator % for checking divisibility. Check for 15 (3 and 5) first, then 3, then 5.",
    testCases: [
      {
        input: "5",
        expected: '["1","2","Fizz","4","Buzz"]',
      },
    ],
  },
  {
    id: 8,
    title: "Anagram Check",
    difficulty: "Easy",
    company: "Amazon",
    description: "Determine if two strings are anagrams of each other (contain the same characters in any order).",
    sampleInput: '"listen","silent"',
    sampleOutput: "true",
    hint: "Sort both strings and compare them, or count characters using a map/hash.",
    testCases: [
      {
        input: '"listen","silent"',
        expected: "true",
      },
      {
        input: '"hello","world"',
        expected: "false",
      },
    ],
  },
  {
    id: 9,
    title: "Factorial",
    difficulty: "Medium",
    company: "TCS",
    description: "Find factorial of a given number.",
    sampleInput: "5",
    sampleOutput: "120",
    hint: "Use recursion where factorial(n) = n * factorial(n - 1) with a base case factorial(0) = 1, or use an iterative loop.",
    testCases: [
      {
        input: "5",
        expected: "120",
      },
      {
        input: "4",
        expected: "24",
      },
    ],
  },
  {
    id: 10,
    title: "Fibonacci Series",
    difficulty: "Medium",
    company: "Infosys",
    description: "Print Fibonacci sequence up to N terms as space-separated numbers.",
    sampleInput: "5",
    sampleOutput: "0 1 1 2 3",
    hint: "Generate terms iteratively: next_term = prev1 + prev2. Initialize prev1 = 0 and prev2 = 1.",
    testCases: [
      {
        input: "5",
        expected: "0 1 1 2 3",
      },
      {
        input: "3",
        expected: "0 1 1",
      },
    ],
  },
  {
    id: 11,
    title: "Prime Number Check",
    difficulty: "Medium",
    company: "Accenture",
    description: "Check whether a given integer is a prime number. Return true or false.",
    sampleInput: "7",
    sampleOutput: "true",
    hint: "A prime number is only divisible by 1 and itself. Iterate from 2 to the square root of the number and check for divisibility.",
    testCases: [
      {
        input: "7",
        expected: "true",
      },
      {
        input: "4",
        expected: "false",
      },
    ],
  },
  {
    id: 12,
    title: "Valid Parentheses",
    difficulty: "Medium",
    company: "Amazon",
    description: "Check if parentheses are balanced.",
    sampleInput: "()[]{}",
    sampleOutput: "true",
    hint: "Use a Stack data structure. Push opening brackets onto the stack and pop them when you encounter matching closing brackets.",
    testCases: [
      {
        input: "()[]{}",
        expected: "true",
      },
      {
        input: "(]",
        expected: "false",
      },
    ],
  },
  {
    id: 13,
    title: "Container With Most Water",
    difficulty: "Medium",
    company: "Google",
    description: "Given n non-negative integers representing heights, find two lines that together with the x-axis forms a container, such that the container contains the most water. Return the max area.",
    sampleInput: "[1,8,6,2,5,4,8,3,7]",
    sampleOutput: "49",
    hint: "Use two pointers, one at the start and one at the end. Calculate area, move the pointer pointing to the shorter line inwards.",
    testCases: [
      {
        input: "[1,8,6,2,5,4,8,3,7]",
        expected: "49",
      },
    ],
  },
  {
    id: 14,
    title: "Merge Sorted Arrays",
    difficulty: "Hard",
    company: "Amazon",
    description: "Merge two sorted arrays into one sorted array.",
    sampleInput: "[1,3,5],[2,4,6]",
    sampleOutput: "[1,2,3,4,5,6]",
    hint: "Use two pointers starting at the beginning of each array. Compare elements and push the smaller one to a new array.",
    testCases: [
      {
        input: "[1,3,5],[2,4,6]",
        expected: "[1,2,3,4,5,6]",
      },
    ],
  },
  {
    id: 15,
    title: "Binary Search",
    difficulty: "Hard",
    company: "Google",
    description: "Given a sorted array of integers and a target key, return the index of the key if found, or -1 if not found.",
    sampleInput: "[1, 3, 5, 7, 9], 7",
    sampleOutput: "3",
    hint: "Use three pointers: low, mid, and high. Adjust them based on whether target is smaller or larger than array[mid].",
    testCases: [
      {
        input: "[1,3,5,7,9], 7",
        expected: "3",
      },
      {
        input: "[1,3,5,7,9], 4",
        expected: "-1",
      },
    ],
  },
  {
    id: 16,
    title: "Longest Palindromic Substring",
    difficulty: "Hard",
    company: "Zoho",
    description: "Given a string, find the longest palindromic substring in it.",
    sampleInput: "babad",
    sampleOutput: "bab",
    hint: "Expand around centers: there are 2N - 1 centers. For each center, find the longest palindrome.",
    testCases: [
      {
        input: "babad",
        expected: "bab",
      },
      {
        input: "cbbd",
        expected: "bb",
      },
    ],
  },
];

export default codingQuestions;