import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, VERIFICATION, PORTFOLIO_URL, GA_ID, CLARITY_ID, AD_MODE, ADSENSE_CLIENT, ADSENSE_ACCOUNT } from "@/lib/site";
import { siteGraphJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Chrome from "@/components/Chrome";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

const TITLE = "Exam Dates India: JEE Main, NEET UG, CUET UG, UPSC CSE";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Yaseen Khatib", url: PORTFOLIO_URL }],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: { type: "website", title: TITLE, description: SITE_DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, locale: "en_IN" },
  twitter: { card: "summary", title: TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(VERIFICATION.bing ? { other: { "msvalidate.01": VERIFICATION.bing } } : {}),
  },
  // Proves the AdSense account owns this site. It loads nothing and shows no ads.
  other: { "google-adsense-account": ADSENSE_ACCOUNT },
};

// First-touch + link-click tag, same as the other sites. The bootstrap runs at once (events queue in dataLayer);
// the heavy third-party scripts (gtag.js, Clarity) are injected after the first interaction or once the page is idle.
const analyticsScript = (id: string, clarity: string) =>
  String.raw`(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window,d=document,q=new URLSearchParams(location.search),st=null;try{st=w.localStorage}catch(e){}function g(k){return q.get(k)||''}var ref=g('ref'),hasUtm=!!g('utm_source');var ft=null;try{ft=JSON.parse(st.getItem('ga_ft')||'null')}catch(e){}if(!ft){var rh='';try{rh=d.referrer?new URL(d.referrer).hostname:''}catch(e){}ft={s:g('utm_source')||ref||rh||'direct',m:g('utm_medium')||(ref?'share':(rh?'referral':'none')),c:g('utm_campaign')||(ref?'ref-tag':'(not set)')};try{st.setItem('ga_ft',JSON.stringify(ft))}catch(e){}}w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag('js',new Date());var cfg={};if(!hasUtm&&ref){cfg.campaign_source=ref;cfg.campaign_medium='share';cfg.campaign_name='ref-tag'}gtag('config','${id}',cfg);w.gaEvent=function(n,p){try{p=p||{};p.first_source=ft.s;p.first_medium=ft.m;p.first_campaign=ft.c;p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};d.addEventListener('click',function(e){try{var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',n='',u=h;if(h.charAt(0)!=='#'){var l=null;try{l=new URL(h,location.href)}catch(x){}if(l&&l.origin===location.origin){n=a.closest('header,nav')?'nav_click':a.closest('footer')?'footer_click':'internal_link_click';u=l.pathname}else if(l&&/nta\.nic\.in|upsc\.gov\.in|upsconline\.nic\.in/.test(l.hostname)){n='official_site_click';u=l.href}}if(n)w.gaEvent(n,{cta_text:(a.textContent||'').trim().slice(0,60),link_url:u.slice(0,100)})}catch(x){}},true);var on=0;function L(){if(on)return;on=1;var s=d.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id=${id}';d.head.appendChild(s);${clarity}}['pointerdown','keydown','scroll','touchstart'].forEach(function(t){w.addEventListener(t,L,{once:true,passive:true})});function idle(){(w.requestIdleCallback||function(f){setTimeout(f,3000)})(L,{timeout:3000})}w.addEventListener('load',function(){idle();setTimeout(L,4000)});if(d.readyState==='complete'){idle();setTimeout(L,4000)}})();`;

const clarityLoader = (id: string) =>
  `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        {GA_ID && <script dangerouslySetInnerHTML={{ __html: analyticsScript(GA_ID, CLARITY_ID ? clarityLoader(CLARITY_ID) : "") }} />}
        {AD_MODE === "live" && ADSENSE_CLIENT && <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />}
      </head>
      <body className="font-sans">
        <JsonLd data={siteGraphJsonLd} />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
