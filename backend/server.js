const express = require('express');
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app =express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const dbURI = "mongodb://127.0.0.1:27017/authentication";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



const User = mongoose.model('User', {
  username: String,
  password: String,
});

// JWT secret (should be kept secret and not hard-coded)
const secretKey = 'mysecretkey';

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Login and generate a JWT token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid username or password');

  const token = jwt.sign({ username: user.username }, secretKey);
  res.header('Authorization', token).send('Login successful');
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
