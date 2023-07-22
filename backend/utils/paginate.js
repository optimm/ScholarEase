const paginate = async (req, res, mongoQuery) => {
  let { page, limit } = req.query;
  let data;
  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    data = await mongoQuery.skip((page - 1) * limit).limit(limit);
  } else {
    if (limit) {
      limit = parseInt(limit);
      data = await mongoQuery.limit(limit);
    } else {
      data = await mongoQuery;
    }
  }
  return data;
};

module.exports = paginate;
