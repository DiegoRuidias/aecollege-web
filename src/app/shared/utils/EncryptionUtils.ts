export class EncryptionUtils {
  private static SESSION_KEY = 'session_key';
  private static encryptionKey: string;

  static initializeKey(): string {
    let key = localStorage.getItem(this.SESSION_KEY);
    if (!key) {
      const random = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      localStorage.setItem(this.SESSION_KEY, random);
      key = random;
    }
    this.encryptionKey = key;
    return key;
  };

  static encrypt(text: string): string {
    if (!this.encryptionKey) {
      this.initializeKey();
    }

    try {
      const textToChars = text.split('').map(c => c.charCodeAt(0));
      const keyToChars = this.encryptionKey.split('').map(c => c.charCodeAt(0));
      const bytes = new Uint8Array(textToChars.map((char, index) => 
        char ^ keyToChars[index % keyToChars.length]
      ));
      return btoa(String.fromCharCode(...bytes));
    } catch (e) {
      console.error('Encryption error', e);
      return '';
    }
  }

  static decrypt(encrypted: string): string {
    if (!this.encryptionKey) {
      this.initializeKey();
    }

    try {
      const textToChars = atob(encrypted).split('').map(c => c.charCodeAt(0));
      const keyToChars = this.encryptionKey.split('').map(c => c.charCodeAt(0));
      const bytes = new Uint8Array(textToChars.map((char, index) => 
        char ^ keyToChars[index % keyToChars.length]
      ));
      return String.fromCharCode(...bytes);
    } catch (e) {
      console.error('Decryption error', e);
      return '';
    }
  }
}