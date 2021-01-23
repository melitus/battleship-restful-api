import { Router } from 'express';

import FleetController from './fleet.controller';
import { validateBodySchema } from '../../../helpers/validation';

import { createShipSchema } from './fleet.validation';

const fleetRouter = Router();

fleetRouter.route('/create').post(validateBodySchema(createShipSchema), FleetController.createShip);

fleetRouter.route('/:shipId/placeShip').put(FleetController.placeAShipOnBoard);

export default fleetRouter;
