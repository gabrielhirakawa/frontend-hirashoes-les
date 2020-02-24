import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1b262c;
    height: 80vh;

    input{
        margin: 20px 0px;
        padding: 10px;
        border: none;
        border-radius: 4px;
    }

    table{
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        color: #1b262c;

        th, td{
            padding: 10px;
        }
    }
`;
