# Game data

All game content lives in `json/` and is embedded into the page at build time.
Names are internal keys (`snake_case`); the visible text comes from the language
files.

## Monsters

`json/monsters.json`:

```json
{
  "name": "arkveld",
  "capturable": true,
  "tempered": true,
  "arch_tempered": true
}
```

| Field           | Effect                                                  |
| --------------- | ------------------------------------------------------- |
| `capturable`    | The objective can be _Capture_; otherwise always _Kill_ |
| `tempered`      | The monster can be rolled as tempered (level 1)         |
| `arch_tempered` | The monster can be rolled as arch-tempered (level 2)    |

Each monster needs one image per temper level it can reach:
`static/images/monsters/<level>_<name>.webp` with `0` = normal, `1` = tempered,
`2` = arch-tempered.

## Weapons

`json/weapons.json` lists the weapon types by name. Each weapon needs an image at
`static/images/weapons/<name>.webp`.

## Translations

`json/language/<code>.json` maps every key to its text, including all monster
and weapon names. A missing key is shown as the raw key.

To add a language:

1. Create `json/language/<code>.json` with all keys of `en.json`.
2. Add the code to `LANGUAGES_SUPPORTED` in `src/data/language.rs`.
3. Add a flag image at `static/images/languages/<code>.webp`.

## Checklist

- [ ] Entry added to `monsters.json` or `weapons.json`
- [ ] Images for every reachable temper level / the weapon
- [ ] Key translated in every language file
- [ ] Site rebuilt and checked with `devenv shell -- build` and
      `devenv shell -- serve`
