// fastify.get("/", (request, reply) => {
//   return { hello: "world" };
// });
// fastify.get("/", (req, res) => {
//   res.send({ hello: "world" });
// });
const models = require("../db/models");
const { HasMany, HasOne, Op } = require("sequelize");
const model = models.good;
const { checkMethod } = require("../utils");
const get = (req, res, promiseError) => {
  const { search, articleId, id, ...other } = req.query;
  const searchCaption = search
    ? { caption: { [Op.iLike]: `%${search}%` } }
    : null;
  const searchArticle = articleId ? { articleId } : null;

  const searchId = id ? { id } : null;

  const where =
    searchArticle || searchCaption || searchId
      ? { ...searchCaption, ...searchArticle, ...searchId }
      : null;
  model
    .findAndCountAll({
      attributes: {
        exclude: [
          "articleId",
          "warehouseId",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
      },
      include: [
        {
          model: models.article,
          as: "article",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          association: new HasOne(model, models.price, {}),
          required: false,
          attributes: {
            exclude: [
              "goodId",
              "id",
              "description",
              "purchase",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
          },
        },
      ],
      order: [["id", "ASC"]],
      ...other,
      where: where,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(promiseError);
};
const post = (req, res, promiseError) => {
  if (!req?.body?.articleId) {
    console.log(123);
    throw new Error("Not found articleId in body");
  }
  // console.log(model.create({ ...req.body }).catch(promiseError));
  model
    .create({ ...req.body })
    .then((data) => {
      const { id = -1, caption } = data;
      res.status(200).send({ id, caption });
    })
    .catch(promiseError);
};
const del = (req, res, promiseError) => {
  const { id } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .destroy({ where: { id: id } })
    .then(() => {
      res.status(200).send({ id, message: "deleted" });
    })
    .catch(promiseError);
};
const put = (req, res, promiseError) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .update(body, { where: { id: id } })
    .then(() => {
      model
        .findOne({
          where: { id: id },
          attributes: {
            exclude: [
              "articleId",
              "warehouseId",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
          },
        })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(promiseError);
    })
    .catch(promiseError);
};
// const get = (req, res, promiseError) => {
//   res.send({ hello: "world" });
// };
// const post = (req, res, promiseError) => {
//   res.send({ hello: "world", ...req.body });
// };

// module.exports = (fastify, moduleName, path) => {
//   //   router.post("/", jwtCheck, checkMethod(post, moduleName));
//   fastify.get(path, checkMethod(get, moduleName));
//   //   router.put("/", jwtCheck, checkMethod(put, moduleName));
//   //   router.delete("/", jwtCheck, checkMethod(del, moduleName));
// };.

module.exports = (fastify, moduleName, data, path) => {
  fastify.get(path, checkMethod(get, moduleName));
  fastify.post(path, checkMethod(post, moduleName));
  fastify.put(path, checkMethod(put, moduleName));
  fastify.delete(path, checkMethod(del, moduleName));
  // console.log(fastify);
  // console.log(fastify.get);
  // console.log(path);
  //   console.log(123);
  // console.log(fastify.get("/", () => {}));
};
