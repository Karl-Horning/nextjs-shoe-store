"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

/**
 * Interface for a bag item.
 * @property {string} ShoeId - The unique identifier for the shoe.
 * @property {string} Brand - The brand of the shoe.
 * @property {string} Model - The model of the shoe.
 * @property {string} Price - The price of the shoe.
 * @property {string} Image - The image filename of the shoe.
 * @property {string} Size - The size of the shoe.
 */
export interface BagItem {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Image: string;
    Size: string;
}

/**
 * Interface for the bag context.
 * @property {BagItem[]} bag - The current state of the bag.
 * @property {function(BagItem): void} addToBag - Function to add an item to the bag.
 * @property {function(string): void} removeFromBag - Function to remove an item from the bag by ShoeId.
 * @property {function(): void} clearBag - Function to clear all items from the bag.
 */
interface BagContextType {
    bag: BagItem[];
    addToBag: (item: BagItem) => void;
    removeFromBag: (ShoeId: string) => void;
    clearBag: () => void;
}

/**
 * Create the bag context with a default value of null.
 */
const BagContext = createContext<BagContextType | null>(null);

/**
 * BagProvider component that wraps its children with the BagContext provider.
 * @param {Object} props - The props for the BagProvider component.
 * @param {ReactNode} props.children - The children to be wrapped by the BagProvider.
 * @returns {JSX.Element} The BagProvider component.
 */
export const BagProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [bag, setBag] = useState<BagItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Load bag from localStorage on client side
    useEffect(() => {
        if (isMounted) return; // Prevent duplicate initialization
        setIsMounted(true);

        const storedBag = localStorage.getItem("bag");
        if (storedBag) {
            setBag(JSON.parse(storedBag));
        }
    }, [isMounted]);

    // Save bag to localStorage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("bag", JSON.stringify(bag));
        }
    }, [bag, isMounted]);

    /**
     * Adds an item to the bag.
     * @param {BagItem} shoe - The shoe item to add to the bag.
     */
    const addToBag = (shoe: BagItem) => {
        setBag((prevBag) => {
            const existingItem = prevBag.find(
                (bagItem) => bagItem.ShoeId === shoe.ShoeId
            );

            if (existingItem) {
                return prevBag.map((bagItem) =>
                    bagItem.ShoeId === shoe.ShoeId ? { ...bagItem } : bagItem
                );
            } else {
                return [...prevBag, shoe];
            }
        });
    };

    /**
     * Removes an item from the bag by ShoeId.
     * @param {string} ShoeId - The ID of the shoe item to remove from the bag.
     */
    const removeFromBag = (ShoeId: string) => {
        setBag((prevBag) =>
            prevBag.filter((shoe) => shoe.ShoeId !== ShoeId)
        );
    };

    /**
     * Clears all items from the bag.
     */
    const clearBag = () => {
        setBag([]);
    };

    return (
        <BagContext.Provider
            value={{ bag, addToBag, removeFromBag, clearBag }}
        >
            {children}
        </BagContext.Provider>
    );
};

/**
 * Custom hook to use the bag context.
 * @throws Will throw an error if used outside of a BagProvider.
 * @returns {BagContextType} The bag context.
 */
export const useBag = (): BagContextType => {
    const context = useContext(BagContext);
    if (!context) {
        throw new Error("useBag must be used within a BagProvider");
    }
    return context;
};
