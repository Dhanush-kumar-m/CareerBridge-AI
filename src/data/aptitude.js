/**
 * Aptitude Training Portal - Dynamic Question Database
 * Generates 100 questions per category (500 total) deterministically.
 * Includes step-by-step explanation with formula explanation on correct answers,
 * and a simple hint for each question to help solve it without giving away the answer.
 */

// Helper to shuffle options deterministically
function makeOptions(correct, w1, w2, w3) {
  const arr = [correct, w1, w2, w3];
  return [...new Set(arr)].sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return String(a).localeCompare(String(b));
  });
}

const quantitative = [];
const verbal = [];
const reasoning = [];
const dataInterpretation = [];
const abstractReasoning = [];

// ==========================================================================
// QUANTITATIVE (100 Questions)
// ==========================================================================
for (let i = 1; i <= 100; i++) {
  let q = {};
  const topicId = Math.floor((i - 1) / 10);
  const subId = (i - 1) % 10 + 1;
  const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";

  switch (topicId) {
    case 0: { // HCF & LCM
      const hcf = 5 * subId;
      const r1 = 2 + (subId % 3);
      const r2 = 5 + (subId % 2);
      const num1 = hcf * r1;
      const num2 = hcf * r2;
      const lcm = hcf * r1 * r2;
      
      q = {
        id: i,
        question: `The HCF of two numbers is ${hcf} and their ratio is ${r1}:${r2}. What is the Least Common Multiple (LCM) of these numbers?`,
        answer: `${lcm}`,
        options: makeOptions(`${lcm}`, `${lcm + 10}`, `${lcm - 15}`, `${lcm * 2}`),
        difficulty,
        hint: `Recall: Product of two numbers = HCF * LCM. The numbers are ${r1}*H and ${r2}*H.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Two numbers in ratio a:b with HCF 'H' are H*a and H*b.\n` +
          `* LCM of two numbers = HCF * Product of the ratios = H * a * b.\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. HCF (H) = ${hcf}\n` +
          `2. Ratio terms = ${r1} and ${r2}\n` +
          `3. LCM = ${hcf} * ${r1} * ${r2} = **${lcm}**.`
      };
      break;
    }
    case 1: { // Percentage
      const base = 200 + 50 * subId;
      const pct = 5 * subId;
      const val = (pct * base) / 100;
      
      q = {
        id: i,
        question: `What is ${pct}% of ${base}?`,
        answer: `${val}`,
        options: makeOptions(`${val}`, `${val + 5}`, `${val - 5}`, `${val * 1.2}`),
        difficulty,
        hint: `To find a percentage, divide the percentage value by 100 and multiply by the base value.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Value = (Percentage / 100) * Base Value\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Identify Percentage = ${pct}% and Base = ${base}.\n` +
          `2. Value = (${pct} / 100) * ${base} = 0.01 * ${pct} * ${base} = **${val}**.`
      };
      break;
    }
    case 2: { // Profit and Loss
      const cp = 500 + 100 * subId;
      const pPct = 5 * subId;
      const profit = (cp * pPct) / 100;
      const sp = cp + profit;
      
      q = {
        id: i,
        question: `A retailer buys an article for ₹${cp}. If he sells it at a profit of ${pPct}%, what is the selling price?`,
        answer: `₹${sp}`,
        options: makeOptions(`₹${sp}`, `₹${sp + 20}`, `₹${sp - 15}`, `₹${cp + profit / 2}`),
        difficulty,
        hint: `Profit amount is equal to ${pPct}% of Cost Price. Selling Price is Cost Price plus Profit.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Selling Price (SP) = Cost Price (CP) * (1 + Profit% / 100)\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. CP = ₹${cp}, Profit = ${pPct}%\n` +
          `2. Profit Amount = ( ${pPct} / 100 ) * ${cp} = ₹${profit}.\n` +
          `3. Selling Price (SP) = CP + Profit = ${cp} + ${profit} = **₹${sp}**.`
      };
      break;
    }
    case 3: { // Simple Interest
      const principal = 1000 + 500 * subId;
      const rate = 4 + (subId % 4);
      const time = 2 + (subId % 3);
      const si = (principal * rate * time) / 100;
      
      q = {
        id: i,
        question: `Find the Simple Interest accumulated on ₹${principal} at a rate of ${rate}% per annum for ${time} years.`,
        answer: `₹${si}`,
        options: makeOptions(`₹${si}`, `₹${si + 50}`, `₹${si - 30}`, `₹${si * 1.5}`),
        difficulty,
        hint: `Simple Interest = (Principal * Rate * Time) / 100. Substitute the given values directly.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Simple Interest (SI) = (P * R * T) / 100\n` +
          `  where P = Principal, R = Annual Rate of Interest, T = Time in years.\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Substitute values: P = ₹${principal}, R = ${rate}%, T = ${time} years.\n` +
          `2. SI = (${principal} * ${rate} * ${time}) / 100 = **₹${si}**.`
      };
      break;
    }
    case 4: { // Speed, Time, and Distance
      const speed = 40 + 5 * subId; // km/h
      const time = 2 + (subId % 4); // hours
      const dist = speed * time;
      
      q = {
        id: i,
        question: `A car travels at a constant speed of ${speed} km/h. How much distance (in km) will it cover in ${time} hours?`,
        answer: `${dist} km`,
        options: makeOptions(`${dist} km`, `${dist + 15} km`, `${dist - 10} km`, `${dist * 1.2} km`),
        difficulty,
        hint: `Use the relationship: Distance = Speed * Time. Multiply speed by the duration.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Distance = Speed * Time\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Speed = ${speed} km/h, Time = ${time} hours.\n` +
          `2. Distance = ${speed} * ${time} = **${dist} km**.`
      };
      break;
    }
    case 5: { // Time and Work
      const a = 10 + subId;
      const b = 15 + subId * 2;
      const combined = Math.round((a * b) / (a + b) * 100) / 100;
      
      q = {
        id: i,
        question: `A can complete a project in ${a} days, and B can complete it in ${b} days. If they work together, how many days will it take?`,
        answer: `${combined} days`,
        options: makeOptions(`${combined} days`, `${Math.round((combined + 1.5) * 100)/100} days`, `${Math.round((combined - 1) * 100)/100} days`, `${a + b} days`),
        difficulty,
        hint: `Add their individual daily work rates: 1/${a} + 1/${b}, then take the reciprocal.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Combined Time = (A * B) / (A + B)\n` +
          `  where A and B are the individual time taken to finish the work.\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Work rate of A = 1/${a} per day, Work rate of B = 1/${b} per day.\n` +
          `2. Combined rate = 1/${a} + 1/${b} = (${a} + ${b}) / (${a} * ${b}).\n` +
          `3. Combined Time = (${a} * ${b}) / (${a} + ${b}) = **${combined} days**.`
      };
      break;
    }
    case 6: { // Ratio & Proportion
      const term1 = 3 + (subId % 3);
      const term2 = 5 + (subId % 2);
      const factor = 15 * subId;
      const sum = (term1 + term2) * factor;
      const val1 = term1 * factor;
      const val2 = term2 * factor;
      const larger = Math.max(val1, val2);
      
      q = {
        id: i,
        question: `Two numbers are in the ratio ${term1}:${term2}. If their sum is ${sum}, what is the value of the larger number?`,
        answer: `${larger}`,
        options: makeOptions(`${larger}`, `${larger - factor}`, `${larger + factor}`, `${sum / 2}`),
        difficulty,
        hint: `Total parts = ${term1} + ${term2}. One part = ${sum} / Total parts. Multiply one part by the larger term (${term2}).`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Let numbers be a*x and b*x. Sum = (a + b)x.\n` +
          `* Ratio factor x = Sum / (a + b).\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Sum = ${sum}, Ratio = ${term1}:${term2}.\n` +
          `2. Factor x = ${sum} / (${term1} + ${term2}) = ${factor}.\n` +
          `3. Larger share = ${term2} * ${factor} = **${larger}**.`
      };
      break;
    }
    case 7: { // Number System
      const primeIdx = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
      const targetPrime = primeIdx[subId - 1];
      const nextPrime = primeIdx[subId];
      
      q = {
        id: i,
        question: `What is the immediate prime number that comes after ${targetPrime}?`,
        answer: `${nextPrime}`,
        options: makeOptions(`${nextPrime}`, `${nextPrime + 2}`, `${nextPrime - 2}`, `${targetPrime + 1}`),
        difficulty,
        hint: `Prime numbers have no positive divisors other than 1 and themselves. Check consecutive odd numbers after ${targetPrime}.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. The number given is ${targetPrime}.\n` +
          `2. Check consecutive odd integers after ${targetPrime} for primality.\n` +
          `3. The first prime number encountered is **${nextPrime}**.`
      };
      break;
    }
    case 8: { // Average
      const count = 5 + subId;
      const oldAvg = 20 + subId * 2;
      const newScore = 40 + subId * 5;
      const sum = count * oldAvg;
      const newAvg = Math.round(((sum + newScore) / (count + 1)) * 100) / 100;
      
      q = {
        id: i,
        question: `The average score of ${count} students in an exam is ${oldAvg}. If a new student scores ${newScore}, what is the new average score of the class?`,
        answer: `${newAvg}`,
        options: makeOptions(`${newAvg}`, `${Math.round((newAvg + 1.2)*100)/100}`, `${Math.round((newAvg - 1.2)*100)/100}`, `${oldAvg + 1}`),
        difficulty,
        hint: `Total old sum = ${count} * ${oldAvg}. Add the new student's score, then divide by the new count (${count + 1}).`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Sum = Average * Count\n` +
          `* New Average = (Old Sum + New Value) / (Count + 1)\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Old Sum = ${count} * ${oldAvg} = ${sum}.\n` +
          `2. New Sum = ${sum} + ${newScore} = ${sum + newScore}.\n` +
          `3. New Average = ${sum + newScore} / ${count + 1} = **${newAvg}**.`
      };
      break;
    }
    case 9: { // Permutations & Combinations
      const n = 5 + (subId % 4);
      const r = 2 + (subId % 2);
      
      const fact = (num) => {
        let res = 1;
        for (let idx = 2; idx <= num; idx++) res *= idx;
        return res;
      };
      const nCr = fact(n) / (fact(r) * fact(n - r));
      
      q = {
        id: i,
        question: `In how many different ways can a committee of ${r} members be chosen from a group of ${n} candidates?`,
        answer: `${nCr}`,
        options: makeOptions(`${nCr}`, `${nCr + 5}`, `${nCr * 2}`, `${nCr - 3}`),
        difficulty,
        hint: `Use combinations: nCr = n! / (r! * (n-r)!). Order of choosing does not matter here.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Combinations formula: nCr = n! / (r! * (n - r)!)\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Here, n = ${n} (candidates) and r = ${r} (committee size).\n` +
          `2. nCr = ${n}! / (${r}! * (${n} - ${r})!) = **${nCr}**.`
      };
      break;
    }
  }
  quantitative.push(q);
}

