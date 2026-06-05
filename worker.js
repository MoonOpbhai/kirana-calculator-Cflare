export default {
  async fetch(request) {
    return new Response(HTML, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Kirana Hisab Calculator 🏪</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --g1:#0f4c2a;--g2:#166534;--g3:#15803d;--g4:#16a34a;
  --glight:#bbf7d0;--gpale:#f0fdf4;--gsoft:#dcfce7;
  --amber:#d97706;--amber2:#f59e0b;--amberpale:#fef3c7;
  --red:#dc2626;--redpale:#fee2e2;
  --text:#111827;--muted:#6b7280;--subtle:#9ca3af;
  --white:#fff;--bg:#f0faf4;--surface:#fff;
  --border:#e5e7eb;--bordergreen:#d1fae5;
  --r:16px;--rsm:10px;--rxs:6px;
  --shadow:0 2px 16px rgba(15,76,42,.10);
  --shadow2:0 8px 32px rgba(15,76,42,.15);
}
body{background:var(--bg);font-family:'Baloo 2',sans-serif;min-height:100vh;color:var(--text)}

/* === HEADER === */
.hdr{
  background:linear-gradient(160deg,#0a3d1f 0%,#166534 60%,#15803d 100%);
  padding:0;position:relative;overflow:hidden;
}
.hdr-pattern{
  position:absolute;inset:0;
  background-image:radial-gradient(circle at 20% 50%,rgba(255,255,255,.04) 0%,transparent 50%),
    radial-gradient(circle at 80% 20%,rgba(255,255,255,.06) 0%,transparent 40%),
    repeating-linear-gradient(60deg,transparent,transparent 30px,rgba(255,255,255,.015) 30px,rgba(255,255,255,.015) 31px);
}
.hdr-inner{position:relative;padding:24px 20px 20px;text-align:center}
.hdr-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);
  border-radius:20px;padding:4px 12px;font-size:11px;color:#86efac;
  margin-bottom:12px;letter-spacing:.5px;font-weight:500;
}
.hdr h1{
  font-size:28px;font-weight:800;color:#fff;line-height:1.2;
  text-shadow:0 2px 8px rgba(0,0,0,.2);
}
.hdr h1 span{color:#86efac}
.hdr-sub{font-size:13px;color:#a7f3d0;margin-top:6px;font-weight:400}
.hdr-stats{
  display:flex;justify-content:center;gap:0;
  margin-top:18px;background:rgba(0,0,0,.2);
  border-top:1px solid rgba(255,255,255,.1);
}
.hdr-stat{
  flex:1;padding:10px 8px;text-align:center;
  border-right:1px solid rgba(255,255,255,.08);
}
.hdr-stat:last-child{border-right:none}
.hdr-stat .sv{font-size:18px;font-weight:800;color:#fff}
.hdr-stat .sl{font-size:10px;color:#86efac;font-weight:500;margin-top:1px}

/* === MAIN WRAP === */
.wrap{max-width:500px;margin:0 auto;padding:0 0 32px}

/* === TABS === */
.tabs{
  display:flex;background:var(--white);
  border-bottom:2px solid var(--bordergreen);
  position:sticky;top:0;z-index:10;
  box-shadow:0 2px 8px rgba(0,0,0,.06);
}
.tab{
  flex:1;padding:14px 4px 12px;font-size:11.5px;font-weight:600;
  text-align:center;cursor:pointer;border:none;background:transparent;
  color:var(--muted);transition:all .2s;display:flex;
  flex-direction:column;align-items:center;gap:3px;font-family:'Baloo 2',sans-serif;
}
.tab-emoji{font-size:22px;line-height:1}
.tab.active{color:var(--g2);background:linear-gradient(to bottom,var(--gpale),var(--white))}
.tab-indicator{
  height:3px;width:0;background:var(--g3);border-radius:2px;
  transition:width .25s ease;margin-top:2px;
}
.tab.active .tab-indicator{width:32px}

/* === PANEL === */
.panel{display:none;padding:20px 16px 28px;animation:fadeUp .22s ease}
.panel.active{display:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* === SECTION HEAD === */
.shead{
  display:flex;align-items:center;gap:10px;
  margin-bottom:20px;
}
.shead-icon{
  width:38px;height:38px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;
}
.shead-icon.green{background:var(--gsoft)}
.shead-icon.amber{background:var(--amberpale)}
.shead h2{font-size:16px;font-weight:700;color:var(--g1);flex:1}
.info-btn{
  width:24px;height:24px;border-radius:50%;
  background:var(--gpale);border:1.5px solid var(--bordergreen);
  color:var(--g4);font-size:12px;font-weight:800;
  cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:all .18s;
}
.info-btn:hover{background:var(--glight);color:var(--g1);transform:scale(1.1)}

/* === FIELDS === */
.field{margin-bottom:14px}
.field label{
  display:flex;align-items:center;gap:5px;
  font-size:11px;font-weight:600;color:var(--muted);
  margin-bottom:7px;text-transform:uppercase;letter-spacing:.5px;
}
.field label .licon{font-size:13px}
.finput{
  width:100%;padding:12px 14px;
  font-size:16px;font-family:'Baloo 2',sans-serif;font-weight:500;
  border:2px solid var(--border);border-radius:var(--rsm);
  background:var(--white);color:var(--text);
  outline:none;transition:all .18s;
  -webkit-appearance:none;
}
.finput:focus{border-color:var(--g4);background:#fff;box-shadow:0 0 0 3px rgba(22,163,74,.1)}
.finput::placeholder{color:#d1d5db;font-weight:400}
.unit-row{display:flex;gap:8px}
.unit-row .finput{flex:1}
.fselect{
  width:105px;flex-shrink:0;padding:12px 10px;
  font-size:15px;font-family:'Baloo 2',sans-serif;font-weight:600;
  border:2px solid var(--border);border-radius:var(--rsm);
  background:var(--white);color:var(--g2);outline:none;cursor:pointer;
  transition:border-color .18s;
}
.fselect:focus{border-color:var(--g4)}

/* === CALC BUTTON === */
.cbtn{
  width:100%;padding:15px;margin-top:8px;
  font-size:16px;font-weight:700;font-family:'Baloo 2',sans-serif;
  background:linear-gradient(135deg,var(--g1),var(--g3));color:#fff;
  border:none;border-radius:var(--rsm);cursor:pointer;
  transition:all .2s;letter-spacing:.3px;
  box-shadow:0 4px 12px rgba(15,76,42,.3);
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.cbtn:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(15,76,42,.35)}
.cbtn:active{transform:scale(.98);box-shadow:0 2px 8px rgba(15,76,42,.25)}

/* === RESULT === */
.rbox{
  display:none;margin-top:16px;
  background:linear-gradient(135deg,var(--g1),#166534);
  border-radius:var(--rsm);padding:20px;
  animation:popIn .3s cubic-bezier(.34,1.56,.64,1);
  position:relative;overflow:hidden;
}
.rbox::before{
  content:'';position:absolute;top:-20px;right:-20px;
  width:80px;height:80px;border-radius:50%;
  background:rgba(255,255,255,.06);
}
.rbox.show{display:block}
.rlabel{font-size:10px;font-weight:600;color:#86efac;text-transform:uppercase;letter-spacing:.8px}
.rvalue{font-size:36px;font-weight:800;color:#fff;margin:4px 0 8px;line-height:1}
.rdetail{
  font-size:12px;color:#a7f3d0;
  background:rgba(255,255,255,.1);border-radius:6px;
  padding:7px 11px;line-height:1.5;
}
@keyframes popIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}

/* === BILL TAB === */
.chips-label{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.chip{
  padding:6px 12px;font-size:12px;font-weight:600;
  font-family:'Baloo 2',sans-serif;
  background:var(--white);color:var(--g2);
  border:1.5px solid var(--bordergreen);border-radius:20px;
  cursor:pointer;transition:all .15s;
}
.chip:active{background:var(--glight);transform:scale(.96)}

.add-form{
  background:var(--gpale);border:1.5px solid var(--bordergreen);
  border-radius:var(--r);padding:16px;margin-bottom:16px;
}
.add-form-title{font-size:12px;font-weight:600;color:var(--g3);margin-bottom:12px;text-transform:uppercase;letter-spacing:.4px}
.abtn{
  width:100%;padding:12px;margin-top:10px;
  font-size:14px;font-weight:700;font-family:'Baloo 2',sans-serif;
  color:var(--g1);background:var(--white);
  border:2px solid var(--bordergreen);border-radius:var(--rsm);
  cursor:pointer;transition:all .15s;
  display:flex;align-items:center;justify-content:center;gap:6px;
}
.abtn:hover{background:var(--glight);border-color:var(--glight)}
.abtn:active{transform:scale(.98)}

.bill-section{display:none}
.bill-section.show{display:block}
.bill-head-row{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:10px;
}
.bill-head{font-size:13px;font-weight:700;color:var(--g1)}
.bill-count{
  font-size:11px;font-weight:600;padding:3px 10px;
  background:var(--gsoft);color:var(--g3);border-radius:20px;
}
.item-row{
  display:flex;align-items:center;gap:8px;
  padding:11px 13px;background:var(--white);
  border:1.5px solid var(--border);border-radius:var(--rsm);
  margin-bottom:6px;transition:border-color .15s;
}
.item-row:hover{border-color:var(--bordergreen)}
.item-dot{width:8px;height:8px;border-radius:50%;background:var(--g4);flex-shrink:0}
.item-name{flex:1;font-size:13px;font-weight:600;color:var(--text)}
.item-qty{font-size:11px;font-weight:500;color:var(--muted);background:#f3f4f6;padding:2px 8px;border-radius:10px}
.item-price{font-size:14px;font-weight:700;color:var(--g2);min-width:64px;text-align:right}
.del-btn{
  background:var(--redpale);border:none;color:var(--red);
  cursor:pointer;font-size:13px;width:26px;height:26px;
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:all .15s;
}
.del-btn:hover{background:var(--red);color:#fff}

.total-bar{
  background:linear-gradient(135deg,var(--g1),var(--g3));
  border-radius:var(--rsm);padding:16px 18px;
  display:flex;justify-content:space-between;align-items:center;
  margin-top:14px;box-shadow:0 4px 12px rgba(15,76,42,.25);
}
.tl{font-size:13px;color:#a7f3d0;font-weight:500}
.tv{font-size:26px;font-weight:800;color:#fff}
.clear-btn{
  width:100%;margin-top:10px;padding:10px;
  background:transparent;border:1.5px solid #fca5a5;
  color:var(--red);font-size:13px;font-weight:600;
  font-family:'Baloo 2',sans-serif;cursor:pointer;
  border-radius:var(--rsm);transition:all .15s;
}
.clear-btn:hover{background:var(--redpale)}

/* === DIVIDER === */
.divider{height:1px;background:var(--bordergreen);margin:4px 0 16px}

/* === MODAL === */
.overlay{
  display:none;position:fixed;inset:0;
  background:rgba(0,0,0,.5);z-index:999;
  align-items:flex-end;justify-content:center;padding:0;
}
.overlay.open{display:flex}
.modal{
  background:var(--white);border-radius:24px 24px 0 0;
  width:100%;max-width:500px;max-height:80vh;overflow-y:auto;
  animation:slideUp .28s cubic-bezier(.34,1.2,.64,1);
}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.modal-handle{
  width:40px;height:4px;background:#e5e7eb;
  border-radius:2px;margin:12px auto 0;
}
.modal-hdr{
  background:linear-gradient(135deg,var(--g1),var(--g3));
  padding:18px 20px;
}
.modal-hdr h3{color:#fff;font-size:16px;font-weight:700}
.modal-hdr p{color:#a7f3d0;font-size:12px;margin-top:3px}
.modal-body{padding:20px}
.modal-body p{font-size:14px;color:var(--text);line-height:1.7;margin-bottom:10px}
.ebox{
  background:var(--gpale);border:1.5px solid var(--bordergreen);
  border-radius:var(--rsm);padding:14px 16px;margin:12px 0;
}
.etitle{font-size:10px;font-weight:700;color:var(--g4);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px}
.ebox p{font-size:13px;color:var(--g1);margin:0;line-height:1.8}
.modal-close-btn{
  width:100%;padding:13px;margin-top:4px;
  background:var(--g2);color:#fff;border:none;
  border-radius:var(--rsm);font-size:15px;font-weight:700;
  font-family:'Baloo 2',sans-serif;cursor:pointer;
}

/* === FOOTER === */
.footer{
  text-align:center;padding:20px 16px 8px;
  font-size:12px;color:var(--muted);
}
.footer strong{color:var(--g3)}

/* === EMPTY STATE === */
.empty{text-align:center;padding:28px 20px;color:var(--subtle)}
.empty-icon{font-size:36px;margin-bottom:8px}
.empty p{font-size:13px;line-height:1.6}
</style>
</head>
<body>

<!-- MODAL -->
<div class="overlay" id="overlay" onclick="closeModal(event)">
  <div class="modal" id="modal">
    <div class="modal-handle"></div>
    <div class="modal-hdr">
      <h3 id="m-title">Jankari</h3>
      <p id="m-sub"></p>
    </div>
    <div class="modal-body" id="m-body"></div>
  </div>
</div>

<!-- HEADER -->
<div class="hdr">
  <div class="hdr-pattern"></div>
  <div class="hdr-inner">
    <div class="hdr-badge">🏪 Kirana Store</div>
    <h1>Hisab <span>Calculator</span></h1>
    <p class="hdr-sub">Aasaan hisab — galti zero, faida zyada</p>
  </div>

</div>

<div class="wrap">
  <!-- TABS -->
  <div class="tabs">
    <button class="tab active" onclick="showTab('price')">
      <span class="tab-emoji">💰</span>
      <span>Gram se Daam</span>
      <div class="tab-indicator"></div>
    </button>
    <button class="tab" onclick="showTab('weight')">
      <span class="tab-emoji">⚖️</span>
      <span>Daam se Gram</span>
      <div class="tab-indicator"></div>
    </button>
    <button class="tab" onclick="showTab('bill')">
      <span class="tab-emoji">🧾</span>
      <span>Bill Banana</span>
      <div class="tab-indicator"></div>
    </button>
  </div>

  <!-- PANEL 1: Gram → Price -->
  <div id="panel-price" class="panel active">
    <div class="shead">
      <div class="shead-icon green">💰</div>
      <h2>Gram se Daam Nikalo</h2>
      <button class="info-btn" onclick="showInfo('price')">?</button>
    </div>

    <div class="field">
      <label><span class="licon">🏷️</span> Cheez ka naam</label>
      <input class="finput" type="text" id="p-name" placeholder="Jaise: Chini, Daal, Chawal..."/>
    </div>
    <div class="field">
      <label><span class="licon">📊</span> 1 Kilo ka rate (₹)</label>
      <input class="finput" type="number" id="p-rate" placeholder="Jaise: 240" inputmode="decimal"/>
    </div>
    <div class="field">
      <label><span class="licon">⚖️</span> Kitna lena hai?</label>
      <div class="unit-row">
        <input class="finput" type="number" id="p-qty" placeholder="Jaise: 70" inputmode="decimal"/>
        <select class="fselect" id="p-unit">
          <option value="gram">Gram</option>
          <option value="kg">Kilo</option>
        </select>
      </div>
    </div>

    <button class="cbtn" onclick="calcPrice()">
      <span>🧮</span> Hisab Lagao
    </button>

    <div id="price-result" class="rbox">
      <div class="rlabel">Total Dena Hoga</div>
      <div class="rvalue" id="price-ans">—</div>
      <div class="rdetail" id="price-detail"></div>
    </div>
  </div>

  <!-- PANEL 2: Price → Gram -->
  <div id="panel-weight" class="panel">
    <div class="shead">
      <div class="shead-icon amber">⚖️</div>
      <h2>Daam se Gram Nikalo</h2>
      <button class="info-btn" onclick="showInfo('weight')">?</button>
    </div>

    <div class="field">
      <label><span class="licon">🏷️</span> Cheez ka naam</label>
      <input class="finput" type="text" id="w-name" placeholder="Jaise: Chini, Daal, Chawal..."/>
    </div>
    <div class="field">
      <label><span class="licon">📊</span> 1 Kilo ka rate (₹)</label>
      <input class="finput" type="number" id="w-rate" placeholder="Jaise: 240" inputmode="decimal"/>
    </div>
    <div class="field">
      <label><span class="licon">💵</span> Kitne ₹ ki cheez chahiye?</label>
      <input class="finput" type="number" id="w-money" placeholder="Jaise: 30" inputmode="decimal"/>
    </div>

    <button class="cbtn" onclick="calcWeight()">
      <span>🧮</span> Hisab Lagao
    </button>

    <div id="weight-result" class="rbox">
      <div class="rlabel">Itna Gram Dena Hoga</div>
      <div class="rvalue" id="weight-ans">—</div>
      <div class="rdetail" id="weight-detail"></div>
    </div>
  </div>

  <!-- PANEL 3: Bill -->
  <div id="panel-bill" class="panel">
    <div class="shead">
      <div class="shead-icon green">🧾</div>
      <h2>Bill Banana</h2>
      <button class="info-btn" onclick="showInfo('bill')">?</button>
    </div>



    <div class="add-form">
      <div class="add-form-title">📝 Nayi cheez add karo</div>
      <div class="field">
        <label><span class="licon">🏷️</span> Cheez ka naam</label>
        <input class="finput" type="text" id="b-name" placeholder="Jaise: Chini"/>
      </div>
      <div class="field">
        <label><span class="licon">📊</span> 1 Kilo ka rate (₹)</label>
        <input class="finput" type="number" id="b-rate" placeholder="240" inputmode="decimal"/>
      </div>
      <div class="field" style="margin-bottom:0">
        <label><span class="licon">⚖️</span> Kitna lena hai?</label>
        <div class="unit-row">
          <input class="finput" type="number" id="b-qty" placeholder="500" inputmode="decimal"/>
          <select class="fselect" id="b-unit">
            <option value="gram">Gram</option>
            <option value="kg">Kilo</option>
          </select>
        </div>
      </div>
      <button class="abtn" onclick="addItem()">
        ➕ Bill Mein Jodon
      </button>
    </div>

    <div class="bill-section" id="bill-section">
      <div class="bill-head-row">
        <span class="bill-head">📋 Aaj ki khareedi</span>
        <span class="bill-count" id="bill-count">0 cheezein</span>
      </div>
      <div id="items-container"></div>
      <div class="total-bar">
        <div>
          <div class="tl">Kul Jama Daam</div>
          <div style="font-size:10px;color:#6ee7b7;margin-top:2px" id="items-summary"></div>
        </div>
        <span class="tv" id="grand-total">₹0</span>
      </div>
      <button class="clear-btn" onclick="clearBill()">🗑️ Poora bill saaf karo</button>
    </div>

    <div id="bill-empty" class="empty">
      <div class="empty-icon">🛒</div>
      <p>Abhi koi cheez nahi hai<br>Upar se add karo ya quick chips use karo</p>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="footer">
  Banaya gaya ❤️ aapke kirana dukaan ke liye &nbsp;·&nbsp; Hisab seedha, dukaan seedhi
</div>

<script>
const INFO = {
  price:{
    title:'💰 Gram se Daam',
    sub:'Kitne gram ki kitni price hogi',
    body:\`<p>Agar aapko pata hai ki <strong>1 kilo ka rate kya hai</strong>, aur aap jaanna chahte hain ki <strong>thode gram ke kitne paise lagenge</strong> — toh yeh wala use karo.</p>
    <div class="ebox"><div class="etitle">📌 Example</div>
    <p>Chini ka rate: <strong>₹240 / kilo</strong><br>Mujhe chahiye: <strong>70 gram</strong><br>➜ Total dena hoga: <strong>₹16.80</strong></p></div>
    <p style="font-size:13px;color:#6b7280;margin-top:10px">Gram ya Kilo dono mein daal sakte ho.</p>
    <button class="modal-close-btn" onclick="closeModalDirect()">✓ Samajh gaya</button>\`
  },
  weight:{
    title:'⚖️ Daam se Gram',
    sub:'Customer ne paisa diya — kitna gram dena hai?',
    body:\`<p>Agar customer kehta hai <strong>"itne rupaye ki cheez dedo"</strong> — aur aapko pata karna ho ki <strong>kitna gram dena hai</strong> — toh yeh wala use karo.</p>
    <div class="ebox"><div class="etitle">📌 Example</div>
    <p>Chini ka rate: <strong>₹240 / kilo</strong><br>Customer ne diye: <strong>₹30</strong><br>➜ Itna gram do: <strong>125 gram</strong></p></div>
    <p style="font-size:13px;color:#6b7280;margin-top:10px">Bohot kaam aata hai jab customer seedha paisa deta hai!</p>
    <button class="modal-close-btn" onclick="closeModalDirect()">✓ Samajh gaya</button>\`
  },
  bill:{
    title:'🧾 Bill Banana',
    sub:'Kai cheezein ek saath jodo',
    body:\`<p>Agar ek customer ne <strong>kai cheezein kharidi hain</strong>, toh sab ka daam ek jagah jod sakte ho aur <strong>total bill</strong> dekh sakte ho.</p>
    <div class="ebox"><div class="etitle">📌 Example</div>
    <p>Chini 500g → ₹120<br>Daal 250g → ₹30<br>Chawal 1kg → ₹60<br>➜ <strong>Kul Jama: ₹210</strong></p></div>
    <p style="font-size:13px;color:#6b7280;margin-top:10px">Oopar ke green chips se common cheezein jaldi add karo!</p>
    <button class="modal-close-btn" onclick="closeModalDirect()">✓ Samajh gaya</button>\`
  }
};

function showInfo(k){
  const d=INFO[k];
  document.getElementById('m-title').textContent=d.title;
  document.getElementById('m-sub').textContent=d.sub;
  document.getElementById('m-body').innerHTML=d.body;
  document.getElementById('overlay').classList.add('open');
}
function closeModal(e){if(e.target===document.getElementById('overlay'))closeModalDirect()}
function closeModalDirect(){document.getElementById('overlay').classList.remove('open')}

function showTab(name){
  const names=['price','weight','bill'];
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',names[i]===name));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
}

function calcPrice(){
  const rate=parseFloat(document.getElementById('p-rate').value);
  const qty=parseFloat(document.getElementById('p-qty').value);
  const unit=document.getElementById('p-unit').value;
  const name=document.getElementById('p-name').value.trim()||'Cheez';
  const box=document.getElementById('price-result');
  const ans=document.getElementById('price-ans');
  const det=document.getElementById('price-detail');
  if(!rate||!qty||rate<=0||qty<=0){
    ans.textContent='⚠️ Rate aur quantity dalo!';
    box.classList.add('show');det.textContent='';return;
  }
  const grams=unit==='kg'?qty*1000:qty;
  const price=(rate/1000)*grams;
  ans.textContent='₹'+price.toFixed(2);
  det.textContent=name+' — '+(unit==='kg'?qty+' kilo':qty+' gram')+' × ₹'+rate+'/kg = ₹'+price.toFixed(2);
  box.classList.add('show');
}

function calcWeight(){
  const rate=parseFloat(document.getElementById('w-rate').value);
  const money=parseFloat(document.getElementById('w-money').value);
  const name=document.getElementById('w-name').value.trim()||'Cheez';
  const box=document.getElementById('weight-result');
  const ans=document.getElementById('weight-ans');
  const det=document.getElementById('weight-detail');
  if(!rate||!money||rate<=0||money<=0){
    ans.textContent='⚠️ Rate aur paisa dalo!';
    box.classList.add('show');det.textContent='';return;
  }
  const grams=(money/rate)*1000;
  const rg=Math.round(grams*10)/10;
  ans.textContent=rg>=1000?(rg/1000).toFixed(3)+' Kilo':rg+' Gram';
  det.textContent='₹'+money+' mein '+name+': '+rg+' gram dena hoga';
  box.classList.add('show');
}

let billItems=[];
function quickAdd(name,rate){
  document.getElementById('b-name').value=name;
  document.getElementById('b-rate').value=rate;
  document.getElementById('b-qty').focus();
}
function addItem(){
  const name=document.getElementById('b-name').value.trim();
  const rate=parseFloat(document.getElementById('b-rate').value);
  const qty=parseFloat(document.getElementById('b-qty').value);
  const unit=document.getElementById('b-unit').value;
  if(!name||!rate||!qty)return;
  const grams=unit==='kg'?qty*1000:qty;
  const price=Math.round((rate/1000)*grams*100)/100;
  billItems.push({name,qty,unit,rate,price});
  renderBill();
  document.getElementById('b-name').value='';
  document.getElementById('b-rate').value='';
  document.getElementById('b-qty').value='';
}
function renderBill(){
  const cont=document.getElementById('items-container');
  const sec=document.getElementById('bill-section');
  const empty=document.getElementById('bill-empty');
  const cnt=document.getElementById('bill-count');
  const summ=document.getElementById('items-summary');
  if(!billItems.length){
    sec.classList.remove('show');
    empty.style.display='block';
    return;
  }
  empty.style.display='none';
  sec.classList.add('show');
  cnt.textContent=billItems.length+' cheez'+(billItems.length>1?'ein':'');
  cont.innerHTML=billItems.map((item,i)=>\`
    <div class="item-row">
      <div class="item-dot"></div>
      <span class="item-name">\${item.name}</span>
      <span class="item-qty">\${item.qty}\${item.unit==='kg'?'kg':'g'}</span>
      <span class="item-price">₹\${item.price.toFixed(2)}</span>
      <button class="del-btn" onclick="removeItem(\${i})">✕</button>
    </div>\`).join('');
  const total=billItems.reduce((s,i)=>s+i.price,0);
  document.getElementById('grand-total').textContent='₹'+total.toFixed(2);
  summ.textContent=billItems.length+' items ka total';
}
function removeItem(i){billItems.splice(i,1);renderBill()}
function clearBill(){billItems=[];renderBill()}

// Show empty state on load
document.getElementById('bill-empty').style.display='block';
</script>
</body>
</html>
`;
