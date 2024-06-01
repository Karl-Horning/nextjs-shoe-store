import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { IoCartOutline } from "react-icons/io5";
import { PiSneakerFill } from "react-icons/pi";

/**
 * Navigation bar component for the Shoe Store.
 *
 * This component displays the navigation bar with the brand logo,
 * a login link, and a shopping cart button.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export default function Nav() {
    return (
        <Navbar maxWidth="xl">
            <Link href="/" className="text-gray-800">
                <NavbarBrand>
                    <PiSneakerFill />
                    <p className="ml-1 font-bold text-inherit">Shoe Store</p>
                </NavbarBrand>
            </Link>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link className="text-purple-800" href="#">
                        Login
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="secondary" href="#" variant="flat">
                        <IoCartOutline className="text-2xl" />
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
