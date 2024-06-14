import { createUserController, deleteUserController, getUserByIdController, getUsersController, updateUserController } from "../../controllers/user.controller";

const resolvers = {
  Query: {
    users: getUsersController,
    user: getUserByIdController
  },
  Mutation: {
    createUser: createUserController,
    updateUser: updateUserController,
    deleteUser: deleteUserController 
  },
};

export default resolvers
