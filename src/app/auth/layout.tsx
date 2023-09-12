export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-96 m-auto px-3 pb-3">{children}</main>
    </>
  );
}
