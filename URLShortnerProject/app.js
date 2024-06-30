import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './Config/connectDB.js'
import urlRouter from './routes/url.route.js';  // Ensure the correct path
import URL from './model/url.model.js';

dotenv.config()

const app = express()
const PORT = 8001

connectDB()
app.use(express.json())
app.use('/url', urlRouter)

app.get('/:shortId', async (req, res) => {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
})  