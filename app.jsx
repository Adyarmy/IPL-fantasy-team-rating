/* ── IPL Team Rating System — React App ── */

const { useState, useEffect, useMemo, useCallback } = React;

// ── Team metadata (colours & short names) ──
const TEAM_META = {
  CSK: { full: "Chennai Super Kings",    color: "#fbbf24" },
  DC:  { full: "Delhi Capitals",         color: "#3b82f6" },
  GT:  { full: "Gujarat Titans",         color: "#06b6d4" },
  KKR: { full: "Kolkata Knight Riders",  color: "#8b5cf6" },
  LSG: { full: "Lucknow Super Giants",   color: "#60a5fa" },
  MI:  { full: "Mumbai Indians",         color: "#3b82f6" },
  PK:  { full: "Punjab Kings",           color: "#ef4444" },
  RCB: { full: "Royal Challengers Bengaluru", color: "#ef4444" },
  RR:  { full: "Rajasthan Royals",       color: "#ec4899" },
  SRH: { full: "Sunrisers Hyderabad",    color: "#f97316" },
};

const ALL_TEAMS = Object.keys(TEAM_META);
const ROLES = ["All", "🏏 Batsman", "⚡ All-Rounder", "🎯 Bowler"];
const MAX_PLAYERS = 11;

// ── Helpers ──
function getRatingClass(rating) {
  if (rating >= 85) return "rating-elite";
  if (rating >= 65) return "rating-excellent";
  if (rating >= 55) return "rating-good";
  if (rating >= 40) return "rating-average";
  return "rating-below";
}

function getGradeClass(grade) {
  const g = grade.toLowerCase().replace(/\s+/g, "");
  if (g === "elite") return "grade-elite";
  if (g === "excellent") return "grade-excellent";
  if (g === "good") return "grade-good";
  if (g === "average") return "grade-average";
  return "grade-below";
}

function calcAvg(players) {
  if (!players.length) return 0;
  const sum = players.reduce((s, p) => s + p.rating, 0);
  return sum / players.length;
}

