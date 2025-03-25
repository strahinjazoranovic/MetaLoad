import Navbar from './ui/navbar';

export const metadata = {
  title: 'MetaLoad',
  description: 'Free Warzone Loadouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