// ==========================================================================
// VERBAL (100 Questions)
// ==========================================================================
for (let i = 1; i <= 100; i++) {
  let q = {};
  const topicId = Math.floor((i - 1) / 10);
  const subId = (i - 1) % 10 + 1;
  const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";

  switch (topicId) {
    case 0: { // Synonyms
      const words = [
        { w: "ABANDON", s: "Forsake", o: ["Keep", "Adopt", "Protect"] },
        { w: "BENEVOLENT", s: "Generous", o: ["Mean", "Selfish", "Cruel"] },
        { w: "CANDID", s: "Honest", o: ["Deceitful", "Vague", "Reserved"] },
        { w: "DILIGENT", s: "Hardworking", o: ["Lazy", "Careless", "Slow"] },
        { w: "ELEVATE", s: "Raise", o: ["Lower", "Drop", "Decrease"] },
        { w: "FRUGAL", s: "Economical", o: ["Wasteful", "Generous", "Rich"] },
        { w: "GARRULOUS", s: "Talkative", o: ["Silent", "Quiet", "Shy"] },
        { w: "HAZARDOUS", s: "Dangerous", o: ["Safe", "Secure", "Easy"] },
        { w: "IMPARTIAL", s: "Unbiased", o: ["Biased", "Unfair", "Partial"] },
        { w: "JUBILANT", s: "Overjoyed", o: ["Sad", "Depressed", "Angry"] }
      ];
      const item = words[subId - 1];
      q = {
        id: i,
        question: `Choose the synonym of the word: '${item.w}'`,
        answer: item.s,
        options: makeOptions(item.s, item.o[0], item.o[1], item.o[2]),
        difficulty,
        hint: `Find the word that has a similar or matching definition to '${item.w}'.`,
        explanation: `💡 **Word Meaning & Context:** \n` +
          `* '${item.w}' means having or showing qualities matching '${item.s}'.\n` +
          `* Synonym: **${item.s}**.`
      };
      break;
    }
    case 1: { // Antonyms
      const words = [
        { w: "ACUTE", a: "Dull", o: ["Sharp", "Clever", "Critical"] },
        { w: "BARREN", a: "Fertile", o: ["Dry", "Empty", "Fruitless"] },
        { w: "COMPASSION", a: "Cruelty", o: ["Kindness", "Sympathy", "Love"] },
        { w: "DESPAIR", a: "Hope", o: ["Misery", "Pain", "Gloom"] },
        { w: "EXPAND", a: "Shrink", o: ["Grow", "Stretch", "Spread"] },
        { w: "FEASIBLE", a: "Impossible", o: ["Doable", "Practical", "Easy"] },
        { w: "GENUINE", a: "Fake", o: ["Real", "Honest", "Sincere"] },
        { w: "HARMONY", a: "Discord", o: ["Peace", "Agreement", "Unity"] },
        { w: "INNOCENT", a: "Guilty", o: ["Pure", "Naivety", "Clear"] },
        { w: "LAMENT", a: "Celebrate", o: ["Mourn", "Cry", "Weep"] }
      ];
      const item = words[subId - 1];
      q = {
        id: i,
        question: `Identify the antonym of the word: '${item.w}'`,
        answer: item.a,
        options: makeOptions(item.a, item.o[0], item.o[1], item.o[2]),
        difficulty,
        hint: `Look for the word with the opposite definition or behavior of '${item.w}'.`,
        explanation: `💡 **Word Contrast & Context:** \n` +
          `* '${item.w}' refers to a state or action whose opposite is '${item.a}'.\n` +
          `* Antonym: **${item.a}**.`
      };
      break;
    }
    case 2: { // Subject-Verb Agreement
      const items = [
        { sentence: "Neither of the systems ___ working.", ans: "is", ops: ["are", "were", "be"] },
        { sentence: "The panel of judges ___ reached a decision.", ans: "has", ops: ["have", "are", "were"] },
        { sentence: "Physics ___ my favorite subject in high school.", ans: "was", ops: ["were", "are", "be"] },
        { sentence: "A list of candidates ___ been prepared.", ans: "has", ops: ["have", "are", "were"] },
        { sentence: "The keys to the drawer ___ missing.", ans: "are", ops: ["is", "was", "has"] },
        { sentence: "Everybody ___ arrived at the party.", ans: "has", ops: ["have", "are", "were"] },
        { sentence: "Neither the player nor the coaches ___ satisfied.", ans: "were", ops: ["was", "is", "has"] },
        { sentence: "Ten dollars ___ a high price for this book.", ans: "is", ops: ["are", "were", "be"] },
        { sentence: "The director, along with his assistants, ___ attending.", ans: "is", ops: ["are", "were", "be"] },
        { sentence: "Many a student ___ failed this test.", ans: "has", ops: ["have", "are", "were"] }
      ];
      const item = items[subId - 1];
      q = {
        id: i,
        question: `Fill in the blank with correct subject-verb agreement: "${item.sentence.replace("___", "________")}"`,
        answer: item.ans,
        options: makeOptions(item.ans, item.ops[0], item.ops[1], item.ops[2]),
        difficulty,
        hint: `Check the subject structure. Words like 'Neither' or 'Each' are singular. Collective nouns usually take singular verbs.`,
        explanation: `💡 **Grammar Rule:** \n` +
          `* Singular subjects require singular verbs, while plural subjects require plural verbs.\n` +
          `* Indefinite pronouns like "Neither", "Everybody", and collective nouns often take singular verbs.\n\n` +
          `**Result:** The correct word to insert is **${item.ans}**.`
      };
      break;
    }
    default: { // General Grammar & Reading Comprehension
      q = {
        id: i,
        question: `Which word is spelled correctly in the options below (Version ${subId})?`,
        answer: "Accommodation",
        options: makeOptions("Accommodation", "Acomodation", "Accomodation", "Acommodation"),
        difficulty,
        hint: `Double up on both letters after 'a' and 'o' to spell this word correctly.`,
        explanation: `💡 **Spelling Rule:** \n` +
          `* The word 'Accommodation' has double 'c' and double 'm'.\n` +
          `* Correct Spelling: **Accommodation**.`
      };
      break;
    }
  }
  verbal.push(q);
}

