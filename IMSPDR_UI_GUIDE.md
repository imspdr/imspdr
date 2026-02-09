# @imspdr/ui Component Guide for Agents

이 가이드는 `@imspdr/ui` 라이브러리의 모든 컴포넌트와 디자인 시스템을 에이전트가 완벽하게 이해하고 사용할 수 있도록 작성되었습니다. 이 문서만으로도 코드의 상세 구현을 보지 않고 라이브러리를 정확하게 응용할 수 있습니다.

---

## 1. Core Principles (핵심 원칙)

1.  **Typography Standard**: 모든 텍스트는 `Typography` 컴포넌트로 감싸야 하며, 원시 태그 (`span`, `p` 등) 사용을 금합니다.
2.  **Strict Token Usage**: 색상은 하드코딩된 Hex/RGB 대신 반드시 아래 정의된 **Color Tokens**를 사용합니다.
3.  **Korean User Interface**: 모든 레이블, 플레이스홀더, 메시지는 한국어를 기본으로 합니다.
4.  **Device Responsive**: 모바일 브레이크포인트(`768px`)를 기준으로 레이아웃이 대응되어야 합니다.

---

## 2. Design System Tokens: Colors

모든 컴포넌트의 `color` 속성에는 아래의 토큰 문자열을 전달할 수 있습니다. 시스템은 `'category.level'` 또는 `'categoryLevel'` 형식을 해석합니다. (예: `primary.1`, `danger2`)

### 2.1 주요 색상 (Main Palettes)
각 카테고리는 `1` (가장 밝음/기본), `2`, `3` (가장 어두움) 레벨을 가집니다.

| 카테고리 | 용도 | 사용 가능한 수준 (Level) | 토큰 예시 |
| :--- | :--- | :--- | :--- |
| **background** | 배경색 | `1` (기본), `2` (보조), `3` (강조) | `background.1` |
| **foreground** | 텍스트/전경색 | `1` (Primary), `2` (Secondary), `3` (Disabled) | `foreground.2` |
| **primary** | 브랜드 컬러 (Teal) | `1`, `2`, `3` | `primary.1` |
| **danger** | 에러/위험성 알림 (Red) | `1`, `2`, `3` | `danger.1` |
| **warning** | 경고/주의 (Amber) | `1`, `2`, `3` | `warning.1` |
| **success** | 성공/완료 (Emerald) | `1`, `2`, `3` | `success.1` |
| **info** | 정보/안내 (Blue) | `1`, `2`, `3` | `info.1` |

### 2.2 기타 특수 토큰
-   `white`: 순백색 (`#ffffff`)
-   `overlay`: 반투명 검정 배경 (모달 등에서 사용)
-   `shadow`: 그림자 효과용 반투명 컬러

---

## 3. Component Reference

### 3.1 Typography
텍스트의 의미와 시각적 위계를 결정합니다.

-   **Props**:
    -   `variant`: `'title'` (제목), `'body'` (본문, 기본값), `'caption'` (부가 정보)
    -   `level`: `1` ~ `6` (숫자가 작을수록 크고 중요함. `variant="title"`에서 `1`은 `h1`에 해당)
    -   `color`: 위 **Color Tokens** 중 하나 (기본값: `foreground.1`)
    -   `as`: 렌더링할 HTML 태그 강제 지정 (`h1`, `div`, `span` 등)

-   **Example**:
    ```tsx
    <Typography variant="title" level={2} color="primary.1">중요한 소제목</Typography>
    <Typography variant="body" level={2} color="foreground.2">기본 본문 텍스트</Typography>
    <Typography variant="caption" color="danger.1">에러 메시지 캡션</Typography>
    ```

### 3.2 Button
다목적 행위 버튼입니다.

-   **Props**:
    -   `variant`: `'contained'` (기본, 채워진 버튼), `'outlined'` (테두리만), `'ghost'` (배경 없음, 호버 시 배경), `'text'` (텍스트만)
    -   `shape`: `'rounded'` (기본, 8px), `'square'` (직각), `'pill'` (완전 둥근)
    -   `size`: `'xs'`, `'sm'`, `'md'` (기본), `'lg'`, `'xl'`
    -   `color`: 브랜드 컬러 토큰 지정 (기본값: `primary.1`)
    -   `isLoading`: `true`일 경우 로딩 스피너를 보여주며 클릭이 방지됨
    -   `leftIcon` / `rightIcon`: `ReactNode` (아이콘 컴포넌트 등) 배치
    -   `fullWidth`: 버튼이 가로 전체를 차지함

-   **Example**:
    ```tsx
    <Button variant="contained" shape="pill" size="lg">시작하기</Button>
    <Button variant="outlined" color="danger.1" leftIcon={<HiTrash />}>삭제</Button>
    <Button variant="ghost" isLoading>저장 중</Button>
    ```

### 3.3 Modal (Hook & Context)
전역 모달을 호출합니다. `ModalProvider` 하위에서 사용 가능합니다.

-   **Interface**: `const { openModal, closeModal } = useModal();`
-   **openModal Options**:
    -   `title`: 모달 상단 헤더 텍스트 (기본: "알림")
    -   `footer`: 하단 버튼 영역 (`ReactNode`)
    -   `onClose`: 모달이 닫힐 때 실행되는 콜백
    -   `closeOnOverlayClick`: 바깥 클릭 시 닫기 여부 (기본: `true`)

-   **Example**:
    ```tsx
    openModal(<Typography>정말 삭제하시겠습니까?</Typography>, {
      title: '주의',
      footer: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outlined" onClick={() => closeModal()}>취소</Button>
          <Button color="danger.1" onClick={handleDelete}>삭제</Button>
        </div>
      )
    });
    ```

### 3.4 Toast (Hook & Context)
하단에 팝업되는 알림 메시지입니다. `ToastProvider` 하위에서 사용 가능합니다.

-   **Interface**: `const { showToast } = useToast();`
-   **Usage**: `showToast("메시지 내용");` (약 3초 후 자동 소멸)

### 3.5 DropSelect
커스텀 셀렉트 박스입니다. `searchable` 옵션을 지원합니다.

-   **Props**:
    -   `options`: `{ label: string, value: string }[]`
    -   `selected`: 현재 선택된 `value`
    -   `onSelect`: `(value: string) => void`
    -   `searchable`: 목록 내 검색 입력창 활성화 여부
    -   `placeholder`: 미선택 시 노출 텍스트

### 3.6 AutoComplete
입력 필드와 실시간 필터링 목록이 결합된 컴포넌트입니다.

-   **Props**:
    -   `options`: `{ label: string, value: string, subLabel?: string }[]`
    -   `onSelect`: `(option: AutoCompleteOption) => void`
    -   `noResultText`: 검색 결과 없을 시 노블 텍스트
-   **Special Feature**: 한글 초성 검색(예: 'ㄱㄴ' 입력 시 '강남' 검색)을 기본 지원합니다.

### 3.7 SearchInput
디바운싱이 내장된 검색전용 입력창입니다. 

-   **Features**: 입력 후 300ms 이후에 `onChange`가 호출되어 성능을 최적화합니다.

---

## 4. Layout Implementation Details

-   **Breakpoints**:
    -   Mobile: `max-width: 767px`
    -   Desktop: `min-width: 768px`
-   **Global Styling**: `ThemeProvider`를 통해 모든 컴포넌트는 다크 모드와 라이트 모드 전환 시 색상 토큰 값이 자동으로 변동됩니다. 에이전트는 고정된 Hex 값을 사용하지 않아야 합니다.
