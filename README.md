# BrezaaTechTest


## User Stories

```
As a User,
So I can create an account,
I would like to signup.

As a Creater,
So I can see all the users,
I would like to be able to get all users.

As a User,
So I can update my infomation,
I would like the option to update my account.

As a User,
So I can take permently remove my account,
I would like the option to delete my account.
```

## Features

You'll be able to:

- Signup
- Update an account
- Delete an account

## Running the tests

to run tests:

```
$ npm test
```

## Tests 

### Unit Tests

- #deleteUser
  - should have a deleteUser function
  - should delete with UserModel.findByIdAndUpdate
  - should return a 200 response code and deleted Usermodel
  - should handle errors
  - should return status code 404 when item doesn't exist
- #updateUser
  - should have a updateUser function
  - should update with UserModel.findByIdAndUpdate
  - should return a response with json data and http code 200
  - should handle errors
  - should return status code 404 when item doesn't exist
- #getUserById
  - should have a getUserById function
  - should call UserModel.findById with route parameters
  - should return json body and response code 200
  - should handle errors
  - should return status code 404 when item doesn't exist
- #getusers
  - should have a getusers function
  - should call UserModel.find({})
  - should return response code with status 200 and all users
  - should handle errors
- #createUser
  - should have a createUser function
  - should call UserModel.create
  - should return a 201 response code
  - should return json body in response
  - should handle errors


### Intergration Tests

- GET Intergration Tests
  - GET /users/
- GET by ID Intergration Tests
  - GET by ID /users/
  - User doesn't exist
- POST Intergration Tests
  - POST /users/
  - should return error 500 on malformed data with post /users/
- PUT Intergration Tests
  - PUT /users/
  - should return 404 on PUT /users/
- DELETE Intergration Tests
  - DELETE /users/
  - should return 404 on PUT /users/