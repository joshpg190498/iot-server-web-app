import { getThresholdAlertDataController } from '../../controllers/threshold-alert.controller';

const resolvers = {
  Query: {
    thresholdAlertData: getThresholdAlertDataController
  }
};

export default resolvers
