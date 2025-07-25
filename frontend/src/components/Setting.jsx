import { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const sections = [
  {
    title: "General",
    items: [
      { label: "Language", type: "extra", value: "BM" },
      { label: "Data Backup", type: "checkbox", checked: true },
    ],
  },
  {
    title: "Connect To",
    items: [
      { label: "GoDash", type: "checkbox", checked: true },
      { label: "SuperController", type: "checkbox", checked: true },
    ],
  },
  {
    title: "Email",
    items: [{ label: "Enable SMTP", type: "checkbox", checked: true }],
  },
  {
    title: "Authorization",
    items: [
      { label: "Edit authorization", type: "checkbox", checked: true },
      {
        label: "Authority Level",
        type: "dropdown",
        options: ["User", "Operation", "Technical", "Admin"],
      },
    ],
  },
  {
    title: "Notification",
    items: [{ label: "Enable Notification", type: "checkbox", checked: true }],
  },
];

function Setting() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        Settings
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden
                                      transform transition-transform duration-200 hover:scale-[1.01]"
          >
            <div
              onClick={() => toggleSection(index)}
              className="flex items-center justify-between p-5 cursor-pointer
                         bg-gradient-to-r from-blue-500 to-purple-500 text-white
                         hover:from-blue-600 hover:to-purple-600 transition duration-300
                         font-semibold text-lg rounded-t-xl"
            >
              <span>{section.title}</span>
              <FaChevronDown
                className={`transform transition-transform duration-300
                            ${openSection === index ? "rotate-180" : ""}`}
              />
            </div>

            {openSection === index && (
              <div className="p-5 border-t border-gray-200 space-y-4">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-800 text-base font-medium">
                      {item.label}
                    </span>

                    {item.type === "extra" && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {item.value}
                      </span>
                    )}

                    {item.type === "checkbox" && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}

                    {item.type === "dropdown" && item.options && (
                      <div className="relative">
                        <select
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                                     focus:outline-none focus:ring-2 focus:ring-blue-500
                                     transition duration-200 appearance-none bg-white pr-8 text-gray-700"
                        >
                          {item.options.map((option, optIndex) => (
                            <option key={optIndex} value={option.toLowerCase()}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Setting;
