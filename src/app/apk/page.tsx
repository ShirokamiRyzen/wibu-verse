'use client';
import React from 'react';

const Page: React.FC = () => {

    const apk = 'https://ryzenshare.vercel.app/Ryzen1/ryzendesu.com/Wibu-Verse/Ryzendesu.V1.7.stable.apk';

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">Ryzendesu APK</h1>
                <p className="text-lg mb-4">
                    Download versi terbaru disini.
                </p>
                <a href={apk} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Download (V1.7)
                </a>
            </div>
        </div>
    );
};

export default Page;
