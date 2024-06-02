# Go-Blog-Website
A blog website using React, Golang, and SQLite that allows users to create, edit, and delete blog posts, and upload images to those posts.

## Built with
[Vite](https://vitejs.dev/)   
[Fiber](https://docs.gofiber.io/)  
[GORM](https://gorm.io/index.html)  
[Tailwind](https://tailwindcss.com/)  

## Requirements
To run this application you will need to install [Node.js](https://nodejs.org/en/) and [Golang](https://go.dev/dl/). Additionally, [Docker](https://www.docker.com/get-started/) is recommended.

## Installation and Running
After cloning or downloading the repository, the application can be run with a docker-compose up --build command. This will make Docker images of both the frontend and backend and run containers using those images.
```
docker-compose up --build
```
Once running, the app can be visited at localhost:3001 in your browser.
```
localhost:3001
```
Alternatively, the frontend can be ran by running npm install and npm run dev while in the client directory.
```
npm install
```
```
npm run dev
```
Additionally, a change has to be made in the vite.config.js file if the application is ran this way.
```
proxy: {
  "/api": "http://go-blog-backend:3000"
}
```
The proxy has to be changed from "go-blog-backend:3000" to "localhost:3000".
```
proxy: {
  "/api": "http://localhost:3000"
}
```
This is because go-blog-backend is the container name for the backend and when ran with docker, the frontend accesses the backend through its container name. If for some reason the backend's container name would change, the proxy would have to be updated to reflect that change in order for the app to work.  
    
The backend would also have to be running with go run main.go while in the server directory.
```
go run main.go
```
## Usage Instructions
