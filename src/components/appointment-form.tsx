"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/config/clinic";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
  const formId = useId();
  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000);
  const today = date.toISOString().slice(0, 10);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const preferredDate = String(data.get("date") ?? "");
    const time = String(data.get("time") ?? "");
    const service = String(data.get("service") ?? "");
    if (!name || !phone || !preferredDate || !time || !service) {
      setError("Please complete all required fields.");
      return;
    }
    if (new Date(`${preferredDate}T00:00:00`) < new Date(`${today}T00:00:00`)) {
      setError("Please choose today or a future date.");
      return;
    }
    setError("");
    submitLock.current = true;
    setSubmitting(true);
    window.open(createWhatsAppUrl({ name, phone, date: preferredDate, time, service }), "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      submitLock.current = false;
      setSubmitting(false);
    }, 1200);
  }

  return <form className={`appointment-form${compact ? " appointment-form-compact" : ""}`} onSubmit={submit}>
    <label htmlFor={`${formId}-name`}><span className="field-label">Full name <b>*</b></span><input id={`${formId}-name`} name="name" autoComplete="name" required maxLength={100} placeholder="Enter your name" /></label>
    <label htmlFor={`${formId}-phone`}><span className="field-label">Phone number <b>*</b></span><input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="Enter your mobile number" /></label>
    <label htmlFor={`${formId}-service`}><span className="field-label">Select service <b>*</b></span><select id={`${formId}-service`} name="service" defaultValue="" required><option value="" disabled>Choose a service</option>{clinic.services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
    <div className="form-row"><label htmlFor={`${formId}-date`}><span className="field-label">Preferred date <b>*</b></span><input id={`${formId}-date`} name="date" type="date" min={today} required /></label><label htmlFor={`${formId}-time`}><span className="field-label">Preferred time <b>*</b></span><select id={`${formId}-time`} name="time" defaultValue="" required><option value="" disabled>Choose a time</option>{clinic.hours.filter((row) => !/closed|add /i.test(row.hours)).map((row) => <option key={row.days}>{row.days}: {row.hours}</option>)}<option>Other preferred time</option></select></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <p className="form-disclaimer">Your appointment request will be confirmed by the clinic. Please don’t include sensitive medical information.</p>
    <button className="button button-dark submit-button" type="submit" disabled={submitting}>Continue to WhatsApp <ArrowRight size={16} /></button>
  </form>;
}
