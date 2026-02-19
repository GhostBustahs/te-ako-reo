// ═══════════════════════════════════════════════════════════
// LOGIC — Spaced repetition, mastery tracking, smart rotation
// ═══════════════════════════════════════════════════════════

let mode='flash', topic='ao', cur=null, revealed=false;
let xp=0, level=1, wrongQueue=[], mastered={}, seenThisSession=[];
let stats={correct:0, total:0};

const topicLbl={ao:'A/O Pūriro', kupu:'Tūpou', tense:'Rerenga', mix:'Katoa'};

function rand(arr){return arr[Math.floor(Math.random()*arr.length)];}

// ═══════════════════════════════════════════════════════════
// SMART ROTATION — Avoids repeats, tracks mastery
// ═══════════════════════════════════════════════════════════
function getNext(){
  // 40% chance to pull from wrong queue (spaced repetition)
  if(wrongQueue.length && Math.random()<0.4){
    return wrongQueue.shift();
  }
  
  // Filter out mastered & recently seen items
  const pool=data[topic].filter(item=>{
    const id=item.q;
    const gotCorrect3Times=mastered[id]>=3;
    const seenInLast20=seenThisSession.slice(-20).includes(id);
    return !gotCorrect3Times && !seenInLast20;
  });
  
  // If pool is empty, allow mastered items back in (still avoid recent)
  const fallbackPool=data[topic].filter(item=>{
    const id=item.q;
    const seenInLast10=seenThisSession.slice(-10).includes(id);
    return !seenInLast10;
  });
  
  const finalPool=pool.length?pool:fallbackPool;
  const item=finalPool.length?rand(finalPool):rand(data[topic]);
  
  seenThisSession.push(item.q);
  return item;
}

function markCorrect(item){
  const id=item.q;
  mastered[id]=(mastered[id]||0)+1;
}

function markWrong(item){
  wrongQueue.push(item);
  // Add it 2x more if really struggling (appears more often)
  if(wrongQueue.filter(i=>i.q===item.q).length<3){
    wrongQueue.push(item);
    wrongQueue.push(item);
  }
  // Reset mastery counter
  mastered[item.q]=0;
}

function addXP(amount){
  xp+=amount;
  document.getElementById('xp').textContent=xp;
  // Level up every 100 XP
  const newLvl=Math.floor(xp/100)+1;
  if(newLvl>level){
    level=newLvl;
    document.getElementById('lvl').textContent=level;
    celebrate();
  }
  updateRing();
}

function updateRing(){
  const progress=(xp%100)/100;
  const offset=264-(264*progress);
  document.getElementById('ring').style.strokeDashoffset=offset;
}

function celebrate(){
  document.getElementById('fire').textContent='🎉';
  setTimeout(()=>document.getElementById('fire').textContent='🔥',2000);
}

// ═══════════════════════════════════════════════════════════
// MODE/TOPIC SWITCHING
// ═══════════════════════════════════════════════════════════
function setMode(m){
  mode=m;
  ['flash','blank','build'].forEach(x=>{
    document.getElementById('p-'+x).style.display=x===m?'block':'none';
    document.getElementById('t-'+x).classList.toggle('on',x===m);
  });
  load();
}

function setTopic(t){
  topic=t;
  ['ao','kupu','tense','mix'].forEach(x=>{
    document.getElementById('tp-'+x).classList.toggle('on',x===t);
  });
  load();
}

function load(){
  if(mode==='flash')loadFlash();
  else if(mode==='blank')loadBlank();
  else loadBuild();
}

// ═══════════════════════════════════════════════════════════
// FLASHCARD MODE
// ═══════════════════════════════════════════════════════════
function loadFlash(){
  cur=getNext();
  revealed=false;
  document.getElementById('lbl').textContent='Kāri · '+topicLbl[topic];
  document.getElementById('fcq').textContent=cur.q;
  document.getElementById('fcsub').textContent=cur.sub||'';
  document.getElementById('fcreo').textContent=cur.reo;
  document.getElementById('fcnote').textContent=cur.note;
  document.getElementById('fca').classList.remove('show');
  document.getElementById('fcbtn').textContent='Huri · Reveal';
}

