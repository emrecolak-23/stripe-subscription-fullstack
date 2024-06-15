import { FC } from "react";
import { Price } from "../../../shared/types";
import {
  Card,
  Text,
  Badge,
  Group,
  List,
  ThemeIcon,
  rem,
  Button,
} from "@mantine/core";
import { useLoginData } from "../auth/AuthContext";
// import { Link } from "react-router-dom";

interface SubsCardsProps {
  items: string[];
  price: Price;
  handleSubscription: (price: Price) => void;
}

const SubsCards: FC<SubsCardsProps> = ({
  price,
  items,
  handleSubscription,
}) => {
  const { userId } = useLoginData();
  const dynamicDescription = (price: Price) => {
    return price.nickname === "Basic"
      ? "5 exclusive stocks"
      : price.nickname === "Pro"
      ? "10 exclusive stocks"
      : "20 exclusive stocks";
  };

  return (
    <Card shadow="md" padding="lg" radius="lg" withBorder>
      <Group justify="space-between" mt="sm" mb="xs">
        <Text fw={700} size="xl">
          {price.nickname}
        </Text>
        <Badge color="pink">
          ${price.unit_amount / 100} <small className="text-md">/mo</small>
        </Badge>
      </Group>
      <Group justify="center">
        <Text size="md" mt="md" c="dimmed">
          <List
            type="ordered"
            center
            spacing={rem(10)}
            icon={<ThemeIcon color="pink" size={16} radius="xl"></ThemeIcon>}
            withPadding
          >
            <List.Item>{dynamicDescription(price)}</List.Item>
            {items.map((item) => {
              return <List.Item key={item}>{item}</List.Item>;
            })}
          </List>
        </Text>
      </Group>
      <Group justify="center" mb="lg" style={{ marginTop: "auto" }}>
        {/* <Link to="/register"> */}
        <Button
          onClick={() => handleSubscription(price)}
          color="pink"
          bg={userId ? "pink" : "gray"}
          size="sm"
          mt="lg"
          radius="md"
        >
          {!userId && "Sign up"}
          {userId && "Subscribe"}
        </Button>
        {/* </Link> */}
      </Group>
    </Card>
  );
};

export default SubsCards;
