import {useCallback, useEffect, useState} from 'react';
import Purchases, {
  CustomerInfo as PurchasesCustomerInfo,
  PurchasesEntitlementInfo,
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';

/**
 * Custom hook to manage in-app subscriptions using RevenueCat
 */
export const useSubscription = () => {
  // Holds the current available offering (i.e. subscription plans)
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);

  // Holds detailed info about the current customer
  const [customerInfo, setCustomerInfo] =
    useState<PurchasesCustomerInfo | null>(null);

  // Tracks the currently active entitlement (i.e. active subscription plan)
  const [activeEntitlement, setActiveEntitlement] =
    useState<PurchasesEntitlementInfo | null>(null);

  // UI control: tracks loading state
  const [loading, setLoading] = useState<boolean>(true);

  // UI control: holds any error messages
  const [error, setError] = useState<string | null>(null);

  // ✅ Initialize RevenueCat and fetch current offerings and customer info
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // 🟩 Fetch current available offerings (plans)
        const offeringsResult = await Purchases.getOfferings();
        setOfferings(offeringsResult.current || null);

        // 🟩 Fetch current customer info
        const customerInfoResult = await Purchases.getCustomerInfo();
        setCustomerInfo(customerInfoResult);

        // 🟩 Set currently active entitlement (subscription)
        const entitlement =
          Object.values(customerInfoResult.entitlements.active)[0] || null;
        setActiveEntitlement(entitlement);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // ✅ Initiates a subscription purchase using the selected package
  const purchase = useCallback(async (pkg: PurchasesPackage) => {
    try {
      setLoading(true);

      // 🟦 Start the purchase
      const {customerInfo} = await Purchases.purchasePackage(pkg);

      // 🟦 Update entitlement and customer info post-purchase
      const entitlement =
        Object.values(customerInfo.entitlements.active)[0] || null;
      setActiveEntitlement(entitlement);
      setCustomerInfo(customerInfo);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Restores previous purchases made on the same account
  const restorePurchases = useCallback(async () => {
    try {
      setLoading(true);

      // 🔁 Restore previous purchases
      const customerInfoResult = await Purchases.restorePurchases();

      const entitlement =
        Object.values(customerInfoResult.entitlements.active)[0] || null;
      setActiveEntitlement(entitlement);
      setCustomerInfo(customerInfoResult);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Refreshes the current subscription state manually
  const refreshSubscriptionStatus = useCallback(async () => {
    try {
      setLoading(true);

      const customerInfoResult = await Purchases.getCustomerInfo();
      const entitlement =
        Object.values(customerInfoResult.entitlements.active)[0] || null;

      setActiveEntitlement(entitlement);
      setCustomerInfo(customerInfoResult);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Returns the expiration date of the current subscription if available
  const getExpirationDate = useCallback(() => {
    return activeEntitlement?.expirationDate ?? null;
  }, [activeEntitlement]);

  return {
    offerings, // Available plans for purchase
    customerInfo, // Full customer info
    activeEntitlement, // Currently active subscription info
    loading, // Loading state for UI
    error, // Any subscription error message
    purchase, // Function to purchase a plan
    restorePurchases, // Function to restore purchases
    refreshSubscriptionStatus, // Function to manually refresh state
    getExpirationDate, // Get subscription expiration date
  };
};
