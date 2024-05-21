import React from 'react';
import styled from 'styled-components';


type GuideSectionProps ={
  id: string;
  image: string;
  description: string;
}

export default function Product({
                                  id,
                                  image,
                                  description,
                                }: GuideSectionProps) {

  return (
      <article className="product">
        <img src={image} />
        <div className="product-content">
          <div>
            <p>{description}</p>
          </div>
          <p className="product-actions">
          </p>
        </div>
      </article>
  );
}
