import { useState, type FormEvent } from "react";
import { trackStandardEvent } from "../lib/pixel";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

interface WaitlistFormProps {
  simplified?: boolean;
}

const WaitlistForm = ({ simplified = false }: WaitlistFormProps) => {
  const posthog = usePostHog();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      // Prioritize saving the data to Netlify Forms first
      const netlifyPromise = fetch("/", {
        method: "POST",
        body: formData,
      });

      // Send the email in parallel
      const emailPromise = fetch("/.netlify/functions/waitlist-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.fullName || "",
        }),
      });

      // Wait for at least the Netlify submission to succeed
      const [netlifyResponse] = await Promise.all([netlifyPromise, emailPromise.catch(e => {
        console.error("Email notification failed:", e);
        return { ok: true }; // Don't block success if email fails
      })]);

      if (!netlifyResponse.ok) {
        throw new Error("Form submission failed. Please try again.");
      }

      setStatus("success");
      window.history.pushState(null, '', '?signup=success');
      trackStandardEvent('Lead', { content_name: 'Waitlist Signup' });
      posthog.capture('waitlist_submission_success');
    } catch (error) {
      console.error("Submission error:", error);
      const message = error instanceof Error ? error.message : "Network error. Please try again.";
      setStatus("error");
      setErrorKey(k => k + 1);
      setErrorMessage(message);
      posthog.capture('waitlist_submission_failed', { error_message: message });
    }
  };

  const handleCopyLink = () => {
    const shareText = "I just joined the Ziona waitlist — a faith-centered social platform. Join me: https://ziona.app";
    navigator.clipboard.writeText(shareText);
    toast.success("Link copied to clipboard!");
    posthog.capture('share_copy_link_clicked');
  };

  const handleWhatsAppShare = () => {
    const shareText = "I just joined the Ziona waitlist — a faith-centered social platform. Join me: https://ziona.app";
    posthog.capture('share_whatsapp_clicked');
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  if (status === "success") {
    return (
      <div
        className="text-center py-6"
        style={{ animation: "fadeIn 200ms ease-out" }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-primary">✓</span>
        </div>
        <h3 className="font-heading text-2xl text-foreground mb-2">
          You're on the list.
        </h3>
        <p className="text-muted-foreground mb-8">We'll be in touch soon.</p>
        
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Spread the word:</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold transition-colors"
            >
              <Share2 size={18} />
              Share on WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-semibold transition-colors"
            >
              <Copy size={18} />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      name="waitlist"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={`${simplified ? 'space-y-4' : 'space-y-4'} text-left`}
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <input type="hidden" name="bot-field" />

      {!simplified && (
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            maxLength={100}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-200"
            placeholder="Your name"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email Address <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={255}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-200"
          placeholder="you@email.com"
        />
      </div>

      {status === "error" && (
        <div
          key={errorKey}
          className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
          style={{ animation: "shake 250ms ease-in-out" }}
        >
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full rounded-xl px-6 py-4 text-base font-semibold text-primary-foreground transition-all duration-150 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] hover:-translate-y-px active:scale-[0.98] active:translate-y-0 ${status === "submitting"
          ? "bg-primary/70 cursor-not-allowed"
          : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {status === "submitting" ? "Joining..." : "Join the Waitlist"}
      </button>
    </form>
  );
};

export default WaitlistForm;
