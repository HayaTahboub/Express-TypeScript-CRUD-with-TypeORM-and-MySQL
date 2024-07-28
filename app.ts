import express from 'express';
import env from 'dotenv';
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler.js"
import AppDataSource from "./db/dbConfig.js";
import customerRouter from "./routers/customer.js"

const app = express();
env.config();
const PORT = process.env.PORT || 5000;
app.use(express.json())

app.use("/customers", customerRouter)



app.use(customErrorHandler)

app.use(DefaultErrorHandler)

AppDataSource.initialize().then(() => {
    console.log("connect to DB");
}).catch(err => {
    console.log("failed to connect to DB" + err);
})

app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});

export default app
