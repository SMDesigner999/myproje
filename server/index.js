require("dotenv").config();
const fastify = require("fastify")({ logger: true });
// {
//   logger: true;
// }
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_ID);
// const initCommand = require("./commands");
const { loader, sleep } = require("./utils");
const { commands } = require("./utils/telegrafProto");

const ws = require("./webSocket");
typeof ws === "function" && ws(fastify, bot);
// fastify.addHook("onRequest", function (request, reply, next) {
//   sleep(30000);

//   next();
// });
// fastify.use((request, reply, next) => {

//   next();
// });
fastify.addHook("onRequest", (request, reply, done) => {
  // Some code
  sleep(3000);
  setTimeout(() => {
    done();
  }, 0);
});
// fastify.addHook("onRequest", async (request, reply) => {
//   // Some code
//   await sleep(3000);
// });

// initCommand(bot);
// bot.telegram.setMyCommands(
//   commands.sort((left, right) =>
//     left.description.localeCompare(right.description)
//   )
// );
loader({ path: "./commands", type: "Bot command" }, bot);
loader({ path: "./controllers", type: "Express controller" }, bot, () => {
  // app.use(`/api/${moduleName}`, router);
  return fastify;
});

bot.telegram.setMyCommands(commands);
// fastify.get("/", (request, reply) => {
//   return { hello: "world" };
// });
// fastify.get("/", (req, res) => {
//   res.send({ hello: "world" });
// });
// fastify.post("/api/goods", (request, res) => {
//   const { query_id, user } = request.body;
//   if (query_id) {
//     bot.telegram.answerWebAppQuery(query_id, {
//       type: "article",
//       id: query_id,
//       title: "YOUTUBE",
//       input_message_content: { message_text: "ПРИВЕТ МИР" },
//     });
//   }
// console.log(request.body);
// console.log(user.id);

// bot.use((ctx, next) => {
//   ctx.reply("👍");
//   next();
// });
// bot.telegram.sendMessage(user.id, "File content at: " + new Date() + "");
// app.on("message", function (ctx, next) {
//   ctx.telegram.sendMessage(
//     ctx.message.chat.id,
//     "File content at: " + new Date() + " is: \n" + file
//   );
// });
//   res.status(200).send({ done: true });
// });
// https://74bd-84-54-94-97.eu.ngrok.io
bot.on("sticker", (ctx) => {
  console.log(ctx);
  ctx.deleteMessage(ctx.message.message_id, ctx.message.chat);
  ctx.reply("👍");
});
bot.hears("hi", (ctx) => {
  ctx.reply("Hey there");
});
bot.use((ctx, next) => {
  next();
});
bot.launch();
// fastify.listen({ port: 4000 }, (err) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// });
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