function fcAction(){
  if(!revealed){
    document.getElementById('fca').classList.add('show');
    document.getElementById('fcbtn').textContent='Panuku →';
    revealed=true;
    stats.correct++;
    stats.total++;
    markCorrect(cur);
    addXP(10);
  }else{
    loadFlash();
  }
}

// ═══════════════════════════════════════════════════════════
// FILL BLANK MODE
// ═══════════════════════════════════════════════════════════
function loadBlank(){
  cur=getNext();
  document.getElementById('blq').textContent=cur.blank.replace('_____','_______');
  const inp=document.getElementById('blinp');
  inp.value='';
  inp.className='inp';
  document.getElementById('blfb').className='fb';
  document.getElementById('blbtn').textContent='Tika?';
  document.getElementById('blbtn').onclick=blCheck;
  setTimeout(()=>inp.focus(),100);
}

function blCheck(){
  const inp=document.getElementById('blinp');
  const fb=document.getElementById('blfb');
  const userAns=inp.value.trim().toLowerCase();
  const correctAns=cur.ans.toLowerCase();
  const ok=userAns===correctAns;
  
  inp.classList.remove('ok','ng');
  inp.classList.add(ok?'ok':'ng');
  fb.classList.remove('ok','ng','show');
  
  if(ok){
    fb.textContent='✓ Tino tika! Ka rawe!';
    fb.classList.add('ok','show');
    stats.correct++;
    markCorrect(cur);
    addXP(15);
  }else{
    fb.innerHTML=`✗ Hē — <b>${cur.ans}</b>`;
    fb.classList.add('ng','show');
    markWrong(cur);
  }
  
  stats.total++;
  document.getElementById('blbtn').textContent='Panuku →';
  document.getElementById('blbtn').onclick=loadBlank;
}

// ═══════════════════════════════════════════════════════════
// SENTENCE BUILDER MODE
// ═══════════════════════════════════════════════════════════
let placed=[], opts=[];

function loadBuild(){
  const pool=data[topic].filter(d=>d.build);
  cur=pool.length?getNext():rand(data[topic]);
  if(!cur.build){setMode('blank');return;}
  
  document.getElementById('bdq').textContent=cur.sub||'Build the sentence:';
  const words=cur.build.split(' ');
  placed=[];
  opts=[...words].sort(()=>Math.random()-0.5);
  document.getElementById('bdfb').className='fb';
  renderBuild();
}

function renderBuild(){
  const zone=document.getElementById('bdzone');
  zone.innerHTML='';
  placed.forEach((w,i)=>{
    const c=document.createElement('span');
    c.className='chip placed';
    c.textContent=w;
    c.onclick=()=>{opts.push(placed.splice(i,1)[0]);renderBuild();};
    zone.appendChild(c);
  });
  
  const opt=document.getElementById('bdopt');
  opt.innerHTML='';
  opts.forEach((w,i)=>{
    const c=document.createElement('span');
    c.className='chip';
    c.textContent=w;
    c.onclick=()=>{placed.push(opts.splice(i,1)[0]);renderBuild();};
    opt.appendChild(c);
  });
}

function bdCheck(){
  const ans=cur.build.split(' ');
  const ok=placed.length===ans.length&&placed.every((w,i)=>w===ans[i]);
  const fb=document.getElementById('bdfb');
  fb.classList.remove('ok','ng','show');
  
  if(ok){
    fb.textContent='✓ Tino tika! Ka rawe!';
    fb.classList.add('ok','show');
    stats.correct++;
    markCorrect(cur);
    addXP(20);
    setTimeout(loadBuild,1500);
  }else{
    fb.innerHTML=`✗ Hē — <b>${cur.build}</b>`;
    fb.classList.add('ng','show');
    markWrong(cur);
  }
  
  stats.total++;
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  if(e.code==='Space'){
    e.preventDefault();
    if(mode==='flash')fcAction();
  }
  if(e.key==='Enter'){
    if(mode==='blank')blCheck();
    else if(mode==='build')bdCheck();
  }
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
load();
