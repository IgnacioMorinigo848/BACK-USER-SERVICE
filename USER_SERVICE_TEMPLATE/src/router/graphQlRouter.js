const { Router } = require("express");
const { graphqlHTTP } = require('express-graphql');
const { importSchema } = require('graphql-import');
const path = require('path'); 
const resolvers = require('../graphQl/resolver');
const { authenticate } = require("../auth/middleware");

const router = Router();

const { makeExecutableSchema } = require('@graphql-tools/schema');

const schemaPath = path.join(__dirname, '../graphQl/schema.graphql');
const typeDefs = importSchema(schemaPath); 

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


router.use('/graphql', authenticate, graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { user: req.user }
})));


module.exports = router;
