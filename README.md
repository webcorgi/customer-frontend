# 고객 관리 시스템 - Next.js 프론트엔드

NestJS 백엔드와 통신하는 Next.js + Tailwind CSS 프론트엔드입니다.

## 🏗 아키텍처

```
┌─────────────────┐    HTTP API    ┌─────────────────┐    SQL    ┌─────────────┐
│   Next.js       │  ◄────────────► │   NestJS        │ ◄────────► │  Supabase   │
│   Frontend      │                 │   Backend       │            │  Database   │
│   (Vercel)      │                 │   (Koyeb)       │            │             │
└─────────────────┘                 └─────────────────┘            └─────────────┘
```

**이 저장소는 위 아키텍처에서 "Next.js 프론트엔드" 부분을 담당합니다.**

- https://customer-frontend-one.vercel.app/

## 🚀 Vercel 배포 가이드

### 1. 환경변수 설정
Vercel 대시보드에서 다음 환경변수를 설정해주세요:

```bash
# 백엔드 API URL
NEXT_PUBLIC_API_URL=https://your-backend.koyeb.app
```

### 2. Vercel 배포 설정

**빌드 명령어:** `npm run build`
**시작 명령어:** `npm start`
**Node.js 버전:** 18.x 이상

### 3. Git 저장소 연결
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 연결
3. 환경변수 추가
4. 배포 시작

## 🔧 로컬 개발

### 설치
```bash
npm install
```

### 환경변수 설정
`.env.local` 파일을 루트에 생성:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 실행
```bash
# 개발 모드
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 🛠 주요 기능

- **모던 UI**: Tailwind CSS + Lucide React 아이콘
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **실시간 상태 관리**: React useState/useEffect
- **API 통신**: 백엔드 NestJS API와 RESTful 통신
- **사용자 경험**: 로딩 상태, 토스트 알림, 폼 유효성 검사

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 전역 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── CustomerForm.tsx   # 고객 등록/수정 폼
│   ├── CustomerList.tsx   # 고객 목록 테이블
│   ├── SystemStatus.tsx   # 시스템 상태 모니터링
│   ├── Toast.tsx          # 알림 컴포넌트
│   └── ToastContainer.tsx # 알림 컨테이너
├── lib/                   # 유틸리티 라이브러리
│   └── api.ts             # 백엔드 API 통신
└── types/                 # TypeScript 타입 정의
    └── customer.ts        # 고객 관련 타입
```

## 🔗 백엔드 연동

이 프론트엔드는 별도의 NestJS 백엔드와 통신합니다:
- **백엔드 저장소**: [링크를 여기에 추가]
- **API 문서**: `{BACKEND_URL}/api` (Swagger)
- **헬스체크**: `{BACKEND_URL}/health`

## 🔍 문제 해결

### 배포 오류
1. 환경변수 `NEXT_PUBLIC_API_URL`이 설정되었는지 확인
2. 백엔드 API 서버가 실행 중인지 확인
3. CORS 설정이 올바른지 확인

### 로컬 개발 오류
1. `.env.local` 파일이 있는지 확인
2. 백엔드 서버가 localhost:3001에서 실행 중인지 확인
3. Node.js 버전이 18.x 이상인지 확인
