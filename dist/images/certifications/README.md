# Certification logos

Place these six WebP files in this folder (exact names):

| File | Source (WordPress media) |
|------|--------------------------|
| `stpi.webp` | [STPI.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/STPI.webp) |
| `startup-india.webp` | [startupindia.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/startupindia.webp) |
| `mcpd.webp` | [MCPD.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/MCPD.webp) |
| `mcts.webp` | [MCTS.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/MCTS.webp) |
| `iso-9001-2015.webp` | [ISO-9001-2015.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-9001-2015.webp) |
| `iso-27001-2022.webp` | [ISO-27001-2022.webp](https://www.softreetechnology.com/wp-content/uploads/2024/12/ISO-27001-2022.webp) |

## Automated fetch

```bash
npm run fetch:certifications
```

If you get HTTP 403, the live site is blocking bots. Use either:

1. **WordPress admin** → Media → download each file → rename per table above, or  
2. **Browser helper** → open `scripts/certification-download-helper.html` in Chrome, click each link, Save image as… into this folder.

The app uses local paths first and falls back to the remote URL when a file is missing.
