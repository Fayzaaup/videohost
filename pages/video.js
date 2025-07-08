import { useRouter } from 'next/router';
import Head from 'next/head';

export default function VideoPage() {
  const { query } = useRouter();
  const id = query.id;

  if (!id) return (
    <div className="not-found">
      <p>Video tidak ditemukan.</p>
    </div>
  );

  const videoUrl = `https://nekochii-up.hf.space/file/${id}.mp4`;

  return (
    <>
      <Head>
        <title>Watch Video - Neurocloud</title>
      </Head>
      <div className="page-container">
        <nav className="navbar">
          <h1 className="logo">Neurocloud</h1>
          <div className="nav-links">
            <a href="/" className="nav-link">Upload</a>
            <a href="https://whatsapp.com/channel/0029VatW5hiA2pLEagt7gu35" className="nav-link">Advertise</a>
          </div>
        </nav>

        <main className="video-player-container">
          <div className="video-wrapper">
            <video controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </main>

        <footer className="footer">
          <p>Copyright © 2025 Neurocloud</p>
          <div className="footer-links">
            <a href="https://whatsapp.com/channel/0029VatW5hiA2pLEagt7gu35">Terms of Service</a>
            <a href="https://whatsapp.com/channel/0029VatW5hiA2pLEagt7gu35">Report Abuse</a>
          </div>
        </footer>
      </div>
    </>
  );
}