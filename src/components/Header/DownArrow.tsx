import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

/**
 * DownArrow component displays a downward arrow icon
 * that scrolls down the page when clicked.
 */
export default function DownArrow() {
    const [hideArrow, setHideArrow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight - 500) {
                setHideArrow(true);
            } else {
                setHideArrow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /**
     * Handles the click event on the arrow icon.
     * Scrolls down to the height of the screen smoothly.
     */
    const handleClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            className={`fixed bottom-0 left-1/2 mb-8 -translate-x-1/2 transform cursor-pointer ${hideArrow ? "hidden" : ""}`}
            onClick={handleClick}
        >
            <FaArrowDown size={32} />
        </motion.div>
    );
}
