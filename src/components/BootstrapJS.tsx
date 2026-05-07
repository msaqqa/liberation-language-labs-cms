'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function BootstrapClient() {
  const pathname = usePathname()
  const [scriptLoaded, setScriptLoaded] = useState(false)
  useEffect(() => {
    // استدعاء ملف الـ JS برمجياً عند تحميل المكون في المتصفح فقط
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && (window as any).initTheme) {
      console.log('Route changed, re-initializing theme...')
      ;(window as any).initTheme()
    }
  }, [pathname, scriptLoaded])

  return (
    <>
      {/* 3. تحميل ملفك الخاص برابط صحيح */}
      {/* strategy="afterInteractive" تضمن أداءً جيداً */}
      <Script
        src="/assets/js/main.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('main.min.js loaded by Next.js Script tag')
          setScriptLoaded(true) // هذا سيطلق الـ useEffect الثاني
        }}
        onError={(e) => {
          console.error('Error loading main.min.js', e)
        }}
      />
    </>
  )
}
