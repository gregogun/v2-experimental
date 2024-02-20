import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { hooks } from "../styles/css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AudioPlayerProvider } from "@/hooks/useAudioPlayer";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioPlayerProvider>
        <ThemeProvider enableSystem attribute="class">
          <Theme
            radius="medium"
            grayColor="slate"
            accentColor="indigo"
            panelBackground="translucent"
          >
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
      </AudioPlayerProvider>
    </QueryClientProvider>
  );
}
