cat > README.md <<'EOF'
# envsync

Find environment variables used in your code that are missing from `.env.example` — and spot variables that are no longer used.

envsync scans your project and compares the environment variables used in your code with the ones listed in `.env.example`.

## Supported

Currently supports:

- JavaScript
- TypeScript
- Python

### Detected patterns

**JavaScript / TypeScript**

    process.env.API_KEY

**Python**

    os.getenv("API_KEY")

    os.environ["API_KEY"]

## Usage

Install:

    npm install -g envsync

Run inside your project:

    envsync

## Example

If your code contains:

    const apiKey = process.env.API_KEY
    const database = process.env.DATABASE_URL

but `.env.example` contains:

    DATABASE_URL=
    OLD_API_URL=

envsync reports:

    Missing from .env.example:
      API_KEY

    Unused in .env.example:
      OLD_API_URL

If everything matches:

    Everything looks good.

## Exit codes

- `0` — everything matches
- `1` — missing or unused variables were found

This makes envsync suitable for CI checks.

## Why?

Environment variables get added and removed over time.

The code gets updated, but `.env.example` is easy to forget.

envsync helps catch that drift early.

## Roadmap

- [x] JavaScript / TypeScript scanning
- [x] Python scanning
- [x] Missing environment variables
- [x] Unused environment variables
- [x] Exit codes
- [ ] Hardcoded secret detection
- [ ] GitHub Action
- [ ] Automatic `.env.example` updates

## License

MIT
EOF

git add README.md
git commit -m "fix README formatting"
git push
