import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Loader } from "@mantine/core";
import Button from "../components/Button";
const Account = () => {
  const { data: subscriptions, isLoading } = useSubscriptions();

  if (isLoading) {
    return (
      <div className="flex w-full h-[80vh] items-center justify-center">
        <Loader size={40} color="blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start mt-10 gap-5 items-center h-[80vh]">
      <div className="flex items-center justify-center">
        <UserOutlined style={{ fontSize: "3rem" }} />
        <h1 className="text-3xl font-bold ml-3">Account</h1>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="text-xl mt-5">Subscription Status</p>
      </div>
      <div className="flex flex-col w-1/2 p-2">
        {subscriptions.map((sub) => {
          const current_period_end = moment(sub.current_period_end * 1000)
            .format("MMMM Do YYYY, h:mm:ss a")
            .toString();

          return (
            <div
              key={sub.id}
              className="flex w-full items-center gap-2 m-2 justify-center"
            >
              <section className="w-full">
                <hr />
                <p className="font-bold text-md flex-1">{sub.plan.nickname}</p>
                <h5>
                  Price:
                  {(sub.plan.amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: sub.plan.currency,
                  })}
                </h5>
                <p>Status: {sub.status}</p>
                <p>
                  Card last 4 digits: {sub.default_payment_method.card.last4}
                </p>
                <p>Current period end: {current_period_end} </p>
              </section>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 w-1/2">
        <Button
          className="p-2 border-2 bg-white text-red-700 border-red-700 hover:text-white hover:bg-red-700  rounded-md"
          text="Access"
        />
        <Button
          className="p-2 border-2 bg-white-500 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-md"
          text="Manage Subscription"
        />
      </div>
    </div>
  );
};

export default Account;
