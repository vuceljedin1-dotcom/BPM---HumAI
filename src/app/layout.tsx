// src/app/layout.tsx
export const metadata = {
  title: "BPM",
  description: "BPM Human-Centred AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>{children}</body>
    </html>
  );
}
