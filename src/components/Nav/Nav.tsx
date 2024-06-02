"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Badge,
} from "@nextui-org/react";
import { IoBagOutline } from "react-icons/io5";
import { PiSneakerFill } from "react-icons/pi";
import { useBag } from "@/contexts/BagContext";

/**
 * Navigation bar component for the Shoe Store.
 *
 * This component displays the navigation bar with the brand logo,
 * a login link, and a shopping bag button.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export default function Nav() {
    const { bag } = useBag();

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
                    <Button
                        as={Link}
                        color="secondary"
                        href="/bag"
                        variant="flat"
                    >
                        {bag.length === 0 ? (
                            <IoBagOutline className="text-2xl" />
                        ) : (
                            <Badge content={bag.length} color="danger">
                                <IoBagOutline className="text-2xl" />
                            </Badge>
                        )}
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
