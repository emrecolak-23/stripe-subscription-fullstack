import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useSubscriptionStatus } from "../hooks/useSubscriptionStatus";
const StripeSuccess = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSubscriptionStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen font-bold">
        <Loader size={40} color="blue" />
      </div>
    );
  }

  if (data.length === 0) {
    navigate("/");
  } else {
    navigate("/account");
  }
};

export default StripeSuccess;
