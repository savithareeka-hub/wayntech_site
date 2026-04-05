@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    
    /* Wayntech SB Brand Colors - Bright Blue (#0088CC) */
    --primary: 200 100% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary: 200 20% 96%;
    --secondary-foreground: 200 100% 20%;
    --accent: 200 100% 40%;
    --accent-foreground: 0 0% 100%;
    
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 200 100% 40%;
    --radius: 0.5rem;
    
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 200 100% 40%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 200 100% 40%;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --card: 222 47% 15%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 15%;
    --popover-foreground: 210 40% 98%;
    
    /* Wayntech SB Brand Colors - Dark Mode */
    --primary: 200 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 200 30% 20%;
    --secondary-foreground: 200 100% 90%;
    --accent: 200 100% 50%;
    --accent-foreground: 0 0% 100%;
    
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 200 100% 50%;
    
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 200 100% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 200 100% 50%;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground;
    font-family: "DM Sans", sans-serif;
    overflow-x: clip;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }
}

@layer utilities {
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
    background-size: 4rem 4rem;
  }
}