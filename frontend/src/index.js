import React from "react";
import ReactDOM from "react-dom";

import { apolloClient } from "./apollo";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const getStuff = gql`
  query getStuff {
    accounts {
      id
      users {
        id
        name
        # deferring on a TON of resources as a stress test. The response before this point should be pretty big too.
        friends @defer {
          id
        }
      }
    }
  }
`;

let App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Query query={getStuff}>
        {query => {
          let { loading, loadingState } = query;
          if (loading) {
            return "loading....";
          }
          return (
            <ul>
              {query.data.accounts.map((account, acctIndex) => (
                <li key={account.id}>
                  {account.id}: {account.name}
                  <br />
                  <ul>
                    {account.users.map((user, userIndex) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
