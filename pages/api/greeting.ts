import { NextApiHandler } from "next";

interface Data {
  text: string;
}

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ text: "Hello " + req.query.name });
};

export default handler;
