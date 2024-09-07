import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";

import { FCC } from "@/lib/types/tools.types";
import GraphQLProvider from "@/lib/providers/graphql.provider";
import theme from "@/lib/providers/theme.provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Horus Heresy Chronicles",
  description: "Explore the dark and treacherous events that shaped the Imperium of Man. Delve into the rich lore of the Horus Heresy, where brother fought brother in a galaxy-spanning civil war. Discover the heroes, the traitors, and the battles that defined one of the most iconic narratives in the Warhammer 40,000 universe.",
};

const RootLayout: FCC = ({ children }) => {
  return (
    <html lang="en">
      <body>
          <GraphQLProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </GraphQLProvider>
      </body>
    </html>
  );
};

export default RootLayout;
