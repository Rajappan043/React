import React, { useState } from "react";
import "./Qrcode.css";

export default function Qrcode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [size, setSize] = useState("");

  const handleImage = async () => {
    try {
      setLoading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qrcode
      )}`;
      setImg(url);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImage();
  };

  return (
    <div className="Qr-container">
      <form className="Qr-details" onSubmit={handleSubmit}>
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="Qr-code"></img>}
        <label htmlFor="Qr-code">Download for QR code:</label>
        <input
          id="Qr-code"
          name="qrcode"
          value={qrcode}
          placeholder="Enter data for QR code"
          onChange={(e) => setQrcode(e.target.value)}
          required
        />

        <label htmlFor="image-size">Image size:</label>
        <input
          id="image-size"
          name="size"
          value={size}
          type="number"
          placeholder="Enter image size"
          onChange={(e) => setSize(e.target.value)}
          required
        />

        <div className="buttons">
          <button className="Qr-generate" type="submit" disabled={loading}>
            Generate QR Code
          </button>
          <button
            className="Qr-download"
            onClick={handleDownload}
            disabled={!img}
          >
            Download QR Code
          </button>
        </div>
      </form>
    </div>
  );
}
