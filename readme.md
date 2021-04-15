# next 프론트 초기셋팅

## npm i next react react-dom

## pages페이지

### app.tsx (공통설정)

## eslint

### npm i -D eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks babel-eslint eslint-config-airbnb eslint-plugin-jsx-a11y

### .eslintrc

## typescript

### npm i -D typescript @types/node @types/react

## redux

### redux-devtools-extension 크롬 개발자 도구 툴 연동

### redux-thunk 비동기 처리를 여러번 할 수 있게 해준다

## 더미데이터 만들기

### shortid = 임의의 아이디 생성

### faker = 임의의 데이터 생성

# 백엔드 세팅

## express 설치

## DB 세팅, 연결

- mysql2 sequelize sequelize-cli 설치
- npx sequleize init으로 초기화
- npx sequelize db:create으로 데이터베이스 생성

## passport

- 여러가지 로그인 전략을 세울 수 있도록 도와주는 라이브러리
- passport-local은 이메일, 아이디, 비밀번호를 사용해 로그인할 수 있도록 해줌

## multer

- image, video, file 등의 multipart형식의 데이터 처리를 도와줌

### 이미지 업로드 방법

- image, text 등을 한 번에 보내는 방법
- 장점: 한 번에 처리하기때문에 편리할 수 있다
- 단점: 이미지 처리하는데 시간이 오래걸리기때문에 게시글 업로드를 기다리는 시간이 늘어나고 나중에 이미지를 변경하고 싶어도 바꿀 수 없다
- 먼저 image를 보내고 다음에 text를 보내는 방법
- 장점: 사용자가 글을 작성하는 시간에 이미지를 처리하기때문에 게시글 업로드 시간이 줄어든다, 미리 저장된 이미지를 리사이징하고 미리보기 기능을 만들 수 있다
- 단점: 요청을 두 번 보내기때문에 구현하는데 복잡할 수 있다

# next 서버사이드렌더링

- csr은 프론트 서버에서 데이터가 없는 파일들을 먼저 브라우저로 보내주고 그 다음 브라우저에서 백엔드 서버로 요청을 보내면 백엔드에서 데이터들을 브라우저로 보내준다 - - 장점으로는 브라우저에 페이지를 띄우는 시간을 단축시킬 수 있다
- 단점으로는 csr(spa)방식을 이해하지 못하는 검색엔진에서는 seo최적화를 못한다, 새로고침시 요청을 받아오는 타이밍에는 화면이 비워져있기 때문에 부자연스러울 수 있다
- 서버사이드렌더링은 브라우저 => 프론트 => 백엔드 => DB => 백엔드 => 프론트 => 브라우저 순으로 요청을 주고 받는 방식이다. 프론트에서 파일과 데이터를 합쳐 브라우저로 보내준다.
- 장점으로는 seo최적화가 있고 페이지를 완성해 보내주기때문에 이질감이 덜하다
- 단점으로는 순차적으로 요청을 주고 받기때문에 페이지를 띄우는 시간이 csr보다 늦을 수 있다

## next getstaticprops

- staticpaths는 html파일로 만들어놓고 요청이 들어오면 html파일을 보내주기때문에 빠르고 서버에 무리가 덜간다. 데이터가 자주바뀌지 않는 페이지에 적합하다(블로그, 기사 등)

## getstaticprops + getstaticpaths

- getstaticpaths를 사용해 여러 페이지를 html파일로 만들어놓을 수 있다
- 수 많은 페이지를 만들어놓기에는 서버에 부담이간다

# aws사용하기

- ec2 ubuntu server 생성
-
