import React from 'react'
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import './InputField.css'
const InputField = ({message,setMessage,sendMessage}) => {

  return (
    <div className="input-area">
          {/* <div className="plus-button">+</div> */}
          <form onSubmit={sendMessage} className="input-container">
            <Input
              placeholder="채팅…"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              multiline={false}
              rows={1}
              className="input-field"  // CSS 클래스 적용
            />

            {/* <Button
              disabled={message === ""}
              type="submit"
              className="send-button"
            >
              전송
            </Button> */}
          </form>
        </div>
  )
}

export default InputField