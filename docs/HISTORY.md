# 🔄 2025/05/31 리팩토링
배포 주소
- https://mr-chu-home-page.vercel.app/

## ✨ 주요 변경 사항 요약
- 기존 프로젝트를 Next.js 프레임워크로 리팩토링
- 호스팅 플랫폼: Netlify → Vercel로 이전
- 합성 컴포넌트 패턴 도입 (특히 모달 구조에서 시도)
- 스타일링 방식: styled-components → SCSS로 점진적 마이그레이션
- 전역 상태 관리: atom → Redux Toolkit 도입

## 🍀 왜 Next.js를 도입했는가?

이전까지 저는 **CSR** 방식으로만 프로젝트를 진행하며, 부족한 SEO를 보완하기 위해 여러 시도를 해왔습니다.

예를 들어, **더미 페이지를 만들어 검색엔진에 노출되도록 유도한 뒤, 실제 콘텐츠 페이지로 리다이렉트**하는 방식으로 우회적인 SEO 최적화를 시도하기도 했습니다.

하지만 시간이 지날수록 프로젝트에 담기는 경험 글과 콘텐츠 양이 늘어났고, 대부분의 글은 **Notion에 작성한 뒤 이를 동적으로 불러오는 구조**로 발전했습니다. 이로 인해 기존의 CSR 방식만으로는 한계가 명확했고, 제 글이 조금 더 검색엔진에 노출 될 수 있게 하는데에 욕구가 커져갔습니다.

이러한 문제를 간단하게 해결하기 위해 선택한 것이 바로 **Next.js**였습니다. Next는 프레임 워크라서 동적 데이터를 정적으로 사전 렌더링(SSG)할 수 있는 기능을 제공하여, 콘텐츠가 검색엔진에 잘 노출되도록 만들 수 있습니다.

이전에는 page router 기반에서 getStaticProps, getStaticPaths를 사용했지만, app router 구조에서는 이를 대신해 `generateStaticParams()` 를 활용하여 정적 페이지를 생성하고 있습니다.

또한, 과거에는 sitemap 생성을 위해 next-sitemap 라이브러리를 사용했지만, 최근에는 Next.js 자체적으로 제공하는 `generateSitemaps()` 기능을 활용할 수 있어 훨씬 간단하게 SEO 설정을 관리할 수 있게 되었습니다.

> 📌 generateSitemaps()는 Next.js 14부터 정식 도입되었으며, app 디렉토리 구조에서 metadata API와 함께 작동해 별도 설정 없이 자동으로 sitemap.xml을 생성해줍니다.
>
## ✅ 합성 컴포넌트 패턴 도입
최근에 알게 된 합성 컴포넌트(Compound Components) 패턴이 구조적으로 깔끔하고 확장성이 높아 보여 모달 컴포넌트에서 시도해봤습니다.

```
ModalStyle.Nav = ModalTopNav;
ModalStyle.Content = ModalContent;

export default ModalStyle;

<ModalProvider>
   <ModalStyle>
      <ModalStyle.Nav>{text}</ModalStyle.Nav>
      {children}
   </ModalStyle>
</ModalProvider>
```

## 🎨 스타일링 & 상태 관리 방식 변경의 이유
이번 리팩토링 과정에서 스타일링 방식과 전역 상태 관리 방식도 최근 트렌드에 맞춰 점진적으로 변경하고 있습니다.

스타일링: styled-components → SCSS

상태 관리: atom 기반 → Redux Toolkit

두 가지 모두 현재는 업계에서 점점 덜 사용되는 추세이기 때문에 변경을 결정하게 되었습니다.

💅 styled-components → SCSS
styled-components는 한때 매우 인기 있었지만, 최근에는 CSS Modules, SCSS, Tailwind CSS 등 더 가볍고 단순한 스타일링 방식들이 주로 사용되고 있습니다. 특히 Next.js에서는 별다른 설정 없이 SCSS를 사용할 수 있어 마이그레이션이 간편했고, 개인적으로도 SCSS가 더 익숙하고 빠르게 작업할 수 있어 전환을 결정했습니다.

🔄 atom → Redux Toolkit
atom을 초기에는 사용 했지만, 해당 라이브러리의 핵심 개발팀이 해체되었고 이번 리팩토링에서는 Redux Toolkit을 한 번 정식으로 다시 써보며 구조적으로 정리하고자 했습니다.



# 2024/01/18 vite 프레임워크로 변경
- Vite 추가

# 2023/11/16 Notion API로 변경

문제 발생 
- 매번 홈페이지를 관리하기에 부담을 느낌
- 노션 데이터 베이스 api 활용하기로함.
- api/get/projectList => api/notion/projectList 변경
- 프론트에서 page id로 노션에 page 블록 데이터를 얻고 그것을 마크다운으로 받아 리액트에서 보여줌

----

# 2023/11/10 백엔드 구축

- Node.js
- koyeb로 배포
- (https://developed-heath-mr-chu.koyeb.app/api-docs/)
- 검색기능 추가
- Swagger UI 추가 2024/03/01

---


# 2023/06/03 넷틀리파이 배포로 변경

- https://mrchu.netlify.app/
- 네이버 사이트맵 추가

---

# 2022/10/20 포트폴리오 타입스크립트로 변경

- 취직후 SEO가 너무 중요하다 생각하여 리액트에 무엇을 더 할지 고민중
- react-snap 추가
- 구글 사이트맵 추가
- robots.txt 추가

---

# 2022/05/28 포트폴리오 홈페이지를 리액트로 변경해보기

- react 활용
- http://chuhongkyu.github.io/Mr_chu_HomePage

---

# 2021/09/25

- html/css/js로만 만든 포트폴리오 홈페이지

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
  - react-router-sitemap
  - react-snap

---

- 관람 법
  - Enter 화면에서 글자, icon 눌러서 접속
  - Folder 순서 드래그 드롭으로 변경 가능
  - 창 축소 해보면서 감상.

---

- SEO 향상법
- react-helmet

---

리액트가 렌더링 되는 경우는 state,props가 변경되었을 떄

- 함수형 컴포넌트는 함수다. 다시 한 번 강조하자면 함수형 컴포넌트는 단지 jsx를 반환하는 함수이다.
- 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수(컴포넌트)를 호출하여서 실행되는 것을 말한다.
- 함수가 실행될 때마다 내부에 선언되어 있던 표현식(변수, 또다른 함수 등)도 매번 다시 선언되어 사용된다.
- 컴포넌트는 자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다 리렌더링 된다.
- 심지어 하위 컴포넌트에 최적화 설정을 해주지 않으면 부모에게서 받는 props가 변경되지 않았더라도 리렌더링 되는게 기본이다.
