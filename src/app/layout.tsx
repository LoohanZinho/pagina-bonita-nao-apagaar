import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { EasterEggListener } from '@/components/ui/easter-egg-listener';
import { ServiceWorkerRegistration } from '@/components/ui/service-worker-registration';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Lz Developer | Sites e SaaS de Alta Performance',
  description:
    'Desenvolvemos sites e aplicações SaaS profissionais, rápidos e otimizados que convertem visitantes em clientes. Design de ponta, performance e a tecnologia mais moderna para sua marca.',
  manifest: '/manifest.json',
  themeColor: '#f5f5f5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-neutral-100`}>
        {children}
        <EasterEggListener />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
