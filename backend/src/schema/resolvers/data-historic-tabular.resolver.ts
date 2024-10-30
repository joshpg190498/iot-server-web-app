import { getAllHistoricDataController, getTabularDataController } from '../../controllers/data-historic-tabular.controller';
import { getHourlyParametersController, getParametersController } from '../../controllers/parameter.controller';

const resolvers = {
  Query: {
    hourlyParameters: getHourlyParametersController,
    parameters: getParametersController,
    historicData: getAllHistoricDataController,
    tabularData: getTabularDataController
  }
};

export default resolvers
