import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "MetaLoad",
  description: "Call Of Duty Warzone Loadouts",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
