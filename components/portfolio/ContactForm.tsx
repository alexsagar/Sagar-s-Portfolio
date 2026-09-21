"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [draftOpened, setDraftOpened] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (services.some(service => service.name === requested)) setSelected([requested!]);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) return;
    const body = `Hi Sagar,\n\nMy name is ${name}.\nEmail: ${email}\nServices: ${selected.join(", ") || "Let’s discuss"}\nBudget: ${String(data.get("budget") || "To be discussed")}\n\n${message}`;
    window.location.href = `mailto:alexsagar07@gmail.com?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  return <form className="contact-form" onSubmit={submit}>
    <label>Hello! My name is<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} pattern=".*\S.*" /></label>
    <fieldset><legend>I’m looking for help with</legend><div className="service-options">{services.map(service => <label key={service.name}><input type="checkbox" name="services" value={service.name} checked={selected.includes(service.name)} onChange={event => setSelected(current => event.target.checked ? [...current, service.name] : current.filter(name => name !== service.name))} /><span>{service.name}</span></label>)}</div></fieldset>
    <label>You can reach me at<input name="email" type="email" autoComplete="email" placeholder="Your email address" required maxLength={254} /></label>
    <label>My budget is <span className="optional-label">(optional)</span><input name="budget" placeholder="Amount and currency, or let’s discuss" maxLength={80} /></label>
    <label>A little about my project<textarea name="message" placeholder="What do you have in mind?" required minLength={10} maxLength={2000} rows={4} /></label>
    <div className="contact-form-foot"><button className="pill" type="submit">Create email draft <ArrowUpRight size={22} /></button><p>This opens your email app with your project details. You can review everything before sending.</p></div>
    {draftOpened && <p role="status" className="form-status">Your email draft is ready to open. If your email app didn’t launch, write to <a href="mailto:alexsagar07@gmail.com">alexsagar07@gmail.com</a>.</p>}
  </form>;
}
