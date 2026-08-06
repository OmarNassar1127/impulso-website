'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import { trackPageView } from '@/lib/analytics';

export default function GoogleAnalytics() {
  const gaId = siteConfig.gaMeasurementId;
  const pathname = usePathname();

  // One page_view per route. gtag runs with send_page_view:false, so this is
  // the single source of page views, first load included, and nothing double
  // counts.
  useEffect(() => {
    trackPageView();
  }, [pathname]);

  // The policy pages (privacy, cookies, terms) are hash-routed, which never
  // changes the pathname, so they need their own listener.
  useEffect(() => {
    const onHashChange = () => trackPageView();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {/*
        Consent Mode v2 defaults. This has to execute before gtag.js loads,
        so it's a plain inline script instead of next/script (which defers).
        Everything optional starts denied; the cookie banner grants it.
        wait_for_update gives the stored-preference read below time to land
        before the first hits go out.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try{
  var stored = localStorage.getItem('cookiePreferences');
  if(stored){
    var p = JSON.parse(stored);
    gtag('consent','update',{
      analytics_storage: p.analytics ? 'granted' : 'denied',
      ad_storage: p.marketing ? 'granted' : 'denied',
      ad_user_data: p.marketing ? 'granted' : 'denied',
      ad_personalization: p.marketing ? 'granted' : 'denied'
    });
  }
}catch(e){}
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
