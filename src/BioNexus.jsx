
import { useState, useEffect, useRef, useCallback } from "react";

// ─── THREE.JS LOADER ──────────────────────────────────────────────────────────
function useThree() {
  const [THREE, setTHREE] = useState(null);
  useEffect(() => {
    if (window.THREE) { setTHREE(window.THREE); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = () => setTHREE(window.THREE);
    document.head.appendChild(s);
  }, []);
  return THREE;
}

// ══════════════════════════════════════════════════════════════════════════════
//  GLOBAL CSS
// ══════════════════════════════════════════════════════════════════════════════
const G = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --neu-bg:#e8ecf0;--neu-bg2:#eef1f5;--neu-light:#fff;
  --nsd:rgba(163,177,198,0.6);--nsl:rgba(255,255,255,0.9);
  --nid:rgba(163,177,198,0.5);--nil:rgba(255,255,255,0.7);
  --nt:#4a5568;--ntl:#718096;--na:#f6a623;
  --dk:#0a0e1a;--dkp:#0f1424;--dkc:#141829;--dkc2:#1a1f32;
  --db:rgba(255,255,255,0.06);--db2:rgba(100,149,237,0.2);
  --dt:#e2e8f0;--dt2:#94a3b8;--dt3:#475569;
  --bl:#6495ed;--bl2:#7eb3ff;--tl:#2dd4bf;
  --gr:#34d399;--am:#fbbf24;--ro:#f43f5e;--vi:#a78bfa;
  --gt:rgba(100,149,237,0.1);
  --f1:'Playfair Display',serif;--f2:'Manrope',sans-serif;--f3:'IBM Plex Mono',monospace;
}
html,body{font-family:var(--f2);background:var(--dk);color:var(--dt);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(100,149,237,0.3);border-radius:2px}
button{cursor:pointer;font-family:var(--f2);border:none;outline:none}
input,textarea,select{font-family:var(--f2);outline:none}

