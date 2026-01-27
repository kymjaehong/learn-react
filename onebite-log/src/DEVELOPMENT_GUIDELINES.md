# 개발 가이드라인

이 문서는 Onebite Log 프로젝트의 모든 개발 활동에 대한 **공식 가이드** 역할을 합니다. 일관성, 유지보수성, 고품질 코드를 보장하기 위해 인간 개발자와 AI 어시스턴트 모두를 대상으로 합니다.

**AI 어시스턴트는 변경 사항을 제안하거나 구현하기 전에 반드시 이 가이드라인을 읽고 따라야 합니다.**

---

## 1. 기술 스택 및 버전

다음 기술을 엄격히 준수하십시오. 사용자 승인 없이 새로운 라이브러리를 도입하지 마십시오.

-   **프레임워크**: React 18+ (함수형 컴포넌트만 사용)
-   **언어**: TypeScript (Strict 모드)
-   **빌드 도구**: Vite
-   **스타일링**: Tailwind CSS v4
-   **라우팅**: React Router v6+
-   **상태 관리**:
    -   **서버 상태**: TanStack Query (React Query) v5+
    -   **클라이언트 전역 상태**: Zustand
-   **백엔드**: Supabase (Auth, DB, Realtime)
-   **아이콘**: Lucide React (선호) 또는 Phosphor Icons
-   **토스트**: Sonner

---

## 2. 프로젝트 구조 및 명명 규칙

### 2.1 디렉토리 구조
-   `src/pages`: 라우트와 직접 매핑되는 페이지 컴포넌트.
-   `src/components`: 재사용 가능한 UI 컴포넌트.
-   `src/components/layout`: 레이아웃 래퍼 (예: `GlobalLayout`, `AuthLayout`).
-   `src/hooks`: 커스텀 React 훅 (`use` 접두사 사용).
-   `src/store`: 전역 클라이언트 상태 스토어 (Zustand).
-   `src/lib`: 유틸리티 함수, 라이브러리 설정 (Supabase 클라이언트, `cn` 유틸리티).
-   `src/api`: API 요청 함수 (훅에서 직접 Supabase 쿼리를 사용하지 않는 경우).

### 2.2 명명 규칙
-   **파일 및 디렉토리**: `kebab-case` (예: `user-profile.tsx`, `auth-provider.tsx`).
-   **컴포넌트**: `PascalCase` (예: `UserProfile`, `AuthProvider`).
-   **함수 및 변수**: `camelCase` (예: `getUser`, `isLoading`).
-   **타입 및 인터페이스**: `PascalCase` (예: `User`, `AuthResponse`).
-   **상수**: `UPPER_SNAKE_CASE` (예: `MAX_RETRY_COUNT`).

---

## 3. 코딩 표준

### 3.1 컴포넌트 설계
-   **함수형 컴포넌트**: `function ComponentName() {}` 또는 `const ComponentName = () => {}`를 사용합니다. 파일 내에서 일관성을 유지하십시오.
-   **Props 인터페이스**: `ComponentNameProps`라는 이름의 인터페이스나 타입을 정의합니다.
-   **Export**: Named export 또는 default export를 일관되게 사용합니다.
-   **합성 (Composition)**: 큰 컴포넌트를 작고 재사용 가능한 하위 컴포넌트로 분리합니다.

### 3.2 상태 관리
-   **서버 상태 (Supabase)**:
    -   **항상** TanStack Query의 `useQuery` 또는 `useMutation`을 사용하십시오.
    -   **절대** `useEffect` + `useState`로 서버 데이터를 수동으로 저장하지 마십시오.
    -   **절대** 전역 UI 동기화에 꼭 필요한 경우가 아니면 서버 데이터를 Zustand에 중복 저장하지 마십시오.
-   **클라이언트 상태 (Zustand)**:
    -   전역 UI 상태(예: 테마, 사이드바 열림/닫힘, 세션 데이터)에 사용합니다.
    -   스토어를 작고 집중적으로 유지하십시오.
-   **로컬 상태**:
    -   컴포넌트 로컬 상태에는 `useState` 또는 `useReducer`를 사용합니다.

### 3.3 스타일링 (Tailwind CSS v4)
-   **유틸리티 우선**: 모든 것에 Tailwind 유틸리티 클래스를 사용하십시오.
-   **커스텀 CSS 금지**: `index.css`나 별도 파일에 원시 CSS를 작성하지 마십시오.
-   **클래스 병합**: 조건부 클래스와 props 병합을 위해 `cn()` 유틸리티(`lib/utils.ts`에 위치)를 사용하십시오.
    ```tsx
    // 예시
    <div className={cn("bg-white p-4", className)}>...</div>
    ```
-   **색상 팔레트**: `index.css`에 정의된 시맨틱 색상 변수(예: `bg-primary`, `text-foreground`)를 사용하십시오. 헥스(hex) 값을 하드코딩하지 마십시오.

### 3.4 비동기 작업
-   **Async/Await**: `.then()`보다 `async/await`를 선호합니다.
-   **에러 처리**: 에러를 우아하게 처리하십시오. 사용자에게 에러를 알릴 때는 `sonner`를 사용하십시오.
-   **로딩 상태**: 로딩 중에는 항상 시각적 피드백(스켈레톤, 스피너)을 제공하십시오.

---

## 4. Supabase 통합

-   **클라이언트 접근**: `src/lib/supabase.ts`의 싱글톤 인스턴스를 사용하십시오.
-   **타입**: `src/database.types.ts`에서 생성된 데이터베이스 타입을 가져와 사용하십시오.
-   **보안**: 클라이언트 측에 서비스 롤 키(service role key)를 절대 노출하지 마십시오.

---

## 5. 새로운 기능 워크플로우

1.  **분석**: 요구사항을 이해하고 필요한 컴포넌트/스토어를 식별합니다.
2.  **계획**: 새로운 라우트, 데이터베이스 테이블, 스토어가 필요한지 결정합니다.
3.  **구현**:
    -   Supabase 테이블 생성/수정 (해당되는 경우).
    -   Zod 스키마 생성/수정 (해당되는 경우).
    -   API 함수 / 훅 구현.
    -   UI 컴포넌트 구축.
    -   상태 통합.
4.  **검증**: 정상 경로(happy path)와 엣지 케이스를 테스트합니다.

---

**이 가이드라인을 따름으로써 우리는 Onebite Log가 고품질의 확장 가능하고 유지보수하기 쉬운 프로젝트로 남도록 보장합니다.**
