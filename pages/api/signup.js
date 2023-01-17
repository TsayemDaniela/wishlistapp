import { createUser } from '../../lib/user';

export default async function signup(req, res) {
    createUser(res, req.body).then(() => {
      res.status(200).send({ done: true });
    }, (err) => {
      console.error(err);
      res.status(500).end(err);
    });
  }
