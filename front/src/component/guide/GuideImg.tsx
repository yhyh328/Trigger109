import { type ReactNode } from 'react';

type GuideImgProps = {
  children: ReactNode;
};

export default function GuideImg({ children }: GuideImgProps) {
  return (
    <section id="guideImg">
      <p>브림스톤의 파일에서 직접 추려낸 발로란트 초보자 가이드입니다. 이제 막 발로란트에 첫걸음을 내딛든, 전에 배운 내용을 복습하든, 이미 모든 것을 경험한 베터랑 요원보다 훌륭한 스승은 없을 것입니다.</p>
      <ul id="gImgs">{children}</ul>
    </section>
  );
}
