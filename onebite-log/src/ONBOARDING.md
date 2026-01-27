# Onebite Log - 개발자 온보딩 가이드

Onebite Log 프로젝트에 오신 것을 환영합니다! 이 문서는 프로젝트 구조, 기술 스택, 코딩 컨벤션을 이해하여 빠르게 기여할 수 있도록 돕기 위해 작성되었습니다.

## 🛠 기술 스택

이 프로젝트는 최신 React 생태계로 구축되었습니다:

-   **프레임워크**: [React](https://react.dev/) (TypeScript 포함)
-   **빌드 도구**: [Vite](https://vitejs.dev/)
-   **라우팅**: [React Router](https://reactrouter.com/)
-   **상태 관리**:
    -   **클라이언트 상태**: [Zustand](https://zustand-demo.pmnd.rs/)
    -   **서버 상태**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **스타일링**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **백엔드 / 데이터베이스**: [Supabase](https://supabase.com/)
-   **UI 컴포넌트**: 커스텀 컴포넌트 및 토스트 알림을 위한 `sonner`.

## 📂 프로젝트 구조

소스 코드는 `src` 디렉토리에 위치합니다:

```text
src/
├── api/            # API 요청 함수
├── assets/         # 정적 자산 (이미지, 폰트)
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── layout/     # 레이아웃 컴포넌트 (Global, Guest, Member)
│   └── ...
├── hooks/          # 커스텀 React 훅
├── lib/            # 유틸리티 및 라이브러리 설정 (예: supabase.ts)
├── pages/          # 페이지 컴포넌트 (라우트와 매핑됨)
├── provider/       # React Context 프로바이더
├── store/          # 전역 상태 스토어 (Zustand)
├── App.tsx         # 메인 애플리케이션 컴포넌트
├── main.tsx        # 진입점 (Entry point)
├── root-route.tsx  # 라우팅 설정
└── index.css       # 전역 스타일 및 Tailwind 설정
```

## 📏 코딩 컨벤션

### 파일 및 디렉토리 명명 규칙
-   **파일**: 모든 파일에 **kebab-case**를 사용합니다 (예: `sign-in-page.tsx`, `alert-modal.ts`).
-   **디렉토리**: **kebab-case**를 사용합니다 (예: `components`, `post-editor`).

### 컴포넌트 구조
-   컴포넌트는 함수형 컴포넌트여야 합니다.
-   페이지별 로직은 `pages/`에, 재사용 가능한 UI는 `components/`에 배치합니다.
-   Named export 또는 default export를 일관되게 사용합니다 (현재 혼용 중, 디렉토리별로 일관성 유지 권장).

### 상태 관리
-   **서버 데이터**: 서버 데이터의 페칭, 캐싱, 업데이트에는 항상 **TanStack Query**를 사용합니다. 꼭 필요한 경우가 아니면 전역 클라이언트 상태에 서버 데이터를 저장하지 마십시오.
-   **클라이언트 데이터**: 전역 클라이언트 상태(예: 세션, 모달 표시 여부)에는 **Zustand**를 사용합니다.
    -   스토어는 `store/`에 위치합니다.
    -   `devtools` 미들웨어와 함께 `create` 함수를 사용합니다.

### 스타일링
-   스타일링에는 **Tailwind CSS** 유틸리티 클래스를 사용합니다.
-   전역 테마나 유틸리티로 처리할 수 없는 복잡한 애니메이션이 아닌 이상 `index.css`에 커스텀 CSS를 작성하지 마십시오.
-   Tailwind v4가 사용되므로, 설정은 주로 `index.css`의 CSS 변수를 통해 처리됩니다.

### 라우팅
-   라우트는 `root-route.tsx`에 정의됩니다.
-   리다이렉트에는 `Navigate`를 사용합니다.
-   인증 가드를 처리하기 위해 라우트를 레이아웃(예: `GuestOnlyLayout`, `MemberOnlyLayout`)으로 감쌉니다.

## 🚀 시작하기

1.  **의존성 설치**:
    ```bash
    npm install
    ```

2.  **환경 설정**:
    -   Supabase에 필요한 환경 변수(예: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`)가 있는지 확인하십시오.

3.  **개발 서버 실행**:
    ```bash
    npm run dev
    ```

4.  **프로덕션 빌드**:
    ```bash
    npm run build
    ```

---
*즐거운 코딩 되세요!*
