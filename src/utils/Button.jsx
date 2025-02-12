import { styled } from "styled-components";

// 스타일드 컴포넌트의 우선순위를 높이기 위해 && 사용
const ButtonComp = styled.button`
  && {
    text-align: center;
    width: ${(props) => props.width || "200px"};
    height: ${(props) => props.height || "40px"};
    color: ${(props) => props.color || "white"};
    font-weight: 600;
    font-size: ${(props) => props.fontSize || "1em"};
    border: none;
    border-radius: 5px;
    transition: 0.4s ease-in;
    // 단순화된 배경색 로직: props로 전달된 색상 그대로 사용
    background-color: ${(props) => props.$front};
    // disabled 상태에 따른 커서 스타일
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

// 활성/비활성 버튼 컴포넌트
const Button = ({
  children,
  width,
  height,
  fontSize,
  active = false, // 기본값을 false로 설정하여 초기 상태 처리
  clickEvt,
  $front = "#cccccc", // 기본 배경색을 회색으로 설정
  $back, // hover 효과 제거로 사용하지 않음
  color,
}) => {
  return (
    <ButtonComp
      color={color}
      $front={$front}
      width={width}
      height={height}
      fontSize={fontSize}
      disabled={!active} // active prop으로 disabled 상태 제어
      onClick={(e) => {
        if (active && clickEvt) {
          // active이고 clickEvt가 있을 때만 실행
          e.stopPropagation();
          clickEvt();
        }
      }}>
      {children}
    </ButtonComp>
  );
};

export default Button;
