import LegalDocument from "@/components/Legal/LegalDocument";
import termsDoc from "@/data/legal/terms";

export default function Terms() {
  return <LegalDocument doc={termsDoc} />;
}
