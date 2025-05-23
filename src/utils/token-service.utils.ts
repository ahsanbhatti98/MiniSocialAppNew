import * as Keychain from 'react-native-keychain';

type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export class TokenService {
  private static keychainKey = 'auth';

  static async saveTokens(
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    const tokenData: TokenData = {accessToken, refreshToken};
    await Keychain.setGenericPassword(
      this.keychainKey,
      JSON.stringify(tokenData),
    );
  }

  static async getTokens(): Promise<TokenData | null> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.username === this.keychainKey) {
        return JSON.parse(credentials.password);
      }
    } catch (error) {
      console.error('Error retrieving tokens from Keychain:', error);
    }
    return null;
  }

  static async clearTokens(): Promise<void> {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error clearing tokens from Keychain:', error);
    }
  }
}
