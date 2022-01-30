import { Router } from 'express';
import WelcomeController from '../controllers/welcome..controller';

const router = Router();

router.get('/', (req, res) => new WelcomeController(req, res).get());

export default router;
