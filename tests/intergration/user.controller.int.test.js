const request = require("supertest");
const app = require("../../app");
const newUser = require("../mock-data/new-user.json")

const endpointUrl = "/users/";
const testData = { email: "firstnamelastname@gmail.com",
                   password: "1234password",
                   username: "firstname lastname",
                   lastName: "lastname",
                   address: "Ruby",
                   typeOfUser: "1",
                   profession: "profession",
                   longitude: "500",
                   latitude: "latitude"
                  };
const nonExistingUserId = "5ef12ccfa293162e1111ce88"

let firstUser, newUserId;

describe(endpointUrl, () => {
  describe(`POST Intergration Test`, () => {
    test(`POST ${endpointUrl}`, async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send(newUser);
      
      expect(response.statusCode).toBe(201);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.password).toBe(newUser.password);
      expect(response.body.username).toBe(newUser.username);
      expect(response.body.firstName).toBe(newUser.firstName);
      expect(response.body.lastName).toBe(newUser.lastName);
      expect(response.body.address).toStrictEqual(newUser.address);
      expect(response.body.typeOfUser).toStrictEqual(newUser.typeOfUser);
      expect(response.body.profession).toStrictEqual(newUser.profession);
      expect(response.body.longitude).toStrictEqual(newUser.longitude);
      expect(response.body.latitude).toStrictEqual(newUser.latitude);

      newUserId = response.body._id;
    });
  
    it("should return error 500 on malformed data with POST", async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send(testData);
  
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 
          "User validation failed: firstName: Path `firstName` is required."
      })
    });
  });


  describe(`GET ALL Intergration Tests`, () => {
    test(`GET ALL ${endpointUrl}`, async () => {
      const response = await request(app)
        .get(endpointUrl);

      const indexOfUser = response.body.length - 1;
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[indexOfUser].email).toBe(newUser.email);
      expect(response.body[indexOfUser].password).toBe(newUser.password);
      expect(response.body[indexOfUser].username).toBe(newUser.username);
      expect(response.body[indexOfUser].firstName).toBe(newUser.firstName);

      firstUser = response.body[indexOfUser];
    });
  });

  describe("GET BY ID Intergration Tests", () => {
    test(`GET BY ID ${endpointUrl}`, async () => {
      const response = await request(app)
        .get(endpointUrl + firstUser._id);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(firstUser.email);
      expect(response.body.password).toBe(firstUser.password);
      expect(response.body.username).toBe(firstUser.username);
      expect(response.body.firstName).toBe(firstUser.firstName);
    });

    it("should should return a 404 error if the user doesn't exist", async () => {
      const response = await request(app)
        .get(endpointUrl + nonExistingUserId);

      expect(response.statusCode).toBe(404);
    });
  });


  describe("PUT Intergration Tests", () => {
    test(`PUT ${endpointUrl}`, async () => {
      const response = await request(app)
        .put(endpointUrl + newUserId)
        .send(testData);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(testData.email);
      expect(response.body.password).toBe(testData.password);
    });

    it("should should return a 404 error if the user doesn't exist", async () => {
      const response = await request(app)
        .get(endpointUrl + nonExistingUserId);

      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE Intergration Tests", () => {
    test(`DELETE ${endpointUrl}`, async () => {
      const response = await request(app)
      .delete(endpointUrl + newUserId)
      .send(testData);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(testData.email);
      expect(response.body.password).toBe(testData.password);
    });

    it("should should return a 404 error if the user doesn't exist", async () => {
      const response = await request(app)
        .delete(endpointUrl + nonExistingUserId);

      expect(response.statusCode).toBe(404);
    });
  });
});