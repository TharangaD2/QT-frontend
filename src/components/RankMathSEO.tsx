"use client";

import React, { useEffect } from 'react';

interface RankMathSEOProps {
    head: string | null;
}

export default function RankMathSEO({ head }: RankMathSEOProps) {
    if (!head) return null;

    // We use a regular expression to extract the tags from the head string
    // and render them. Alternatively, we can inject them into the DOM directly.

    return (
        <head dangerouslySetInnerHTML={{ __html: head }} />
    );
}
