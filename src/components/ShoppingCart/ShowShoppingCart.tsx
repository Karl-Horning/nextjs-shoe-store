"use client";

import {
    Button,
    Image,
    Link,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { IoBagRemoveOutline, IoBagOutline } from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";

/**
 * Component that displays the shopping cart.
 *
 * @returns {JSX.Element} - The rendered shopping cart component.
 */
export default function ShowShoppingCart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const total = cart.reduce((acc, item) => acc + parseFloat(item.Price), 0);

    return (
        <>
            <Table aria-label="Shopping cart table" className="mb-10">
                <TableHeader>
                    <TableColumn>Image</TableColumn>
                    <TableColumn>Brand</TableColumn>
                    <TableColumn>Model</TableColumn>
                    <TableColumn>Size</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                {cart.length === 0 ? (
                    <TableBody emptyContent={"Your cart is empty"}>
                        {[]}
                    </TableBody>
                ) : (
                    <TableBody>
                        {cart.map((item) => (
                            <TableRow key={item.ShoeId}>
                                <TableCell>
                                    <Image
                                        alt=""
                                        radius="sm"
                                        src={`/${item.Image}`}
                                        // src="/acne_studios_acne_studios.png"
                                        width={"50px"}
                                    />
                                </TableCell>
                                <TableCell>{item.Brand}</TableCell>
                                <TableCell>{item.Model}</TableCell>
                                <TableCell>{item.Size}</TableCell>
                                <TableCell>£{item.Price}</TableCell>
                                <TableCell>
                                    <Button
                                        color="warning"
                                        isIconOnly
                                        onClick={() =>
                                            removeFromCart(item.ShoeId)
                                        }
                                        radius="lg"
                                        size="lg"
                                        type="submit"
                                    >
                                        <IoBagRemoveOutline />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>

            <div id="total-container">
                <p className="mb-10 text-center text-xl font-bold">
                    Total: £{total.toFixed(2)}
                </p>
            </div>

            <div
                id="button-container"
                className="md:grid md:grid-cols-5 md:gap-8"
            >
                <Button
                    as={Link}
                    className="mb-5 w-full md:col-span-4"
                    color="secondary"
                    href="/"
                    endContent={<IoBagOutline />}
                    radius="lg"
                    size="lg"
                >
                    Proceed to checkout
                </Button>
                <Button
                    className="mb-5 w-full md:col-span-1"
                    color="danger"
                    endContent={<IoBagOutline />}
                    onClick={clearCart}
                    radius="lg"
                    size="lg"
                >
                    Clear cart
                </Button>
            </div>
        </>
    );
}
