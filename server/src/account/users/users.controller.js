import { prepareResponse } from "../../../utils/response-handler.js";
import { UserModel, authenticateUser } from "./users.model.js";

export const signupUser = async (req, res) => {
  try {
    // Check if the following email is already in use
    const hasEmailExists = await UserModel.find({ email: req.body.email });
    if (hasEmailExists) {
      // Return email is already in use
      return res.send({
        data: {},
        meta: { message: "This email is already in use" },
      });
    }

    const user = new UserModel(req.body);
    const response = await user.save();
    const results = {
      userId: response._id,
      userName: response.userName,
      email: response.email,
    };
    res.send({ data: results, meta: { message: "Signup successful" } });
  } catch (err) {
    console.log("Err: ", err);
    res.send({
      data: {},
      meta: { message: "Unable to create user at this moment" },
    });
  }
};

/**
 * @description {Method to sign in user}
 * @param {*} req
 * @param {*} res
 *
 * Step 1   - Obtain id & password
 * Step 2   - Write a query to validate user & password
 * Step 2.1 - If not found then return error
 * Step 3   - Get user id & issue JWT token & refresh token
 * Step 4   - Store session details in Redis
 * Step 5   - Return user token details as a response
 */
export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  const userResponse = await authenticateUser(email, password);
  if (!userResponse.results) {
    const results = prepareResponse(null, userResponse.message);
    return res.send(results);
  }

  // Issue token
};
