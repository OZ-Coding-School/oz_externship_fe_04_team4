## 🧾 팀 개발 컨벤션

### 🧱 런타임 & 패키지 매니저

- **Node.js**: 22.x (프로젝트 루트의 설정 파일 기준으로 버전 고정)
- **패키지 매니저**: `npm`
- 팀원들은 `nvm` 등으로 같은 Node 버전을 맞춘 뒤 작업하는 것을 권장

---

### 🌿 브랜치 전략

- **메인 브랜치**
  - `main`: 배포용 브랜치
  - `develop`: 개발 통합 브랜치

- **작업 브랜치 네이밍 규칙**

  ```bash
  # 기능 개발
  feat/{issue-number}-{short-kebab}
  # 버그 수정
  fix/{issue-number}-{short-kebab}
  # 환경 설정 / 빌드 / 잡일
  chore/{issue-number}-{short-kebab}
  # 리팩터링
  refactor/{issue-number}-{short-kebab}
  ```

---

### 💬 커밋 메시지 규칙

- **형식**
  - `{type}: {subject}`

- **type 목록**
  - `feat | fix | chore | refactor | style | docs | ci | build | perf | revert`

- **subject 규칙**
  - 한국어 사용
  - 동사 / 명사 위주로 짧게 (명령문 느낌)
  - 첫 글자 소문자로 시작
  - 끝에 마침표(.) 붙이지 않음

- **예시**
  - `feat: 메인 상품 리스트 무한스크롤 추가`
  - `fix: 레시피 상세 진입 시 크래시 수정`
  - `chore: eslint 설정 업데이트`
  - `refactor: 상품 카드 컴포넌트 구조 개선`
