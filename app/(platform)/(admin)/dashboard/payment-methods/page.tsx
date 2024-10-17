import { Suspense } from "react";
import PaymentMethodsClient from "./payment-methods-client";
import PaymentMethodsSkeleton from "./payment-skeleton";

const PaymentMethodsPage = () => {
  return (
    <Suspense fallback={<PaymentMethodsSkeleton />}>
      <PaymentMethodsClient />
    </Suspense>
  );
};

export default PaymentMethodsPage;
