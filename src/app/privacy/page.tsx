import Link from "next/link";
import { clinic } from "@/config/clinic";

export default function PrivacyPage() {
  return <main className="privacy-page"><div className="privacy-wrap"><Link className="text-link" href="/">← Back to {clinic.name}</Link><div className="eyebrow">YOUR PRIVACY MATTERS</div><h1>Privacy policy</h1><p className="privacy-updated">Sample policy · Review and update before launch</p><h2>Information you choose to share</h2><p>This sample website does not store appointment form submissions. When you use the appointment form, the details you enter are placed in a message that opens in WhatsApp. WhatsApp’s own privacy terms apply once you continue in that service.</p><h2>Contacting the clinic</h2><p>This sample policy must be reviewed and replaced with the clinic’s applicable privacy information before launch.{clinic.email && <> Questions may be sent to <a href={`mailto:${clinic.email}`}>{clinic.email}</a>.</>}</p><h2>Medical emergencies</h2><p>This website is not for emergencies. Contact your local emergency services if you need urgent medical assistance.</p></div></main>;
}
