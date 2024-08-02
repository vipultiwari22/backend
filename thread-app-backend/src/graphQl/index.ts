import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphQlServer() {
	const gqlServer = new ApolloServer({
		typeDefs: `
        type Query {
           ${User.Query}
        }
        type Mutation {
        ${User.Mutation}
        `,
		resolvers: {
			Query: {
				...User.resolvers.queries,
			},
			Mutation: {
				...User.resolvers.mutation,
			},
		},
	});

	await gqlServer.start();
	return gqlServer;
}

export default createApolloGraphQlServer;
