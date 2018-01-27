module.exports = (len = 30) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randInt = () => Math.floor(Math.random() * 62);
  const randChar = () => chars[randInt()];
  // have to use array#fill because we can't map over undefined pointers
  return new Array(len).fill(0).map(randChar).join('');
};
