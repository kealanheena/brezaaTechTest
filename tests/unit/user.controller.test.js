const UserController = require("../../controllers/user.contoller");
const UserModel = require("../../model/user.model");
const httpMocks = require("node-mocks-http");
const newUser = require("../mock-data/new-user.json");
const allUsers = require("../mock-data/all-users.json");

jest.mock("../../model/user.model");

describe("UserController", () => {

  let req, res, next;
  let userId = "5ef12ccfa293162e4204ce88";

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe(".deleteUser", () => {

    it("should have an deleteUser fuction", () => {
      expect(typeof UserController.deleteUser).toBe("function");
    });

    it("should call UserModel.findByIdAndDelete", async () => {
      req.params.id = userId;
      await UserController.deleteUser(req, res, next);

      expect(UserModel.findByIdAndDelete).toBeCalledWith(userId)
    });

    it("should return a 200 response code", async () => {
      UserModel.findByIdAndDelete.mockReturnValue(newUser);
      await UserController.deleteUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(newUser);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Error finding user" };
      const rejectedPromise = Promise.reject(errorMessage);
      UserModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
      await UserController.deleteUser(req, res, next);

      expect(next).toBeCalledWith(errorMessage);
    });

    it("should return a 404 status code when the user doesn't exsist", async () => {
      UserModel.findByIdAndDelete.mockReturnValue(null);
      await UserController.deleteUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe(".updateUser", () => {

    it("should have an updateUser fuction", () => {
      expect(typeof UserController.updateUser).toBe("function");
    });

    it("should call UserModel.findByIdAndUpdate", async () => {
      req.params.id = userId;
      req.body = newUser;
      await UserController.updateUser(req, res, next);

      expect(UserModel.findByIdAndUpdate).toBeCalledWith(userId, newUser, {
        new: true,
        useFindAndModify: false
      });
    });

    it("should return a 200 response code", async () => {
      req.params.id = userId;
      req.body = newUser;
      UserModel.findByIdAndUpdate.mockReturnValue(newUser)
      await UserController.updateUser(req, res, next);

      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newUser);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Error finding user" };
      const rejectedPromise = Promise.reject(errorMessage);
      UserModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
      await UserController.updateUser(req, res, next);

      expect(next).toBeCalledWith(errorMessage);
    });

    it("should return a 404 status code when the user doesn't exsist", async () => {
      UserModel.findByIdAndUpdate.mockReturnValue(null);
      await UserController.updateUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe(".getUserById", () => {
    
    it("should have a getUserById function", () => {
      expect(typeof UserController.getUserById).toBe("function");
    });

    it("should call UserModel.findById with route parameters", async () => {
      req.params.id = userId;
      await UserController.getUserById(req, res, next);

      expect(UserModel.findById).toBeCalledWith(userId);
    });

    it("should return a 200 response code", async () => {
      UserModel.findById.mockReturnValue(newUser);
      await UserController.getUserById(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(newUser);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Error finding user" };
      const rejectedPromise = Promise.reject(errorMessage);
      UserModel.findById.mockReturnValue(rejectedPromise);
      await UserController.getUserById(req, res, next);

      expect(next).toBeCalledWith(errorMessage);
    });

    it("should return a 404 status code when the user doesn't exsist", async () => {
      UserModel.findById.mockReturnValue(null);
      await UserController.getUserById(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe(".getUsers", () => {

    it("should have a getUsers function", () => {
      expect(typeof UserController.getUsers).toBe("function");
    });

    it("should call UserModel.find({})", () => {
      UserController.getUsers(req, res, next);

      expect(UserModel.find).toBeCalledWith({});
    });

    it("should return a 200 response code", async () => {
      await UserController.getUsers(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
      UserModel.find.mockReturnValue(allUsers);
      await UserController.getUsers(req, res, next);

      expect(res._getJSONData()).toStrictEqual(allUsers);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Error finding users" };
      const rejectedPromise = Promise.reject(errorMessage);
      UserModel.find.mockReturnValue(rejectedPromise);
      await UserController.getUsers(req, res, next);

      expect(next).toBeCalledWith(errorMessage);
    });
  });

  describe(".createUser", () => {

    beforeEach(() => {
      req.body = newUser;
      req.body = newUser;
    });

    it("should have a createUser function", () => {
      expect(typeof UserController.createUser).toBe("function");
    });

    it("should call UserModel.create", () => {
      UserController.createUser(req, res, next);

      expect(UserModel.create).toBeCalledWith(newUser);
    });

    it("should return a 201 response code", async () => {
      await UserController.createUser(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy()
    });

    it("should return json body in response", async () => {
      UserModel.create.mockReturnValue(newUser);
      await UserController.createUser(req, res, next);

      expect(res._getJSONData()).toStrictEqual(newUser);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Github property missing"};
      const rejectedPromise = Promise.reject(errorMessage);
      UserModel.create.mockReturnValue(rejectedPromise);
      await UserController.createUser(req, res, next);

      expect(next).toBeCalledWith(errorMessage);
    })
  });
});