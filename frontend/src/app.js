import React, { useEffect, useState } from "react";
import axios from "axios";

// 👇 Smart API detection
const getAPI = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000/employees";
  }
  return "http://backend-service:5000/employees";
};

const API = getAPI();

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API);
      setEmployees(res.data);
    } catch (err) {
      setError("❌ Cannot connect to backend");
    }
    setLoading(false);
  };

  const addEmployee = async () => {
    if (!name || !role) return;

    try {
      await axios.post(API, { name, role });
      setName("");
      setRole("");
      fetchEmployees();
    } catch {
      setError("❌ Failed to add employee");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchEmployees();
    } catch {
      setError("❌ Failed to delete employee");
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      padding: 20,
      border: "1px solid #ddd",
      borderRadius: 10,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>🚀 Employee Manager</h2>

      {/* Error */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {/* Inputs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={{ flex: 1, padding: 8 }}
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={addEmployee}>Add</button>
      </div>

      {/* Loading */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {employees.map((emp) => (
            <li key={emp.id} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee"
            }}>
              <span>
                <b>{emp.name}</b> - {emp.role}
              </span>

              <button onClick={() => deleteEmployee(emp.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;