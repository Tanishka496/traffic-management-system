const SECTIONS = [
  { key: "dashboard", label: "Dashboard", icon: "DB", meta: "Live status" },
  { key: "drivers", label: "Drivers", icon: "DR", meta: "Identity" },
  { key: "vehicles", label: "Vehicles", icon: "VH", meta: "Fleet" },
  { key: "violations", label: "Violations", icon: "VI", meta: "Rules" },
  { key: "challans", label: "Challans", icon: "CH", meta: "Enforcement" },
  { key: "payments", label: "Payments", icon: "PM", meta: "Collections" },
];

function Sidebar({ active, onChange }) {
  return (
    <aside className="app-sidebar">
      {SECTIONS.map((section) => (
        <button
          key={section.key}
          className={
            active === section.key ? "sidebar-item active" : "sidebar-item"
          }
          onClick={() => onChange(section.key)}
          type="button"
        >
          <span className="item-icon">{section.icon}</span>
          <span className="item-copy">
            <strong>{section.label}</strong>
            <small>{section.meta}</small>
          </span>
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
