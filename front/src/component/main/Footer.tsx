import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: white;
  text-align: center;
  padding: 20px 0;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© 2024 Trigger. All rights reserved.</p>
    </FooterContainer>
  );
}
