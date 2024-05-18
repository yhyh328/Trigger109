import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RankingRow, fetchRankingRows } from '../../api/ranking';
import { fetchMembers } from '../../api/getuser';

// Styled components
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

// Type definitions
interface Member {
  id: number;
  nickname: string;
}

// RankingList component
const RankingList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [ranking, setRanking] = useState<RankingRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const membersData = await fetchMembers(); // Adjusted for single user fetch
                console.log('membersData: ', membersData)
                setMembers(membersData); // Wrap single user data in an array if not empty
                
                const rankingData = await fetchRankingRows();
                setRanking(Array.isArray(rankingData) ? rankingData : []);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
                setError(error.message || 'Failed to load data.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (loading) {
        return <Loading>Loading...</Loading>;
    }

    return (
        <>
            <RankingTopImg />
            <RankingContainer>
                <Title>랭킹</Title>
                <TableStyled>
                    <tbody>
                        {ranking.map((row, index) => (
                            <Row key={index}>
                                <Cell>{row.member?.toString() || 'N/A'}</Cell> // Check for undefined before calling toString()
                                <Cell>{typeof row.isWin === 'boolean' ? (row.isWin ? 'Win' : 'Loss') : 'N/A'}</Cell>
                                <Cell>{row.killCnt || '0'}</Cell>
                                <Cell>{row.death || '0'}</Cell>
                                <Cell>{row.createdAt || 'Unknown'}</Cell>
                                <Cell>{row.rating || '0'}</Cell>
                            </Row>
                        ))}
                    </tbody>
                </TableStyled>
            </RankingContainer>
        </>
    );
}

export default RankingList;
