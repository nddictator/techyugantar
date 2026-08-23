import Breadcrumb from "@/components/Common/Breadcrumb";
import Terms from "@/components/Terms";

export const metadata = {
    title: 'Terms of Service | Tech Yugantar',
    description:
        'Read the Terms of Service for Tech Yugantar by Tech Yugantar — covering eligibility, virtual currency rules, prohibited activities, and account policies.',
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Terms of Service | Tech Yugantar',
        description: 'Terms governing your use of the Tech Yugantar Watch & Earn platform.',
        url: 'https://techyugantar.in/terms',
        siteName: 'Tech Yugantar',
    },
};

const TermsPage = () => {
    return (
        <Terms />
    );
};

export default TermsPage;