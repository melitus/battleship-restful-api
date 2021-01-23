import { Router } from 'express';

import fleetRoutes from '../v1/fleet';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'BattleShip api is live!' });
});

apiRouter.use('/fleet', fleetRoutes);

export default apiRouter;
