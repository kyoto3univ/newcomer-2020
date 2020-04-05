declare global {
  interface Window {
    gtag(...args: unknown[]): void;
  }
}

const GAID = process.env.GA_ID;
export const pageview = (url: string) => {
  if (GAID) {
    // 0.5秒空けることで確実に
    setTimeout(() => {
      window.gtag('config', GAID, {
        page_path: url,
      });
    }, 500);
  }
};

export const GALoader = () => {
  return GAID ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GAID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GAID}', {
page_path: window.location.pathname,
});`,
        }}
      />
    </>
  ) : null;
};
