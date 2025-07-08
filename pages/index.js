import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();
    const id = json.filename.split('.')[0];
    window.location.href = `/video?id=${id}`;

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Neurocloud - Free Video Hosting</title>
      </Head>
      <div className="page-container">
        <nav className="navbar">
          <h1 className="logo">Neurocloud</h1>
          <div className="nav-links">
            <a href="/" className="nav-link active">Upload</a>
            <a href="https://whatsapp.com/channel/0029VatW5hiA2pLEagt7gu35" className="nav-link">Advertise</a>
          </div>
        </nav>

        <main className="main-content">
          <div className="hero-text">
            <h2>Free and Simple Video Hosting</h2>
            <p>Get started without an account</p>
          </div>

          <button 
            onClick={() => fileInputRef.current.click()} 
            disabled={loading}
            className={`upload-button ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <span className="button-content">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : 'Upload a Video'}
          </button>
          <input
            type="file"
            accept="video/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
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
