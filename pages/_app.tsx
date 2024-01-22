import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { hooks } from "../styles/css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem attribute="class">
        <Theme radius="medium" grayColor="slate" panelBackground="translucent">
          <style dangerouslySetInnerHTML={{ __html: hooks }} />
          <ArweaveWalletKit
            config={{
              permissions: ["ACCESS_ADDRESS", "DISPATCH", "SIGN_TRANSACTION"],
            }}
          >
            <Toaster position="bottom-center" />
            <Component {...pageProps} />
          </ArweaveWalletKit>
          <ThemePanel />
        </Theme>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