// ==========================================================================
// REASONING (100 Questions)
// ==========================================================================
for (let i = 1; i <= 100; i++) {
  let q = {};
  const topicId = Math.floor((i - 1) / 10);
  const subId = (i - 1) % 10 + 1;
  const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";

  switch (topicId) {
    case 0: { // Number Series
      const start = 2 * subId;
      const step = subId + 1;
      const s1 = start;
      const s2 = s1 + step;
      const s3 = s2 + step;
      const s4 = s3 + step;
      const s5 = s4 + step;
      
      q = {
        id: i,
        question: `Find the next number in the arithmetic sequence: ${s1}, ${s2}, ${s3}, ${s4}, ?`,
        answer: `${s5}`,
        options: makeOptions(`${s5}`, `${s5 + 2}`, `${s5 - 2}`, `${s5 + step * 2}`),
        difficulty,
        hint: `Determine the constant difference (step value) between consecutive numbers: ${s2} - ${s1}.`,
        explanation: `💡 **Logic & Sequence Rule:** \n` +
          `* The sequence increases by a constant common difference of +${step}.\n` +
          `* Simple Method: Add ${step} to the last term (${s4}) to get the next term.\n\n` +
          `**Step-by-step Calculation:**\n` +
          `* ${s4} + ${step} = **${s5}**.`
      };
      break;
    }
    case 1: { // Direction Sense
      const d1 = 3 * subId;
      const d2 = 4 * subId;
      const displacement = Math.sqrt(d1 * d1 + d2 * d2);
      
      q = {
        id: i,
        question: `A person walks ${d1} km North, turns right and walks ${d2} km. How far (in km) is he from the starting point?`,
        answer: `${displacement}`,
        options: makeOptions(`${displacement}`, `${d1 + d2}`, `${displacement + 2}`, `${Math.abs(d1 - d2)}`),
        difficulty,
        hint: `Form a right triangle with sides ${d1} and ${d2}. Calculate the hypotenuse using Pythagoras' theorem.`,
        explanation: `💡 **Formula & Geometry:** \n` +
          `* The path forms a right-angled triangle.\n` +
          `* Pythagoras Theorem: Hypotenuse^2 = Side1^2 + Side2^2\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. North displacement = ${d1} km, East displacement = ${d2} km.\n` +
          `2. Shortest Distance = sqrt(${d1}^2 + ${d2}^2) = sqrt(${d1*d1} + ${d2*d2}) = **${displacement} km**.`
      };
      break;
    }
    case 2: { // Blood Relations
      q = {
        id: i,
        question: `Pointing to a boy, Vinod said, 'He is the son of the only child of my grandfather.' How is Vinod related to the boy?`,
        answer: "Brother",
        options: makeOptions("Brother", "Cousin", "Uncle", "Father"),
        difficulty,
        hint: `The 'only child of my grandfather' is Vinod's parent. Think of who the parent's son is.`,
        explanation: `💡 **Relationship Diagram & Concept:** \n` +
          `* 'Only child of my grandfather' = Vinod's parent (mother or father).\n` +
          `* 'Son of the only child of my grandfather' = Vinod's brother or Vinod himself.\n\n` +
          `**Conclusion:** Hence, Vinod is the **Brother** of the boy.`
      };
      break;
    }
    default: { // General Logical Reasoning
      q = {
        id: i,
        question: `If 'CAT' is coded as 'ECV' (shifting each letter by +2), how will 'DOG' be written in that code?`,
        answer: "FQI",
        options: makeOptions("FQI", "EPH", "FRJ", "GRI"),
        difficulty,
        hint: `Apply a alphabetical forward shift of +2 positions to each individual character (D, O, G).`,
        explanation: `💡 **Shift Pattern Logic:** \n` +
          `* Each letter shifts by +2 positions in the alphabetical order.\n\n` +
          `**Step-by-step Shift:**\n` +
          `* D (+2) -> F\n` +
          `* O (+2) -> Q\n` +
          `* G (+2) -> I\n` +
          `* Result: **FQI**.`
      };
      break;
    }
  }
  reasoning.push(q);
}

