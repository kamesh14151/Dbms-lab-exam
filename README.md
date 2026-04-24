# DBMS Lab Exam - Hotel Bookings

This project has:
- Frontend: index.html
- Backend API: backend/server.js

The frontend fetches bookings from the backend route:
- http://localhost:3000/bookings

## 1. Project Structure

Dbms-lab-exam/
- index.html
- README.md
- backend/
	- server.js
	- package.json

## 2. Run On Your Own PC

1. Open terminal in backend folder

	 cd backend

2. Install dependencies

	 npm install

3. Start backend server

	 node server.js

4. Open index.html with Live Preview (or browser)

5. Bookings should load automatically
	 - You can also click Load Bookings button.

## 3. If Bookings List Is Not Showing

Check these points:
1. Backend server is running on port 3000.
2. API URL works in browser:

	 http://localhost:3000/bookings

3. If port 3000 is busy, stop old Node process and restart.
4. Keep backend terminal open while using frontend.

## 4. Lab System Without Git (Important)

If Git is not installed in lab system, use one of these methods.

### Method A: Copy Project Folder (Recommended)

1. On your PC, copy only these items to pen drive:
	 - index.html
	 - backend/server.js
	 - backend/package.json
	 - backend/package-lock.json (if available)

2. On lab system:
	 - Paste folder as Dbms-lab-exam.
	 - Open folder in VS Code.
	 - Run in terminal:

		 cd backend
		 npm install
		 node server.js

3. Open index.html in Live Preview.

Note:
- Do not copy node_modules folder. npm install will recreate it.

### Method B: Manual Recreate In VS Code

If file copy is not possible, create folders/files manually:
1. Create folder: Dbms-lab-exam
2. Create subfolder: backend
3. Create files:
	 - index.html
	 - backend/server.js
	 - backend/package.json

Use the exact code below.

index.html

```html
<!DOCTYPE html>
<html>
<head>
	<title>Hotel Management</title>
</head>
<body>

<h2>Hotel Bookings</h2>

<button onclick="loadData()">Load Bookings</button>
<p id="status"></p>

<table border="1" id="table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Room</th>
			<th>Days</th>
		</tr>
	</thead>
	<tbody></tbody>
</table>

<script>
async function loadData() {
	let table = document.querySelector("#table tbody");
	let status = document.getElementById("status");

	status.textContent = "Loading...";

	try {
		let res = await fetch("http://localhost:3000/bookings");
		if (!res.ok) {
			throw new Error("HTTP " + res.status);
		}

		let data = await res.json();
		table.innerHTML = "";

		data.forEach(b => {
			table.innerHTML += `
				<tr>
					<td>${b.name}</td>
					<td>${b.room}</td>
					<td>${b.days}</td>
				</tr>
			`;
		});

		status.textContent = data.length ? "Loaded " + data.length + " booking(s)." : "No bookings found.";
	} catch (err) {
		table.innerHTML = "";
		status.textContent = "Could not load bookings. Start backend with: cd backend && node server.js";
		console.error(err);
	}
}

loadData();
</script>

</body>
</html>
```

backend/server.js

```js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let bookings = [
	{ name: "Kamesh", room: 101, days: 2 },
	{ name: "Ajay", room: 102, days: 3 }
];

app.get("/bookings", (req, res) => {
	res.json(bookings);
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
```

backend/package.json

```json
{
	"dependencies": {
		"cors": "^2.8.6",
		"express": "^5.2.1"
	}
}
```

Then run:

cd backend
npm install
node server.js

## 5. Quick Exam Checklist

1. Backend running in terminal.
2. http://localhost:3000/bookings opens successfully.
3. index.html opened in Live Preview.
4. Table displays 2 bookings.
