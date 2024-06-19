import { createUserController, deleteUserController, getPermissionByUserIdController, getUserByIdController, getUsersController, updateUserController } from "../../controllers/user.controller";

const resolvers = {
  Query: {
    users: getUsersController,
    user: getUserByIdController,
    permissions: getPermissionByUserIdController
  },
  Mutation: {
    createUser: createUserController,
    updateUser: updateUserController,
    deleteUser: deleteUserController 
  },
};

export default resolvers
