"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CalendarDays, X } from "lucide-react";
import { clinic } from "@/config/clinic";
import { AppointmentForm } from "@/components/appointment-form";

export function AppointmentButton({ children, className }: { children: ReactNode; className: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return <>
    <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
    <dialog ref={dialogRef} className="appointment-dialog" aria-labelledby={`${formId}-title`} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}>
      <div className="dialog-header"><span className="dialog-icon"><CalendarDays size={21} /></span><button className="dialog-close" type="button" aria-label="Close appointment form" onClick={() => setOpen(false)}><X size={19} /></button><div className="eyebrow">APPOINTMENT REQUEST</div><h2 id={`${formId}-title`}>Book your visit.</h2><p>Choose a service and a preferred time. The clinic will confirm with you.</p></div>
      <AppointmentForm />
      <div className="dialog-clinic">{clinic.doctorName} <span>·</span> {clinic.city}, {clinic.region}</div>
    </dialog>
  </>;
}
