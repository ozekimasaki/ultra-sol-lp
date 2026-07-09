const OPENAI_URL =
  'https://openai.com/ja-JP/index/previewing-gpt-5-6-sol/'
const MUSIC_URL =
  'https://music.youtube.com/watch?v=M08WyZ5b4BQ&si=v1uQCJ9Fkv0o_AxU'

export function renderPage(root: HTMLElement): void {
  root.innerHTML = `
    <a class="skip-link" href="#main">本文へスキップ</a>

    <div class="pointer-glow" data-pointer-glow aria-hidden="true"></div>
    <div class="scroll-progress" aria-hidden="true">
      <span data-scroll-progress></span>
    </div>

    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="Ultra Sol トップへ">
        <span class="brand__mark" aria-hidden="true">US</span>
        <span class="brand__name">ULTRA SOL</span>
        <span class="brand__version">5.6</span>
      </a>

      <nav class="site-nav" aria-label="メインナビゲーション">
        <a href="#power">POWER</a>
        <a href="#mode">MODE</a>
        <a href="#lineup">LINEUP</a>
      </nav>

      <a
        class="header-link"
        href="${OPENAI_URL}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="OpenAI公式記事（新しいタブで開く）"
        data-openai-link
      >
        OFFICIAL <span aria-hidden="true">↗</span>
      </a>
    </header>

    <nav
      class="mobile-nav"
      aria-label="モバイル用セクションナビゲーション"
      data-mobile-nav
    >
      <a href="#power"><span>01</span> POWER</a>
      <a href="#mode"><span>02</span> MODE</a>
      <a href="#lineup"><span>03</span> LINEUP</a>
    </nav>

    <main id="main">
      <section class="hero" id="top" aria-labelledby="hero-title">
        <div class="hero__grid" aria-hidden="true"></div>
        <div class="hero__particles" aria-hidden="true">
          <span class="particle particle--1"></span>
          <span class="particle particle--2"></span>
          <span class="particle particle--3"></span>
          <span class="particle particle--4"></span>
          <span class="particle particle--5"></span>
          <span class="particle particle--6"></span>
          <span class="particle particle--7"></span>
          <span class="particle particle--8"></span>
        </div>

        <div class="solar-stage" aria-hidden="true">
          <div class="solar-stage__orbit solar-stage__orbit--outer"></div>
          <div class="solar-stage__orbit solar-stage__orbit--inner"></div>
          <div class="solar-stage__ray solar-stage__ray--1"></div>
          <div class="solar-stage__ray solar-stage__ray--2"></div>
          <div class="solar-stage__ray solar-stage__ray--3"></div>
          <div class="solar-stage__sun">
            <span>SOL</span>
          </div>
        </div>

        <div class="hero__content">
          <div class="eyebrow reveal-item">
            <span class="eyebrow__pulse" aria-hidden="true"></span>
            GPT-5.6 SOL / LIMITED PREVIEW
          </div>

          <h1 class="hero__title reveal-item" id="hero-title">
            <span class="hero__title-line hero__title-line--ultra">ULTRA</span>
            <span class="hero__title-line hero__title-line--sol">
              SOL<span class="hero__bang">!!!</span>
            </span>
          </h1>

          <div class="hero__lower">
            <p class="hero__shout reveal-item">
              止まるな。<br />
              考えろ。<br />
              <strong>進め！</strong>
            </p>

            <div class="hero__actions reveal-item">
              <p>
                深く考える。仲間を呼ぶ。<br />
                そして、限界の向こうへ。
              </p>
              <div class="button-row">
                <a
                  class="button button--primary"
                  href="${OPENAI_URL}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Solを目撃する（新しいタブで開く）"
                  data-openai-link
                >
                  SOLを目撃する
                  <span class="button__arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  class="button button--ghost"
                  href="${MUSIC_URL}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="魂を再生（新しいタブで開く）"
                  data-music-link
                >
                  <span class="equalizer" aria-hidden="true">
                    <i></i><i></i><i></i>
                  </span>
                  魂を再生
                </a>
              </div>
            </div>
          </div>

          <dl class="hero__meta reveal-item">
            <div>
              <dt>MODEL</dt>
              <dd>GPT-5.6 SOL</dd>
            </div>
            <div>
              <dt>EFFORT</dt>
              <dd>MAX</dd>
            </div>
            <div>
              <dt>MODE</dt>
              <dd>ULTRA</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>PREVIEW</dd>
            </div>
          </dl>
        </div>

        <a class="scroll-cue" href="#power">
          <span>SCROLL TO IGNITE</span>
          <i aria-hidden="true"></i>
        </a>
      </section>

      <div class="ticker" aria-hidden="true">
        <div class="ticker__track">
          <span>DON'T STOP</span><i>✦</i>
          <span>THINK DEEPER</span><i>✦</i>
          <span>GO ULTRA</span><i>✦</i>
          <span>DON'T STOP</span><i>✦</i>
          <span>THINK DEEPER</span><i>✦</i>
          <span>GO ULTRA</span><i>✦</i>
        </div>
      </div>

      <section class="power section-shell" id="power" aria-labelledby="power-title">
        <header class="section-heading reveal-item">
          <div class="section-heading__index">
            <span>01</span>
            <span>POWER</span>
          </div>
          <div>
            <p class="section-kicker">THE HEAT OF REASONING</p>
            <h2 id="power-title">推論は、<br />熱量になる。</h2>
          </div>
          <p class="section-heading__copy">
            ただ速いだけじゃない。<br />
            深く、広く、最後までやり切る。<br />
            それがSolのフラッグシップ。
          </p>
        </header>

        <div class="feature-grid">
          <article class="feature-card feature-card--max reveal-item" data-feature-card>
            <div class="feature-card__top">
              <span class="feature-card__number">01</span>
              <span class="feature-card__tag">REASONING EFFORT</span>
            </div>
            <div class="feature-card__visual feature-card__visual--max" aria-hidden="true">
              <span>MAX</span>
              <div class="meter">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
            </div>
            <h3>考える時間を、<br />惜しまない。</h3>
            <p>
              新しい <code>max</code> 推論エフォートで、
              Solが深く推論するための時間を最大限に。
            </p>
          </article>

          <article class="feature-card feature-card--ultra reveal-item" data-feature-card>
            <div class="feature-card__top">
              <span class="feature-card__number">02</span>
              <span class="feature-card__tag">AGENT ORCHESTRATION</span>
            </div>
            <div class="feature-card__visual feature-card__visual--ultra" aria-hidden="true">
              <div class="agent-node agent-node--center">SOL</div>
              <div class="agent-node agent-node--1">A1</div>
              <div class="agent-node agent-node--2">A2</div>
              <div class="agent-node agent-node--3">A3</div>
              <svg viewBox="0 0 320 150" preserveAspectRatio="none">
                <path d="M160 78 L50 30 M160 78 L270 35 M160 78 L245 128" />
              </svg>
            </div>
            <h3>ひとりの限界を、<br />チームで超える。</h3>
            <p>
              サブエージェントを束ねる新しい <code>ULTRA</code> モード。
              複雑な仕事を、分けて、走って、ひとつにする。
            </p>
          </article>

          <article class="feature-card feature-card--speed reveal-item" data-feature-card>
            <div class="feature-card__top">
              <span class="feature-card__number">03</span>
              <span class="feature-card__tag">ON CEREBRAS</span>
            </div>
            <div class="feature-card__visual feature-card__visual--speed" aria-hidden="true">
              <span class="speed-number">750</span>
              <span class="speed-unit">TOKENS<br />/ SEC</span>
              <div class="speed-lines"><i></i><i></i><i></i><i></i></div>
            </div>
            <h3>思考の火花を、<br />置き去りにしない。</h3>
            <p>
              2026年7月、Cerebras上で最大毎秒750トークンを提供予定。
              先進的なAIを、かつてない速度へ。
            </p>
          </article>
        </div>

        <p class="source-note reveal-item">
          ※ 機能・数値は
          <a
            href="${OPENAI_URL}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenAI公式発表（新しいタブで開く）"
            data-openai-link
          >OpenAI公式発表</a>
          （2026年6月26日）に基づきます。
        </p>
      </section>

      <section class="statement" aria-label="メッセージ">
        <div class="statement__orb" aria-hidden="true"></div>
        <p class="reveal-item">
          LIMIT?<br />
          <span>THAT'S JUST</span><br />
          WARM-UP.
        </p>
        <small>限界？ それ、ウォームアップ。</small>
      </section>

      <section class="mode section-shell" id="mode" aria-labelledby="mode-title">
        <header class="section-heading section-heading--mode reveal-item">
          <div class="section-heading__index">
            <span>02</span>
            <span>MODE</span>
          </div>
          <div>
            <p class="section-kicker">PUSH THE SWITCH</p>
            <h2 id="mode-title">SOULじゃない。<br /><em>SOL</em>だ。</h2>
          </div>
          <p class="section-heading__copy">
            MAXで深く。<br />
            ULTRAで遠く。<br />
            スイッチを押して、熱量を上げろ。
          </p>
        </header>

        <div class="mode-console reveal-item" data-mode-panel data-mode="max">
          <div class="mode-console__visual" aria-hidden="true">
            <div class="mode-rings">
              <span class="mode-rings__ring mode-rings__ring--1"></span>
              <span class="mode-rings__ring mode-rings__ring--2"></span>
              <span class="mode-rings__ring mode-rings__ring--3"></span>
              <span class="mode-rings__core">S</span>
            </div>
            <div class="mode-console__readout">
              <span>CORE TEMP</span>
              <strong data-mode-temperature>5,600 K</strong>
            </div>
          </div>

          <div class="mode-console__content">
            <div class="mode-console__status">
              <span>ACTIVE MODE</span>
              <i aria-hidden="true"></i>
            </div>
            <div
              class="mode-copy"
              id="mode-copy"
              data-mode-live
              aria-live="polite"
              aria-atomic="true"
            >
              <p data-mode-label>MAX REASONING</p>
              <h3 data-mode-heading>深さに、上限をつくらない。</h3>
              <p data-mode-description>
                難しい問いほど、急がない。計画し、試し、見直し、
                答えの芯まで潜っていく。
              </p>
            </div>

            <button
              class="mode-toggle"
              type="button"
              aria-pressed="false"
              aria-controls="mode-copy"
              aria-label="ULTRAモードを切り替える"
              data-mode-toggle
            >
              <span class="mode-toggle__label">PUSH TO GO</span>
              <span class="mode-toggle__value" data-mode-button-label>ULTRA</span>
              <span class="mode-toggle__disc" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section class="lineup section-shell" id="lineup" aria-labelledby="lineup-title">
        <header class="section-heading reveal-item">
          <div class="section-heading__index">
            <span>03</span>
            <span>LINEUP</span>
          </div>
          <div>
            <p class="section-kicker">THE 5.6 FAMILY</p>
            <h2 id="lineup-title">太陽と、<br />大地と、月。</h2>
          </div>
          <p class="section-heading__copy">
            能力、速度、コスト。<br />
            目的に合わせて選べる、<br />
            3つの新しい名前。
          </p>
        </header>

        <div class="model-list">
          <article class="model-row model-row--sol reveal-item">
            <span class="model-row__index">01</span>
            <div class="model-row__name">
              <small>FLAGSHIP / DEEP</small>
              <h3>SOL</h3>
            </div>
            <p>最も野心的な仕事へ。<br />深く考え、最後まで進む。</p>
            <span class="model-row__symbol" aria-hidden="true">☀</span>
          </article>

          <article class="model-row reveal-item">
            <span class="model-row__index">02</span>
            <div class="model-row__name">
              <small>BALANCED / DAILY</small>
              <h3>TERRA</h3>
            </div>
            <p>日常業務の中心へ。<br />性能とコストをバランス。</p>
            <span class="model-row__symbol" aria-hidden="true">◉</span>
          </article>

          <article class="model-row reveal-item">
            <span class="model-row__index">03</span>
            <div class="model-row__name">
              <small>FAST / ACCESSIBLE</small>
              <h3>LUNA</h3>
            </div>
            <p>速さが必要な瞬間へ。<br />軽やかに、手頃に応える。</p>
            <span class="model-row__symbol" aria-hidden="true">◐</span>
          </article>
        </div>
      </section>

      <section class="finale" aria-labelledby="finale-title">
        <div class="finale__grid" aria-hidden="true"></div>
        <div class="finale__sun" aria-hidden="true">
          <span>SOL</span>
        </div>
        <div class="finale__content">
          <p class="section-kicker reveal-item">ONE LAST QUESTION</p>
          <h2 class="reveal-item" id="finale-title">
            そのプロンプト<br />
            に、<em>魂</em>はあるか。
          </h2>
          <p class="finale__lead reveal-item">
            答えを待つな。問いを研げ。<br />
            止まるな。進め。Ultra Sol!!!
          </p>
          <div class="button-row button-row--center reveal-item">
            <a
              class="button button--primary button--large"
              href="${OPENAI_URL}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GPT-5.6 Solを知る（新しいタブで開く）"
              data-openai-link
            >
              GPT-5.6 SOLを知る
              <span class="button__arrow" aria-hidden="true">↗</span>
            </a>
            <a
              class="button button--ghost button--large"
              href="${MUSIC_URL}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ultra Soulを聴く（新しいタブで開く）"
              data-music-link
            >
              <span class="equalizer" aria-hidden="true">
                <i></i><i></i><i></i>
              </span>
              Ultra Soulを聴く
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a class="brand brand--footer" href="#top">
        <span class="brand__mark" aria-hidden="true">US</span>
        <span class="brand__name">ULTRA SOL!!!</span>
      </a>
      <p>
        このサイトは個人制作の非公式パロディLPです。<br />
        OpenAIおよびB’zとは関係ありません。
      </p>
      <p class="site-footer__meta">
        NO AUTOPLAY. NO TRACKING. JUST HEAT.<br />
        <span>© 2026 ULTRA SOL EXPERIMENT</span>
      </p>
    </footer>
  `
}
