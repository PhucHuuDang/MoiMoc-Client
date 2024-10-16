import { Suspense } from "react";
import DeliveryMethodsClient from "./delivery-methods-client";
import DeliveryMethodsSkeleton from "./delivery-skeleton";

const DeliveryMethod = () => {
  return (
    <Suspense fallback={<DeliveryMethodsSkeleton />}>
      <DeliveryMethodsClient />;
    </Suspense>
  );
};

export default DeliveryMethod;
