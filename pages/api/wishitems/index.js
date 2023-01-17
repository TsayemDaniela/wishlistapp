import ItemState from '../../../models/ItemState';
import WishItem from '../../../models/WishItem';
import dbConnect from '../../../utils/dbConnect';
import fs from 'fs';
import middleware from '../../../utils/middleware';
import mongoose from 'mongoose';
import nextConnect from 'next-connect';

const saveFile = (path, fileName) => {
  const data = fs.readFileSync(path);
  fs.writeFileSync(`./public/upload/img/${fileName}`, data);
  fs.unlinkSync(path);
};

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  await dbConnect();
  try {
    const {
      state: [state = ItemState.AVAILABLE] = [],
      id: [id = new mongoose.mongo.ObjectID()] = [],
      owner: [owner = "undefined"] = [],
      name: [name = ""] = [],
      description: [description = ""] = [],
      buyLink: [buyLink = ""] = [],
    } = req.body;

    let itemData = {}
    if (id) itemData._id = id;
    if (state) itemData.state = state;
    if (owner) itemData.owner = owner;
    if (name) itemData.name = name;
    if (description) itemData.description = description;
    if (buyLink) itemData.buyLink = buyLink;

    // save uploaded file
    const { itemImg: [{ path = "", originalFilename = "" } = {}] = [] } = req.files;
    if (originalFilename){
      const filename = originalFilename.replace(/\s/g, '');
      saveFile(path, filename);
      itemData.imgUrl = `/upload/img/${filename}`
    }

    WishItem.findOneAndUpdate({ _id: id }, itemData, { upsert: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
});

handler.get(async (req, res) => {
  try {
    await dbConnect();
    const items = await WishItem.find({});
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
