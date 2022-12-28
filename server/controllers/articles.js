const models = require("../db/models");

const model = models.article;

const post = (req, res) => {};

const get = (req, res) => {
  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      order: [["id", "ASC"]],
      ...req.query,
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

const put = (req, res) => {};

const del = (req, res) => {};

const { checkMethod } = require("../utils");

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
