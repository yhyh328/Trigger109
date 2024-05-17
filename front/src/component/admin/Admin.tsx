import React, { useState, useEffect, useRef } from "react";
import { Notice, postNotification } from "../../api/notifications";
import { generateToken, messaging } from '../notifications/firebase';
import { onMessage } from 'firebase/messaging';
import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';
import './Admin.css';

export function UploadNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myBucket, setMyBucket] = useState<AWS.S3 | null>(null);
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
    AWS.config.update({
      accessKeyId: "AKIAQ3EGSCUZF6M3J4HW",
      secretAccessKey: "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",
    });

    const myBucket = new AWS.S3({
      params: { Bucket: "trigger109-bucket" },
      region: "ap-northeast-2"
    });

    setMyBucket(myBucket);
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

    if (selectedImage && myBucket) {
      try {
        const uniqueFileName = `upload/${uuidv4()}-${selectedImage.name}`;
        const param = {
          ACL: "public-read",
          ContentType: selectedImage.type,
          Body: selectedImage,
          Bucket: "trigger109-bucket",
          Key: uniqueFileName
        };

        myBucket
          .putObject(param)
          .send((err) => {
            if (err) {
              console.log(err);
            } else {
              const url = myBucket.getSignedUrl("getObject", { Key: param.Key });
              console.log("url: ", url);
              newNotice.noticeImg += url;

              postNotification(newNotice as Notice)
                .then(() => {
                  alert("Upload successful!");
                  setFcmTokenGenerated(true);
                  setTitle("");
                  setContent("");
                  setSelectedImage(null);
                })
                .catch((error) => {
                  console.error("Upload failed:", error);
                  alert("Upload failed.");
                })
                .finally(() => {
                  setIsSubmitting(false);
                });
            }
          });
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Image processing failed.");
        setIsSubmitting(false);
        return;
      }
    } else {
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
