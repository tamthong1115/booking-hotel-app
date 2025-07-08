import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postNewContactUs } from "../../services/api/api-client.ts";
import { useToast } from "../../app/context/ToastContext.tsx";

const InputSideWrapper = styled.form`
    height: auto;
    padding-bottom: 100px;
    position: relative;
    padding: 10px 10px 100px 10px;
`;

const InputWrapper = styled.div`
    border: 2px solid transparent;
    width: 90%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    color: #333;
    width: 100%;
    font-size: 15px;
    padding: 8px;
    border-bottom: 1px solid rgb(100, 21, 173);
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
    outline: 0px transparent !important;
`;

const MessageInput = styled.textarea`
    width: 100%;
    color: #333;
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid rgb(100, 21, 173);
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
    outline: 0px transparent !important;
`;

const SubMitButton = styled.input`
    position: absolute;
    bottom: 20px;
    right: 20px;
    //padding: 10px;
    background-color: rgb(8, 8, 63);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px 25px 12px 24px;
    cursor: pointer;
`;

const LoadingButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    //padding: 10px;
    background-color: rgb(8, 8, 63);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px 25px 12px 24px;
    cursor: pointer;
`;

const InputSide = () => {
    const { showToast } = useToast();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [buttonLoading, setButtonLoading] = React.useState(false);

    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setButtonLoading(true);

        try {
            await postNewContactUs({ name, phone, email, message });
            showToast({ message: "Message sent successfully", type: "SUCCESS" });
            navigate("/contact-us");
        } catch (error) {
            console.log(error);
            showToast({ message: "Message not sent", type: "ERROR" });
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <InputSideWrapper onSubmit={handleSubmit}>
            <InputWrapper>
                <p>Name</p>
                <Input type="text" required placeholder="BookingTs" value={name} onChange={nameHandler} />
            </InputWrapper>
            <InputWrapper>
                <p>Email</p>
                <Input
                    type="email"
                    placeholder="bookingts83@gmail.com"
                    value={email}
                    onChange={emailHandler}
                    required
                />
            </InputWrapper>
            <InputWrapper>
                <p>Phone</p>
                <Input type="tel" required placeholder="+84987654321" value={phone} onChange={phoneHandler} />
            </InputWrapper>
            <InputWrapper>
                <p>Message</p>
                <MessageInput required placeholder="Write your message" value={message} onChange={messageHandler} />
            </InputWrapper>
            {buttonLoading ? (
                <LoadingButton>Loading...</LoadingButton>
            ) : (
                <SubMitButton type="submit" value="Send Message" />
            )}
        </InputSideWrapper>
    );
};

export default InputSide;
