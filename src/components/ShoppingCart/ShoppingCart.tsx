"use client";

import {
    IoBagAddOutline,
    IoBagRemoveOutline,
    IoBagOutline,
} from "react-icons/io5";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Button, Link } from "@nextui-org/react";

/**
 * ShoppingCart component to display and manage shopping cart actions.
 *
 * @param {CartItem} props - The cart item properties.
 * @param {string} props.ShoeId - The ID of the shoe.
 * @param {string} props.Brand - The brand of the shoe.
 * @param {string} props.Model - The model of the shoe.
 * @param {string} props.Price - The price of the shoe.
 * @param {string} props.Image - The image of the shoe.
 * @param {string} props.Size - The size of the shoe.
 * @returns {JSX.Element} - The rendered ShoppingCart component.
 */
export default function ShoppingCart({
    ShoeId,
    Brand,
    Model,
    Price,
    Image,
    Size,
}: CartItem) {
    const { cart, addToCart, removeFromCart } = useCart();

    const handleAddToCart = () =>
        addToCart({
            ShoeId,
            Brand,
            Model,
            Price,
            Image,
            Size,
        });
    return (
        <div>
            <Button
                className="mb-5 w-full"
                color="secondary"
                endContent={<IoBagAddOutline />}
                onClick={handleAddToCart}
                radius="lg"
                size="lg"
                type="submit"
            >
                Add to cart
            </Button>
            <Button
                className="mb-5 w-full"
                color="warning"
                endContent={<IoBagRemoveOutline />}
                onClick={() => removeFromCart(ShoeId)}
                radius="lg"
                size="lg"
                type="submit"
            >
                Remove from cart
            </Button>
            <Button
                as={Link}
                className="mb-5 w-full"
                color="secondary"
                endContent={<IoBagOutline />}
                href="/cart"
                radius="lg"
                size="lg"
                type="submit"
                variant="ghost"
            >
                View {cart.length} {cart.length === 1 ? "item" : "items"} in
                cart
            </Button>
        </div>
    );
}
