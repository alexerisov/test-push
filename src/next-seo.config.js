import { getBaseUrl } from "@/utils/isTypeOfWindow";

export default {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'Eatchefs',
    images: [
      {
        url: `${getBaseUrl()}/images/index/logo.png`,
        width: 120,
        height: 83,
        alt: 'Logo',
      }
    ],
  }
};
