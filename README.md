# 🧠 Task Manager with Gemini AI Integration

A focused and minimal Task Management system built with **Next.js 15 App Router**, powered by **TypeScript** and styled with **Tailwind CSS + shadcn/ui**. Includes Gemini AI integration to generate actionable subtasks.

---

## ✨ Features

- ✅ Add / Edit / Delete tasks
- ✅ Toggle task status (pending / completed)
- ✅ Due date and description support
- ✅ Generate 3–5 subtasks using **Gemini AI**
- ✅ Subtask status sync with parent task
- ✅ Clean reducer structure using **FSM pattern**

---

## 📦 Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **React Context + Reducer (FSM style)**
- **Google Gemini AI (API integration)**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tauhid-ahmed/task-manager-ai.git
cd task-manager-ai
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file using the provided `.env.example`:

```env
# .env.local
GEMINI_API_KEY=your-real-google-api-key
```

### 4. Run the Development Server

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🚀 AI Integration: How It Works

- Each task has a **“Suggest Subtasks”** button
- On click, Gemini AI is called with the task title
- AI returns 3–5 smaller subtasks (e.g. for “Plan birthday party”)
- Subtasks are shown below the main task
- If Gemini API fails, user is shown a graceful fallback

---

## 💡 FSM-based State Management

This project uses a **Finite State Machine (FSM)**-inspired reducer structure to manage UI states. States include:

- `idle`
- `editing`
- `deleting`
- `readyToAddTask`
- `generateSubTask`

Each state has its own clearly defined behavior, making the logic easier to follow and debug.

> 💬 _Even though I’m still learning FSM patterns, implementing this approach helped me better understand predictable state modeling in real-world React apps._

---

## 🧪 Example `.env.example`

```env
# .env.example

# Required to access Google Gemini AI
GEMINI_API_KEY=your-google-api-key-here
```

---

## 🧠 Challenges Faced

- Modeling multiple UI states cleanly with reducer logic
- Learning and applying FSM principles while building
- Handling API communication without backend/database
- Keeping components clean and stateless where possible

---

## 🧪 Additional Notes

This project was a great learning experience. I focused on:

- Building clean and minimal task logic
- Exploring FSM-based reducer design
- Integrating Gemini AI for practical feature extension
- Writing readable and maintainable code from the start

---

## 📮 Submission Details

- ✅ Public GitHub repo with `.env.example`
- ✅ Clear commit history
- ✅ This `README.md` with all setup + explanation
- ✅ Email to: **tanvir@passlimits.com**

---

## 🙏 Final Note

This project was intentionally kept **focused and functional**. Instead of overloading features or using a database, I chose to:

- Build from scratch using **only frontend state**
- Ensure smooth task/subtask logic
- Apply **real-world state patterns** while still learning

Thank you for reviewing!

---

## 📫 Contact

**Tauhid Ahmed**  
🔗 [Portfolio](https://tauhidahmed.vercel.app)  
📧 tauhidahmed.dev@gmail.com
