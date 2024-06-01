/**
 * Footer component for the application.
 *
 * This component displays the footer section of the website,
 * which includes the copyright information.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
    return (
        <footer className="mt-10 bg-purple-950 py-10 text-white">
            <div className="container mx-auto">
                <p className="text-tiny text-center">
                    &copy; 2024 Karl Horning
                </p>
            </div>
        </footer>
    );
}
