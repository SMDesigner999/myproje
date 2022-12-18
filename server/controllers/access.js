const { checkMethod } = require("../utils");
const defMenu = [
  { caption: "Andrey", icon: "directions_walk" },
  { caption: "GRAND", icon: "self_improvement" },
  { caption: "Виктор", icon: "emoji_people" },
  { caption: "Виктория", icon: "pool" },
  { caption: "Лута", icon: "sensor_occupied" },
  { name: "hstop", caption: "hstop", icon: "local_fire_department" },
  { name: "chats", caption: "chats", icon: "forum" },
  { name: "test", caption: "test", icon: "cruelty_free" },
];
const defSettings = [
  { name: "translation", caption: "translation", icon: "translate" },
];

const get = (req, res) => {
  console.log("access");
  res.status(200).send({ route: defMenu, routeSetting: defSettings });
};

module.exports = (fastify, moduleName, data, path) => {
  fastify.get(path, checkMethod(get, moduleName));
  // fastify.post(path, checkMethod(post, moduleName));
  // console.log(fastify);
  // console.log(fastify.get);
  // console.log(path);
  //   console.log(123);
  // console.log(fastify.get("/", () => {}));
};
