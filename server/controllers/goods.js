// fastify.get("/", (request, reply) => {
//   return { hello: "world" };
// });
// fastify.get("/", (req, res) => {
//   res.send({ hello: "world" });
// });

const { checkMethod } = require("../utils");
const get = (req, res, promiseError) => {
  res.send({ hello: "world" });
};
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
  // fastify.post(path, checkMethod(post, moduleName));
  // console.log(fastify);
  // console.log(fastify.get);
  // console.log(path);
  //   console.log(123);
  // console.log(fastify.get("/", () => {}));
};
