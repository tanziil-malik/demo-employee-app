const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let employees = [
  { id: 1, name: "Ali", role: "DevOps Engineer" },
  { id: 2, name: "Sara", role: "Frontend Developer" }
];

// GET all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// ADD employee
app.post("/employees", (req, res) => {
  const newEmp = {
    id: employees.length + 1,
    name: req.body.name,
    role: req.body.role
  };
  employees.push(newEmp);
  res.json(newEmp);
});

// DELETE employee
app.delete("/employees/:id", (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});