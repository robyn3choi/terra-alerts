import { testNotify } from "utils/helpers";

export default function TestNotification() {
  return (
    <div style={{ width: "100%", marginTop: "16px" }}>
      <button
        onClick={testNotify}
        style={{
          background: "var(--color_button)",
          fontSize: "medium",
          padding: "4px 8px",
        }}
      >
        Trigger test alert
      </button>
    </div>
  );
}
