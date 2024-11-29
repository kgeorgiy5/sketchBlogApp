# SketctBlog
## How to run the application

### Front end
#### Build
`./client: npm i`
#### Run
`./client: npm run dev`

### Back end
#### Build:
`./server: npm i`
#### Environment variables:
`./server/.env` file:
```
MONGODB_URI=[connection string]
SESSION_SECRET=[secret string for express-session]
PORT=[port number]
ORIGIN=[front end origin for cors]
```
#### Run
`./server: npm start`
