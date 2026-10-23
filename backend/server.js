require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "shramsetu.sqlite");

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("ERROR: Set JWT_SECRET in .env to a random secret of at least 32 characters.");
  process.exit(1);
}

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*").split(",").map(s => s.trim());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS."));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-7", legacyHeaders: false }));

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL UNIQUE,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  city TEXT DEFAULT '',
  skill TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'worker' CHECK(role IN ('worker','employer','admin')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT NOT NULL DEFAULT '',
  min_salary INTEGER DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'Full-time',
  icon TEXT DEFAULT '💼',
  experience TEXT DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT '',
  employer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','closed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK(status IN ('submitted','reviewing','shortlisted','rejected','hired')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, job_id)
);
`);

const jobCount = db.prepare("SELECT COUNT(*) AS n FROM jobs").get().n;
if (jobCount === 0) {
  const seed = db.prepare(`INSERT INTO jobs
    (title,company,location,salary,min_salary,type,icon,experience,description,category)
    VALUES (@title,@company,@location,@salary,@minSalary,@type,@icon,@experience,@description,@category)`);
  const starterJobs = [
    {title:"इलेक्ट्रिशियन (अनुभवी)",company:"श्री साई सर्विसेज",location:"अकोला",salary:"₹15,000 – 20,000 / माह",minSalary:15000,type:"Full-time",icon:"🧑‍🔧",experience:"1–3 साल",description:"घरेलू और कमर्शियल साइट पर बेसिक वायरिंग, इलेक्ट्रिकल इंस्टॉलेशन और मेंटेनेंस। सुरक्षा नियमों का पालन आवश्यक है।",category:"Electrician"},
    {title:"प्लंबर (जूनियर)",company:"सिटी बिल्डर्स",location:"नागपुर",salary:"₹12,000 – 18,000 / माह",minSalary:12000,type:"Full-time",icon:"🔧",experience:"नया / 1 साल से कम",description:"पाइप फिटिंग, लीकेज जाँच और सामान्य प्लंबिंग कार्य। प्रशिक्षण और काम सीखने का अवसर।",category:"Plumber"},
    {title:"निर्माण मजदूर",company:"विश्वास कंस्ट्रक्शन",location:"अकोला",salary:"₹10,000 – 15,000 / माह",minSalary:10000,type:"Contract",icon:"👷",experience:"नया / 1 साल से कम",description:"निर्माण स्थल पर सामान्य मजदूरी, सामग्री व्यवस्थित करना और टीम के साथ काम करना।",category:"General Worker"},
    {title:"कंप्यूटर ऑपरेटर",company:"स्मार्ट ऑफिस सॉल्यूशन्स",location:"पुणे",salary:"₹14,000 – 19,000 / माह",minSalary:14000,type:"Full-time",icon:"💻",experience:"1–3 साल",description:"डेटा एंट्री, दस्तावेज़ तैयार करना और बुनियादी MS Office कार्य। कंप्यूटर का सामान्य ज्ञान आवश्यक।",category:"Computer Operator"},
    {title:"डिलीवरी ड्राइवर",company:"लोकल लॉजिस्टिक्स",location:"मुंबई",salary:"₹18,000 – 25,000 / माह",minSalary:18000,type:"Full-time",icon:"🚚",experience:"1–3 साल",description:"स्थानीय डिलीवरी और सामान की सुरक्षित ढुलाई। वैध ड्राइविंग लाइसेंस आवश्यक।",category:"Driver"},
    {title:"कारपेंटर हेल्पर",company:"न्यू होम फर्नीचर",location:"नासिक",salary:"₹11,000 – 16,000 / माह",minSalary:11000,type:"Part-time",icon:"🪚",experience:"नया / 1 साल से कम",description:"फर्नीचर बनाने और इंस्टॉलेशन में सहायता। हाथ के औजारों की बुनियादी जानकारी उपयोगी।",category:"Carpenter"}
  ];
  const tx = db.transaction(rows => rows.forEach(row => seed.run(row)));
  tx(starterJobs);
}

function publicUser(user) {
  return { id:user.id, name:user.name, mobile:user.mobile, email:user.email, city:user.city, skill:user.skill, experience:user.experience, role:user.role, createdAt:user.created_at };
}
function createToken(user) {
  return jwt.sign({ sub:String(user.id), role:user.role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d", issuer:"shramsetu-api", audience:"shramsetu-app" });
}
function auth(req,res,next) {
  const value = req.headers.authorization || "";
  const match = value.match(/^Bearer\s+(.+)$/i);
  if (!match) return res.status(401).json({ error:"Authentication required." });
  try {
    const payload = jwt.verify(match[1], JWT_SECRET, { issuer:"shramsetu-api", audience:"shramsetu-app" });
    const user = db.prepare("SELECT * FROM users WHERE id=?").get(Number(payload.sub));
    if (!user) return res.status(401).json({ error:"Account not found." });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error:"Invalid or expired token." });
  }
}
function requireRole(...roles) {
  return (req,res,next) => roles.includes(req.user.role) ? next() : res.status(403).json({error:"You do not have permission for this action."});
}
function cleanString(value, max=200) {
  return typeof value === "string" ? value.trim().slice(0,max) : "";
}

app.get("/api/health", (req,res) => res.json({ok:true,service:"ShramSetu API",time:new Date().toISOString()}));

app.post("/api/auth/register", async (req,res) => {
  try {
    const name=cleanString(req.body.name,100);
    const mobile=cleanString(req.body.mobile,10);
    const email=cleanString(req.body.email,254).toLowerCase() || null;
    const password=typeof req.body.password==="string" ? req.body.password : "";
    const city=cleanString(req.body.city,100);
    const skill=cleanString(req.body.skill,100);
    const experience=cleanString(req.body.experience,80);
    const role=req.body.role==="employer" ? "employer" : "worker";
    if (!name || !/^\d{10}$/.test(mobile)) return res.status(400).json({error:"Name and valid 10-digit mobile number are required."});
    if (password.length < 8) return res.status(400).json({error:"Password must be at least 8 characters."});
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({error:"Enter a valid email address."});
    const password_hash=await bcrypt.hash(password,12);
    const result=db.prepare(`INSERT INTO users(name,mobile,email,password_hash,city,skill,experience,role)
      VALUES(?,?,?,?,?,?,?,?)`).run(name,mobile,email,password_hash,city,skill,experience,role);
    const user=db.prepare("SELECT * FROM users WHERE id=?").get(result.lastInsertRowid);
    res.status(201).json({token:createToken(user),user:publicUser(user)});
  } catch(err) {
    if (String(err.code)==="SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({error:"Mobile number or email is already registered."});
    console.error(err); res.status(500).json({error:"Could not create account."});
  }
});

app.post("/api/auth/login", async (req,res) => {
  const mobile=cleanString(req.body.mobile,10);
  const password=typeof req.body.password==="string" ? req.body.password : "";
  const user=db.prepare("SELECT * FROM users WHERE mobile=?").get(mobile);
  if (!user || !(await bcrypt.compare(password,user.password_hash))) return res.status(401).json({error:"Incorrect mobile number or password."});
  res.json({token:createToken(user),user:publicUser(user)});
});

app.get("/api/me",auth,(req,res)=>res.json({user:publicUser(req.user)}));
app.patch("/api/me",auth,(req,res)=>{
  const name=cleanString(req.body.name,100);
  const mobile=cleanString(req.body.mobile,10);
  if (!name || !/^\d{10}$/.test(mobile)) return res.status(400).json({error:"Name and valid 10-digit mobile number are required."});
  try {
    db.prepare("UPDATE users SET name=?,mobile=?,email=?,city=?,skill=?,experience=? WHERE id=?").run(
      name,mobile,cleanString(req.body.email,254).toLowerCase()||null,cleanString(req.body.city,100),
      cleanString(req.body.skill,100),cleanString(req.body.experience,80),req.user.id);
    res.json({user:publicUser(db.prepare("SELECT * FROM users WHERE id=?").get(req.user.id))});
  } catch(err) {
    if (String(err.code)==="SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({error:"Mobile number or email is already registered."});
    res.status(500).json({error:"Could not update profile."});
  }
});

app.get("/api/jobs",(req,res)=>{
  const q=cleanString(req.query.q,120).toLowerCase();
  const location=cleanString(req.query.location,100).toLowerCase();
  const type=cleanString(req.query.type,30);
  const category=cleanString(req.query.category,100).toLowerCase();
  let rows=db.prepare("SELECT * FROM jobs WHERE status='active' ORDER BY created_at DESC").all();
  rows=rows.filter(j=>(!q||[j.title,j.company,j.location,j.description,j.category].join(" ").toLowerCase().includes(q))&&(!location||j.location.toLowerCase().includes(location))&&(!type||type==="all"||j.type===type)&&(!category||j.category.toLowerCase().includes(category)));
  res.json({jobs:rows});
});
app.get("/api/jobs/:id",(req,res)=>{
  const job=db.prepare("SELECT * FROM jobs WHERE id=? AND status='active'").get(Number(req.params.id));
  if(!job)return res.status(404).json({error:"Job not found."});
  res.json({job});
});
app.post("/api/jobs",auth,requireRole("employer","admin"),(req,res)=>{
  const title=cleanString(req.body.title,150),company=cleanString(req.body.company,150),location=cleanString(req.body.location,100);
  const description=cleanString(req.body.description,3000);
  if(!title||!company||!location||!description)return res.status(400).json({error:"Title, company, location and description are required."});
  const result=db.prepare(`INSERT INTO jobs(title,company,location,salary,min_salary,type,icon,experience,description,category,employer_id)
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`).run(title,company,location,cleanString(req.body.salary,100),Number(req.body.minSalary)||0,
    ["Full-time","Part-time","Contract"].includes(req.body.type)?req.body.type:"Full-time",cleanString(req.body.icon,10)||"💼",
    cleanString(req.body.experience,80),description,cleanString(req.body.category,100),req.user.id);
  res.status(201).json({job:db.prepare("SELECT * FROM jobs WHERE id=?").get(result.lastInsertRowid)});
});
app.patch("/api/jobs/:id/close",auth,(req,res)=>{
  const job=db.prepare("SELECT * FROM jobs WHERE id=?").get(Number(req.params.id));
  if(!job)return res.status(404).json({error:"Job not found."});
  if(req.user.role!=="admin"&&job.employer_id!==req.user.id)return res.status(403).json({error:"Only the job owner or admin can close this job."});
  db.prepare("UPDATE jobs SET status='closed' WHERE id=?").run(job.id);
  res.json({ok:true});
});

app.post("/api/jobs/:id/apply",auth,requireRole("worker","admin"),(req,res)=>{
  const job=db.prepare("SELECT id FROM jobs WHERE id=? AND status='active'").get(Number(req.params.id));
  if(!job)return res.status(404).json({error:"Job not found or no longer active."});
  try{
    const result=db.prepare("INSERT INTO applications(user_id,job_id,message) VALUES(?,?,?)")
      .run(req.user.id,job.id,cleanString(req.body.message,1000));
    res.status(201).json({application:db.prepare("SELECT * FROM applications WHERE id=?").get(result.lastInsertRowid)});
  }catch(err){
    if(String(err.code)==="SQLITE_CONSTRAINT_UNIQUE")return res.status(409).json({error:"You have already applied for this job."});
    console.error(err);res.status(500).json({error:"Could not submit application."});
  }
});
app.get("/api/applications/me",auth,(req,res)=>{
  const applications=db.prepare(`SELECT a.id,a.job_id,a.message,a.status,a.created_at,
    j.title,j.company,j.location,j.salary,j.type
    FROM applications a JOIN jobs j ON j.id=a.job_id WHERE a.user_id=? ORDER BY a.created_at DESC`).all(req.user.id);
  res.json({applications});
});
app.get("/api/employer/applications",auth,requireRole("employer","admin"),(req,res)=>{
  const sql=`SELECT a.id,a.status,a.message,a.created_at,u.name AS applicant_name,u.mobile AS applicant_mobile,
    u.city AS applicant_city,u.skill AS applicant_skill,j.title AS job_title,j.id AS job_id
    FROM applications a JOIN users u ON u.id=a.user_id JOIN jobs j ON j.id=a.job_id
    WHERE ${req.user.role==="admin"?"1=1":"j.employer_id=?"} ORDER BY a.created_at DESC`;
  const rows=req.user.role==="admin"?db.prepare(sql).all():db.prepare(sql).all(req.user.id);
  res.json({applications:rows});
});
app.patch("/api/applications/:id/status",auth,requireRole("employer","admin"),(req,res)=>{
  const allowed=["reviewing","shortlisted","rejected","hired"];
  if(!allowed.includes(req.body.status))return res.status(400).json({error:"Invalid application status."});
  const application=db.prepare(`SELECT a.id,j.employer_id FROM applications a JOIN jobs j ON j.id=a.job_id WHERE a.id=?`).get(Number(req.params.id));
  if(!application)return res.status(404).json({error:"Application not found."});
  if(req.user.role!=="admin"&&application.employer_id!==req.user.id)return res.status(403).json({error:"You cannot update this application."});
  db.prepare("UPDATE applications SET status=? WHERE id=?").run(req.body.status,application.id);
  res.json({ok:true});
});

app.use((req,res)=>res.status(404).json({error:"API route not found."}));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:"Unexpected server error."})});

app.listen(PORT,()=>console.log(`ShramSetu API running on port ${PORT}`));
