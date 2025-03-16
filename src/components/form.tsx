'use client'

import { useState } from "react";
import TurnstileBlock from "./turnstile";
import { useRouter } from "next/navigation";

export default function Form() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    async function preform() {
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setLoading(true);
    }
  
    async function submitForm(token: string) {
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, turnstileToken: token }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error);
            }

            router.push(`/email/${data.token}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full relative">
            <div className="w-full flex md:flex-row flex-col gap-4 justify-center items-center">
                <input 
                    type="email"
                    disabled={loading}
                    autoComplete="on"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email to send to (e.g. your@email.com)"
                    className="lg:max-w-[50%] w-full p-2 rounded-xl bg-white/10 backdrop-blur-md placeholder:text-white/50 text-white border border-white/20 focus:outline-none"
                />
                <button
                    onClick={preform}
                    disabled={loading}
                    className="border md:max-w-50 w-full border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer bg-black/60 text-white p-2 px-5 rounded-xl"
                >
                    generate<span className="hidden lg:inline"> mask email</span>
                </button>
            </div>

            <p className="text-red-400 w-full text-center mt-2 h-4 transition-all duration-300">
                {error}
            </p>

            {loading && (
                <TurnstileBlock
                    onError={() => {
                        setLoading(false);
                        setError('Captcha verification failed, please refresh the page and try again.');
                    }}
                    onSuccess={submitForm}
                />
            )}
        </div>
    )
}