import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FE MR.CHU",
  description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation. Transforming AI-generated motion data into dynamic skeleton-based animations.",
  openGraph: {
    title: "FE MR.CHU",
    description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "FE MR.CHU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FE MR.CHU",
    description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: ["/assets/og-image.png"],
  },
}; 