import { getBaseUrl } from "@/utils/isTypeOfWindow";

export default {
  title: "Homemade food",
  description: 'Platform for Home Chefs to promote their food creations and for consumers to get inspired for a good meal',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'Eatchefs',
    title: "Homemade food",
    description: 'Platform for Home Chefs to promote their food creations and for consumers to get inspired for a good meal',
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
