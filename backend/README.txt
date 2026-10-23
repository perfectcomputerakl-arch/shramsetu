ShramSetu Backend (REST API)

This backend provides:
- Worker/employer account registration and login
- Password hashing (bcrypt)
- JWT authentication
- Profile read/update
- Public job list, search and details
- Employer job posting and closing
- Job applications and application status
- SQLite database with seeded demo jobs
- Basic security headers, request size limit, and rate limiting

Requirements:
- Node.js 20+
- npm
- A host that supports a persistent disk for SQLite (or migrate to PostgreSQL for ephemeral/serverless hosting)

Run locally:
1. Open a terminal in the backend folder.
2. Copy .env.example to .env.
3. Set JWT_SECRET to a unique random secret (at least 32 characters).
4. Run: npm install
5. Run: npm start
6. Test: http://localhost:3000/api/health

API endpoints:
GET    /api/health
POST   /api/auth/register       body: {name,mobile,password,email?,city?,skill?,experience?,role?}
POST   /api/auth/login          body: {mobile,password}
GET    /api/me                  Bearer token required
PATCH  /api/me                  Bearer token required; {name,mobile,email?,city?,skill?,experience?}
GET    /api/jobs                optional query: q, location, type, category
GET    /api/jobs/:id
POST   /api/jobs                employer/admin token; {title,company,location,description,salary?,minSalary?,type?,icon?,experience?,category?}
PATCH  /api/jobs/:id/close      job owner/admin token
POST   /api/jobs/:id/apply      worker/admin token; {message?}
GET    /api/applications/me     Bearer token required
GET    /api/employer/applications employer/admin token
PATCH  /api/applications/:id/status employer/admin token; {status:"reviewing"|"shortlisted"|"rejected"|"hired"}

Important:
- This backend is not yet wired into the previously delivered static frontend. The frontend currently stores profiles and applications in browser localStorage. Update app.js to call these API endpoints and store the returned JWT securely for your deployment.
- For quick testing only, a token can be stored in sessionStorage; for production, consider a secure HttpOnly cookie/BFF design and HTTPS.
- First registered account is NOT automatically admin. Employer accounts may post jobs; workers may apply. Admin provisioning should be done manually/securely by the server operator.
- Set ALLOWED_ORIGINS to your exact frontend origin(s) in production, e.g. https://yourname.github.io.
- Do not deploy with the example JWT secret. Never expose secrets in frontend JavaScript.
- SQLite is suitable for a persistent single-instance server. For multiple instances/serverless hosts use PostgreSQL.
- This is a starter backend, not a fully audited production service. Add phone OTP verification, password reset, consent/privacy notice, backups, moderation, and monitoring before handling real users.

Frontend integration note:
The parent folder contains the connected frontend. The default API base is same-origin. For separate hosting, edit ../api-config.js to the deployed backend origin and configure ALLOWED_ORIGINS on the backend to the exact frontend origin.
