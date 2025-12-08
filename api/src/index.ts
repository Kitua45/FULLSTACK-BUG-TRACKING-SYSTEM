// import packages 
import express from 'express' 
import userRoutes from './router/users.routes'
import projectRoutes from './router/project.routes'
import commentRoutes from './router/comments.routes'
import { bugsRoutes } from './router/bugs.routes'

import { logger } from './middleware/logger';
import { rateLimiterMiddleware } from './middleware/rateLimiter';
import cors from 'cors'


// initialize the express app object - stores all express functions in the app object
const initializeApp = () => {
    //create express app
    const app = express();

    
    //middleware
    app.use(express.json()); //parse json request body
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }))

    
    //logger
    app.use(rateLimiterMiddleware);
    //cors
    app.use(logger);
    //ratelimiter

    //register routes
    userRoutes(app)
    projectRoutes(app); //register todo routes
    commentRoutes(app); //register user routes
    bugsRoutes(app)

    //default route
    app.get('/', (_, res) => {
        res.send("Hello, express API is running...");
    });

    return app;
}

const app = initializeApp();
export default app;