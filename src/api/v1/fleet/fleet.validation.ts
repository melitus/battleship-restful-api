import Joi from '@hapi/joi';

export const createShipSchema = Joi.object().keys({
  status: Joi.string().valid('available', 'active').required(),
  direction: Joi.string().valid('vertically', 'horizontally', 'setup').required(),
  type: Joi.string().valid('Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer', 'None').required(),
  length: Joi.number().required(),
  health: Joi.number().required(),
  coordinate: Joi.array().items(
    Joi.object().keys({
      row: Joi.number().allow(null, '').optional(),
      column: Joi.number().allow(null, '').optional(),
    }),
  ),
  aroundCoordinate: Joi.array().items(
    Joi.object().keys({
      row: Joi.number().allow(null, '').optional(),
      column: Joi.number().allow(null, '').optional(),
    }),
  ),
});
