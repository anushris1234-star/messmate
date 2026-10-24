require("dotenv").config();
const { authenticator } = require("otplib");
const QR = require("qrcode");
const pool = require("./db");
(async () => {
  const email = process.argv[2];
  const secret = authenticator.generateSecret();
  const r = await pool.query("UPDATE users SET totp_secret=$1,totp_enabled=true WHERE email=$2 RETURNING email", [secret, email]);
  if (!r.rowCount) { console.log("User not found"); process.exit(1); }
  console.log(await QR.toString(authenticator.keyuri(email, "MessMate", secret), { type: "terminal", small: true }));
  console.log("Secret:", secret);
  process.exit(0);
})();
