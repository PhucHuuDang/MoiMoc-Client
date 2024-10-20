import { CancelPaymentClient } from "./cancel-payment-client";

export default function EnhancedPaymentSuccess({
  params,
}: {
  params: { slug: string };
}) {
  return <CancelPaymentClient />;
}
