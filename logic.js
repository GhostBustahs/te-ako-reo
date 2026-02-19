// ═══════════════════════════════════════════════════════════
// LOGIC — Spaced repetition, mastery tracking, smart rotation
// ═══════════════════════════════════════════════════════════
// AUDIT FIXES APPLIED:
//   CRIT-1: Flash double-rate race condition — revealed guard
//   CRIT-2: Blank double-submit via Enter — blankChecked flag
//   CRIT-3: Build double-submit during auto-advance — buildChecked flag
//   CRIT-4: (Data fix — duplicate q values made unique)
//   MAJ-1:  blsub element now in HTML + regex extraction
//   MAJ-2:  Fallback for sub text without parentheses (kupu)
//   MAJ-3:  Wrong weights scoped to current topic
//   MAJ-5:  Build mode strips answer hints from sub
//   MAJ-6:  seenThisSession trimmed to prevent unbounded growth
//   MAJ-7:  (Data fix — comma mismatch)
//   UX:     Empty-input guard, Fisher-Yates shuffle, macron-tolerant matching
// ═══════════════════════════════════════════════════════════

let mode='flash', topic='ao', cur=null, revealed=false;
let xp=0, level=1, mastered={}, seenThisSession=[];
let stats={correct:0, total:0};
let blankChecked=false, buildChecked=false;

// Weight map replaces duplicated wrongQueue
let wrongWeights = {}; // { questionId: mistakeCount }

const topicLbl={ao:'A/O Pūriro', kupu:'Tūpou', tense:'Rerenga', mix:'Katoa'};

function rand(arr){return arr[Math.floor(Math.random()*arr.length)];}

// Fisher-Yates shuffle (replaces biased Math.random sort)
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// Normalize macrons for tolerant comparison
function normalizeMacrons(s){
  return s.toLowerCase()
    .replace(/ā/g,'a').replace(/ē/g,'e').replace(/ī/g,'i')
    .replace(/ō/g,'o').replace(/ū/g,'u');
}

// Extract clean English hint from sub text
function extractHint(sub){
  if(!sub) return '';
  const match = sub.match(/\(([^)]+)\)/);
  if(match) return match[1];
  // Fallback: strip Build:/Fill:/Choose: prefix
  return sub.replace(/^(Build|Fill|Choose)[:\s]*/i,'');
}

// ═══════════════════════════════════════════════════════════
// SMART ROTATION — Avoids repeats, tracks mastery
// ═══════════════════════════════════════════════════════════

// MAJ-3: Weighted selection scoped to current topic
function getWrongItem(){
  const topicQs = new Set(data[topic].map(d=>d.q));
  const wrongIds = Object.keys(wrongWeights).filter(id => wrongWeights[id]>0 && topicQs.has(id));
  if(!wrongIds.length) return null;

  // Build weighted pool: higher mistake count = more likely to appear
  const weighted = [];
  wrongIds.forEach(id => {
    const weight = Math.min(wrongWeights[id], 5); // Cap at 5x weight
    for(let i=0; i<weight; i++) weighted.push(id);
  });

  const pickedId = rand(weighted);
  const item = data[topic].find(d => d.q===pickedId);

  // Decay the weight each time it's shown
  if(item) wrongWeights[pickedId] = Math.max(0, wrongWeights[pickedId]-1);

  return item || null;
}

