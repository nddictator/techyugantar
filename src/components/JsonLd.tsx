import JsonLdScript from "./JsonLdScript";

export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://techyugantar.in/#organization",
        name: "Tech Yugantar",
        url: "https://techyugantar.in",
        logo: "https://techyugantar.in/images/logo/logo.svg",
        image: "https://techyugantar.in/og-image.png",
        description:
            "Tech Yugantar is a software development company based in Varanasi, India, building Android, iOS, and web applications for startups and enterprise businesses using Flutter, Django, and React.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Varanasi",
            addressRegion: "Uttar Pradesh",
            postalCode: "221001",
            addressCountry: "IN",
        },
        areaServed: [
            {
                "@type": "City",
                name: "Varanasi",
            },
            {
                "@type": "State",
                name: "Uttar Pradesh",
            },
            {
                "@type": "Country",
                name: "India",
            },
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "nddictator@gmail.com",
            availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
            "https://github.com/tanmaymishra1551",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Software Development Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Android App Development",
                        description: "Native and cross-platform Android apps using Flutter.",
                        areaServed: "Varanasi, Uttar Pradesh, India",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "iOS App Development",
                        description: "Cross-platform iOS apps built with Flutter.",
                        areaServed: "Varanasi, Uttar Pradesh, India",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Web Development",
                        description:
                            "Full-stack web apps using React, Next.js, and Django REST Framework.",
                        areaServed: "Varanasi, Uttar Pradesh, India",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "ERP & Enterprise Software",
                        description:
                            "Custom ERP systems for businesses of all sizes.",
                        areaServed: "Varanasi, Uttar Pradesh, India",
                    },
                },
            ],
        },
    };

    return <JsonLdScript schema={schema} />;
}