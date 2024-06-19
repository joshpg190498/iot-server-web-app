import { getDevicesController } from '../../controllers/dashboard.controller';

const resolvers = {
  Query: {
    dashboardDevices: getDevicesController
  }
};

export default resolvers