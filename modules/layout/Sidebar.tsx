import AppLogo from "@/assets/icons/AppLogo";
import { css } from "@/styles/css";
import { Box, Flex, Link, ScrollArea } from "@radix-ui/themes";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { appConfig } from "@/config";
import { useRouter } from "next/router";
import { styled } from "@stitches/react";

const StyledList = styled("ul", {
  "& svg": {
    fontSize: "var(--font-size-5)",
  },
});

interface NavItemProps {
  path: string;
  active: boolean;
  children: React.ReactNode;
}

const NavItem = (props: NavItemProps) => (
  <li>
    <Link href={props.path}>
      <Flex
        gap="2"
        align="center"
        py="2"
        px="3"
        style={css({
          alignSelf: "stretch",
          color: props.active ? "var(--slate-12)" : "var(--slate-11)",

          "&:hover": {
            // backgroundColor: "var(--slate-3)",
            color: "var(--slate-12)",
          },
        })}
      >
        {props.children}
      </Flex>
    </Link>
  </li>
);

export const Sidebar = () => {
  const router = useRouter();
  return (
    <Box
      py="3"
      pr="5"
      style={css({
        minWidth: 240,
        backgroundColor: "var(--side-panel-background)",
        height: `calc(100% - ${appConfig.playerMaxHeight}px)`,
      })}
    >
      <ScrollArea
        scrollbars="vertical"
        style={css({
          height: `calc(100dvh - ${appConfig.playerMaxHeight}px)`,

          // maxHeight: "calc(100vh - 96px)",
          padding: "var(--space-1)",
        })}
      >
        <Flex
          style={css({
            height: "100%",
          })}
          direction="column"
          align="start"
        >
          <Link
            ml="3"
            style={css({
              color: "var(--slate-12)",
              display: "grid",
              placeItems: "center",
            })}
            href="/"
          >
            <AppLogo />
          </Link>

          <Flex direction="column" gap="3" mt="7" asChild>
            <nav style={css({ width: "100%" })}>
              <StyledList>
                <NavItem path="/" active={router.pathname === "/"}>
                  {router.pathname === "/" ? <GoHomeFill /> : <GoHome />}
                  Home
                </NavItem>
                <NavItem path="/search" active={router.pathname === "/search"}>
                  {router.pathname === "/search" ? (
                    <RiSearchFill />
                  ) : (
                    <RiSearchLine />
                  )}
                  Search
                </NavItem>
              </StyledList>
            </nav>
          </Flex>
        </Flex>
      </ScrollArea>
    </Box>
  );
};
