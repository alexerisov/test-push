import React from 'react';
import { connect } from 'react-redux';
import classes from './index.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const PrivacyPolicy = () => {
  const content = (
    <div className={classes.privacyPolicy}>
      <h1 className={classes.privacyPolicy__title}>Privacy Policy</h1>
      <p className={classes.privacyPolicy__text}>
        Our commitment to transparency applies not only to the food we source, but also to the data we collect about
        you, how it is used and with whom it is shared. This Privacy Policy describes how Grocery Delivery E-Services
        USA, INC. dba Eatchefs (<b>“Eatchefs”</b>, <b>“we”</b>, <b>“us”</b> or <b>“our”</b>) collect, use and share your
        personal information in connection with your use of our websites (collectively, the <b>“Site”</b>), mobile
        applications (collectively, the
        <b>“App”</b>), and social media pages that link to this Privacy Policy (together with the “Site” and “App”, the
        “Service”); and in the context of certain offline activities described in this notice.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Information you provide to us.</b>
        <br />
        Personal information you may provide to us through the Service or otherwise includes:
        <br />
        <b>- Contact data,</b> such as your first and last name, email and mailing addresses, postal code, and phone
        number.
        <br />
        <b>- Profile data,</b> such as your username and password that you set to establish an online account with us,
        and other information you include in your account profile.
        <br />
        <b>- Communications</b> that we exchange when you communicate with us, such as when you request support, contact
        us with questions or feedback or complete our surveys.
        <br />
        <b>- Content,</b> such comments, text, images, audio, video or other content you post to or provide through the
        Service.
        <br />
        <b>- Payment and transactional data,</b> such as the information needed to complete your orders on or through
        the Service (including name, credit card information, billing and shipping information), information about your
        payment transactions, and your order history.
        <br />
        <b>- Marketing data,</b> such as your preferences for receiving communications about our products, activities,
        events, and publications; details about how you engage with our communications; and information you provide when
        you participate in an event, contest or promotion.
        <br />
        <b>- Other information</b> such as your preferences for receiving communications about our products, activities,
        events, and publications; details about how you engage with our communications; and information you provide when
        you participate in an event, contest or promotion.
        <br />
        <br />
        <b>Other sources.</b> We may combine personal information we receive from you with personal information we
        obtain from other sources, such as:
        <br />
        <b>- Data providers,</b> such as information services and data licensors.
        <br />
        <b>- Public sources,</b> such as public social media platforms.
        <br />
        <b>- Business partners,</b> such as joint marketing partners and event co-sponsors.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Automatic collection.</b> We, our service providers, and our business partners may automatically log
        information about you, your computer or mobile device, and your activity over time on the Sites and other online
        services, including:
        <br />
        <b>- Device data,</b> such as your computer or mobile device opersuch as your computer or mobile device
        operating system type and version number, manufacturer and model, browser type, screen resolution, IP address,
        the website you visited before browsing to our website, and general location information such as city, state or
        geographic area.
        <br />
        <b>- Online activity data,</b> such as pages or screens you viewed, how long you spent on a page or screen,
        navigation paths between pages or screens, information about your activity on a page or screen, access times,
        and duration of access. <b>Precise geolocation data,</b> such as when you authorize our mobile application to
        access your location.
        <br />
        <b>- Security data,</b> such security camera footage recorded at our offices or facilities.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Cookies and similar technologies.</b> Some of our automatic data collection on the Site is facilitated by:
        <br />
        <b>- Cookies,</b> which are text files that websites store a visitor‘s device to uniquely identify the visitor’s
        browser or to store information or settings in the browser for the purpose of tracking user activity and
        patterns, helping you navigate between pages efficiently, remembering your preferences and generally improving
        your browsing experience.
        <br />
        <b>- Flash cookies,</b> or locally-stored objects, which are used for purposes similar to cookies but allow
        storage of a larger amount of data.
        <br />
        <b>- Web beacons,</b> also known as pixel tags or clear GIFs, typically used to demonstrate that a webpage or
        email was accessed or opened, or that certain content was viewed or clicked, typically to compile statistics
        about usage of websites and the success of marketing campaigns.
        <br />
        <b>- Software development kits,</b> or SDKs, which are used to incorporate third party computer code into our
        App that allows the third party service providers or advertising partners to collect data directly from it for a
        variety of purposes, including to provide us with analytics regarding the use of the App, to integrate with
        social media, add features or functionality to our app, or to facilitate online advertising.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Information about others. </b>You share personal information about others with us, such as when you send them
        a gift through the Service or refer friends or other contacts to us. When you share the personal information of
        others with us, you are responsible for ensuring you have their permission to do so.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Information we obtain from social media platforms. </b>Information you provide when you interact with us on
        social media. If you choose to log in to the Service through a social network or other third party platform, or
        otherwise connect your account on a third party platform to your account through the Service, we may collect
        information about you from that platform or network. For example, this information may include your username,
        user ID, profile picture, cover photo, email address and other contact information, and your affiliations. You
        may also have the opportunity to provide us with additional information through the third party platform, such
        as a list of your friends or connections. Read more about third party platforms in the Your Choices section
        below.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>How we use your personal information.</b>
        <br />
        <b>Service delivery. </b> We may use your personal information to:
        <br />- provide, operate and improve the Service and our business;
        <br />- facilitate your authentication to the Service by logging into a third party platform, such as Facebook
        or Google;
        <br />- enable security features of the Service, such as by sending you security codes via email or SMS, and
        remembering devices from which you have previously logged in;
        <br />- facilitate social features of the Service, such as by identifying and suggesting connections with other
        users of the Service and providing chat or messaging functionality;
        <br />- communicate with you about the Service, including by sending you announcements, updates, security
        alerts, and support and administrative messages;
        <br />- understand your needs and interests, and personalize your experience with the Service and our
        communications;
        <br />- provide support and maintenance for the Service and to respond to your requests, questions and feedback
        <br />
        <b>Research and development. </b>We may use your personal information for research and development purposes,
        including to analyze and improve the Service and our business. As part of these activities, we may create
        aggregated, de-identified or other anonymous data from personal information we collect. We make personal
        information into anonymous data by removing information that makes the data personally identifiable to you. We
        may use this anonymous data and share it with third parties for our lawful business purposes, including to
        analyze and improve the Service and promote our business.
        <br />
        <b>Marketing and advertising </b> We and our third party advertising partners may collect and use your personal
        information for marketing and advertising purposes:
        <br />
        <b>Direct marketing. </b> We may send you Eatchefs-related or other direct marketing communications as permitted
        by law, including text messages that you may opt to receive from us that may include information about
        promotional offers and more. These messages may use information automatically collected based on your actions
        while on our Site or App and may prompt messaging such as cart reminders. If you opt to have SMS notifications
        sent to your mobile phone, we receive and store the information you provide, including your telephone number or
        when you read a text message. You may opt-out of our marketing communications as described in the Opt-out of
        marketing section below. For more information about text messages, see our Terms and Conditions.
        <br />
        <b>Interest-based advertising. </b> We may contract with third-party advertising companies and social media
        companies to display ads on our Service and other sites. These companies may use cookies and similar
        technologies to try to tailor the ads you see online to your interests based on your activity over time across
        our Service and other sites, or your interaction with our emails. These ads are known as "interest-based
        advertisements." You can learn more about your choices for limiting interest-based advertising, in the
        Advertising choices section below.
        <br />
        <b>Compliance and protection. </b> We may use your personal information to:
        <br />- comply with applicable laws, lawful requests, and legal process, such as to respond to subpoenas or
        requests from government authorities.
        <br />- protect our, your or others’ rights, privacy, safety or property (including by making and defending
        legal claims);
        <br />- enforce the terms and conditions that govern the Services and prevent, identify, investigate and deter
        fraudulent, harmful, unauthorized, unethical or illegal activity, including cyberattacks and identity theft.
        <br />
        <b>For other purposes. </b> We may also use your personal information for other purposes described in this
        Privacy Policy or at the time we collect the information.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>How we share your personal information</b>
        <br />
        We may share your personal information with the following parties and as otherwise described in this Privacy
        Policy or at the time of collectionWe may also use your personal information for other purposes described in
        this Privacy Policy or at the time we collect the information.
        <br />
        <b>Affiliates. </b> Our corporate parent, subsidiaries, and affiliates, for purposes consistent with this
        Privacy Policy.
        <br />
        <b>Service providers. </b> Unrelated companies and individuals that provide services on our behalf or help us
        operate the Service or our business (such as customer support, hosting, payment processing, analytics, email
        delivery, marketing, and database management services). These third parties may use your personal information
        only as authorized under our contracts with them.
        <br />
        <b>Partners. </b> Third party partners who offer products and services that may be of interest to you. We may
        sometimes share your personal information with partners or enable partners to collect information directly via
        our Service, including when you have indicated your interest in certain products or services.
        <br />
        <b>Advertising partners. </b> Third party advertising companies that collect information about your activity on
        the Site and other online services to help us advertise our and other services, and/or use hashed customer lists
        that we share with them to deliver ads on their platforms to our customers and similar users (
        <b>"Custom Audience Campaigns"</b>).
        <br />
        <b>Third party platforms. </b> Social media platforms or other third party platforms that you connect to the
        Service and where you authorize us to share your information with them (such as when you use options to access
        the Service by logging into the third party platform).
        <br />
        <b>Other users. </b> Other users of the Service or the public when you chose to make your profile or other
        personal information available to them through the Service, such as when you provide comments, reviews, survey
        responses, or other content. We do not control how other users or third parties use any personal information
        that you make available to such users or the public. Please be aware that any information you post publicly can
        be cached, copied, screen captured or stored elsewhere by others (e.g., search engines) before you have a chance
        to edit or remove it.
        <br />
        <b>Professional advisors. </b> Professional advisors, such as lawyers, bankers, auditors and insurers, where
        necessary in the course of the professional services that they render to us.
        <br />
        <b>Authorities and others. </b> Law enforcement, government authorities, and private parties, when we believe in
        good faith it is necessary or appropriate for the compliance and operations purposes described above
        <br />
        <b>Business transferees. </b> Relevant participants in business transactions (or potential transactions)
        involving a corporate divestiture, merger, consolidation, acquisition, reorganization, sale or other disposition
        of all or any portion of the business or assets of, or equity interests in, Eatchefs or our affiliates
        (including, in connection with a bankruptcy or similar proceedings).
        <br />
        <b>For other purposes. </b> We may also share your personal information for other purposes described in this
        Privacy Policy or with your consent.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Your choices</b>
        <br />
        You have the following choices with respect to your personal information:
        <br />
        <b>Access or update your information. </b> Updating Account Information. You may update or edit your account
        information by accessing your account page at www.Eatchefs.com, accessing the account settings on your app,
        emailing privacy@Eatchefs.com, or calling toll free 1-844-242-2169. You may also deactivate your account
        pursuant to the Terms and Conditions. We may retain relevant information related to your account when permitted
        by law or for legitimate business purposes.
        <br />
        <b>Opt-out of marketing communications. </b> You may opt out of marketing-related emails by following the
        opt-out or unsubscribe instructions at the bottom of the email, or by contacting us at privacy@Eatchefs.com. You
        may opt out of receiving text messages at any time by texting "STOP" to our text messages. You may continue to
        receive service-related and other non-marketing emails.
        <br />
        <b>Disclosure of your information for third party marketing. </b> If you do not want us to share your personal
        information with unaffiliated or non-agent third parties for promotional purposes, you can opt-out by sending us
        an email stating your request to privacy@Eatchefs.com or calling toll free 1-844-242-2169.
        <br />
        <b>Cookies. </b> Most browsers let you remove or reject cookies. To do this, follow the instructions in your
        browser settings. Many browsers accept cookies by default until you change your settings. Please note that if
        you set your browser to disable cookies, the Service may not work properly. For more information about cookies,
        including how to see what cookies have been set on your browser and how to manage and delete them.
        <br />
        <b>Choosing not to share your personal information. </b> If you do not provide information that we need to
        provide the Service, we may not be able to provide you with the Service or certain features. We will tell you
        what information you must provide to receive the Service when we request it.
        <br />
        <b>Third party platforms. </b> If you choose to connect to the Service through your social media account or
        another third party platform, you may be able to use your settings in your account with that platform to limit
        the information we receive from it. If you revoke our ability to access information from a third party platform,
        that choice will not apply to information that we have already received from that third party.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Other sites and services</b>
        <br />
        The Service may contain links to websites and other online services operated by third parties. These links are
        not an endorsement of, or representation that we are affiliated with, any third party. In addition, our content
        may be included on web pages or other online services that are not associated with us. We do not control
        websites or other online services operated by third parties, and we are not responsible for their actions. Other
        websites and online services follow different rules regarding the collection, use and sharing of your personal
        information. We encourage you to read the privacy policies of the other websites and online services you use.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Security practices</b>
        <br />
        We employ a number of technical, organizational, and physical safeguards designed to protect the personal
        information we collect. However, security risk is inherent in all internet and information technologies and we
        cannot guarantee the security of your personal information.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>International data transfers</b>
        <br />
        We are headquartered in the United States and may use service providers in other countries. Your personal
        information may be transferred to the United States or other locations where privacy laws may not be as
        protective as those in your state, province, or country.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Children</b>
        <br />
        Our sites and online services are not intended for use by children under 16 years of age. If we learn that we
        have collected personal information from a child under 16 without the consent of the child’s parent or guardian
        as required by law, we will delete it.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Changes to this Privacy Policy</b>
        <br />
        We may modify this Privacy Policy at any time. If we make material changes to this Privacy Policy, we will
        notify you by updating the effective date of this Privacy Policy and posting the modified Privacy Policy on the
        Service. We may also provide notification of changes via email if we have your email address, through the
        Service or in another manner that we believe is reasonably likely to reach you.
        <br />
        Any modifications to this Privacy Policy will be effective when posted (or as otherwise indicated at the time of
        posting). In all cases, your continued use of the Service after the posting of any modified Privacy Policy
        indicates your acceptance of the modified Privacy Policy.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Important information for California residents</b>
        <br />
        This section describes how we collect, use and share Personal Information of California residents in operating
        our business, including in the context of in-person meetings, at our events and other offline sales and
        marketing activities. For purposes of this section, <b>"Personal Information"</b> has the meaning given in the
        California Consumer Privacy Act of 2018 (<b>"CCPA"</b>) but does not include information exempted from the scope
        of the CCPA.
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>Your California privacy rights</b>
      </p>

      <p className={classes.privacyPolicy__text}>
        <b>
          As a California resident, you have the rights listed below. However, these rights are not absolute, and in
          certain cases we may decline your request as permitted by law.
        </b>
      </p>

      <p className={classes.privacyPolicy__text}>
        - You can request the following information about how we have collected and used your Personal Information
        during the past 12 months:
        <br />- The categories of Personal Information that we have collected.
        <br />- The categories of sources from which we collected Personal Information.
        <br />- The business or commercial purpose for collecting and/or selling Personal Information.
        <br />- The categories of third parties with whom we share Personal Information.
        <br />
        - Whether we have disclosed your Personal Information for a business purpose, and if so, the categories of
        Personal Information received by each category of third party recipient.
        <br />
        - Whether we’ve sold your Personal Information, and if so, the categories of Personal Information sold to each
        category of third party recipient.
        <br />
        <b>- Access.</b> You can request a copy of the Personal Information that we have collected about you during the
        past 12 months.
        <br />- You can ask us to delete the Personal Information that we have collected from you.
        <br />
        <b>- Opt-out of sales.</b> If we sell your Personal Information, you can opt-out.
        <br />- You are entitled to exercise the rights described above free from discrimination in the form of refusal
        to provide the Services or legally prohibited changes to the price or quality of the Services.
        <br />
        <b>How to exercise your rights.</b> You may exercise your California privacy rights described above as follows:
        <br />
        <b>- Right to opt-out of the “sale” of your Personal Information.</b> Like many companies, we use services that
        help deliver interest-based ads to you. Our use of some of these services may be classified under California law
        as a “sale” of your Personal Information to the companies that provide the services because they collect
        information from our users (e.g., device data and online activity data) to help them serve ads more likely to
        interest you. You can request to opt-out out of this “sale” of your personal information.
        <br />
        We reserve the right to confirm your California residency to process your requests and will need to confirm your
        identity to process your requests to exercise your information, access or deletion rights. As a part of this
        process, government identification may be required. Consistent with California law, you may designate an
        authorized agent to make a request on your behalf. In order to designate an authorized agent to make a request
        on your behalf, you must provide a valid power of attorney, the requester’s valid government-issued
        identification, and the authorized agent’s valid government issued identification. We cannot process your
        request if you do not provide us with sufficient detail to allow us to understand and respond to it.
        <br />
        For information about:
        <br />
        - The categories of sources of this information, see the section above entitled personal information we collect
        <br />
        - The business/commercial purposes for which we collect this information, see the section above entitled how we
        use your personal information;
        <br />- The categories of third parties to which we disclose this information for business purposes, see the
        section above entitled how we share your personal information.
      </p>
    </div>
  );
  return <LayoutPageNew content={content} />;
};

export default connect()(PrivacyPolicy);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
