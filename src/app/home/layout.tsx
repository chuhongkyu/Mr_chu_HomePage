export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>
        <header>
          <h1>Home Layout</h1>
          <nav>
            <a href="/home/resume">Resume</a>
            <a href="/home/about">About</a>
            <a href="/home/game">Game</a>
            <a href="/home/others">Others</a>
            <a href="/home/project">Project</a>
          </nav>
        </header>
        <section>{children}</section>
      </main>
    );
  }
  