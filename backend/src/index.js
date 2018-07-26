const { ApolloServer, gql } = require("apollo-server");
const { users, accounts } = require("./data");

const typeDefs = gql`
  type Account {
    id: ID!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    friends(timeout: Int = 400): [User!]
  }

  type Query {
    accounts: [Account!]!
  }
`;

const resolvers = {
  Account: {
    users: () => users
  },
  User: {
    /**
     * This is what will be deferred
     */
    friends: async (user, { timeout }) => {
      await new Promise(r => setTimeout(r, timeout));
      return users.slice(0, 10);
    }
  },
  Query: {
    accounts: () => accounts
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen();
