import { styled } from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  width: 100%;
  padding: 40px 0;
`;

const FooterLeftContainer = styled.footer`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .customer-service {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }

  .phone-number {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    span {
      font-size: 14px;
      color: #999;
      margin-left: 5px;
    }
  }

  .email {
    font-size: 14px;
    color: #999;
  }

  .address {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
  }

  .bottom-row {
    display: flex;
    gap: 20px;
    margin-top: 10px;

    .links {
      display: flex;
      gap: 20px;
      a {
        color: #999;
        text-decoration: none;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const FooterRightContainer = styled.footer`
  position: absolute;
  right: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  .social-icons {
    display: flex;
    gap: 15px;
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .copyright {
    color: #999;
    font-size: 14px;
  }
`;

export { FooterContainer, FooterLeftContainer, FooterRightContainer };
