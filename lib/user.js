import User from '../models/User';
/* eslint-disable consistent-return */
import crypto from 'crypto';
import dbConnect from '../utils/dbConnect';
import passport from 'passport';

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser(res, { username, password, role }) {
  await dbConnect();
  await User.register({username: username, role: role}, password, (err, user) => {
    if (err) {
      console.log('Error occurred during registration:', err);
    } else {
      passport.authenticate('local')(() => {
        res.redirect('/admin/login')
      });
    }
  });

  return { username, createdAt: Date.now() };
}

export async function findUser({ username, role }) {
  await dbConnect();
  let filter = { username }
  if (role !== undefined || role !== null) {
    filter.role = role
  }
  const result = await User.find(filter, "username role", (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      return user;
    }
  });
  return result;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