/* NEUMORPHIC */
.nc{background:var(--neu-bg);border-radius:24px;box-shadow:12px 12px 28px var(--nsd),-8px -8px 20px var(--nsl)}
.nc-sm{background:var(--neu-bg);border-radius:16px;box-shadow:8px 8px 18px var(--nsd),-5px -5px 14px var(--nsl)}
.ni{background:var(--neu-bg);border-radius:50px;box-shadow:inset 4px 4px 10px var(--nid),inset -4px -4px 10px var(--nil)}
.nb{background:var(--neu-bg);border-radius:50px;padding:14px 28px;font-weight:700;font-size:.95rem;color:var(--nt);box-shadow:5px 5px 14px var(--nsd),-4px -4px 10px var(--nsl);transition:all .18s;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none}
.nb:hover{box-shadow:7px 7px 18px var(--nsd),-5px -5px 14px var(--nsl);transform:translateY(-1px)}
.nb:active{box-shadow:inset 3px 3px 8px var(--nid),inset -3px -3px 8px var(--nil);transform:translateY(0)}
.nb-acc{background:linear-gradient(135deg,#5a6a7a,#6b7a8d);color:#fff}
.nb-acc:hover{background:linear-gradient(135deg,#4a5a6a,#5b6a7d)}
.n-inp{width:100%;background:var(--neu-bg);border-radius:50px;padding:14px 22px;font-size:.9rem;color:var(--nt);box-shadow:inset 4px 4px 10px var(--nid),inset -4px -4px 10px var(--nil);border:none;transition:all .18s}
.n-inp:focus{box-shadow:inset 5px 5px 12px var(--nid),inset -5px -5px 12px var(--nil),0 0 0 2px rgba(246,166,35,.3)}
.n-inp::placeholder{color:#a0aec0}
.n-lbl{display:block;font-size:.82rem;font-weight:600;color:var(--nt);margin-bottom:10px;margin-left:6px}
.n-tog{width:46px;height:24px;border-radius:12px;background:var(--neu-bg);box-shadow:inset 3px 3px 7px var(--nid),inset -3px -3px 7px var(--nil);position:relative;cursor:pointer;flex-shrink:0;transition:all .22s}
.n-tog.on{background:var(--na);box-shadow:inset 2px 2px 5px rgba(0,0,0,.2)}
.n-tog::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;box-shadow:2px 2px 5px rgba(0,0,0,.2);transition:left .22s cubic-bezier(.34,1.56,.64,1)}
.n-tog.on::after{left:25px}.n-tog.off::after{left:3px}
.n-soc{width:52px;height:52px;border-radius:50%;background:var(--neu-bg);cursor:pointer;box-shadow:5px 5px 12px var(--nsd),-4px -4px 10px var(--nsl);display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;color:var(--nt);transition:all .18s;border:none}
.n-soc:hover{transform:translateY(-2px);box-shadow:7px 7px 16px var(--nsd),-5px -5px 12px var(--nsl)}
.n-chk{width:22px;height:22px;border-radius:6px;flex-shrink:0;background:var(--neu-bg);box-shadow:inset 2px 2px 6px var(--nid),inset -2px -2px 6px var(--nil);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .18s}
.n-chk.on{background:var(--na);box-shadow:2px 2px 6px var(--nsd)}

/* LAYOUT */
.shell{display:flex;min-height:100vh}
.rail{width:64px;min-height:100vh;background:#111520;border-right:1px solid rgba(255,255,255,.04);display:flex;flex-direction:column;align-items:center;padding:1rem 0;position:fixed;left:0;top:0;bottom:0;z-index:300}
.r-logo{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,var(--bl),var(--tl));display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:1.5rem;box-shadow:0 0 20px rgba(100,149,237,.3);cursor:pointer}
.ri{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer;margin:2px 0;color:var(--dt3);transition:all .18s;position:relative}
.ri:hover{background:rgba(100,149,237,.12);color:var(--dt2)}
.ri.active{background:rgba(100,149,237,.18);color:var(--bl2)}
.ri.active::before{content:'';position:absolute;left:0;top:25%;bottom:25%;width:2.5px;background:var(--bl2);border-radius:0 2px 2px 0}
.ri-tip{position:absolute;left:52px;top:50%;transform:translateY(-50%);background:#1e2438;border:1px solid var(--db2);color:var(--dt);font-size:.73rem;font-weight:600;padding:5px 10px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s;z-index:999;box-shadow:0 4px 16px rgba(0,0,0,.4)}
.ri:hover .ri-tip{opacity:1}
.r-sep{width:24px;height:1px;background:rgba(255,255,255,.06);margin:6px 0}
.r-bot{margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:3px}
.cs{width:240px;min-height:100vh;background:var(--dkp);border-right:1px solid var(--db);position:fixed;left:64px;top:0;bottom:0;z-index:200;display:flex;flex-direction:column;font-size:.85rem;overflow-y:auto}
.cs-hd{padding:1.25rem 1.1rem 1rem;border-bottom:1px solid var(--db)}
.cs-usr{display:flex;align-items:center;gap:9px;cursor:pointer;padding:6px 8px;border-radius:8px;transition:background .15s}
.cs-usr:hover{background:rgba(255,255,255,.04)}
.cs-av{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--bl),var(--vi));display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:#fff;flex-shrink:0}
.cs-un{font-weight:600;font-size:.83rem;color:var(--dt)}
.cs-ur{font-size:.68rem;color:var(--dt3);font-family:var(--f3)}
.cs-sec{font-size:.63rem;font-weight:700;color:var(--dt3);text-transform:uppercase;letter-spacing:.14em;padding:.85rem 1.1rem .3rem}
.csi{display:flex;align-items:center;gap:9px;padding:7px 1.1rem;color:var(--dt2);cursor:pointer;transition:all .15s;font-size:.83rem;font-weight:500}
.csi:hover{color:var(--dt);background:rgba(255,255,255,.03)}
.csi.active{color:var(--bl2);background:rgba(100,149,237,.07)}
.csi-ic{font-size:.8rem;width:16px;text-align:center;opacity:.75}
.cs-ft{margin-top:auto;padding:1rem;border-top:1px solid var(--db)}
.main{margin-left:304px;min-height:100vh}
.topbar{position:sticky;top:0;z-index:100;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(10,14,26,.88);backdrop-filter:blur(24px);border-bottom:1px solid var(--db)}
.tb-r{display:flex;align-items:center;gap:8px}
.tbb{height:32px;padding:0 12px;border-radius:7px;background:rgba(255,255,255,.05);border:1px solid var(--db);color:var(--dt2);font-size:.78rem;display:flex;align-items:center;gap:6px;cursor:pointer;transition:all .15s;font-family:var(--f2)}
.tbb:hover{background:rgba(100,149,237,.1);border-color:var(--db2);color:var(--dt)}
.tbb-p{background:linear-gradient(135deg,var(--bl),#5b8fe0);border:none;color:#fff;font-weight:600;box-shadow:0 2px 12px rgba(100,149,237,.3)}
.tbb-p:hover{box-shadow:0 4px 20px rgba(100,149,237,.5);transform:translateY(-1px)}
.tbi{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid var(--db);display:flex;align-items:center;justify-content:center;font-size:.85rem;cursor:pointer;transition:all .15s;color:var(--dt2)}
.tbi:hover{background:rgba(100,149,237,.1);color:var(--dt)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 20px;border-radius:10px;font-weight:600;font-size:.85rem;cursor:pointer;transition:all .2s;border:none;font-family:var(--f2)}
.btn-p{background:linear-gradient(135deg,var(--bl),#5b8fe0);color:#fff;box-shadow:0 3px 14px rgba(100,149,237,.35)}
.btn-p:hover{box-shadow:0 6px 22px rgba(100,149,237,.5);transform:translateY(-1px)}
.btn-p:active{transform:translateY(0)}
.btn-g{background:rgba(255,255,255,.05);border:1px solid var(--db);color:var(--dt2)}
.btn-g:hover{background:rgba(100,149,237,.08);border-color:var(--db2);color:var(--dt)}
.btn-sm{padding:7px 14px;font-size:.78rem;border-radius:8px}
.btn-xs{padding:5px 10px;font-size:.72rem;border-radius:6px}

/* INPUTS */
.inp{width:100%;padding:11px 16px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--db);color:var(--dt);font-size:.88rem;font-family:var(--f2);transition:all .18s}
.inp:focus{border-color:var(--db2);box-shadow:0 0 0 3px rgba(100,149,237,.1)}
.inp::placeholder{color:var(--dt3)}
.lbl{font-size:.72rem;font-weight:600;color:var(--dt3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:7px;display:block;font-family:var(--f3)}

/* CARDS */
.card{background:var(--dkc);border:1px solid var(--db);border-radius:16px;transition:all .22s cubic-bezier(.34,1.56,.64,1)}
.card:hover{border-color:var(--db2);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.4)}
.card-p{padding:1.5rem}.card-ps{padding:1.1rem}
.ph{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--db)}
.pt{font-weight:700;font-size:.9rem}

/* BADGES */
.bdg{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:100px;font-size:.68rem;font-weight:600;font-family:var(--f3);text-transform:uppercase;letter-spacing:.07em}
.bdg-b{background:rgba(100,149,237,.15);color:var(--bl2);border:1px solid rgba(100,149,237,.2)}
.bdg-t{background:rgba(45,212,191,.12);color:var(--tl);border:1px solid rgba(45,212,191,.2)}
.bdg-g{background:rgba(52,211,153,.12);color:var(--gr);border:1px solid rgba(52,211,153,.2)}
.bdg-a{background:rgba(251,191,36,.12);color:var(--am);border:1px solid rgba(251,191,36,.2)}
.bdg-r{background:rgba(244,63,94,.12);color:var(--ro);border:1px solid rgba(244,63,94,.2)}

/* MESH HERO */
.hero{min-height:calc(100vh - 56px);background:radial-gradient(ellipse 80% 70% at 20% 40%,#1a2f7a,#0d1b4b 45%,#040810 100%),radial-gradient(ellipse 60% 60% at 80% 60%,#0f4c81,transparent 70%);position:relative;overflow:hidden;display:flex;align-items:center}
.hero::before{content:'';position:absolute;inset:0;z-index:0;background:radial-gradient(circle at 65% 35%,rgba(100,149,237,.08),transparent 55%),radial-gradient(circle at 30% 70%,rgba(45,212,191,.05),transparent 45%)}
.hgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(100,149,237,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(100,149,237,.05) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 100% 100% at 50% 50%,black 30%,transparent 80%)}

/* GLASS ROWS */
.gr{background:rgba(255,255,255,.04);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1rem 1.25rem;display:flex;align-items:center;gap:12px;transition:all .2s}
.gr:hover{background:rgba(100,149,237,.08);border-color:rgba(100,149,237,.2)}

/* BOLD CARDS */
.bc{border-radius:20px;padding:1.4rem;cursor:pointer;transition:transform .22s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden}
.bc:hover{transform:translateY(-5px) scale(1.01)}
.bc-t{font-family:var(--f1);font-size:1.05rem;font-weight:800;color:#1a1a2e;margin-bottom:.3rem}

/* PILL TABS */
.ptabs{display:flex;gap:2px;background:rgba(255,255,255,.06);border-radius:100px;padding:3px;border:1px solid rgba(255,255,255,.08);width:fit-content}
.ptab{padding:8px 20px;border-radius:100px;font-size:.83rem;font-weight:600;cursor:pointer;transition:all .18s;color:var(--dt2);background:transparent}
.ptab.active{background:var(--bl);color:#fff;box-shadow:0 2px 12px rgba(100,149,237,.4)}

/* TABLE */
.tbl{width:100%;border-collapse:collapse}
.tbl th{text-align:left;padding:9px 12px;font-family:var(--f3);font-size:.65rem;color:var(--dt3);text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--db)}
.tbl td{padding:11px 12px;font-size:.83rem;color:var(--dt2);border-bottom:1px solid rgba(255,255,255,.03);transition:background .12s}
.tbl tr:hover td{background:rgba(100,149,237,.03);color:var(--dt)}
.tbl tr:last-child td{border-bottom:none}

/* MISC */
.prog{background:rgba(255,255,255,.06);border-radius:100px;height:4px;overflow:hidden}
.prog-f{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--bl),var(--tl));transition:width .5s ease}
.seq{font-family:var(--f3);font-size:.77rem;line-height:1.9;word-break:break-all;padding:1rem;border-radius:10px;background:rgba(0,0,0,.4);border:1px solid var(--db);max-height:180px;overflow-y:auto}
.bA{color:#f87171}.bT{color:#34d399}.bG{color:#60a5fa}.bC{color:#fbbf24}
.page{padding:2rem;max-width:1400px}
.ey{font-family:var(--f3);font-size:.68rem;color:var(--tl);text-transform:uppercase;letter-spacing:.16em;margin-bottom:.6rem}
.sh{font-family:var(--f1);font-size:clamp(1.8rem,3vw,2.8rem);line-height:1.1;margin-bottom:.6rem}
.ss{color:var(--dt2);font-size:.93rem;line-height:1.72;font-weight:400;max-width:540px}
.divider{display:flex;align-items:center;gap:10px;color:var(--dt3);font-size:.78rem;margin:16px 0}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--db)}
.toast{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;padding:12px 18px;border-radius:12px;min-width:280px;display:flex;align-items:center;gap:10px;font-size:.84rem;font-weight:500;animation:fU .3s cubic-bezier(.22,1,.36,1);backdrop-filter:blur(20px)}
.ts{background:rgba(52,211,153,.15);border:1px solid rgba(52,211,153,.3);color:var(--gr)}
.te{background:rgba(244,63,94,.15);border:1px solid rgba(244,63,94,.3);color:var(--ro)}
.ti{background:rgba(100,149,237,.15);border:1px solid rgba(100,149,237,.3);color:var(--bl2)}
.cmd-ov{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:999;backdrop-filter:blur(8px);display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;animation:fI .15s ease}
.cmd-bx{width:100%;max-width:540px;border-radius:20px;background:rgba(15,20,36,.97);border:1px solid var(--db2);box-shadow:0 40px 80px rgba(0,0,0,.8);overflow:hidden}
.cmd-inp{background:none;color:var(--dt);font-size:.94rem;font-family:var(--f2);flex:1}
.cmd-it{display:flex;align-items:center;gap:11px;padding:10px 18px;cursor:pointer;transition:background .12s;font-size:.85rem}
.cmd-it:hover{background:rgba(100,149,237,.08)}
.cmd-ic{width:26px;height:26px;border-radius:7px;background:rgba(100,149,237,.1);display:flex;align-items:center;justify-content:center;font-size:.78rem;flex-shrink:0}
.o-tog{width:46px;height:26px;border-radius:13px;cursor:pointer;transition:background .22s;flex-shrink:0;position:relative}
.o-tog.on{background:var(--na)}.o-tog.off{background:#d1d9e0}
.o-tog::after{content:'';display:block;width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:3px;box-shadow:0 2px 4px rgba(0,0,0,.2);transition:left .22s cubic-bezier(.34,1.56,.64,1)}
.o-tog.on::after{left:23px}.o-tog.off::after{left:3px}

/* DEVICE CARD */
.dv-card{background:#f7f9fc;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.dv-item{display:flex;align-items:center;justify-content:space-between;padding:12px;background:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.06);margin-bottom:10px}
.dv-item:last-child{margin-bottom:0}

/* ANIMATIONS */
@keyframes fU{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fI{from{opacity:0}to{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
@keyframes gs{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.fu{animation:fU .55s cubic-bezier(.22,1,.36,1) both}
.fi{animation:fI .35s ease both}
.d1{animation-delay:.07s;opacity:0}.d2{animation-delay:.14s;opacity:0}.d3{animation-delay:.21s;opacity:0}
.d4{animation-delay:.28s;opacity:0}.d5{animation-delay:.35s;opacity:0}.d6{animation-delay:.42s;opacity:0}
@media(max-width:900px){.rail,.cs{display:none}.main{margin-left:0}}
`;

// ══════════════════════════════════════════════════════════════════════════════
//  MOLECULE DATA
// ══════════════════════════════════════════════════════════════════════════════
const MOLS = {
  caffeine:{name:"Caffeine (C₈H₁₀N₄O₂)",atoms:[
    {sym:"N",x:0,y:1.4,z:0,col:0x3b82f6,r:.42},{sym:"C",x:1.2,y:.7,z:0,col:0x94a3b8,r:.36},
    {sym:"N",x:1.2,y:-.7,z:0,col:0x3b82f6,r:.42},{sym:"C",x:0,y:-1.4,z:0,col:0x94a3b8,r:.36},
    {sym:"C",x:-1.2,y:-.7,z:0,col:0x94a3b8,r:.36},{sym:"C",x:-1.2,y:.7,z:0,col:0x94a3b8,r:.36},
    {sym:"N",x:2.4,y:1.4,z:.5,col:0x3b82f6,r:.42},{sym:"C",x:2.4,y:0,z:.8,col:0x94a3b8,r:.36},
    {sym:"N",x:2.4,y:-1.4,z:.5,col:0x3b82f6,r:.42},{sym:"O",x:-.5,y:-2.2,z:-.6,col:0xf43f5e,r:.38},
    {sym:"O",x:-2.2,y:-1.4,z:-.5,col:0xf43f5e,r:.38},{sym:"C",x:0,y:2.6,z:-.3,col:0x94a3b8,r:.36},
    {sym:"C",x:2.4,y:-2.6,z:.3,col:0x94a3b8,r:.36},{sym:"C",x:3.6,y:0,z:1.4,col:0x94a3b8,r:.36}],
   bonds:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,6],[6,7],[7,8],[8,2],[3,9],[4,10],[0,11],[8,12],[7,13]]},
  atp:{name:"ATP (partial adenine ring)",atoms:[
    {sym:"P",x:0,y:0,z:0,col:0xf97316,r:.5},{sym:"O",x:1.5,y:.5,z:0,col:0xf43f5e,r:.38},
    {sym:"O",x:-1.5,y:.5,z:0,col:0xf43f5e,r:.38},{sym:"O",x:0,y:-1.5,z:0,col:0xf43f5e,r:.38},
    {sym:"O",x:0,y:1.5,z:0,col:0xf43f5e,r:.38},{sym:"C",x:2.8,y:.5,z:.5,col:0x94a3b8,r:.36},
    {sym:"C",x:2.8,y:-.8,z:1,col:0x94a3b8,r:.36},{sym:"N",x:4,y:.5,z:.5,col:0x3b82f6,r:.42},
    {sym:"N",x:4,y:-.8,z:1,col:0x3b82f6,r:.42},{sym:"C",x:4.8,y:-.15,z:.9,col:0x94a3b8,r:.36},
    {sym:"N",x:6,y:-.15,z:.9,col:0x3b82f6,r:.42},{sym:"P",x:-3,y:.5,z:0,col:0xf97316,r:.5},
    {sym:"P",x:-6,y:.5,z:0,col:0xf97316,r:.5},{sym:"O",x:-3,y:2,z:0,col:0xf43f5e,r:.38},
    {sym:"O",x:-6,y:2,z:0,col:0xf43f5e,r:.38}],
   bonds:[[0,1],[0,2],[0,3],[0,4],[1,5],[5,6],[5,7],[6,8],[7,9],[8,9],[9,10],[2,11],[11,12],[11,13],[12,14]]},
  dna:{name:"DNA Base Pair (A-T)",atoms:[
    {sym:"N",x:0,y:0,z:0,col:0x3b82f6,r:.42},{sym:"C",x:1.3,y:.5,z:0,col:0x94a3b8,r:.36},
    {sym:"C",x:1.3,y:-.9,z:0,col:0x94a3b8,r:.36},{sym:"N",x:0,y:-1.4,z:0,col:0x3b82f6,r:.42},
    {sym:"C",x:-.9,y:-.7,z:0,col:0x94a3b8,r:.36},{sym:"N",x:2.5,y:1,z:0,col:0x3b82f6,r:.42},
    {sym:"C",x:2.5,y:-1.6,z:0,col:0x94a3b8,r:.36},{sym:"N",x:3.6,y:.3,z:0,col:0x3b82f6,r:.42},
    {sym:"N",x:-2.1,y:-.7,z:0,col:0x3b82f6,r:.42},{sym:"O",x:4.8,y:.3,z:0,col:0xf43f5e,r:.38},
    {sym:"N",x:6.5,y:0,z:0,col:0x3b82f6,r:.42},{sym:"C",x:7.5,y:.8,z:0,col:0x94a3b8,r:.36},
    {sym:"O",x:8.7,y:.8,z:0,col:0xf43f5e,r:.38},{sym:"C",x:7.5,y:-.8,z:0,col:0x94a3b8,r:.36},
    {sym:"N",x:6.5,y:-1.5,z:0,col:0x3b82f6,r:.42},{sym:"C",x:5.5,y:-.8,z:0,col:0x94a3b8,r:.36}],
   bonds:[[0,1],[1,2],[2,3],[3,4],[4,0],[1,5],[2,6],[5,7],[6,7],[3,8],[7,9],[9,10],[10,11],[11,12],[10,15],[13,14],[14,15],[15,10]]}
};

// ══════════════════════════════════════════════════════════════════════════════
//  THREE.JS COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function MoleculeViewer({ molKey = "caffeine", height = 400 }) {
  const mountRef = useRef(null);
  const THREE = useThree();
  const [selAtom, setSelAtom] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!THREE || !mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth, H = height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07101e);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(dpr);
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(5, 8, 10); scene.add(dl);
    const pl1 = new THREE.PointLight(0x6495ed, 0.8, 40); pl1.position.set(-5, 3, 5); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x2dd4bf, 0.5, 30); pl2.position.set(5, -3, -5); scene.add(pl2);

    const grid = new THREE.GridHelper(20, 20, 0x1a2040, 0x1a2040);
    grid.position.y = -4; scene.add(grid);

    const mol = MOLS[molKey];
    const group = new THREE.Group(); scene.add(group);
    const meshes = [];

    mol.atoms.forEach((a, i) => {
      const geo = new THREE.SphereGeometry(a.r, 24, 24);
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(a.col), shininess: 80,
        specular: new THREE.Color(0x444444),
        emissive: new THREE.Color(a.col).multiplyScalar(0.12)
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(a.x, a.y, a.z);
      m.userData = { idx: i, sym: a.sym };
      group.add(m); meshes.push(m);
    });

    mol.bonds.forEach(([ai, bi]) => {
      const A = mol.atoms[ai], B = mol.atoms[bi];
      const start = new THREE.Vector3(A.x, A.y, A.z);
      const end = new THREE.Vector3(B.x, B.y, B.z);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const geo = new THREE.CylinderGeometry(0.1, 0.1, len, 10, 1);
      const mat = new THREE.MeshPhongMaterial({ color: 0x334155, shininess: 30 });
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(mid);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      group.add(m);
    });

    const box = new THREE.Box3().setFromObject(group);
    group.position.sub(box.getCenter(new THREE.Vector3()));

    let isDrag = false, prev = {x:0,y:0}, rotX = 0, rotY = 0, zoom = 14;
    const ray = new THREE.Raycaster();

    const onDown = e => { isDrag = true; prev = {x:e.clientX, y:e.clientY}; };
    const onMove = e => {
      if (!isDrag) return;
      rotY += (e.clientX - prev.x) * 0.008;
      rotX += (e.clientY - prev.y) * 0.008;
      group.rotation.y = rotY; group.rotation.x = rotX;
      prev = {x:e.clientX, y:e.clientY};
    };
    const onUp = e => {
      if (!isDrag) {
        const rect = el.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / W) * 2 - 1,
          -((e.clientY - rect.top) / H) * 2 + 1
        );
        ray.setFromCamera(mouse, camera);
        const hits = ray.intersectObjects(meshes);
        if (hits.length > 0) {
          const h = hits[0].object;
          setSelAtom({ sym: h.userData.sym, idx: h.userData.idx });
          const orig = h.material.emissive.clone();
          h.material.emissive.setHex(0x6495ed);
          setTimeout(() => h.material.emissive.copy(orig), 400);
        } else setSelAtom(null);
      }
      isDrag = false;
    };
    const onWheel = e => { zoom = Math.max(4, Math.min(30, zoom + e.deltaY * 0.02)); camera.position.z = zoom; };
    const onTD = e => { prev = {x: e.touches[0].clientX, y: e.touches[0].clientY}; isDrag = true; };
    const onTM = e => {
      if (!isDrag) return;
      rotY += (e.touches[0].clientX - prev.x) * 0.01;
      rotX += (e.touches[0].clientY - prev.y) * 0.01;
      group.rotation.y = rotY; group.rotation.x = rotX;
      prev = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("wheel", onWheel, {passive:true});
    el.addEventListener("touchstart", onTD);
    el.addEventListener("touchmove", onTM);

    let animId;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (!isDrag) group.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    tick(); setReady(true);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTD);
      el.removeEventListener("touchmove", onTM);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [THREE, molKey, height]);

  return (
    <div style={{position:"relative"}}>
      <div ref={mountRef} style={{width:"100%",height,borderRadius:12,overflow:"hidden",cursor:"grab",background:"#07101e"}}>
        {!THREE && <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",gap:"1rem",color:"var(--dt3)",fontFamily:"var(--f3)",fontSize:".8rem"}}>
          <div style={{width:32,height:32,border:"2px solid var(--db2)",borderTop:"2px solid var(--bl)",borderRadius:"50%",animation:"spin .8s linear infinite"}} />
          Loading Three.js engine...
        </div>}
      </div>
      {ready && <>
        <div style={{position:"absolute",top:10,left:10,fontFamily:"var(--f3)",fontSize:".68rem",color:"rgba(255,255,255,.5)",background:"rgba(0,0,0,.55)",padding:"5px 10px",borderRadius:7,backdropFilter:"blur(8px)",lineHeight:1.6}}>
          {MOLS[molKey].name}<br/><span style={{color:"var(--bl2)"}}>{MOLS[molKey].atoms.length} atoms · {MOLS[molKey].bonds.length} bonds</span>
        </div>
        <div style={{position:"absolute",bottom:10,left:10,background:"rgba(0,0,0,.45)",padding:"4px 9px",borderRadius:6,backdropFilter:"blur(6px)",fontFamily:"var(--f3)",fontSize:".63rem",color:"rgba(255,255,255,.35)"}}>
          Drag · Scroll zoom · Click atom to inspect
        </div>
        {selAtom && <div style={{position:"absolute",top:10,right:10,fontFamily:"var(--f3)",fontSize:".72rem",color:"var(--tl)",background:"rgba(0,0,0,.6)",padding:"6px 12px",borderRadius:8,backdropFilter:"blur(10px)",border:"1px solid rgba(45,212,191,.2)"}}>
          ◉ Atom #{selAtom.idx} — {selAtom.sym}
        </div>}
      </>}
    </div>
  );
}

function ProteinViewer({ proteinId, height = 420 }) {
  const mountRef = useRef(null);
  const THREE = useThree();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!THREE || !mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth, H = height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a16);
    scene.fog = new THREE.Fog(0x060a16, 20, 60);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H); renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(5, 10, 8); scene.add(dl);
    const bl = new THREE.PointLight(0x6495ed, 1.0, 30); bl.position.set(-8, 4, 4); scene.add(bl);
    const gl = new THREE.PointLight(0x2dd4bf, 0.6, 25); gl.position.set(8, -4, -4); scene.add(gl);

    const group = new THREE.Group(); scene.add(group);
    const seed = (proteinId || "").split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
    const rng = s => (Math.sin(s * 127.1 + seed * 0.01) * 0.5 + 0.5);
    const N = 160;
    const pts = [], types = [];

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const h = rng(i * 3.1) > 0.45, s2 = !h && rng(i * 5.7) > 0.5;
      types.push(h ? "h" : s2 ? "s" : "c");
      const a1 = t * Math.PI * 7 + seed * 0.1, a2 = t * Math.PI * 3.5;
      const r = h ? 3.5 : s2 ? 2.0 : 1.2;
      pts.push(new THREE.Vector3(
        Math.cos(a1) * r * (0.7 + rng(i) * 0.6),
        (t - 0.5) * 14 + Math.sin(t * Math.PI * 2) * 1.5,
        Math.sin(a2) * r * (0.5 + rng(i * 2) * 0.5)
      ));
    }

    const hCol = new THREE.Color(0x6495ed), sCol = new THREE.Color(0x2dd4bf), cCol = new THREE.Color(0x334155);
    for (let i = 1; i < pts.length; i++) {
      const tp = types[i];
      const col = tp === "h" ? hCol : tp === "s" ? sCol : cCol;
      const r = tp === "h" ? 0.18 : tp === "s" ? 0.28 : 0.08;
      const dir = new THREE.Vector3().subVectors(pts[i], pts[i-1]);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(pts[i], pts[i-1]).multiplyScalar(0.5);
      const geo = new THREE.CylinderGeometry(r, r, len, 8, 1);
      const mat = new THREE.MeshPhongMaterial({ color: col, shininess: 60, emissive: col.clone().multiplyScalar(0.08) });
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(mid);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      group.add(m);
      if (i % 5 === 0) {
        const sg = new THREE.SphereGeometry(r * 2.5, 10, 10);
        const sm = new THREE.MeshPhongMaterial({ color: col, shininess: 80, emissive: col.clone().multiplyScalar(0.15) });
        const sp = new THREE.Mesh(sg, sm); sp.position.copy(pts[i]); group.add(sp);
      }
    }

    const box = new THREE.Box3().setFromObject(group);
    group.position.sub(box.getCenter(new THREE.Vector3()));

    let isDrag = false, prev = {x:0,y:0}, rotX = 0, rotY = 0;
    const onD = e => { isDrag = true; prev = {x:e.clientX,y:e.clientY}; };
    const onM = e => { if (!isDrag) return; rotY += (e.clientX-prev.x)*.007; rotX += (e.clientY-prev.y)*.007; group.rotation.y = rotY; group.rotation.x = rotX; prev = {x:e.clientX,y:e.clientY}; };
    const onU = () => { isDrag = false; };
    const onW = e => { camera.position.z = Math.max(5, Math.min(35, camera.position.z + e.deltaY * 0.025)); };
    el.addEventListener("mousedown", onD); window.addEventListener("mousemove", onM); window.addEventListener("mouseup", onU);
    el.addEventListener("wheel", onW, {passive:true});

    let animId;
    const tick = () => { animId = requestAnimationFrame(tick); if (!isDrag) group.rotation.y += 0.004; renderer.render(scene, camera); };
    tick(); setReady(true);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousedown", onD); window.removeEventListener("mousemove", onM); window.removeEventListener("mouseup", onU);
      el.removeEventListener("wheel", onW);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [THREE, proteinId, height]);

  return (
    <div style={{position:"relative"}}>
      <div ref={mountRef} style={{width:"100%",height,borderRadius:12,overflow:"hidden",cursor:"grab",background:"#060a16"}}>
        {!THREE && <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:".75rem",color:"var(--dt3)",fontFamily:"var(--f3)",fontSize:".8rem",flexDirection:"column"}}>
          <div style={{width:28,height:28,border:"2px solid var(--db2)",borderTop:"2px solid var(--bl)",borderRadius:"50%",animation:"spin .8s linear infinite"}} />
          Initialising renderer...
        </div>}
      </div>
      {ready && <>
        <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,.55)",padding:"5px 10px",borderRadius:7,backdropFilter:"blur(8px)",fontFamily:"var(--f3)",fontSize:".65rem",lineHeight:1.7}}>
          <span style={{color:"var(--bl2)"}}>━ α-helix</span>&nbsp;&nbsp;<span style={{color:"var(--tl)"}}>━ β-sheet</span>&nbsp;&nbsp;<span style={{color:"var(--dt3)"}}>━ coil</span>
        </div>
        <div style={{position:"absolute",bottom:10,left:10,background:"rgba(0,0,0,.45)",padding:"4px 9px",borderRadius:6,backdropFilter:"blur(6px)",fontFamily:"var(--f3)",fontSize:".63rem",color:"rgba(255,255,255,.35)"}}>
          Drag · Scroll zoom · Auto-rotate
        </div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MINI COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════
function SeqDisplay({ seq }) {
  return <div className="seq">{seq.split("").map((c,i) => <span key={i} className={`b${c.toUpperCase()}`}>{c}</span>)}</div>;
}
function Sparkline({ data, color="var(--bl2)" }) {
  if (!data?.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const W = 100, H = 34;
  const pts = data.map((v,i) => `${(i/(data.length-1))*W},${H-((v-min)/(max-min+1))*H}`).join(" ");
  return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function MiniBar({ data, height=60 }) {
  const max = Math.max(...data);
  return <div style={{display:"flex",gap:3,alignItems:"flex-end",height}}>{data.map((v,i) => <div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",minHeight:3,height:`${(v/max)*100}%`,background:v>max*.7?"linear-gradient(180deg,var(--tl),rgba(45,212,191,.3))":v<max*.35?"linear-gradient(180deg,var(--ro),rgba(244,63,94,.2))":"linear-gradient(180deg,var(--bl2),rgba(100,149,237,.3))",transition:"height .4s ease",cursor:"pointer"}}/>)}</div>;
}
function NTog({ on, toggle }) { return <div className={`n-tog ${on?"on":"off"}`} onClick={toggle} />; }
function OTog({ on, toggle }) { return <div className={`o-tog ${on?"on":"off"}`} onClick={toggle} />; }
function Toast({ msg, type, close }) {
  useEffect(() => { const t = setTimeout(close, 4200); return () => clearTimeout(t); }, []);
  const cls = type==="s"?"ts":type==="e"?"te":"ti";
  return <div className={`toast ${cls}`}><span>{type==="s"?"✓":type==="e"?"✕":"ℹ"}</span><span style={{flex:1}}>{msg}</span><span onClick={close} style={{cursor:"pointer",opacity:.6}}>✕</span></div>;
}
function Spinner() { return <div style={{width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>; }

// ══════════════════════════════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════════════════════════════
const PROTEINS = [
  {id:"1CRN",name:"Crambin",org:"Crambe abyssinica",res:46,chains:1,method:"X-ray",res_:"0.54Å",mw:"4.7 kDa"},
  {id:"4HHB",name:"Hemoglobin",org:"Homo sapiens",res:574,chains:4,method:"X-ray",res_:"1.74Å",mw:"64.5 kDa"},
  {id:"1TIM",name:"Triosephosphate isomerase",org:"Gallus gallus",res:496,chains:2,method:"X-ray",res_:"2.5Å",mw:"54.1 kDa"},
  {id:"2LYZ",name:"Lysozyme",org:"Gallus gallus",res:129,chains:1,method:"X-ray",res_:"1.33Å",mw:"14.3 kDa"},
  {id:"1ATP",name:"Protein Kinase A",org:"Mus musculus",res:350,chains:3,method:"X-ray",res_:"2.2Å",mw:"40.8 kDa"},
];
const TOOLS = [
  {name:"BLAST",cat:"seq",desc:"Basic Local Alignment Search Tool — statistically rigorous sequence similarity search against NCBI databases.",lang:"C/Perl",stars:"∞"},
  {name:"AlphaFold2",cat:"struct",desc:"DeepMind AI achieving near-crystallographic accuracy in protein 3D structure prediction from amino acid sequence alone.",lang:"Python/JAX",stars:"12.1k"},
  {name:"Clustal Omega",cat:"seq",desc:"Multiple sequence alignment via HMM profile-profile alignment and mBed guide tree construction.",lang:"C++",stars:"4.8k"},
  {name:"PyMOL",cat:"struct",desc:"Molecular visualisation with publication-quality ray-tracing for protein, small molecule, and nucleic acid structures.",lang:"Python/C",stars:"1.9k"},
  {name:"RAxML-NG",cat:"phylo",desc:"Maximum likelihood phylogenetic inference under complex substitution models with full partitioned analysis support.",lang:"C++",stars:"980"},
  {name:"DESeq2",cat:"omics",desc:"Negative binomial GLM for RNA-seq differential expression with shrinkage estimation for dispersion and fold change.",lang:"R",stars:"3.4k"},
  {name:"GATK",cat:"omics",desc:"Broad Institute genome analysis toolkit — industry standard for germline and somatic variant discovery.",lang:"Java/Python",stars:"1.6k"},
  {name:"IQ-TREE 2",cat:"phylo",desc:"Ultra-fast maximum likelihood phylogenomic inference with ModelFinder for automatic substitution model selection.",lang:"C++",stars:"740"},
  {name:"Biopython",cat:"seq",desc:"Python bioinformatics library — sequence parsing, structure analysis, BLAST queries, phylogenetics, visualisation.",lang:"Python",stars:"4.2k"},
  {name:"HMMER",cat:"seq",desc:"Profile HMMs for sequence analysis and remote homology detection with benchmark-leading sensitivity.",lang:"C",stars:"1.2k"},
  {name:"Rosetta",cat:"struct",desc:"Protein structure prediction, design, and docking via physics-based energy minimisation and Monte Carlo sampling.",lang:"C++",stars:"890"},
  {name:"FastQC",cat:"omics",desc:"Quality control analysis of raw high-throughput sequencing data — per-base quality, adapter content, GC bias.",lang:"Java",stars:"760"},
];
const COURSES = [
  {emoji:"🧬",title:"Intro to Bioinformatics",lv:"beg",desc:"DNA to data — sequences as computational problems, databases, file formats, central dogma.",dur:"6h",mods:12,students:"14k",bg:"#d1fae5"},
  {emoji:"🔬",title:"Sequence Alignment Algorithms",lv:"int",desc:"Needleman-Wunsch, Smith-Waterman, BLAST — the mathematics behind every alignment tool.",dur:"8h",mods:16,students:"8.2k",bg:"#fef3c7"},
  {emoji:"⚛️",title:"Structural Bioinformatics",lv:"int",desc:"PDB formats, secondary structure prediction, homology modelling, molecular docking.",dur:"10h",mods:20,students:"6.5k",bg:"#dbeafe"},
  {emoji:"📊",title:"RNA-seq & Transcriptomics",lv:"adv",desc:"Full pipeline — STAR aligner, Salmon, DESeq2, GSEA, publication-quality plots.",dur:"12h",mods:24,students:"9.1k",bg:"#fce7f3"},
  {emoji:"🌲",title:"Phylogenetics & Evolution",lv:"int",desc:"Distance metrics, maximum likelihood trees, Bayesian inference with IQ-TREE and MrBayes.",dur:"7h",mods:14,students:"4.8k",bg:"#ede9fe"},
  {emoji:"🤖",title:"ML in Drug Discovery",lv:"adv",desc:"GNNs on molecular graphs, SMILES tokenisation, virtual screening, ADMET property prediction.",dur:"14h",mods:28,students:"11k",bg:"#fee2e2"},
  {emoji:"🧫",title:"Single-Cell Genomics",lv:"adv",desc:"10X Chromium data, Seurat/Scanpy, UMAP, trajectory inference, cell-type annotation.",dur:"11h",mods:22,students:"7.3k",bg:"#fef9c3"},
  {emoji:"⚡",title:"HPC Bioinformatics",lv:"adv",desc:"SLURM job scheduling, Snakemake pipelines, Rust SIMD sequence processing, parallel BLAST.",dur:"10h",mods:20,students:"3.2k",bg:"#f0fdf4"},
  {emoji:"🔗",title:"Protein-Protein Interactions",lv:"int",desc:"Network biology, STRING database, co-immunoprecipitation analysis, complex docking.",dur:"9h",mods:18,students:"5.1k",bg:"#e0f2fe"},
];
const GENES = [
  {name:"TP53",logfc:3.42,padj:0.0001,expr:1842,trend:[20,40,80,120,160,180]},
  {name:"BRCA1",logfc:-2.18,padj:0.003,expr:634,trend:[180,140,100,80,50,30]},
  {name:"EGFR",logfc:2.95,padj:0.0008,expr:1124,trend:[30,55,90,130,155,170]},
  {name:"MYC",logfc:1.87,padj:0.012,expr:2310,trend:[100,120,140,160,150,145]},
  {name:"VEGFA",logfc:-1.52,padj:0.028,expr:445,trend:[140,110,90,70,60,55]},
  {name:"KRAS",logfc:4.12,padj:0.00002,expr:2876,trend:[10,30,70,120,190,220]},
  {name:"PTEN",logfc:-2.76,padj:0.0005,expr:328,trend:[160,130,100,70,45,30]},
];
const ACTIVITY = [
  {col:"var(--tl)",text:"BLAST search — 1,247 hits, E-value < 1e-50",t:"2m"},
  {col:"var(--gr)",text:"Structure 4HHB saved to collection",t:"18m"},
  {col:"var(--am)",text:"AlphaFold2 job queued — ETA 12 min",t:"31m"},
  {col:"var(--ro)",text:"RNA-seq alignment failed — insufficient reads",t:"1h"},
  {col:"var(--bl2)",text:"Course 'RNA-seq' Module 4 complete",t:"2h"},
];
const SEQ = "ATGCGATAGCTTACGGATCGATCGATGCATCGTATCGTAGCTAGCTAGCTATCGATCGATCGATCGTATCGTAGCTAGCTAGCTATCGATCGATCGATCGTATCGTAGCTAGCTAGCTATCGATCG";
const BARS = [42,78,35,91,56,67,82,44,95,73,61,88,50,77,63,85,39,70,48,93];

const ALL_PAGES = [
  {id:"home",icon:"⌂",tip:"Home"},{id:"explorer",icon:"⬡",tip:"Structure Explorer"},
  {id:"molecules",icon:"◉",tip:"Molecule Viewer"},{id:"sequencer",icon:"≋",tip:"Sequence Lab"},
  {id:"phylo",icon:"🌿",tip:"Phylogenetics"},{id:"omics",icon:"◈",tip:"Omics Dashboard"},
  {id:"tools",icon:"⚙",tip:"Tool Directory"},{id:"ailab",icon:"✦",tip:"AI Lab"},
  {id:"learn",icon:"◎",tip:"Learning Hub"},{id:"dashboard",icon:"▦",tip:"Dashboard"},
  {id:"settings",icon:"⊙",tip:"Settings"},
];
const PG_LABEL = {home:"Home",explorer:"Structure Explorer",molecules:"Molecule Viewer",sequencer:"Sequence Lab",phylo:"Phylogenetics",omics:"Omics Dashboard",tools:"Tool Directory",ailab:"AI Laboratory",learn:"Learning Hub",dashboard:"My Dashboard",settings:"Settings"};

// ══════════════════════════════════════════════════════════════════════════════
//  AUTH — Neumorphic (Image 1)
// ══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin, goReg }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [rem, setRem] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!email || !pass) { setErr("Please fill all fields."); return; }
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    onLogin({ name: email.split("@")[0], email, role: "Researcher · PhD" });
  };

  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",background:"var(--neu-bg)"}}>
      {/* Visual side */}
      <div style={{position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(145deg,#e4e8ed,#edf0f4)"}}>
        <div style={{position:"absolute",inset:0}}>
          {[{s:300,x:"8%",y:"12%",op:.35},{s:200,x:"68%",y:"58%",op:.28},{s:150,x:"18%",y:"72%",op:.22},{s:110,x:"78%",y:"8%",op:.18}].map((c,i) => (
            <div key={i} style={{position:"absolute",width:c.s,height:c.s,borderRadius:"50%",left:c.x,top:c.y,opacity:c.op,background:"var(--neu-bg)",boxShadow:`${c.s*.06}px ${c.s*.06}px ${c.s*.14}px var(--nsd),-${c.s*.04}px -${c.s*.04}px ${c.s*.1}px var(--nsl)`,animation:`fl ${4+i}s ease-in-out infinite`,animationDelay:`${i*.8}s`}} />
          ))}
        </div>
        <div style={{position:"relative",zIndex:2,padding:"3rem",textAlign:"center"}}>
          <div style={{fontFamily:"var(--f1)",fontSize:"2.2rem",fontWeight:800,color:"#2d3748",lineHeight:1.2,marginBottom:".5rem"}}>
            Decode Life,<br/>One Sequence<br/>at a Time.
          </div>
          <p style={{color:"#718096",fontSize:".93rem",lineHeight:1.7,maxWidth:320,margin:"1rem auto 0"}}>
            A research-grade bioinformatics platform. Real Three.js 3D structures, live AI, alignment engines.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:"1.2rem",marginTop:"2rem",flexWrap:"wrap"}}>
            {[["220k+","Structures"],["800+","Tools"],["40+","Courses"]].map(([n,l]) => (
              <div key={l} className="nc-sm" style={{padding:".9rem 1.1rem",textAlign:"center"}}>
                <div style={{fontFamily:"var(--f1)",fontSize:"1.3rem",fontWeight:800,color:"#2d3748"}}>{n}</div>
                <div style={{fontSize:".7rem",color:"#718096",fontFamily:"var(--f3)",textTransform:"uppercase",letterSpacing:".08em",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",background:"#eef1f5"}}>
        <div className="nc" style={{width:"100%",maxWidth:380,padding:"2.5rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"2rem"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#4a7fc1,#2dd4bf)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",boxShadow:"4px 4px 10px var(--nsd),-3px -3px 8px var(--nsl)"}}>🧬</div>
            <div>
              <div style={{fontFamily:"var(--f1)",fontWeight:800,fontSize:"1.15rem",color:"#2d3748"}}>BioNexus</div>
              <div style={{fontSize:".72rem",color:"#718096"}}>Research Platform</div>
            </div>
          </div>
          <div style={{fontFamily:"var(--f1)",fontSize:"1.5rem",fontWeight:700,color:"#2d3748",marginBottom:4}}>Welcome back</div>
          <div style={{fontSize:".85rem",color:"#718096",marginBottom:"1.75rem"}}>Sign in to your workspace</div>
          {err && <div style={{background:"rgba(244,63,94,.1)",border:"1px solid rgba(244,63,94,.2)",borderRadius:12,padding:"10px 14px",marginBottom:"1rem",fontSize:".82rem",color:"#e53e3e"}}>⚠ {err}</div>}
          <div style={{marginBottom:"1.2rem"}}>
            <label className="n-lbl">Username</label>
            <input className="n-inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="researcher@university.edu" onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          <div style={{marginBottom:"1.2rem"}}>
            <label className="n-lbl">Password</label>
            <div style={{position:"relative"}}>
              <input className="n-inp" type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter Password" style={{paddingRight:50}} onKeyDown={e=>e.key==="Enter"&&submit()} />
              <button onClick={()=>setShow(v=>!v)} style={{position:"absolute",right:18,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#718096",fontSize:".9rem"}}>{show?"🙈":"👁"}</button>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem"}}>
            <label style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:".83rem",color:"#718096"}}>
              <div className={`n-chk ${rem?"on":""}`} onClick={()=>setRem(v=>!v)}>{rem&&<span style={{color:"#fff",fontSize:".7rem",fontWeight:700}}>✓</span>}</div>
              Remember me
            </label>
            <span style={{fontSize:".83rem",color:"#4a7fc1",cursor:"pointer"}}>Forget password?</span>
          </div>
          <button className="nb nb-acc" style={{width:"100%",marginBottom:"1.5rem"}} onClick={submit} disabled={loading}>
            {loading?<><Spinner/>Signing in...</>:"Sign In"}
          </button>
          <div style={{textAlign:"center",color:"#a0aec0",fontSize:".83rem",marginBottom:"1.25rem"}}>or sign in with</div>
          <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
            {[["f","#3b5998"],["G","#ea4335"],["in","#0077b5"],["𝕏","#000"]].map(([icon,col])=>(
              <button key={icon} className="n-soc" onClick={()=>onLogin({name:"OAuth User",email:"oauth@demo.com",role:"Researcher"})}><span style={{fontWeight:700,fontSize:icon==="in"?".75rem":".95rem",color:col}}>{icon}</span></button>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"1.5rem",fontSize:".84rem",color:"#718096"}}>Don't have an account? <span onClick={goReg} style={{color:"#4a7fc1",cursor:"pointer",fontWeight:600}}>Create one →</span></div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onLogin, goLogin }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({name:"",email:"",pass:"",institution:"",role:"Researcher",area:"Genomics"});
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const next = async () => {
    if (step===1){setStep(2);return;}
    setLoading(true); await new Promise(r=>setTimeout(r,900)); setLoading(false);
    onLogin({name:f.name||"Researcher",email:f.email,role:f.role});
  };
  return (
    <div style={{minHeight:"100vh",background:"#eef1f5",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
      <div className="nc" style={{width:"100%",maxWidth:400,padding:"2.5rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.75rem"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#4a7fc1,#2dd4bf)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",boxShadow:"3px 3px 8px var(--nsd),-2px -2px 6px var(--nsl)"}}>🧬</div>
          <div style={{fontFamily:"var(--f1)",fontWeight:800,fontSize:"1.1rem",color:"#2d3748"}}>BioNexus</div>
          <div style={{marginLeft:"auto",display:"flex",gap:5}}>{[1,2].map(i=><div key={i} style={{width:28,height:4,borderRadius:2,background:i<=step?"#4a7fc1":"#cbd5e0",transition:"background .3s"}}/>)}</div>
        </div>
        <div style={{fontFamily:"var(--f1)",fontSize:"1.4rem",fontWeight:700,color:"#2d3748",marginBottom:4}}>{step===1?"Create account":"Research profile"}</div>
        <div style={{fontSize:".84rem",color:"#718096",marginBottom:"1.75rem"}}>Step {step} of 2</div>
        {step===1?<>
          {[["Full Name","name","text","Dr. Jane Doe"],["Email","email","email","researcher@lab.edu"],["Password","pass","password","Min. 8 characters"]].map(([label,key,type,ph])=>(
            <div key={key} style={{marginBottom:"1.1rem"}}>
              <label className="n-lbl">{label}</label>
              <input className="n-inp" type={type} placeholder={ph} value={f[key]} onChange={e=>set(key,e.target.value)}/>
            </div>
          ))}
        </>:<>
          <div style={{marginBottom:"1.1rem"}}>
            <label className="n-lbl">Institution</label>
            <input className="n-inp" placeholder="MIT, NIH, Independent..." value={f.institution} onChange={e=>set("institution",e.target.value)}/>
          </div>
          {[["Role","role",["Researcher","PhD Student","Postdoc","Professor","Bioinformatician","Student"]],["Area","area",["Genomics","Structural Biology","Proteomics","Transcriptomics","Drug Discovery","Systems Biology"]]].map(([label,key,opts])=>(
            <div key={key} style={{marginBottom:"1.1rem"}}>
              <label className="n-lbl">{label}</label>
              <select style={{width:"100%",padding:"13px 20px",borderRadius:50,background:"var(--neu-bg)",border:"none",color:"#4a5568",fontFamily:"var(--f2)",fontSize:".9rem",boxShadow:"inset 3px 3px 8px var(--nid),inset -3px -3px 8px var(--nil)"}} value={f[key]} onChange={e=>set(key,e.target.value)}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </>}
        <button className="nb nb-acc" style={{width:"100%",marginTop:".5rem"}} onClick={next} disabled={loading}>
          {loading?"Creating...":`${step===1?"Continue →":"Create Account →"}`}
        </button>
        <div style={{textAlign:"center",marginTop:"1.25rem",fontSize:".84rem",color:"#718096"}}>Already have an account? <span onClick={goLogin} style={{color:"#4a7fc1",cursor:"pointer",fontWeight:600}}>Sign in →</span></div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SIDEBAR (Dual — Image 3)
// ══════════════════════════════════════════════════════════════════════════════
const NAV_SECS = [
  {sec:"Platform",items:[{id:"home",icon:"⌂",label:"Overview"},{id:"explorer",icon:"⬡",label:"Structure Explorer"},{id:"molecules",icon:"◉",label:"Molecule Viewer"}]},
  {sec:"Analysis",items:[{id:"sequencer",icon:"≋",label:"Sequence Lab"},{id:"phylo",icon:"🌿",label:"Phylogenetics"},{id:"omics",icon:"◈",label:"Omics Dashboard"}]},
  {sec:"Resources",items:[{id:"tools",icon:"⚙",label:"Tool Directory"},{id:"ailab",icon:"✦",label:"AI Lab"},{id:"learn",icon:"◎",label:"Learning Hub"}]},
  {sec:"Workspace",items:[{id:"dashboard",icon:"▦",label:"Dashboard"},{id:"settings",icon:"⊙",label:"Settings"}]},
];
const RAIL_GROUPS = [
  ["home","explorer","molecules"],
  ["sequencer","phylo","omics"],
  ["tools","ailab","learn"],
  ["dashboard","settings"],
];

function Sidebar({ page, setPage, user, logout }) {
  return (
    <>
      {/* Icon rail */}
      <div className="rail">
        <div className="r-logo" onClick={()=>setPage("home")}>🧬</div>
        {ALL_PAGES.slice(0,6).map(r=>(
          <div key={r.id} className={`ri ${page===r.id?"active":""}`} onClick={()=>setPage(r.id)}>
            {r.icon}<div className="ri-tip">{r.tip}</div>
          </div>
        ))}
        <div className="r-sep"/>
        {ALL_PAGES.slice(6,9).map(r=>(
          <div key={r.id} className={`ri ${page===r.id?"active":""}`} onClick={()=>setPage(r.id)}>
            {r.icon}<div className="ri-tip">{r.tip}</div>
          </div>
        ))}
        <div className="r-bot">
          <div className="r-sep"/>
          {ALL_PAGES.slice(9).map(r=>(
            <div key={r.id} className={`ri ${page===r.id?"active":""}`} onClick={()=>setPage(r.id)}>
              {r.icon}<div className="ri-tip">{r.tip}</div>
            </div>
          ))}
          <div className="ri" onClick={logout} style={{color:"var(--ro)"}}>⏻<div className="ri-tip">Sign Out</div></div>
        </div>
      </div>
      {/* Content sidebar */}
      <div className="cs">
        <div className="cs-hd">
          <div className="cs-usr">
            <div className="cs-av">{(user?.name||"R")[0].toUpperCase()}</div>
            <div><div className="cs-un">{user?.name||"Researcher"} ↓</div><div className="cs-ur">{user?.email?.slice(0,22)||"user@bio.com"}</div></div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {NAV_SECS.map(sec=>(
            <div key={sec.sec}>
              <div className="cs-sec">{sec.sec}</div>
              {sec.items.map(item=>(
                <div key={item.id} className={`csi ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)}>
                  <span className="csi-ic">{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cs-ft">
          <div style={{fontFamily:"var(--f3)",fontSize:".65rem",color:"var(--dt3)",marginBottom:6}}>// BioNexus v2.1 · 2026</div>
          <button className="btn btn-g btn-xs" style={{width:"100%"}} onClick={logout}>Sign Out</button>
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  TOPBAR
// ══════════════════════════════════════════════════════════════════════════════
function Topbar({ page, openCmd, toast }) {
  return (
    <div className="topbar">
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontFamily:"var(--f3)",fontSize:".68rem",color:"var(--dt3)"}}>//</span>
        <span style={{fontFamily:"var(--f1)",fontWeight:700,fontSize:"1rem"}}>{PG_LABEL[page]||page}</span>
      </div>
      <div className="tb-r">
        <button className="tbb" style={{fontFamily:"var(--f3)",gap:10}} onClick={openCmd}>
          <span style={{color:"var(--dt3)"}}>⌘K</span><span>Command</span>
        </button>
        <div className="tbi" onClick={()=>toast("No new notifications","i")}>🔔</div>
        <button className="tbb tbb-p btn-sm" onClick={()=>toast("New job dialog opening...","i")}>+ New Job</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  COMMAND BAR
// ══════════════════════════════════════════════════════════════════════════════
function CmdBar({ visible, close, setPage }) {
  const [q, setQ] = useState("");
  useEffect(()=>{ const fn = e=>{if(e.key==="Escape")close()}; window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn); },[close]);
  if (!visible) return null;
  const filtered = ALL_PAGES.filter(i=>i.tip.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="cmd-ov" onClick={close}>
      <div className="cmd-bx" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"1px solid var(--db)"}}>
          <span style={{color:"var(--bl2)"}}>⌘</span>
          <input className="cmd-inp" autoFocus placeholder="Search pages and tools..." value={q} onChange={e=>setQ(e.target.value)}/>
          <span style={{fontFamily:"var(--f3)",fontSize:".68rem",color:"var(--dt3)",background:"rgba(255,255,255,.06)",padding:"2px 7px",borderRadius:4,border:"1px solid var(--db)"}}>ESC</span>
        </div>
        <div style={{padding:"6px 0 10px"}}>
          {filtered.map(it=>(
            <div key={it.id} className="cmd-it" onClick={()=>{setPage(it.id);close();setQ("");}}>
              <div className="cmd-ic">{it.icon}</div>
              <span style={{flex:1,fontWeight:500}}>{it.tip}</span>
              <span style={{fontFamily:"var(--f3)",fontSize:".67rem",color:"var(--dt3)"}}>→ {it.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  HOME PAGE — mesh hero (Image 5) + bold cards (Image 4)
// ══════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
  const [tab, setTab] = useState("Premium");
  const features = {
    Free:[{f:"Structure Explorer",ok:true},{f:"Molecule Viewer (3D)",ok:true},{f:"Sequence Lab",ok:true},{f:"AI Lab (10/day)",ok:false},{f:"Omics Pipeline",ok:false}],
    Premium:[{f:"Everything in Free",ok:true},{f:"Unlimited AI Lab",ok:true},{f:"Full Omics Pipeline",ok:true},{f:"Priority AlphaFold",ok:true},{f:"Team workspace",ok:false}]
  };
  return (
    <div>
      {/* MESH HERO */}
      <div className="hero">
        <div className="hgrid"/>
        <div style={{position:"relative",zIndex:2,width:"100%",padding:"3rem 2.5rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center",maxWidth:1300,margin:"0 auto"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(100,149,237,.12)",border:"1px solid rgba(100,149,237,.25)",borderRadius:100,padding:"6px 14px",marginBottom:"1.4rem"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"var(--tl)",animation:"pulse 2s infinite"}}/>
              <span style={{fontFamily:"var(--f3)",fontSize:".7rem",color:"var(--tl)",letterSpacing:".12em",textTransform:"uppercase"}}>Bioinformatics Research Platform · 2026</span>
            </div>
            <h1 style={{fontFamily:"var(--f1)",fontSize:"clamp(2.8rem,4.5vw,4.4rem)",lineHeight:1.08,fontWeight:800,marginBottom:"1.2rem"}}>
              Decode Life,<br/>
              <span style={{background:"linear-gradient(135deg,var(--bl2),var(--tl),var(--gr))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"gs 3.5s linear infinite"}}>
                One Sequence
              </span><br/>at a Time.
            </h1>
            <p style={{fontSize:"1.05rem",lineHeight:1.75,color:"var(--dt2)",maxWidth:480,fontWeight:300,marginBottom:"2rem"}}>
              Real Three.js 3D molecules you can drag and rotate. Live Claude AI. Smith-Waterman alignment. RNA-seq dashboards. All in one research workspace.
            </p>
            <div style={{display:"flex",gap:".75rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
              <button className="btn btn-p" style={{padding:"13px 26px",fontSize:".93rem"}} onClick={()=>setPage("molecules")}>View 3D Molecules ↗</button>
              <button className="btn btn-g" style={{padding:"13px 26px",fontSize:".93rem"}} onClick={()=>setPage("explorer")}>Explore Proteins</button>
              <button className="btn btn-g btn-sm" style={{borderColor:"rgba(45,212,191,.25)",color:"var(--tl)"}} onClick={()=>setPage("ailab")}>✦ AI Lab</button>
            </div>
            {/* Glass feature rows (Image 5) */}
            <div style={{display:"flex",flexDirection:"column",gap:".6rem"}}>
              {[
                {icon:"◉",t:"Real Three.js 3D — drag, zoom, click atoms",locked:false},
                {icon:"≋",t:"Smith-Waterman alignment engine (C core)",locked:false},
                {icon:"✦",t:"Claude Sonnet 4 AI research assistant",locked:false},
                {icon:"◈",t:"Full RNA-seq omics pipeline",locked:true},
              ].map((r,i)=>(
                <div key={i} className="gr">
                  <div style={{width:34,height:34,borderRadius:9,background:r.locked?"rgba(255,255,255,.05)":"rgba(100,149,237,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:r.locked?.5:1}}>{r.icon}</div>
                  <span style={{fontSize:".85rem",fontWeight:500,color:r.locked?"var(--dt3)":"var(--dt)",flex:1}}>{r.t}</span>
                  <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:r.locked?"transparent":"rgba(52,211,153,.15)",border:`1px solid ${r.locked?"var(--db)":"rgba(52,211,153,.25)"}`,flexShrink:0}}>
                    {r.locked?<span style={{fontSize:".7rem"}}>🔒</span>:<span style={{color:"var(--gr)",fontSize:".8rem"}}>✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Stats + pill tab */}
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              {[["220k+","PDB Structures","var(--bl2)"],["800+","Tools Indexed","var(--tl)"],["40+","Courses","var(--gr)"],["2.8M+","Sequences","var(--am)"]].map(([n,l,c])=>(
                <div key={l} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"1.2rem",textAlign:"center",backdropFilter:"blur(12px)"}}>
                  <div style={{fontFamily:"var(--f1)",fontSize:"1.8rem",fontWeight:800,color:c}}>{n}</div>
                  <div style={{fontSize:".7rem",color:"var(--dt3)",fontFamily:"var(--f3)",textTransform:"uppercase",letterSpacing:".08em",marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:"1.5rem"}}>
              <div style={{fontFamily:"var(--f1)",fontSize:"1rem",fontWeight:700,marginBottom:"1rem"}}>Platform Tiers</div>
              <div className="ptabs" style={{marginBottom:"1rem"}}>
                {["Free","Premium"].map(t=><div key={t} className={`ptab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t}</div>)}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:"1rem"}}>
                {features[tab].map(f=>(
                  <div key={f.f} className="gr" style={{padding:"8px 12px"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:f.ok?"rgba(52,211,153,.15)":"transparent",border:`1px solid ${f.ok?"rgba(52,211,153,.25)":"var(--db)"}`,flexShrink:0}}>
                      {f.ok?<span style={{color:"var(--gr)",fontSize:".72rem"}}>✓</span>:<span style={{fontSize:".65rem"}}>🔒</span>}
                    </div>
                    <span style={{fontSize:".81rem",color:f.ok?"var(--dt)":"var(--dt3)"}}>{f.f}</span>
                  </div>
                ))}
              </div>
              {tab==="Premium"&&<button className="btn btn-p" style={{width:"100%"}} onClick={()=>setPage("settings")}>Continue — 1 month for $19 →</button>}
            </div>
          </div>
        </div>
      </div>

      {/* BOLD CARDS (Image 4) */}
      <div className="page">
        <div style={{marginBottom:"2rem"}}>
          <div className="ey">Research Modules</div>
          <h2 className="sh">Everything in one place.</h2>
          <p className="ss">Built for researchers who refuse to juggle twelve browser tabs.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1rem"}}>
          {[
            {icon:"◉",sub:"3D Chemistry",title:"Molecule Viewer",desc:"Real atom-bond models. Drag, scroll-zoom, click atoms to inspect. Three.js powered.",color:"#d1fae5",pg:"molecules"},
            {icon:"⬡",sub:"PDB Browser",title:"Structure Explorer",desc:"Interactive protein backbone viewer. 5 PDB entries, multiple render modes, legend.",color:"#dbeafe",pg:"explorer"},
            {icon:"≋",sub:"Alignment Engine",title:"Sequence Lab",desc:"Smith-Waterman local alignment. Nucleotide composition bars. FASTA input.",color:"#fef3c7",pg:"sequencer"},
            {icon:"🌿",sub:"Tree Builder",title:"Phylogenetics",desc:"NJ / ML / Bayesian evolutionary tree inference. SVG and Newick export.",color:"#ede9fe",pg:"phylo"},
            {icon:"◈",sub:"RNA-seq Analysis",title:"Omics Dashboard",desc:"Differential expression, DEG table, sparklines, expression bar chart.",color:"#fce7f3",pg:"omics"},
            {icon:"✦",sub:"Claude Sonnet 4",title:"AI Laboratory",desc:"Live bioinformatics AI. Interprets sequences, explains algorithms, writes code.",color:"#fee2e2",pg:"ailab"},
          ].map((c,i)=>(
            <div key={c.title} className={`bc fu d${i+1}`} style={{background:c.color}} onClick={()=>setPage(c.pg)}>
              <div style={{fontSize:"1.5rem",marginBottom:".75rem"}}>{c.icon}</div>
              <div style={{fontSize:".65rem",fontWeight:700,color:"rgba(26,26,46,.5)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:4,fontFamily:"var(--f3)"}}>{c.sub}</div>
              <div className="bc-t">{c.title}</div>
              <div style={{fontSize:".8rem",color:"rgba(26,26,46,.65)",lineHeight:1.55}}>{c.desc}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:"1rem",fontSize:".78rem",fontWeight:700,color:"rgba(26,26,46,.7)"}}>Explore →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MOLECULE PAGE
// ══════════════════════════════════════════════════════════════════════════════
function MoleculePage({ toast }) {
  const [mol, setMol] = useState("caffeine");
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Interactive 3D Viewer</div><h2 className="sh">Molecular Structure Explorer</h2><p className="ss">Real Three.js rendering. Drag to rotate, scroll to zoom, click atoms to inspect.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:"1.5rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".75rem"}}>Select Molecule</div>
            {Object.entries(MOLS).map(([key,val])=>(
              <div key={key} onClick={()=>setMol(key)} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",background:mol===key?"rgba(100,149,237,.1)":"transparent",border:`1px solid ${mol===key?"var(--db2)":"transparent"}`,marginBottom:6,transition:"all .15s"}}>
                <div style={{fontWeight:600,fontSize:".86rem",color:mol===key?"var(--bl2)":"var(--dt)"}}>{key.charAt(0).toUpperCase()+key.slice(1)}</div>
                <div style={{fontFamily:"var(--f3)",fontSize:".68rem",color:"var(--dt3)",marginTop:2}}>{val.atoms.length} atoms · {val.bonds.length} bonds</div>
              </div>
            ))}
          </div>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".75rem"}}>Atom Legend</div>
            {[["N","#3b82f6","Nitrogen"],["C","#94a3b8","Carbon"],["O","#f43f5e","Oxygen"],["P","#f97316","Phosphorus"]].map(([sym,col,name])=>(
              <div key={sym} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,fontSize:".8rem"}}>
                <div style={{width:14,height:14,borderRadius:"50%",background:col,flexShrink:0}}/>
                <span style={{fontFamily:"var(--f3)",color:"var(--dt2)"}}>{sym}</span>
                <span style={{color:"var(--dt3)",fontSize:".75rem"}}>{name}</span>
              </div>
            ))}
          </div>
          <div className="card card-p" style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
            <button className="btn btn-g btn-sm" onClick={()=>toast("Downloading .mol...","s")}>⬇ .mol</button>
            <button className="btn btn-g btn-sm" onClick={()=>toast("Downloading .pdb...","s")}>⬇ .pdb</button>
            <button className="btn btn-p btn-sm" onClick={()=>toast("Fullscreen mode","i")}>⛶ Fullscreen</button>
          </div>
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <div className="ph"><span className="pt">{MOLS[mol].name}</span><span className="bdg bdg-b">{MOLS[mol].atoms.length} atoms</span></div>
          <div style={{padding:"1rem"}}><MoleculeViewer molKey={mol} height={460}/></div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  EXPLORER — device-native feel (Image 2)
// ══════════════════════════════════════════════════════════════════════════════
function ExplorerPage({ toast }) {
  const [sel, setSel] = useState(PROTEINS[0]);
  const [mode, setMode] = useState("Backbone");
  const [devt, setDevt] = useState({ac:false,lights:true,sound:false,cast:false});
  const dt = k => setDevt(t=>({...t,[k]:!t[k]}));
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">PDB Structure Viewer</div><h2 className="sh">Protein Structure Explorer</h2><p className="ss">Three.js backbone renderer — drag to rotate, scroll to zoom.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"250px 1fr 210px",gap:"1.5rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div className="card">
            <div className="ph"><span className="pt">Library</span><span className="bdg bdg-b">{PROTEINS.length}</span></div>
            <div style={{padding:".5rem"}}>
              {PROTEINS.map(p=>(
                <div key={p.id} onClick={()=>setSel(p)} style={{padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:3,background:sel.id===p.id?"rgba(100,149,237,.1)":"transparent",border:`1px solid ${sel.id===p.id?"var(--db2)":"transparent"}`,transition:"all .15s"}}>
                  <div style={{fontWeight:600,fontSize:".86rem",color:sel.id===p.id?"var(--bl2)":"var(--dt)"}}>{p.name}</div>
                  <div style={{fontFamily:"var(--f3)",fontSize:".7rem",color:"var(--tl)",marginTop:2}}>PDB: {p.id}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".75rem"}}>Structure Data</div>
            {[["PDB",sel.id],["Residues",sel.res],["Chains",sel.chains],["Method",sel.method],["Resolution",sel.res_],["MW",sel.mw]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.03)",fontSize:".8rem"}}>
                <span style={{color:"var(--dt3)",fontFamily:"var(--f3)"}}>{k}</span>
                <span style={{color:"var(--bl2)",fontFamily:"var(--f3)"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{display:"flex",flexDirection:"column"}}>
          <div className="ph">
            <span className="pt">{sel.name} <span style={{color:"var(--dt3)",fontWeight:400}}>({sel.id})</span></span>
            <div style={{display:"flex",gap:5}}>
              {["Backbone","Surface","Ribbon"].map(m=><button key={m} className={`btn btn-xs ${mode===m?"btn-p":"btn-g"}`} onClick={()=>{setMode(m);toast(`Mode: ${m}`,"i")}}>{m}</button>)}
            </div>
          </div>
          <div style={{flex:1,padding:"1rem"}}><ProteinViewer proteinId={sel.id} height={440}/></div>
          <div style={{padding:".75rem 1.25rem",borderTop:"1px solid var(--db)",display:"flex",gap:".75rem",justifyContent:"flex-end"}}>
            <button className="btn btn-g btn-xs" onClick={()=>toast(`Downloading ${sel.id}.pdb`,"s")}>⬇ PDB</button>
            <button className="btn btn-g btn-xs" onClick={()=>toast(`Sharing ${sel.id}`,"i")}>↗ Share</button>
          </div>
        </div>

        {/* Device-native card (Image 2) */}
        <div>
          <div className="lbl" style={{marginBottom:".75rem"}}>Quick Controls</div>
          <div className="dv-card">
            <div style={{padding:"14px 16px 8px",borderBottom:"1px solid #f0f0f0"}}>
              <div style={{fontWeight:800,fontSize:"1rem",color:"#2d3748"}}>Structure Tools</div>
              <div style={{fontSize:".72rem",color:"#f6a623",marginTop:2}}>🔧 {sel.id} · {sel.res} res</div>
            </div>
            <div style={{padding:"10px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  {k:"ac",icon:"❄️",val:devt.ac?"Rotating":"Paused",lbl:"3D View"},
                  {k:"lights",icon:"💡",val:devt.lights?"Lit":"Dark",lbl:"Lighting"},
                  {k:"sound",icon:"🔊",val:devt.sound?"On":"Off",lbl:"Audio"},
                  {k:"cast",icon:"📺",val:devt.cast?"Casting":"Local",lbl:"Display"},
                ].map(item=>(
                  <div key={item.k} className="dv-item" style={{flexDirection:"column",alignItems:"flex-start",cursor:"pointer"}} onClick={()=>dt(item.k)}>
                    <div style={{fontSize:"1.1rem",marginBottom:5}}>{item.icon}</div>
                    <div style={{fontWeight:800,fontSize:".85rem",color:"#2d3748"}}>{item.val}</div>
                    <div style={{fontSize:".65rem",color:"#8a9ab5"}}>{item.lbl}</div>
                    <div style={{marginTop:8}}><OTog on={devt[item.k]} toggle={()=>dt(item.k)}/></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{padding:"0 10px 10px"}}>
              <button style={{width:"100%",background:"#fff",border:"1px dashed #d1d9e0",borderRadius:12,padding:"9px",color:"#718096",fontSize:".8rem",cursor:"pointer",fontFamily:"var(--f2)"}}>+ Add Preset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SEQUENCER
// ══════════════════════════════════════════════════════════════════════════════
function SequencerPage({ toast }) {
  const [query, setQuery] = useState("ATGCGATAGCTTACGG");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true); await new Promise(r=>setTimeout(r,1300));
    setResult({score:Math.floor(Math.random()*80+120),eVal:(Math.random()*.0001).toExponential(2),ident:`${Math.floor(Math.random()*20+78)}%`,gaps:`${Math.floor(Math.random()*5)}%`});
    setLoading(false); toast("Alignment complete!","s");
  };
  const counts = ["A","T","G","C"].map(b=>({b,pct:((SEQ.match(new RegExp(b,"gi"))||[]).length/SEQ.length*100)}));
  const cols = {A:"#f87171",T:"#34d399",G:"#60a5fa",C:"#fbbf24"};
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Sequence Laboratory</div><h2 className="sh">Alignment & Analysis</h2><p className="ss">Smith-Waterman local alignment. SIMD-accelerated C core.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}}>
        <div className="card card-p">
          <div className="lbl">Reference Sequence (HBB)</div>
          <SeqDisplay seq={SEQ}/>
          <div style={{display:"flex",gap:"1rem",marginTop:".75rem"}}>{counts.map(({b,pct})=><div key={b} style={{fontFamily:"var(--f3)",fontSize:".75rem"}}><span style={{color:cols[b]}}>{b}</span><span style={{color:"var(--dt3)",marginLeft:4}}>{pct.toFixed(1)}%</span></div>)}</div>
        </div>
        <div className="card card-p">
          <div className="lbl">Query Sequence</div>
          <textarea value={query} onChange={e=>setQuery(e.target.value)} style={{width:"100%",minHeight:100,background:"rgba(0,0,0,.4)",border:"1px solid var(--db)",borderRadius:10,color:"var(--tl)",fontFamily:"var(--f3)",fontSize:".78rem",padding:".9rem",resize:"vertical",lineHeight:1.9}} placeholder="Paste FASTA or raw sequence..."/>
          <div style={{display:"flex",gap:".75rem",marginTop:".75rem"}}>
            <button className="btn btn-p" style={{flex:1}} onClick={run} disabled={loading}>{loading?<><Spinner/>Running...</>:"▶ Run Smith-Waterman"}</button>
            <button className="btn btn-g btn-sm" onClick={()=>toast("Opening NCBI BLAST...","i")}>BLAST ↗</button>
          </div>
        </div>
      </div>
      {result&&!loading&&(
        <div className="card card-p fi" style={{marginBottom:"1.5rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}><span style={{fontFamily:"var(--f1)",fontWeight:700,fontSize:"1.05rem"}}>Alignment Results</span><span className="bdg bdg-g">✓ Complete</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.25rem"}}>
            {[["Score",result.score,"var(--bl2)"],["E-Value",result.eVal,"var(--gr)"],["Identity",result.ident,"var(--tl)"],["Gaps",result.gaps,"var(--am)"]].map(([k,v,c])=>(
              <div key={k} style={{textAlign:"center",padding:"1rem",background:"rgba(0,0,0,.3)",borderRadius:12,border:"1px solid var(--db)"}}>
                <div style={{fontFamily:"var(--f3)",fontSize:".63rem",color:"var(--dt3)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>{k}</div>
                <div style={{fontFamily:"var(--f1)",fontSize:"1.4rem",fontWeight:800,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          <pre style={{fontFamily:"var(--f3)",fontSize:".76rem",background:"rgba(0,0,0,.5)",border:"1px solid var(--db)",borderRadius:10,padding:"1rem",color:"var(--tl)",lineHeight:1.9,overflow:"auto"}}>{`Query:  ${query}\n        ${"|||||||||||".padEnd(query.length,".")}\nSbjct:  ${SEQ.slice(0,query.length)}`}</pre>
        </div>
      )}
      <div className="card card-p">
        <div style={{fontFamily:"var(--f1)",fontWeight:700,marginBottom:"1rem"}}>Nucleotide Composition</div>
        {["A","T","G","C"].map(b=>{
          const pct = ((SEQ.match(new RegExp(b,"gi"))||[]).length/SEQ.length*100);
          return (
            <div key={b} style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:".7rem"}}>
              <span style={{fontFamily:"var(--f3)",fontSize:".78rem",width:14,color:cols[b],fontWeight:700}}>{b}</span>
              <div className="prog" style={{flex:1}}><div className="prog-f" style={{width:`${pct}%`,background:cols[b]}}/></div>
              <span style={{fontFamily:"var(--f3)",fontSize:".73rem",color:"var(--dt3)",width:40,textAlign:"right"}}>{pct.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PHYLO
// ══════════════════════════════════════════════════════════════════════════════
function PhyloPage({ toast }) {
  const [method, setMethod] = useState("ML");
  const nodes = [{x:40,y:150,leaf:false},{x:130,y:80,leaf:false},{x:130,y:220,leaf:false},{x:220,y:45,leaf:true,label:"H. sapiens"},{x:220,y:115,leaf:true,label:"M. musculus"},{x:220,y:185,leaf:true,label:"G. gallus"},{x:220,y:255,leaf:false},{x:310,y:235,leaf:true,label:"D. melanogaster"},{x:310,y:275,leaf:true,label:"C. elegans"},{x:390,y:235,leaf:true,label:"A. thaliana"},{x:390,y:275,leaf:true,label:"S. cerevisiae"}];
  const links = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[6,7],[6,8],[7,9],[7,10]];
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Evolutionary Analysis</div><h2 className="sh">Phylogenetic Tree Builder</h2><p className="ss">Maximum likelihood, NJ, Bayesian — interactive SVG output.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:"1.5rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".75rem"}}>Method</div>
            {["NJ","ML","Bayesian","UPGMA"].map(m=>(
              <div key={m} onClick={()=>setMethod(m)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,cursor:"pointer",background:method===m?"rgba(100,149,237,.1)":"transparent",border:`1px solid ${method===m?"var(--db2)":"transparent"}`,marginBottom:4,transition:"all .15s",fontSize:".84rem"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:method===m?"var(--bl2)":"rgba(255,255,255,.15)"}}/>
                <span style={{color:method===m?"var(--bl2)":"var(--dt2)",fontWeight:method===m?600:400}}>{m}</span>
                {m==="ML"&&<span className="bdg bdg-t" style={{marginLeft:"auto",fontSize:".58rem",padding:"1px 5px"}}>Rec.</span>}
              </div>
            ))}
            <button className="btn btn-p" style={{width:"100%",marginTop:".75rem"}} onClick={()=>toast(`${method} tree built — 1000 bootstrap replicates`,"s")}>Build Tree</button>
          </div>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".5rem"}}>Model</div>
            <div style={{fontFamily:"var(--f3)",fontSize:".75rem",color:"var(--tl)",marginBottom:4}}>GTR+G+I</div>
            <div style={{fontSize:".75rem",color:"var(--dt3)",lineHeight:1.5}}>General time-reversible with gamma rate heterogeneity</div>
          </div>
          <div className="card card-p" style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
            <button className="btn btn-g btn-sm" onClick={()=>toast("SVG exported","s")}>⬇ Export SVG</button>
            <button className="btn btn-g btn-sm" onClick={()=>toast("Newick exported","s")}>⬇ Newick</button>
          </div>
        </div>
        <div className="card">
          <div className="ph"><span className="pt">Phylogenetic Tree · {method}</span><span className="bdg bdg-b">11 taxa · Bootstrap 1000</span></div>
          <div style={{padding:"1.5rem",overflowX:"auto"}}>
            <svg width="100%" viewBox="0 0 480 300" style={{fontFamily:"var(--f3)"}}>
              {links.map((l,i)=><line key={i} x1={nodes[l[0]].x} y1={nodes[l[0]].y} x2={nodes[l[1]].x} y2={nodes[l[1]].y} stroke="rgba(100,149,237,.35)" strokeWidth="1.5"/>)}
              {nodes.map((n,i)=>(
                <g key={i} style={{cursor:"pointer"}}>
                  <circle cx={n.x} cy={n.y} r={n.leaf?5:7} fill={n.leaf?"var(--tl)":"#0f1424"} stroke={n.leaf?"var(--tl)":"var(--bl2)"} strokeWidth="1.5"/>
                  {n.leaf&&n.label&&<text x={n.x+10} y={n.y+4} fontSize="10" fill="#94a3b8" fontStyle="italic">{n.label}</text>}
                </g>
              ))}
            </svg>
          </div>
          <div style={{padding:".75rem 1.25rem",borderTop:"1px solid var(--db)",display:"flex",gap:"1.5rem",fontFamily:"var(--f3)",fontSize:".7rem",color:"var(--dt3)"}}>
            <span>Log-L: <span style={{color:"var(--bl2)"}}>−4821.3</span></span>
            <span>AIC: <span style={{color:"var(--bl2)"}}>9684.6</span></span>
            <span>BIC: <span style={{color:"var(--bl2)"}}>9912.1</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  OMICS
// ══════════════════════════════════════════════════════════════════════════════
function OmicsPage({ toast }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="up"?GENES.filter(g=>g.logfc>1.5):filter==="down"?GENES.filter(g=>g.logfc<-1.5):GENES;
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Omics Analysis</div><h2 className="sh">Transcriptomics Dashboard</h2><p className="ss">RNA-seq differential expression. DESeq2-grade negative binomial GLM.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
        {[{lbl:"Total Genes",num:"24,532",chg:"+2.1%",up:true,s:[40,55,48,72,65,80,90]},{lbl:"Upregulated",num:"1,847",chg:"+18%",up:true,s:[20,30,45,65,80,95,105]},{lbl:"Downregulated",num:"1,203",chg:"−8%",up:false,s:[80,70,60,50,40,35,30]},{lbl:"Pathways Hit",num:"342",chg:"+7%",up:true,s:[30,40,50,60,70,75,80]}].map((s,i)=>(
          <div key={s.lbl} className={`card card-p fu d${i+1}`}>
            <div style={{fontFamily:"var(--f3)",fontSize:".63rem",color:"var(--dt3)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>{s.lbl}</div>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
              <div style={{fontFamily:"var(--f1)",fontSize:"1.8rem",fontWeight:800,color:"var(--bl2)"}}>{s.num}</div>
              <Sparkline data={s.s} color={s.up?"var(--gr)":"var(--ro)"}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:5,fontSize:".74rem",color:s.up?"var(--gr)":"var(--ro)"}}><span>{s.up?"▲":"▼"}</span>{s.chg} vs control</div>
          </div>
        ))}
      </div>
      <div className="card card-p" style={{marginBottom:"1.5rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
          <div style={{fontFamily:"var(--f1)",fontWeight:700}}>Expression Profile — Top 20 Genes</div>
          <div style={{display:"flex",gap:6}}>
            {["all","up","down"].map(f=><button key={f} className={`btn btn-xs ${filter===f?"btn-p":"btn-g"}`} onClick={()=>setFilter(f)}>{f==="all"?"All":f==="up"?"▲ Up":"▼ Down"}</button>)}
          </div>
        </div>
        <MiniBar data={BARS} height={80}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontFamily:"var(--f3)",fontSize:".62rem",color:"var(--dt3)",padding:"0 2px"}}>
          {[1,5,10,15,20].map(n=><span key={n}>{n}</span>)}
        </div>
      </div>
      <div className="card">
        <div className="ph">
          <span className="pt">Differentially Expressed Genes</span>
          <div style={{display:"flex",gap:6}}><span className="bdg bdg-b">{filtered.length} genes</span><button className="btn btn-g btn-xs" onClick={()=>toast("Exporting CSV...","s")}>⬇ CSV</button></div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table className="tbl">
            <thead><tr><th>Gene</th><th>log₂FC</th><th>Adj. p-val</th><th>Expression</th><th>Trend</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(g=>(
                <tr key={g.name}>
                  <td style={{fontFamily:"var(--f3)",fontWeight:700,color:"var(--dt)"}}>{g.name}</td>
                  <td style={{fontFamily:"var(--f3)",color:g.logfc>0?"var(--gr)":"var(--ro)",fontWeight:600}}>{g.logfc>0?"+":""}{g.logfc}</td>
                  <td style={{fontFamily:"var(--f3)",color:g.padj<.01?"var(--tl)":"var(--am)"}}>{g.padj}</td>
                  <td style={{fontFamily:"var(--f3)"}}>{g.expr.toLocaleString()}</td>
                  <td><Sparkline data={g.trend} color={g.logfc>0?"var(--gr)":"var(--ro)"}/></td>
                  <td><span className={`bdg ${g.logfc>1.5?"bdg-g":g.logfc<-1.5?"bdg-r":"bdg-a"}`}>{g.logfc>1.5?"▲ Up":g.logfc<-1.5?"▼ Down":"~ Stable"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  TOOLS
// ══════════════════════════════════════════════════════════════════════════════
function ToolsPage({ toast }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const CATS = [["all","All"],["seq","Sequence"],["struct","Structure"],["phylo","Phylogenetics"],["omics","Omics"]];
  const BADGE = {seq:"bdg-b",struct:"bdg-t",phylo:"bdg-g",omics:"bdg-a"};
  const CLABEL = {seq:"Seq",struct:"3D",phylo:"Phylo",omics:"Omics"};
  const filtered = TOOLS.filter(t=>(cat==="all"||t.cat===cat)&&(t.name+t.desc).toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Tool Directory</div><h2 className="sh">The Bioinformatics Toolkit</h2><p className="ss">Curated, documented, categorised — the essential software for every workflow.</p></div>
      <input className="inp" style={{marginBottom:"1.25rem",fontSize:".95rem",padding:"14px 18px"}} placeholder="Search tools — BLAST, AlphaFold, DESeq2..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <div style={{display:"flex",gap:".5rem",marginBottom:"1.75rem",flexWrap:"wrap",alignItems:"center"}}>
        {CATS.map(([v,l])=><button key={v} className={`btn btn-sm ${cat===v?"btn-p":"btn-g"}`} onClick={()=>setCat(v)}>{l}</button>)}
        <span style={{marginLeft:"auto",fontFamily:"var(--f3)",fontSize:".73rem",color:"var(--dt3)"}}>{filtered.length} tools</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1rem"}}>
        {filtered.map((t,i)=>(
          <div key={t.name} className="card card-p fu" style={{animationDelay:`${i*.04}s`,opacity:0}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:".75rem"}}>
              <div style={{fontFamily:"var(--f1)",fontWeight:700,fontSize:"1.02rem"}}>{t.name}</div>
              <span className={`bdg ${BADGE[t.cat]||"bdg-b"}`}>{CLABEL[t.cat]||t.cat}</span>
            </div>
            <div style={{fontSize:".82rem",color:"var(--dt2)",lineHeight:1.62,marginBottom:"1rem"}}>{t.desc}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".9rem"}}>
              <span style={{fontFamily:"var(--f3)",fontSize:".7rem",color:"var(--dt3)"}}>// {t.lang}</span>
              <span style={{color:"var(--am)",fontSize:".75rem"}}>⭐ {t.stars}</span>
            </div>
            <div style={{display:"flex",gap:".5rem"}}>
              <button className="btn btn-g btn-xs" style={{flex:1}} onClick={()=>toast(`${t.name} docs opening...`,"i")}>Docs ↗</button>
              <button className="btn btn-p btn-xs" onClick={()=>toast(`${t.name} launched`,"s")}>Launch</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  AI LAB
// ══════════════════════════════════════════════════════════════════════════════
function AILabPage({ toast }) {
  const [msgs, setMsgs] = useState([{role:"ai",text:"Welcome to **BioNexus AI Lab** — powered by Claude Sonnet 4.\n\nI specialise in:\n• Sequence interpretation & alignment analysis\n• Protein structure-function relationships\n• RNA-seq pipeline debugging (Python, R, Bash)\n• Algorithm explanations (Smith-Waterman, BLAST, HMMs)\n• Drug discovery ML concepts\n\nWhat would you like to explore?"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const PRESETS = ["How does Smith-Waterman differ from Needleman-Wunsch?","Explain AlphaFold2's attention mechanism","Write Python to parse PDB files with Biopython","What is the central dogma of molecular biology?","How do I interpret RNA-seq log2 fold change values?"];
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);

  const send = async (text) => {
    const q = text||input.trim();
    if (!q||loading) return;
    setInput(""); setMsgs(m=>[...m,{role:"user",text:q}]); setLoading(true);
    try {
      const res = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:q}]})});
      const data = await res.json();
      setMsgs(m=>[...m,{role:"ai",text:data?.content?.[0]?.text||"Unable to get a response. Please try again."}]);
    } catch {
      setMsgs(m=>[...m,{role:"ai",text:"Connection error. Please check your network and try again."}]);
    }
    setLoading(false);
  };

  const renderText = text => text.split("\n").map((line,i)=>(
    <div key={i} style={{marginBottom:line===""?".5rem":0}}>
      {line.split(/\*\*(.*?)\*\*/g).map((part,j)=>j%2===1?<strong key={j} style={{color:"var(--tl)",fontFamily:"var(--f3)"}}>{part}</strong>:<span key={j}>{part}</span>)}
    </div>
  ));

  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">AI-Powered Research</div><h2 className="sh">Bioinformatics AI Laboratory</h2><p className="ss">Claude Sonnet 4 — research-grade AI with real-time responses.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:"1.5rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".75rem"}}>Quick Prompts</div>
            {PRESETS.map((p,i)=>(
              <div key={i} onClick={()=>send(p)} style={{padding:"8px 10px",borderRadius:8,fontSize:".78rem",cursor:"pointer",color:"var(--dt2)",lineHeight:1.45,marginBottom:6,border:"1px solid transparent",transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(100,149,237,.07)";e.currentTarget.style.borderColor="var(--db)";e.currentTarget.style.color="var(--dt)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color="var(--dt2)"}}>
                {p}
              </div>
            ))}
          </div>
          <div className="card card-p">
            <div className="lbl" style={{marginBottom:".6rem"}}>Model</div>
            <div style={{background:"rgba(100,149,237,.07)",border:"1px solid var(--db2)",borderRadius:9,padding:"8px 10px"}}>
              <div style={{fontFamily:"var(--f3)",fontSize:".74rem",color:"var(--bl2)",fontWeight:600}}>claude-sonnet-4</div>
              <div style={{fontSize:".68rem",color:"var(--dt3)",marginTop:3}}>128k context · Live</div>
            </div>
            <div style={{marginTop:".75rem",display:"flex",alignItems:"center",gap:7,fontSize:".75rem",color:"var(--gr)"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"var(--gr)",animation:"pulse 2s infinite"}}/>AI Online
            </div>
          </div>
        </div>
        <div className="card" style={{display:"flex",flexDirection:"column"}}>
          <div className="ph"><span className="pt">Research Assistant</span><button className="btn btn-g btn-xs" onClick={()=>{setMsgs([{role:"ai",text:"Chat cleared."}]);toast("Chat cleared","i");}}>Clear</button></div>
          <div ref={ref} style={{flex:1,overflowY:"auto",padding:"1.25rem",display:"flex",flexDirection:"column",gap:".9rem",minHeight:380,maxHeight:480}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{maxWidth:"80%",padding:"11px 15px",borderRadius:14,fontSize:".86rem",lineHeight:1.65,alignSelf:m.role==="user"?"flex-end":"flex-start",background:m.role==="user"?"rgba(100,149,237,.18)":"rgba(255,255,255,.04)",border:`1px solid ${m.role==="user"?"rgba(100,149,237,.3)":"var(--db)"}`,borderBottomRightRadius:m.role==="user"?4:14,borderBottomLeftRadius:m.role==="ai"?4:14,color:m.role==="user"?"var(--dt)":"var(--dt2)"}}>
                {renderText(m.text)}
              </div>
            ))}
            {loading&&<div style={{alignSelf:"flex-start",padding:"11px 16px",borderRadius:14,background:"rgba(255,255,255,.04)",border:"1px solid var(--db)",borderBottomLeftRadius:4}}>
              {[0,.15,.3].map((d,i)=><span key={i} style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:"var(--tl)",animation:`pulse 1s ease ${d}s infinite`,margin:"0 2px"}}/>)}
            </div>}
          </div>
          <div style={{padding:".9rem 1.25rem",borderTop:"1px solid var(--db)",display:"flex",gap:".6rem",alignItems:"flex-end"}}>
            <textarea className="inp" rows={1} placeholder="Ask about sequences, structures, algorithms, pipelines..." value={input} onChange={e=>setInput(e.target.value)} style={{flex:1,resize:"none",minHeight:42,lineHeight:1.5}} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
            <button className="btn btn-p" style={{padding:"10px 14px",aspectRatio:"1"}} onClick={()=>send()} disabled={loading||!input.trim()}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  LEARN — Bold cards (Image 4)
// ══════════════════════════════════════════════════════════════════════════════
function LearnPage({ toast }) {
  const [search, setSearch] = useState("");
  const [lv, setLv] = useState("all");
  const [enrolled, setEnrolled] = useState({});
  const filtered = COURSES.filter(c=>(lv==="all"||c.lv===lv)&&c.title.toLowerCase().includes(search.toLowerCase()));
  const LV = {beg:"Beginner",int:"Intermediate",adv:"Advanced"};
  const LC = {beg:"var(--gr)",int:"var(--am)",adv:"var(--ro)"};
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Learning Hub</div><h2 className="sh">From Genes to Genomes</h2><p className="ss">Structured curriculum for biochemistry students and researchers entering computational biology.</p></div>
      <div style={{display:"flex",gap:"1rem",marginBottom:"1.5rem",flexWrap:"wrap"}}>
        <input className="inp" style={{flex:1,minWidth:200}} placeholder="Search courses..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={{display:"flex",gap:".5rem"}}>
          {[["all","All"],["beg","Beginner"],["int","Intermediate"],["adv","Advanced"]].map(([v,l])=><button key={v} className={`btn btn-sm ${lv===v?"btn-p":"btn-g"}`} onClick={()=>setLv(v)}>{l}</button>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.1rem"}}>
        {filtered.map((c,i)=>(
          <div key={c.title} className="card" style={{overflow:"hidden",cursor:"pointer"}}>
            <div style={{height:110,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.8rem",position:"relative"}}>
              {c.emoji}
              {enrolled[c.title]&&<div style={{position:"absolute",top:8,right:8,background:"var(--gr)",color:"#00050a",borderRadius:100,fontSize:".62rem",fontFamily:"var(--f3)",padding:"2px 7px",fontWeight:700}}>ENROLLED</div>}
            </div>
            <div style={{padding:"1.2rem"}}>
              <div style={{fontSize:".65rem",fontFamily:"var(--f3)",textTransform:"uppercase",letterSpacing:".1em",color:LC[c.lv],marginBottom:4}}>{LV[c.lv]}</div>
              <div style={{fontFamily:"var(--f1)",fontWeight:700,fontSize:".98rem",marginBottom:4,color:"var(--dt)"}}>{c.title}</div>
              <div style={{fontSize:".79rem",color:"var(--dt2)",lineHeight:1.55}}>{c.desc}</div>
              <div style={{display:"flex",gap:"1rem",marginTop:".85rem",fontFamily:"var(--f3)",fontSize:".68rem",color:"var(--dt3)"}}>
                <span>⏱ {c.dur}</span><span>📖 {c.mods}</span><span>👤 {c.students}</span>
              </div>
              {enrolled[c.title]&&<div style={{marginTop:".7rem"}}><div className="prog"><div className="prog-f" style={{width:"20%"}}/></div></div>}
              <div style={{display:"flex",gap:".5rem",marginTop:".9rem"}}>
                {enrolled[c.title]?
                  <button className="btn btn-p btn-sm" style={{flex:1}} onClick={()=>toast(`Resuming ${c.title}`,"i")}>Continue →</button>:
                  <button className="btn btn-p btn-sm" style={{flex:1}} onClick={()=>{setEnrolled(e=>({...e,[c.title]:true}));toast(`Enrolled: ${c.title}`,"s");}}>Enroll Free</button>}
                <button className="btn btn-g btn-sm" onClick={()=>toast("Bookmarked","i")}>🔖</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function DashboardPage({ user, toast }) {
  const [job, setJob] = useState(true);
  useEffect(()=>{const t=setTimeout(()=>setJob(false),9000);return()=>clearTimeout(t);},[]);
  return (
    <div className="page">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.75rem"}}>
        <div>
          <div className="ey">Research Workspace</div>
          <h2 className="sh" style={{marginBottom:".2rem"}}>Welcome back, {user?.name?.split(" ")[0]||"Researcher"}</h2>
          <div style={{color:"var(--dt3)",fontFamily:"var(--f3)",fontSize:".75rem"}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
        </div>
        <button className="btn btn-p btn-sm" onClick={()=>toast("Report generated","s")}>⬇ Export Report</button>
      </div>
      {job&&<div className="fi" style={{marginBottom:"1.5rem",padding:"1rem 1.25rem",borderRadius:14,background:"rgba(52,211,153,.06)",border:"1px solid rgba(52,211,153,.2)",display:"flex",alignItems:"center",gap:"1rem"}}>
        <div style={{width:9,height:9,borderRadius:"50%",background:"var(--gr)",animation:"pulse 1.5s infinite"}}/>
        <div style={{flex:1}}><div style={{fontSize:".87rem",fontWeight:600}}>AlphaFold2 Structure Prediction — Running</div><div style={{fontFamily:"var(--f3)",fontSize:".7rem",color:"var(--dt3)",marginTop:2}}>PROT_SEQ_024 · ~8 min remaining</div></div>
        <div className="prog" style={{width:130}}><div className="prog-f" style={{width:"42%",background:"var(--gr)"}}/></div>
        <span style={{fontFamily:"var(--f3)",fontSize:".73rem",color:"var(--gr)"}}>42%</span>
        <button className="btn btn-g btn-xs" onClick={()=>{setJob(false);toast("Job cancelled","e");}}>Cancel</button>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
        {[{lbl:"BLAST Searches",num:"1,247",chg:"+18%",up:true},{lbl:"Structures Saved",num:"34",chg:"+3 this week",up:true},{lbl:"Active Jobs",num:job?"2":"1",chg:job?"Running":"Idle",up:job},{lbl:"Courses Done",num:"3/9",chg:"+1 this week",up:true}].map((s,i)=>(
          <div key={s.lbl} className={`card card-p fu d${i+1}`}>
            <div style={{fontFamily:"var(--f3)",fontSize:".63rem",color:"var(--dt3)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>{s.lbl}</div>
            <div style={{fontFamily:"var(--f1)",fontSize:"1.9rem",fontWeight:800,color:"var(--bl2)"}}>{s.num}</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:5,fontSize:".74rem",color:s.up?"var(--gr)":"var(--ro)"}}><span>{s.up?"▲":"▼"}</span>{s.chg}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}}>
        <div className="card">
          <div className="ph"><span className="pt">Recent Activity</span><span className="bdg bdg-t" style={{display:"flex",gap:5,alignItems:"center"}}><div style={{width:5,height:5,borderRadius:"50%",background:"var(--tl)",animation:"pulse 2s infinite"}}/>Live</span></div>
          {ACTIVITY.map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:".6rem 1.25rem",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:a.col,flexShrink:0}}/>
              <div style={{fontSize:".81rem",color:"var(--dt2)",flex:1,lineHeight:1.4}}>{a.text}</div>
              <div style={{fontFamily:"var(--f3)",fontSize:".66rem",color:"var(--dt3)",whiteSpace:"nowrap"}}>{a.t} ago</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ph"><span className="pt">Active Sequence — HBB</span><button className="btn btn-g btn-xs" onClick={()=>toast("Copied!","s")}>Copy</button></div>
          <div style={{padding:"1.25rem"}}>
            <div style={{fontSize:".78rem",color:"var(--dt2)",marginBottom:".75rem"}}><em>Homo sapiens</em> · Hemoglobin β-chain · 120 bp</div>
            <SeqDisplay seq={SEQ}/>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="ph"><span className="pt">Saved Structures</span><button className="btn btn-g btn-xs">View all →</button></div>
        <table className="tbl">
          <thead><tr><th>PDB ID</th><th>Name</th><th>Organism</th><th>Residues</th><th>Method</th><th>Action</th></tr></thead>
          <tbody>
            {PROTEINS.map(p=>(
              <tr key={p.id}>
                <td style={{fontFamily:"var(--f3)",color:"var(--tl)",fontWeight:700}}>{p.id}</td>
                <td style={{fontWeight:500}}>{p.name}</td>
                <td style={{fontStyle:"italic",color:"var(--dt3)"}}>{p.org}</td>
                <td style={{fontFamily:"var(--f3)"}}>{p.res}</td>
                <td><span className="bdg bdg-b">{p.method}</span></td>
                <td><button className="btn btn-g btn-xs" onClick={()=>toast(`Opening ${p.id}`,"i")}>View ↗</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
function SettingsPage({ user, logout, toast }) {
  const [s, setS] = useState({notifications:true,darkMode:true,compact:false,autoSave:true,seqColor:true,orcid:false,digest:true});
  const tog = k => setS(v=>({...v,[k]:!v[k]}));
  return (
    <div className="page">
      <div style={{marginBottom:"1.5rem"}}><div className="ey">Account</div><h2 className="sh">Settings & Preferences</h2></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
        <div className="card">
          <div className="ph"><span className="pt">Profile</span></div>
          <div style={{padding:"1.5rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"}}>
              <div style={{width:58,height:58,borderRadius:14,background:"linear-gradient(135deg,var(--bl),var(--vi))",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"1.4rem",color:"#fff"}}>{(user?.name||"R")[0].toUpperCase()}</div>
              <div>
                <div style={{fontFamily:"var(--f1)",fontWeight:700,fontSize:"1.05rem"}}>{user?.name||"Researcher"}</div>
                <div style={{color:"var(--dt3)",fontSize:".8rem",fontFamily:"var(--f3)"}}>{user?.email||""}</div>
                <div style={{marginTop:5}}><span className="bdg bdg-b">{user?.role||"Researcher"}</span></div>
              </div>
            </div>
            {[["Display Name",user?.name||""],["Email",user?.email||""],["Institution","Independent"],["ORCID","Not linked"]].map(([k,v])=>(
              <div key={k} style={{marginBottom:"1rem"}}>
                <label className="lbl">{k}</label>
                <input className="inp" defaultValue={v} style={{fontSize:".88rem"}}/>
              </div>
            ))}
            <button className="btn btn-p btn-sm" onClick={()=>toast("Profile saved","s")}>Save Changes</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div className="card">
            <div className="ph"><span className="pt">Display</span></div>
            {[["darkMode","Dark Mode","System default dark theme"],["compact","Compact View","Reduce spacing in lists"],["seqColor","Sequence Coloring","Colour A/T/G/C bases"]].map(([k,label,sub])=>(
              <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".9rem 1.25rem",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
                <div><div style={{fontWeight:500,fontSize:".86rem"}}>{label}</div><div style={{fontSize:".73rem",color:"var(--dt3)",marginTop:2}}>{sub}</div></div>
                <NTog on={s[k]} toggle={()=>{tog(k);toast(`${label} ${!s[k]?"on":"off"}`,"i");}}/>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ph"><span className="pt">Notifications & Sync</span></div>
            {[["notifications","Push Notifications","Job completion alerts"],["autoSave","Auto-save Workspace","Every 5 minutes"],["digest","Weekly Digest","Summary email"],["orcid","Sync with ORCID","Link research profile"]].map(([k,label,sub])=>(
              <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".9rem 1.25rem",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
                <div><div style={{fontWeight:500,fontSize:".86rem"}}>{label}</div><div style={{fontSize:".73rem",color:"var(--dt3)",marginTop:2}}>{sub}</div></div>
                <NTog on={s[k]} toggle={()=>{tog(k);toast(`${label} ${!s[k]?"enabled":"disabled"}`,"i");}}/>
              </div>
            ))}
          </div>
          <div className="card card-p">
            <div style={{fontFamily:"var(--f1)",fontWeight:600,marginBottom:"1rem",color:"var(--ro)"}}>Danger Zone</div>
            <div style={{display:"flex",gap:".75rem"}}>
              <button className="btn btn-g btn-sm" onClick={()=>toast("Data exported","s")}>⬇ Export Data</button>
              <button className="btn btn-sm" style={{background:"rgba(244,63,94,.15)",color:"var(--ro)",border:"1px solid rgba(244,63,94,.25)"}} onClick={()=>{toast("Signed out","i");setTimeout(logout,600);}}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function BioNexus() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login");
  const [page, setPage] = useState("home");
  const [showCmd, setShowCmd] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type="i") => setToast({msg,type,id:Date.now()}), []);
  const login = u => { setUser(u); setPage("home"); };
  const logout = () => { setUser(null); setAuthView("login"); };

  useEffect(()=>{
    const fn = e => { if ((e.metaKey||e.ctrlKey)&&e.key==="k") { e.preventDefault(); setShowCmd(v=>!v); } };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[]);

  const pages = {
    home:<HomePage setPage={setPage}/>,
    explorer:<ExplorerPage toast={showToast}/>,
    molecules:<MoleculePage toast={showToast}/>,
    sequencer:<SequencerPage toast={showToast}/>,
    phylo:<PhyloPage toast={showToast}/>,
    omics:<OmicsPage toast={showToast}/>,
    tools:<ToolsPage toast={showToast}/>,
    ailab:<AILabPage toast={showToast}/>,
    learn:<LearnPage toast={showToast}/>,
    dashboard:<DashboardPage user={user} toast={showToast}/>,
    settings:<SettingsPage user={user} logout={logout} toast={showToast}/>,
  };

  return (
    <>
      <style>{G}</style>
      {!user ? (
        authView==="login"
          ? <LoginPage onLogin={login} goReg={()=>setAuthView("register")}/>
          : <RegisterPage onLogin={login} goLogin={()=>setAuthView("login")}/>
      ) : (
        <div className="shell">
          <Sidebar page={page} setPage={setPage} user={user} logout={logout}/>
          <div className="main">
            <Topbar page={page} openCmd={()=>setShowCmd(true)} toast={showToast}/>
            <div key={page} className="fu">{pages[page]||<div className="page"><div className="sh">Not found</div></div>}</div>
          </div>
        </div>
      )}
      <CmdBar visible={showCmd} close={()=>setShowCmd(false)} setPage={p=>{setPage(p);if(!user)login({name:"Guest",email:"",role:"Visitor"});}}/>
      {toast&&<Toast key={toast.id} msg={toast.msg} type={toast.type} close={()=>setToast(null)}/>}
    </>
  );
}
