import { Router } from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerObject } from './docs/index';

const routes = Router();

const swaggerDefinition = swaggerObject;

const options = {
  swaggerDefinition,
  apis: ['src/infra/http/routes/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default routes;
