"use client";

import {
    IoBagAddOutline,
    IoBagRemoveOutline,
    IoBagOutline,
} from "react-icons/io5";
import { useBag, BagItem } from "@/contexts/BagContext";
import { Button, Link } from "@nextui-org/react";

/**
 * ShoppingBag component to display and manage shopping bag actions.
 *
 * @param {BagItem} props - The bag item properties.
 * @param {string} props.ShoeId - The ID of the shoe.
 * @param {string} props.Brand - The brand of the shoe.
 * @param {string} props.Model - The model of the shoe.
 * @param {string} props.Price - The price of the shoe.
 * @param {string} props.Image - The image of the shoe.
 * @param {string} props.Size - The size of the shoe.
 * @returns {JSX.Element} - The rendered ShoppingBag component.
 */
export default function ShoppingBag({
    ShoeId,
    Brand,
    Model,
    Price,
    Image,
    Size,
}: BagItem) {
    const { bag, addToBag, removeFromBag } = useBag();

    const handleAddToBag = () =>
        addToBag({
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
                onClick={handleAddToBag}
                radius="lg"
                size="lg"
                type="submit"
            >
                Add to bag
            </Button>
            <Button
                className="mb-5 w-full"
                color="warning"
                endContent={<IoBagRemoveOutline />}
                onClick={() => removeFromBag(ShoeId)}
                radius="lg"
                size="lg"
                type="submit"
            >
                Remove from bag
            </Button>
            <Button
                as={Link}
                className="mb-5 w-full"
                color="secondary"
                endContent={<IoBagOutline />}
                href="/bag"
                radius="lg"
                size="lg"
                type="submit"
                variant="ghost"
            >
                View {bag.length} {bag.length === 1 ? "item" : "items"} in
                bag
            </Button>
        </div>
    );
}
