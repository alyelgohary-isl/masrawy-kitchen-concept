/* Site configuration read by the form handler (src/scripts/site.js).
   FORMS. Every form on the site posts to one Formspree form, which relays each
   submission by email to the recipient configured in Formspree. The site name,
   form name and page go in the email subject so the team can tell them apart.
     1. formspree.io → New form → recipient: the restaurant's inbox (Formspree emails a verification link).
     2. Copy the form's endpoint, e.g. https://formspree.io/f/abcdwxyz, below.
   SPAM. Google reCAPTCHA v3 runs invisibly on every submit; Formspree verifies the token.
     3. google.com/recaptcha/admin → Create → v3 → domains: masrawykitchen.com and the Pages host → SITE key below.
     4. Formspree → the form → Settings → Spam protection → reCAPTCHA v3: paste the SECRET key there.
   Leave either value empty and forms show the local "sent" state without sending. */
window.SITE = {
  siteName: "Masrawy",
  formEndpoint: "",          // CONFIRM: Formspree endpoint
  recaptchaSiteKey: "",      // CONFIRM: reCAPTCHA v3 site key
  notifyEmail: "",           // CONFIRM: shown to visitors if a submission fails
};
