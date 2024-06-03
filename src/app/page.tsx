"use client";

import Header from "@/components/Header/Header";
import { useTheme } from "@/contexts/ThemeContext";
import ShoeCardList from "@/components/ShoeCard/ShoeCardList";

export default function Home() {
    const theme = useTheme();
    return (
        <main>
            <Header />
            <ShoeCardList />
        </main>
    );
}
