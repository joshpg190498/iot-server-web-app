import { getRolesController } from '../../controllers/role.controller';

const resolvers = {
  Query: {
    roles: getRolesController
  }
};

export default resolvers
