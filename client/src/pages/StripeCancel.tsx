import { WarningTwoTone } from "@ant-design/icons";

const StripeCancel = () => {
  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="flex flex-col items-center">
        <WarningTwoTone style={{ fontSize: "100px" }} />
        <p>Payment failed</p>
      </div>
    </div>
  );
};

export default StripeCancel;
