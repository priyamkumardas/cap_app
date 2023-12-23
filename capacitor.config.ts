import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.papapanda.straydopt',
  appName: 'StrayDopt',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    },
  },
};

export default config;
