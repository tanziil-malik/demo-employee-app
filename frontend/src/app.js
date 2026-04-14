import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    await axios.post(API, { name, role });
    setName("");
    setRole("");
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee App</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button onClick={addEmployee}>Add</button>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.role}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;