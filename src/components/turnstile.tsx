'use client'

import { Turnstile } from "next-turnstile";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useState } from "react";

export default function TurnstileBlock({onError, onSuccess}: {onError: (error: string) => void, onSuccess: (token: string) => void}) {

    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onOpenChange={()=>{}}>
            {/* hidden from client */}
            <DialogTitle className="hidden">
                Security check
            </DialogTitle>
            <DialogContent className="bg-white/20 w-min border border-white/20">
                <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    retry="auto"
                    refreshExpired="auto"
                    sandbox={process.env.NODE_ENV === 'development'}
                    onError={() => {
                        onError('Securigty check failed. Please try again.');
                        setOpen(false);
                    }}
                    onExpire={() => {
                        onError('Security check expired. Please verify again.');
                        setOpen(false);
                    }}
                    onVerify={(token) => {
                        onSuccess(token);
                        setOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}