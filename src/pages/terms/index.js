import {LayoutPage} from '@/components/layouts';
import React from 'react';
import {connect} from 'react-redux';
import classes from "./index.module.scss";

const Terms = () => {

  const content = <div className={classes.terms}>
    <h1 className={classes.terms__title}>
      Terms and Conditions of Grocery Delivery E-Services USA INC.
    </h1>
    <p className={classes.terms__text}>
      Welcome and thank you for visiting EatChefs.com (“Site”) or our mobile applications (“App”) and our Terms and Conditions (“Terms”).
    </p>
    <p className={classes.terms__textBold}>
      PLEASE REVIEW THE TERMS CAREFULLY, PARTICULARLY SECTION 5.2 DETAILING THE AUTO-RENEWAL SUBSCRIPTION LANGUAGE, SECTION 21.1 RELATED TO ALLERGENS, AND SECTION 24 RELATED TO BINDING ARBITRATION.
    </p>
    <p className={classes.terms__text}>
      GROCERY DELIVERY E-SERVICES USA INC. D/B/A EatChefs (“EatChefs”, “WE,” “OUR,” “US” OR “COMPANY”) OPERATES THIS SITE AND THE EatChefs APP.
      BY CLICKING ON THE “PLACE ORDER” BUTTON, COMPLETING THE REGISTRATION PROCESS, OR ACCESSING OR USING SITE OR APP, YOU REPRESENT THAT:
      (1) YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS, (2) YOU ARE OF LEGAL AGE TO FORM A BINDING CONTRACT WITH COMPANY AND (3) YOU HAVE THE AUTHORITY TO ENTER INTO THE TERMS OF USE PERSONALLY OR ON BEHALF OF COMPANY YOU HAVE NAMED AS THE USER, AND TO BIND THAT COMPANY TO THESE TERMS. THE TERM “YOU” REFERS TO THE INDIVIDUAL OR LEGAL ENTITY AS APPLICABLE, IDENTIFIED AS THE USER WHEN YOU REGISTERED ON THE SITE. IF YOU DO NOT AGREE TO BE BOUND BY THESE TERMS, YOU MAY NOT ACCESS OR USE THIS SITE, THE APP, OR THE OFFERINGS (AS DEFINED BELOW).
    </p>
    <p className={classes.terms__textBold}>
      IF YOU SUBSCRIBE TO THE SERVICE (AS DEFINED IN SECTION 5 BELOW) FOR A TERM, THEN THE TERMS WILL BE AUTOMATICALLY RENEWED FOR ADDITIONAL PERIODS OF THE SAME DURATION AS THE INITIAL TERM AT EatChefs’S CURRENT FEE FOR SUCH SERVICES UNLESS YOU DECLINE TO RENEW YOUR SUBSCRIPTION IN ACCORDANCE
      WITH SECTIONS 5.2 AND 10.3 BELOW. PLEASE BE AWARE THAT SECTION 24 OF THIS AGREEMENT, BELOW, CONTAINS PROVISIONS GOVERNING HOW DISPUTES THAT YOU AND WE HAVE AGAINST EACH OTHER ARE RESOLVED, INCLUDING, WITHOUT LIMITATION, ANY DISPUTES THAT AROSE OR WERE ASSERTED PRIOR TO THE EFFECTIVE DATE OF
      THIS AGREEMENT. IN PARTICULAR, IT CONTAINS AN ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN US TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION. UNLESS YOU OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE PERMITTED TO PURSUE DISPUTES OR CLAIMS
      AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE WAIVING YOUR RIGHT TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF IN A COURT OF LAW AND YOUR RIGHT TO HAVE A JURY TRIAL. ANY DISPUTE, CLAIM
      OR REQUEST FOR RELIEF RELATING IN ANY WAY TO YOUR USE OF THE SITE WILL BE GOVERNED AND INTERPRETED BY AND UNDER THE LAWS OF THE STATE OF NEW YORK CONSISTENT WITH THE FEDERAL ARBITRATION ACT, WITHOUT GIVING EFFECT TO ANY PRINCIPLES THAT PROVIDE FOR THE APPLICATION OF THE LAW OF ANY OTHER JURISDICTION.
      THE UNITED NATIONS CONVENTION ON CONTRACTS FOR THE INTERNATIONAL SALE OF GOODS IS EXPRESSLY EXCLUDED FROM THIS AGREEMENT.
    </p>
    <p className={classes.terms__text}>
      Please note that the Site, App, the good or service offered through the Site and/or App, including, but not limited to the Subscription Service (as defined in Section 5.1) (“Products”), the text, audio, video, graphics, or other content featured on the Site or App (“Content”); gift cards or gift
      certificates (including, for the purposes of these Terms, electronic versions of both) (“Gift Cards”) or Trial Offers, Sweepstakes, Contests, or Promotions and the trial offers, sweepstakes, contests, or promotions (“Vouchers”, as defined in Section 9). Please note that the Site, App, the good or 
      service offered through the Site and/or App, including, but not limited to, the Subscription Service (as defined in Section 5.1) (“Products”), the text, audio, video, graphics, or other content featured on the Site or App (“Content”); the EatChefs gift cards or gift certificates (“Gift Cards”) and
      the trial offers, sweepstakes, contests, or promotions (“Vouchers”);for the purposes of these Terms, are considered to be the “Offerings.” Your use of, and participation in, certain Offerings may be subject to additional terms (“Supplemental Terms”) and such Supplemental Terms will either be listed
      in the Terms or will be presented to you for your acceptance when you sign up to use the supplemental Offering .Supplemental Terms include EatChefs’s Privacy Policy (“Privacy Policy”), the rules applicable to the Vouchers (“Promotion Rules”) and all other applicable EatChefs operating rules, policies,
      and other terms and conditions or documents that may be published on the Site and/or in the App, or which you may be otherwise notified of in writing. If the Terms are inconsistent with the Supplemental Terms, these Terms shall control. The Terms and any applicable Supplemental Terms are referred to herein
      as the “Agreement.” AS FURTHER EXPLAINED IN SECTION 3, PLEASE NOTE THAT THE AGREEMENT IS SUBJECT TO CHANGE BY EatChefs IN ITS SOLE DISCRETION AT ANY TIME. When changes are made, EatChefs will make a new copy of the Terms available at the Site and within the App and any new Supplemental Terms will be made
      available from within, or through, the Site or within the App. We will also update the “Last Updated” date at the top of the Terms. If you do not agree to any change(s) you shall stop using the Site, the App and/or the Offerings. Otherwise, your continued use of the Site, the App and/or Offerings constitutes
      your acceptance of such change(s). PLEASE REGULARLY CHECK THE SITE TO VIEW THE THEN-CURRENT TERMS
    </p>
    <p className={classes.terms__text}>
      You should print a copy of these terms and conditions for future reference.
    </p>
    <h2 className={classes.terms__subtitle}>
      1. INFORMATION ABOUT US
    </h2>
    <p className={classes.terms__text}>
      Grocery Delivery E-Services USA, Inc., d/b/a EatChefs, is a general corporation incorporated in the State of Delaware with general corporate offices at: 28 Liberty Street, 10th floor New York, NY 10005
    </p>
    <h2 className={classes.terms__subtitle}>
      2. SERVICE AVAILABILITY AND YOUR STATUS
    </h2>
    <p className={classes.terms__text}>
      The Site, the App, and Offerings, are intended for use by individuals in the United States of America (“Serviced Countries”). At this time, we do not accept orders from individuals outside the Serviced
      Countries. As such, by placing an order through our Site or App, you represent and warrant that you: (1) Are legally capable of entering into this Agreement; (2) Are at least 18 years old; (3) Are a resident
      of a Serviced Country; and (4) Are accessing the Site or App from a Serviced Country.
    </p>
    <h2 className={classes.terms__subtitle}>
      3. MODIFICATION
    </h2>
    <p className={classes.terms__text}>
      In our sole discretion, EatChefs shall have the right to change, amend, add to, remove, or supplement the Agreement (including the Privacy Policy), without notice to you; provided, however, that changes
      to the procedures applicable to the resolution of disputes shall only apply to disputes which arise after the modified or additional provision is published on the Site or App.
    </p>
    <h2 className={classes.terms__subtitle}>
      4. REGISTRATION
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        4.1 <span className={classes.terms__textBold}>Registering Your Account.</span> In order to utilize specific features on the Site and App, individuals will need to become a Registered User. For purposes of the Agreement, a “Registered User” is a user
        who has registered an account on the Site (“Account”) or has a valid account on the social networking
        service (“SNS”) through which the user has connected to the Site (each such account, a “Third-Party Account”).
      </p>
      <p className={classes.terms__text}>
        4.2 <span className={classes.terms__textBold}>Access Through a SNS.</span> If you access the Site or App through a SNS as part of the functionality of the Site
        and/or App, you may link your Account with Third-Party Accounts, by allowing EatChefs to access your Third-Party Account,
        as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.
        You represent that you are entitled to disclose your Third-Party Account login information to EatChefs and/or grant
        EatChefs access to your Third-Party Account (including, but not limited to, for use for the purposes described herein)
        without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account and without
        obligating EatChefs to pay any fees or making EatChefs subject to any usage limitations imposed by such third-party service providers.
        By granting EatChefs access to any Third-Party Accounts, you understand that EatChefs may access, make available and store (if applicable)
        any information, data, text, software, music, sound, photographs, graphics, video, messages, tags and/or other materials accessible through
        the Site or App that you have provided to and stored in your Third-Party Account (“SNS Content”) so that it is available on and through the Site
        or App via your Account. Unless otherwise specified in the Agreement, all SNS Content shall be considered to be User Content (as defined in Section 19)
        for all purposes of the Agreement. Depending on the Third-Party Accounts, you choose and subject to the privacy settings that you have set in such Third-Party
        Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your Account on the Site and/or App.
        Please note that if a Third-Party Account or associated service becomes unavailable or EatChefs’s access to such Third-Party Account is terminated by the third-party 
        service provider, then SNS Content will no longer be available on and through the Site and/or App. You have the ability to disable the connection between your Account and your
        Third-Party Accounts at any time by accessing the “Settings” section of the Site. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS
        IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS, AND EatChefs DISCLAIMS ANY LIABILITY FOR PERSONALLY IDENTIFIABLE INFORMATION THAT MAY BE PROVIDED TO IT BY
        SUCH THIRD-PARTY SERVICE PROVIDERS IN VIOLATION OF THE PRIVACY SETTINGS THAT YOU HAVE SET IN SUCH THIRD-PARTY ACCOUNTS. EatChefs makes no effort to review any SNS Content for any purpose,
        including but not limited to, for accuracy, legality or non-infringement, and EatChefs is not responsible for any SNS Content.
      </p>
      <p className={classes.terms__text}> 
        4.3 <span className={classes.terms__textBold}>Registration Data.</span> Should you create an account with EatChefs, you agree to: (1) provide true, accurate, complete and up-to- date information, as well as updating the information as necessary; (2) maintain the security of your password and accept the risks associated with access to your account which is not authorized by you; (3) notify us as soon as possible either at hello@EatChefs.com or call (646) 846-3663 if you believe there have been any breaches to the security of the Site, the App, or your account information; and (4) exit from your Account at the end of each session. You represent that you are (A) at least thirteen (13) years old; (B) of legal age to form a binding contract; and (C) not a person barred from using the Site or App under the laws of the United States, your place of residence or any other applicable jurisdiction. You are responsible for all activities that occur under your Account. You agree that you shall monitor your Account to restrict use by minors, and you will accept full responsibility for any unauthorized use of the Site and App by minors. You may not share your Account or password with anyone If you provide any information that is untrue, inaccurate, not current or incomplete, or EatChefs has reasonable grounds to suspect that any information you provide is untrue, inaccurate, not current or incomplete, EatChefs has the right to suspend or terminate your Account and refuse any and all current or future use of Site, App, or Offerings (or any portion thereof). You agree not to create an Account using a false identity or information, or on behalf of someone other than yourself. You agree that you shall not have more than one Account per platform or SNS at any given time. EatChefs reserves the right to remove or reclaim any usernames at any time and for any reason. You agree not to create an Account or use the Site or App if you have been previously removed by EatChefs, or if you have been previously banned from any the Site or App. You acknowledge and agree that you shall have no ownership or other property interest in your Account, and you further acknowledge and agree that all rights in and to your Account are and shall forever be owned by and inure to the benefit of EatChefs. YOU WILL BE SOLELY RESPONSIBLE FOR ALL ACCESS TO AND USE OF THE SERVICES BY ANYONE USING YOUR ACCOUNT WHETHER OR NOT SUCH ACCESS TO AND USE OF YOUR ACCOUNT IS ACTUALLY AUTHORIZED BY YOU, INCLUDING WITHOUT LIMITATION, ALL COMMUNICATIONS AND TRANSMISSIONS AND ALL OBLIGATIONS (INCLUDING, WITHOUT LIMITATION, FINANCIAL OBLIGATIONS) INCURRED THROUGH SUCH ACCESS OR USE.
      </p>
      <p className={classes.terms__text}>
        4.4 <span className={classes.terms__textBold}>Communication.</span> By providing your phone number to EatChefs through the Site, App, or in connection with your order, receipt or use of our Products, you consent to receive calls or text messages, including calls or text messages sent through automatic telephone dialing systems and pre-recorded calls at any telephone number that you have provided us, in order for us to: (i) notify you about your account; (ii) provide you updates on the status of your order and/or delivery; (iii) collect an outstanding payment or debt; (iv) contact you about exclusive offers and for any other marketing or promotional purposes; and (v) send you cart reminders. If you elect to receive text messages or phone calls from us, either via our Site, App, or by sending a text message to us indicating your consent, you are providing your prior express written consent to receive recurring marketing or promotional telephone calls and/or SMS text messages from us (each, a “Call” or “Text Message”), including your consent to marketing messages and calls sent through an automatic telephone dialing system. This service is optional and is not a condition of purchase. Message frequency varies. You can opt out of receiving further Text Messages or Calls at any time. To opt out of Text Messages from us, reply “STOP” at any time to any Text Message you receive from us. For help, reply “HELP” to any Text Message you receive from us or email textsupport@wunderkind.com. Standard message and data rates applied by your mobile phone carrier may apply to the Text Messages we send you. Please contact your mobile phone carrier for details. Under no circumstances will we or our affiliates be responsible for any SMS messaging or wireless charges incurred by you or by a person that has access to your wireless device or telephone number. Text Message services are provided on an “as is” basis. Data obtained from you in connection with any Text Message services may include your mobile number, your mobile provider’s name and the date, time, and content of your Text Messages. We may use this information in accordance with our Privacy Policy to contact you. If you change or deactivate a phone number you have provided EatChefs, you have an affirmative obligation to update your account information and the phone number(s) associated with your account to prevent us from inadvertently communicating with the individuals who acquire any phone number(s) previously linked to your account. Any new or updated phone number you provide EatChefs may receive our standing marketing Text Messages unless you also unsubscribe through the procedures provided in this section. Following such opt-out, you may continue to receive calls or messages for a short period of time we process your request. It is your responsibility to keep your account information, including your phone number, updated. We may share your telephone number with our service providers (such as billing or collections companies) that we have contracted to assist us in pursuing our rights.
        You agree that these service providers may also contact you using autodialed or prerecorded calls and text messages, only as authorized by us to carry out the purposes identified above. We may, with notice as required by law, monitor or record your communications with EatChefs for training and quality assurance purposes.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      5. EatChefs'S SERVICES
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        5.1 <span className={classes.terms__textBold}>EatChefs’s Subscription Service. </span>
        Our subscription service is an automatic, recurring weekly subscription to EatChefs Products (“Subscription Service” or “Service”). As part of the Service, we offer a number of subscription options that you may choose from (“Plan”). Each week you will receive a package from EatChefs (your “Meal Box”), including the contents of your chosen Plan (a specific number and type of “Meal Kits”). You can find specific details regarding your Plan and the EatChefs Service by accessing your Account details via the Site or the App.
      </p>
      <p className={classes.terms__textBold}>
        5.2 Auto-Renewal Feature. 
        <p className={classes.terms__textBold}>
          THE SUBSCRIPTION SERVICE CONSISTS OF AN INITIAL CHARGE FOLLOWED BY RECURRING PERIODIC CHARGES AS AGREED TO BY YOU. BY ENTERING INTO THIS AGREEMENT, YOU ACKNOWLEDGE THAT YOUR SUBSCRIPTION HAS AN INITIAL AND RECURRING PAYMENT FEATURE AND YOU ACCEPT RESPONSIBILITY FOR ALL RECURRING CHARGES PRIOR TO DEACTIVATION. EatChefs MAY SUBMIT PERIODIC CHARGES (E.G., WEEKLY) WITHOUT FURTHER AUTHORIZATION FROM YOU, UNTIL YOU PROVIDE ADVANCE NOTICE (IN COMPLIANCE WITH THE DEACTIVATION PROCEDURES IN SECTION 10.3) THAT YOU WISH TO TERMINATE THIS AUTHORIZATION OR WISH TO CHANGE YOUR PAYMENT METHOD. SUCH NOTICE WILL NOT AFFECT CHARGES SUBMITTED BEFORE EatChefs REASONABLY COULD ACT. TO TERMINATE YOUR AUTHORIZATION OR CHANGE YOUR PAYMENT METHOD, LOG ON TO YOUR EatChefs ACCOUNT, EMAIL HELLO@EatChefs.COM CALL (646) 846-3663 WHERE REQUIRED LOG ONTO YOUR EatChefs ACCOUNT. IF YOUR PAYMENT DETAILS CHANGE, YOUR CARD PROVIDER MAY PROVIDE US WITH THE UPDATED PAYMENT DETAILS. WE RESERVE THE RIGHT TO USE THESE UPDATED DETAILS FOR FUTURE CHARGES IN ORDER TO HELP PREVENT ANY INTERRUPTION TO THE DELIVERY OF SERVICE.
        </p>
        <p className={classes.terms__textBold}>
          ADDITIONALLY, BY SIGNING UP FOR OUR SUBSCRIPTION SERVICE YOU ARE AGREEING TO RECURRING PERIODIC PAYMENTS FOR AN INDEFINITE TIME UNTIL DEACTIVATED BY YOU OR US, ON THE SUBSCRIPTION TERMS SET OUT IN THE APPLICATION FORM YOU HAVE COMPLETED,SUBJECT TO VARIATION IN ACCORDANCE WITH THIS SECTION. YOU CAN DEACTIVATE YOUR SUBSCRIPTION AT ANY TIME, PROVIDED THAT YOU DO SO WITHIN THE APPLICABLE DEACTIVATION NOTICE PERIOD, AS DEFINED IN SECTION 10.3. YOU WILL NOT BE CHARGED FOR ANY DEACTIVATION. YOU CAN RE-SUBSCRIBE AT ANY TIME FOLLOWING YOUR DEACTIVATION, BUT WE RESERVE THE RIGHT NOT TO PERMIT RE-SUBSCRIPTION WHERE WE HAVE PREVIOUSLY ELECTED TO TERMINATE A SUBSCRIPTION BY YOU.
        </p>
        <p className={classes.terms__textBold}>
          FURTHERMORE, YOUR SUBSCRIPTION WILL CONTINUE INDEFINITELY UNTIL TERMINATED IN ACCORDANCE WITH THE AGREEMENT. FOLLOWING YOUR INITIAL SUBSCRIPTION PERIOD, AND AGAIN AFTER ANY SUBSEQUENT SUBSCRIPTION PERIOD, YOUR SUBSCRIPTION WILL AUTOMATICALLY COMMENCE ON THE FIRST DAY FOLLOWING THE END OF SUCH PERIOD AND CONTINUE FOR SUCCESSIVE RENEWAL PERIODS OF THE SAME LENGTH, AT THE THEN-CURRENT, NON-PROMOTIONAL SUBSCRIPTION RATE. YOU AGREE THAT YOUR ACCOUNT WILL BE SUBJECT TO THIS AUTOMATIC RENEWAL FEATURE UNLESS YOU DEACTIVATE YOUR SUBSCRIPTION. TO DEACTIVATE YOUR SUBSCRIPTION, EMAIL HELLO@EatChefs.COM CALL (646) 846-3663 OR, WHERE REQUIRED, LOG ONTO YOUR EatChefs ACCOUNT. ADDITIONAL DETAILS FOR DEACTIVATION PROCEDURES ARE IN SECTION 10.3 OF THIS AGREEMENT. IF YOU DEACTIVATE, YOU MAY USE YOUR SUBSCRIPTION UNTIL THE END OF YOUR THEN-CURRENT SUBSCRIPTION TERM; YOUR SUBSCRIPTION WILL NOT BE RENEWED AFTER YOUR THEN-CURRENT TERM EXPIRES. YOU WILL NOT BE ELIGIBLE FOR A PRORATED REFUND OF ANY PORTION OF THE SUBSCRIPTION FEE PAID FOR THE THEN-CURRENT SUBSCRIPTION PERIOD. BY SUBSCRIBING TO THE SERVICE, YOU AUTHORIZE EatChefs TO CHARGE YOUR PAYMENT PROVIDER NOW, AND AGAIN AT THE BEGINNING OF ANY SUBSEQUENT SUBSCRIPTION PERIOD. UPON RENEWAL OF YOUR SUBSCRIPTION, IF EatChefs DOES NOT RECEIVE PAYMENT FROM YOUR PAYMENT PROVIDER, (A) YOU AGREE TO PAY ALL AMOUNTS DUE ON YOUR ACCOUNT UPON DEMAND AND (B) YOU AGREE THAT EatChefs MAY EITHER TERMINATE OR SUSPEND YOUR SUBSCRIPTION AND CONTINUE TO ATTEMPT TO CHARGE YOUR PAYMENT PROVIDER UNTIL PAYMENT IS RECEIVED (UPON RECEIPT OF PAYMENT, YOUR ACCOUNT WILL BE ACTIVATED AND FOR PURPOSES OF AUTOMATIC RENEWAL, YOUR NEW SUBSCRIPTION COMMITMENT PERIOD WILL BEGIN AS OF THE DAY PAYMENT WAS RECEIVED).
        </p>
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      6. PAYMENT AND PRICING
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        6.1 <span className={classes.terms__textBold}>Pricing Adjustments. </span>
        We reserve the right to adjust prices in our sole discretion, at any time and without notice to you; provided, however, that we will provide you with at least ten (10) days’ advance notice of any price changes with your specific Plan rate. Your acceptance of deliveries of the Products after such notice has been delivered to you will constitute your acceptance of such price changes, unless you cancel your subscription to the Service in accordance with these Terms. All prices shown on the Site and/or in the App are in U.S. dollars. Any applicable taxes and other fees or charges are not included and are additional to any prices shown on the Site and/or in the App. Prices, taxes or other fees may vary geographically. The shipment of meal ingredients to you after our delivery of such notice will confirm your acceptance of such changes, unless you cancel your subscription in accordance with the Term’s Deactivation policies, found in Section 10.3.
      </p>
      <p className={classes.terms__text}>
        6.2 <span className={classes.terms__textBold}>Plan Add-Ons. </span>
        Different features and other customized options may become available in addition to your plan, including, but not limited to, premium options, new product add-ons, and modified shipping options. These may change the price of your plan on a recurring basis. Should you have any questions about any of the options available under your plan, please visit www.EatChefs.com, email HELLO@EatChefs.COM or call (646) 846-3663
      </p>
      <p className={classes.terms__text}> 
        6.3 <span className={classes.terms__textBold}>Payment. </span>
        You agree to pay for all orders made from your Account in accordance with the prices and billing terms in effect at the time an order is made from your Account. You also agree to pay all applicable taxes. To make an order from an Account, you must provide valid payment information (e.g. credit card, debit card, and/or a Gift Card) through the Site or App. By placing an order through your Account, you also agree and authorize (1) the payment method(s) you provide to be immediately charged for all fees and taxes applicable to your order, (2) EatChefs to automatically charge alternative payment methods associated with your account if a primary payment method is declined or no longer available, (3) EatChefs to share payment information and instructions required to complete the payment transactions between EatChefs, our payment processors, and their third-party payment service providers (e.g., credit card transaction processing, merchant settlement, and related services), and (4) no additional notice or consent is required for the foregoing authorizations. You agree to immediately update your Account in the event of any change in your payment information. EatChefs reserves the right at any time to change its billing methods. If a payment method cannot be verified, is invalid or is otherwise not acceptable, your order may be suspended or canceled. If a payment is not successfully paid and you do not edit your payment method or cancel your purchase of a Product, you remain responsible for any uncollected amounts and authorize us to continue billing the payment method, as it may be updated. EatChefs reserves the right to collect any outstanding payment due, and may transfer the collection of your outstanding balance to a third party collection agency.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      7. REPLACEMENT INGREDIENTS IN MEAL KITS AND PROMOTIONAL INCLUSIONS
    </h2>
    <p className={classes.terms__text}>
      Given the perishable nature of many of our ingredients, and market conditions and product supply beyond our control, we reserve the right to adjust the quantity of any ingredients in a Meal Kit, to discontinue the use of any ingredient or Product, or to substitute any ingredients or entire Meal Kits, all without notice. While we make every effort to ensure that you are provided with the very best ingredients for our Meal Kits, these switches may occasionally be required. If such a substitution is required, we will make reasonable efforts to notify you prior to shipment. If you have any issues with any substitution, or either an ingredient or a Meal Kit, please contact us at HELLO@EatChefs.COM or call (646) 846-3663. Additionally, please note that, on occasion, EatChefs will include products from our partners in our meal boxes which may contain some or all of the 8 major allergens (in addition to other ingredients). Please refer to Section 21.1 to review our allergen policy. Additionally, if you have any questions or concerns about any additional products or materials in your Meal Box, please contact Customer Care at HELLO@EatChefs.COM or call (646) 846-3663.
    </p>
    <h2 className={classes.terms__subtitle}>
      8. GIFT CARDS
    </h2>
    <p className={classes.terms__text}>
      You may purchase and/or otherwise receive Gift Cards through the Site and/or App. You must create or have an existing and valid Account with EatChefs in order to redeem a Gift Card. All Accounts are subject to the Terms in all respects. EatChefs Gift Cards may be redeemed on the Site or on the App. Redemption of Gift Cards will result in the application of a credit to your account in the amount of the Gift Card balance. Any Gift Card balance will be applied toward your purchase of Offerings until the Gift Card is depleted. Gift Cards are not redeemable for cash or credit. Notwithstanding the foregoing, Gift cards with balances of under $10.00 are redeemable for cash in the States of California, Texas, Massachusetts and Colorado. To make a request to redeem a gift card with a balance of under $10.00 in any of California, Texas, Massachusetts or Colorado, please visit email hello@EatChefs.com. EatChefs is not responsible for lost or stolen Gift Cards. Lost or stolen Gift Cards cannot be replaced (except as required by law). All sales of Gift Cards are final and nonrefundable. EatChefs reserves the right to refuse to honor a Gift Card where EatChefs suspects that the Gift Card was obtained fraudulently. If you suspect someone has copied or stolen your Gift Card, email hello@EatChefs.com immediately.
    </p>
    <h2 className={classes.terms__subtitle}>
      9. VOUCHERS
    </h2>
    <p className={classes.terms__text}>
      EatChefs may offer discount promotions, free/discounted trials, or other types of vouchers (“Vouchers”). In order to utilize the offer on the Voucher, users need to create an Account through the Site or App and input their information and the code found on the Voucher to redeem. If you purchase any Voucher, Voucher is deemed to have been sold at the time of payment for it. The discount found on the Voucher only lasts for the first week of your subscription plan, unless it specifically states otherwise on the Voucher or when you sign-up. Similarly, a Voucher may only be used once and may not be copied, reproduced, distributed, or published either directly or indirectly in any form or stored in data retrieval systems without our prior written approval. Additionally, Vouchers are only for first-time users of EatChefs, unless the Voucher states otherwise. EatChefs reserves the right to withdraw or deactivate any Voucher (other than one which has been purchased) for any reason, at any time. For the avoidance of doubt, and in accordance of the foregoing sentence, EatChefs reserves the right to withdraw or deactivate any of your outstanding referral credits or similar Vouchers in the event your referral code is posted to a third party website (excluding your own social media profile(s) or blogs), or if you otherwise violate this Agreement. Vouchers may only be redeemed through our Site or App, and not through any other website or method of communication. To use your Voucher, you will be required to enter its unique code at the online checkout and use of such code will be deemed to confirm your agreement to this Agreement and any special conditions attached to the Voucher. Pursuant to this Agreement, at the expiration of the Voucher, you agree and acknowledge that you will be billed the standard rate for your Meal Kit on a recurring, weekly basis, unless you cancel your Plan prior to the end of the Voucher period with proper, advance notice to EatChefs in accordance with this Agreement. As a part of the verification process, EatChefs may require you to provide additional identification information. In addition, as a part of the verification process, you authorize EatChefs to charge to your credit card a $1.00 authorization charge (or such other amount identified to customer at time of verification by EatChefs), which amount will be refunded following successful authorization.
    </p>
    <h2 className={classes.terms__subtitle}>
      10. DELIVERY
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        10.1 <span className={classes.terms__textBold}>EatChefs Delivery Week.</span> EatChefs’s “Delivery Week” begins on Saturday and runs through the following Friday. The start of our Delivery Week means that new Meal Kits are available to be delivered in your Meal Box.
      </p>
      <p className={classes.terms__text}>
        10.2 <span className={classes.terms__textBold}>Rolling Basis of Meal Selection. </span> You have the option of selecting the day you would like to receive your Meal Box, and, if your specific subscription allows for Meal Kit selection, you also have the option of selecting the specific Meal Kits you would like to receive, on a weekly basis. The day you select to receive your first Meal Box will be the default. In subsequent weeks, if you do not make a change, your Meal Box will arrive on the day you initially selected every week (unless you pause your order, pursuant to these Terms, or there are extenuating circumstances, detailed in these Terms). If you choose to have your delivery on another day for a specific week, that day will become the default, and subsequent weeks will have your Meal Box arriving on the newly selected day.
      </p>
      <p className={classes.terms__text}>
        Meal Kit selection and delivery day selection is on a rolling basis, and all selections “lock” five days prior to the delivery day. For example, if your subscription allows for Meal Kit selection and you receive your Meal Box on Fridays, you will have to make your selection of Meal Kits you want included in your Meal Box on Sunday by 11:59 PM PST. Your credit card or other payment source will then be charged the following day. Similarly, if you want to change the delivery day, you will have to make your selection five days prior to your new delivery day. For example, if you normally receive your Meal Box on Thursdays, but want to receive your Meal Box on a Monday, you will have to make the change five days prior to Monday, which would be the Wednesday of the previous week.
        Please note that the specific days in which a Meal Box can be delivered varies by geographic region, and delivery on each day will not be available in all areas. If you have any questions about your area and delivery, please contact Customer Care at hello@EatChefs.com or call (646) 846-3663.
      </p>
      <p className={classes.terms__text}>
        10.3 <span className={classes.terms__textBold}>Deactivation Procedures.</span> Please note that the ability to change an order locks five days prior to your scheduled delivery date. Therefore, if you wish to deactivate your Account and/or cancel or change an order, you must do so before the day and time listed above for your respective delivery date. For example, if you have a scheduled delivery date on Tuesday, you have until Thursday at 11:59 PM PST to cancel your subscription. If you do so after the time listed for your delivery day, you will be charged and receive your Meal Box for that week, and the cancellation will take effect for the following Delivery Week. To deactivate your Account, please call EatChefs Customer Care at (646) 846-3663 or email hello@EatChefs.com stating that you wish to terminate your account, along with your full name and registered email address. Where required, you may also deactivate your Account by accessing your Account on the EatChefs website.
      </p>
      <p className={classes.terms__text}>
        10.4 <span className={classes.terms__textBold}>Pausing your Order.</span> During any production week, you have the option of pausing your deliveries. In order to do so, log on to your account page on the Site or App, select a particular week (by clicking on the delivery day highlighted) and then click on the “Pause Week” button. You will not be charged for any week in which your order is paused. Please note that this action cannot be taken for any scheduled order which has already “Locked,” pursuant to Section 10.2. Additionally, pausing an order shall only apply to the week in which you pause, and automatic deliveries will commence the following week, unless you choose to pause the following week, subject to the details, above.
      </p>
      <p className={classes.terms__text}>
        10.5 <span className={classes.terms__textBold}>Delivery Specifics.</span> In the case of weather which inhibits the ability to make safe deliveries, or other events beyond our control that interfere with our ability to deliver your order, we will attempt to deliver your Order as soon as reasonably possible. In some cases, delivery may occur on a date other than your scheduled delivery day. If the delivery of your Meal Box is not feasible, we will cancel your delivery for the period so affected and issue you a credit, as determined in our sole discretion or refund of a part or the whole of the purchase price for that Meal Box.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      11. FORCE MAJEURE
    </h2>
    <p className={classes.terms__text}>
      We will not be liable or responsible for any failure to perform, or delay the performance of, any of our obligations that is caused by events outside our reasonable control («Force Majeure Event»). A Force Majeure Event includes any act, event, non-happening, omission or accident beyond our reasonable control and includes, but is not limited, to the following: (1) Strikes, lock-outs, or other industrial action; (2) Civil commotion, riot, invasion, terrorist attack or threat of terrorist attack, war, or threat or preparation for war; (3) Fire, explosion, storm, flood, earthquake, subsidence, epidemic, or other natural disaster; (4) Impossibility of the use of railways, shipping, aircraft, motor transport, or other means of public or private transport; (5) Impossibility of the use of public or private telecommunications networks; and (6) The acts, decrees, legislation, regulations, or restrictions of any government. Our performance under this Agreement is deemed to be suspended for the period that the Force Majeure Event continues, and we will have an extension of time for performance for the duration of that period. We will use our reasonable efforts to bring the Force Majeure Event to a close or to find a solution by which our obligations under this Agreement may be performed despite the Force Majeure Event.
    </p>
    <h2 className={classes.terms__subtitle}>
      12. RECEIPT OF THE MATERIALS AND FOOD PREPARATION
    </h2>
    <p className={classes.terms__text}>
      EatChefs uses specific materials to refrigerate perishable items and also uses third party delivery companies to deliver Meal Boxes to customers. Please note that you are responsible for reviewing the Meal Box upon delivery and inspecting all of the Products contained within for any defects or other problems upon delivery. If you are not home when your Meal Box is delivered, the Meal Box will be left at your door or in a common area. Upon the completion of your review of the Meal Box, we recommend that you place all perishables in your refrigerator to ensure the ingredients’ integrity. All items are solely at your risk from the time of delivery. As such, you are solely responsible for any preparatory steps, storage of the contents of any Meal Kits, safe washing (we recommend that all fresh produce is washed prior to inclusion in any meal), and the cooking of all the ingredients of the respective Meal Kits. We recommend that you use a thermometer to measure the temperature of any poultry, fish, or meat products that arrive in the insulated portion of the Meal Box, and, pursuant to USDA Guidelines, you should utilize said thermometer to ensure that they are at (or below) 41 degrees Fahrenheit.
      EatChefs recommends that all cooking instructions found in the recipe booklet be followed, and all seafood, meats, and poultry should be cooked to the USDA’s recommended internal temperatures (165 degrees Fahrenheit for poultry; 160 degrees Fahrenheit for ground meats; 145 degrees for whole meats; and 145 degrees Fahrenheit for seafood). EatChefs recommends utilizing a food thermometer to verify internal temperatures. For more information, please see the USDA’s website).
    </p>
    <h2 className={classes.terms__subtitle}>
      13. RECIPE CARDS
    </h2>
    <p className={classes.terms__text}>
      Additionally, please note that each Meal Kit will have a corresponding recipe card contained in the Meal Box. If your Meal Box does not contain one or more of the corresponding recipe cards, you can refer to the Site and App for the week’s recipes. If you have any questions or concerns related to the recipe cards, please contact hello@EatChefs.com or Customer Care at (646) 846-3663.
    </p>
    <h2 className={classes.terms__subtitle}>
      14. RETURN AND REFUND POLICY
    </h2>
    <p className={classes.terms__text}>
      In the event that you are unhappy with any part of your Meal Box, or a specific Meal Kit, you can reach out to us at hello@EatChefs.com or call Customer Care at (646) 846-3663. Please do so within five (5) days of the date you received the unsatisfactory item. If related to ingredients or condition of a Meal Kit, we, at our sole discretion, may give you credit for the individual ingredient or Meal Kit, and in some situations, issue a partial or full refund for the ingredient or the Meal Kit. We reserve the right, however, to require either the return of the unsatisfactory ingredient or Meal Kit, or a photograph of such, before any partial/full refund or credit will be issued. Subject to this Agreement, EatChefs grants you a limited license to utilize the Offerings for personal, non-commercial use. Any future release, update or other addition to the Offerings shall be subject to this Agreement. EatChefs, its suppliers, and its service providers reserve all rights not granted in this Agreement.
    </p>
    <h2 className={classes.terms__subtitle}>
      15. PROPRIETARY RIGHTS
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        EatChefs is the owner and operator of the Site and the App. Additionally, EatChefs is the owner of, or duly licensed to utilize, all content, features, and functionality (including, but not limited to, all information, text, graphics, software, video, and audio, and the design, selection, and arrangement thereof) published on the Site, the App, or any Offerings. The Offerings are protected by copyright, trademark, trade secret, and other intellectual property or proprietary rights laws throughout the world.
        Users are only permitted to use these materials in order to utilize EatChefs’s Offerings for personal, non-commercial use. Any other use of EatChefs’s materials, including modification, distribution, or reproduction for purposes other than the personal usage of EatChefs’s Offerings, without written approval from EatChefs (which can be provided through email) is prohibited.
      </p>
      <p className={classes.terms__text}>
        15.1 <span className={classes.terms__textBold}>Trademarks.</span> “EatChefs“, all other EatChefs marks and logos, and all titles, characters, names, graphics, and button icons are service marks, trademarks, and/or trade dress of EatChefs or otherwise proprietary to EatChefs and may not be used by you for any reason other than as expressly permitted by the Terms. All other trademarks, service marks, product names, and company names, logos, designs, or slogans appearing by and through the Offerings are the property of their respective owners and you do not acquire any ownership rights in or to such marks, logos, or names by using and/or accessing the Offerings. You will not remove, alter or obscure any copyright notice, trademark, service mark or other proprietary rights notices incorporated in or accompanying the Offerings.
      </p>
      <p className={classes.terms__text}>
        15.2 <span className={classes.terms__textBold}>Other Content.</span> Except with respect to your User Content, you agree that you have no right, title, or interest in or to any Content that appears on or in the Offerings.
      </p>
      <p className={classes.terms__text}>
        15.3 <span className={classes.terms__textBold}>Procedure for Making Claims of Copyright Infringement.</span> EatChefs reserves the right to terminate any end-user’s access to the Offerings where that end-user infringes upon third-party copyrights. If you believe content posted on the App or Site infringes your copyright, please provide our copyright agent with the following information: (1) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; (2) a description of the copyrighted work that you claim has been infringed; (3) a description of the location on the Services of the material that you claim is infringing; (4) your address, telephone number and e-mail address; (5) a written statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent or the law; and (6) a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf. Correspondence to regarding notice of claims of copyright infringement should be sent to our copyright agent hello@EatChefs.com.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      16. PROHIBITED USES
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        You may use EatChefs Offerings only for lawful purposes and in accordance with these Terms and Conditions. You agree not to use the Offerings:
        <p>
          - In any way that violates any applicable federal, state, local, or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries).
        </p>
        <p>
          - For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.
        </p>
        <p>
          - To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter”, “spam”, or any other similar solicitation.
        </p>
        <p>
          - To impersonate or attempt to impersonate EatChefs, an employee, another user, or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing).
        </p>
        <p>
          - To impersonate or attempt to impersonate EatChefs, an employee, another user, or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing).
        </p>
        <p>
          - To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Site or App, or which, as determined by us, may harm EatChefs or users of the Site or expose them to liability.
        </p>
      </p>
      <p className={classes.terms__text}>
        Additionally, you agree not to:
        <p>
          - Use the Site in any manner that could disable, overburden, damage, or impair the Site or interfere with any other party’s use of the Site..
        </p>
        <p>
          - Use any robot, spider, or other automatic device, process, or means to access the Site for any purpose, including monitoring or copying any of the material on the Site.
        </p>
        <p>
          - Use any manual process to monitor or copy any of the material on the Site or for any other unauthorized purpose without our prior written consent.
        </p>
        <p>
          - Use any device, software, or routine that interferes with the proper working of the Site.
        </p>
        <p>
          - Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site..
        </p>
        <p>
          - Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.
        </p>
        <p>
          - Attack the Site via a denial-of-service attack or a distributed denial-of- service attack.
        </p>
        <p>
          - Otherwise attempt to interfere with the proper working of the Site.
        </p>
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      17. NON-USER THIRD PARTY CONTENT
    </h2>
    <p className={classes.terms__text}>
      We may display content, advertisements, and promotions from third parties through the Site, in mailings or emails containing information regarding other companies, or with or contained within the Offerings (“Third Party Content”). The Third Party Content is not endorsed, adopted by, or controlled by EatChefs, and we make no representations or warranties of any kind regarding such Third Party Content, regarding its accuracy or completeness. You acknowledge and agree that (i) your interactions with third parties providing Third Party Content through or on the Offerings (including, but not limited to, our Site, App, social media, other Content, or Products) are solely between you and such third parties; and (ii) that it is impossible for EatChefs to monitor such materials and that you access these materials at your own risk.
    </p>
    <h2 className={classes.terms__subtitle}>
      18. USER CONDUCT
    </h2>
    <p className={classes.terms__text}>
      You agree that you will not violate any law, statute, regulation, intellectual property (including, but not limited to, copyright and trademarks), contractual obligations, other third party rights, or commit a tort, and that you are solely responsible for your conduct, while accessing or using the Site or App. You agree that you will abide by this Agreement and will not: (1) display personal or confidential information related to any third party, including, but not limited to, street addresses, email addresses, last names, telephone numbers, and URLs; (2) attempt to access or use another user’s account unless permitted to do so, in writing, from both the user and EatChefs; (3) engage in any behavior which is deemed to be harassment, threatening, stalking or predation of any other person; (4) make any claim, statement, or assertion, or imply, that your claim, statement, or assertion is endorsed by EatChefs without EatChefs’s express written consent; (5) engage in the commercial solicitation of other end-users; (6) collect or record end-users’ personal information without their prior written consent; (7) develop or use any third party applications that interact with any of EatChefs’s Content, the Site, or the App without our prior written consent; (8) use the Site or App in any way that prevents or inhibits other end-users from fully utilizing the Site or App, or in a way that could overburden or interfere with the functioning of the Site or App in any manner; (9) use any manual or automatic process, means, or interface (including, but not limited to robot, spider, script or, browser extension), which EatChefs has not authorized to access the Site or the App, to retrieve or index data or content; (10) decipher or reverse engineer any portion of the Site or the App that may reveal source code or bypass items designed to obstruct, limit, or stop access to any Content, specific site within the Site, or code within the Site; (11) access or attempt to access any portion or feature of the Site or App which you are not authorized to access, pursuant to this Agreement or any subsequent agreements; or (12) use the Site or the App for any illegal purpose.
    </p>
    <h2 className={classes.terms__subtitle}>
      19. USER CONTENT
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        19.1 Pursuant to the specifications located in this Agreement, the Site, App, or any social media platforms on which EatChefs has an official page or feed, may include, now or in the future, areas (“Interactive Areas”) that allow users to post content, including but not limited to, recipes, reviews, photos, videos, music, sound, text, graphics, code, or other materials (“User Content”). Any User Content you post or submit to us through email or other channels must, in its entirety, comply with all applicable federal, state, local and international laws and regulations, and this Agreement (including, but not limited to, the Prohibited Uses set out in Section 16 of these Terms, respectively). You understand and acknowledge that you are responsible for any User Content you submit or contribute through any channel or method and your use of any Interactive Areas of the Site and/or App, and you, not EatChefs, have full responsibility for such content and use, including its legality, reliability, accuracy, and appropriateness. We are not responsible or liable to any third party for the content or accuracy of any User Content posted by you or any other user of the Site. You understand and acknowledge that User Content that you share with a third party through the Site or third party platforms will be viewable by others in accordance with the privacy settings you establish. Any User Content you post to the Site will be considered non-confidential and non-proprietary. By providing any User Content, you represent and warrant that:(1) You own or control all rights in and to the User Content and have the right to grant the license granted below to us and our affiliates and service providers, and each of their and our respective licensees, successors, and assigns, including, without limitation, all copyrights and rights of publicity contained therein, and that all User Content does not infringe on any patent trademark, trade secret, copyright, right of publicity or other right of any other person or entity; (2) You shall not (and shall not permit any third party to) take any action or upload, post, or otherwise distribute any User Content that you if false, misleading, untruthful or inaccurate, or is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another’s privacy, tortious, obscene, vulgar, pornographic, offensive, profane, contains or depicts nudity, contains or depicts sexual activity, or is otherwise inappropriate as determined by EatChefs in our sole discretion.
      </p>
      <p className={classes.terms__text}>
        19.2 EatChefs may pull content from our Users who share photos, reviews, videos on social media using our brand name, brand hashtags, including without limitation, #EatChefs, #EatChefspics, #freshfam (collectively, the “EatChefs Hashtags”), or tagging EatChefs using the @EatChefs account. You acknowledge and agree that by using our brand name, tagging EatChefs, or using a EatChefs Hashtag, that it may be used by EatChefs in our marketing materials, including but not limited to, our emails, our advertisements, and on our Site, and you hereby grant us permission to use and authorize us to use your name or social media handle in association with your User Content for identification, publicity related to the Services and similar promotional purposes, including after your termination of your EatChefs account or the Services. You represent and warrant that the posting and use of your User Content, including to the extent that your User Content include your name, username, likeness, voice, or photograph, does not violate, misappropriate or infringe on the rights of any third party, including without limitation, privacy rights, publicity rights, copyrights, trademark and other intellectual property rights.
      </p>
      <p className={classes.terms__text}>
        19.3 By uploading any User Content you hereby grant EatChefs and its affiliates and subsidiaries a nonexclusive, royalty-free, transferable, worldwide, perpetual, irrevocable and fully sublicensable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, copy, upload, store, distribute, perform and publicly display your User Content, in whole or in part and any name, username, likeness, voice, or photograph provided in connection with your User Content without compensation to you, in connection with the operation of the Site or the promotion, advertising or marketing of the Services, in any form, medium or technology now known or later developed, and including after your termination of your Account or the Services. For clarity, the foregoing license does not affect your other ownership or license rights in your User Content, including the right to grant additional licenses to your User Content, unless otherwise agreed in writing. You represent and warrant that you have all rights to grant such licenses to us without infringement or violation of any third party rights, including without limitation, any privacy rights, publicity rights, copyrights, trademarks, contract rights, or any other intellectual property or proprietary rights.
      </p>
      <p className={classes.terms__text}>
        19.4 Except where prohibited by applicable law, by submitting User Content through the Site, you are waiving and agreeing not to assert any copyrights or “moral” rights or claim resulting from our alteration of the User Content. You are also agreeing to appoint EatChefs as your irrevocable attorney-in-fact with respect to the User Content.
      </p>
      <p className={classes.terms__text}>
        19.5 You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information about the Services (collectively “Feedback”) that you provide us are non-confidential and we will be entitled to the unrestricted use and dissemination of this Feedback for any purpose, commercial or otherwise, without your acknowledgment or compensation to you.
      </p>
      <p className={classes.terms__text}>
        19.6 You acknowledge and agree that we may preserve User Content and may also disclose User Content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws or government requests; (b) enforce this Agreement; (c) respond to claims that any User Content violates the rights of third parties; or (d) protect the rights, property, or personal safety of EatChefs or our users.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      20. INDEMNIFICATION
    </h2>
    <p className={classes.terms__text}>
      You agree to defend, indemnify and hold harmless EatChefs, our affiliates, service providers, and licensors and their respective directors, officers, agents, contractors, partners, licensors, representatives, suppliers and employees, from and against any loss, liability, threatened or actual claim, demand, damages, costs and expenses, (including reasonable legal fees) arising out of or in connection with your use of the Site, the App, the Products or any Offerings, or any information obtained therefor other than as expressly authorized in this Agreement. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you hereunder, and you shall cooperate as fully as reasonably required by us. You agree to promptly notify EatChefs of any third-party claims, cooperate with EatChefs in defending such claims, and pay all fees, costs and expenses associated with defending such claims (including, but not limited to, attorneys’ fees and expenses, court costs, costs of settlement and costs of pursuing indemnification and insurance). This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and EatChefs. You agree that the provisions in this Section will survive any termination of your Account, the Agreement and/or your access to the Offerings.
    </p>
    <h2 className={classes.terms__subtitle}>
      21. DISCLAIMERS
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        YOU ARE SOLELY RESPONSIBLE FOR, AND ASSUME ALL RISKS RELATED TO, THE PROPER AND SAFE PREPARATION (INCLUDING STORAGE, WASHING, AND COOKING), USE, AND CONSUMPTION OF THE CONTENTS OF THE MEAL BOXES. AS SUCH, ALL CONTENTS OF THE RESPECTIVE MEAL BOXES ARE PROVIDED “AS-IS” AND “AS AVAILABLE,” AND, TO THE FULLEST EXTENT ALLOWABLE UNDER THE APPLICABLE LAW, ALL EXPRESS AND IMPLIED WARRANTIES ARE DISCLAIMED. THIS SPECIFICALLY INCLUDES, BUT IS NOT LIMITED TO, THE WARRANTY FOR FITNESS FOR A PARTICULAR PURPOSE, WARRANTIES OF MERCHANTABILITY, AND WARRANTIES FOR THE NON-INFRINGEMENT OF INTELLECTUAL PROPERTY.
      </p>
      <p className={classes.terms__text}>
        21.1 <span className={classes.terms__textBold}>Allergen Information.</span> PLEASE NOTE THAT THE EIGHT MAJOR ALLERGENS, AS DETERMINED BY THE US FOOD AND DRUG ADMINISTRATION, WHICH ARE WHEAT, EGG, SOY, MILK, TREENUTS, PEANUTS, FISH, AND SHELLFISH, ARE STORED, PORTIONED, AND PACKAGED IN EatChefs’S AND OUR SUPPLIER’S FACILITIES. YOU UNDERSTAND, ACKNOWLEDGE AND AGREE THAT WE STORE, PORTION AND PACKAGE THESE PRODUCTS, AND WHILE EatChefs TAKES PRECAUTIONS TO LIMIT ANY CROSS-CONTAMINATION, CROSS-CONTAMINATION MAY OCCUR BETWEEN FOOD PRODUCTS, AND THUS, THE RESPECTIVE MEAL KITS, OR THE MEAL BOX, MAY CONTAIN SOME OR ALL OF THE ALLERGENS LISTED. YOU ARE ALSO SOLELY RESPONSIBLE FOR KNOWING ABOUT ANY FOOD ALLERGIES YOU MAY HAVE AND VERIFYING THE PRODUCTS AND THEIR CONTENTS BEFORE HANDLING, PREPARING, USING OR CONSUMING SUCH PRODUCTS. EatChefs DOES NOT REPRESENT OR WARRANT THAT THE NUTRITION, INGREDIENT, ALLERGEN, AND OTHER PRODUCT INFORMATION ON OUR SITE OR APP IS ACCURATE OR COMPLETE SINCE THIS INFORMATION IS PROVIDED BY THE PRODUCT MANUFACTURERS OR SUPPLIERS AND ON OCCASION MANUFACTURERS MAY MODIFY THEIR PRODUCTS AND UPDATE THEIR LABELS. WE RECOMMEND THAT YOU DO NOT RELY SOLELY ON THE INFORMATION PRESENTED ON OUR SITE AND THAT YOU CONSULT THE PRODUCTS LABEL OR CONTACT EatChefs IN ORDER TO PROVIDE INFORMATION TO CONTACT THE MANUFACTURER DIRECTLY IF YOU HAVE A SPECIFIC DIETARY OR ALLERGIC CONCERN OR QUESTION ABOUT A PRODUCT.
      </p>
      <p className={classes.terms__text}>
        21.2 <span className={classes.terms__textBold}>Specifications Related to Warranties.</span> WE ATTEMPT TO DISPLAY THE PRODUCTS YOU WILL RECEIVE IN YOUR MEAL KITS AND OTHER MATERIALS AND INFORMATION YOU VIEW ON THE SITE AND APP, INCLUDING PRICING AND NUTRITIONAL INFORMATION, AS ACCURATELY AND RELIABLY AS POSSIBLE. HOWEVER, WE DO NOT GUARANTEE THE ACCURACY OF SUCH MATERIALS AND INFORMATION. IN THE EVENT OF AN ERROR, WE RESERVE THE RIGHT, IN OUR SOLE DISCRETION AND SUBJECT TO THIS AGREEMENT, TO CORRECT SUCH ERRORS AND REVISE YOUR ORDER ACCORDINGLY (INCLUDING CHARGING THE CORRECT PRICE) OR TO CANCEL YOUR ORDER AND ISSUE YOU A CREDIT REFUND. YOU FURTHER AGREE THAT THE PRODUCTS AND OTHER MATERIALS YOU RECEIVE IN YOUR ORDER MAY VARY FROM THE PRODUCTS AND MATERIALS DISPLAYED ON THE SITE DUE TO A NUMBER OF FACTORS, INCLUDING, WITHOUT LIMITATION, SYSTEM CAPABILITIES AND CONSTRAINTS OF YOUR COMPUTER, MANUFACTURING PROCESS OR SUPPLY ISSUES, THE AVAILABILITY AND VARIABILITY OF PRODUCTS, DISTINCT COOKING OR OTHER PREPARATION METHODS AND VARIABILITY OF COOKING EQUIPMENT AND APPLIANCES. THE SITE MAY CONTAIN INFORMATION ABOUT PRODUCTS THAT ARE NOT AVAILABLE IN EVERY LOCATION. A REFERENCE TO A PRODUCT ON THE SITE DOES NOT IMPLY OR GUARANTEE THAT IT IS OR WILL BE AVAILABLE IN YOUR LOCATION OR AT THE TIME OF YOUR ORDER.
      </p>
      <p className={classes.terms__text}>
        We reserve the right to change any and all Content and to modify, suspend or stop providing access to the Site (or any features or functionality of the Site) and the Products at any time without notice and without obligation or liability to you.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      22. LIMITATION OF LIABILITY
    </h2>
    <p className={classes.terms__text}>
      TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EatChefs, ITS AFFILIATES (INCLUDING, BUT NOT LIMITED TO, THEIR LICENSORS, SERVICE PROVIDERS, DIRECTORS, OFFICERS, AGENTS, PARTNERS, REPRESENTATIVES AND EMPLOYEES) SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY/PUNITIVE DAMAGES. THIS LIMITATION SHALL INCLUDE, BUT IS NOT LIMITED TO, DAMAGES RELATED TO PERSONAL INJURY; PAIN AND SUFFERING; EMOTIONAL DISTRESS; BUSINESS INTERRUPTION; LOSS OF PROFITS, REVENUE, BUSINESS OR ANTICIPATED SAVINGS, USE, GOODWILL, DATA; AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE) BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. ADDITIONALLY, IN NO EVENT SHALL EatChefs BE LIABLE FOR DISPUTES ARISING OUT OF OR IN ANY WAY RELATED TO THE ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE, APP OR CONTENT (INCLUDING, BUT NOT LIMITED TO, USER CONTENT, THIRD PARTY CONTENT, CONTENT OF LINKED THIRD PARTY SITES), OR THE ORDERING, RECEIPT, OR USE OF ANY PRODUCT, OR OTHERWISE RELATED TO THIS AGREEMENT(INCLUDING, BUT NOT LIMITED TO, ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE ON ANY INFORMATION OBTAINED FROM EatChefs, OR FROM EVENTS BEYOND EatChefs’S REASONABLE CONTROL, SUCH AS SITE INTERRUPTIONS, DELETIONS OF FILES OR EMAILS, ERRORS OR OMISSIONS, DEFECTS, BUGS, VIRUSES, TROJAN HORSES, DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE). UNDER NO CIRCUMSTANCES WILL EatChefs BE LIABLE TO YOU FOR MORE THAN THE TOTAL AMOUNT PAID TO EatChefs BY YOU DURING THE THIRTY (30) DAY PERIOD PRIOR TO THE ACT, OMISSION OR OCCURRENCE GIVING RISE TO SUCH LIABILITY. THE LIMITATIONS SET FORTH IN THIS SECTION 22 SHALL NOT AFFECT LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER THE APPLICABLE LAW/JURISDICTION, SUCH AS LIABILITY FOR PERSONAL INJURY OR PROPERTY DAMAGE DIRECTLY AND PROXIMATELY CAUSED BY OUR ACTS OR OMISSIONS, OR FOR OUR GROSS NEGLIGENCE, OR WILLFUL MISCONDUCT.
    </p>
    <h2 className={classes.terms__subtitle}>
      23. MODIFICATIONS TO THE SITE AND PRODUCTS
    </h2>
    <p className={classes.terms__text}>
      We reserve the right in our sole discretion to modify, suspend or discontinue, temporarily or permanently, the Site or App (or any features or parts thereof) or the rates, delivery, or provision of the Products at any time.
    </p>
    <h2 className={classes.terms__subtitle}>
      24. DISPUTE RESOLUTION & BINDING ARBITRATION
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        PLEASE READ THE FOLLOWING ARBITRATION AGREEMENT IN THIS SECTION (“ARBITRATION AGREEMENT”) CAREFULLY BECAUSE IT REQUIRES YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH EatChefs AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM US.
      </p>
      <p className={classes.terms__text}>
        24.1 <span className={classes.terms__textBold}>Applicability of Arbitration Agreement.</span> You agree that any dispute, claim, or request for relief relating in any way to your access or use of the Site or the App, to any products sold or distributed through the Site or the App, or to any aspect of your relationship with EatChefs, will be resolved by binding arbitration, rather than in court, except that (1) you may assert claims or seek relief in small claims court if your claims qualify; and (2) you or EatChefs may seek equitable relief in court for infringement or other misuse of intellectual property rights (such as trademarks, trade dress, domain names, trade secrets, copyrights, and patents). This Arbitration Agreement shall apply, without limitation, to all disputes or claims and requests for relief that arose or were asserted before the effective date of this Agreement or any prior version of this Agreement.
      </p>
      <p className={classes.terms__text}>
        24.2 <span className={classes.terms__textBold}>Arbitration Rules and Forum.</span> The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement. To begin an arbitration proceeding, you must send a letter requesting arbitration and describing your dispute or claim or request for relief to: EatChefs, c/o Legal Department, 28 Liberty Street, 10th Floor, New York, NY 10005. The arbitration will be conducted by JAMS, an established alternative dispute resolution provider. Disputes involving claims, counterclaims, or request for relief under $250,000, not inclusive of attorneys’ fees and interest, shall be subject to JAMS’s most current version of the Streamlined Arbitration Rules and procedures available at http://www.jamsadr.com/rules-streamlined-arbitration/; all other disputes shall be subject to JAMS’s most current version of the Comprehensive Arbitration Rules and Procedures, available at http://www.jamsadr.com/rules-comprehensive-arbitration/. JAMS’s rules are also available at www.jamsadr.com or by calling JAMS at 800-352-5267. If JAMS is not available to arbitrate, the parties will select an alternative arbitral forum. If the arbitrator finds that you cannot afford to pay JAMS’s filing, administrative, hearing and/or other fees and cannot obtain a waiver from JAMS, EatChefs will pay them for you. In addition, EatChefs will reimburse all such JAMS’s filing, administrative, hearing and/or other fees for disputes, claims, or requests for relief totaling less than $10,000 unless the arbitrator determines the claims are frivolous. You may choose to have the arbitration conducted by telephone, based on written submissions, or in person in the country where you live or at another mutually agreed location. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
      </p>
      <p className={classes.terms__text}>
        24.3 <span className={classes.terms__textBold}>Authority of Arbitrator.</span> The arbitrator shall have exclusive authority to (a) determine the scope and enforceability of this Arbitration Agreement and (b) resolve any dispute related to the interpretation, applicability, enforceability or formation of this Arbitration Agreement including, but not limited to, any assertion that all or any part of this Arbitration Agreement is void or voidable. The arbitration will decide the rights and liabilities, if any, of you and EatChefs. The arbitration proceeding will not be consolidated with any other matters or joined with any other cases or parties. The arbitrator shall have the authority to grant motions dispositive of all or part of any claim. The arbitrator shall have the authority to award monetary damages and to grant any non-monetary remedy or relief available to an individual under applicable law, the arbitral forum’s rules, and the Agreement (including the Arbitration Agreement). The arbitrator shall issue a written award and statement of decision describing the essential findings and conclusions on which the award is based, including the calculation of any damages awarded. The arbitrator has the same authority to award relief on an individual basis that a judge in a court of law would have. The award of the arbitrator is final and binding upon you and us.
      </p>
      <p className={classes.terms__text}>
        24.4 <span className={classes.terms__textBold}>Waiver of Jury Trial.</span> YOU AND EatChefs HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and EatChefs are instead electing that all disputes, claims, or requests for relief shall be resolved by arbitration under this Arbitration Agreement, except as specified in Section 21.1 above. An arbitrator can award on an individual basis the same damages and relief as a court and must follow this Agreement as a court would. However, there is no judge or jury in arbitration, and court review of an arbitration award is subject to very limited review.
      </p>
      <p className={classes.terms__text}>
        24.5 <span className={classes.terms__textBold}>Waiver of Class or Other Non-Individualized Relief.</span> ALL DISPUTES, CLAIMS, AND REQUESTS FOR RELIEF WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS OR COLLECTIVE BASIS, ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If a decision is issued stating that applicable law precludes enforcement of any of this Subsection’s limitations as to a given dispute, claim, or request for relief, then such aspect must be severed from the arbitration and brought into the State or Federal Courts located in the State of New York. All other disputes, claims, or requests for relief shall be arbitrated.
      </p>
      <p className={classes.terms__text}>
        24.6 <span className={classes.terms__textBold}>30-Day Right to Opt Out.</span> You have the right to opt out of the provisions of this Arbitration Agreement by sending written notice of your decision to opt out to: us-legal@EatChefs.com, within 30 days after first becoming subject to this Arbitration Agreement. Your notice must include your name and address, your EatChefs username (if any), the email address you used to set up your EatChefs account (if you have one), and an unequivocal statement that you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all other parts of this Agreement will continue to apply to you. Opting out of this Arbitration Agreement has no effect on any other arbitration agreements that you may currently have, or may enter in the future, with us.
      </p>
      <p className={classes.terms__text}>
        24.7 <span className={classes.terms__textBold}>Severability.</span> Except as provided in Subsection 24.5, if any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable, then such specific part or parts shall be of no force and effect and shall be severed and the remainder of the Arbitration Agreement shall continue in full force and effect.
      </p>
      <p className={classes.terms__text}>
        24.8
      </p>
      <p className={classes.terms__text}>
        <span className={classes.terms__textBold}>Survival of Agreement.</span> This Arbitration Agreement will survive the termination of your relationship with EatChefs. 24.9
      </p>
      <p className={classes.terms__text}>
        <span className={classes.terms__textBold}>Modification.</span> Notwithstanding any provision in this Agreement to the contrary, we agree that if EatChefs makes any future material change to this Arbitration Agreement, you may reject that change within thirty (30) days of such change becoming effective by writing EatChefs at the following address: EatChefs, c/o Legal Department, 28 Liberty Street 10th Floor, New York, NY 10005.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      25. GOVERNING LAW AND VENUE
    </h2>
    <p className={classes.terms__text}>
      ATHIS AGREEMENT AND ANY ACTION RELATED THERETO WILL BE GOVERNED AND INTERPRETED BY AND UNDER THE LAWS OF THE STATE OF NEW YORK, CONSISTENT WITH THE FEDERAL ARBITRATION ACT, WITHOUT GIVING EFFECT TO ANY PRINCIPLES THAT PROVIDE FOR THE APPLICATION OF THE LAW OF ANOTHER JURISDICTION. THE UNITED NATIONS CONVENTION ON CONTRACTS FOR THE INTERNATIONAL SALE OF GOODS DOES NOT APPLY TO THIS AGREEMENT.
    </p>
    <h2 className={classes.terms__subtitle}>
      26. TERM, TERMINATION AND SURVIVAL
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        26.1 <span className={classes.terms__textBold}>Term.</span> The Agreement commences on the date when you accept them (as described in the preamble above) and remain in full force and effect while you use the Offerings, unless terminated earlier in accordance with the Agreement.
      </p>
      <p className={classes.terms__text}>
        26.2 <span className={classes.terms__textBold}>Prior Use.</span> Notwithstanding the foregoing, you hereby acknowledge and agree that the Agreement commenced on the earlier to occur of (a) the date you first used the Offerings or (b) the date you accepted the Agreement and will remain in full force and effect while you use any Offerings, unless earlier terminated in accordance with the Agreement.
      </p>
      <p className={classes.terms__text}>
        26.3 <span className={classes.terms__textBold}>Termination.</span> Notwithstanding anything contained in this Agreement, we reserve the right, without notice and in our sole discretion, to terminate or suspend your right to access or use the Site and to order, receive and use the Products, at any time and for any or no reason, including, without limitation, any violation of this Agreement. You can cancel your Service in accordance to the terms set forth in Sections 6 and 10.3 hereunder. Except as set forth above, the Service subscription fee shall be non-refundable. If timely payment cannot be charged to your payment provider for any reason, if you have materially breached any provision of the Agreement, or if EatChefs is required to do so by law (e.g., where the provision of the Site, the App or the Services is, or becomes, unlawful), Company has the right to, immediately and without notice, suspend or terminate any services provided to you. You agree that all terminations for cause shall be made in EatChefs’s sole discretion and that EatChefs shall not be liable to you or any third party for any termination of your Account. We reserve the right to change any and all Content and to modify, suspend or stop providing access to the Site (or any features or functionality of the Site) and the Products at any time without notice and without obligation or liability to you.
      </p>
      <p className={classes.terms__text}>
        26.4 <span className={classes.terms__textBold}>Effect of Termination.</span> Termination of any Service includes removal of access to such Service and barring of further use of the Service. Termination of all Service also includes deletion of your password and all related information, files and Content associated with or inside your Account (or any part thereof). Upon termination of any Service, your right to use such Service will automatically terminate immediately. You understand that any termination of Service may involve deletion of Your Content associated therewith from our live databases. EatChefs will not have any liability whatsoever to you for any suspension or termination. All provisions of the Agreement which by their nature should survive, shall survive termination of the Offering or Service, including without limitation, ownership provisions, warranty disclaimers, and limitation of liability.
      </p>
      <p className={classes.terms__text}>
        26.5 <span className={classes.terms__textBold}>No Subsequent Registration.</span> If your registration(s) with or ability to access the Service is discontinued by EatChefs due to your violation of any portion of the Agreement, then you agree that you shall not attempt to re-register with or access the Service through use of a different member name or otherwise, and you acknowledge that you will not be entitled to receive a refund for fees related to those Services to which your access has been terminated. In the event that you violate the immediately preceding sentence, EatChefs reserves the right, in its sole discretion, to immediately take any or all of the actions set forth herein without any notice or warning to you.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      27. SEVERABILITY AND WAIVER
    </h2>
    <p className={classes.terms__text}>
      If any of this Agreement are determined by any competent jurisdiction to be invalid, unlawful or unenforceable to any extent, such term, condition or provision will to that extent be severed from the remaining terms, conditions, and provisions which will continue to be valid to the fullest extent permitted by law. No waiver by EatChefs of any provision in this Agreement shall be deemed a further or continuing waiver of such provision or a waiver of any other provision, and any failure to assert a right or provision under this Agreement does not constitute a waiver of such right or provision.
    </p>
    <h2 className={classes.terms__subtitle}>
      28. APP STORES
    </h2>
    <p className={classes.terms__text}>
      <p className={classes.terms__text}>
        You acknowledge and agree that the availability of the App and the Services is dependent on the third party from whom you received the App license, e.g., the Apple App Store or Google Play (each, an “App Store”). You acknowledge that the Agreement is between you and Company and not with the App Store. EatChefs, not the App Store, is solely responsible for the Offerings, including the App, the content thereof, maintenance, support services, and warranty therefor, and addressing any claims relating thereto (e.g., product liability, legal compliance or intellectual property infringement). In order to use the App, you must have access to a wireless network or other, and you agree to pay all fees associated with such access. You also agree to pay all fees (if any) charged by the App Store in connection with the Offerings, including the App. You agree to comply with, and your license to use the App is conditioned upon your compliance with all terms of agreement imposed by the applicable App Store when using any Offerings, including the App. You acknowledge that the App Store (and its subsidiaries) are third-party beneficiaries of the Agreement and will have the right to enforce it.
      </p>
      <p className={classes.terms__text}>
        28.1 <span className={classes.terms__textBold}>Additional Terms for Apple Apps.</span> With respect to any App accessed through or downloaded from the Apple App Store (an “App Store Sourced Application”), you will only use the App Store Sourced Application (i) on an Apple-branded product that runs the iOS (Apple’s proprietary operating system) and (ii) as permitted by the “Usage Rules” set forth in the Apple App Store Terms of Service. In addition, the following terms apply to any App Store Sourced Application: (a) You acknowledge and agree that (i) this Agreement is concluded between you and EatChefs only, and not Apple, and (ii) EatChefs, not Apple, is solely responsible for the App Store Sourced Application and content thereof. Your use of the App Store Sourced Application must comply with the App Store Terms of Service. (b) You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App Store Sourced Application. (c) In the event of any failure of the App Store Sourced Application to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the App Store Sourced Application to you and to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the App Store Sourced Application. As between EatChefs and Apple, any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be the sole responsibility of EatChefs. (d) You and EatChefs acknowledge that, as between EatChefs and Apple, Apple is not responsible for addressing any claims you have or any claims of any third party relating to the App Store Sourced Application or your possession and use of the App Store Sourced Application, including, but not limited to: (i) product liability claims; (ii) any claim that the App Store Sourced Application fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation. (e) You and EatChefs acknowledge that, in the event of any third-party claim that the App Store Sourced Application or your possession and use of that App Store Sourced Application infringes that third party’s intellectual property rights, as between EatChefs and Apple, EatChefs, not Apple, will be solely responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim to the extent required by this Agreement. (f) You and EatChefs acknowledge and agree that Apple, and Apple’s subsidiaries, are third-party beneficiaries of this Agreement as related to your license of the App Store Sourced Application, and that, upon your acceptance of the terms and conditions of this Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this Agreement as related to your license of the App Store Sourced Application against you as a third-party beneficiary thereof. (g)Without limiting any other terms of this Agreement, you must comply with all applicable third-party terms of agreement when using the App Store Sourced Application.
      </p>
    </p>
    <h2 className={classes.terms__subtitle}>
      29. MISCELLANEOUS
    </h2>
    <p className={classes.terms__text}>
      This Agreement and any document expressly referred to herein constitute the whole agreement between you and EatChefs, and supersede all previous discussions, correspondence, negotiations, arrangements, understandings, or agreements between us relating to the subject matter of any contract. This Agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you without the prior written consent of EatChefs. Except as otherwise provided herein, this Agreement are intended solely for the benefit of the parties and are not intended to confer third party beneficiary rights upon any other person or entity.
    </p>
    <h2 className={classes.terms__subtitle}>
      30. CONSUMER COMPLAINTS
    </h2>
    <p className={classes.terms__text}>
      In accordance with California Civil Code §1789.3, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting them in writing at 400 R Street, Sacramento, CA 95814, or by telephone at (800) 952-5210.
    </p>
    <h2 className={classes.terms__subtitle}>
      31. ELECTRONIC COMMUNICATIONS
    </h2>
    <p className={classes.terms__text}>
      The communications between you and use electronic means, whether you visit Services or send EatChefs e-mails, or whether EatChefs posts notices on Services or communicates with you via e-mail. For contractual purposes, you (1) consent to receive communications from EatChefs in an electronic form; and (2) agree that all terms and conditions, agreements, notices, disclosures, and other communications related to these Agreement that EatChefs provides to you electronically satisfy any legal requirement that such communications would satisfy if they were made in writing in a physical document. The foregoing does not affect your statutory rights.
    </p>
    <h2 className={classes.terms__subtitle}>
      32. EXPORT CONTROL
    </h2>
    <p className={classes.terms__text}>
      You may not use, export, import, or transfer the Offerings except as authorized by U.S. law, the laws of the jurisdiction in which you obtained Services, and any other applicable laws. In particular, but without limitation, the Offerings may not be exported or re-exported (1) into any United States embargoed countries, or (2) to anyone on the U.S. Treasury Department’s list of Specially Designated Nationals or the U.S. Department of Commerce’s Denied Person’s List or Entity List. By using Services, you represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
    </p>
    <h2 className={classes.terms__subtitle}>
      33. NOTICE
    </h2>
    <p className={classes.terms__text}>
      Where EatChefs requires that you provide an email address, you are responsible for providing EatChefs with your most current email address. If the last e-mail address you provided to EatChefs is not valid, or for any reason is not capable of delivering to you any notices required/ permitted by this Agreement, EatChefs ’s dispatch of the e-mail containing such notice will nonetheless constitute effective notice. You may give notice to EatChefs at the following address: EatChefs Legal, 28 Liberty Street, 10th floor New York, NY 10005. Such notice shall be deemed given when received by EatChefs by letter delivered by nationally recognized overnight delivery service or first-class postage prepaid mail at the above address.
    </p>
    <h2 className={classes.terms__subtitle}>
      34. SWEEPSTAKES
    </h2>
    <p className={classes.terms__text}>
      NO PURCHASE OR PAYMENT OF ANY KIND NECESSARY TO ENTER OR WIN A SWEEPSTAKES. A PURCHASE OF A EatChefs SUBSCRIPTION WILL AUTOMATICALLY ENTER YOU INTO OUR SWEEPSTAKES, HOWEVER, A PURCHASE WILL NOT INCREASE YOUR ODDS OF WINNING. CHANCES OF WINNING A SWEEPSTAKES WILL DEPEND ON THE TOTAL NUMBER OF ENTRIES RECEIVED. AFFIDAVIT OF ELIGIBILITY/RELEASE OF LIABILITY/PRIZE ACCEPTANCE AGREEMENT MAY BE REQUIRED. ALL DISPUTES WILL BE RESOLVED SOLELY BY BINDING ARBITRATION AND ENTRANTS WAIVE THE ABILITY TO BRING CLAIMS IN A CLASS ACTION FORMAT. BY PARTICIPATING IN A SWEEPSTAKES, YOU AGREE TO THE APPLICABLE OFFICIAL RULES. OPEN ONLY TO LEGAL RESIDENTS OF THE 50 UNITED STATES AND D.C. OR OLDER. VOID WHERE PROHIBITED BY LAW.
    </p>
  </div>

  return (
    <LayoutPage content={content}/>
  );
};

export default connect()(Terms);
