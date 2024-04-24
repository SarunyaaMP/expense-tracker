const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const details = [
  {
    id: 1,
    title: "Expense 1",
    amount: 10203,
    type: 1,
    description: "Expense 1 Description",
    date: "2024-12-24"
  },
  {
    id: 2,
    title: "Expense 2",
    amount: 500,
    type: 2,
    description: "Expense 2 Description",
    date: "2024-01-02"
  },
  {
    id: 3,
    title: "Expense 3",
    amount: 20000,
    type: 1,
    description: "Expense 3 Description",
    date: "2024-01-03"
  },
  {
    id: 4,
    title: "Expense 4",
    amount: 1500,
    type: 1,
    description: "Expense 4 Description",
    date: "2024-01-05"
  },
  {
    id: 5,
    title: "Expense 5",
    amount: 1945,
    type: 2,
    description: "Expense 5 Description",
    date: "2024-01-02"
  }
];

// Get all users
app.get("/expenses", async (req, res) => {
  try {
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = details.find((detail) => detail.id === parseInt(id));

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// BASE URL
// http://localhost:8000/