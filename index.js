require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {makeExecutableSchema} = require('graphql-tools');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const fs = require('fs');
const resolvers = require('./resolvers');

const port = process.env.SERVER_PORT || 3001;

// Routes
const tweetRouter = require('./routes/tweetRoute');
const app = express();
app.use(cors(), bodyParser.json());

const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.use('/api', tweetRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});