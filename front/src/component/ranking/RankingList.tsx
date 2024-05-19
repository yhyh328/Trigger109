import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { RankingRow, fetchRankingRows } from '../../api/ranking';
import { fetchAllInfo } from '../../api/getuser';
=======
import { Member, RankingRow, fetchRankingRows } from '../../api/ranking';
>>>>>>> b65a97152fb09e6370bd4d82de8cb1ce1e87a4b2

// Styled components
const RankingTopImg = styled.section`
  height: 80vh;
  background-image: url('/game_map_imgs/aa.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
  padding-bottom: 20px;
`;

const RankingContainer = styled.div`
  flex: 1;
  background-color: #0F1923;
  padding: 50px 30px;
<<<<<<< HEAD
  background-size: cover;
=======
>>>>>>> b65a97152fb09e6370bd4d82de8cb1ce1e87a4b2
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 100px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  background-color: #f4f4f4;
  &:nth-child(odd) {
    background-color: #e9e9e9;
  }
`;

const Cell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  color: black;
`;

const HeaderCell = styled.th`
  padding: 12px 10px;
  background-color: #005f73;
  color: white;
  text-align: center;
`;

const NicknameCell = styled(Cell)`
  color: blue;  // Customize color as needed
`;

const RatingCell = styled(Cell)`
  color: green;  // Customize color as needed
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

const Loading = styled.div`
  text-align: center;
`;

<<<<<<< HEAD
=======

>>>>>>> b65a97152fb09e6370bd4d82de8cb1ce1e87a4b2
// RankingList component
const RankingList: React.FC = () => {
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
          const [rankingData, membersData] = await Promise.all([
              fetchRankingRows(),
              fetchAllInfo()
          ]);
          const combinedData = rankingData.map(rank => {
              const memberMatch = membersData.find(member => member.memberId === rank.member);
              console.log('memberMatch: ', memberMatch)

              return {
                  ...rank,
                  memberNickname: memberMatch ? memberMatch.nickname : 'N/A',
                  memberImg: memberMatch ? memberMatch.image : '/default_avatar.png'
              };
          });
          setRanking(combinedData);
      } catch (error: unknown) {
          if (error instanceof Error) {
              console.error('Error fetching data:', error.message);
              setError(error.message || 'Failed to load data.');
          } else {
              console.error('An unexpected error occurred', error);
              setError('An unexpected error occurred');
          }
      } finally {
          setLoading(false);
      }
  };

    fetchData();
}, []);

  const Content = () => {
    if (loading) {
        return <Loading>Loading...</Loading>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <TableStyled>
            <thead>
                <Row>
                    <HeaderCell>프로필</HeaderCell>
                    <HeaderCell>닉네임</HeaderCell>
                    <HeaderCell>킬</HeaderCell>
                    <HeaderCell>데스</HeaderCell>
                    <HeaderCell>승률</HeaderCell>
                </Row>
            </thead>
            <tbody>
                {ranking.map((row, index) => (
                    <Row key={index}>
                        <Cell><img src={row.memberImg || '/default_avatar.png'} alt="Profile" style={{width: 50, height: 50}} /></Cell>
                        <NicknameCell>{row.memberNickname || 'N/A'}</NicknameCell>
                        <Cell>{row.killCnt || '0'}</Cell>
                        <Cell>{row.death || '0'}</Cell>
                        <RatingCell>{row.rating || '0'}</RatingCell>
                    </Row>
                ))}
            </tbody>
        </TableStyled>
=======
        const rankingData = await fetchRankingRows();
        setRanking(rankingData);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setError(error.message || 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Content = () => {
    if (loading) return <Loading>Loading...</Loading>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
      <TableStyled>
        <thead>
          <Row>
            <HeaderCell>프로필</HeaderCell>
            <HeaderCell>닉네임</HeaderCell>
            <HeaderCell>킬</HeaderCell>
            <HeaderCell>데스</HeaderCell>
            <HeaderCell>레이팅</HeaderCell>
          </Row>
        </thead>
        <tbody>
          {ranking.map((row, index) => (
            <Row key={index}>
               <Cell><img src={row.member.profileImg || null || undefined} alt="Profile" style={{width: 50, height: 50}} /></Cell>
              <NicknameCell>{row.member.nickName || 'N/A'}</NicknameCell>
              <Cell>{row.killCnt}</Cell>
              <Cell>{row.death}</Cell>
              <RatingCell>{row.rating}</RatingCell>
            </Row>
          ))}
        </tbody>
      </TableStyled>
>>>>>>> b65a97152fb09e6370bd4d82de8cb1ce1e87a4b2
    );
  };

  return (
<<<<<<< HEAD
      <>
          <RankingTopImg />
          <RankingContainer>
              <Title>랭킹</Title>
              <br />
              <Content />
          </RankingContainer>
      </>
  );
}

export default RankingList;
=======
    <>
        <RankingTopImg />
        <RankingContainer>
            <Title>랭킹</Title>
            <br />
            <br />
            <Content />
        </RankingContainer>
    </>
  );
}

export default RankingList;
>>>>>>> b65a97152fb09e6370bd4d82de8cb1ce1e87a4b2
