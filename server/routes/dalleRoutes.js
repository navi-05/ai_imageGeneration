import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';

// Basic Setup
dotenv.config(); 
const router = express.Router(); 

// Open AI Config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration); 

// Routing 
router.route('/').get((req, res) => {
    res.send('Hello from Dall_E')
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body; 
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image })
    } catch (error) {
        res.status(500).send(error?.response?.data.error.message)
    }
})

export default router; 