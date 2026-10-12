# TESA OAU Website — Full-stack MERN starter

A responsive public website and executive content-management portal for the Technology and Engineering Students' Association (TESA), Obafemi Awolowo University, Ile-Ife.

**Stack:** React + Vite, Node.js (ES modules / ES6+), Express, MongoDB/Mongoose, JWT authentication, bcrypt password hashing, Multer image uploads, and TipTap rich-text editing.

## Features

- Public landing page with TESA motto, about section, engineering disciplines, articles, events and executive council.
- `/sign-in` executive sign-in; `/admin` protected management area.
- Create, read, update and delete articles, events, and leadership profiles.
- Rich-text article editor: headings, bold, italic, underline, links, images, blockquotes, numbered/bulleted lists, undo and redo.
- Image uploads for articles, events and leadership profiles (JPG, PNG, WEBP, GIF; 5 MB limit).
- Responsive layout for desktop and mobile.
- API login rate limit, Helmet security headers, and password hashing.

## Requirements

- Node.js 20 LTS or later (includes npm)
- MongoDB Community Server running locally **or** a MongoDB Atlas connection string
- Internet access for the first dependency installation and Google Fonts

## Run locally (Windows)

1. Install Node.js from https://nodejs.org/ and MongoDB Community Server from https://www.mongodb.com/try/download/community (or create a free MongoDB Atlas database at https://www.mongodb.com/atlas).
2. Extract this project ZIP to a folder, for example `C:\Users\YourName\Documents\tesa-website`.
3. Open the extracted `tesa-website` folder in VS Code. In VS Code choose **Terminal → New Terminal**.
4. Configure the backend environment. In the terminal, run:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

5. Open `backend/.env`. Set `MONGODB_URI` to your local MongoDB URI (`mongodb://127.0.0.1:27017/tesa_oau`) or your Atlas connection string. Set `JWT_SECRET` to a long, random secret. Change `ADMIN_EMAIL` and set `ADMIN_PASSWORD` to a unique password of at least 12 characters. Do not share or commit this file.
6. Configure the frontend environment (optional, the default works locally):

   ```powershell
   Copy-Item frontend/.env.example frontend/.env
   ```

7. Install dependencies from the project root:

   ```powershell
   npm install
   npm run install:all
   ```

8. Create the first administrator account:

   ```powershell
   npm run seed:admin --prefix backend
   ```

   The script creates the admin from the values in `backend/.env`. It will not overwrite an existing account.

9. Start both servers in the project root:

   ```powershell
   npm run dev
   ```

10. Open the public website at **http://localhost:5173**. Open **http://localhost:5173/sign-in** to sign in with the admin email/password you configured. The API health check is at **http://localhost:5000/api/health**.

### Start the servers separately

If you prefer two terminals, run `npm run dev --prefix backend` in terminal 1 and `npm run dev --prefix frontend` in terminal 2.

## First-time content setup

- Sign in, then use the **Leadership** tab to create or edit the council profiles. The supplied names, roles, disciplines and phone numbers are included as starter content on the public homepage; add official portraits through the portal.
- Create events and articles from the portal. Article content can be formatted in the rich-text editor.
- The initial leadership cards are fallback display data only; save records in the portal to persist them in MongoDB and manage them through CRUD.
- Uploads are stored in `backend/uploads`. Back up that directory along with your MongoDB database.

## API overview

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/sign-in` | Public, rate-limited | Sign in and receive a JWT |
| GET | `/api/auth/me` | JWT | Validate session |
| GET | `/api/articles` | Public | List published articles |
| GET | `/api/articles/:idOrSlug` | Public | Read one article |
| POST/PUT/DELETE | `/api/articles` and `/api/articles/:id` | JWT | Manage articles |
| GET | `/api/events` | Public | List published events |
| POST/PUT/DELETE | `/api/events` and `/api/events/:id` | JWT | Manage events |
| GET | `/api/leaders` | Public | List active leaders |
| POST/PUT/DELETE | `/api/leaders` and `/api/leaders/:id` | JWT | Manage leaders |
| POST | `/api/uploads` | JWT | Upload an image |
| GET | `/api/health` | Public | API health check |

Authenticated requests use `Authorization: Bearer <token>`. The editor stores article body as HTML. If you later host this publicly, configure HTTPS, a strong JWT secret, database backups, a persistent upload store/object storage, and a real administrator email/password. Review all phone numbers, names, and official association contact details before publishing.

## Notes / next steps before production

- This is a working starter, not a deployed website; it runs on your computer until you deploy it.
- Replace placeholder social links and generic artwork with approved TESA branding, official seal and portraits.
- Current admin creation is intentionally done via a local seed command; there is no public registration route.
- The simple rich-text editor allows inserting an image by URL; use the upload control first and paste the resulting `/uploads/...` path into the editor's image tool.
- Use an HTTPS origin and a production database configuration before deployment.
