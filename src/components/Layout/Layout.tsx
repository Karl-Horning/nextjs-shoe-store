import Nav from "@/components/Nav/Nav";

/**
 * Props for the Layout component.
 */
interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Layout component that includes the navigation bar and wraps around the main content.
 *
 * @param {LayoutProps} props - The properties passed to the layout component.
 * @returns {JSX.Element} The rendered layout component.
 */
export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <div>
            <Nav />
            <main>{children}</main>
        </div>
    );
}
