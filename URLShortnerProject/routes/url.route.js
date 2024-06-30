import express from 'express';
import { HandleGenrateNewShrotURL, analyitics } from '../controllers/url.controller.js';

const router = express.Router();

router.post('/', HandleGenrateNewShrotURL);

router.get('/analytics/:shortID', analyitics)

export default router;  // Export the router directly
