import { Button, Flex, IconButton, Link, Text } from "@radix-ui/themes";
import { css } from "../../styles/css";
import { useTheme } from "next-themes";
import AppLogo from "@/assets/icons/AppLogo";
import { useConnection } from "arweave-wallet-kit";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const AppHeader = () => {
  const { connected, connect, disconnect } = useConnection();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      style={css({
        width: "100%",
      })}
      align="center"
      justify="between"
      p="5"
      asChild
    >
      <header>
        <Flex gap="2">
          <IconButton
            disabled={location.key === "default"}
            variant="soft"
            color="gray"
            size="1"
            onClick={() => navigate(-1)}
          >
            <RxChevronLeft />
          </IconButton>
          <IconButton
            disabled={location.pathname.includes("profile")}
            variant="soft"
            color="gray"
            size="1"
            onClick={() => navigate(1)}
          >
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