function getNext(){
  // Safety check for missing topic data
  if(!data[topic] || !data[topic].length){
    console.warn(`No data for topic "${topic}", falling back to "ao"`);
    topic = 'ao';
  }

  const poolSize = data[topic].length;

  // Adaptive seen window — scales to pool size
  const seenWindow = Math.min(20, Math.floor(poolSize * 0.4));
  const fallbackWindow = Math.min(10, Math.floor(poolSize * 0.2));

  // 40% chance to pull from wrong items (spaced repetition)
  if(Object.keys(wrongWeights).some(id => wrongWeights[id]>0) && Math.random()<0.4){
    const wrongItem = getWrongItem();
    if(wrongItem){
      seenThisSession.push(wrongItem.q);
      return wrongItem;
    }
  }

  // Filter out mastered & recently seen items
  const recentSeen = seenThisSession.slice(-seenWindow);
  const pool = data[topic].filter(item => {
    const id = item.q;
    return !(mastered[id]>=3) && !recentSeen.includes(id);
  });

  // Fallback: allow mastered items back, smaller seen window
  const fallbackRecent = seenThisSession.slice(-fallbackWindow);
  const fallbackPool = data[topic].filter(item => {
    return !fallbackRecent.includes(item.q);
  });

  const finalPool = pool.length ? pool : (fallbackPool.length ? fallbackPool : data[topic]);
  const item = rand(finalPool);

  seenThisSession.push(item.q);

  // MAJ-6: Trim session memory to prevent unbounded growth
  if(seenThisSession.length > 100) seenThisSession = seenThisSession.slice(-50);

  return item;
}

function markCorrect(item){
  const id = item.q;
  mastered[id] = (mastered[id]||0) + 1;
  // Clear from wrong weights if they got it right
  if(wrongWeights[id]) wrongWeights[id] = Math.max(0, wrongWeights[id]-1);
}

function markWrong(item){
  const id = item.q;
  wrongWeights[id] = (wrongWeights[id]||0) + 2; // +2 per mistake
  // Reset mastery counter
  mastered[id] = 0;
}

function addXP(amount){
  xp += amount;
  document.getElementById('xp').textContent = xp;
  const newLvl = Math.floor(xp/100) + 1;
  if(newLvl > level){
    level = newLvl;
    document.getElementById('lvl').textContent = level;
    celebrate();
  }
  updateRing();
}

function updateRing(){
  const progress = (xp%100)/100;
  const offset = 264-(264*progress);
  document.getElementById('ring').style.strokeDashoffset = offset;
}

function celebrate(){
  document.getElementById('fire').textContent = '🎉';
  setTimeout(()=>document.getElementById('fire').textContent='🔥', 2000);
}

// ═══════════════════════════════════════════════════════════
// MODE/TOPIC SWITCHING
// ═══════════════════════════════════════════════════════════
function setMode(m){
  mode = m;
  ['flash','blank','build'].forEach(x => {
    document.getElementById('p-'+x).style.display = x===m ? 'block' : 'none';
    document.getElementById('t-'+x).classList.toggle('on', x===m);
  });
  load();
}

function setTopic(t){
  // Validate topic exists before switching
  if(!data[t] || !data[t].length){
    console.warn(`Topic "${t}" has no data`);
    return;
  }
  topic = t;
  ['ao','kupu','tense','mix'].forEach(x => {
    document.getElementById('tp-'+x).classList.toggle('on', x===t);
  });
  load();
}

function load(){
  if(mode==='flash') loadFlash();
  else if(mode==='blank') loadBlank();
  else loadBuild();
}

// ═══════════════════════════════════════════════════════════
// FLASHCARD MODE — Self-rating with race-condition guard
// ═══════════════════════════════════════════════════════════
function loadFlash(){
  cur = getNext();
  revealed = false;
  document.getElementById('lbl').textContent = 'Kāri · '+topicLbl[topic];
  document.getElementById('fcq').textContent = cur.q;
  document.getElementById('fcsub').textContent = cur.sub || '';
  document.getElementById('fcreo').textContent = cur.reo;
  document.getElementById('fcnote').textContent = cur.note;
  document.getElementById('fca').classList.remove('show');

  // Show reveal button, hide rating buttons
  document.getElementById('fcbtn').textContent = 'Huri · Reveal';
  document.getElementById('fcbtn').style.display = '';
  hideRatingBtns();
}

function fcAction(){
  if(!revealed){
    // Just reveal — don't mark anything yet
    document.getElementById('fca').classList.add('show');
    document.getElementById('fcbtn').style.display = 'none';
    revealed = true;
    showRatingBtns();
  }
}

