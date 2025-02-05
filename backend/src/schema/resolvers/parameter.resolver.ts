import { getHourlyParametersController, getParametersController } from '../../controllers/parameter.controller';

const resolvers = {
  Query: {
    hourlyParameters: getHourlyParametersController,
    parameters: getParametersController
  }
};

export default resolvers
