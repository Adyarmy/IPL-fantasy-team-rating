/* ══════════════════════════════════════════════════════════════
   IPL Team Rating System — Dream XI Builder
   Select 2 teams → Pick 11 from 22 → See your Dream XI rating
   ══════════════════════════════════════════════════════════════ */

var h = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;
var useMemo = React.useMemo;
var useCallback = React.useCallback;
var Fragment = React.Fragment;

// ── Player Data ──
var PLAYERS_DATA = [
  {name:"MS Dhoni",team:"CSK",role:"\u{1F3CF} Batsman",rating:89.9,icon:"\u{1F3C6} Elite",grade:"Elite"},
  {name:"Ambati Rayudu",team:"CSK",role:"\u{1F3CF} Batsman",rating:74.6,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Ruturaj Gaikwad",team:"CSK",role:"\u{1F3CF} Batsman",rating:65.7,icon:"\u2705 Good",grade:"Excellent"},
  {name:"Dwayne Bravo",team:"CSK",role:"\u26A1 All-Rounder",rating:60.4,icon:"\u2705 Good",grade:"Good"},
  {name:"Devon Conway",team:"CSK",role:"\u{1F3CF} Batsman",rating:59.8,icon:"\u2705 Good",grade:"Good"},
  {name:"Ravindra Jadeja",team:"CSK",role:"\u26A1 All-Rounder",rating:57.6,icon:"\u2705 Good",grade:"Good"},
  {name:"Moeen Ali",team:"CSK",role:"\u26A1 All-Rounder",rating:39.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Jagadeesan Narayan",team:"CSK",role:"\u{1F3CF} Batsman",rating:37.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shivam Dube",team:"CSK",role:"\u26A1 All-Rounder",rating:28.8,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Mitchell Santner",team:"CSK",role:"\u26A1 All-Rounder",rating:28.1,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Prashant Solanki",team:"CSK",role:"\u{1F3AF} Bowler",rating:27.1,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"David Warner",team:"DC",role:"\u{1F3CF} Batsman",rating:92.2,icon:"\u{1F3C6} Elite",grade:"Elite"},
  {name:"Rishabh Pant",team:"DC",role:"\u{1F3CF} Batsman",rating:73.8,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Prithvi Shaw",team:"DC",role:"\u{1F3CF} Batsman",rating:58.3,icon:"\u2705 Good",grade:"Good"},
  {name:"Mandeep Singh",team:"DC",role:"\u{1F3CF} Batsman",rating:49.4,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Axar Patel",team:"DC",role:"\u26A1 All-Rounder",rating:45.5,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Rovman Powell",team:"DC",role:"\u{1F3CF} Batsman",rating:45.2,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Sarfaraz Khan",team:"DC",role:"\u{1F3CF} Batsman",rating:44.7,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Srikar Bharat",team:"DC",role:"\u{1F3CF} Batsman",rating:43.7,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Kuldeep Yadav",team:"DC",role:"\u{1F3AF} Bowler",rating:35.1,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Mitchell Marsh",team:"DC",role:"\u26A1 All-Rounder",rating:34.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shardul Thakur",team:"DC",role:"\u26A1 All-Rounder",rating:34.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"David Miller",team:"GT",role:"\u{1F3CF} Batsman",rating:74.1,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Shubman Gill",team:"GT",role:"\u{1F3CF} Batsman",rating:63.5,icon:"\u2705 Good",grade:"Good"},
  {name:"Wriddhiman Saha",team:"GT",role:"\u{1F3CF} Batsman",rating:63.2,icon:"\u2705 Good",grade:"Good"},
  {name:"Sai Sudharsan",team:"GT",role:"\u{1F3CF} Batsman",rating:50.6,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Hardik Pandya",team:"GT",role:"\u26A1 All-Rounder",rating:47.3,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Rashid Khan",team:"GT",role:"\u26A1 All-Rounder",rating:45.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Mohammad Shami",team:"GT",role:"\u{1F3AF} Bowler",rating:44.1,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Abhinav Manohar",team:"GT",role:"\u{1F3CF} Batsman",rating:37.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Rahul Tewatia",team:"GT",role:"\u26A1 All-Rounder",rating:36.0,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Vijay Shankar",team:"GT",role:"\u26A1 All-Rounder",rating:30.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Matthew Wade",team:"GT",role:"\u{1F3CF} Batsman",rating:28.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Ajinkya Rahane",team:"KKR",role:"\u{1F3CF} Batsman",rating:75.1,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Shreyas Iyer",team:"KKR",role:"\u{1F3CF} Batsman",rating:70.2,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Nitish Rana",team:"KKR",role:"\u{1F3CF} Batsman",rating:63.4,icon:"\u2705 Good",grade:"Good"},
  {name:"Sunil Narine",team:"KKR",role:"\u26A1 All-Rounder",rating:56.0,icon:"\u2705 Good",grade:"Good"},
  {name:"Andre Russell",team:"KKR",role:"\u26A1 All-Rounder",rating:55.3,icon:"\u2705 Good",grade:"Good"},
  {name:"Umesh Yadav",team:"KKR",role:"\u{1F3AF} Bowler",rating:54.5,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Sam Billings",team:"KKR",role:"\u{1F3CF} Batsman",rating:40.1,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Rinku Singh",team:"KKR",role:"\u{1F3CF} Batsman",rating:38.4,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Pat Cummins",team:"KKR",role:"\u26A1 All-Rounder",rating:35.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Varun Chakaravarthy",team:"KKR",role:"\u{1F3AF} Bowler",rating:32.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Venkatesh Iyer",team:"KKR",role:"\u26A1 All-Rounder",rating:29.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"K L Rahul",team:"LSG",role:"\u{1F3CF} Batsman",rating:90.2,icon:"\u{1F3C6} Elite",grade:"Elite"},
  {name:"Manish Pandey",team:"LSG",role:"\u{1F3CF} Batsman",rating:71.7,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Quinton De Kock",team:"LSG",role:"\u{1F3CF} Batsman",rating:70.2,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Evin Lewis",team:"LSG",role:"\u{1F3CF} Batsman",rating:49.0,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Manan Vohra",team:"LSG",role:"\u{1F3CF} Batsman",rating:45.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Krunal Pandya",team:"LSG",role:"\u26A1 All-Rounder",rating:41.7,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Marcus Stoinis",team:"LSG",role:"\u26A1 All-Rounder",rating:37.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Ayush Badoni",team:"LSG",role:"\u26A1 All-Rounder",rating:35.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Mohsin Khan",team:"LSG",role:"\u{1F3AF} Bowler",rating:33.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Jason Holder",team:"LSG",role:"\u26A1 All-Rounder",rating:31.8,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Avesh Khan",team:"LSG",role:"\u{1F3AF} Bowler",rating:31.8,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Rohit Sharma",team:"MI",role:"\u{1F3CF} Batsman",rating:81.7,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Suryakumar Yadav",team:"MI",role:"\u{1F3CF} Batsman",rating:68.8,icon:"\u2705 Good",grade:"Excellent"},
  {name:"Jasprit Bumrah",team:"MI",role:"\u{1F3AF} Bowler",rating:61.4,icon:"\u2705 Good",grade:"Good"},
  {name:"Ishan Kishan",team:"MI",role:"\u{1F3CF} Batsman",rating:60.8,icon:"\u2705 Good",grade:"Good"},
  {name:"Tilak Varma",team:"MI",role:"\u{1F3CF} Batsman",rating:52.9,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Dewald Brevis",team:"MI",role:"\u26A1 All-Rounder",rating:44.3,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Jaydev Unadkat",team:"MI",role:"\u{1F3AF} Bowler",rating:40.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Ramandeep Singh",team:"MI",role:"\u{1F3CF} Batsman",rating:35.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Tim David",team:"MI",role:"\u26A1 All-Rounder",rating:28.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Murugan Ashwin",team:"MI",role:"\u{1F3AF} Bowler",rating:27.4,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Anmolpreet Singh",team:"MI",role:"\u{1F3CF} Batsman",rating:24.4,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shikhar Dhawan",team:"PK",role:"\u{1F3CF} Batsman",rating:83.0,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Jonny Bairstow",team:"PK",role:"\u{1F3CF} Batsman",rating:65.8,icon:"\u2705 Good",grade:"Excellent"},
  {name:"Mayank Agarwal",team:"PK",role:"\u{1F3CF} Batsman",rating:61.7,icon:"\u2705 Good",grade:"Good"},
  {name:"Sandeep Sharma",team:"PK",role:"\u{1F3AF} Bowler",rating:51.1,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Jitesh Sharma",team:"PK",role:"\u{1F3CF} Batsman",rating:50.2,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Kagiso Rabada",team:"PK",role:"\u{1F3AF} Bowler",rating:47.7,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Bhanuka Rajapaksa",team:"PK",role:"\u{1F3CF} Batsman",rating:44.1,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Rahul Chahar",team:"PK",role:"\u{1F3AF} Bowler",rating:36.5,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shahrukh Khan",team:"PK",role:"\u{1F3CF} Batsman",rating:35.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Liam Livingstone",team:"PK",role:"\u26A1 All-Rounder",rating:34.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Harpreet Brar",team:"PK",role:"\u26A1 All-Rounder",rating:31.8,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Virat Kohli",team:"RCB",role:"\u{1F3CF} Batsman",rating:86.5,icon:"\u{1F3C6} Elite",grade:"Elite"},
  {name:"Dinesh Karthik",team:"RCB",role:"\u{1F3CF} Batsman",rating:76.3,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Faf Du Plessis",team:"RCB",role:"\u{1F3CF} Batsman",rating:75.2,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Rajat Patidar",team:"RCB",role:"\u{1F3CF} Batsman",rating:61.4,icon:"\u2705 Good",grade:"Good"},
  {name:"Glenn Maxwell",team:"RCB",role:"\u26A1 All-Rounder",rating:44.4,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Harshal Patel",team:"RCB",role:"\u26A1 All-Rounder",rating:38.5,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Mohammed Siraj",team:"RCB",role:"\u{1F3AF} Bowler",rating:31.2,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Anuj Rawat",team:"RCB",role:"\u{1F3CF} Batsman",rating:29.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Josh Hazlewood",team:"RCB",role:"\u{1F3AF} Bowler",rating:29.4,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Suyash S Prabhudessai",team:"RCB",role:"\u{1F3CF} Batsman",rating:28.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shahbaz Ahmed",team:"RCB",role:"\u26A1 All-Rounder",rating:26.6,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Jos Buttler",team:"RR",role:"\u{1F3CF} Batsman",rating:79.1,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Sanju Samson",team:"RR",role:"\u{1F3CF} Batsman",rating:73.2,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Yuzvendra Chahal",team:"RR",role:"\u{1F3AF} Bowler",rating:67.0,icon:"\u2705 Good",grade:"Excellent"},
  {name:"Devdutt Padikkal",team:"RR",role:"\u{1F3CF} Batsman",rating:55.4,icon:"\u2705 Good",grade:"Good"},
  {name:"Shimron Hetmyer",team:"RR",role:"\u{1F3CF} Batsman",rating:54.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Karun Nair",team:"RR",role:"\u{1F3CF} Batsman",rating:52.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Ravichandran Ashwin",team:"RR",role:"\u26A1 All-Rounder",rating:51.8,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Yashasvi Jaiswal",team:"RR",role:"\u{1F3CF} Batsman",rating:44.6,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Trent Boult",team:"RR",role:"\u{1F3AF} Bowler",rating:43.4,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Nathan Coulter-Nile",team:"RR",role:"\u{1F3AF} Bowler",rating:34.5,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Prasidh Krishna",team:"RR",role:"\u{1F3AF} Bowler",rating:27.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Kane Williamson",team:"SRH",role:"\u{1F3CF} Batsman",rating:70.4,icon:"\u2B50 Excellent",grade:"Excellent"},
  {name:"Bhuvneshwar Kumar",team:"SRH",role:"\u{1F3AF} Bowler",rating:64.1,icon:"\u2705 Good",grade:"Good"},
  {name:"Rahul Tripathi",team:"SRH",role:"\u{1F3CF} Batsman",rating:59.3,icon:"\u2705 Good",grade:"Good"},
  {name:"Nicholas Pooran",team:"SRH",role:"\u{1F3CF} Batsman",rating:51.6,icon:"\u{1F4CA} Average",grade:"Average"},
  {name:"Shashank Singh",team:"SRH",role:"\u{1F3CF} Batsman",rating:36.9,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Abhishek Sharma",team:"SRH",role:"\u26A1 All-Rounder",rating:36.8,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Aiden Markram",team:"SRH",role:"\u26A1 All-Rounder",rating:33.7,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Priyam Garg",team:"SRH",role:"\u{1F3CF} Batsman",rating:32.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Shreyas Gopal",team:"SRH",role:"\u26A1 All-Rounder",rating:30.7,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Washington Sundar",team:"SRH",role:"\u26A1 All-Rounder",rating:30.3,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"},
  {name:"Romario Shepherd",team:"SRH",role:"\u26A1 All-Rounder",rating:28.1,icon:"\u{1F4C9} Below Avg",grade:"Below Avg"}
];

// ── Team metadata ──
var TEAM_META = {
  CSK: { full: "Chennai Super Kings", color: "#fbbf24", short: "CSK" },
  DC:  { full: "Delhi Capitals", color: "#3b82f6", short: "DC" },
  GT:  { full: "Gujarat Titans", color: "#06b6d4", short: "GT" },
  KKR: { full: "Kolkata Knight Riders", color: "#8b5cf6", short: "KKR" },
  LSG: { full: "Lucknow Super Giants", color: "#60a5fa", short: "LSG" },
  MI:  { full: "Mumbai Indians", color: "#3b82f6", short: "MI" },
  PK:  { full: "Punjab Kings", color: "#ef4444", short: "PK" },
  RCB: { full: "Royal Challengers Bengaluru", color: "#ef4444", short: "RCB" },
  RR:  { full: "Rajasthan Royals", color: "#ec4899", short: "RR" },
  SRH: { full: "Sunrisers Hyderabad", color: "#f97316", short: "SRH" }
};

var ALL_TEAMS = Object.keys(TEAM_META);
var ROLES = ["All", "\u{1F3CF} Batsman", "\u26A1 All-Rounder", "\u{1F3AF} Bowler"];
var MAX_PLAYERS = 11;

// ── Helpers ──
function getRatingClass(r) {
  if (r >= 85) return "rating-elite";
  if (r >= 65) return "rating-excellent";
  if (r >= 55) return "rating-good";
  if (r >= 40) return "rating-average";
  return "rating-below";
}
function getGradeClass(g) {
  var s = g.toLowerCase().replace(/\s+/g, "");
  if (s === "elite") return "grade-elite";
  if (s === "excellent") return "grade-excellent";
  if (s === "good") return "grade-good";
  if (s === "average") return "grade-average";
  return "grade-below";
}
function calcAvg(players) {
  if (!players.length) return 0;
  return players.reduce(function(s, p) { return s + p.rating; }, 0) / players.length;
}
function ico(icon) { return icon.split(" ")[0]; }

// ═══════════════════════════════════════════
//  PlayerCard — shows in the combined pool
// ═══════════════════════════════════════════
function PlayerCard(props) {
  var p = props.player, sel = props.isSelected, dis = props.isDisabled, toggle = props.onToggle;
  var teamColor = TEAM_META[p.team] ? TEAM_META[p.team].color : "#888";

  return h("div", {
    className: "player-card" + (sel ? " selected" : "") + (dis ? " disabled" : ""),
    onClick: function() { if (!dis) toggle(p); },
    role: "button", tabIndex: 0
  },
    // team colour accent
    h("div", { className: "player-card__team-bar", style: { background: teamColor } }),
    h("div", { className: "player-card__icon" }, ico(p.icon)),
    h("div", { className: "player-card__info" },
      h("div", { className: "player-card__name" }, p.name),
      h("div", { className: "player-card__meta" },
        h("span", { className: "player-card__team-tag", style: { color: teamColor, borderColor: teamColor } }, p.team),
        h("span", { className: "player-card__role-tag" }, p.role),
        h("span", { className: "grade-badge " + getGradeClass(p.grade) }, p.grade)
      )
    )
  );
}

// ═══════════════════════════════════════════
//  CombinedPool — shows all 22 players
// ═══════════════════════════════════════════
function CombinedPool(props) {
  var allPlayers = props.allPlayers;
  var teamA = props.teamA;
  var teamB = props.teamB;
  var selected = props.selected;
  var onToggle = props.onToggle;

  var searchState = useState("");
  var search = searchState[0], setSearch = searchState[1];
  var roleState = useState("All");
  var roleFilter = roleState[0], setRoleFilter = roleState[1];
  var teamFilterState = useState("All");
  var teamFilter = teamFilterState[0], setTeamFilter = teamFilterState[1];

  useEffect(function() { setSearch(""); setRoleFilter("All"); setTeamFilter("All"); }, [teamA, teamB]);

  var poolPlayers = useMemo(function() {
    return allPlayers.filter(function(p) { return p.team === teamA || p.team === teamB; });
  }, [allPlayers, teamA, teamB]);

  var filtered = useMemo(function() {
    return poolPlayers.filter(function(p) {
      var ms = p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      var mr = roleFilter === "All" || p.role === roleFilter;
      var mt = teamFilter === "All" || p.team === teamFilter;
      return ms && mr && mt;
    });
  }, [poolPlayers, search, roleFilter, teamFilter]);

  var selNames = {};
  selected.forEach(function(p) { selNames[p.name] = true; });
  var isFull = selected.length >= MAX_PLAYERS;

  return h("div", { className: "player-pool combined-pool" },
    h("div", { className: "player-pool__header" },
      h("div", { className: "player-pool__title" },
        "Pick Your Dream XI ",
        h("span", { className: "player-pool__count" }, selected.length + " / " + MAX_PLAYERS)
      ),
      h("div", { className: "player-pool__total" }, poolPlayers.length + " players available")
    ),
    h("div", { className: "player-pool__filters" },
      h("input", {
        className: "search-input", type: "text",
        placeholder: "Search players\u2026",
        value: search,
        onChange: function(e) { setSearch(e.target.value); },
        id: "search-pool"
      }),
      h("div", { className: "filter-row" },
        // Team filter
        h("div", { className: "role-filters" },
          ["All", teamA, teamB].map(function(t) {
            return h("button", {
              key: "team-" + t,
              className: "role-filter-btn " + (teamFilter === t ? "active" : ""),
              onClick: function() { setTeamFilter(t); },
              style: t !== "All" && TEAM_META[t] ? { borderColor: TEAM_META[t].color, color: teamFilter === t ? "#fff" : TEAM_META[t].color, background: teamFilter === t ? TEAM_META[t].color + "33" : "transparent" } : {}
            }, t === "All" ? "All Teams" : t);
          })
        ),
        // Role filter
        h("div", { className: "role-filters" },
          ROLES.map(function(r) {
            return h("button", {
              key: r,
              className: "role-filter-btn " + (roleFilter === r ? "active" : ""),
              onClick: function() { setRoleFilter(r); }
            }, r);
          })
        )
      )
    ),
    h("div", { className: "player-cards" },
      filtered.map(function(player) {
        return h(PlayerCard, {
          key: player.name,
          player: player,
          isSelected: !!selNames[player.name],
          isDisabled: !selNames[player.name] && isFull,
          onToggle: onToggle
        });
      }),
      filtered.length === 0 ? h("div", { className: "team-panel__empty" }, "No players match your filters.") : null
    )
  );
}

// ═══════════════════════════════════════════
//  DreamXIPanel — shows selected 11
// ═══════════════════════════════════════════
function DreamXIPanel(props) {
  var selected = props.selected;
  var onRemove = props.onRemove;
  var onReset = props.onReset;

  var avg = calcAvg(selected);
  var isFull = selected.length === MAX_PLAYERS;

  // Count by team
  var teamCounts = {};
  selected.forEach(function(p) {
    teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
  });

  return h("div", { className: "dream-xi-panel" + (isFull ? " complete" : "") },
    h("div", { className: "dream-xi-panel__header" },
      h("div", null,
        h("div", { className: "dream-xi-panel__title" },
          isFull ? "\u{1F3C6} Your Dream XI" : "\u{1F3CF} Building Your XI"
        ),
        h("div", { className: "dream-xi-panel__player-count" },
          selected.length + " / " + MAX_PLAYERS + " players selected",
          Object.keys(teamCounts).length > 0 ? " \u2022 " + Object.keys(teamCounts).map(function(t) { return t + ": " + teamCounts[t]; }).join(", ") : ""
        )
      ),
      h("div", { style: { display: "flex", alignItems: "center", gap: "16px" } },
        h("div", { className: "dream-xi-panel__avg" },
          h("div", { className: "dream-xi-panel__avg-value" + (isFull ? " complete" : "") },
            isFull ? avg.toFixed(1) : "???"
          ),
          h("div", { className: "dream-xi-panel__avg-label" },
            isFull ? "Final Rating" : "Rating Hidden"
          )
        ),
        selected.length > 0 ? h("button", { className: "reset-btn", onClick: onReset }, "Reset") : null
      )
    ),
    h("div", { className: "dream-xi-panel__list" },
      selected.length === 0
        ? h("div", { className: "team-panel__empty" }, "Click player cards above to build your Dream XI")
        : selected.map(function(p, i) {
            var teamColor = TEAM_META[p.team] ? TEAM_META[p.team].color : "#888";
            return h("div", { className: "dream-xi-player", key: p.name },
              h("span", { className: "dream-xi-player__num" }, i + 1),
              h("span", { className: "dream-xi-player__icon" }, ico(p.icon)),
              h("div", { className: "dream-xi-player__info" },
                h("div", { className: "dream-xi-player__name" }, p.name),
                h("div", { className: "dream-xi-player__meta" },
                  h("span", { className: "dream-xi-player__team", style: { color: teamColor } }, p.team),
                  h("span", { className: "dream-xi-player__role" }, p.role)
                )
              ),
              h("button", {
                className: "team-panel__player-remove",
                onClick: function() { onRemove(p); },
                title: "Remove"
              }, "\u2715")
            );
          })
    ),
    // Summary bar when full
    isFull ? h("div", { className: "dream-xi-panel__summary" },
      h("div", { className: "dream-xi-panel__summary-item" },
        h("span", { className: "summary-label" }, "Total Rating"),
        h("span", { className: "summary-value" }, selected.reduce(function(s,p){return s+p.rating;},0).toFixed(1))
      ),
      h("div", { className: "dream-xi-panel__summary-item" },
        h("span", { className: "summary-label" }, "Average Rating"),
        h("span", { className: "summary-value highlight" }, avg.toFixed(1))
      ),
      h("div", { className: "dream-xi-panel__summary-item" },
        h("span", { className: "summary-label" }, "Highest"),
        h("span", { className: "summary-value" }, Math.max.apply(null, selected.map(function(p){return p.rating;})).toFixed(1))
      ),
      h("div", { className: "dream-xi-panel__summary-item" },
        h("span", { className: "summary-label" }, "Lowest"),
        h("span", { className: "summary-value" }, Math.min.apply(null, selected.map(function(p){return p.rating;})).toFixed(1))
      )
    ) : null
  );
}

// ═══════════════════════════════════════════
//  TeamSelector
// ═══════════════════════════════════════════
function TeamSelector(props) {
  var side = props.side, value = props.value, onChange = props.onChange, disabledValue = props.disabledValue;
  var cls = "team-selector team-selector--" + side;
  var label = side === "a" ? "Team 1" : "Team 2";

  return h("div", { className: cls },
    h("div", { className: "team-selector__label" },
      h("span", { className: "team-selector__label-dot" }),
      " " + label
    ),
    h("select", {
      value: value,
      onChange: function(e) { onChange(e.target.value); },
      id: "select-team-" + side
    },
      h("option", { value: "" }, "\u2014 Choose a team \u2014"),
      ALL_TEAMS.map(function(t) {
        return h("option", { key: t, value: t, disabled: t === disabledValue },
          t + " \u2014 " + TEAM_META[t].full
        );
      })
    )
  );
}

// ═══════════════════════════════════════════
//  App
// ═══════════════════════════════════════════
function App() {
  var players = PLAYERS_DATA;

  var teamAState = useState(""); var teamA = teamAState[0], setTeamA = teamAState[1];
  var teamBState = useState(""); var teamB = teamBState[0], setTeamB = teamBState[1];
  var selectedState = useState([]); var selected = selectedState[0], setSelected = selectedState[1];
  var warningState = useState(""); var warning = warningState[0], setWarning = warningState[1];

  var showWarning = useCallback(function(msg) {
    setWarning(msg);
    setTimeout(function() { setWarning(""); }, 2500);
  }, []);

  // Reset selected when teams change
  useEffect(function() { setSelected([]); }, [teamA, teamB]);

  var togglePlayer = useCallback(function(player) {
    setSelected(function(prev) {
      var exists = prev.find(function(p) { return p.name === player.name; });
      if (exists) return prev.filter(function(p) { return p.name !== player.name; });
      
      var isBatsman = player.role.indexOf("Batsman") !== -1;
      var batsmenCount = prev.filter(function(p) { return p.role.indexOf("Batsman") !== -1; }).length;
      
      if (isBatsman && batsmenCount >= 6) {
        showWarning("\u26A0\uFE0F Must select at least 5 Bowlers or All-Rounders!");
        return prev;
      }

      if (prev.length >= MAX_PLAYERS) {
        showWarning("\u26A0\uFE0F Dream XI already has " + MAX_PLAYERS + " players!");
        return prev;
      }
      return prev.concat([player]);
    });
  }, [showWarning]);

  var removePlayer = useCallback(function(player) {
    setSelected(function(prev) { return prev.filter(function(p) { return p.name !== player.name; }); });
  }, []);

  var bothSelected = teamA && teamB;

  return h("div", { className: "app" },
    h("div", { className: "warning-toast " + (warning ? "show" : "") }, warning),

    h("header", { className: "header" },
      h("div", { className: "header__logo" }, "IPL Dream XI"),
      h("h1", { className: "header__title" }, "Dream XI Builder"),
      h("p", { className: "header__subtitle" }, "Choose 2 teams \u2022 Pick 11 from 22 \u2022 Build your ultimate XI")
    ),

    // Team Selectors
    h("div", { className: "team-selectors" },
      h(TeamSelector, { side: "a", value: teamA, onChange: setTeamA, disabledValue: teamB }),
      h("div", { className: "vs-badge" }, "VS"),
      h(TeamSelector, { side: "b", value: teamB, onChange: setTeamB, disabledValue: teamA })
    ),

    // Main content
    bothSelected
      ? h("div", { className: "dream-layout" },
          h(CombinedPool, {
            allPlayers: players,
            teamA: teamA,
            teamB: teamB,
            selected: selected,
            onToggle: togglePlayer
          }),
          h(DreamXIPanel, {
            selected: selected,
            onRemove: removePlayer,
            onReset: function() { setSelected([]); }
          })
        )
      : h("div", { className: "no-team" },
          h("div", { className: "no-team__icon" }, "\u{1F3CF}"),
          h("div", { className: "no-team__text" },
            !teamA && !teamB ? "Select both teams above to start building your Dream XI"
              : "Now select the second team to see all 22 players"
          )
        )
  );
}

// Mount
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(App));
