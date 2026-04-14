import { TestBed } from '@angular/core/testing';
import { EmailService, MailParams } from './email.service';
import emailjs from '@emailjs/browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}));

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService]
    });
    service = TestBed.inject(EmailService);
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call emailjs.send with correct parameters', async () => {
    const mockSend = vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: 'OK' });
    
    const params: MailParams = {
      from_name: 'John Doe',
      from_email: 'john@example.com',
      message: 'Hello!',
    };

    await service.send(params);

    expect(mockSend).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      params,
      expect.objectContaining({ publicKey: expect.any(String) })
    );
  });

  it('should handle emailjs error', async () => {
    vi.mocked(emailjs.send).mockRejectedValue(new Error('EmailJS error'));
    
    const params: MailParams = {
      from_name: 'John Doe',
      from_email: 'john@example.com',
      message: 'Hello!',
    };

    await expect(service.send(params)).rejects.toThrow('EmailJS error');
  });
});
