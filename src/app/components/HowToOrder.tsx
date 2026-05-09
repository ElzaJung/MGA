import { Phone, Mail, MapPin, X } from "lucide-react";
import { useState, useMemo } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface HowToOrderProps {
  selectedMenuItems: string[];
  removeMenuItem?: (item: string) => void;
}

export function HowToOrder({
  selectedMenuItems = [],
  removeMenuItem,
}: HowToOrderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate minimum date (3 days from today)
  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const menuPreferences = formData.get("note") as string;
    const selectedItemsText =
      selectedMenuItems.length > 0
        ? `Selected Menu Items:\n${selectedMenuItems.map((item) => `- ${item}`).join("\n")}\n\nAdditional Preferences:\n${menuPreferences}`
        : menuPreferences;

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      guests: formData.get("guests") as string,
      occasion: formData.get("occasion") as string,
      delivery: formData.get("delivery") as string,
      eventDate: formData.get("eventDate") as string,
      dietary: formData.get("dietary") as string,
      generalnote: formData.get("generalnote") as string,
      menuPreferencesSpecialRequests: selectedItemsText,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-bcb00524/submit-inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        form.reset();
        console.log("Inquiry submitted successfully:", result);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "Failed to submit inquiry",
        );
        console.error(
          "Inquiry submission error:",
          result.error,
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
      console.error("Network error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="reveal flex flex-col gap-6">
          <span className="yellow-rule" />
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight font-[Plus_Jakarta_Sans]">
            Let's Plan
            <br />
            Your Event
          </h2>
          <p className="font-body text-[#1A1A1A]/55 leading-relaxed max-w-sm">
            Tell us about your event and we'll reply you within
            12 hours. No commitment required yet.
          </p>
          <p className="font-body text-[#1A1A1A]/50 italic leading-relaxed max-w-sm mt-2">
            * Restaurant orders and catering orders are handled separately. For restaurant orders, please contact the restaurant. Catering orders are managed by Myungga’s specialized catering service.          </p>

          <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
            <ul className="space-y-3 font-body text-sm text-[#1A1A1A]/70">
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Reply within 12 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Free delivery for orders over CA$300</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>
                  Ice package is available for extra charge (for
                  the summer)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>
                  Inquiry must be in English or Korean
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - Form */}
        <div className="reveal reveal-delay-1">
          <form
            className="bg-[#FAFAF5] p-8 border-2 border-[#1A1A1A]/10 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Number of Guests *
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="10"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Menu Preferences & Special Requests
              </label>

              {selectedMenuItems.length > 0 && (
                <div className="mb-3 p-3 bg-[#FFCB2F]/10 border border-[#FFCB2F]/30">
                  <p className="text-xs font-medium text-[#1A1A1A] mb-2">
                    Selected Menu Items:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMenuItems.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-[#1A1A1A]/20 text-xs text-[#1A1A1A]"
                      >
                        {item}
                        {removeMenuItem && (
                          <button
                            type="button"
                            onClick={() => removeMenuItem(item)}
                            className="hover:bg-[#1A1A1A]/10 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${item}`}
                          >
                            <X
                              size={12}
                              className="text-[#1A1A1A]/60"
                            />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Any additional menu preferences or special requests? If you selected menu items above, you can add more details here."
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="occasion"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Occasion
              </label>
              <textarea
                id="occasion"
                name="occasion"
                rows={4}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
                placeholder="Not familiar with Korean cuisine? Explain us about your occasion and we'll recommend the best dishes for you!"
              />
            </div>

            <div>
              <label
                htmlFor="general note"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                General Note{" "}
              </label>
              <textarea
                id="generalnote"
                name="generalnote"
                rows={3}
                placeholder="Please include anything else you want us to know"
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="delivery"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Delivery Option *
              </label>
              <select
                id="delivery"
                name="delivery"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] bg-white transition-colors"
              >
                <option value="">Select an option</option>
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Event/Pickup Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                min={minDate}
                defaultValue={minDate}
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="dietary"
                className="block text-sm font-medium text-[#1A1A1A] mb-2"
              >
                Dietary Restrictions
              </label>
              <textarea
                id="dietary"
                name="dietary"
                rows={3}
                placeholder="Please list any dietary restrictions or allergies"
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            {submitStatus === "success" && (
              <div className="text-green-500 font-bold mb-4">
                Inquiry submitted successfully!
              </div>
            )}

            {submitStatus === "error" && (
              <div className="text-red-500 font-bold mb-4">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}