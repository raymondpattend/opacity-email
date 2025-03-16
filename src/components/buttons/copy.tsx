'use client'

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {

    const [copied, setCopied] = useState(false);
    const [show, setShow] = useState(false);

    function copy() {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setShow(true);
        setTimeout(() => {
            setCopied(false);
            setTimeout(() => { setShow(false); }, 100);
            // animation, todo optimize
        }, 2000);
    }

    return (
        <button onClick={copy} className={`border border-white/20 ${copied ? 'w-24': 'w-40'} duration-300 hover:bg-white/10 transition-all truncate cursor-pointer bg-white/20 text-white/80 rounded-xl p-2`}>
            {
                show ? "✓ copied" : "copy address"
            }
        </button>
    );
}