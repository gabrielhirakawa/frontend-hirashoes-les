import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    

    h1{
        margin: 30px 0;
    }

    table{
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        color: #1b262c;

        th, td{
            padding: 10px;
        }

        td{
            svg{
                cursor: pointer;
                &:hover{
                    color: #c1c1c1 !important;
                
                }
            }
        }
    }
    
`;

