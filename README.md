## 💙 기술 면접을 더 자신있게, QCARD

본 서비스는 모의 면접 기능과 질문 모음집을 통해 IT 기술 면접을 준비할 수 있는 서비스입니다.
<p align="center">
<img width="526" alt="image" src="https://github.com/Q-CARD/QCard-client/assets/71035113/a9cd158c-dfa3-414e-9d83-7568c6aea40e">
</p>


[QCard 바로가기](https://qcard.co.kr/)

---

### 🌟 기능 소개

#### 1. 모의 면접

-   모의 면접 답변을 녹음해서 제출하면, Chat GPT의 첨삭과 꼬리 질문을 받아볼 수 있어요
-   실제 면접과 유사한 환경에서 답변을 녹음하고 모의 면접을 연습해봐요

#### 2. 질문 모음집

-   카테고리별 질문 모음집으로 흩어져 있는 면접 질문들을 모아보고, 내가 쓴 답변들을 통합적으로 관리할 수 있어요
-   미래의 동료들이 작성한 답변을 공감 순으로 확인할 수 있어요
-   원하는 질문이 없다면, 커스텀 질문을 작성해 나만의 면접 질문을 생성할 수 있어요

#### 3. 마이페이지

-   내가 쓴 질문과 답변들을 한눈에 모아보고 관리할 수 있어요



<br>


### 🛠 개발 환경 및 라이브러리

[![next.js](https://img.shields.io/badge/Next.js-13.4-black?logo=Next.js)]() [![react-query](https://img.shields.io/badge/React--query-4.33.0-orange?logo=Reactquery)]() [![recoil](https://img.shields.io/badge/Recoil-0.7.7-blue?logo=recoil)]() [![wretch](https://img.shields.io/badge/Wretch-2.7.0-yellow?logo=wretch)]() [![Typescript](https://img.shields.io/badge/Typescript-5.2.2-lightblue?logo=typescript)]() [![react-markdown](https://img.shields.io/badge/React--markdown-8.0.7-red?logo=react--markdown)]() [![tailwindCSS](https://img.shields.io/badge/Tailwindcss-3.3.3-mint?logo=tailwindcss)]()


<br>

### 📱 서비스 화면

#### 1. 메인화면
<img width="400" alt="메인 화면" src="https://github.com/Q-CARD/QCard-client/assets/71035113/a9cd158c-dfa3-414e-9d83-7568c6aea40e">

- **메인 화면**: 헤더의 메뉴를 클릭하거나 하단으로 스크롤해서 모의면접, 질문 모음집 화면으로 진입할 수 있습니다.
- 로그인을 하지 않은 경우, 로그인 화면으로 이동합니다.

<br>

#### 2. 로그인 및 회원가입 화면
<img width="400" alt="로그인" src="https://github.com/Q-CARD/QCard-client/assets/71035113/0fdb098f-89b7-49dd-a83e-293907a23111"> <img width="400" alt="회원가입" src="https://github.com/Q-CARD/QCard-client/assets/71035113/460ec27c-38de-4444-b75c-11a40f40a64a">
- 로그인 및 회원가입을 통해 서비스를 이용할 수 있습니다.

<br>

#### 3. 모의면접 화면
<img width="350" alt="인터뷰 시작" src="https://github.com/Q-CARD/QCard-client/assets/71035113/44068ac2-b661-4829-bf13-1d8b49ba293d"> <img width="400" alt="인터뷰 질문" src="https://github.com/Q-CARD/QCard-client/assets/71035113/6cf5e132-6f8a-448a-a428-0d4d1db38084">
- **모의 면접 시작**: 인터뷰를 원하는 카테고리를 최대 3개 선택할 수 있습니다.
- **모의 면접 질문**: 각 모의면접 당 10개의 질문을 받으며, 음성 녹음으로 답변을 제출하면 모의 면접 결과 화면으로 이동합니다.

<br>

 <img width="400" alt="gpt 첨삭 확인" src="https://github.com/Q-CARD/QCard-client/assets/71035113/9cb276bc-7a0a-4adf-800a-f0ad81935643"> <img width="400" alt="꼬리질문" src="https://github.com/Q-CARD/QCard-client/assets/71035113/e8ac8cad-31d6-4063-933b-8d1b344d1dd2">

- **모의 면접 결과**: 음성 답변을 텍스트로 변환한 결과와 GPT 첨삭을 확인할 수 있습니다.
- **꼬리질문**: 각 질문에 대해 3개의 꼬리질문을 받아볼 수 있으며, 제출한 꼬리질문 답변은 [마이페이지] - [내가 쓴 답변]에서 한눈에 모아볼 수 있습니다. 답변 3개를 모두 제출하면 기존 모의면접 결과 화면으로 이동합니다.

<br>

#### 4. 질문 모음집 화면

<img width="400" alt="image" src="https://github.com/Q-CARD/QCard-client/assets/71035113/7603694a-f2fe-48e2-9a22-aeaea8f0c7b1">
 <img width="300" alt="Screenshot 2023-10-16 at 10 00 05 PM" src="https://github.com/Q-CARD/QCard-client/assets/71035113/b7016316-95d2-49dd-8e34-a3e68828e307"> <img width="300" alt="Screenshot 2023-10-16 at 10 00 11 PM" src="https://github.com/Q-CARD/QCard-client/assets/71035113/d2925f30-b4aa-4392-b140-2dcf8693a8d9">

- **큐카드 둘러보기**: 미래의 동료가 작성한 큐카드를 살펴볼 수 있습니다.
- **카테고리별 질문 모음집**: 카테고리 선택 후, 질문에 답변을 작성하면 [마이페이지] - [내가 쓴 답변]에서 모아볼 수 있습니다.

<br>

#### 5. 마이페이지 화면
<img width="400" alt="마이페이지-프로필 수정" src="https://github.com/Q-CARD/QCard-client/assets/71035113/0981c49b-05c9-43e1-baba-9068d3161c6a"> <img width="400" alt="마이페이지 -나의 답변" src="https://github.com/Q-CARD/QCard-client/assets/71035113/6036a7e8-e301-4d01-972f-e01a3ff58670">

- **프로필 수정**: 프로필 사진과 닉네임, 비밀번호를 수정할 수 있습니다.
- **내가 쓴 답변**: 질문 모음집과 모의 면접에서 내가 작성한 답변을 모아볼 수 있습니다. 
- **내가 쓴 질문**: 내가 작성한 커스텀 질문들을 모아볼 수 있습니다.

<br>


### 🏡 디렉토리

    ├─app
    │   ├─ auth
    │   ├─ category
    │   ├─ interview
    │   ├─ mypage
    │   └─ page.tsx
    │
    ├─api
    │   ├─ interview
    │   ├─ account 
    │   ├─ answer
    │   └─ questions
    │ 
    ├─assets
    │   ├─ icons
    │   └─ images
    │
    ├─components
    │   ├─ common
    │   ├─ card
    │   ├─ interview
    │   ├─ mypage
    │   └─ adapter
    │
    ├─constants
    │   ├─ common.tsx
    │   ├─ data.tsx
    │   ├─ index.tsx
    │   ├─ errorCodes.tsx
    │   └─ regex.tsx
    ├─utils
    │   ├─ fetch.tsx
    │   ├─ getQueryClient.tsx
    │   ├─ site.tsx
    │   ├─ utils.tsx
    │   └─ routeByUserAnswered.tsx
    ├─hooks
    │
    ├─store
    │   └─ recoil.tsx
    │
    ├─styles
    │
    └─types
  


<br>

---

### 🍏 Contributors

| <img src = "https://user-images.githubusercontent.com/67725652/161052307-b7b10483-5645-4a00-8577-df87eaf6d99c.png" width="170"/> | <img src = "https://github.com/Q-CARD/QCard-client/assets/71035113/432f14be-6cf7-4bd4-abe1-818f8b8cb444" width="170"/> | 
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | 
| [장효신](https://github.com/hyosin-Jang) | [권가은](https://github.com/Gaeun-Kwon)                                  | 

<br>
