import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BagProvider } from "@/contexts/BagContext";
import { ApolloWrapper } from "@/contexts/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the root layout.
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
    title: "Sole-Mates",
    description: "Created by Karl Horning",
};

/**
 * Root layout component wrapping children with various context providers and layouts.
 *
 * @param {object} props - React props.
 * @param {ReactNode} props.children - Child components.
 * @returns {ReactNode} JSX representing the root layout with wrapped children.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider>
                <BagProvider>
                    <body className={inter.className}>
                        <ApolloWrapper>
                            <Layout>{children}</Layout>
                        </ApolloWrapper>
                    </body>
                </BagProvider>
            </ThemeProvider>
        </html>
    );
}
