import { clinic } from "@/config/clinic";

export type AppointmentDetails = {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  reason?: string;
};

export function createWhatsAppUrl(details: AppointmentDetails): string {
  const message = [
    `Hello ${clinic.name}, I would like to request an appointment with ${clinic.doctorName}.`,
    "",
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    `Preferred date: ${details.date}`,
    `Preferred time: ${details.time}`,
    `Selected service: ${details.service}`,
    ...(details.reason?.trim() ? [`Reason for visit: ${details.reason.trim()}`] : []),
    "",
    "I understand this request is subject to confirmation by the clinic.",
  ].join("\n");

  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
