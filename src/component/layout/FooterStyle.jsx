import { styled } from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  width: 100%;
  padding: 40px 0;
  flex-direction: column;

  .inner-container {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;

const FooterLeftContainer = styled.footer`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
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
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  width: 50%;

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

const FooterBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  .bottom-row {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    position: relative;
    flex-direction: column;

    .bottom-line {
      height: 1px;
      background-color: #999;
    }

    .bottom-row-content {
      display: flex;
      gap: 20px;
      position: relative;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    }

    .links {
      display: flex;
      gap: 10px;
      a {
        color: #999;
        text-decoration: none;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
      .link-divider {
        color: #999;
        font-size: 14px;
      }
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
