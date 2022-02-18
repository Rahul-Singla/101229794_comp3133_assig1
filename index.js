require("dotenv").config();
var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressJwt = require("express-jwt");

const { ApolloServer } = require("apollo-server-express");
const TypeDefs = require("./schema");
const Resolvers = require("./resolvers");

// Mongoose
mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        (db) => {
            console.log("Connected correctly to server!");
        },
        (err) => {
            console.log(err);
        }
    );

var app = express();
app.use(bodyParser.json());
app.use("*", cors());

// JWT Express
app.use(
    expressJwt({
        secret: "SUPER_SECRET",
        algorithms: ["HS256"],
        credentialsRequired: false,
    })
);

// Apollo Server
const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers,
    context: ({ req }) => {
        const user = req.user || null;
        return user;
    },
});

server.applyMiddleware({ app });

app.listen(3000, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
