import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

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
            <main className="min-h-screen">{children}</main>
            <Footer />
        </div>
    );
}
