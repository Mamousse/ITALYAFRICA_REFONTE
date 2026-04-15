import { MailParams, EmailService } from './app/services/email.service';
import { describe, it, expect } from 'vitest';

// Ce test va tenter d'envoyer un VRAI e-mail en utilisant votre service
describe('EmailService Real Integration Test', () => {
  it('should send a real test email', async () => {
    const service = new EmailService();
    const testParams: MailParams = {
      from_name: 'Test Gemini CLI',
      from_email: 'test@gemini.ai',
      from_phone: '0123456789',
      from_company: 'Gemini AI Test',
      message: 'Ceci est un message de test automatique pour vérifier la configuration EmailJS.',
      subject: 'Test de configuration EmailJS - SUCCESS'
    };

    console.log('Tentative d\'envoi du mail de test...');
    
    try {
      await service.send(testParams);
      console.log('✅ Mail envoyé avec succès ! Vérifiez votre boîte de réception.');
    } catch (error) {
      console.error('❌ Échec de l\'envoi :', error);
      throw error;
    }
  });
});
