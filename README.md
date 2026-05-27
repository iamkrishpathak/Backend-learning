# Backend Learning Journey 🚀

A comprehensive guide to my Node.js and Express.js learning journey. This repository documents my progress through backend development concepts, projects, and hands-on practice.

## 📚 Learning Resource

- **Course:** Piyush Garg Node.js & Express.js Playlist
- **Duration:** Ongoing
- **Focus:** Backend Development, REST APIs, Server-side Logic

## 🎯 Topics Covered

### Core Concepts
- [ ] Node.js Fundamentals
- [ ] Module System (require/exports)
- [ ] File System Operations
- [ ] Event-Driven Architecture
- [ ] Callbacks & Asynchronous Programming

### Express.js Basics
- [ ] Server Setup & Port Configuration
- [ ] Routing (GET, POST, PUT, DELETE)
- [ ] URL Parameters & Query Strings
- [ ] Route Handlers & Middleware
- [ ] Request/Response Objects

### REST APIs
- [ ] API Design Principles
- [ ] Building RESTful Endpoints
- [ ] JSON Data Handling
- [ ] Status Codes & Error Handling
- [ ] CRUD Operations

### Intermediate Topics
- [ ] Middleware Implementation
- [ ] Request Body Parsing
- [ ] Data Validation
- [ ] Error Handling Strategies
- [ ] Logging & Debugging

### Advanced Topics (To Cover)
- [ ] Database Integration
- [ ] Authentication & Authorization
- [ ] Security Best Practices
- [ ] API Documentation
- [ ] Deployment & Production

## 📁 Project Structure

```
NodeJs Learning/
├── Project-01/              # REST API with Mock Data
│   ├── index.js            # Express server setup
│   ├── MOCK_DATA.json      # Sample user data
│   ├── tasks.txt           # Progress notes
│   └── package.json
├── server/                  # Additional experiments
│   ├── index.js
│   ├── new.js
│   └── package.json
├── file.js                  # Practice files
├── hello.js
├── maths.js
└── README.md
```

## 💡 Key Learning Points

### What is `req.params.id`?
- Dynamic URL parameters captured from the route
- Example: `/api/users/:id` → when called as `/api/users/5`, `req.params.id` = `"5"`
- Used to fetch specific resources by identifier

### String Methods in JavaScript
- `.map()` - Transform array elements
- `.join('')` - Combine array items into a single string
- Common pattern: `array.map(...).join('')` to create formatted strings

### Project-01: User API
**Current Endpoints:**
- `GET /users` - Returns HTML list of user first names
- `GET /api/users` - Returns JSON array of all users
- `GET /api/users/:id` - Returns specific user by ID (in progress)

## 📝 Notes & Insights

### What I've Learned
1. Express makes server setup simple with `express()` and `listen()`
2. Routes map URLs to handler functions
3. `res.send()` for HTML, `res.json()` for JSON responses
4. Parameters in routes start with `:` and are accessed via `req.params`

### Common Patterns
```javascript
// Basic server setup
const express = require("express");
const app = express();
const PORT = 3000;

app.get('/route', (req, res) => {
    res.send("response");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

## 🔄 Progress Tracking

**Completed:**
- ✅ Basic Express server setup
- ✅ Understanding routes and handlers
- ✅ GET requests for data
- ✅ HTML response rendering
- ✅ JSON API responses

**In Progress:**
- 🔄 Handling route parameters (`:id`)
- 🔄 Implementing CRUD operations

**Next Steps:**
- [ ] Complete user ID lookup functionality
- [ ] Add POST route for creating users
- [ ] Add PUT/DELETE routes for updates
- [ ] Learn middleware concepts
- [ ] Implement error handling

## 🔗 Useful Resources

- [Node.js Official Docs](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MDN - HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

## 💻 Quick Commands

```bash
# Start the server
npm start

# Run a specific file
node filename.js

# Install dependencies
npm install express

# Check Node version
node --version
```

## 📖 Notes for Later Revision

- Always remember to add error handling to API endpoints
- Use status codes properly (200 OK, 404 Not Found, 500 Server Error)
- Test APIs with Postman or similar tools
- Keep data files organized (MOCK_DATA.json for testing)
- Write meaningful console logs for debugging

---

**Last Updated:** 27 May 2026  
**Status:** Actively Learning 🎓
