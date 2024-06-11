"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
    ApolloClient,
    ApolloNextAppProvider,
    InMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URI = process.env.NEXT_PUBLIC_API_URI;

/**
 * Creates an Apollo Client instance with the provided API URI and API key.
 *
 * @returns {ApolloClient} The configured Apollo Client instance.
 */
function makeClient() {
    const httpLink = new HttpLink({
        uri: API_URI,
        fetchOptions: { cache: "no-store" },
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                "x-api-key": API_KEY,
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink.concat(httpLink),
                  ])
                : authLink.concat(httpLink),
    });
}

/**
 * Provides Apollo Client context to its children using ApolloNextAppProvider.
 *
 * @param {object} props - React props.
 * @param {ReactNode} props.children - Child components.
 * @returns {ReactNode} JSX representing the Apollo Next App Provider with configured Apollo Client.
 */
export function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
