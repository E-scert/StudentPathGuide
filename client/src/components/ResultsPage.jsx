function ResultsPage({ result, onStartOver }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* APS Score Banner */}
      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center mb-10">
        <h2 className="text-2xl font-semibold mb-2">Your APS Score</h2>
        <p className="text-7xl font-bold mb-2">{result.aps}</p>
        <p className="text-blue-200">
          Grade {result.grade} — {result.subjects.length} subjects entered
        </p>
        {result.targetCareer && (
          <p className="mt-3 text-blue-200">
            Target Career: {result.targetCareer}
          </p>
        )}
      </div>

      {/* Courses */}
      <h3 className="text-2xl font-bold text-blue-900 mb-6">
        Courses You Qualify For
      </h3>

      {result.courses.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-md">
          <p className="text-gray-500 text-lg">
            No courses found for your APS score. Keep working hard!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {result.courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600"
            >
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-blue-900">
                    {course.name}
                  </h4>
                  <span className="text-sm text-blue-600 font-semibold">
                    {course.field}
                  </span>
                </div>
                <span className="bg-blue-100 text-blue-900 font-bold px-4 py-2 rounded-xl text-sm">
                  Min APS: {course.min_aps}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{course.description}</p>

              {/* Career Paths */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Career Paths:
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.career_paths.map((career, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Universities */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Universities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.universities.map((uni, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start Over */}
      <div className="text-center mt-10">
        <button
          onClick={onStartOver}
          className="bg-blue-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
