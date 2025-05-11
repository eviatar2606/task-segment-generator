export const metadata = {
  title: "Task Segment Generator",
  description: "Generate clean task definitions with ease",
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