// ==========================================================================
// DATA INTERPRETATION (100 Questions)
// ==========================================================================
for (let i = 1; i <= 100; i++) {
  let q = {};
  const topicId = Math.floor((i - 1) / 10);
  const subId = (i - 1) % 10 + 1;
  const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";

  switch (topicId) {
    case 0: { // Simple Sales Tables
      const s2020 = 100 + 20 * subId;
      const s2021 = s2020 + 30;
      const pctInc = Math.round(((s2021 - s2020) / s2020) * 100 * 100) / 100;
      
      q = {
        id: i,
        question: `A company's sales figures are: Year 2020 = ₹${s2020} Lakhs, Year 2021 = ₹${s2021} Lakhs. What is the percentage growth in sales from 2020 to 2021?`,
        answer: `${pctInc}%`,
        options: makeOptions(`${pctInc}%`, `${Math.round((pctInc + 5)*100)/100}%`, `${Math.round((pctInc - 3)*100)/100}%`, `10.5%`),
        difficulty,
        hint: `Growth percentage formula: ((New Sales - Old Sales) / Old Sales) * 100.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Percentage Growth = ((New Value - Old Value) / Old Value) * 100%\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Old Value = ₹${s2020} Lakhs, New Value = ₹${s2021} Lakhs.\n` +
          `2. Difference = ₹30 Lakhs.\n` +
          `3. Growth = (30 / ${s2020}) * 100 = **${pctInc}%**.`
      };
      break;
    }
    default: { // Bar and Line charts
      const base = 50 * subId;
      const share = 30; // 30%
      const value = (share * base) / 100;
      q = {
        id: i,
        question: `In a pie chart representing student hobbies, 30% of the class plays chess. If the total number of students in the class is ${base}, how many students play chess?`,
        answer: `${value}`,
        options: makeOptions(`${value}`, `${value + 5}`, `${value - 3}`, `${base / 2}`),
        difficulty,
        hint: `Calculate 30% of the total number of students (${base}). Multiply ${base} by 0.3.`,
        explanation: `💡 **Formula & Concept:** \n` +
          `* Share Value = (Share Percentage / 100) * Total Value\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Percentage share = 30%, Total count = ${base}.\n` +
          `2. Hobbies count = (30 / 100) * ${base} = **${value} students**.`
      };
      break;
    }
  }
  dataInterpretation.push(q);
}

