"use client";

import { useState } from "react";

interface ReadMoreProps {
    text?: string;
    limit?: number;
    className?: string;
}

export function ReadMore({ text = "", limit = 3, className = "" }: ReadMoreProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    // Map limit to Tailwind line-clamp classes
    const clampClass =
        limit === 1 ? "line-clamp-1" :
            limit === 2 ? "line-clamp-2" :
                limit === 3 ? "line-clamp-3" :
                    limit === 4 ? "line-clamp-4" :
                        limit === 5 ? "line-clamp-5" : "line-clamp-3";

    return (
        <div className={`relative ${className}`}>
            <div className={`transition-all duration-300 ${!isExpanded ? `${clampClass} md:line-clamp-none` : ""}`}>
                {text}
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className="md:hidden text-primary font-semibold text-sm mt-1 hover:underline focus:outline-none"
            >
                {isExpanded ? "Read Less" : "Read More"}
            </button>
        </div>
    );
}
