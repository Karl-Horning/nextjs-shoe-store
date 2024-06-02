"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

/**
 * Interface for a cart item.
 * @property {string} ShoeId - The unique identifier for the shoe.
 * @property {string} Brand - The brand of the shoe.
 * @property {string} Model - The model of the shoe.
 * @property {string} Price - The price of the shoe.
 * @property {string} Size - The size of the shoe.
 */
interface CartItem {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Size: string;
}

/**
 * Interface for the cart context.
 * @property {CartItem[]} cart - The current state of the cart.
 * @property {function(CartItem): void} addToCart - Function to add an item to the cart.
 * @property {function(string): void} removeFromCart - Function to remove an item from the cart by ShoeId.
 * @property {function(): void} clearCart - Function to clear all items from the cart.
 */
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (ShoeId: string) => void;
    clearCart: () => void;
}

/**
 * Create the cart context with a default value of null.
 */
const CartContext = createContext<CartContextType | null>(null);

/**
 * CartProvider component that wraps its children with the CartContext provider.
 * @param {Object} props - The props for the CartProvider component.
 * @param {ReactNode} props.children - The children to be wrapped by the CartProvider.
 * @returns {JSX.Element} The CartProvider component.
 */
export const CartProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from localStorage on client side
    useEffect(() => {
        if (isMounted) return; // Prevent duplicate initialization
        setIsMounted(true);

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, [isMounted]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isMounted]);

    /**
     * Adds an item to the cart.
     * @param {CartItem} shoe - The shoe item to add to the cart.
     */
    const addToCart = (shoe: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem.ShoeId === shoe.ShoeId
            );

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.ShoeId === shoe.ShoeId ? { ...cartItem } : cartItem
                );
            } else {
                return [...prevCart, shoe];
            }
        });
    };

    /**
     * Removes an item from the cart by ShoeId.
     * @param {string} ShoeId - The ID of the shoe item to remove from the cart.
     */
    const removeFromCart = (ShoeId: string) => {
        setCart((prevCart) =>
            prevCart.filter((shoe) => shoe.ShoeId !== ShoeId)
        );
    };

    /**
     * Clears all items from the cart.
     */
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to use the cart context.
 * @throws Will throw an error if used outside of a CartProvider.
 * @returns {CartContextType} The cart context.
 */
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
