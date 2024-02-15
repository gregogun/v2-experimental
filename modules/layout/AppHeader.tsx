import { Button, Flex, IconButton, Link, Text } from "@radix-ui/themes";
import { css } from "../../styles/css";
import { useTheme } from "next-themes";
import AppLogo from "@/assets/icons/AppLogo";
import { useConnection } from "arweave-wallet-kit";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

export const AppHeader = () => {
  const { connected, connect, disconnect } = useConnection();

  return (
    <Flex
      style={css({
        width: "100%",
        padding: "var(--space-3)",
      })}
      align="center"
      justify="between"
      asChild
    >
      <header>
        <Flex gap="2">
          <IconButton variant="soft" color="gray" size="1">
            <RxChevronLeft />
          </IconButton>
          <IconButton variant="soft" color="gray" size="1">
            <RxChevronRight />
          </IconButton>
        </Flex>
        {
          <Button variant="surface" onClick={connected ? disconnect : connect}>
            {connected ? "Disconnect" : "Connect"}
          </Button>
        }
      </header>
    </Flex>
  );
};
