import { findUser } from '../../lib/user';
import { getLoginSession } from '../../lib/auth';

export default async function userSession(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser({username: session._doc.username, role: session._doc.role}))) ?? null;
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
