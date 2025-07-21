import React, { useState } from "react";

const DeviceDector = () => {
    const [values, setValues] = useState({
        os: "Unknown",
        version: "Unknown",
        device: "Unknown"
    });

    const detectOS = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        let os = "Unknown";
        let version = "Unknown";
        let device = "Unknown";

        if (/windows phone/i.test(userAgent)) {
            os = "Windows Phone";
        } else if (/android/i.test(userAgent)) {
            os = "Android";
            version = userAgent.match(/Android\s([0-9\.]+)/)?.[1] || "Unknown";

            // ✅ Extract device name for Android
            const androidDevice = userAgent.match(/\(([^)]+)\)/);
            if (androidDevice) {
                const deviceDetails = androidDevice[1].split("; ");
                if (deviceDetails.length > 2) {
                    device = deviceDetails[deviceDetails.length - 1]; // Get last part (device model)
                }
            }
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            os = "iOS";
            version = userAgent.match(/OS\s([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "Unknown";

            // ✅ Extract Apple device name
            if (/iPhone/.test(userAgent)) device = "iPhone";
            else if (/iPad/.test(userAgent)) device = "iPad";
            else if (/iPod/.test(userAgent)) device = "iPod";
        } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
            os = "MacOS";
            version = userAgent.match(/Mac OS X\s([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "Unknown";
            device = "Mac";
        } else if (/Win/.test(userAgent)) {
            os = "Windows";
            version = userAgent.match(/Windows NT\s([0-9\.]+)/)?.[1] || "Unknown";
            device = "PC";
        } else if (/Linux/.test(userAgent)) {
            os = "Linux";
            device = "PC";
        } else if (/X11/.test(userAgent)) {
            os = "UNIX";
            device = "PC";
        }

        setValues({ os, version, device });
    };

    return (
        <div>
            <button onClick={detectOS}>Detect Device</button>
            <p>OS: {values.os}</p>
            <p>Version: {values.version}</p>
            <p>Device: {values.device}</p>
        </div>
    );
};

export default DeviceDector;
