import { X } from 'lucide-react';
import styled from 'styled-components';

const Btn = styled.button`
    border: none;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const AddBtn = styled(Btn)`
    width: 80px;
    height: 30px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.accentColor};
    font-size: 14px;
    font-weight: 500;
    margin-right: 3px;
`;

export const CancelBtn = styled(X)`
    width: 30px;
    height: 30px;
    padding: 2px;
    border-radius: 3px;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export const CancelBtnSmall = styled(X)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 15px;
    height: 15px;
    padding: 2px;
    border-radius: 3px;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export const CardDelBtn = styled(Btn)`
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    color: ${(props) => props.theme.accentColor};
    font-size: 10px;
    font-weight: 500;
    position: absolute;
    right: 8px;
    bottom: 8px;
`;

export const AddCardText = styled.div<{boardId:string}>`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    padding: 8px 0 0 5px;
    &:hover {
        cursor: pointer;
    }
`;

export const AddBoardText = styled.div`
    width: 250px;
    height: 35px;
    line-height: 0px;
    color: ${(props) => props.theme.accentColor};
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    padding: 20px;
    margin: 15px;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.2);
    }
`;