"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    if (!visible) return null;
    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-rust p-3 text-white shadow-lg transition-opacity hover:bg-rust-light cursor-pointer"
        >↑</button>
    )
}