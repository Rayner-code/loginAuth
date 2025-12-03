import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.login.app',
  appName: 'loginAuth',
  webDir: 'www',
    plugins: {
    SocialLogin: {
      providers: {
        google: true,      // true = enabled (bundled), false = disabled (not bundled)
        facebook: false,   // Use false to reduce app size
        apple: true,      // Apple uses system APIs, no external deps
        twitter: false   // false = disabled (not bundled)
      }
    }
  }
};

export default config;
