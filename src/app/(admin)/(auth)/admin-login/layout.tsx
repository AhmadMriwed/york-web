export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <div className="h-[100vh]">{children}</div>;
}
