/*
  Vybor — уведомление о cookie.
  Подключается одной строкой в любую страницу:
    <script src="cookie.js" defer></script>
  Баннер показывается один раз, согласие запоминается в localStorage.
  Стили инлайновые, чтобы не зависеть от CSS страницы.
*/
(function(){
  var KEY = 'vybor_cookie_ok';
  try { if (localStorage.getItem(KEY) === '1') return; } catch(e) {}

  function build(){
    var bar = document.createElement('div');
    bar.setAttribute('role','region');
    bar.setAttribute('aria-label','Уведомление об использовании cookie');
    bar.style.cssText = [
      'position:fixed','left:16px','right:16px','bottom:16px','z-index:9999',
      'max-width:640px','margin:0 auto','background:#ffffff',
      'border:1px solid #ece4f5','border-radius:18px',
      'box-shadow:0 20px 60px -18px rgba(150,90,200,.4)',
      'padding:18px 20px','display:flex','flex-wrap:wrap','align-items:center',
      'gap:14px','font-family:Inter,-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif',
      'opacity:0','transform:translateY(12px)','transition:opacity .4s,transform .4s'
    ].join(';');

    var text = document.createElement('div');
    text.style.cssText = 'flex:1;min-width:220px;font-size:13.5px;line-height:1.55;color:#2b1a3d;';
    text.innerHTML = 'Мы используем файлы cookie и сервис Яндекс.Метрика, чтобы сайт работал корректно и удобно. Оставаясь на сайте, вы соглашаетесь с этим. Подробнее — в <a href="privacy.html" style="color:#c159f5;text-decoration:none;">политике конфиденциальности</a>.';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Принять';
    btn.style.cssText = [
      'flex-shrink:0','border:none','cursor:pointer','padding:13px 28px',
      'border-radius:12px','background:linear-gradient(120deg,#ff4d8f 0%,#c159f5 100%)',
      'color:#fff','font-family:Unbounded,Inter,sans-serif','font-weight:600','font-size:14px',
      'box-shadow:0 8px 20px -8px rgba(255,77,143,.6)'
    ].join(';');

    btn.addEventListener('click', function(){
      try { localStorage.setItem(KEY,'1'); } catch(e) {}
      bar.style.opacity = '0';
      bar.style.transform = 'translateY(12px)';
      setTimeout(function(){ bar.remove(); }, 400);
    });

    bar.appendChild(text);
    bar.appendChild(btn);
    document.body.appendChild(bar);
    requestAnimationFrame(function(){
      bar.style.opacity = '1';
      bar.style.transform = 'translateY(0)';
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
