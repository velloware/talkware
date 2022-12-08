import { Router } from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerObject } from './docs/index';

import { join } from 'node:path';

const routes = Router();

const swaggerDefinition = swaggerObject;

const options = {
  swaggerDefinition,
  apis: ['src/infra/http/routes/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

routes.get('/websocket', (request, response) => {
  const htmlPwd = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '/static/websocketDocs/websocket.html',
  );

  if (!htmlPwd || !htmlPwd.includes('websocket.html'))
    return response.status(404).send({ message: 'File not found' });

  response.sendFile(htmlPwd);
});
routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default routes;
