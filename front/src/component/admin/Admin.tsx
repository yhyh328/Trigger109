import React, { useState, useEffect } from "react";
import { Notice, postNotification } from "../../api/notifications";
import { generateToken, messaging } from '../notifications/firebase';
import { onMessage } from 'firebase/messaging';
import './Admin.css';

export function UploadNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fcmTokenGenerated, setFcmTokenGenerated] = useState(false);

  useEffect(() => {
    if (fcmTokenGenerated) {
      generateToken();
      onMessage(messaging, (payload) => {
        console.log("FCM Message:", payload);
      });
    }
  }, [fcmTokenGenerated]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    setIsSubmitting(true);
    const newNotice: Partial<Notice> = {
      noticeTitle: title,
      noticeContent: content,
      noticeImg: null,
      noticeEmergency: 0,
      noticeViewCnt: 0,
    };

    if (selectedImage) {
      try {
        newNotice.noticeImg = await convertToBase64(selectedImage);
      } catch (error) {
        console.error("Failed to convert image:", error);
        alert("Image processing failed.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await postNotification(newNotice as Notice);
      alert("Upload successful!");
      setFcmTokenGenerated(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setIsSubmitting(false);
      setFcmTokenGenerated(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Upload Notification</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          cols={40}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit" disabled={isSubmitting}>Upload</button>
      </form>
    </div>
  );
}

export default UploadNotification;
