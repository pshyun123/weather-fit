import { styled } from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #333333;
  width: 100%;
  padding: 40px 0;
  flex-direction: column;

  .container {
    display: flex;
    justify-content: space-between;
  }
`;

const FooterLeftContainer = styled.footer`
  width: 50%;

  .footer-content {
    line-height: 1.6;
    gap: 15px;
    margin-bottom: 40px;
  }

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
`;

const FooterRightContainer = styled.footer`
  .social-icons {
    display: flex;
    gap: 15px;
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

const FooterBottomContainer = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .bottom-line {
      width: 100%;
      border-bottom: 1px solid #777777;
    }
    .bottom-row-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .links {
      color: #999;
      display: flex;
      gap: 10px;
      font-size: 14px;
    }
    .copyright {
      color: #999;
      font-size: 14px;
    }
  }
`;

export {
  FooterContainer,
  FooterLeftContainer,
  FooterRightContainer,
  FooterBottomContainer,
};
