const jwt = require("jsonwebtoken");
const STAFF = (process.env.STAFF_ROLES || "admin,manager,staff,mess_admin,supervisor")
  .split(",").map((r) => r.trim().toLowerCase());

function requireAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const t = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!t) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(t, process.env.JWT_SECRET);
    if (req.user.mfa) throw new Error("temporary token");
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireStaff(req, res, next) {
  if (!STAFF.includes(String(req.user.role).toLowerCase()))
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  next();
}

module.exports = { requireAuth, requireStaff };
