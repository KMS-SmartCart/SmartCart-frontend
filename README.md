# SmartCart - Frontend

<br><br>
<div align="center">
  <img src="https://github.com/user-attachments/assets/8d7b601b-3f10-4bdd-85ab-f2e08e56193b" width="200" height="200" />
  <h3 align="center">Smart Cart&nbsp;&nbsp;🛒</h3>
  <p align="center">
    온/오프라인 마트 최저가 비교 서비스<br>
    <a href="https://github.com/KMS-SmartCart"><strong>Explore the team »</strong></a>
  </p>
</div>
<br>

<details open>
  <summary><strong>&nbsp;📖&nbsp;목차</strong></summary>

1. &nbsp;&nbsp;[🔍 Introduction](#-introduction)
2. &nbsp;&nbsp;[📹 Demo](#-demo)
4. &nbsp;&nbsp;[💻 Architecture](#-architecture)
5. &nbsp;&nbsp;[💡 Tech Stack](#-tech-stack)
6. &nbsp;&nbsp;[🗂️ Database](#%EF%B8%8F-database)
7. &nbsp;&nbsp;[📗 API](#-api)
8. &nbsp;&nbsp;[🤝 Git Convention](#-git-convention)
9. &nbsp;&nbsp;[📂 Package Convention](#-package-convention)
10. &nbsp;&nbsp;[👨‍👩‍👧‍👧 Team](#-team)
</details>
<br>


## 🔍 Introduction

### Description
물가가 치솟는 요즘, 장보기가 부담스럽진 않으신가요?<br>
오프라인 매장의 "특가" 상품이 정말 최저가인지, 소비자의 의문을 해결하고자 합니다.<br>
스마트카트가 오프라인과 온라인의 가격을 실시간으로 비교해 현명한 소비를 도와드립니다.

### Main Feature
- PWA 지원&nbsp;:&nbsp;&nbsp;웹 내에서 간편하게 앱을 설치할 수 있도록 안내
- 소셜 로그인&nbsp;:&nbsp;&nbsp;Google, Naver, Kakao 계정으로 간편하게 로그인
- 체크리스트&nbsp;:&nbsp;&nbsp;장 볼 항목을 손쉽게 관리
- 스마트 렌즈&nbsp;:&nbsp;&nbsp;오프라인 매장의 가격표 촬영 후, 온라인 최저가와 비교 확인
  - 1단계&nbsp;:&nbsp;&nbsp;ChatGPT Vision API - 촬영한 가격표의 '상품명, 용량, 가격' 추출
  - 2단계&nbsp;:&nbsp;&nbsp;Naver Shopping API - 해당 상품의 온라인 최저가 목록 3곳 제공
  - 3단계&nbsp;:&nbsp;&nbsp;ChatGPT Text API - 최저가 목록의 불필요한 내용을 깔끔히 정리
- 장바구니&nbsp;:&nbsp;&nbsp;원하는 상품을 선택하여 담고, 총 결제 금액 및 절약 금액을 확인
- 내 정보&nbsp;:&nbsp;&nbsp;스마트카트로 아낀 누적 절약 금액 확인
<br>


## 📹 Demo
사진 준비 중...

**PWA 지원**|**소셜 로그인**|**체크리스트**
-----|-----|-----
<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">|<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">|<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">
PWA 웹앱 설치|구글, 네이버, 카카오 계정|장 볼 항목 관리

**스마트 렌즈**|**장바구니**|**내 정보**
-----|-----|-----
<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">|<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">|<img src="https://github.com/user-attachments/assets/991ff17e-b3a8-4ec1-ad9d-dda8f268e679" width="100%">
가격표 촬영 & 최저가 비교|결제 금액 & 절약 금액|프로필 관리 & 누적 절약 금액

<br>


## 💻 Architecture

### System
![smartcart_architecture drawio](https://github.com/user-attachments/assets/92fe928c-42a9-4f15-b213-6ce955db42a9)

### Network
![smartcart_network_architecture drawio](https://github.com/user-attachments/assets/a4faeb21-c58f-477a-86ff-910c570f78ea)

<br>


## 💡 Tech Stack
Frontend|Backend|Security&nbsp;&nbsp;&&nbsp;&nbsp;DB|Deployment|Other|
|:------:|:------:|:------:|:------:|:------:|
|<img src="https://img.shields.io/badge/React-61DBFB?style=flat-square&logo=React&logoColor=white"/></a><br><img src="https://img.shields.io/badge/JavaScript-F7DF1F?style=flat-square&logo=JavaScript&logoColor=white"/></a>|<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/><br><img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white"/><br><img src="https://img.shields.io/badge/ChatGPT API-74AA9C?style=flat-square&logo=OpenAI&logoColor=white"/></a><br><img src="https://img.shields.io/badge/Naver API-03C75A?style=flat-square&logo=Naver&logoColor=white"/></a>|<img src="https://img.shields.io/badge/Spring Security-00A98F?style=flat-square&logo=Spring Security&logoColor=white"/><br><img src="https://img.shields.io/badge/JSON Web Token-9933CC?style=flat-square&logo=JSON Web Tokens&logoColor=white"/><br><img src="https://img.shields.io/badge/OAuth2-3423A6?style=flat-square&logo=Authelia&logoColor=white"/><br><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>|<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon Web Services&logoColor=white"/><br><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/><br><img src="https://img.shields.io/badge/Github Actions-0063DC?style=flat-square&logo=Github Actions&logoColor=white"/>|<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/><br><img src="https://img.shields.io/badge/Swagger-85EA2E?style=flat-square&logo=Swagger&logoColor=black"/>
```
- Frontend : React, JavaScript
- Backend : Spring Boot, Java | Security, JWT, OAuth2 | MySQL
- External API : ChatGPT, Naver Shopping
- Deployment : AWS Amplify, AWS Elastic Beanstalk, Docker, Github Actions
- Documentation : Notion, Swagger
```
<br>


## 🗂️ Database
<img width="750" alt="smartcart_database" src="https://github.com/user-attachments/assets/135b09b6-9af7-4a5d-a656-efb10f652eb8">
<br><br>


## 📗 API
<img width="750" alt="smartcart_swagger_api" src="https://github.com/user-attachments/assets/2e028957-04b5-4b0a-a9a5-bdbb988cc97c">
<br><br>


## 🤝 Git Convention

### Branch
- 반드시 "develop"에서 뻗어나와 develop으로 "merge" 되어야한다.
- `main` : 출시 배포 CI/CD용 branch (미사용)
- `develop` : 개발 배포 CI/CD용 branch
- `feature` : 기능 구현용 branch
- `Issue_종류/#Issue_번호` : branch 생성

### Issue
`✨ Feat`  `🐛 Fix`  `♻️ Refactor`  `✅ Test`<br>
`📁 File`  `📝 Docs`  `🔧 Chore`  `⚙️ Setting`

| 종류             | 내용                                             |
|----------------| ------------------------------------------------ |
| ✨ Feat         | 기능 구현                                          |
| 🐛 Fix         | 버그 수정                                           |
| ♻️ Refactor    | 코드 리팩토링                                         |
| ✅ Test         | 테스트 업무                                        |
| 📁 File        | 파일 이동 또는 삭제, 파일명 변경                         |
| 📝 Docs        | md, yml 등의 문서 작업                               |
| 🔧 Chore       | 이외의 애매하거나 자잘한 수정                            |
| ⚙️ Setting     | 빌드 및 패키지 등 프로젝트 설정                           |

```
< Issue Title >
[Issue_종류] 구현_주요내용
ex-1) [Feat] 로그인 페이지 UI 구현
ex-2) [Feat] 로그인 페이지 기능 구현
ex-3) [Fix] 로그인 연동로직 오류 수정
```

### Commit
```
< Commit Message >
[#Issue_번호] Issue_종류: 구현_내용
ex-1) [#32] Feat: 로그인 안내모달 UI 구현
ex-2) [#33] Feat: 로그인 기능 서버 연동
ex-3) [#34] Fix: 로그인 연동 API Path 수정
```

### Pull Request
- Pull Request만 날리고, 중요 Approve는 reviewer가 한다.
- PR에 대해 최소 1명 이상의 승인이 있어야 Merge가 가능하다.
```
< PR Title >
[#Issue_번호] Issue_종류: 이슈내용
ex) [#32] Feat: 로그인 페이지 UI 구현
```
<br>


## 📂 Package Convention

### Structure
```
├── .github : Issue 및 PR 템플릿
├── public : PWA 구성 파일
└── src
    ├── apis : Axios 인터셉터
    ├── assets : 이미지 파일
    ├── components
    │   ├── Modal : 모달
    │   └── Navigation : 네비바
    ├── pages
    │   ├── Product : 상품 페이지
    │   └── User : 사용자 페이지
    └── utils
```
<details>
  <summary>&nbsp;<strong>Detailed Structure</strong>&nbsp;:&nbsp;Open!</summary>
  <br>

```
├── .github
│   ├── ISSUE_TEMPLATE
│   │   ├── custom.md
│   │   ├── feature.md
│   │   ├── fix.md
│   │   └── refactor.md
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json
├── public
│   ├── carticon128.png
│   ├── carticon192.png
│   ├── carticon512.png
│   ├── favicon.ico
│   ├── index.html
│   ├── linkthumbnail.png
│   ├── manifest.json
│   └── service-worker.js
└── src
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    ├── apis
    │   └── Api.jsx
    ├── assets
    │   └── images
    │       ├── google.png
    │       ├── kakao.png
    │       ├── mainicon.png
    │       ├── naver.png
    │       └── smartcartlogo.png
    ├── components
    │   ├── Modal
    │   │   ├── ConfirmModal.jsx
    │   │   └── DeleteUserModal.jsx
    │   └── Navigation
    │       └── BottomNav.jsx
    ├── pages
    │   ├── Etc
    │   │   ├── CameraPage.jsx
    │   │   ├── CartPage.jsx
    │   │   ├── ItemInfoPage.jsx
    │   │   └── LowestItemPage.jsx
    │   └── User
    │       ├── LoginPage.jsx
    │       ├── MainPage.jsx
    │       └── MyPage.jsx
    └── utils
        └── CheckToken.js
```
</details>
<br>


## 👨‍👩‍👧‍👧 Team
| [사현진](https://github.com/tkguswls1106) | [김희원](https://github.com/Joygarden425) | [목경민](https://github.com/mkm0630) |
| :----------------------------------------: | :----------------------------------------: | :----------------------------------------: |
| <img width = "300" src ="https://github.com/Dev-Race/DevRace-backend/assets/56509933/20a67908-ca87-49ea-aafc-60f306302429"> | <img width = "300" src ="https://github.com/user-attachments/assets/ae4ebddf-5a25-4ff4-9152-dcf15834f984"> | <img width = "300" src ="https://github.com/user-attachments/assets/3d95184b-90cf-4473-8170-7f050444219d"> |
| FullStack Developer,<br>DevOps Engineer | Frontend Developer,<br>Designer | Frontend Developer,<br>Designer |
