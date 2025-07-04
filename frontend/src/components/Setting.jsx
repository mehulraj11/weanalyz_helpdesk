import  { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import "../styles/setting.css";

const sections = [
  {
    title: "General",
    items: [
      { label: "Language", extra: <span className="badge">BM</span> },
      { label: "Data Backup", checked: true },
    ],
  },
  {
    title: "Connect To",
    items: [
      { label: "GoDash", checked: true },
      { label: "SuperController", checked: true },
    ],
  },
  {
    title: "Email",
    items: [{ label: "Enable SMTP", checked: true }],
  },
  {
    title: "Authorization",
    items: [
      { label: "Edit authorization", checked: true },
      {
        label: "Authority Level",
        dropdown: true,
      },
    ],
  },
  {
    title: "Notification",
    items: [{ label: "Enable Notification", checked: true }],
  },
];

function Setting() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Setting</h2>

      {sections.map((section, index) => (
        <div key={index} className="setting-section">
          <div className="section-header" onClick={() => toggleSection(index)}>
            <span>{section.title}</span>
            <FaChevronDown />
          </div>

          {openSection === index && (
            <div className="section-items">
              {section.items.map((item, i) => (
                <div key={i} className="setting-item">
                  <span>{item.label}</span>

                  {item.extra && item.extra}
                  {item.checked && <FaCheck className="check-icon" />}
                  {item.dropdown && (
                    <select className="dropdown">
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Setting;
