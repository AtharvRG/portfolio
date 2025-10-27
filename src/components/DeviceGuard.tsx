"use client";

import { useEffect, useState } from "react";

function isPhoneDevice() {
  if (typeof window === "undefined") return false; // Decide on client
  const ua = (navigator.userAgent || "").toLowerCase();
  const platform = (navigator.platform || (navigator as any).userAgentData?.platform || "").toLowerCase();
  const uaDataMobile = (navigator as any).userAgentData?.mobile === true;

  // iOS
  const isiPhone = /iphone/.test(ua);
  // iPadOS 13+ sometimes reports as Mac; detect by touch capability
  const isIPad = /ipad/.test(ua) || (/mac/.test(platform) && navigator.maxTouchPoints > 1);

  // Android
  const isAndroid = /android/.test(ua);
  const isAndroidPhone = isAndroid && /mobile/.test(ua);
  const isAndroidTablet = isAndroid && !/mobile/.test(ua);

  // Generic hints
  const explicitTablet = /tablet|playbook|silk/.test(ua) || isIPad || isAndroidTablet;
  const explicitPhone = isiPhone || isAndroidPhone || (/mobi|mobile/.test(ua) && !explicitTablet) || uaDataMobile;

  if (explicitPhone) return true;
  if (explicitTablet) return true;
  // Default to desktop/laptop allowed
  return false;
}

function allowAccess() {
  if (typeof window === "undefined") return true; // SSR: decide on client only
  return !isPhoneDevice();
}

export default function DeviceGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const check = () => {
      setAllowed(allowAccess());
      setChecked(true);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // Until we check on the client, render nothing to avoid flicker
  if (!checked) return null;

  return (
    <>
      {children}
      {!allowed && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 text-white p-6 text-center"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <div className="max-w-lg space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">Unsupported Screen</h1>
            <p className="opacity-90">
              Mobile phones/tablets are not supported. Please use a desktop/laptop to view this site.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
