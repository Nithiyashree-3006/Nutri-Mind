@import "tailwindcss";

@theme {
  --color-primary-400: #22c55e;
  --color-primary-500: #10b981;
  --color-secondary-400: #60a5fa;
  --color-secondary-500: #3b82f6;
  --color-warning-400: #facc15;
  --color-warning-500: #eab308;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

@layer base {
  :root {
    --background: #ffffff;
    --foreground: #09090b;

    --card: #ffffff;
    --card-foreground: #09090b;

    --popover: #ffffff;
    --popover-foreground: #09090b;

    --primary: #10b981;
    --primary-foreground: #ffffff;

    --secondary: #3b82f6;
    --secondary-foreground: #ffffff;

    --muted: #f4f4f5;
    --muted-foreground: #71717a;

    --accent: #f4f4f5;
    --accent-foreground: #09090b;

    --destructive: #ef4444;
    --destructive-foreground: #f8fafc;

    --border: #e4e4e7;
    --input: #e4e4e7;
    --ring: #10b981;

    --radius: 0.5rem;
  }

  .dark {
    --background: #111827;
    --foreground: #f9fafb;

    --card: #1f2937;
    --card-foreground: #f9fafb;

    --popover: #1f2937;
    --popover-foreground: #f9fafb;

    --primary: #10b981;
    --primary-foreground: #f9fafb;

    --secondary: #3b82f6;
    --secondary-foreground: #f9fafb;

    --muted: #374151;
    --muted-foreground: #9ca3af;

    --accent: #374151;
    --accent-foreground: #f9fafb;

    --destructive: #ef4444;
    --destructive-foreground: #f8fafc;

    --border: #374151;
    --input: #374151;
    --ring: #10b981;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50 tracking-wide;
  }
  body {
    @apply text-foreground antialiased min-h-screen transition-colors duration-300;
  }
  
  :root {
    @apply bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50;
    background-attachment: fixed;
  }
  
  .dark {
    @apply bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900;
    background-attachment: fixed;
  }
}
