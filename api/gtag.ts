declare global {
  interface Window {
    gtag(...args: unknown[]): void;
  }
}

const GAID = process.env.GA_ID;
export const pageview = (url: string) => {
  if (GAID) {
    window.gtag('config', GAID, {
      page_path: url,
    });
  }
};
