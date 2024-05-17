import React, { useState, useEffect, useRef } from "react";
import { Notice, postNotification } from "../../api/notifications";
import { generateToken, messaging } from '../notifications/firebase';
import { onMessage } from 'firebase/messaging';
import { S3Client, PutObjectCommand, GetObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import './Admin.css';

export function UploadNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [s3Client, setS3Client] = useState<S3Client | null>(null);
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

  useEffect(() => {
    const client = new S3Client({
      region: process.env.REACT_APP_AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY!,
      }
    });

    setS3Client(client);
  }, []);

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

    const newNotice: Partial<Notice> = {
      noticeTitle: title,
      noticeContent: content,
      noticeImg: '',
      noticeEmergency: 0,
      noticeViewCnt: 0,
    };

    if (selectedImage && s3Client) {
      const uniqueFileName = `upload/${uuidv4()}-${selectedImage.name}`;
      const params = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: uniqueFileName,
        Body: selectedImage,
        ACL: ObjectCannedACL.public_read,  // ObjectCannedACL.public_read 사용
        ContentType: selectedImage.type
      };
      
      console.log('selectedImage: ', selectedImage)
      console.log('ContentType: ', selectedImage.type)


      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        const url = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: process.env.REACT_APP_AWS_BUCKET_NAME, Key: uniqueFileName }));
        console.log("url: ", url);
        newNotice.noticeImg = url;
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
