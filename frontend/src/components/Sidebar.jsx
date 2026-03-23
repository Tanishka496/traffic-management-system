const SECTIONS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "drivers", label: "Drivers" },
  { key: "vehicles", label: "Vehicles" },
  { key: "violations", label: "Violations" },
  { key: "challans", label: "Challans" },
  { key: "payments", label: "Payments" },
];

function Sidebar({ active, onChange }) {
  return (
    <aside className="app-sidebar">
      {SECTIONS.map((section) => (
        <button
          key={section.key}
          className={active === section.key ? "sidebar-item active" : "sidebar-item"}
          onClick={() => onChange(section.key)}
          type="button"
        >
          {section.label}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
