import { getAllHistoricDataController, getTabularDataController } from '../../controllers/data-historic-tabular.controller';

const resolvers = {
  Query: {
    historicData: getAllHistoricDataController,
    tabularData: getTabularDataController
  }
};

export default resolvers
