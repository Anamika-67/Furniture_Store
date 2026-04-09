# Furniture_Store
Full-stack e-commerce web application developed using Node.js and MongoDB, which allows users to browse, select, and purchase furniture products online, while providing an admin interface to manage products and orders.

📌 Project Description (Statement)
This project is a full-stack e-commerce web application developed using Node.js and MongoDB, which allows users to browse, select, and purchase furniture products online, while providing an admin interface to manage products and orders.

🧰 Tech Stack (Points)

Frontend
•	HTML5 
•	CSS3 
•	JavaScript 
________________________________________
Backend
•	Node.js 
•	Express.js 
________________________________________
Database
•	MongoDB 
________________________________________
API
•	REST API (HTTP) 
________________________________________
Authentication & Security
•	JWT 
________________________________________
Recommendation System
•	JavaScript (Backend) 
________________________________________
Chatbot System
•	Gemini API
________________________________________
Version Control
•	GitHub 
________________________________________
Deployment
•	Vercel 
•	Render (Choose One for hosting)

	Working Process (Step-by-Step Points)
1.	User opens the website in a browser 
2.	Frontend loads and displays products 
3.	User registers or logs in 
4.	Backend verifies credentials and generates token 
5.	User browses products 
6.	Frontend sends API request to backend 
7.	Backend fetches data from MongoDB 
8.	Data is sent back and displayed 
9.	User adds items to cart 
10.	User places order 
11.	Order is stored in database 
12.	Admin manages products and orders 
________________________________________

System Architecture (Statement)

The system follows a client-server architecture, where the frontend acts as the client, the backend handles business logic, and the database stores all application data.      
________________________________________
Architecture Flow (Points)

•	Client (Browser) sends request 
•	Frontend handles UI 
•	Backend (Node.js + Express) processes request 
•	Backend communicates with MongoDB 
•	MongoDB returns data 
•	Backend sends response to frontend 
•	Frontend displays output 

Process Flow (Statements + Points)

Statement:
The process flow describes how data moves through the system from user interaction to database response.

Points:
•	User performs action (search, login, add to cart) 
•	Request is sent to backend via API 
•	Backend processes logic 
•	Backend queries database 
•	Database returns result 
•	Backend sends response 
•	Frontend updates UI 
________________________________________

Tech Stack Working (One-by-One)

Frontend Working

•	Collects user input 
•	Sends API requests (fetch/axios) 
•	Displays response data 
________________________________________
Backend Working

•	Handles routing (e.g., /login, /products) 
•	Applies business logic 
•	Communicates with database 
________________________________________
Database Working

•	Stores structured data (users, products, orders) 
•	Retrieves data on request 
________________________________________
Authentication Working

•	User logs in 
•	Token is generated 
•	Token is verified for protected routes 
________________________________________
Database Structure (Points)

Users Collection
•	name 
•	email 
•	password 
Products Collection
•	name 
•	price 
•	category 
•	image 
Orders Collection
•	userId 
•	productId 
•	quantity 
•	status 
________________________________________

Key Features (Points)

•	User registration and login 
•	Product browsing 
•	Add to cart functionality 
•	Order placement 
•	Admin dashboard 
•	Secure authentication 
