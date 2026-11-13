import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://durga-puja-night.vercel.app"),
  title: "SHADOWS OF THE SACRED — Durga Puja Night Photography Essay",
  description: "An immersive, cinematic digital photo essay documenting the atmospheric visual storytelling, human moments, and cultural environment of Durga Puja strictly after dark.",
  keywords: ["Durga Puja", "Night Photography", "Photo Essay", "Documentary Photography", "Kolkata", "Bengal", "Editorial"],
  authors: [{ name: "Documentary Photography Project" }],
  openGraph: {
    title: "SHADOWS OF THE SACRED — Durga Puja Night Photography Essay",
    description: "One festival. A world of nighttime experiences. Multiple visual perspectives.",
    type: "website",
    images: [
      {
        url: "/photos/01-canopy-of-lights.jpg",
        width: 1600,
        height: 1066,
        alt: "Durga Puja canopy of lights at night",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-night-900 text-warm-white antialiased selection:bg-gold-warm/20 selection:text-white">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
