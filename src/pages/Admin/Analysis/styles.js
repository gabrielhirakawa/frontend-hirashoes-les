import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
 
    padding-bottom: 30px;
    
    canvas{
        width: 980px !important; 
        height: 500px !important;
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
    }
`;
