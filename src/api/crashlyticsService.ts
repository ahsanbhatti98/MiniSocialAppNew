// import {getApp} from '@react-native-firebase/app';
import {
  getCrashlytics,
  log as logCrashlytics,
  recordError as recordCrashlyticsError,
  setUserId,
  setAttribute as setCrashlyticsAttribute,
  crash as crashNow,
} from '@react-native-firebase/crashlytics';

class CrashlyticsService {
  // private static crashlytics = getCrashlytics(getApp());
  private static crashlytics = getCrashlytics();

  static log(message: string) {
    logCrashlytics(this.crashlytics, message);
  }

  static recordError(error: Error, context?: string) {
    if (context) {
      logCrashlytics(this.crashlytics, `[Context]: ${context}`);
    }
    recordCrashlyticsError(this.crashlytics, error);
  }

  static setUser(id: string, email?: string, role?: string) {
    setUserId(this.crashlytics, id);
    if (email) setCrashlyticsAttribute(this.crashlytics, 'email', email);
    if (role) setCrashlyticsAttribute(this.crashlytics, 'role', role);
  }

  static setAttribute(key: string, value: string) {
    setCrashlyticsAttribute(this.crashlytics, key, value);
  }

  static crashApp() {
    crashNow(this.crashlytics);
  }
}

export default CrashlyticsService;
