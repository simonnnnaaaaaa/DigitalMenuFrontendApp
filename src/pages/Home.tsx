import { useNavigate } from "react-router-dom";
import { useLanguage } from "LanguageContext";
import resources from "../resources"

const Home = () => {

  const navigate = useNavigate()

  const { language, setLanguage } = useLanguage()
  const t = resources[language]


  return (
    <div className="min-h-screen px-6 pt-6">
      <div className="w-full flex justify-start mb-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "ro")}
          className="px-3 py-2 rounded border bg-white shadow"
        >
          <option value="en">English</option>
          <option value="ro">Română</option>
        </select>
      </div>

      <div className="flex items-center justify-center text-center flex-col min-h-[calc(100vh-6rem)]">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">{t.subtitle}</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600 transition"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}

export default Home