function ResultsPage({ result, onStartOver }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* APS Score Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-8 text-center mb-10 shadow-lg">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">
          Your APS Score
        </p>
        <p className="text-8xl font-black mb-3">{result.aps}</p>
        <div className="flex justify-center gap-4 text-blue-200 text-sm">
          <span>Grade {result.grade}</span>
          <span>|</span>
          <span>{result.subjects.length} Subjects</span>
          {result.targetCareer && (
            <>
              <span>|</span>
              <span>Target: {result.targetCareer}</span>
            </>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            Courses You Qualify For
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {result.courses.length} courses found based on your APS score
          </p>
        </div>
        <button
          onClick={onStartOver}
          className="text-sm text-blue-600 font-semibold border border-blue-300 px-4 py-2 rounded-xl hover:bg-blue-50 transition duration-200"
        >
          ← Start Over
        </button>
      </div>

      {/* No Results */}
      {result.courses.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md">
          <p className="text-5xl mb-4">📚</p>
          <h4 className="text-xl font-bold text-blue-900 mb-2">
            Keep Working Hard
          </h4>
          <p className="text-gray-500">
            No courses found for your current APS score. Focus on improving your
            marks and come back to check again.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {result.courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition duration-300"
            >
              {/* Course Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-bold text-blue-900 mb-1">
                    {course.name}
                  </h4>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {course.field}
                  </span>
                </div>
                <div className="text-center bg-blue-50 rounded-xl px-4 py-2">
                  <p className="text-xs text-gray-500">Min APS</p>
                  <p className="text-2xl font-black text-blue-900">
                    {course.min_aps}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {course.description}
              </p>

              {/* Career Paths */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Career Paths
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.career_paths.map((career, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Universities */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Universities
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.universities.map((uni, index) => (
                    <a
                      key={index}
                      href={`https://${course.university_websites[index]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-50
                      text-blue-700 border border-blue-200 text-xs px-3 py-1
                      rounded-full font-medium hover:bg-blue-100 transition
                      duration-200"
                    >
                      {uni} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Start Over */}
      <div className="text-center mt-10">
        <button
          onClick={onStartOver}
          className="bg-blue-900 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          ← Start Over
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
