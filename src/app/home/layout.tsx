export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>
        {children}
      </main>
    );
  }
  