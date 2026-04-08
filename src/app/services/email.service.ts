import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

// ⚠️  Remplacez ces trois valeurs par vos identifiants EmailJS
// Créez un compte gratuit sur https://www.emailjs.com/
// → Email Services > Add New Service (Gmail, Outlook…)
// → Email Templates  > New Template
// → Account > Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

export interface MailParams {
  from_name:    string;
  from_email:   string;
  from_phone?:  string;
  from_company?: string;
  message:      string;
  subject?:     string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  send(params: MailParams): Promise<void> {
    return emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params as unknown as Record<string, unknown>, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => void 0);
  }
}
