# 🐶 Pet Final Project

A modern web application for pet management built with Next.js, React, and TypeScript.

## 🦁 Overview

This is a comprehensive pet management system designed to help pet owners, veterinary clinics, or pet adoption centers manage pet information, appointments, and records efficiently. Built with modern web technologies for a fast, responsive, and user-friendly experience.

## ⚒️ Tech Stack

- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React
- **Theme:** next-themes for dark mode support

## 🪼 Features

- Modern, responsive UI with dark mode support
- Type-safe development with TypeScript
- Comprehensive UI component library
- Form validation and error handling
- Accessible components following WAI-ARIA standards
- Optimized performance with Next.js App Router
- Analytics integration with Vercel Analytics

## 🚧 Project Structure

\`\`\`
pet-final-project/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
\`\`\`

## 💼 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/snoopygc/PetFinalProject.git
   cd PetFinalProject
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install or yarn install or pnpm install

3. **Run the development server**
   \`\`\`bash
   npm run dev or yarn dev or pnpm dev

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🚸 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📋 UI Components

This project includes a comprehensive set of pre-built UI components:

- **Layout:** Card, Separator, Tabs, Accordion
- **Forms:** Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback:** Alert, Toast, Dialog, Drawer, Progress
- **Navigation:** Breadcrumb, Dropdown Menu, Navigation Menu, Sidebar
- **Data Display:** Table, Avatar, Badge, Calendar, Chart
- **Overlays:** Popover, Tooltip, Hover Card, Context Menu
- **And many more...**

## 🎒 Development

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system defined in `globals.css`
- Utilize CSS variables for theming
- Support both light and dark modes

### Type Safety

- All components are fully typed with TypeScript
- Use Zod schemas for form validation
- Leverage type inference where possible

## 💾 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your app will be deployed with a production URL

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Node.js

## 🫆 License

This project is open source and available under the MIT License.

## 👩🏻‍💻 Author

**snoopygc**
- GitHub: [@snoopygc](https://github.com/snoopygc)

## 🧵 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Vercel for hosting and deployment platform
- Open source community for the tools and libraries
