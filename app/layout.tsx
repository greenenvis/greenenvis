import "./globals.css";
export const metadata = {
  title: "GreenEnvis",
  description: "Environmental Compliance Made Simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import "./globals.css";