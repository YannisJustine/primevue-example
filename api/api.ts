import express from "express";
import { Database } from "./database";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Routes
app.post("/api/datatable", async (req, res) => {
  const { page, perPage, sortField, sortOrder } = req.body;

  // Simulate a delay
  await delay(100 + Math.random() * 500);
  const items = Database.getDatatable(page, perPage, sortField, sortOrder);

  res.json(items);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
