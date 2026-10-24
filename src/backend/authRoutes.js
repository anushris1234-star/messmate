const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticator } = require("otplib");
const pool = require("./db");
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

const sign = (u) =>
  jwt.sign({ user_id: u.user_id, role: u.role }, SECRET, { expiresIn: "2h" });

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await pool.query(
      "SELECT user_id,name,email,role,password,totp_enabled FROM users WHERE email=$1",
      [email]
    );
    const u = r.rows[0];
    if (!u || !(await bcrypt.compare(String(password || ""), u.password)))
      return res.status(401).json({ message: "Invalid email or password" });
    const user = { user_id: u.user_id, name: u.name, email: u.email, role: u.role };
    if (u.totp_enabled) {
      const tempToken = jwt.sign({ user_id: u.user_id, mfa: true }, SECRET, { expiresIn: "5m" });
      return res.json({ mfaRequired: true, tempToken });
    }
    res.json({ message: "Login successful", user, token: sign(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/api/login/verify-totp", async (req, res) => {
  try {
    const { tempToken, code } = req.body;
    const p = jwt.verify(tempToken, SECRET);
    if (!p.mfa) throw new Error("bad token");
    const r = await pool.query(
      "SELECT user_id,name,email,role,totp_secret FROM users WHERE user_id=$1",
      [p.user_id]
    );
    const u = r.rows[0];
    if (!u || !authenticator.check(String(code), u.totp_secret))
      return res.status(401).json({ message: "Invalid authenticator code" });
    const user = { user_id: u.user_id, name: u.name, email: u.email, role: u.role };
    res.json({ message: "Login successful", user, token: sign(user) });
  } catch (e) {
    res.status(401).json({ message: "Invalid or expired MFA session" });
  }
});

module.exports = router;
