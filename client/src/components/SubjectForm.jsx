import { useState } from "react";

function SubjectForm({ onSubmit }) {
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState([
    {
      name: "",
      percentage: "",
    },
  ]);

  const [targetCareer, setTargetCareer] = useState("");

  const handleSubjectChange = (index, field, value) => {
    const update = [...subjects];
    update[index][field] = value;
    setSubjects(update);
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
      alert("Please fill in all subjects fields");
      return;
    }
    onSubmit({ grade, subjects, targetCareer });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 round-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-900 mb-b">
        Enter Your Subjects Marks
      </h2>
      {/*grade selector*/}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Your grade
        </label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Grade --</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
      </div>
      {/*subject inputs*/}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your subjects
        </label>
        {subjects.map((subject, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="subject name"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="%"
              value={subject.percentage}
              onChange={(e) =>
                handleSubjectChange(index, "percentage", e.target.value)
              }
              className="w-24 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {subjects.length > 1 && (
              <button
                onClick={() => removeSubject(index)}
                className="text-red-500 font-bold text-xl px-2"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addSubject}
          className="mt-2 text-blue-600 font-semibold hover:underline"
        >
          + Add Subject
        </button>
      </div>
      {/*target career */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Target Career (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g Software Engineer, Doctor, Accountant,Coputer Sciences ect"
          value={targetCareer}
          onChange={(e) => setTargetCareer(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/*submit button*/}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Find My Path
      </button>
    </div>
  );
}
export default SubjectForm;
