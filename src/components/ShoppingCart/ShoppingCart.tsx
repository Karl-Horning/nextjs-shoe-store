"use client";

import {
    IoBagAddOutline,
    IoBagRemoveOutline,
    IoBagOutline,
} from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@nextui-org/react";

export default function ShoppingCart() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    const handleAddToCart = () =>
        addToCart({
            ShoeId: "1",
            Brand: "Nike",
            Model: "Air Max",
            Price: "100",
            Size: "10",
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
                onClick={() => removeFromCart("1")}
                radius="lg"
                size="lg"
                type="submit"
            >
                Remove from cart
            </Button>
            <Button
                className="mb-5 w-full"
                color="danger"
                endContent={<IoBagOutline />}
                onClick={clearCart}
                radius="lg"
                size="lg"
                type="submit"
            >
                Clear cart
            </Button>

            <ul>
                {cart.map((item) => (
                    <li key={item.ShoeId}>
                        {item.Brand} {item.Model} - Size: {item.Size} - $
                        {item.Price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
