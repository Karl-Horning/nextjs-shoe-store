import ShowShoppingBag from "@/components/ShoppingBag/ShowShoppingBag";
import { Divider } from "@nextui-org/react";

/**
 * The page component that displays the shopping bag.
 *
 * @returns {JSX.Element} - The rendered page component.
 */
export default function page() {
    return (
        <main className="container mx-auto">
            <h1 className="mb-5 text-2xl">Shopping Bag</h1>
            <Divider className="mb-5" />
            <ShowShoppingBag />
        </main>
    );
}
