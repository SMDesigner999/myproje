const def = (fastify, bot) => {
  fastify.register(require("@fastify/websocket"), {
    options: {
      maxPayload: 1048576,
      // verifyClient: function (info, next) {
      //   if (info.req.q !== 1) {
      //     return next(false); // the connection is not allowed
      //   }
      //   next(true); // the connection is allowed
      // },
    },
  });

  fastify.register(async function (fastify) {
    fastify.get(
      "/*",
      { websocket: true },
      (connection /* SocketStream */, req /* FastifyRequest */) => {
        connection.socket.on("message", (message) => {
          // message.toString() === 'hi from client'
          if (typeof message.toString("utf8") !== undefined) {
            console.log(JSON.parse(message.toString("utf8")));
            var mesage = JSON.parse(JSON.parse(message.toString("utf8")));
            console.log(typeof mesage);
            console.log(mesage.id);
            bot.telegram.sendMessage(
              mesage.id,
              "File content at: " + new Date() + ""
            );
          }

          // connection.socket.send("hi from wildcard route");
        });
      }
    );
    // fastify.get(
    //   "/",
    //   { websocket: true },
    //   (connection /* SocketStream */, req /* FastifyRequest */) => {
    //     connection.socket.on("message", (message) => {
    //       // message.toString() === 'hi from client'
    //       connection.socket.send("hi from server");
    //     });
    //   }
    // );
  });

  // app.ws("/test_ws", function (ws, req) {
  //   ws.on("message", function (msg) {
  //     ws.send("ping: " + msg);
  //   });
  //   console.log("socket client connect");
  // });

  bot.use((ctx, next) => {
    let entities = ctx.message?.entities ? ctx.message.entities : null;
    let entitiesArr = entities ? entities[0] : null;
    if (!entities && entitiesArr?.type !== "bot_command") {
      const user = ctx.message.from;
      let userName = user.first_name ? user.first_name : "";
      userName = userName + (user.last_name ? " " + user.last_name : "");
      userName = userName + (user.username ? ` (${user.username})` : "");
      const data = {
        userName,
        message: ctx.message.text,
        id: `${ctx.message.chat.id}.${ctx.message.message_id}`,
      };

      fastify.websocketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(data));
        }
      });
    } else {
      next();
    }

    // fastify.register(async function (fastify) {
    //   fastify.get(
    //     "/test_ws",
    //     { websocket: true },
    //     (connection /* SocketStream */, req /* FastifyRequest */) => {
    //       connection.socket.on("message", (message) => {
    //         // message.toString() === 'hi from client'
    //         connection.socket.send(JSON.stringify(data));
    //       });
    //     }
    //   );
    // fastify.get(
    //   "/",
    //   { websocket: true },
    //   (connection /* SocketStream */, req /* FastifyRequest */) => {
    //     connection.socket.on("message", (message) => {
    //       // message.toString() === 'hi from client'
    //       connection.socket.send("hi from server");
    //     });
    //   }
    // );
    // });
    // aWss.clients.forEach(function (client) {
    //   client.send(JSON.stringify(data));
    // });
  });
};

module.exports = def;
