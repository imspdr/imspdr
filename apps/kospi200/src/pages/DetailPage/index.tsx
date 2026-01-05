import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import * as S from './styled';

const DetailPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { addRecentView } = useRecentlyViewed();

  useEffect(() => {
    if (code) {
      addRecentView(code);
    }
  }, [code, addRecentView]);

  return (
    <S.PageContainer>
      <S.Title variant="title" level={1}>
        종목 상세 페이지
      </S.Title>
      <S.CodeInfo variant="body" level={1}>
        종목 코드: <strong>{code}</strong>
      </S.CodeInfo>
      <S.Description variant="body" level={1}>
        상세 차트 및 분석 정보가 여기에 표시됩니다.
      </S.Description>
      <S.StyledButton onClick={() => navigate('/list')}>목록으로 돌아가기</S.StyledButton>
    </S.PageContainer>
  );
};

export default DetailPage;
