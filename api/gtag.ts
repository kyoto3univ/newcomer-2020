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
