"use client";

import { useState } from "react";
import NewsLatterBox from "./NewsLatterBox";
import { Reveal } from "@/components/motion";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real users never fill this hidden field, so a filled value
    // means a bot. Report success without submitting, so bots don't learn
    // the field is being checked.
    if (data["bot-field"]) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New support ticket from ${data.name}`,
          ...data,
        }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <Reveal className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-12 rounded-xs bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>

              {/* Success message */}
              {status === "success" && (
                <div className="mb-8 rounded-xs bg-green-50 px-6 py-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  ✅ Your message was sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div className="mb-8 rounded-xs bg-red-50 px-6 py-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  ❌ Something went wrong. Please try again or email us directly.
                </div>
              )}

              {status !== "success" && (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot field — hidden from real users, catches bots */}
                  <div className="hidden">
                    <input name="bot-field" />
                  </div>

                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your name"
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Enter your Message"
                          className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "sending" ? "Sending…" : "Submit Ticket"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;