require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("./db");
(async () => {
  await pool.query("ALTER TABLE users ALTER COLUMN password TYPE TEXT");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS totp_secret TEXT, ADD COLUMN IF NOT EXISTS totp_enabled BOOLEAN DEFAULT false");
  const r = await pool.query("SELECT user_id,password FROM users");
  let n = 0;
  for (const u of r.rows) {
    if (!String(u.password).startsWith("$2")) {
      await pool.query("UPDATE users SET password=$1 WHERE user_id=$2", [await bcrypt.hash(u.password, 10), u.user_id]);
      n++;
    }
  }
  console.log("Hashed", n, "passwords");
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