// Rating buttons for flash mode
function showRatingBtns(){
  let container = document.getElementById('fc-rating');
  if(!container){
    // Create rating buttons dynamically
    container = document.createElement('div');
    container.id = 'fc-rating';
    container.style.cssText = 'display:flex;gap:12px;justify-content:center;margin-top:16px;';

    const btnKnew = document.createElement('button');
    btnKnew.id = 'fc-knew';
    btnKnew.textContent = '✓ I mōhio · Knew it';
    btnKnew.className = 'btn ok-btn';
    btnKnew.onclick = ()=>fcRate(true);

    const btnDidnt = document.createElement('button');
    btnDidnt.id = 'fc-didnt';
    btnDidnt.textContent = '✗ Kāo · Didn\'t know';
    btnDidnt.className = 'btn ng-btn';
    btnDidnt.onclick = ()=>fcRate(false);

    container.appendChild(btnKnew);
    container.appendChild(btnDidnt);

    // Insert after the reveal button
    const fcbtn = document.getElementById('fcbtn');
    fcbtn.parentNode.insertBefore(container, fcbtn.nextSibling);

    // Style the rating buttons
    const style = document.createElement('style');
    style.textContent = `
      .ok-btn { background:#22c55e; color:#fff; border:none; padding:10px 20px; border-radius:10px; font-size:1rem; cursor:pointer; font-weight:600; flex:1; max-width:200px; }
      .ok-btn:hover { background:#16a34a; }
      .ng-btn { background:#ef4444; color:#fff; border:none; padding:10px 20px; border-radius:10px; font-size:1rem; cursor:pointer; font-weight:600; flex:1; max-width:200px; }
      .ng-btn:hover { background:#dc2626; }
    `;
    document.head.appendChild(style);
  }
  container.style.display = 'flex';
}

function hideRatingBtns(){
  const container = document.getElementById('fc-rating');
  if(container) container.style.display = 'none';
}

// CRIT-1 FIX: Guard prevents double-fire during 400ms delay
function fcRate(knew){
  if(!revealed) return;   // already rated or not yet revealed
  revealed = false;        // lock out further rates on this card
  stats.total++;
  if(knew){
    stats.correct++;
    markCorrect(cur);
    addXP(10);
  } else {
    markWrong(cur);
  }
  hideRatingBtns();
  setTimeout(loadFlash, 400);
}

// ═══════════════════════════════════════════════════════════
// FILL BLANK MODE — With hint extraction and double-submit guard
// ═══════════════════════════════════════════════════════════
function loadBlank(){
  cur = getNext();
  blankChecked = false;   // CRIT-2: reset submit guard
  document.getElementById('blq').textContent = cur.blank.replace('_____','_______');

  // MAJ-1 + MAJ-2: Show clean English hint (no answer leak)
  const blSub = document.getElementById('blsub');
  if(blSub){
    blSub.textContent = extractHint(cur.sub);
  }

  const inp = document.getElementById('blinp');
  inp.value = '';
  inp.className = 'inp';
  document.getElementById('blfb').className = 'fb';
  document.getElementById('blbtn').textContent = 'Tika?';
  document.getElementById('blbtn').onclick = blCheck;
  setTimeout(()=>inp.focus(), 100);
}

