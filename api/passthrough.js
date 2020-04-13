import axios from "axios";

export default async (req, res) => {
  const { url, ...params } = req.query;

  const proxiedRes = await axios({ url, method: req.method, params });

  res.send(proxiedRes.data);
};
