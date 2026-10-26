"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, Download, MessageCircle, Share2 } from "lucide-react";
import { coupleNames, shareMessage } from "@/lib/wedding-config";

// The invitation's own address, known only in the browser so it is right on any domain.
const noop = () => () => {};
const useInvitationUrl = () =>
  useSyncExternalStore(
    noop,
    () => location.origin + "/",
    () => null,
  );
const useCanShare = () =>
  useSyncExternalStore(
    noop,
    () => typeof navigator.share === "function",
    () => false,
  );

export function SharePanel() {
  const url = useInvitationUrl();
  const canShare = useCanShare();
  const [copied, setCopied] = useState(false);
  const qr = useRef<HTMLCanvasElement>(null);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; the link is still shown for a long-press copy.
    }
  }
  function share() {
    if (!url) return;
    navigator.share({ title: coupleNames, text: shareMessage("").trim(), url }).catch(() => {});
  }
  function downloadQr() {
    const link = document.createElement("a");
    link.href = qr.current!.toDataURL("image/png");
    link.download = coupleNames.replace(/\W+/g, "-").toLowerCase() + "-invitation-qr.png";
    link.click();
  }

  return (
    <div className="share-panel">
      <figure className="share-qr" data-ready={Boolean(url)}>
        {url ? (
          <QRCodeCanvas
            ref={qr}
            value={url}
            size={480}
            style={{ width: 220, height: 220 }}
            level="M"
            marginSize={2}
            fgColor="#581f31"
            bgColor="#fffcf3"
            role="img"
            aria-label={"QR code for " + url}
          />
        ) : (
          <div className="share-qr-placeholder" aria-hidden="true" />
        )}
        <figcaption>
          <span lang="en">Scan to open the invitation</span>
          <span>அழைப்பிதழைத் திறக்க ஸ்கேன் செய்க</span>
        </figcaption>
      </figure>
      <div className="share-actions">
        <a
          className="directions share-whatsapp"
          href={url ? "https://wa.me/?text=" + encodeURIComponent(shareMessage(url)) : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!url}
        >
          <MessageCircle size={17} />
          <span lang="en">Send on WhatsApp</span>
        </a>
        {canShare && (
          <button type="button" className="share-button" onClick={share}>
            <Share2 size={16} />
            <span lang="en">Share…</span>
          </button>
        )}
        <button type="button" className="share-button" onClick={copy} disabled={!url}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span lang="en">{copied ? "Link copied" : "Copy link"}</span>
        </button>
        <button type="button" className="share-button" onClick={downloadQr} disabled={!url}>
          <Download size={16} />
          <span lang="en">Download QR code</span>
        </button>
        <p className="share-url" lang="en" aria-live="polite">
          {url ?? " "}
        </p>
      </div>
    </div>
  );
}
