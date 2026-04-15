import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

// ⚠️ Remplacez ces valeurs par vos identifiants EmailJS (https://dashboard.emailjs.com/)
const EMAILJS_SERVICE_ID  = 'service_6j4ulke'; // Votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_jquvol2'; // Votre Template ID
const EMAILJS_PUBLIC_KEY  = 'cq_zDzolgIwxFWd1k'; // Votre Public Key

export interface MailParams {
  from_name:    string;
  from_email:   string;
  from_phone?:  string;
  from_company?: string;
  message:      string;
  subject?:     string;
  [key: string]: unknown; // Permet d'ajouter d'autres champs si nécessaire
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  /**
   * Envoie un e-mail via EmailJS
   * @param params Les paramètres du template
   */
  async send(params: MailParams): Promise<void> {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        params,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      throw error;
    }
  }
}
