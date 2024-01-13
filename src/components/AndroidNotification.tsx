import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AndroidNotification: React.FC = () => {
    const [notificationVisible, setNotificationVisible] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent;

        if (userAgent.includes("Android") && !userAgent.includes("Ryzendesu")) {
            const timeoutId = setTimeout(() => {
                setNotificationVisible(true);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    const handleCloseClick = () => {
        setNotificationVisible(false);
    };

    return (
        <>
            {notificationVisible && (
                <div className="fixed top-16 right-4 w-72 bg-white text-black p-4 rounded shadow-md flex flex-col items-end" style={{ zIndex: 9999 }}>
                    <button onClick={handleCloseClick} className="self-end text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="flex items-center mb-2">
                        <Image src="/logo.svg" alt="Favicon" width={48} height={48} className="mr-2" />
                        <span>Coba Ryzendesu APK sekarang!</span>
                    </div>
                    <a href="https://ryzendesu.vip/apk" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Download
                    </a>
                </div>
            )}
        </>
    );
};

export default AndroidNotification;
