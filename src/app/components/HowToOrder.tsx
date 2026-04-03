import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function HowToOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      guests: formData.get('guests') as string,
      occasion: formData.get('occasion') as string,
      delivery: formData.get('delivery') as string,
      dietary: formData.get('dietary') as string,
      note: formData.get('note') as string,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-bcb00524/submit-inquiry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        form.reset();
        console.log('Inquiry submitted successfully:', result);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit inquiry');
        console.error('Inquiry submission error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
      console.error('Network error submitting inquiry:', error);
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
            Tell us about your event and we'll reply you within 12 hours. No commitment required yet.
          </p>

          

          <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
            <ul className="space-y-3 font-body text-sm text-[#1A1A1A]/70">
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Reply within 12 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Minimum order CA$300</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Ice package is available for extra charge (for the summer)</span>
              </li>
               <li className="flex items-start gap-2">
                <span className="text-[#FFCB2F] mt-0.5">•</span>
                <span>Inquiry must be in English or Korean</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - Form */}
        <div className="reveal reveal-delay-1">
          <form className="bg-[#FAFAF5] p-8 border-2 border-[#1A1A1A]/10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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
              <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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
              <label htmlFor="guests" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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
              <label htmlFor="occasion" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Occasion *
              </label>
              <input
                type="text"
                id="occasion"
                name="occasion"
                placeholder="e.g., School event, Corporate event, Bento box, Picnic"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="delivery" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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
              <label htmlFor="note" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Menu Preferences & Special Requests *
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="What menus would you like? Any special requests or customizations?"
                required
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:outline-none focus:border-[#FFCB2F] transition-colors"
              />
            </div>
            

            <div>
              <label htmlFor="dietary" className="block text-sm font-medium text-[#1A1A1A] mb-2">
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

            

            {submitStatus === 'success' && (
              <div className="text-green-500 font-bold mb-4">
                Inquiry submitted successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-500 font-bold mb-4">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}