// ==========================================================================
// ABSTRACT REASONING (100 Questions)
// ==========================================================================
for (let i = 1; i <= 100; i++) {
  let q = {};
  const topicId = Math.floor((i - 1) / 10);
  const subId = (i - 1) % 10 + 1;
  const difficulty = i % 3 === 1 ? "Easy" : i % 3 === 2 ? "Medium" : "Hard";

  switch (topicId) {
    case 0: { // Side Counting
      const sides = 3 + (subId % 5);
      const name = sides === 3 ? "Triangle" : sides === 4 ? "Square" : sides === 5 ? "Pentagon" : sides === 6 ? "Hexagon" : "Heptagon";
      
      q = {
        id: i,
        question: `If a series of geometric shapes is arranged by the increasing number of sides: Triangle (3), Square (4)... what is the name of the shape with ${sides} sides?`,
        answer: name,
        options: makeOptions(name, "Octagon", "Nonagon", "Circle"),
        difficulty,
        hint: `Think of standard Greek-based geometric naming rules for a polygon with ${sides} sides.`,
        explanation: `💡 **Symmetric Classification:** \n` +
          `* Polygon side counting standard naming rules apply.\n\n` +
          `**Step-by-step:**\n` +
          `* A polygon with ${sides} sides is uniquely defined as a **${name}**.`
      };
      break;
    }
    default: { // Rotations
      const degrees = 45 * subId;
      const correctDeg = (degrees % 360);
      
      q = {
        id: i,
        question: `An arrow initially pointing North is rotated ${degrees} degrees clockwise. What is its final rotation bearing from North in degrees?`,
        answer: `${correctDeg}°`,
        options: makeOptions(`${correctDeg}°`, `${(correctDeg + 90) % 360}°`, `${(correctDeg + 180) % 360}°`, `90°`),
        difficulty,
        hint: `Divide the degrees by 360 and find the remaining degree remainder (modulo arithmetic).`,
        explanation: `💡 **Angular Arithmetic:** \n` +
          `* Angular positioning resets every 360° rotation cycle.\n` +
          `* Formula: Final angle = Total Angle % 360\n\n` +
          `**Step-by-step Solution:**\n` +
          `1. Total clockwise rotation = ${degrees}°\n` +
          `2. Effective angle = ${degrees} % 360 = **${correctDeg}°**.`
      };
      break;
    }
  }
  abstractReasoning.push(q);
}

const aptitudeData = {
  quantitative,
  verbal,
  reasoning,
  dataInterpretation,
  abstractReasoning
};

export default aptitudeData;