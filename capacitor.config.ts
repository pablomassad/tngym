import {CapacitorConfig} from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.pp.tngym',
  appName: 'tngym.desa',
  webDir: 'dist/spa',
  bundledWebRuntime: false,
  server: {hostname: "localhost:8080", androidScheme: "http", cleartext: true},
  android: {
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    FirebaseAuthentication: {
      ios: {
        providers: ['google.com']
      },
      android: {
        providers: ['google.com'],
        redirectUrl: 'YOUR_REDIRECT_URL_HERE'
      }
    },
    FirebaseMessaging: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Badge: {
      persist: true,
      autoClear: false
    },
    LocalNotifications: {
      smallIcon: "ic_launcher",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
}

export default config
