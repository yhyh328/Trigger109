import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RankingRow, fetchRankingRows } from '../../api/ranking';

const RankingTopImg = styled.section`
  height: 80vh;
  background-image: url('/game_map_imgs/8.JPG');
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
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

const Loading = styled.div`
  text-align: center;
`;

const RankingList: React.FC = () => {
    const [ranking, setRanking] = useState<RankingRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                const rankingData = await fetchRankingRows();
                console.log('rankingData: ', rankingData)
                if (Array.isArray(rankingData)) {
                    setRanking(rankingData);
                } else {
                    console.error('Expected an array of ranking rows, received:', rankingData);
                    setError('Received malformed data');
                }

            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to load data.');
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // if (error) {
    //     return <ErrorMessage>{error}</ErrorMessage>;
    // }

    // if (loading) {
    //     return <Loading>Loading...</Loading>;
    // }

    return (
        <>
        <RankingTopImg />
            <RankingContainer>
                <Title>랭킹</Title>
                <br></br>
                <TableStyled>
                    <tbody>
                        {ranking.map((row, index) => (
                            <Row key={index}>
                                <Cell>{row.member}</Cell>
                                <Cell>{row.isWin ? 'Win' : 'Loss'}</Cell>
                                <Cell>{row.killCnt}</Cell>
                                <Cell>{row.death}</Cell>
                                <Cell>{row.createdAt}</Cell>
                                <Cell>{row.rating}</Cell>
                            </Row>
                        ))}
                    </tbody>
                </TableStyled>
            </RankingContainer>
        </>
    );
}

export default RankingList;
