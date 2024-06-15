import { useNavigate } from "react-router-dom";
import SubsCards from "../components/Card";
import { Loader } from "@mantine/core";
import { usePrices } from "../hooks/usePrices";
import { Price } from "../../../shared/types";
import { useLoginData } from "../auth/AuthContext";
import { useCreateSubscription } from "../hooks/useCreateSubscriptions";
const Home = () => {
  const navigate = useNavigate();
  const { prices, isLoading } = usePrices();
  const { userId } = useLoginData();
  const mutate = useCreateSubscription();

  const handleSubscription = (price: Price) => {
    console.log(price, "price");
    if (userId) {
      mutate(price.id);
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col w-full items-center h-[80vh]">
      <div className="flex flex-col text-center w-full items-center justify-center h-72 bg-slate-500">
        <h1 className="text-4xl font-bold">
          Explore thre right plan for your business
        </h1>
        <p className="pb-4">Choose a plan that suits for you</p>
      </div>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={40} color="blue" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-5 p-5 w-full items-center justify-center h-max">
        {prices.map((price: Price) => (
          <SubsCards
            key={price.id}
            items={[
              "Free market analysis",
              "Email support",
              "Help center access",
            ]}
            handleSubscription={handleSubscription}
            price={price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