function blCheck(){
  // CRIT-2: Second press acts as "next card"
  if(blankChecked){ loadBlank(); return; }

  const inp = document.getElementById('blinp');
  const fb = document.getElementById('blfb');
  const userAns = inp.value.trim();

  // UX: Don't penalise empty submissions
  if(!userAns) return;

  blankChecked = true;   // lock out re-check on this card

  const correctAns = cur.ans;
  // Exact match (case-insensitive)
  const exactOk = userAns.toLowerCase() === correctAns.toLowerCase();
  // Macron-tolerant match
  const macronOk = !exactOk && normalizeMacrons(userAns) === normalizeMacrons(correctAns);
  const ok = exactOk || macronOk;

  inp.classList.remove('ok','ng');
  inp.classList.add(ok ? 'ok' : 'ng');
  fb.classList.remove('ok','ng','show');

  if(exactOk){
    fb.textContent = '✓ Tino tika! Ka rawe!';
    fb.classList.add('ok','show');
    stats.correct++;
    markCorrect(cur);
    addXP(15);
  } else if(macronOk){
    fb.innerHTML = `✓ Tika — watch your tohutō: <b>${correctAns}</b>`;
    fb.classList.add('ok','show');
    stats.correct++;
    markCorrect(cur);
    addXP(10);  // Reduced XP for macron-tolerant match
  } else {
    fb.innerHTML = `✗ Hē — <b>${correctAns}</b>`;
    fb.classList.add('ng','show');
    markWrong(cur);
  }

  stats.total++;
  document.getElementById('blbtn').textContent = 'Panuku →';
  document.getElementById('blbtn').onclick = loadBlank;
}

// ═══════════════════════════════════════════════════════════
// SENTENCE BUILDER MODE — With double-submit guard and clean hints
// ═══════════════════════════════════════════════════════════
let placed=[], opts=[];

function loadBuild(){
  buildChecked = false;   // CRIT-3: reset submit guard
  const pool = data[topic].filter(d=>d.build);
  cur = pool.length ? getNext() : rand(data[topic]);
  if(!cur.build){ setMode('blank'); return; }

  // MAJ-5: Show only English hint, not "Fill: answer" text
  document.getElementById('bdq').textContent = extractHint(cur.sub) || 'Build the sentence:';

  const words = cur.build.split(' ');
  placed = [];
  opts = shuffle([...words]);   // Fisher-Yates instead of biased sort
  document.getElementById('bdfb').className = 'fb';
  renderBuild();
}

function renderBuild(){
  const zone = document.getElementById('bdzone');
  zone.innerHTML = '';
  placed.forEach((w,i) => {
    const c = document.createElement('span');
    c.className = 'chip placed';
    c.textContent = w;
    c.onclick = ()=>{ opts.push(placed.splice(i,1)[0]); renderBuild(); };
    zone.appendChild(c);
  });

  const opt = document.getElementById('bdopt');
  opt.innerHTML = '';
  opts.forEach((w,i) => {
    const c = document.createElement('span');
    c.className = 'chip';
    c.textContent = w;
    c.onclick = ()=>{ placed.push(opts.splice(i,1)[0]); renderBuild(); };
    opt.appendChild(c);
  });
}

function bdCheck(){
  // CRIT-3: Prevent double-submit during 1.5s auto-advance
  if(buildChecked) return;
  buildChecked = true;

  const ans = cur.build.split(' ');
  const ok = placed.length===ans.length && placed.every((w,i)=>w===ans[i]);
  const fb = document.getElementById('bdfb');
  fb.classList.remove('ok','ng','show');

  if(ok){
    fb.textContent = '✓ Tino tika! Ka rawe!';
    fb.classList.add('ok','show');
    stats.correct++;
    markCorrect(cur);
    addXP(20);
    setTimeout(loadBuild, 1500);
  } else {
    fb.innerHTML = `✗ Hē — <b>${cur.build}</b>`;
    fb.classList.add('ng','show');
    markWrong(cur);
    // Allow retry after seeing the answer
    setTimeout(()=>{ buildChecked=false; }, 1500);
  }

  stats.total++;
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if(e.target.tagName==='INPUT') return;
  if(e.code==='Space'){
    e.preventDefault();
    if(mode==='flash'){
      if(!revealed) fcAction();
    }
  }
  // Flash rating (CRIT-1: revealed guard inside fcRate prevents double-fire)
  if(mode==='flash' && revealed){
    if(e.key==='1' || e.key==='ArrowRight') fcRate(true);
    if(e.key==='2' || e.key==='ArrowLeft') fcRate(false);
  }
  if(e.key==='Enter'){
    // CRIT-2: blCheck now handles both "check" and "next" states
    if(mode==='blank') blCheck();
    else if(mode==='build') bdCheck();
  }
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
load();
