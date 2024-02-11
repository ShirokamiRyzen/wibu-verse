'use client';
import React from 'react';

interface ModalProps {
    closeModal: () => void;
    maxHeight?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, maxHeight = '80vh', children }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-150 overflow-y-auto">
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
            <div className="absolute top-20 left-0 right-0 mx-auto max-w-md p-6 bg-white rounded-lg z-50 mb-10 md:max-w-2xl" style={{ maxHeight, overflowY: 'auto' }}>
                <div className="mb-4">{children}</div>
                <div className="text-right">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 clickAnimation"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
