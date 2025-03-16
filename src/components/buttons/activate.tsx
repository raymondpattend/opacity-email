'use client'

import { useState } from "react";

export function ActivateButton({ loginToken, state }: { loginToken: string, state: boolean }) {
    const [disabled, setDisabled] = useState(state);

    function toggleRelay() {
        setDisabled(!disabled);
        fetch('/api/token', {
            method: 'POST',
            body: JSON.stringify({ token: loginToken, active: !disabled }),
        }).then(() => {
            setDisabled(!disabled);
        }).catch(() => {
            setDisabled(state);
        });
    }
    return (
        <button onClick={toggleRelay} className={`border ${disabled ? 'w-34' : 'w-40'} border-white/20 hover:${disabled ? 'bg-emerald-500/30' : 'bg-red-500/10'} transition-all duration-300 cursor-pointer bg-${disabled ? 'green-500/20' : 'red-500/20'} text-white rounded-xl p-2`}>
            {disabled ? "reactivate relay" : "deactivate relay"}
        </button>
    )
}