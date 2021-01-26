import { Router } from 'express';

import AttackerController from './attacker.controller';

const attackerRouter = Router();

attackerRouter.route('/attack').post(AttackerController.attack);

export default attackerRouter;
