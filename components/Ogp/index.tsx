import Head from 'next/head';
import { normalizeUrl } from '../../utils/url';

type Props = {
  title: string;
  description: string;
  largeImage?: string | null;
  smallImage?: string | null;
};

export const Ogp = ({ title, description, largeImage, smallImage }: Props) => {
  return (
    <Head>
      <meta property='og:type' content='website' />
      <meta
        name='twitter:card'
        content={largeImage ? 'summary_large_image' : 'summary'}
      />
      <meta name='twitter:site' content='@kyoto3univ' />
      <meta name='twitter:creator' content='@kyoto3univ' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta
        property='note:card'
        content={largeImage ? 'summary_large_image' : 'summary'}
      />
      {/* <meta name='theme-color' content='#85005d' /> */}
      <meta name='author' content='京都三大学交流会' />
      <meta name='description' content={description} />
      <meta property='og:site_name' content='京都三大学新入生応援サイト' />
      <meta property='og:locale' content='ja' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {(largeImage || smallImage) && (
        <>
          <meta
            property='og:image'
            content={normalizeUrl(largeImage || smallImage || '')}
          />
          <meta
            name='twitter:image'
            content={normalizeUrl(largeImage || smallImage || '')}
          />
        </>
      )}
    </Head>
  );
};
