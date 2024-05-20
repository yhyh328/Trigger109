import React from 'react';
import styled from 'styled-components';


type GuideSectionProps ={
  id: string;
  image: string;
}

export default function Product({
  id,
  image,
}: GuideSectionProps) {

  return (
    <article className="product">
      <img src={image} />
      <div className="product-content">
        <div>
        </div>
        <p className="product-actions">
        </p>
      </div>
    </article>
  );
}
