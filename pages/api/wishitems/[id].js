import WishItem from '../../../models/WishItem';
import dbConnect from '../../../utils/dbConnect';
import middleware from '../../../utils/middleware';
/* eslint-disable max-len */
import nextConnect from 'next-connect';

const saveFile = async (path, fileName) => {
  console.log('saving file...')
  const data = fs.readFileSync(path);
  fs.writeFileSync(`./public/upload/img/${fileName}`, data);
  fs.unlinkSync(path);
};

const handler = nextConnect();
handler.use(middleware);

handler.delete(async (req, res) => {
  await dbConnect();
  try {
    const { id } = req.query;
    WishItem.findByIdAndDelete(id, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
