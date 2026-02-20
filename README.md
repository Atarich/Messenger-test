<<<<<<< HEAD
# messenger-test

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
=======
# веб-мессенджер

## Стек

- Vue 3 (Composition API)
- TypeScript
- Pinia
- Vue Router
- SCSS
- Без использования UI-библиотек

---

## Реализация требований

### Структура

Приложение состоит из двух областей:

- Список чатов (слева):
  - Имя собеседника
  - Последнее сообщение
  - Статус online/offline

- Окно чата (справа):
  - История сообщений
  - Поле ввода нового сообщения

---

### Чаты и сообщения

- Загружается 5 пользователей с  
  `https://jsonplaceholder.typicode.com/users`
- При первом открытии чата генерируется история из 20–30 сообщений
- Поддерживаются входящие и исходящие сообщения
- Для каждого сообщения отображается время отправки

---

### Отправка сообщений

- Сообщение нельзя отправить пустым
- Enter - отправка, Shift+Enter - перенос строки
- После отправки сообщение сразу появляется в истории
- Через 1–2 секунды эмулируется автоответ:
  «Спасибо за сообщение!)»
- Автоответ через `setTimeout`

---

### Статусы пользователей

- У каждого собеседника есть статус `online` / `offline`
- Статус отображается цветным индикатором
- При открытии чата статус может изменяться (имитация активности)

---

### UX

- Автопрокрутка истории вниз при открытии чата и новых сообщениях
- Состояние (чаты, сообщения, активный диалог) сохраняется в `localStorage`

---

## Дополнительно

- Поддержка форматирования сообщений (`**жирный**`, `*курсив*`)
- Индикатор непрочитанных сообщений
- На мобильном чат открывается во весь экран в отдельном роуте
>>>>>>> 5206529a03e985c7f136e5a4a322cdb17c4176a0
