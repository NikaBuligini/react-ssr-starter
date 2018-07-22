import { injectGlobal } from 'styled-components';
import '../assets/fonts/RobotoMono-Bold.ttf';
import '../assets/fonts/RobotoMono-Regular.ttf';

injectGlobal`
  @font-face {
    font-family: RobotoBold;
    src: url('/assets/fonts/RobotoMono-Bold.ttf')
  }

  @font-face {
    font-family: RobotoRegular;
    src: url('/assets/fonts/RobotoMono-Regular.ttf')
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  .flex-box {
    display: flex;
  }

  .flex-start {
    display: flex;
    justify-content: flex-start;
  }
  
  .flex-center {
    display: flex;
    justify-content: center;
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
  }
`;
