import DownArrow from "./DownArrow";

/**
 * Header component for the site.
 *
 * @returns {JSX.Element} The JSX representation of the header component.
 */
export default function Header() {
    return (
        <header className="mb-10 flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-800 via-purple-700 to-yellow-500 text-white">
            <div className="container mx-auto min-w-[375px]">
                <h1 className="mb-10 p-20 text-center text-8xl font-black">
                    Trainers without the sole-searching
                </h1>
                <DownArrow />
            </div>
        </header>
    );
}
