export const mockGenerate = {
    projectName: "portfolio-website",
  
    files: [
      {
        path: "package.json",
        content: JSON.stringify(
          {
            name: "portfolio-website",
            version: "1.0.0",
            scripts: {
              dev: "next dev",
              build: "next build",
            },
            dependencies: {
              next: "15.0.0",
              react: "^18.0.0",
              tailwindcss: "^3.0.0",
            },
          },
          null,
          2
        ),
      },
  
      {
        path: "src/app/page.tsx",
        content: `
  export default function Home() {
    return (
      <main>
        <h1>
          Welcome to my portfolio
        </h1>
      </main>
    );
  }
  `,
      },
  
      {
        path: "src/components/Navbar.tsx",
        content: `
  export default function Navbar(){
    return (
      <nav>
        Portfolio
      </nav>
    );
  }
  `,
      },
    ],
  };