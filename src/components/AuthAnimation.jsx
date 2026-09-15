'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AuthAnimation() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900/30">
            <DotLottieReact
                src="/Login.json"
                loop
                autoplay
                style={{ width: '80%', height: '80%' }}
            />
        </div>
    );
}