🦉 OwlSpot — Online Wall of Life

A personal documentation and reflection platform built using the MERN stack, designed to help users record memories, write reflective blogs, and visualize personal growth over time.

📌 Overview

OwlSpot is a full-stack web application that provides users with a structured space to document life events and express reflections through blogs. Unlike traditional social media platforms, OwlSpot focuses on documentation, clarity, and long-term value rather than engagement metrics.

The platform allows users to capture meaningful experiences, preserve memories with media, and revisit them through a clean chronological interface.

✨ Features
🧠 Blogs

Create, edit, publish, and unpublish blogs

Reflection-focused writing experience

Category-based organization

Comment moderation

Public blog viewing

📌 Memories (Events)

Document real-life events with descriptions

Upload images and videos

Display events in a memories feed

Hover video preview (YouTube-style)

Event detail page with full media view

📊 Dashboard

Manage blogs and events

View published and unpublished content

Approve or unapprove comments

Update events with new media

🔍 Search & Filtering

Search memories and blogs

Category-based filtering

🔐 Authentication

Secure login and registration

Protected dashboard routes

🏗️ Tech Stack
Frontend

React.js

Tailwind CSS

Context API

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

Media Handling

ImageKit (Images & Videos CDN)

🧩 Application Structure
OwlSpot
│
├── Homepage
│   ├── Memories (Events Feed)
│   └── Blogs
│
├── Event Detail Page
├── Blog Detail Page
│
└── Dashboard (Private)
    ├── Create Blog
    ├── Create Event
    ├── Manage Content
    └── Comment Moderation

🗂️ Categories (Unified System)

Both Blogs and Events use the same category system:

Introspection — thoughts and emotions

Insights — lessons and realizations

Evolution — growth and progress

Experiences — lived moments

This ensures consistency and simplifies filtering.

🎥 Media Handling Strategy

Images and videos are stored using ImageKit CDN.

MongoDB stores only media URLs and metadata.

This improves performance, scalability, and loading speed.

🔐 Access Control
Section	Access
Homepage	Public
Memories (Published Events)	Public
Blogs (Published)	Public
Dashboard	Authenticated Users
Draft Content	Owner Only
🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/vinayboggula/OwlSpot.git
cd owlspot

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=xxxx
IMAGEKIT_PRIVATE_KEY=xxxx
IMAGEKIT_URL_ENDPOINT=xxxx

4️⃣ Run Development Server
npm run dev

📈 Future Improvements

Timeline visualization

AI-based reflection summaries

Yearly memory recap

Advanced search filters

Export memories as archive

🎯 Project Philosophy

OwlSpot is designed as a personal space, not a social network.
The goal is to help users document experiences, reflect on them, and observe personal growth over time without the pressure of likes or followers.

👨‍💻 Author

Boggula Vinay
Computer Science Student | MERN Stack Developer
