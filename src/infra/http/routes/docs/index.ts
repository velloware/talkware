// Import all .json files in this directory
import swagger from './swagger.json';
import { components } from './components.json';
import { servers } from './servers.json';
import { tags } from './tags.json';

import { userPaths } from './user/index';

// Create swagger object
export const swaggerObject = {
  ...swagger,
  components,
  servers,
  tags,
  paths: {
    ...userPaths,
  },
};
