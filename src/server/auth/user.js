const RedisHelper = require('redis-utils-json');

const url = process.env.REDIS_URL || 'redis://localhost:6379';
const client = new RedisHelper(url);

/**
 * A user should follow this schema:

 {
   key: user:(login)
   ‎user: login
   ‎pass: pass
   ‎following: [ login2, login3 ],
   ‎followers: [ login2, login4 ],
   ‎posts: [ post:(user):(uuid), post:(user):(uuid) ]
 }

 */

exports.createUser = async (user, pass) => {
  const key = `user:${user}`;
  const ins = {
    user,
    pass,
    following: [],
    followers: [],
    posts: [],
  };
  const { found } = await client.getByKey(key);
  // if we've found the user, return an erro
  if (found) return false;
  // if not, create a user and return
  await client.setKey(key, ins);
  return true;
};

/**
 * attempt to login
 * @param {string} user username to log in with
 * @param {string} pass twice hashed pass to login with
 */
exports.checkAuth = async (user, pass) => {
  const key = `user:${user}`;
  const { found, data } = await client.getByKey(key);
  if (!found) return { loggedin: false, reason: 'not found' };
  const { user: foundUser, pass: foundPass } = data;
  if (foundUser === user && pass === foundPass) {
    return { loggedin: true };
  }
  return { loggedin: false, reason: 'incorrect password' };
};
