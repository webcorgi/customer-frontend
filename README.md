# 🎨 고객 관리 시스템 - 프론트엔드

> **이 프로젝트는 프론트엔드와 백엔드로 구성된 완전한 고객 관리 시스템의 프론트엔드 부분입니다.**

## 📋 프로젝트 개요

**고객 관리 시스템**은 중소기업이나 개인사업자가 고객 정보를 체계적으로 관리할 수 있도록 도와주는 웹 애플리케이션입니다.

### 🔗 연관 저장소
- **🎨 프론트엔드**: [customer-frontend](https://github.com/your-username/customer-frontend) - 현재 저장소 (사용자 인터페이스)
- **⚡ 백엔드**: [customer-backend](https://github.com/your-username/customer-backend) - 데이터 처리 및 API 제공

### 🎯 프론트엔드의 역할
이 프론트엔드 웹 애플리케이션은 다음과 같은 역할을 담당합니다:
- 🖥️ **사용자 인터페이스**: 직관적이고 사용하기 쉬운 웹 화면 제공
- 📱 **반응형 디자인**: 데스크톱, 태블릿, 모바일 모든 기기에서 완벽 동작
- 🎨 **시각적 표현**: 고객 데이터를 보기 좋게 표시하고 관리
- 🔄 **실시간 업데이트**: 백엔드 API와 통신하여 실시간 데이터 동기화

## ✨ 주요 기능

### 👥 **고객 관리**
- ➕ **고객 등록**: 새로운 고객 정보 입력 및 저장
- 📋 **고객 목록**: 등록된 모든 고객을 한눈에 확인
- ✏️ **정보 수정**: 기존 고객 정보 업데이트
- 🗑️ **고객 삭제**: 더 이상 필요없는 고객 정보 제거

### 🔍 **사용자 경험**
- 🚀 **빠른 로딩**: Next.js 최적화로 빠른 페이지 로딩
- 💬 **알림 시스템**: 작업 완료/오류 시 토스트 알림
- ⚡ **실시간 상태**: 시스템 상태 실시간 모니터링
- 📱 **모바일 친화적**: 모든 디바이스에서 완벽한 사용 경험

## 🛠️ 기술 스택

### **메인 프레임워크**
- **Next.js 15** - React 기반의 풀스택 웹 프레임워크
- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성을 보장하는 JavaScript

### **스타일링**
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Lucide React** - 아름다운 아이콘 라이브러리
- **Google Fonts** - 웹 폰트 (Geist)

### **상태 관리**
- **React Hooks** - useState, useEffect를 활용한 상태 관리
- **Custom Hooks** - 재사용 가능한 로직 분리

### **배포**
- **Vercel** - Next.js 최적화된 무료 호스팅 플랫폼

## 🚀 시작하기

### 1️⃣ 환경 설정

```bash
# 1. 저장소 복제
git clone https://github.com/your-username/customer-frontend.git
cd customer-frontend

# 2. 의존성 설치
npm install

# 3. 환경변수 파일 생성 (선택사항)
# .env.local 파일을 생성하고 백엔드 API URL을 설정할 수 있습니다
```

### 2️⃣ 환경변수 설정 (선택사항)

`.env.local` 파일을 프로젝트 루트에 생성하여 백엔드 API URL을 설정할 수 있습니다:

```bash
# 백엔드 API URL (선택사항)
NEXT_PUBLIC_API_URL=https://your-backend.koyeb.app

# 애플리케이션 URL (배포 시)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**📌 참고**: 환경변수를 설정하지 않으면 개발 모드에서는 `http://localhost:3001`로 백엔드에 연결됩니다.

### 3️⃣ 개발 서버 실행

```bash
# 개발 모드 (파일 변경 시 자동 새로고침)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

**✅ 서버가 성공적으로 시작되면:**
- 🌐 웹 애플리케이션: http://localhost:3000

### 4️⃣ 백엔드 연결

이 프론트엔드가 정상 동작하려면 **백엔드 API 서버**가 실행되어야 합니다:

1. [customer-backend](https://github.com/your-username/customer-backend) 저장소 확인
2. 백엔드 서버 실행 (http://localhost:3001)
3. 또는 배포된 백엔드 API 사용

## 📱 화면 구성

### 🏠 **메인 화면**
- **고객 등록 폼**: 새로운 고객 정보 입력
- **고객 목록 테이블**: 등록된 고객들을 표로 표시
- **시스템 상태**: 백엔드 서버 연결 상태 확인

### 📝 **고객 등록 폼**
- ✅ **이름**: 필수 입력 (최대 100자)
- ✅ **이메일**: 필수 입력 (유효한 이메일 형식)
- 📞 **전화번호**: 선택 입력 (최대 20자)
- 🎨 **실시간 검증**: 입력 중 즉시 오류 표시

### 📊 **고객 목록**
- 👁️ **전체 조회**: 모든 고객 정보 표시
- ✏️ **수정 기능**: 클릭으로 간편한 정보 수정
- 🗑️ **삭제 기능**: 확인 모달과 함께 안전한 삭제
- 📅 **정렬**: 최신 등록순으로 자동 정렬

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 앱 레이아웃
│   └── page.tsx                # 메인 페이지
├── components/
│   ├── CustomerForm.tsx        # 고객 등록/수정 폼
│   ├── CustomerList.tsx        # 고객 목록 테이블
│   ├── SystemStatus.tsx        # 시스템 상태 표시
│   ├── Toast.tsx              # 알림 메시지
│   └── ToastContainer.tsx     # 알림 컨테이너
├── lib/
│   ├── api.ts                 # 백엔드 API 통신
│   └── supabase.ts           # Supabase 클라이언트 (사용하지 않음)
└── types/
    └── customer.ts           # TypeScript 타입 정의
```

## 🌐 백엔드와의 연동

이 프론트엔드는 **NestJS 백엔드 API**와 다음과 같이 통신합니다:

### 📡 **API 호출 흐름**
1. **사용자 액션** (고객 등록, 수정, 삭제) 
2. **프론트엔드에서 API 요청** → NestJS 백엔드
3. **백엔드에서 데이터 처리** → Supabase 데이터베이스
4. **응답 데이터** → 프론트엔드 화면 업데이트

### 🔌 **사용하는 API 엔드포인트**
```typescript
// 고객 관리
GET    /api/customers       // 고객 목록 조회
POST   /api/customers       // 새 고객 등록
GET    /api/customers/:id   // 특정 고객 조회
PATCH  /api/customers/:id   // 고객 정보 수정
DELETE /api/customers/:id   // 고객 삭제

// 시스템 상태
GET    /api/health          // 백엔드 서버 상태 확인
```

**🔗 백엔드 저장소**: [customer-backend](https://github.com/your-username/customer-backend)

## 🎨 디자인 시스템

### **색상 팔레트**
- 🔵 **파란색 계열**: 고객 등록 영역 (신뢰감)
- 🟢 **초록색 계열**: 고객 목록 영역 (안정감)
- 🔴 **빨간색**: 삭제 버튼 (주의)
- ⚪ **회색 계열**: 배경 및 보조 요소

### **반응형 디자인**
- 📱 **모바일** (320px~768px): 세로 배치, 터치 최적화
- 💻 **태블릿** (768px~1024px): 적응형 레이아웃
- 🖥️ **데스크톱** (1024px+): 가로 배치, 넓은 화면 활용

## 🚢 배포 (Vercel)

### 라이브 URL
- **웹 애플리케이션**: https://your-app.vercel.app

### 배포 방법
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 환경변수 설정 (선택사항)
   - `NEXT_PUBLIC_API_URL`: 백엔드 API URL
5. 자동 배포 완료!

### 자동 배포
- GitHub에 Push할 때마다 자동으로 배포됩니다
- 프리뷰 URL로 변경사항을 미리 확인할 수 있습니다

## 🔧 개발 도구

### 코드 품질
```bash
npm run lint        # ESLint 검사
npm run type-check  # TypeScript 타입 검사
```

### 최적화
```bash
npm run analyze     # 번들 사이즈 분석
npm run build       # 프로덕션 빌드
```

## 🎯 주요 컴포넌트 설명

### **CustomerForm.tsx**
```typescript
// 고객 등록/수정을 위한 폼 컴포넌트
- 실시간 유효성 검사
- 에러 메시지 표시
- 로딩 상태 관리
```

### **CustomerList.tsx**
```typescript
// 고객 목록을 표시하는 테이블 컴포넌트
- 데이터 로딩 및 표시
- 수정/삭제 기능
- 확인 모달
```

### **SystemStatus.tsx**
```typescript
// 백엔드 서버 상태를 실시간으로 확인
- API 연결 상태 표시
- 자동 상태 체크
```

## 🤝 기여하기

1. 이 저장소를 Fork 하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋하세요 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push 하세요 (`git push origin feature/새기능`)
5. Pull Request를 생성하세요

## 📞 문의사항

- **이슈 리포트**: GitHub Issues 탭 활용
- **백엔드 관련**: [customer-backend](https://github.com/your-username/customer-backend) 저장소

## 📄 라이센스

MIT License - 자유롭게 사용하세요!

---

## 🎯 전체 시스템 아키텍처

```
[사용자] → [Next.js 프론트엔드] → [NestJS 백엔드] → [Supabase DB]
          (Vercel 배포)         (Koyeb 배포)      (클라우드)
```

**이 저장소는 위 아키텍처에서 "Next.js 프론트엔드" 부분을 담당합니다.**

## 🔍 사용법 가이드

### 1️⃣ 고객 등록하기
1. 메인 화면의 "새 고객 등록" 폼 찾기
2. 이름과 이메일 입력 (필수)
3. 전화번호 입력 (선택사항)
4. "고객 등록" 버튼 클릭
5. 성공 알림 확인 후 목록에서 확인

### 2️⃣ 고객 정보 수정하기
1. 고객 목록에서 수정하려는 고객의 "수정" 버튼 클릭
2. 폼에 기존 정보가 자동으로 채워짐
3. 원하는 정보 수정
4. "수정 완료" 버튼 클릭
5. 변경된 정보 확인

### 3️⃣ 고객 삭제하기
1. 고객 목록에서 삭제하려는 고객의 "삭제" 버튼 클릭
2. 확인 모달에서 "삭제" 버튼 다시 클릭
3. 목록에서 해당 고객이 제거됨을 확인

**🔔 모든 작업 후에는 성공/실패 알림이 화면 우상단에 표시됩니다!**
