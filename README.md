# Independent Physiotherapy Clinic Website

A responsive single-practitioner marketing website built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. It exports to static HTML, CSS, and JavaScript for hosting without a Node.js server. Each clinic gets its own copied project, identity, domain, and WhatsApp contact. There is no directory, shared booking system, database, or patient account system.

The included Dr. R. K. Sharma profile is sample content. The portrait and therapy photos are sample stock images, the clinic phone/address/hours are placeholders, and the WhatsApp number is retained from the previous project configuration as requested. Replace and verify all sample details before publishing. The review cards are explicitly placeholders, not patient testimonials.

## Run locally

Use Node.js 18.17 or newer:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Create a production static export with `npm run build`. The hostable website is written to `out/`; upload that folder to a static website host or use it as the marketing-site deployment artifact.

## Clinic configuration

Edit `src/config/clinic.ts` to change the doctor and clinic name, designation, biography, qualifications, experience, logo and photo paths, brand palette, city, address, map links, phone, WhatsApp number, opening hours, services, expertise, procedures, conditions, FAQs, and SEO metadata. The text and service cards on the site are rendered from this file.

- Replace `doctorName`, biography, qualifications, and experience with verified information approved by the practitioner.
- Replace `heroPhoto` and `doctorPhoto` with clinic-owned or properly licensed images. The current remote Pexels photos are for sample presentation; local assets can be placed in `public/images/` and referenced by `/images/filename.jpg`.
- Enter the clinic's real phone and email. Until configured, the UI displays a clear placeholder.
- Enter the exact address, `mapsUrl`, and an appropriate Google Maps `mapsEmbedUrl` to show directions. The map stays a placeholder until configured.
- Set opening hours in `hours`.
- Set `testimonialsEnabled` only after reviews are verified and approved. The home page currently uses clearly labeled placeholders and makes no patient outcome claims.
- Update `/privacy` with the clinic's reviewed privacy information before launch.

## WhatsApp appointment requests

The current `whatsappNumber` (`12125550148`) is intentionally retained from the previous configuration. It is a sample number; do not publish until it has been replaced with the clinic's authorized number in international digits-only format (country code plus national number, no `+`, spaces or punctuation).

The booking form validates patient name, phone, service, preferred date, and preferred time, then opens WhatsApp with those values URL-encoded in a prefilled message. The message says the clinic must confirm the request. The site does not store form submissions or confirm appointments automatically. Run `npm run check:booking` to verify URL generation.

## Create a separate clinic website

Copy this project into a new folder or repository for each practitioner. Update that copy's `src/config/clinic.ts`, images, privacy page and domain, then deploy it as its own project. Do not point multiple independent clinic sites at one booking database or directory.

## Deploy on its own domain

Deploy the copied project as a static marketing site to a static host such as Netlify, Cloudflare Pages, or GitHub Pages. Use `npm run build` as the build command and `out` as the publish directory. No Node.js server is required after export. Configure the clinic's own domain and DNS in that provider, set `domain` in `src/config/clinic.ts` to the final HTTPS URL, then rebuild. The domain feeds page metadata, sitemap and robots.txt.

## Images

The demo photos currently use free stock images served from Pexels. See [the rehabilitation photo](https://www.pexels.com/photo/physiotherapist-exercising-with-a-patient-20860617/) and [the sample portrait](https://www.pexels.com/photo/a-man-in-white-coat-shirt-wearing-black-framed-eyeglasses-6762866/). Replace these with clinic-approved images for a real deployment.
