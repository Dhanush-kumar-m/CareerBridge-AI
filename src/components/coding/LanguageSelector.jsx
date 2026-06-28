export default function LanguageSelector({
  language,
  setLanguage,
}) {
  const languages = [
    {
      value: "C",
      icon: "⚙️",
    },
    {
      value: "C++",
      icon: "🚀",
    },
    {
      value: "Java",
      icon: "☕",
    },
    {
      value: "Python",
      icon: "🐍",
    },
    {
      value: "JavaScript",
      icon: "🟨",
    },
  ];

  return (
    <div className="language-selector">

      <label>
        Programming Language
      </label>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
        className="language-select"
      >

        {languages.map((lang) => (

          <option
            key={lang.value}
            value={lang.value}
          >
            {lang.icon} {lang.value}
          </option>

        ))}

      </select>

    </div>
  );
}