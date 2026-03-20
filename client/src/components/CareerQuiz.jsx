import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What do you enjoy doing most in your free time?",
    options: [
      { text: "Building or fixing things", category: "Engineering" },
      { text: "Reading, writing or debating", category: "Law" },
      { text: "Helping or caring for people", category: "Health Sciences" },
      { text: "Working with numbers or money", category: "Finance" },
      { text: "Creating art, music or designs", category: "Arts" },
      { text: "Using computers or technology", category: "Technology" },
    ],
  },
  {
    id: 2,
    question: "Which school subject do you enjoy the most?",
    options: [
      { text: "Mathematics", category: "Engineering" },
      { text: "English or Languages", category: "Law" },
      { text: "Life Sciences or Biology", category: "Health Sciences" },
      { text: "Accounting", category: "Finance" },
      { text: "Art or Design", category: "Arts" },
      { text: "IT or Computer Science", category: "Technology" },
    ],
  },
  {
    id: 3,
    question: "What kind of work environment do you prefer?",
    options: [
      { text: "Outdoors or on a construction site", category: "Engineering" },
      { text: "In an office or courtroom", category: "Law" },
      { text: "In a hospital or clinic", category: "Health Sciences" },
      { text: "In a bank or financial office", category: "Finance" },
      { text: "In a studio or creative space", category: "Arts" },
      { text: "In a tech office or from home", category: "Technology" },
    ],
  },
  {
    id: 4,
    question: "What motivates you most?",
    options: [
      { text: "Solving complex problems", category: "Engineering" },
      { text: "Fighting for justice", category: "Law" },
      { text: "Saving lives and helping people", category: "Health Sciences" },
      { text: "Making money and building wealth", category: "Finance" },
      { text: "Expressing myself creatively", category: "Arts" },
      { text: "Building the future with technology", category: "Technology" },
    ],
  },
  {
    id: 5,
    question: "How do you prefer to work?",
    options: [
      { text: "With my hands and tools", category: "Engineering" },
      { text: "Through research and writing", category: "Law" },
      { text: "Directly with people", category: "Health Sciences" },
      { text: "Analysing data and numbers", category: "Finance" },
      { text: "Through creative projects", category: "Arts" },
      { text: "Writing code or using software", category: "Technology" },
    ],
  },
  {
    id: 6,
    question: "What kind of impact do you want to make?",
    options: [
      { text: "Build infrastructure for communities", category: "Engineering" },
      { text: "Protect people's rights", category: "Law" },
      { text: "Improve people's health", category: "Health Sciences" },
      { text: "Help businesses and people manage money", category: "Finance" },
      { text: "Inspire people through art and media", category: "Arts" },
      {
        text: "Create technology that changes the world",
        category: "Technology",
      },
    ],
  },
];

const careerMap = {
  Engineering: {
    field: "Engineering",
    careers: [
      "Civil Engineer",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Structural Engineer",
    ],
    courses: [
      "Bachelor of Engineering in Civil Engineering",
      "Bachelor of Science in Electrical Engineering",
      "Bachelor of Science in Mechanical Engineering",
    ],
    description:
      "You are a problem solver who loves building and fixing things. Engineering could be your perfect match!",
  },
  Law: {
    field: "Law & Humanities",
    careers: [
      "Attorney",
      "Advocate",
      "Magistrate",
      "Legal Advisor",
      "Journalist",
    ],
    courses: [
      "Bachelor of Laws",
      "Bachelor of Arts in Journalism and Media Studies",
      "Bachelor of Arts in Public Administration",
    ],
    description:
      "You are analytical, love debate and want to fight for justice. Law or Humanities could be your calling!",
  },
  "Health Sciences": {
    field: "Health Sciences",
    careers: [
      "Medical Doctor",
      "Nurse",
      "Pharmacist",
      "Physiotherapist",
      "Dietitian",
    ],
    courses: [
      "Bachelor of Medicine and Surgery",
      "Bachelor of Nursing",
      "Bachelor of Science in Pharmacy",
      "Bachelor of Science in Physiotherapy",
    ],
    description:
      "You are caring and want to help people. Health Sciences is a rewarding field for you!",
  },
  Finance: {
    field: "Finance & Business",
    careers: [
      "Chartered Accountant",
      "Financial Analyst",
      "Investment Banker",
      "Actuary",
      "Business Manager",
    ],
    courses: [
      "Bachelor of Commerce in Accounting",
      "Bachelor of Commerce in Finance",
      "Bachelor of Science in Actuarial Science",
    ],
    description:
      "You are logical, love numbers and want to build wealth. Finance and Business are great fields for you!",
  },
  Arts: {
    field: "Arts & Design",
    careers: [
      "Graphic Designer",
      "Journalist",
      "Art Director",
      "Media Producer",
      "UI/UX Designer",
    ],
    courses: [
      "Bachelor of Arts in Graphic Design",
      "Bachelor of Arts in Journalism and Media Studies",
    ],
    description:
      "You are creative and expressive. Arts and Design will let you share your talent with the world!",
  },
  Technology: {
    field: "Technology",
    careers: [
      "Software Developer",
      "Data Scientist",
      "Cybersecurity Analyst",
      "Network Engineer",
      "AI Engineer",
    ],
    courses: [
      "Bachelor of Science in Computer Science",
      "Bachelor of Science in Information Technology",
      "Bachelor of Science in Data Science",
    ],
    description:
      "You are innovative and love technology. A career in Tech could take you anywhere in the world!",
  },
};

function CareerQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (category) => {
    const newAnswers = [...answers, category];

    if (current + 1 === questions.length) {
      const counts = newAnswers.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});
      const topCategory = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b,
      );
      setResult(careerMap[topCategory]);
    } else {
      setCurrent(current + 1);
    }
    setAnswers(newAnswers);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Career Personality Quiz</h2>
        <p className="text-blue-200">
          Answer 6 quick questions to discover which career field suits you best
        </p>
      </div>

      {!result ? (
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>
                {Math.round((current / questions.length) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(current / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h3 className="text-xl font-bold text-blue-900 mb-6">
            {questions[current].question}
          </h3>

          {/* Options */}
          <div className="grid gap-3">
            {questions[current].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.category)}
                className="text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition duration-200 font-medium text-gray-700"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-8 text-center shadow-lg">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">
              Your Career Match
            </p>
            <h3 className="text-4xl font-black mb-3">{result.field}</h3>
            <p className="text-blue-100">{result.description}</p>
          </div>

          {/* Careers */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h4 className="text-lg font-bold text-blue-900 mb-4">
              Careers That Suit You
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.careers.map((career, index) => (
                <span
                  key={index}
                  className="bg-green-50 text-green-700 border border-green-200 text-sm px-4 py-2 rounded-full font-medium"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h4 className="text-lg font-bold text-blue-900 mb-4">
              Recommended Courses
            </h4>
            <div className="space-y-2">
              {result.courses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
                >
                  <span className="text-blue-900 font-bold">→</span>
                  <span className="text-blue-900 font-medium text-sm">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={restart}
              className="flex-1 border border-blue-300 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition duration-200"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerQuiz;
