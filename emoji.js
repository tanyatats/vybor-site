/* Vybor — единые эмодзи на всех устройствах.
   Подключается одной строкой на каждой странице:
   <script src="emoji.js" defer></script>
   Заменяет системные эмодзи на SVG-картинки Twemoji,
   чтобы монетка 🪙 и другие эмодзи выглядели одинаково у всех. */
(function () {
  var TWEMOJI_SRC =
    'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js';

  // Стили для эмодзи-картинок (масштабируются по font-size)
  function injectStyle() {
    if (document.getElementById('twemoji-style')) return;
    var css =
      'img.emoji{height:1em;width:1em;margin:0 .05em 0 .1em;' +
      'vertical-align:-0.1em;display:inline-block;}';
    var style = document.createElement('style');
    style.id = 'twemoji-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function runParse() {
    if (window.twemoji) {
      window.twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
    }
  }

  function loadTwemoji() {
    injectStyle();
    if (window.twemoji) {
      runParse();
      return;
    }
    var s = document.createElement('script');
    s.src = TWEMOJI_SRC;
    s.crossOrigin = 'anonymous';
    s.onload = runParse;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTwemoji);
  } else {
    loadTwemoji();
  }
})();
