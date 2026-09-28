import { useEffect, useState } from 'react'

export const WHATS_NUMBER = '5511992669819'
export const WHATS_DISPLAY = '+55 11 99266-9819'

export const waLink = (msg = 'Olá! Vim pelo site e quero fazer um pedido.') =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`

export const LINKS = {
  whatsapp: waLink(),
  ifood: 'https://www.ifood.com.br/delivery/osasco-sp/massas-insanas-conceicao',
  v99: 'https://oia.99app.com/dlp9/3jwIi6',
  keeta: 'https://url-eu.mykeeta.com/lNdbvnUz',
  instagram: 'https://www.instagram.com/massasinsanas',
}

// Monitoramento gratuito (GA4 + Clarity) — guia rápido:
// 1) GA4: analytics.google.com > Criar propriedade > Fluxo Web > copie o ID G-XXXXXXXXXX e troque em index.html
// 2) Clarity: clarity.microsoft.com > Novo projeto > copie o ID e troque CLARITY_ID em index.html
// 3) Relatórios: GA4 > Relatórios > Eventos (cta_click) = quantos foram redirecionados por canal/local
//    Clarity > Dashboard/Mapas de calor/Gravações = visitas + onde clicaram
export function trackCta(canal, local = 'site') {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', { canal, local });
    }
    if (typeof window.clarity === 'function') {
      window.clarity('event', `cta_${canal}`);
      window.clarity('set', 'cta_local', local);
    }
  } catch { /* nunca quebra o clique */ }
}

function getSaoPauloNow() {
  try {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
  } catch {
    return new Date()
  }
}

function useOpenNow() {
  const [state, setState] = useState({ open: false, label: 'Fechado agora', day: -1 })
  useEffect(() => {
    const n = getSaoPauloNow()
    const d = n.getDay()
    const h = n.getHours() + n.getMinutes() / 60
    const open = d >= 1 && d <= 6 && h >= 11 && h < 15
    setState({
      open,
      day: d,
      label: open ? 'Aberto agora · até 15h' : d === 0 ? 'Fechado · abre seg 11h' : 'Fechado agora',
    })
  }, [])
  return state
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12 },
      )
      els.forEach((el) => io.observe(el))
      return () => io.disconnect()
    } else {
      els.forEach((el) => el.classList.add('in'))
    }
  }, [])
}

const DISHES = [
  {
    id: 'dish-bauru',
    name: 'Bauru',
    desc: 'Cremoso e aconchegante, chega quente e encorpado.',
    ing: 'Molho branco, presunto, queijo mussarela e orégano.',
    pasta: 'parafuso',
    img: '/img/Bauru-Garfo.jpg',
    alt: 'Bauru Massas Insanas Osasco',
  },
  {
    id: 'dish-bolonhesa',
    name: 'Bolonhesa',
    desc: 'Encorpada e suculenta, aquela comfort food do almoço.',
    ing: 'Molho vermelho, carne moída, queijo mussarela e coentro/cebolinha.',
    pasta: 'espaguete',
    img: '/img/Bolonhesa.jpg',
    alt: 'Bolonhesa Massas Insanas Osasco',
  },
  {
    id: 'dish-caipira',
    name: 'Caipira',
    desc: 'Cremosa com gostinho de casa, porção que satisfaz.',
    ing: 'Molho branco, frango, bacon, catupiry e queijo mussarela.',
    pasta: 'ninho',
    img: '/img/Caipira.jpg',
    alt: 'Caipira Massas Insanas Osasco',
  },
  {
    id: 'dish-carne-seca',
    name: 'Carne seca',
    desc: 'Intensa e cremosa, para a fome de verdade.',
    ing: 'Molho branco, carne seca, queijo mussarela e coentro/cebolinha.',
    img: '/img/Carne-Seca.jpg',
    alt: 'Carne seca Massas Insanas Osasco',
  },
  {
    id: 'dish-cheddar',
    name: 'Cheddar',
    desc: 'Extra cremosa e envolvente, puro prazer no garfo.',
    ing: 'Molho branco, cheddar, calabresa, queijo mussarela e bacon.',
    pasta: 'penne',
    img: '/img/cheddar.jpg',
    alt: 'Cheddar Massas Insanas Osasco',
  },
  {
    id: 'dish-hot-dog',
    name: 'Hot dog',
    desc: 'Divertida e cremosa, com aquele toque nostálgico.',
    ing: 'Molho vermelho, salsicha, queijo mussarela e orégano.',
    img: '/img/hot-dog.jpg',
    alt: 'Hot dog Massas Insanas Osasco',
  },
]

const GALLERY = [
  { img: '/img/Bauru-outro-angulo.jpg', alt: 'Bauru Massas Insanas Osasco', cap: 'Bauru' },
  { img: '/img/Bolonhesa-angulo-diferente.jpg', alt: 'Bolonhesa Massas Insanas Osasco', cap: 'Bolonhesa' },
  { img: '/img/Caipira-outro-angulo.jpg', alt: 'Caipira Massas Insanas Osasco', cap: 'Caipira' },
  { img: '/img/Carne-Seca-outro-angulo.jpg', alt: 'Carne seca Massas Insanas Osasco', cap: 'Carne seca' },
  { img: '/img/hot-dog-angulo-diferente.jpg', alt: 'Hot dog Massas Insanas Osasco', cap: 'Hot dog' },
  { img: '/img/Pudim-no-pote.jpg', alt: 'Pudim no pote Massas Insanas Osasco', cap: 'Pudim no pote' },
]

export default function App() {
  const { open, label } = useOpenNow()
  useReveal()

  // Rastreio automático de redirecionamentos: visitas = page_view do GA4,
  // redirecionados = evento cta_click (canal + seção da página).
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href]')
      if (!a) return
      const href = a.getAttribute('href') || ''
      let canal = null
      if (href.includes('wa.me')) canal = 'whatsapp'
      else if (href.includes('ifood')) canal = 'ifood'
      else if (href.includes('99app')) canal = '99food'
      else if (href.includes('keeta') || href.includes('mykeeta')) canal = 'keeta'
      else if (href.includes('instagram')) canal = 'instagram'
      if (!canal) return
      const section = a.closest?.('section, header, footer, div.hero, div.sticky-order')?.id
        || a.closest?.('section')?.querySelector('h2')?.textContent
        || a.className?.includes('sticky') ? 'sticky' : 'site'
      trackCta(canal, section || 'site')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>

      <div className="topbar" role="region" aria-label="Horário de funcionamento">
        <div className="topbar__in">
          <span>Seg a Sáb · 11h–15h · Conceição, Osasco/SP</span>
          <span className={`badge ${open ? 'badge--open' : 'badge--closed'}`} role="status" aria-live="polite">
            <span className="dot" aria-hidden="true"></span>
            <span>{label}</span>
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__in">
          <a className="logo" href="#inicio" aria-label="Massas Insanas - início">
            <img className="logo__img" src="/img/Logo.png" width="39" height="44" alt="Logo Massas Insanas Delivery Osasco" fetchPriority="high" />
            <span>
              <span className="logo__name">Massas Insanas</span>
              <span className="logo__sub">Massas delivery · Osasco/SP</span>
            </span>
          </a>
          <nav className="nav" aria-label="Navegação principal">
            <a href="#cardapio">Cardápio</a>
            <a href="#monte">Monte sua massa</a>
            <a href="#como-pedir">Como pedir</a>
            <a href="#combos">Combos</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn btn--brand btn--sm header__cta" href={LINKS.whatsapp} target="_blank" rel="noopener">Pedir no WhatsApp</a>
        </div>
      </header>

      <main id="conteudo">
        <div className="hero" id="inicio">
          <div className="hero__grid">
            <div data-reveal>
              <p className="kicker">Delivery em Osasco · Região da Conceição</p>
              <h1>Massa cremosa, bem servida e feita na hora em Osasco<span className="dot">.</span></h1>
              <p className="lead">Escolha seu sabor, monte do seu jeito e receba quentinha na sua casa. Pratos nos tamanhos P e M, de seg a sáb no almoço.</p>
              <div className="cta-row" role="group" aria-label="Pedir nos aplicativos">
                <a className="btn btn--brand btn--lg" href={LINKS.whatsapp} target="_blank" rel="noopener">Pedir no WhatsApp</a>
                <a className="btn btn--dark btn--lg" href={LINKS.ifood}>Peça pelo iFood</a>
                <a className="btn btn--ghost" href={LINKS.v99}>Peça pela 99Food</a>
                <a className="btn btn--ghost" href={LINKS.keeta}>Peça pela Keeta</a>
              </div>
              <div className="meta-row">
                <span>Feito na hora</span>
                <span>Porções bem servidas</span>
                <span><strong>Seg–Sáb</strong> 11h–15h · <strong>Dom</strong> fechado</span>
              </div>
            </div>
            <div className="hero__art" data-reveal aria-label="Massa fresca e cremosa Massas Insanas Osasco">
              <img className="brand-logo" src="/img/Bauru-Garfo.jpg" width="896" height="1190" alt="Massa Bauru cremosa com queijo puxando Massas Insanas Osasco" fetchPriority="high" />
              <p className="art__cap">Bauru cremoso com queijo puxando — peça quentinho no WhatsApp.</p>
              <div className="art__tags"><span className="tag tag--pm">P / M</span><span className="tag">Cremosa</span><span className="tag">Almoço</span></div>
            </div>
          </div>
        </div>

        <div className="strip" role="note" aria-label="Horário">
          <div className="strip__in"><span>Aberto seg a sáb · 11h–15h</span><span aria-hidden="true">·</span><span>Domingo fechado</span><span aria-hidden="true">·</span><span>Peça no WhatsApp ou no app</span></div>
        </div>

        <section id="cardapio" aria-labelledby="t-cardapio">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">01 — Cardápio</p>
              <h2 id="t-cardapio">Pratos que abraçam<span className="dot">.</span></h2>
              <p>Massas em Osasco nos tamanhos P (160 g) e M (300 g). Escolha o seu e finalize o pedido no WhatsApp ou no app — sem inventar moda, só vontade de repetir.</p>
            </div>
            <div className="od-grid dishes" data-reveal>
              {DISHES.map((d) => (
                <article className="od-tile dish" key={d.id}>
                  <div className={`dish__media ${d.landscape ? 'dish__media--landscape' : ''}`}>
                    {d.illustrativa && <span className="illus">foto ilustrativa</span>}
                    <img className="od-media dish__photo" src={d.img} width="896" height="1190" loading="lazy" decoding="async" alt={d.alt} />
                  </div>
                  <div className="dish__body">
                    <div className="dish__top"><h3>{d.name}</h3><span className="tag tag--pm">P / M</span></div>
                    <p>{d.desc}</p>
                    <p className="dish__ing">{d.ing}{d.pasta ? ` Massa ${d.pasta}.` : ''}</p>
                    <div className="dish__order"><a className="btn btn--brand btn--sm" href={waLink(`Olá! Quero pedir 1 ${d.name} (P/M).`)} target="_blank" rel="noopener">Pedir no WhatsApp</a></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="monte" aria-labelledby="t-monte" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">02 — Monte sua massa</p>
              <h2 id="t-monte">Sua massa, suas regras<span className="dot">.</span></h2>
              <p>O diferencial da casa: você monta do seu jeito no WhatsApp ou no app e recebe quentinha.</p>
            </div>
            <div className="od-grid steps" data-reveal>
              <div className="step"><div className="step__n">1</div><h3>Escolha a massa e o tamanho</h3><p>Penne, parafuso, espaguete ou ninho, no tamanho P (160 g) ou M (300 g).</p></div>
              <div className="step"><div className="step__n">2</div><h3>Escolha os molhos</h3><p>1 ou 2 molhos — molho branco ou vermelho, sendo 1 incluído no preço.</p></div>
              <div className="step"><div className="step__n">3</div><h3>Adicione os ingredientes</h3><p>De 1 a 4 ingredientes incluídos. Carne moída e carne seca têm adicional de R$ 2,50; bacon, R$ 1,00.</p></div>
            </div>
            <div data-reveal style={{ marginTop: 24 }}><a className="btn btn--brand" href={waLink('Olá! Quero montar minha massa.')} target="_blank" rel="noopener">Quero montar minha massa</a></div>
          </div>
        </section>

        <section id="como-pedir" aria-labelledby="t-pedir" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">03 — Como funciona</p>
              <h2 id="t-pedir">Peça em 1 minuto<span className="dot">.</span></h2>
              <p>Peça direto no WhatsApp da loja ou, se preferir, pelos apps parceiros.</p>
            </div>
            <div className="od-grid how" data-reveal>
              <div className="app-pick"><h3>1 · Chame no WhatsApp</h3><p>Canal principal: atendimento direto com a loja.</p><a className="btn btn--brand btn--sm" href={LINKS.whatsapp} target="_blank" rel="noopener">Abrir WhatsApp</a></div>
              <div className="app-pick"><h3>2 · Ou escolha o app</h3><p>iFood, 99Food ou Keeta — o que for melhor para você.</p><a className="btn btn--dark btn--sm" href={LINKS.ifood}>Abrir iFood</a></div>
              <div className="app-pick"><h3>3 · Receba em casa</h3><p>Pagamento e entrega combinados no WhatsApp ou acompanhados pelo app.</p><a className="btn btn--ghost btn--sm" href={LINKS.v99}>Abrir 99Food</a></div>
            </div>
          </div>
        </section>

        <div className="slab" id="combos">
          <section aria-labelledby="t-combos" style={{ paddingBottom: 56 }}>
            <div className="wrap">
              <div className="sec-head" data-reveal>
                <p className="sec-num">04 — Combos</p>
                <h2 id="t-combos">Para dividir ou devorar sozinho<span className="dot">.</span></h2>
                <p>Combinho para o dia a dia e combo insano para quando a fome aperta. Complete com pudim e refri gelado.</p>
              </div>
              <div className="od-grid combo-grid" data-reveal>
                <div className="combo"><img className="combo__photo" src="/img/Combinho.jpg" width="752" height="1382" loading="lazy" decoding="async" alt="Combinho Massas Insanas Osasco" /><h3>Combinho</h3><p>Prático e cremoso para o almoço de todos os dias.</p><a className="btn btn--light btn--sm" href={waLink('Olá! Quero pedir 1 Combinho.')} target="_blank" rel="noopener">Pedir combinho</a></div>
                <div className="combo"><img className="combo__photo" src="/img/Combo-Insano.jpg" width="896" height="1195" loading="lazy" decoding="async" alt="Combo insano Massas Insanas Osasco" /><h3>Combo insano</h3><p>Para compartilhar — ou não. Fartura cremosa garantida.</p><a className="btn btn--light btn--sm" href={waLink('Olá! Quero pedir 1 Combo Insano.')} target="_blank" rel="noopener">Pedir combo insano</a></div>
              </div>
              <div className="extras" data-reveal>
                <img className="combo__photo" src="/img/Pudim.jpg" width="896" height="1195" loading="lazy" decoding="async" alt="Pudim Massas Insanas Osasco" style={{ maxWidth: 280 }} />
                <h3>Sobremesas + bebidas</h3>
                <ul><li>Pudim</li><li>Brigadeirão no pote</li><li>Coca-Cola</li><li>Coca-Cola Zero</li><li>Guaraná</li><li>Sukita Caçulinha</li></ul>
              </div>
            </div>
          </section>
        </div>

        <section id="fotos" aria-labelledby="t-fotos" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">05 — Fotos reais</p>
              <h2 id="t-fotos">Do fogão para a marmita<span className="dot">.</span></h2>
              <p>Uma amostra do que sai do fogão — o cardápio completo está no WhatsApp e nos apps.</p>
            </div>
            <div className="od-grid gallery" data-reveal>
              {GALLERY.map((g) => (
                <figure key={g.img}><img src={g.img} width="896" height="1190" loading="lazy" decoding="async" alt={g.alt} /><figcaption>{g.cap}</figcaption></figure>
              ))}
            </div>
            <div data-reveal style={{ marginTop: 24 }}><a className="btn btn--brand" href="#cardapio">Ver cardápio e pedir</a></div>
          </div>
        </section>

        <section id="entrega" aria-labelledby="t-entrega" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">06 — Área de entrega</p>
              <h2 id="t-entrega">Da Conceição num raio de 9 km<span className="dot">.</span></h2>
              <p>Base na R. Três Corações, 57 - Conceição, Osasco/SP. Entrega em até 9 km: todo Osasco e partes de Taboão da Serra, Carapicuíba, Jaguaré, Vila Leopoldina e Butantã, conforme cobertura de cada app.</p>
            </div>
            <ul className="pills" data-reveal>
              <li>Conceição</li><li>Centro</li><li>Bela Vista</li><li>Quitaúna</li><li>Bussocaba</li><li>Todo Osasco</li><li>Taboão da Serra</li><li>Carapicuíba</li><li>Jaguaré</li><li>Vila Leopoldina</li><li>Butantã</li>
            </ul>
            <p className="note" data-reveal><strong>Confira no app:</strong> taxa, tempo e cobertura exata variam por aplicativo e por dia (distância por rota pode exceder 9 km em linha reta nos bairros de limite). Se o seu bairro não aparecer, chame no WhatsApp.</p>
          </div>
        </section>

        <section id="faq" aria-labelledby="t-faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="sec-num">07 — FAQ</p>
              <h2 id="t-faq">Perguntas frequentes<span className="dot">.</span></h2>
            </div>
            <div data-reveal>
              <details open><summary>Vocês entregam onde?</summary><p>Base na Conceição, em Osasco/SP, com entrega em até 9 km — cobre todo Osasco (Centro, Bela Vista, Quitaúna, Bussocaba e demais bairros) e partes de Taboão da Serra, Carapicuíba, Jaguaré, Vila Leopoldina e Butantã, conforme a cobertura de cada app no momento do pedido.</p></details>
              <details><summary>O que muda entre o tamanho P e M?</summary><p>O tamanho da massa: P leva 160 g e M leva 300 g. O molho e os ingredientes acompanham a proporção do prato. Escolha o ideal para a sua fome no WhatsApp ou no app.</p></details>
              <details><summary>O monte sua massa tem taxa extra?</summary><p>Você escolhe a massa (penne, parafuso, espaguete ou ninho), 1 ou 2 molhos (1 incluído) e de 1 a 4 ingredientes incluídos. Só pagam adicional: carne moída (+R$ 2,50), carne seca (+R$ 2,50) e bacon (+R$ 1,00).</p></details>
              <details><summary>Quais sobremesas e bebidas vocês têm?</summary><p>Pudim, brigadeirão no pote, Coca-Cola, Coca-Cola Zero, Guaraná e Sukita Caçulinha — conforme disponibilidade do dia no WhatsApp ou no app.</p></details>
              <details><summary>Como faço para pedir?</summary><p>O jeito mais rápido é chamar no WhatsApp da loja. Se preferir, peça pelo iFood, 99Food ou Keeta.</p></details>
              <details><summary>Como funciona o pagamento?</summary><p>No WhatsApp, o pagamento é combinado direto com a loja. Nos apps (iFood, 99Food ou Keeta), pagamento e acompanhamento da entrega acontecem dentro do próprio aplicativo.</p></details>
              <details><summary>Vocês abrem no domingo?</summary><p>Não. Funcionamos de segunda a sábado, das 11h às 15h. Domingo fechado.</p></details>
            </div>
          </div>
        </section>

        <section id="pedir" aria-labelledby="t-pedir-final">
          <div className="wrap">
            <div className="sec-head" data-reveal style={{ textAlign: 'center', maxWidth: '60ch', marginLeft: 'auto', marginRight: 'auto' }}>
              <h2 id="t-pedir-final">Bateu a fome<span className="dot">?</span></h2>
              <p>Massa cremosa feita na hora, de seg a sáb até 15h. Peça agora e receba quentinha.</p>
            </div>
            <div className="cta-row" data-reveal role="group" aria-label="Pedir agora" style={{ justifyContent: 'center' }}>
              <a className="btn btn--brand btn--lg" href={LINKS.whatsapp} target="_blank" rel="noopener">Pedir no WhatsApp</a>
              <a className="btn btn--dark btn--lg" href={LINKS.ifood}>Peça pelo iFood</a>
              <a className="btn btn--ghost btn--lg" href={LINKS.v99}>Peça pela 99Food</a>
            </div>
          </div>
        </section>
      </main>

      <div className="sticky-order" role="group" aria-label="Pedir agora">
        <a className="btn btn--brand btn--sm" href={LINKS.whatsapp} target="_blank" rel="noopener">Pedir no WhatsApp</a>
        <a className="btn btn--light btn--sm" href={LINKS.ifood}>iFood</a>
      </div>

      <footer>
        <div className="foot__grid">
          <div>
            <h2>Massas Insanas<span style={{ color: '#F5A84B' }}>.</span></h2>
            <p className="foot__addr">R. Três Corações, 57 - Conceição, Osasco - SP, CEP 06145-094<br />Seg a Sáb · 11:00–15:00 · Dom fechado<br /><a href={LINKS.whatsapp} target="_blank" rel="noopener">WhatsApp {WHATS_DISPLAY}</a></p>
          </div>
          <nav aria-label="Peça agora">
            <p style={{ fontWeight: 800, margin: '0 0 12px' }}>Peça agora</p>
            <ul className="foot__list">
              <li><a href={LINKS.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href={LINKS.ifood}>iFood</a></li>
              <li><a href={LINKS.v99}>99Food</a></li>
              <li><a href={LINKS.keeta}>Keeta</a></li>
              <li><a href={LINKS.instagram}>Instagram</a></li>
            </ul>
          </nav>
          <nav aria-label="Navegação">
            <p style={{ fontWeight: 800, margin: '0 0 12px' }}>A casa</p>
            <ul className="foot__list">
              <li><a href="#cardapio">Cardápio</a></li>
              <li><a href="#monte">Monte sua massa</a></li>
              <li><a href="#combos">Combos</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>
        </div>
        <div className="foot__base">© Massas Insanas · Massas delivery em Osasco/SP · Macarrão delivery, monte sua massa e marmita na Conceição.</div>
      </footer>
    </>
  )
}
