import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { css } from "../../styles/css";
import AppLogo from "@/assets/icons/AppLogo";
import { useConnection, useActiveAddress } from "arweave-wallet-kit";
import { HeaderDropdown } from "./HeaderDropdown";

export const AppHeader = () => {
  const { connected, connect, disconnect } = useConnection();
  const address = useActiveAddress();

  return (
    <Flex
      style={css({
        width: "100%",
        padding: "var(--space-3)",
        paddingBottom: "var(--space-4)",
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
        {connected ? (
          <HeaderDropdown address={address} />
        ) : (
          // we still check in case of unlikely scenario that we are connected but no active address
          <Button
            variant="ghost"
            onClick={connected ? disconnect : connect}
            color="gray"
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        )}
      </header>
    </Flex>
  );
};
