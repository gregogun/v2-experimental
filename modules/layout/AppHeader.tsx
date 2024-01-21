import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { css } from "../../styles/css";
import { useTheme } from "next-themes";
import AppLogo from "@/assets/icons/AppLogo";
import { useConnection } from "arweave-wallet-kit";

export const AppHeader = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { connected, connect, disconnect } = useConnection();

  let src;

  switch (resolvedTheme) {
    case "dark":
      src = "arcadia_logo_text_white.svg";
      break;
    default:
      src = "arcadia_logo_text_black.svg";
      break;
  }

  return (
    <Flex
      style={css({
        width: "100%",
        padding: "var(--space-2)",
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
          <Button variant="soft" onClick={connected ? disconnect : connect}>
            {connected ? "Disconnect" : "Connect"}
          </Button>
        }
      </header>
    </Flex>
  );
};
