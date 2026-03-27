# KANGJUNG.dev Portfolio (GitHub Pages)

정적 페이지로 게임/앱/픽셀아트를 보여주기 위한 템플릿입니다.

## 페이지 구성

- `index.html`: 홈 + 사이트 방향성 + 대표 프로젝트
- `projects.html`: 앱/게임 카드 리스트 + 태그 필터
- `art.html`: 픽셀아트 갤러리
- `about.html`: 소개 및 링크

## 데이터 관리

- `assets/data/appList.json`만 수정하면 프로젝트 카드가 갱신됩니다.
- 프로젝트 구조는 기존 `appList.json`의 `title/desc/tags/stores`를 참고했습니다.

## 로컬 확인

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173` 접속
