import { useEffect, useMemo, useRef, useState } from "react";
import games from "../data/games.json";

const INTRO =
  "Explore browser game ports and recompilations. Some start instantly; others ask for game files from your own copy. Never install a launcher or extension a game site pushes on you.";

const FILTERS = [
  { id: "all", label: "all games" },
  { id: "instant", label: "instant play" },
  { id: "files", label: "needs game files" },
  { id: "multiplayer", label: "multiplayer" },
];

function Mark() {
  return <img className="mark" src="/logo.png?v=2" alt="TARZ0-777 logo" />;
}

function PixelSprite({ rows, palette, className }) {
  const width = Math.max(...rows.map((row) => row.length));
  const cells = [];
  rows.forEach((row, y) => {
    [...row].forEach((mark, x) => {
      const fill = palette[mark];
      if (fill) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />);
    });
  });
  return (
    <svg className={className} viewBox={`0 0 ${width} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">
      {cells}
    </svg>
  );
}

const CLOUD_ROWS = [
  "......oooooo..........",
  "....oo######oo...ooo..",
  "...o##########o.o##o..",
  "..o############o####o.",
  ".o###################o",
  ".o###################o",
  "..###################o",
  "...ooooooooooooooooo..",
];

const BLOOM_ROWS = [
  "......#####......",
  ".....##...##.....",
  "...##.......##...",
  "..#...........#..",
  ".#.............#.",
  ".#....#####....#.",
  "#....##...##....#",
  "#...#.......#...#",
  "#...#..###..#...#",
  "#...#..#p#..#...#",
  "#...#..###..#...#",
  "#...#.......#...#",
  "#....##...##....#",
  ".#....#####....#.",
  ".#.............#.",
  "..#...........#..",
  "...##.......##...",
  ".....##...##.....",
  "......#####......",
];

const FLOWER_ROWS = [
  "....yyy....",
  "..yygggyy..",
  ".ygggggggy.",
  "ygggppggggy",
  "ygggppggggy",
  ".ygggggggy.",
  "..yygggyy..",
  "....ggg....",
  ".....g.....",
  ".....g.....",
];

function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <PixelSprite className="cloud cloud-a" rows={CLOUD_ROWS} palette={{ o: "#ffffff", "#": "#d7d7e4" }} />
      <PixelSprite className="cloud cloud-b" rows={CLOUD_ROWS} palette={{ o: "#ffd0e6", "#": "#e23a8c" }} />
      <PixelSprite className="cloud cloud-c" rows={CLOUD_ROWS} palette={{ o: "#d9f3ff", "#": "#3aa0e0" }} />
      <PixelSprite className="cloud cloud-d" rows={CLOUD_ROWS} palette={{ o: "#fff3c4", "#": "#f0b429" }} />
      <PixelSprite className="bloom" rows={BLOOM_ROWS} palette={{ "#": "#3fae4a", p: "#e23a8c" }} />
      <PixelSprite className="flower flower-a" rows={FLOWER_ROWS} palette={{ y: "#7ed957", g: "#2f8f32", p: "#ff4fa3" }} />
      <PixelSprite className="flower flower-b" rows={FLOWER_ROWS} palette={{ y: "#7ec8ff", g: "#3a7bd4", p: "#ffe14a" }} />
    </div>
  );
}

const DINO_ROWS = [
  "........................######....",
  ".......................#gggggg#...",
  "......................#ggggggg#...",
  ".....................#ggweeggg#...",
  ".....................#ggggcggg#...",
  "....................#ggggggggg#...",
  "...................#ggbbbbbbbb#...",
  "..........####....#ggbbbbbbbbb#...",
  ".........#gggg#..#gggbbbbbbbbb#...",
  "........#gggggg##ggggbbbbbbbb#....",
  ".......#gggggggggggggbbbbbbb#.....",
  "......#ggggggggggggggbbbbbb#......",
  ".....#gggggggggggggggggggg#.......",
  "....#gggggggggggggggggggg#........",
  "...#ggddggddggddgggggggg#.........",
  "..#ggg##gg##gg##ggggggg#..........",
  "..#gg#..#..#..#..#gggg#...........",
  "...#..............#gg#............",
];

function SkaterButton() {
  const [flipping, setFlipping] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function kickflip() {
    if (flipping) return;
    setFlipping(true);
    timer.current = setTimeout(() => setFlipping(false), 720);
  }

  return (
    <button
      type="button"
      className={flipping ? "skater is-flipping" : "skater"}
      aria-label="Make the dino do a kickflip"
      onClick={kickflip}
    >
      <span className="speech">rawr! tap me</span>
      <span className="skater-sprite">
        <PixelSprite
          className="dino"
          rows={DINO_ROWS}
          palette={{
            "#": "#141414",
            g: "#6ed24a",
            b: "#d8f7c4",
            d: "#2f9a3a",
            w: "#ffffff",
            e: "#141414",
            c: "#ff4fa3",
          }}
        />
        <svg className="board" viewBox="0 0 34 8" shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="0" width="30" height="1" fill="#141414" />
          <rect x="1" y="1" width="32" height="2" fill="#e23a8c" />
          <rect x="0" y="1" width="1" height="2" fill="#141414" />
          <rect x="33" y="1" width="1" height="2" fill="#141414" />
          <rect x="1" y="3" width="32" height="1" fill="#141414" />
          <g className="wheel wheel-a">
            <rect x="4" y="4" width="5" height="1" fill="#141414" />
            <rect x="3" y="5" width="1" height="2" fill="#141414" />
            <rect x="9" y="5" width="1" height="2" fill="#141414" />
            <rect x="4" y="5" width="5" height="2" fill="#ececec" />
            <rect x="6" y="5" width="1" height="2" fill="#9a9a9a" />
            <rect x="4" y="7" width="5" height="1" fill="#141414" />
          </g>
          <g className="wheel wheel-b">
            <rect x="24" y="4" width="5" height="1" fill="#141414" />
            <rect x="23" y="5" width="1" height="2" fill="#141414" />
            <rect x="29" y="5" width="1" height="2" fill="#141414" />
            <rect x="24" y="5" width="5" height="2" fill="#ececec" />
            <rect x="26" y="5" width="1" height="2" fill="#9a9a9a" />
            <rect x="24" y="7" width="5" height="1" fill="#141414" />
          </g>
        </svg>
      </span>
    </button>
  );
}

function PixelLine({ text, className }) {
  return (
    <span className={`hero-line ${className}`}>
      {[...text].map((character, index) =>
        character === " " ? (
          <span key={index} className="hero-space"> </span>
        ) : (
          <span key={index} className="hero-letter" style={{ animationDelay: `${index * 45}ms` }}>
            {character}
          </span>
        ),
      )}
    </span>
  );
}

function GameCard({ game }) {
  const [broken, setBroken] = useState(false);
  const facts = game.facts?.length ? game.facts.join(" · ") : "browser launch";
  const showArt = Boolean(game.image) && !broken;

  return (
    <article className="card">
      <div className="cover">
        {showArt ? (
          <img
            className="game-art"
            src={game.image}
            alt={`${game.name} game image`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setBroken(true)}
          />
        ) : (
          <span className="emblem">{game.mark}</span>
        )}
        <span className="cover-tag">{game.tag}</span>
      </div>
      <div className="meta">
        <h3 className="title" title={game.name}>{game.name}</h3>
        <p className="sub">
          <b>{game.platform}</b> · {facts}
        </p>
        <a className="play-link" href={game.url} target="_blank" rel="noopener noreferrer">
          play now
        </a>
        <a className="url-link" href={game.url} target="_blank" rel="noopener noreferrer">
          {game.url}
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    document.title = "TARZ0-777";
  }, []);

  const tags = useMemo(() => {
    const unique = [...new Set(games.map((game) => String(game.tag || "browser").toLowerCase()))];
    return unique.length ? unique : ["arcade"];
  }, [games]);

  const counts = useMemo(
    () => ({
      instant: games.filter((game) => game.facts?.includes("plays instantly")).length,
      files: games.filter((game) => game.facts?.includes("needs your game files")).length,
      multi: games.filter((game) => game.facts?.includes("multiplayer")).length,
    }),
    [games],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((game) => {
      const text = `${game.name} ${game.platform} ${(game.facts || []).join(" ")} ${game.url} ${game.tag}`.toLowerCase();
      const matchesFilter =
        active === "all" ||
        (active === "instant" && game.facts?.includes("plays instantly")) ||
        (active === "files" && game.facts?.includes("needs your game files")) ||
        (active === "multiplayer" && game.facts?.includes("multiplayer"));
      return matchesFilter && (!q || text.includes(q));
    });
  }, [active, games, query]);

  const ticker = [...tags, ...tags];

  return (
    <div className="lab">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TARZ0-777, back to top">
          <Mark />
          <span>TARZ0-777</span>
        </a>
        <div className="top-actions">
          <a className="pixel-btn" href="#arcade">play now</a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen ? (
          <nav className="menu" aria-label="Site">
            <a href="#about" onClick={() => setMenuOpen(false)}>who we are</a>
            <a href="#arcade" onClick={() => setMenuOpen(false)}>the arcade</a>
            <a href="#levels" onClick={() => setMenuOpen(false)}>how to play</a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="headline">
          <Sky />
          <p className="badge">browser arcade</p>
          <h1 id="headline">
            <PixelLine text="TARZ0-777" className="hero-line-a" />
            <PixelLine text="play games in" className="hero-line-b" />
            <PixelLine text="your browser" className="hero-line-b" />
          </h1>
          <SkaterButton />
          <p className="hero-kicker">every launch stays one click away</p>
          <div className="hero-copy">
            <p>A directory of browser game ports and recompilations.</p>
            <p>{INTRO}</p>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {ticker.map((tag, index) => (
              <span key={`${tag}-${index}`}>{tag}</span>
            ))}
          </div>
        </div>

        <section className="about" id="about">
          <p className="kicker">about tarz0-777</p>
          <h2>the arcade, listed in full</h2>
          <p className="about-lead">
            {games.length} browser launches live on this page. Names, platforms, and play links are the same catalog, set in a pixel arcade frame.
          </p>
          <div className="stats">
            <article>
              <strong>{games.length}</strong>
              <span>games listed</span>
            </article>
            <article>
              <strong>{counts.instant}</strong>
              <span>instant play</span>
            </article>
            <article>
              <strong>{counts.files}</strong>
              <span>need your files</span>
            </article>
            <article>
              <strong>{counts.multi}</strong>
              <span>multiplayer</span>
            </article>
          </div>
        </section>

        <section className="arcade" id="arcade" aria-labelledby="arcade-title">
          <div className="section-head">
            <div>
              <p className="kicker">the arcade</p>
              <h2 id="arcade-title">pick a game</h2>
            </div>
            <p>
              {shown.length} {shown.length === 1 ? "game" : "games"}
            </p>
          </div>
          <div className="controls">
            <label className="search-wrap">
              <span className="sr-only">Search games</span>
              <input
                className="search"
                type="search"
                placeholder="search a name or url"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="filters" role="group" aria-label="Filter games">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  className="filter"
                  type="button"
                  aria-pressed={active === filter.id}
                  onClick={() => setActive(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid">
            {shown.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className={`empty${shown.length ? "" : " show"}`}>No games match that search. Try another title or filter.</div>
        </section>

        <section className="levels" id="levels">
          <p className="kicker">how to play</p>
          <h2>from search to launch</h2>
          <ol>
            <li>
              <span>level 01</span>
              <h3>find it</h3>
              <p>Search the name or filter for instant play, game files, or multiplayer.</p>
            </li>
            <li>
              <span>level 02</span>
              <h3>check the link</h3>
              <p>Every card shows the full URL under the title, so you can see where Play goes.</p>
            </li>
            <li>
              <span>level 03</span>
              <h3>open it</h3>
              <p>Play now opens that game in a new tab. Some ports ask for files from a copy you own.</p>
            </li>
          </ol>
          <aside className="notice">
            <strong>Third-party destinations. Rights and safety are not verified here.</strong>
            <p>
              Selecting play opens the listed game URL. Never install a launcher or extension a game site prompts you to install.{" "}
              <a href="https://github.com/SubmitGame/awesome-decomp-games#play-in-your-browser" target="_blank" rel="noopener noreferrer">
                view the source list
              </a>
            </p>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <Mark />
            <span>TARZ0-777</span>
          </a>
          <p>Browser game names, covers, and links. Play opens the URL on the card.</p>
        </div>
        <div>
          <h2>explore</h2>
          <a href="#about">who we are</a>
          <a href="#arcade">the arcade</a>
          <a href="#levels">how to play</a>
        </div>
        <div>
          <h2>say hi</h2>
          <p>Game names belong to their respective owners.</p>
          <a className="pixel-btn" href="#arcade">play now</a>
        </div>
        <p className="legal">© {year} TARZ0-777. All game links stay with their own sites.</p>
        <p className="built-by">
          built by{" "}
          <a href="https://x.com/shan_dharan" target="_blank" rel="noopener noreferrer">
            @shan_dharan
          </a>
        </p>
      </footer>
    </div>
  );
}
