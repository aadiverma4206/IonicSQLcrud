const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection crud operation with ionic
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'system',  // apna mysql password
  database: 'ionic_db'
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ");
    console.log(err);
  } else {
    console.log("Database connected ");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



app.get('/', (req, res) => {
  res.send("Backend is running ");
});


app.post('/add-user', (req, res) => {

  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error inserting data" });
    } else {
      res.json({ message: "User added successfully " });
    }
  });

});

app.get('/get-users', (req, res) => {

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching data" });
    } else {
      res.json(result);
    }
  });

});

app.put('/update-user/:id', (req, res) => {

  const id = req.params.id;
  const { name, email } = req.body;

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "User updated successfully " });
  });

});

app.delete('/delete-user/:id', (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "User deleted successfully " });
  });

});