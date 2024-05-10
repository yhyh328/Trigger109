import React from 'react';
import create from 'zustand';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

type FormState = {
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
};

const useFormStore = create<FormState>(set => ({
  formValues: {
    username: '',
    email: '',
    password: ''
  },
  setFormValues: (values) => set({ formValues: values })
}));

const SignUp = () => {
  const { formValues, setFormValues } = useFormStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Submitted', formValues);
    // 여기에 회원가입 처리 로직을 추가할 수 있습니다.
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
