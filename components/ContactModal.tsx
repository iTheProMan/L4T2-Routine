/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { PhoneIcon, MailIcon, ClipboardIcon, CheckIcon, CloseIcon } from './icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: string;
  phone: string | null;
  email: string | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, teacher, phone, email }) => {
  const [copied, setCopied] = useState<'phone' | 'email' | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCopied(null); // Reset copied state when modal closes
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl p-6 m-4 w-full max-w-md relative text-[var(--text-primary)] transform transition-all duration-300 scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close contact details"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 pr-8">{teacher}</h2>
        <div className="space-y-4">
          {phone && (
            <div>
                <label className="text-sm font-semibold text-[var(--text-muted)]">Phone Number</label>
                <div className="flex items-center gap-3 mt-1">
                    <PhoneIcon className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                    <a href={`tel:${phone}`} className="font-mono text-lg text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors flex-grow">{phone}</a>
                    <button
                        onClick={() => copyToClipboard(phone, 'phone')}
                        className="flex items-center gap-2 bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] text-[var(--text-secondary)] px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        disabled={copied === 'phone'}
                    >
                        {copied === 'phone' ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardIcon className="w-4 h-4" />}
                        <span>{copied === 'phone' ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
            </div>
          )}
          {email && (
            <div>
                <label className="text-sm font-semibold text-[var(--text-muted)]">Email Address</label>
                <div className="flex items-center gap-3 mt-1">
                    <MailIcon className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                    <a href={`mailto:${email}`} className="font-mono text-lg text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors flex-grow truncate">{email}</a>
                    <button
                        onClick={() => copyToClipboard(email, 'email')}
                        className="flex items-center gap-2 bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] text-[var(--text-secondary)] px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        disabled={copied === 'email'}
                    >
                        {copied === 'email' ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardIcon className="w-4 h-4" />}
                        <span>{copied === 'email' ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;