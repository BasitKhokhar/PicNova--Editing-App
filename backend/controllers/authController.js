require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log("Signup data:", { name, email, password, phone });
    const hashed = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashed);
    const user = await prisma.users.create({ data: { name, email, password: hashed, phone } });
    console.log("User created:", user);
    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email,password);
  const user = await prisma.users.findUnique({ where: { email } });
  console.log("User found:", user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, userId: user.user_id, email: user.email });
};
