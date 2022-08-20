# 2021/09/25

- html/css/js로만 만든 포트폴리오 홈페이지

---

# 2022/05/28 포트폴리오 홈페이지를 리액트로 변경해보기

- react 활용
- 작업중(현재 진행)

- http://chuhongkyu.github.io/Mr_chu_HomePage

---

## home 화면

<img style="width: 500px; height: auto;" src="https://github.com/chuhongkyu/Mr_chu_HomePage/blob/main/public/assets/home.png?raw=true" alt="페이지"/>

- 인터랙티브한 강점을 보여주기 위한 포트폴리오.
  지금까지 해온 프로젝트들을 감상하실 수 있습니다.

---

- 화면 구성
  - Enter
  - Home
    - RESUME
    - ABOUT
    - GITHUB
    - PROJECT (프로젝트)
    - OTHERS

---

- 라이브러리
  - Recoil
  - bnd
  - style-components
  - framer-motion
  - react-tooltip
  - react-icons

---

- 관람 법
  - Enter 화면에서 글자, icon 눌러서 접속
  - Folder 순서 드래그 드롭으로 변경 가능
  - 창 축소 해보면서 감상.

---

- SEO 향상법
- react-helmet

---

- 함수형 컴포넌트는 함수다. 다시 한 번 강조하자면 함수형 컴포넌트는 단지 jsx를 반환하는 함수이다.
- 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수(컴포넌트)를 호출하여서 실행되는 것을 말한다.
- 함수가 실행될 때마다 내부에 선언되어 있던 표현식(변수, 또다른 함수 등)도 매번 다시 선언되어 사용된다.
- 컴포넌트는 자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다 리렌더링 된다.
- 심지어 하위 컴포넌트에 최적화 설정을 해주지 않으면 부모에게서 받는 props가 변경되지 않았더라도 리렌더링 되는게 기본이다.
