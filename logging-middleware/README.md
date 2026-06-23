# Logging Middleware

## Overview

This project implements a reusable logging middleware for the AffordMed Campus Evaluation.

The middleware exposes a single function:

```javascript
Log(stack, level, packageName, message)
```

which sends logs to the evaluation logging service using the provided authentication token.

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
ACCESS_TOKEN=your_access_token
```

---

## Usage

```javascript
const Log = require("./logger");

await Log(
  "backend",
  "info",
  "service",
  "Application started"
);
```

---

## Parameters

| Parameter   | Description                                  |
| ----------- | -------------------------------------------- |
| stack       | backend / frontend                           |
| level       | debug / info / warn / error / fatal          |
| packageName | service, controller, route, middleware, etc. |
| message     | Log message                                  |

---

## Example

```javascript
await Log(
  "backend",
  "error",
  "service",
  "Database connection failed"
);
```

---

## Dependencies

* Axios
* Dotenv

---

## Author

A23126510214
