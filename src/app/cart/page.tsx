import ShowShoppingCart from "@/components/ShoppingCart/ShowShoppingCart";
import { Divider } from "@nextui-org/react";

/**
 * The page component that displays the shopping cart.
 *
 * @returns {JSX.Element} - The rendered page component.
 */
export default function page() {
    return (
        <main className="container mx-auto">
            <h1 className="mb-5 text-2xl">Shopping Cart</h1>
            <Divider className="mb-5" />
            <ShowShoppingCart />
        </main>
    );
}
