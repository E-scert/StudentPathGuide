import { useState } from "react";

function ChatAssistant({ result }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am your StudentPathGuide assistant. Ask me anything about your results, courses, or career paths!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://studentpathguide-production.up.railway.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          context: {
            grade: result?.grade || null,
            aps: result?.aps || null,
            targetCareer: result?.targetCareer || null,
          },
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I am having trouble responding right now. Please try again.",
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 flex flex-col border border-gray-200">
          <div className="bg-blue-900 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
            <div>
              <p className="font-bold">AI Assistant</p>
              <p className="text-xs text-blue-200">StudentPathGuide</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3 p-4 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                    msg.role === "user"
                      ? "bg-blue-900 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 border-t border-gray-200">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition duration-300"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default ChatAssistant;
