import React, { useState } from 'react';
import styled from 'styled-components';
import { signUp } from "../../api/signup"

const FormContainer = styled.div`
  background-color: #0f1923;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 150px
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

const Button = styled.button`
  background-color: #00FCCE;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const FileInputButton = styled.label`
  background-color: #0077b6;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;

  &:hover {
    background-color: #005f87;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileLabel = styled.div`
  color: #fff;
  margin-top: 8px;
  font-size: 14px;
  margin-left: 10px
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;  // Add some margin below the file input container
`;

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [fileName, setFileName] = useState('No file chosen');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickName', nickName);
    formData.append('gender', gender);
    if (profileImg) {
      formData.append('profileImg', profileImg);
    }
  
    try {
      // signUp 함수를 호출하여 서버로 formData를 전송
      await signUp(formData);
      alert('사용자 등록이 성공했습니다.');
    } catch (error) {
      console.error('사용자 등록 중 오류가 발생했습니다:', error);
      alert('사용자 등록에 실패했습니다.');
    }
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setProfileImg(file);
    setFileName(file ? file.name : 'No file chosen');
  };

  

  return (
    <FormContainer>
      <FormTitle>Sign Up</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <div>
          <label>
            <Input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
            /> 남
          </label>
          <label>
            <Input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
            /> 여
          </label>
        </div>
        <FileInputContainer>
          <FileInputButton htmlFor="file-upload">Choose File</FileInputButton>
          <HiddenFileInput
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <FileLabel>{fileName}</FileLabel>
        </FileInputContainer>
        <Button type="submit">Sign Up</Button>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
