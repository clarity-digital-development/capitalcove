'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Website - Contact Form',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-teal/10 border border-teal/20 rounded-card p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900">Message Sent</h3>
        <p className="text-gray-600 mt-2">
          Thank you for reaching out. We&apos;ll get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
          Name <span className="text-error">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
          Email <span className="text-error">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
          Phone <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          placeholder="(555) 555-5555"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal resize-y"
          placeholder="Tell us about your deal or question..."
        />
      </div>

      {status === 'error' && (
        <p className="text-error text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 bg-gold text-navy-dark rounded-button font-semibold hover:bg-gold-light transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
