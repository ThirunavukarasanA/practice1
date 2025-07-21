import React, { useEffect } from 'react';
import './DateTimeInput.css';

export default function DatePicker() {
    // This function inserts the input on first render
    const insertDatePicker = () => {
        const existing = document.getElementById('datetime');
        const wrapper = document.getElementById('datetime-wrapper');

        if (!existing && wrapper) {
            const input = document.createElement('input');
            input.type = 'datetime-local';
            input.id = 'datetime';
            input.className =
                'w-full relative px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
            wrapper.appendChild(input);
        }
    };
    useEffect(() => {
        insertDatePicker(); // insert on mount

        const target = document.getElementById('datetime-wrapper');

        const observer = new MutationObserver(() => {
            const input = document.getElementById('datetime');
            if (!input) {
                insertDatePicker(); // reinserts if deleted
            }
        });

        if (target) {
            observer.observe(target, { childList: true });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Date & Time
                </label>
                <div id="datetime-wrapper"></div>
            </div>
        </div>
    );
}
