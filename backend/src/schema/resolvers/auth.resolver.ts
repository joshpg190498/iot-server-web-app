import { loginController } from "../../controllers/auth.controller";

const resolvers = {
  Query: {
    login: loginController
  }
};

export default resolvers
