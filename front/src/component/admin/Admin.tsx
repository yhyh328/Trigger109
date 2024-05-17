import React, { useState, useEffect, useRef } from "react";
import { Notice, postNotification } from "../../api/notifications";
import { generateToken, messaging } from '../notifications/firebase';
import { onMessage } from 'firebase/messaging';
import S3 from 'react-aws-s3-typescript';
import './Admin.css';

export function UploadNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fcmTokenGenerated, setFcmTokenGenerated] = useState(false);
  const fileUpload = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    setIsSubmitting(true);

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const newNotice: Partial<Notice> = {
      noticeTitle: title,
      noticeContent: content,
      noticeImg: '',
      noticeEmergency: 0,
      noticeViewCnt: 0,
    };

    if (selectedImage) {
      try {
        const ReactS3Client = new S3(config);
        const newFileName = selectedImage.name;
        const data = await ReactS3Client.uploadFile(selectedImage, newFileName);

        if (data.status === 204) {
          newNotice.noticeImg = data.location;
        } else {
          throw new Error('Image upload failed.');
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Image processing failed.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await postNotification(newNotice as Notice);
      alert("Upload successful!");
      setFcmTokenGenerated(true);
      // Clear form fields after successful upload
      setTitle("");
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setIsSubmitting(false);
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileUpload}
        />
        <button type="submit" disabled={isSubmitting}>Upload</button>
      </form>
    </div>
  );
}

export default UploadNotification;