// ═══════════════════════════════════════════
//  PlayerCard Component
// ═══════════════════════════════════════════
function PlayerCard({ player, isSelected, isDisabled, onToggle }) {
  const cls = [
    "player-card",
    isSelected && "selected",
    isDisabled && "disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} onClick={() => !isDisabled && onToggle(player)} role="button" tabIndex={0}>
      <div className="player-card__icon">{player.icon.split(" ")[0]}</div>
      <div className="player-card__info">
        <div className="player-card__name">{player.name}</div>
        <div className="player-card__meta">
          <span className="player-card__role-tag">{player.role}</span>
          <span className={`grade-badge ${getGradeClass(player.grade)}`}>{player.grade}</span>
        </div>
      </div>
      <div className="player-card__rating">
        <div className={`player-card__rating-value ${getRatingClass(player.rating)}`}>
          {player.rating}
        </div>
        <div className="player-card__rating-label">Rating</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  PlayerPool Component
// ═══════════════════════════════════════════
function PlayerPool({ teamName, allPlayers, selectedPlayers, onTogglePlayer, side }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Reset filters when team changes
  useEffect(() => { setSearch(""); setRoleFilter("All"); }, [teamName]);

  const teamPlayers = useMemo(
    () => allPlayers.filter((p) => p.team === teamName),
    [allPlayers, teamName]
  );

  const filtered = useMemo(() => {
    return teamPlayers.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || p.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [teamPlayers, search, roleFilter]);

  const selectedNames = new Set(selectedPlayers.map((p) => p.name));
  const isFull = selectedPlayers.length >= MAX_PLAYERS;

  return (
    <div className="player-pool">
      <div className="player-pool__header">
        <div className="player-pool__title">
          Available Players
          <span className="player-pool__count">{teamPlayers.length}</span>
        </div>
      </div>
      <div className="player-pool__filters">
        <input
          className="search-input"
          type="text"
          placeholder="Search players…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id={`search-${side}`}
        />
        <div className="role-filters">
          {ROLES.map((r) => (
            <button
              key={r}
              className={`role-filter-btn ${roleFilter === r ? "active" : ""}`}
              onClick={() => setRoleFilter(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="player-cards">
        {filtered.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            isSelected={selectedNames.has(player.name)}
            isDisabled={!selectedNames.has(player.name) && isFull}
            onToggle={onTogglePlayer}
          />
        ))}
        {filtered.length === 0 && (
          <div className="team-panel__empty">No players match your filters.</div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  TeamPanel Component
// ═══════════════════════════════════════════
function TeamPanel({ side, teamName, selectedPlayers, onRemovePlayer, onReset }) {
  const avg = calcAvg(selectedPlayers);
  const panelCls = `team-panel team-panel--${side === "a" ? "a" : "b"}`;
  const meta = TEAM_META[teamName];

  return (
    <div className={panelCls}>
      <div className="team-panel__header">
        <div>
          <div className="team-panel__title">
            {meta ? meta.full : "Select a Team"}
          </div>
          <div className="team-panel__player-count">
            {selectedPlayers.length} / {MAX_PLAYERS} players selected
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="team-panel__avg">
            <div className="team-panel__avg-value">
              {selectedPlayers.length > 0 ? avg.toFixed(1) : "—"}
            </div>
            <div className="team-panel__avg-label">Avg Rating</div>
          </div>
          {selectedPlayers.length > 0 && (
            <button className="reset-btn" onClick={onReset}>Reset</button>
          )}
        </div>
      </div>
      <div className="team-panel__list">
        {selectedPlayers.length === 0 ? (
          <div className="team-panel__empty">
            Click players above to build your XI
          </div>
        ) : (
          selectedPlayers.map((p) => (
            <div className="team-panel__player" key={p.name}>
              <span className="team-panel__player-icon">{p.icon.split(" ")[0]}</span>
              <div>
                <div className="team-panel__player-name">{p.name}</div>
                <div className="team-panel__player-role">{p.role}</div>
              </div>
              <span className={`team-panel__player-rating ${getRatingClass(p.rating)}`}>
                {p.rating}
              </span>
              <button
                className="team-panel__player-remove"
                onClick={() => onRemovePlayer(p)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  ComparisonPanel Component
// ═══════════════════════════════════════════
function ComparisonPanel({ teamAName, teamBName, teamAPlayers, teamBPlayers }) {
  const avgA = calcAvg(teamAPlayers);
  const avgB = calcAvg(teamBPlayers);
  const diff = Math.abs(avgA - avgB);
  const hasPlayers = teamAPlayers.length > 0 && teamBPlayers.length > 0;

  const metaA = TEAM_META[teamAName];
  const metaB = TEAM_META[teamBName];

  const statusA = avgA > avgB ? "winner" : avgA < avgB ? "loser" : "tied";
  const statusB = avgB > avgA ? "winner" : avgB < avgA ? "loser" : "tied";

  const total = avgA + avgB || 1;
  const pctA = ((avgA / total) * 100).toFixed(1);
  const pctB = ((avgB / total) * 100).toFixed(1);

  if (!teamAName || !teamBName) return null;

  return (
    <div className="comparison-panel">
      <div className="comparison-panel__title">⚔️ Team Comparison</div>
      {!hasPlayers ? (
        <div className="comparison-panel__empty">
          Select players for both teams to see the comparison
        </div>
      ) : (
        <div className="comparison-panel__content">
          <div className="comparison-team comparison-team--a">
            <div className="comparison-team__name">{metaA?.full || teamAName}</div>
            <div className="comparison-team__rating">{avgA.toFixed(1)}</div>
            <div className={`comparison-team__status ${statusA}`}>
              {statusA === "winner" ? "🏆 Leading" : statusA === "loser" ? "Trailing" : "Tied"}
            </div>
          </div>
          <div className="comparison-diff">
            <div className="comparison-diff__label">Difference</div>
            <div className="comparison-diff__value">{diff.toFixed(1)}</div>
            <div className="comparison-diff__bar">
              <div className="comparison-diff__bar-a" style={{ width: `${pctA}%` }} />
              <div className="comparison-diff__bar-b" style={{ width: `${pctB}%` }} />
            </div>
          </div>
          <div className="comparison-team comparison-team--b">
            <div className="comparison-team__name">{metaB?.full || teamBName}</div>
            <div className="comparison-team__rating">{avgB.toFixed(1)}</div>
            <div className={`comparison-team__status ${statusB}`}>
              {statusB === "winner" ? "🏆 Leading" : statusB === "loser" ? "Trailing" : "Tied"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  TeamSelector Component
// ═══════════════════════════════════════════
function TeamSelector({ side, value, onChange, disabledValue }) {
  const cls = `team-selector team-selector--${side}`;
  const label = side === "a" ? "Team A" : "Team B";

  return (
    <div className={cls}>
      <div className="team-selector__label">
        <span className="team-selector__label-dot" />
        {label}
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)} id={`select-team-${side}`}>
        <option value="">— Choose a team —</option>
        {ALL_TEAMS.map((t) => (
          <option key={t} value={t} disabled={t === disabledValue}>
            {t} — {TEAM_META[t].full}
          </option>
        ))}
      </select>
    </div>
  );
}

// ═══════════════════════════════════════════
//  App (Root) Component
// ═══════════════════════════════════════════
function App() {
  const [players, setPlayers] = useState([]);
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [warning, setWarning] = useState("");

  // Load JSON data
  useEffect(() => {
    fetch("data/players.json")
      .then((r) => r.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Failed to load players:", err));
  }, []);

  // Show warning toast
  const showWarning = useCallback((msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(""), 2500);
  }, []);

  // Reset team players when team selection changes
  useEffect(() => { setTeamAPlayers([]); }, [teamAName]);
  useEffect(() => { setTeamBPlayers([]); }, [teamBName]);

  const togglePlayerA = useCallback((player) => {
    setTeamAPlayers((prev) => {
      const exists = prev.find((p) => p.name === player.name);
      if (exists) return prev.filter((p) => p.name !== player.name);
      if (prev.length >= MAX_PLAYERS) {
        showWarning(`⚠️ Team A already has ${MAX_PLAYERS} players!`);
        return prev;
      }
      return [...prev, player];
    });
  }, [showWarning]);

  const togglePlayerB = useCallback((player) => {
    setTeamBPlayers((prev) => {
      const exists = prev.find((p) => p.name === player.name);
      if (exists) return prev.filter((p) => p.name !== player.name);
      if (prev.length >= MAX_PLAYERS) {
        showWarning(`⚠️ Team B already has ${MAX_PLAYERS} players!`);
        return prev;
      }
      return [...prev, player];
    });
  }, [showWarning]);

  const removePlayerA = useCallback((player) => {
    setTeamAPlayers((prev) => prev.filter((p) => p.name !== player.name));
  }, []);

  const removePlayerB = useCallback((player) => {
    setTeamBPlayers((prev) => prev.filter((p) => p.name !== player.name));
  }, []);

  return (
    <div className="app">
      {/* Warning Toast */}
      <div className={`warning-toast ${warning ? "show" : ""}`}>{warning}</div>

      {/* Header */}
      <header className="header">
        <div className="header__logo">IPL Dream XI</div>
        <h1 className="header__title">Team Rating System</h1>
        <p className="header__subtitle">Build your dream XI and compare team strengths</p>
      </header>

      {/* Team Selectors */}
      <div className="team-selectors">
        <TeamSelector
          side="a"
          value={teamAName}
          onChange={setTeamAName}
          disabledValue={teamBName}
        />
        <div className="vs-badge">VS</div>
        <TeamSelector
          side="b"
          value={teamBName}
          onChange={setTeamBName}
          disabledValue={teamAName}
        />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* ── Team A Column ── */}
        <div className="team-section">
          {teamAName ? (
            <>
              <PlayerPool
                teamName={teamAName}
                allPlayers={players}
                selectedPlayers={teamAPlayers}
                onTogglePlayer={togglePlayerA}
                side="a"
              />
              <TeamPanel
                side="a"
                teamName={teamAName}
                selectedPlayers={teamAPlayers}
                onRemovePlayer={removePlayerA}
                onReset={() => setTeamAPlayers([])}
              />
            </>
          ) : (
            <div className="no-team">
              <div className="no-team__icon">🏏</div>
              <div className="no-team__text">Select Team A above to get started</div>
            </div>
          )}
        </div>

        {/* ── Team B Column ── */}
        <div className="team-section">
          {teamBName ? (
            <>
              <PlayerPool
                teamName={teamBName}
                allPlayers={players}
                selectedPlayers={teamBPlayers}
                onTogglePlayer={togglePlayerB}
                side="b"
              />
              <TeamPanel
                side="b"
                teamName={teamBName}
                selectedPlayers={teamBPlayers}
                onRemovePlayer={removePlayerB}
                onReset={() => setTeamBPlayers([])}
              />
            </>
          ) : (
            <div className="no-team">
              <div className="no-team__icon">🏏</div>
              <div className="no-team__text">Select Team B above to get started</div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Panel */}
      <ComparisonPanel
        teamAName={teamAName}
        teamBName={teamBName}
        teamAPlayers={teamAPlayers}
        teamBPlayers={teamBPlayers}
      />
    </div>
  );
}

// ── Mount ──
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
