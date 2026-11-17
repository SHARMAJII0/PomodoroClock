(() => {
  "use strict";

  const MIN_LENGTH = 1;   // minutes (never goes below 0)
  const MAX_LENGTH = 99;

  const state = {
    sessionLength: 20,    // minutes
    breakLength: 5,       // minutes
    mode: "session",      // "session" | "break"
    sessionCount: 1,
    remaining: 20 * 60,   // seconds
    running: false,
    paused: false,
    intervalId: null,
    endTime: 0,
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    face: $("timer-face"),
    progress: $("progress"),
    time: $("time-left"),
    label: $("label"),
    sessionLen: $("session-length"),
    breakLen: $("break-length"),
    sInc: $("session-increment"),
    sDec: $("session-decrement"),
    bInc: $("break-increment"),
    bDec: $("break-decrement"),
    start: $("start-btn"),
    reset: $("reset-btn"),
  };

  const pad = (n) => String(n).padStart(2, "0");
  const formatTime = (secs) => `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`;
  const totalSeconds = () =>
    (state.mode === "session" ? state.sessionLength : state.breakLength) * 60;

  function render() {
    els.sessionLen.textContent = state.sessionLength;
    els.breakLen.textContent = state.breakLength;
    els.time.textContent = formatTime(state.remaining);
    els.label.textContent =
      state.mode === "session" ? `Session ${state.sessionCount}` : "Break!";
    els.face.classList.toggle("break", state.mode === "break");

    const elapsed = totalSeconds() - state.remaining;
    els.progress.style.height = `${(elapsed / totalSeconds()) * 100}%`;

    // Disable +/- while the timer has been started
    const locked = state.running || state.paused;
    [els.sInc, els.sDec, els.bInc, els.bDec].forEach((b) => (b.disabled = locked));
    els.start.textContent = state.running ? "Pause" : state.paused ? "Resume" : "Start";
  }

  function adjust(key, delta) {
    if (state.running || state.paused) return;
    const next = state[key] + delta;
    if (next < MIN_LENGTH || next > MAX_LENGTH) return;
    state[key] = next;
    if (state.mode === "session") state.remaining = state.sessionLength * 60;
    render();
  }

  function switchMode() {
    if (state.mode === "session") {
      state.mode = "break";
    } else {
      state.mode = "session";
      state.sessionCount += 1;
    }
    state.remaining = totalSeconds();
    state.endTime = Date.now() + state.remaining * 1000;
  }

  function tick() {
    const left = Math.round((state.endTime - Date.now()) / 1000);
    if (left <= 0) {
      switchMode();          // break <-> session, loops until reset
    } else {
      state.remaining = left;
    }
    render();
  }

  function start() {
    state.running = true;
    state.paused = false;
    state.endTime = Date.now() + state.remaining * 1000;
    state.intervalId = setInterval(tick, 250);
    render();
  }

  function pause() {
    clearInterval(state.intervalId);
    state.running = false;
    state.paused = true;
    render();
  }

  function reset() {
    clearInterval(state.intervalId);
    state.running = false;
    state.paused = false;
    state.mode = "session";
    state.sessionCount = 1;
    state.remaining = state.sessionLength * 60;
    render();
  }

  els.sInc.addEventListener("click", () => adjust("sessionLength", 1));
  els.sDec.addEventListener("click", () => adjust("sessionLength", -1));
  els.bInc.addEventListener("click", () => adjust("breakLength", 1));
  els.bDec.addEventListener("click", () => adjust("breakLength", -1));
  els.start.addEventListener("click", () => (state.running ? pause() : start()));
  els.reset.addEventListener("click", reset);

  render();
})();
