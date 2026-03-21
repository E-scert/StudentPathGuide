import { useState } from "react";
import SubjectForm from "./components/SubjectForm";
import ResultsPage from "./components/ResultsPage";
import ChatAssistant from "./components/ChatAssistant";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ApplicationDates from "./components/ApplicationDates";
import ImprovementAdvisor from "./components/ImprovementAdvisor";
import TVETColleges from "./components/TVETColleges";
import Bursaries from "./components/Bursaries";
import CareerQuiz from "./components/CareerQuiz";
import SubjectCombinations from "./components/SubjectCombinations";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home");

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const apsResponse = await fetch(
        "https://studentpathguide-production.up.railway.app/api/aps/calculate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjects: formData.subjects }),
        },
      );
      const apsData = await apsResponse.json();
      const aps = apsData.aps;

      const coursesResponse = await fetch(
        `https://studentpathguide-production.up.railway.app/api/courses/match?aps=${aps}`,
      );
      const coursesData = await coursesResponse.json();

      setResult({
        ...formData,
        aps,
        courses: coursesData.courses,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    console.log("Current view:", view);
    if (view === "applications") {
      return <ApplicationDates />;
    }
    if (view === "improvement") {
      return <ImprovementAdvisor />;
    }
    if (view === "tvet") {
      return <TVETColleges />;
    }

    if (view === "bursaries") {
      return <Bursaries />;
    }
    if (view === "combinations") {
      return <SubjectCombinations />;
    }

    if (view === "quiz") {
      return <CareerQuiz />;
    }
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-blue-900 font-semibold text-lg">
            Finding your path...
          </p>
        </div>
      );
    }
    if (!result) {
      return <SubjectForm onSubmit={handleSubmit} />;
    }
    return <ResultsPage result={result} onStartOver={() => setResult(null)} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar view={view} setView={setView} />
      <div className="py-10 px-4">{renderContent()}</div>
      <ChatAssistant result={result} />
      <Footer />
    </div>
  );
}

export default App;
