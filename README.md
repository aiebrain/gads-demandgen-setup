# Google Ads Demand Gen 셋업 자동화

Google Ads **디맨드젠(Demand Gen)** 광고를 설정할 수 있는 환경을, 손으로 클릭하는 대신
**자동화 스크립트**로 구축하고 **어느 PC에서든 동일하게 재현**되게 만드는 도구 모음입니다.
일반 Gmail 계정 + OAuth 인증을 전제로, Cloud Run에 디맨드젠 가능한 MCP 서버를 배포하고
Claude Code에 연결합니다.

> 가능한 건 자동으로, 웹 전용(관리자 계정 생성·개발자 토큰 신청 등)은 페이지를 열어
> **완전 초보자 기준으로 단계별 안내 + 입력값 검증**을 합니다.

## 무엇이 들어 있나

```
skills/
├── google-ads-demandgen-setup/   # 이 도구 — 셋업 오케스트레이션 레이어
│   ├── scripts/                   # guided_setup · install_gcloud · preflight · bootstrap
│   │                              # · connect_new_pc · verify_demandgen · link_account · _common
│   ├── config/.env.example
│   └── references/                # beginner-setup-guide · troubleshooting · manual-fallback
└── google-ads-direct-mcp/         # 재사용하는 MCP 서버 본체(읽기+안전한 쓰기+디맨드젠 툴)
docs/                              # Nextra 가이드 문서 사이트 (Vercel 배포용)
```

## 빠른 시작

```bash
cd skills/google-ads-demandgen-setup/scripts

# 0) 처음부터(계정도 없음)라면 — 웹 전용 단계 안내 + GCP 자동
python guided_setup.py

# 1) 원커맨드 구축 — gcloud설치 → OAuth → Cloud Run 배포 → Claude Code 등록 → 검증
python bootstrap.py

# 다른 PC 연결 (서버 재배포 없이 URL+토큰만)
python connect_new_pc.py --url <MCP_URL> --token <BEARER>
```

자세한 안내는 **가이드 문서 사이트** 또는 `skills/google-ads-demandgen-setup/SKILL.md` 참고.

## 자동 vs 안내 (솔직한 경계)

| 단계 | 처리 |
|------|------|
| 구글 계정 / MCC 생성 / 개발자 토큰 | 📖 안내 (웹 가입·reCAPTCHA·Google 심사라 자동화 불가) |
| gcloud 설치 / GCP 프로젝트·결제·Ads API | ⚙️ 자동 |
| OAuth 동의 · Cloud Run 배포 · 등록 · 검증 | ⚙️ 자동 |

## 안전 원칙

- 비밀값(`.env`, `google_ads_adc.json`, `mcp_bearer_token.txt`, `connection.json`,
  OAuth 클라이언트 JSON)은 **절대 커밋 금지** (`.gitignore`로 차단).
- 새 캠페인·광고는 기본 **PAUSED**, 활성화·삭제는 명시적 확인 인자 필요.
- 검증은 `validate_only`(과금·생성 없음)를 기본으로.

## 라이선스

MIT — [LICENSE](./LICENSE)
