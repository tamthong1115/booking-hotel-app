import styled from "styled-components";
import DetailsBar from "../../../components/Contact/DetailsBar.tsx";
import InputSide from "../../../components/Contact/InputSide.tsx";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background-color: whitesmoke;
    padding-bottom: 50px;
    padding-top: 50px;
    gap: 30px;
`;

const PageHeadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const FormContainer = styled.div`
    width: 85%;
    min-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    background-color: #fff;
    padding: 5px;
    border-radius: 5px;
    height: auto;
    min-height: 400px;
    grid-gap: 10px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        width: 90%;
        max-width: 500px;
        min-width: 0px;
        grid-gap: 0px;
    }
`;

const TextOne = styled.b`
    font-size: 30px;
    color: rgb(4, 4, 59);
    text-align: center;
`;

const TextTwo = styled.p`
    color: rgb(4, 4, 34);
    font-size: 15px;
    text-align: center;
`;

const FormPage = () => {
    return (
        <PageWrapper>
            <PageHeadingWrapper>
                <TextOne>Contact US</TextOne>
                <TextTwo>Any Question or remarks? Just write us a message</TextTwo>
            </PageHeadingWrapper>
            <FormContainer>
                <DetailsBar />
                <InputSide />
            </FormContainer>
        </PageWrapper>
    );
};

export default FormPage;
