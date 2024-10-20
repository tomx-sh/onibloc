import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";


export const metadata: Metadata = {
    title: "onibloc",
    description: "Bitcoin Node Explorer",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body>
                <Theme accentColor="orange" appearance="dark">
                    {children}
                </Theme>
            </body>
        </html>
    );
}
