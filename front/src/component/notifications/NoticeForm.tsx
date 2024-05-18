import React, { useState } from 'react';
import { postNotification } from '../../api/notifications';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #0f1923;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  background-color: #00FCCE;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
  border: none;
  outline: none;
`;

const NoticeForm = () => {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeImg, setNoticeImg] = useState<File | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const notice = {
      noticeId: 0,
      noticeTitle,
      noticeContent,
      noticeImg: '',
      noticeEmergency: 0,   
      noticeViewCnt: 0,
      noticeCreatedAt: new Date().toISOString(),
    };

    try {
      await postNotification(notice, noticeImg);
      alert('공지사항이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('공지사항 등록 중 오류가 발생했습니다:', error);
      alert('공지사항 등록에 실패했습니다.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    setNoticeImg(file);
  };

  return (
    <FormContainer>
      <FormTitle>공지사항 등록</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="공지사항 제목"
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
        />
        <TextArea
          placeholder="공지사항 내용"
          value={noticeContent}
          onChange={(e) => setNoticeContent(e.target.value)}
        />
        <FileInput
          type="file"
          onChange={handleFileChange}
        />
        <Button type="submit">등록</Button>
      </Form>
    </FormContainer>
  );
};

export default NoticeForm;
