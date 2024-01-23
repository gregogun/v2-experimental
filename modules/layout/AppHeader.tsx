import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { css } from "../../styles/css";
import { useTheme } from "next-themes";
import AppLogo from "@/assets/icons/AppLogo";
import { useConnection } from "arweave-wallet-kit";

export const AppHeader = () => {
  const { connected, connect, disconnect } = useConnection();

  return (
    <Flex
      style={css({
        width: "100%",
        padding: "var(--space-3)",
      })}
      asChild
      align="center"
      justify="between"
    >
      <header>
        <Link
          style={css({
            color: "var(--slate-12)",
            display: "grid",
            placeItems: "center",
          })}
          href="/"
        >
          <AppLogo />
        </Link>
        {
          <Button variant="outline" onClick={connected ? disconnect : connect}>
            {connected ? "Sign out / Disconnect" : "Sign in / Connect"}
          </Button>
        }
      </header>
    </Flex>
  );
};
