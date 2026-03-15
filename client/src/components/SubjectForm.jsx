import { useState } from "react";

function SubjectForm({ onSubmit }) {
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", percentage: "" }]);
  const [targetCareer, setTargetCareer] = useState("");

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", percentage: "" }]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSubmit = () => {
    if (!grade) {
      alert("Please select your grade");
      return;
    }
    if (subjects.some((s) => !s.name || !s.percentage)) {
      alert("Please fill in all subject fields");
      return;
    }
    onSubmit({ grade, subjects, targetCareer });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Card */}
      <div className="bg-blue-900 text-white rounded-2xl p-6 mb-6 text-center">
        <h2 className="text-2xl font-bold mb-1">Discover Your Path</h2>
        <p className="text-blue-200 text-sm">
          Enter your subject marks below and we will show you what you qualify
          for
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        {/* Grade Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What grade are you in?
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="">-- Select Your Grade --</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>

        {/* Subject Inputs */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Your Subjects & Marks
          </label>
          <div className="flex gap-2 text-xs text-gray-400 font-semibold mb-2 px-1">
            <span className="flex-1">Subject Name</span>
            <span className="w-24 text-center">Mark %</span>
            <span className="w-8"></span>
          </div>
          {subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={subject.name}
                onChange={(e) =>
                  handleSubjectChange(index, "name", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <input
                type="number"
                placeholder="%"
                min="0"
                max="100"
                value={subject.percentage}
                onChange={(e) =>
                  handleSubjectChange(index, "percentage", e.target.value)
                }
                className="w-24 border border-gray-300 rounded-xl p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              {subjects.length > 1 && (
                <button
                  onClick={() => removeSubject(index)}
                  className="w-10 text-red-400 hover:text-red-600 font-bold text-lg transition duration-200"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSubject}
            className="mt-1 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition duration-200"
          >
            <span className="text-xl">+</span> Add Another Subject
          </button>
        </div>

        {/* Target Career */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Do you have a target career in mind?
            <span className="text-gray-400 font-normal ml-1">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Software Engineer, Doctor, Accountant"
            value={targetCareer}
            onChange={(e) => setTargetCareer(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition duration-300 text-lg"
        >
          Find My Path →
        </button>
      </div>
    </div>
  );
}

export default SubjectForm;
