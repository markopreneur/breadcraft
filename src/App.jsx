import React, { useState, useRef } from "react";

// ── Daten ────────────────────────────────────────────────────────────────────
const T=7;
const MS=[
  {id:"w550",l:"Weizenmehl 550",g:"Weizen",s:"Brot & Brötchen"},
  {id:"w1050",l:"Ruchmehl / 1050",g:"Weizen",s:"Aromatisch"},
  {id:"wvk",l:"Weizen Vollkorn",g:"Weizen",s:"Nährstoffreich"},
  {id:"r997",l:"Roggenmehl 997",g:"Roggen",s:"Mitteldunkel"},
  {id:"r1150",l:"Roggenmehl 1150",g:"Roggen",s:"Dunkel, kräftig"},
  {id:"rvk",l:"Roggen Vollkorn",g:"Roggen",s:"Intensiv"},
  {id:"d630",l:"Dinkelmehl 630",g:"Urgetreide",s:"Hell, mild"},
  {id:"d1050",l:"Dinkelmehl 1050",g:"Urgetreide",s:"Halbdunkel"},
  {id:"dvk",l:"Dinkel Vollkorn",g:"Urgetreide",s:"Kräftig, nussig"},
];
const MWDB=["Emmer hell","Emmer Vollkorn","Einkorn hell","Einkorn Vollkorn","Gelbweizen","Khorasan / Kamut","Hartweizen / Semola","Weizenmehl 405","Weizenmehl 812","Manitoba Mehl","Buchweizen","Hafermehl","Haferflocken fein","Champagnerroggen","Waldstaudenroggen","Amaranthmehl","Quinoamehl"];
const EQ=[
  {id:"dutch_oven",ic:"🫕",n:"Dutch Oven / Bräter",s:"Ideal für Sauerteig"},
  {id:"backstein",ic:"🪨",n:"Backstein oder Stahl",s:"Krosse Kruste"},
  {id:"kastenform",ic:"📦",n:"Kastenform",s:"Toast & Mischbrot"},
  {id:"gaerkorb",ic:"🧺",n:"Gärkörbchen",s:"Freigeschobene Brote"},
  {id:"km",ic:"⚙️",n:"Küchenmaschine",s:"z.B. KitchenAid"},
  {id:"thermomix",ic:"🌀",n:"Thermomix",s:"Kneten & Temperatur"},
  {id:"handarbeit",ic:"🤲",n:"Von Hand kneten",s:"Kochlöffel + Schüssel"},
  {id:"noknead",ic:"💤",n:"No-Knead",s:"Nur rühren, kein Kneten"},
];
const LVMAP={anfaenger:"Anfänger",fortgeschritten:"Geübt",profi:"Profi"};
const EQMAP={ofen:"Backofen",dutch_oven:"Dutch Oven",backstein:"Backstein",kastenform:"Kastenform",gaerkorb:"Gärkörbchen",km:"Küchenmaschine",thermomix:"Thermomix",handarbeit:"Von Hand",noknead:"No-Knead"};
const OFMAP={ober_unter:"Ober-/Unterhitze",umluft:"Umluft",heissluft:"Heißluft+Grill",dampf:"Dampfofen"};
const BDMAP={keine:"keine",schuessel:"Schüssel+Wasser",blumenspritze:"Einsprühen",eingebaut:"eingebaut"};
const ZTMAP={"2-3h":"2-3 Std.",halbtag:"Halber Tag",ganztag:"Ganzer Tag",overnight:"Über Nacht","2tage":"2 Tage"};
const ZPTYPEN=[
  {v:"hefe_direkt",l:"🧪 Hefe direkt"},{v:"hefe_overnight",l:"🌙 Hefe Übernacht"},
  {v:"st_sameday",l:"🌿 Sauerteig Same-Day"},{v:"st_overnight",l:"🌿🌙 Sauerteig Übernacht"},
  {v:"st_2stufen",l:"🌿🌿 Sauerteig 2-stufig"},{v:"mischbrot",l:"🔀 Mischbrot"},
];

// ── Illustrationen ───────────────────────────────────────────────────────────
// Feste Szenen-IDs. Die Bilder liegen unter public/szenen/<id>.webp
const SZENEN=["zutaten_wiegen","mehl_schuessel","wasser_zugeben","salz_zugeben",
"anstellgut_hell","anstellgut_dunkel","vorteig_ansetzen_hell",
"vorteig_ansetzen_dunkel","vorteig_reif_hell","vorteig_reif_dunkel","quellstueck","bruehstueck",
"bruehstueck_uebergiessen","kochstueck","mischen_loeffel","noknead_ruehren",
"kneten_hand","kneten_ruehrgeraet","kneten_maschine","kneten_thermomix","fenstertest",
"autolyse","teig_geblaeht","dehnen_falten","coil_fold","teig_stuerzen","teilen",
"vorformen","entspannen","gaerkorb_rund","kastenform_einlegen","ofen_vorheizen",
"einschiessen","bedampfen","backstein","backen","broetchen","dutch_oven",
"fladen_pfanne","stockbrot","abkuehlen","anschneiden","fertig_laib","fertig_scheiben"];
const SZ_LISTE=SZENEN.join(", ");

// Ein Schritt: Illustration links, Text rechts, Badges darunter.
function StepList({schritte}){
  if(!Array.isArray(schritte)||!schritte.length) return null;
  return <div>
    {schritte.map((st,i)=>{
      const txt = v => (v==null||v===false) ? "" :
        (typeof v==="object" ? (Array.isArray(v)?v.map(txt).join(", "):Object.values(v).map(txt).join(" – ")) : String(v));
      const o = (typeof st==="object" && st!==null && !Array.isArray(st));
      const szene = o && SZENEN.includes(st.szene) ? st.szene : null;
      const titel = o ? txt(st.titel) : "";
      const text  = o ? txt(st.text)  : txt(st);
      const zeit  = o ? txt(st.zeit)  : "";
      const tmp   = o ? txt(st.temp)  : "";
      return (
        <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:`1px solid ${C.s}`,alignItems:"flex-start"}}>
          {szene
            ? <img src={`/szenen/${szene}.webp`} alt="" loading="lazy"
                onError={e=>{e.currentTarget.style.display="none";}}
                style={{width:104,height:104,borderRadius:8,border:`1px solid ${C.b}`,flexShrink:0,objectFit:"cover",background:"#FCF5EA"}}/>
            : <div style={{width:22,height:22,borderRadius:"50%",background:C.ol,color:C.od,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>{i+1}</div>}
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <span style={{width:19,height:19,borderRadius:"50%",background:"#8FA98A",color:"#fff",fontSize:10,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</span>
              {titel&&<span style={{fontSize:13,fontWeight:700,color:C.t,textTransform:"uppercase",letterSpacing:".05em",lineHeight:1.3}}>{titel}</span>}
            </div>
            {text&&<div style={{fontSize:12.5,color:C.m,lineHeight:1.6,marginBottom:6}}>{text}</div>}
            {(zeit||tmp)&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {zeit&&<span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:7,background:"#EFF4F7",color:"#2E4A5A"}}>◷ {zeit}</span>}
              {tmp&&<span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:7,background:C.ol,color:C.od}}>◈ {tmp}</span>}
            </div>}
          </div>
        </div>
      );
    })}
  </div>;
}

// ── Farben ───────────────────────────────────────────────────────────────────
const C={bg:"#F9F7F4",w:"#fff",b:"#E8E5DF",b2:"#D3D1C7",t:"#2C2C2A",m:"#5F5E5A",h:"#B4B2A9",
  o:"#D85A30",od:"#993C1D",ol:"#FDF3EF",g:"#1D9E75",gl:"#EBF7F2",gd:"#085041",
  bl:"#E6F1FB",bd:"#042C53",rl:"#FCEBEB",rd:"#A32D2D",s:"#F1EFE8"};

// ── Stil-Helfer ───────────────────────────────────────────────────────────────
const card=(sel,col=C.o,bg=C.ol)=>({border:`1.5px solid ${sel?col:C.b}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",background:sel?bg:C.w,transition:"all .15s"});
const chip=(sel,multi)=>({padding:"7px 13px",borderRadius:20,border:`1.5px solid ${sel?(multi?C.g:C.o):C.b}`,background:sel?(multi?C.gl:C.ol):C.w,fontSize:13,cursor:"pointer",color:sel?(multi?C.gd:C.od):C.m,fontWeight:sel?600:400,transition:"all .15s",lineHeight:1.3,display:"inline-block"});
const btnP=(dis)=>({padding:"11px 22px",borderRadius:10,fontSize:14,cursor:dis?"not-allowed":"pointer",background:dis?C.b2:C.o,color:"#fff",fontWeight:600,border:"none",opacity:dis?.7:1});
const btnS={padding:"10px 20px",borderRadius:10,fontSize:14,cursor:"pointer",background:"transparent",border:`1.5px solid ${C.b2}`,color:C.h,fontWeight:600};
const box=(col,bg,bl)=>({padding:"11px 14px",background:bg,borderRadius:9,fontSize:13,color:col,borderLeft:`3px solid ${bl}`,marginBottom:"0.8rem"});
const GL={fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:C.h,margin:"1rem 0 6px"};
const NAV={display:"flex",gap:10,marginTop:"1.4rem",flexWrap:"wrap"};

// ── API ───────────────────────────────────────────────────────────────────────
async function ai(prompt, sys=null, maxTok=1400, imgB64=null, imgMime=null) {
  const uc=[];
  if(imgB64) uc.push({type:"image",source:{type:"base64",media_type:imgMime,data:imgB64}});
  uc.push({type:"text",text:prompt});
  const body={model:"claude-sonnet-5",max_tokens:maxTok,messages:[{role:"user",content:uc}]};
  if(sys) body.system=sys;
  const res=await fetch("/api/claude",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(body)
  });
  const raw=await res.text();
  let d; try{d=JSON.parse(raw);}catch(e){throw new Error(`Server-Fehler ${res.status}`);}
  if(!res.ok||d.error) throw new Error(d.error?.message||d.error?.type||`HTTP ${res.status}`);
  return (d.content||[]).map(b=>b.text||"").join("");
}
function xj(txt,t="arr"){
  const c=txt.replace(/^```json\s*/,"").replace(/^```\s*/,"").replace(/\s*```$/,"").trim();
  if(t==="arr"){const s=c.indexOf("["),e=c.lastIndexOf("]");if(s<0||e<0)throw new Error("Kein JSON-Array. Antwort: "+c.slice(0,300));return JSON.parse(c.slice(s,e+1));}
  else{const s=c.indexOf("{"),e=c.lastIndexOf("}");if(s<0||e<0)throw new Error("Kein JSON-Objekt");return JSON.parse(c.slice(s,e+1));}
}

// ── Progress ──────────────────────────────────────────────────────────────────
function PBar({step}){
  return <div style={{marginBottom:"1.4rem"}}>
    <div style={{display:"flex",gap:4,marginBottom:5}}>
      {Array.from({length:T},(_,i)=><div key={i} style={{height:4,borderRadius:2,flex:1,background:i<step?C.g:i===step?C.o:C.b,transition:"background .3s"}}/>)}
    </div>
    <div style={{fontSize:11,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:C.h}}>Schritt {step+1} von {T}</div>
  </div>;
}

// ── Haupt-App ─────────────────────────────────────────────────────────────────
class Grenze extends React.Component{
  constructor(p){super(p);this.state={fehler:null};}
  static getDerivedStateFromError(e){return {fehler:e};}
  render(){
    if(this.state.fehler) return <div style={{maxWidth:640,margin:"2rem auto",padding:"1rem",fontFamily:"-apple-system,sans-serif"}}>
      <div style={{padding:"14px 16px",background:"#FCEBEB",color:"#A32D2D",borderRadius:10,borderLeft:"3px solid #E24B4A",fontSize:13,lineHeight:1.6}}>
        <strong>Anzeigefehler.</strong> Das Rezept konnte nicht dargestellt werden.<br/>
        <span style={{fontSize:12,opacity:.8}}>{String(this.state.fehler?.message||this.state.fehler)}</span>
      </div>
      <button onClick={()=>location.reload()} style={{marginTop:14,padding:"10px 20px",borderRadius:10,border:"none",background:"#D85A30",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer"}}>Neu laden</button>
    </div>;
    return this.props.children;
  }
}

function App() {
  const [tab,setTab]=useState("k");
  const [step,setStep]=useState(0);
  const [level,setLevel]=useState(null);
  const [eq,setEq]=useState(["ofen"]);
  const [ofm,setOfm]=useState([]);
  const [bdamp,setBdamp]=useState(null);
  const [temp,setTemp]=useState(250);
  const [mehle,setMehle]=useState({});
  const [pflicht,setPflicht]=useState([]);
  const [custM,setCustM]=useState([]);
  const [mSearch,setMSearch]=useState("");
  const [zeit,setZeit]=useState(null);
  const [krume,setKrume]=useState([]);
  const [kruste,setKruste]=useState([]);
  const [gesch,setGesch]=useState([]);
  const [einl,setEinl]=useState([]);
  const [trieb,setTrieb]=useState(null);
  const [form,setForm]=useState(null);
  const [cards,setCards]=useState([]);
  const [cidx,setCidx]=useState(null);
  const [recipe,setRecipe]=useState(null);
  const [showR,setShowR]=useState(false);
  const [ldC,setLdC]=useState(false);
  const [ldR,setLdR]=useState(false);
  const [errC,setErrC]=useState("");
  // ── Rezept-Anpassen State ─────────────────────────────────────────────────
  const [showAdapt,setShowAdapt]=useState(false);   // Anpass-Dialog sichtbar
  const [adaptMode,setAdaptMode]=useState(null);     // "text"|"voice"|"photo"
  const [adaptInput,setAdaptInput]=useState("");     // Freitext-Eingabe
  const [adaptImg,setAdaptImg]=useState(null);       // {b64,mime,prev}
  const [adaptRes,setAdaptRes]=useState(null);       // adaptiertes Rezept (Objekt)
  const [adaptLd,setAdaptLd]=useState(false);
  const [adaptErr,setAdaptErr]=useState("");
  const [adaptRec,setAdaptRec]=useState(false);      // voice recording
  const adaptRecRef=useRef(null);
  const adaptVBase=useRef("");
  const [zpDate,setZpDate]=useState(()=>{const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().slice(0,10);});
  const [zpTime,setZpTime]=useState("10:00");
  const [zpTyp,setZpTyp]=useState(null);
  const [zpPlan,setZpPlan]=useState(null);
  const [zpLd,setZpLd]=useState(false);
  const [zpErr,setZpErr]=useState("");
  const [tDesc,setTDesc]=useState("");
  const [tImg,setTImg]=useState(null);
  const [tRes,setTRes]=useState("");
  const [tLd,setTLd]=useState(false);
  const [tErr,setTErr]=useState("");
  const [rec,setRec]=useState(false);
  const recRef=useRef(null);
  const vBase=useRef("");

  // ── Sauerteig State ───────────────────────────────────────────────────────
  const [stPhase,setStPhase]=useState(0);           // 0=Start, 1=Setup, 2=Tagesplan, 3=Pflege, 4=Backen
  const [stStart,setStStart]=useState(null);        // "null"|"schwach"|"aktiv"
  const [stBasis,setStBasis]=useState(null);        // "weizen"|"roggen"|"dinkel"
  const [stTag,setStTag]=useState(1);               // aktueller Tag im Aufbau (1-7)
  const [stPlan,setStPlan]=useState(null);          // KI-generierter Tagesplan
  const [stLd,setStLd]=useState(false);
  const [stErr,setStErr]=useState("");
  const [stTest,setStTest]=useState("");            // Aktivitätstest Beschreibung
  const [stTestImg,setStTestImg]=useState(null);
  const [stTestRes,setStTestRes]=useState("");
  const [stTestLd,setStTestLd]=useState(false);

  const go=(n)=>{setStep(n);window.scrollTo(0,0);};
  const tog=(arr,set,v)=>set(p=>p.includes(v)?p.filter(x=>x!==v):[...p,v]);

  // Mehl
  const togM=(id)=>{
    setMehle(p=>{const n={...p};if(n[id]!==undefined)delete n[id];else n[id]="1 kg";return n;});
    if(pflicht.includes(id))setPflicht(p=>p.filter(x=>x!==id));
  };
  const getML=(id)=>MS.find(m=>m.id===id)?.l||custM.find(m=>m.id===id)?.l||id;
  const allML=()=>Object.keys(mehle).map(id=>`${getML(id)} (${mehle[id]||"1 kg"})${pflicht.includes(id)?" [MUSS]":""}`).join(", ")||"–";
  const addCM=(lbl)=>{
    const t=lbl.trim();if(!t)return;
    if(MS.some(m=>m.l.toLowerCase()===t.toLowerCase())||custM.some(m=>m.l.toLowerCase()===t.toLowerCase())){setMSearch("");return;}
    const id="c"+Date.now();
    setCustM(p=>[...p,{id,l:t}]);
    setMehle(p=>({...p,[id]:"1 kg"}));
    setMSearch("");
  };
  const filt=MWDB.filter(m=>mSearch.length>1&&m.toLowerCase().includes(mSearch.toLowerCase()));

  // Context
  const ctx=()=>({
    lv:LVMAP[level]||level||"–",
    eq:eq.map(e=>EQMAP[e]||e).join(", "),
    of:ofm.map(m=>OFMAP[m]||m).join("+")||"–",
    temp,bd:BDMAP[bdamp]||bdamp||"–",
    ml:allML(),
    pfl:pflicht.map(id=>getML(id)).join(", ")||null,
    zt:ZTMAP[zeit]||zeit||"–",
    ch:[...krume,...kruste,...gesch].join(", ")||"–",
    ei:einl.join(", ")||"keine",
    tr:trieb||"–",fo:form||"–"
  });

  // AI calls
  const loadCards=async()=>{
    setLdC(true);setErrC("");setCards([]);setCidx(null);setRecipe(null);
    const x=ctx();
    const p=`Du bist Marcel Paa, Bäckermeister. NUR JSON-Array, keine Backticks.
3 Brot-Vorschläge:
Level:${x.lv}|Zeit:${x.zt}|Ofen:${x.of} bis ${x.temp}°C Bedampfung:${x.bd}|Ausstattung:${x.eq}
Mehle:${x.ml}|Charakter:${x.ch}|Einlagen:${x.ei}|Trieb:${x.tr}|Form:${x.fo}
${eq.includes("noknead")?"Mind. 1 No-Knead Rezept (nur rühren, lange Gare).":""}
    ${form==="stockbrot"?"STOCKBROT: Teig am Stock über Feuer/Grill, kein Ofen. stockbrot:true, backtemp:Lagerfeuer.":""}
${x.pfl?"PFLICHT in allen Rezepten: "+x.pfl:""}
${x.tr==="sauerteig"?"ZWINGEND: alle 3 Vorschlaege sind reine Sauerteigbrote OHNE jede Hefe.":""}
${x.tr==="hefe"?"ZWINGEND: alle 3 Vorschlaege nur mit Hefe, ohne Sauerteig.":""}
${x.tr==="ohne"?"ZWINGEND: alle 3 Vorschlaege ohne Triebmittel - Fladenbrote.":""}
Format:[{"name":"Brot","schwierigkeit":"Anfänger","kurz":"2 Sätze.","tags":["Tag"],"aktivzeit":"25 Min.","gesamtzeit":"3 Std.","backdauer":"45 Min.","backtemp":"250→220°C oder 'Lagerfeuer/Grill'","noknead":false,"stockbrot":false}]`;
    try{setCards(xj(await ai(p,null,3000)));}catch(e){setErrC(e.message);}
    setLdC(false);
  };

  const openCard=async(i)=>{
    setCidx(i);setLdR(true);setRecipe(null);setShowR(true);
    const cd=cards[i];const x=ctx();
    const p=`Du bist Marcel Paa. NUR JSON-Objekt, keine Backticks.
Rezept für "${cd.name}". Level:${x.lv}|Ofen:${x.of} ${x.temp}°C Bedampfung:${x.bd}|Mehle:${x.ml}
Zeit:${x.zt}|Charakter:${x.ch}|Einlagen:${x.ei}|Form:${x.fo}
TRIEBMITTEL: ${x.tr}
${x.tr==="sauerteig"?"ZWINGEND: reines Sauerteigbrot. KEINE Hefe, kein Frischhefe, keine Trockenhefe in den Zutaten. Triebkraft kommt ausschliesslich aus dem Sauerteig, dafuer laengere Gehzeiten ansetzen.":""}
${x.tr==="hefe"?"ZWINGEND: nur Hefe als Triebmittel, KEIN Sauerteig und kein Anstellgut.":""}
${x.tr==="gemischt"?"Hefe UND Sauerteig zusammen verwenden.":""}
${x.tr==="ohne"?"ZWINGEND: ohne jedes Triebmittel - Fladenbrot oder Tortilla.":""}
${cd.noknead?"No-Knead: nur rühren, keine Knetmaschine, lange Gare erklärt.":""}
Format:{"name":"","vorteig":null,"zutaten":[{"menge":"500 g","zutat":"Mehl"}],"schritte":[{"szene":"mehl_schuessel","titel":"Mehl und Wasser","text":"400 g Dinkelmehl 630 und 200 g Dinkel Vollkorn mit 420 g Wasser verruehren, bis kein trockenes Mehl mehr sichtbar ist.","zeit":"5 Min.","temp":"26 °C"}],"backtemp":"250→220°C","backdauer":"45 Min.","bedampfung_hinweis":"Hinweis zu ${x.bd}","tipp":"Tipp"}

WICHTIG zu "szene": pro Schritt GENAU EINE ID aus dieser Liste, nichts anderes:
${SZ_LISTE}
"titel" max. 4 Woerter.
"text": max. 2 Zeilen, aber IMMER mit den konkreten Mengen in Gramm, die in DIESEM Schritt verarbeitet werden - also "400 g Dinkelmehl 630 und 420 g Wasser", nicht "Mehl und Wasser". Die Summe aller Schritt-Mengen muss zur Zutatenliste passen.
"zeit": IMMER angeben, wenn der Schritt eine Dauer hat - Kneten, Ruhen, Autolyse, Stockgare, Stueckgare, kalte Gare, Backen, Abkuehlen. Nur bei reinen Handgriffen ohne Wartezeit null.
"temp": bei Teigtemperatur, Raumtemperatur der Gare, Kuehlschranktemperatur und Backtemperatur angeben, sonst null.`;
    try{const t=await ai(p,null,5000);const r=xj(t,"obj");
    if(!r.zutaten?.length||!r.schritte?.length)throw new Error("Felder fehlen. Antwort: "+t.slice(0,400));
    setRecipe(r);}catch(e){setRecipe({_e:e.message});}
    setLdR(false);
  };

  const doZP=async()=>{
    setZpLd(true);setZpErr("");setZpPlan(null);
    const typL={hefe_direkt:"Hefe direkt",hefe_overnight:"Hefe Übernacht",st_sameday:"Sauerteig Same-Day",st_overnight:"Sauerteig Übernacht",st_2stufen:"Sauerteig 2-stufig",mischbrot:"Mischbrot"};
    const p=`Du bist Marcel Paa. NUR JSON-Array, keine Backticks.
Backplan: ${typL[zpTyp]}. Fertig ${zpDate} ${zpTime} Uhr. Rückwärts.
Format:[{"zeit":"Sa 08:00","phase":"Phase","dauer":"5 Min.","passiv":false,"detail":"Details"}]
6-9 Schritte. passiv=true heißt Warten.`;
    try{setZpPlan({sc:xj(await ai(p,null,1500)),typ:typL[zpTyp]});}catch(e){setZpErr(e.message);}
    setZpLd(false);
  };

  const doTrouble=async()=>{
    if(!tDesc.trim()&&!tImg){setTErr("Bitte beschreibe das Problem oder lade ein Foto hoch.");return;}
    setTErr("");setTLd(true);setTRes("");
    const sys="Du bist Marcel Paa, Bäckermeister. Analysiere Backproblem auf Deutsch. Abschnitte: <h4>Diagnose</h4><h4>Sofortmaßnahme</h4><h4>Ursache</h4><h4>Nächstes Mal</h4>. Nutze ul/li. Max 200 Wörter.";
    try{setTRes(await ai(tDesc||"Was ist das Problem?",sys,700,tImg?.b64,tImg?.mime));}catch(e){setTErr(e.message);}
    setTLd(false);
  };

  const togAdaptVoice=()=>{
    if(adaptRec){adaptRecRef.current?.stop();setAdaptRec(false);return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert("Nicht unterstützt – bitte Chrome/Safari nutzen");return;}
    adaptVBase.current=adaptInput;
    const r=new SR();r.lang="de-DE";r.continuous=true;r.interimResults=true;
    r.onresult=(ev)=>{let f="",int="";for(let i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)f+=ev.results[i][0].transcript+" ";else int+=ev.results[i][0].transcript;}setAdaptInput((adaptVBase.current?adaptVBase.current+"\n":"")+f+int);};
    r.onend=()=>setAdaptRec(false);r.onerror=()=>setAdaptRec(false);
    r.start();adaptRecRef.current=r;setAdaptRec(true);
  };

  const doAdapt=async()=>{
    if(!adaptInput.trim()&&!adaptImg){setAdaptErr("Bitte Rezept eingeben oder Foto hochladen.");return;}
    setAdaptErr("");setAdaptLd(true);setAdaptRes(null);
    const x=ctx();
    const sys=`Du bist Marcel Paa, Schweizer Bäckermeister und Backsommelier. Analysiere das eingegebene Rezept und passe es PRÄZISE an das Bäcker-Profil an. Antworte NUR mit einem JSON-Objekt, keine Backticks.`;
    const prompt=`Passe dieses Rezept an mein Profil an:

MEIN PROFIL:
Level: ${x.lv} | Zeit: ${x.zt} | Ofen: ${x.of} bis ${x.temp}°C | Bedampfung: ${x.bd}
Ausstattung: ${x.eq}
Mehle vorrätig: ${x.ml}
${x.pfl?"Pflicht-Mehle: "+x.pfl:""}
${eq.includes("noknead")?"Bevorzugt No-Knead Methode.":""}
${x.tr==="sauerteig"?"ZWINGEND: als reines Sauerteigbrot umbauen, Hefe komplett streichen.":""}

ORIGINALREZEPT:
${adaptInput||"(Siehe Foto)"}

ANPASSUNGSREGELN:
1. Mehle durch verfügbare ersetzen (ähnliche Typen bevorzugen)
2. Methode an Zeit anpassen (${x.zt}): ggf. auf No-Knead, Overnight oder Same-Day umstellen
3. Anleitung an Ausstattung anpassen (kein Gärkorb? → Schüssel mit Tuch)
4. Backtemperatur an Ofen anpassen (max. ${x.temp}°C, Modus: ${x.of})
5. Bedampfung: ${x.bd} erklären
6. Alle Änderungen im Feld "anpassungen" auflisten

JSON-Format:
{"name":"Rezeptname (angepasst)","original_name":"Originalname falls erkennbar","anpassungen":["Was wurde geändert und warum"],"vorteig":null,"zutaten":[{"menge":"500 g","zutat":"Weizenmehl 550 (statt 00-Mehl)"}],"schritte":[{"szene":"mehl_schuessel","titel":"Mehl und Wasser","text":"400 g Dinkelmehl 630 und 200 g Dinkel Vollkorn mit 420 g Wasser verruehren, bis kein trockenes Mehl mehr sichtbar ist.","zeit":"5 Min.","temp":"26 °C"}],"backtemp":"${Math.min(x.temp,250)}→${Math.min(x.temp-30,220)}°C","backdauer":"45 Min.","bedampfung_hinweis":"Hinweis für ${x.bd}","aktivzeit":"30 Min.","gesamtzeit":"4 Std.","tipp":"Profi-Tipp von Marcel Paa"}

WICHTIG zu "szene": pro Schritt GENAU EINE ID aus dieser Liste, nichts anderes:
${SZ_LISTE}
"titel" max. 4 Woerter.
"text": max. 2 Zeilen, aber IMMER mit den konkreten Mengen in Gramm, die in DIESEM Schritt verarbeitet werden - also "400 g Dinkelmehl 630 und 420 g Wasser", nicht "Mehl und Wasser". Die Summe aller Schritt-Mengen muss zur Zutatenliste passen.
"zeit": IMMER angeben, wenn der Schritt eine Dauer hat - Kneten, Ruhen, Autolyse, Stockgare, Stueckgare, kalte Gare, Backen, Abkuehlen. Nur bei reinen Handgriffen ohne Wartezeit null.
"temp": bei Teigtemperatur, Raumtemperatur der Gare, Kuehlschranktemperatur und Backtemperatur angeben, sonst null.`;

    try{
      const txt=await ai(prompt,sys,4500,adaptImg?.b64,adaptImg?.mime);
      setAdaptRes(xj(txt,"obj"));
      setShowAdapt(false);
      // Direkt als Rezept anzeigen
      setShowR(true);
    }catch(e){setAdaptErr(e.message);}
    setAdaptLd(false);
  };

  const togVoice=()=>{
    if(rec){recRef.current?.stop();setRec(false);return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert("Nicht unterstützt – bitte Chrome/Edge nutzen");return;}
    vBase.current=tDesc;
    const r=new SR();r.lang="de-DE";r.continuous=true;r.interimResults=true;
    r.onresult=(ev)=>{let f="",int="";for(let i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)f+=ev.results[i][0].transcript+" ";else int+=ev.results[i][0].transcript;}setTDesc((vBase.current?vBase.current+"\n":"")+f+int);};
    r.onend=()=>setRec(false);r.onerror=()=>setRec(false);
    r.start();recRef.current=r;setRec(true);
  };

  const Spin=()=><div style={{width:28,height:28,border:`3px solid ${C.b}`,borderTopColor:C.o,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 10px"}}/>;
  const Load=({t})=><div style={{textAlign:"center",padding:"2rem",color:C.h}}><Spin/>{t}</div>;
  const Err=({m})=>m?<div style={{...box(C.rd,C.rl,"#E24B4A"),marginTop:8}}>Fehler: {m}</div>:null;

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{maxWidth:640,margin:"0 auto",padding:"0 16px 3rem",background:C.bg,minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:C.t}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:14,padding:"1.3rem 0 1rem",borderBottom:`1px solid ${C.b}`,marginBottom:"1.2rem"}}>
        <div style={{width:44,height:44,background:"#4A1B0C",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🍞</div>
        <div><div style={{fontSize:20,fontWeight:700,letterSpacing:"-0.02em"}}>BreadCraft</div><div style={{fontSize:12,color:C.h}}>Dein persönlicher Bäckermeister</div></div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.b}`,marginBottom:"1.2rem",overflowX:"auto"}}>
        {[["k","🧭 Konfigurator"],["st","🌿 Sauerteig"],["z","⏰ Zeitplan"],["t","🔍 Troubleshooting"]].map(([id,lbl])=>(
          <div key={id} onClick={()=>setTab(id)} style={{padding:"9px 14px",fontSize:13,fontWeight:600,cursor:"pointer",color:tab===id?C.o:C.h,borderBottom:`2px solid ${tab===id?C.o:"transparent"}`,whiteSpace:"nowrap",flexShrink:0}}>{lbl}</div>
        ))}
      </div>

      {/* ══ KONFIGURATOR ══ */}
      {tab==="k" && !showR && <div>
        <PBar step={step}/>

        {/* S0: Level */}
        {step===0 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Wie viel Backerfahrung hast du?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Das passt Anleitungen auf dein Level an.</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:"1.2rem"}}>
            {[["🌱","anfaenger","Anfänger","1.–2. Brot"],["🎯","fortgeschritten","Geübt","Einige Brote"],["🏆","profi","Profi","Sauerteig & Co."]].map(([ic,v,n,d])=>(
              <div key={v} style={{...card(level===v),textAlign:"center",padding:"14px 8px"}} onClick={()=>setLevel(v)}>
                <div style={{fontSize:24,marginBottom:5}}>{ic}</div>
                <div style={{fontSize:13,fontWeight:700,color:level===v?C.od:C.t}}>{n}</div>
                <div style={{fontSize:11,color:C.h,marginTop:2}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={NAV}><button style={btnP(!level)} disabled={!level} onClick={()=>go(1)}>Weiter →</button></div>
        </div>}

        {/* S1: Equipment */}
        {step===1 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Was hast du in deiner Küche?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Mehrere Auswahlen möglich.</div>
          <div style={GL}>Backen & Formen</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"0.5rem"}}>
            <div style={{...card(true),opacity:.7,cursor:"default",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:18}}>🔥</span><div><div style={{fontSize:13,fontWeight:700,color:C.od}}>Backofen</div><div style={{fontSize:11,color:C.h}}>Pflichtausstattung</div></div>
            </div>
            {EQ.slice(0,4).map(e=>(
              <div key={e.id} style={{...card(eq.includes(e.id)),display:"flex",alignItems:"center",gap:10}} onClick={()=>tog(eq,setEq,e.id)}>
                <span style={{fontSize:18}}>{e.ic}</span><div><div style={{fontSize:13,fontWeight:700,color:eq.includes(e.id)?C.od:C.t}}>{e.n}</div><div style={{fontSize:11,color:C.h}}>{e.s}</div></div>
              </div>
            ))}
          </div>
          <div style={GL}>Kneten & Mischen</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"0.8rem"}}>
            {EQ.slice(4).map(e=>(
              <div key={e.id} style={{...card(eq.includes(e.id)),display:"flex",alignItems:"center",gap:10}} onClick={()=>tog(eq,setEq,e.id)}>
                <span style={{fontSize:18}}>{e.ic}</span><div><div style={{fontSize:13,fontWeight:700,color:eq.includes(e.id)?C.od:C.t}}>{e.n}</div><div style={{fontSize:11,color:e.id==="noknead"?C.g:C.h}}>{e.s}</div></div>
              </div>
            ))}
          </div>
          {eq.includes("noknead")&&<div style={{...box(C.gd,C.gl,C.g),marginBottom:"0.8rem"}}><strong>No-Knead:</strong> Teig wird nur kurz gerührt, dann 12–18 h kalt geführt. Wenig Aufwand, tolles Ergebnis!</div>}
          <div style={NAV}><button style={btnS} onClick={()=>go(0)}>← Zurück</button><button style={btnP(false)} onClick={()=>go(2)}>Weiter →</button></div>
        </div>}

        {/* S2: Ofen */}
        {step===2 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Wie ist dein Ofen ausgestattet?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Wichtig für Backmethode und Kruste.</div>
          <div style={GL}>Heizmodus (Mehrfachauswahl)</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"0.8rem"}}>
            {[["ober_unter","🔼🔽","Ober-/Unterhitze","Klassisch, empfohlen"],["umluft","🌀","Umluft","–15°C abziehen"],["heissluft","💨","Heißluft+Grill","Starke Kruste"],["dampf","♨️","Dampfofen","Eingebauter Dampf"]].map(([v,ic,n,s])=>(
              <div key={v} style={{...card(ofm.includes(v)),padding:"11px 12px"}} onClick={()=>tog(ofm,setOfm,v)}>
                <div style={{fontSize:18,marginBottom:3}}>{ic}</div>
                <div style={{fontSize:13,fontWeight:700,color:ofm.includes(v)?C.od:C.t}}>{n}</div>
                <div style={{fontSize:11,color:C.h}}>{s}</div>
              </div>
            ))}
          </div>
          <div style={GL}>Bedampfung</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"0.8rem"}}>
            {[["keine","❌","Keine","Dutch Oven macht's"],["schuessel","🫙","Schüssel + heißes Wasser","Einfach & effektiv"],["blumenspritze","💦","Einsprühen","Direkt auf Teig"],["eingebaut","♨️","Eingebauter Dampf","Kombiofen"]].map(([v,ic,n,s])=>(
              <div key={v} style={{...card(bdamp===v),padding:"11px 12px"}} onClick={()=>setBdamp(v)}>
                <div style={{fontSize:18,marginBottom:3}}>{ic}</div>
                <div style={{fontSize:13,fontWeight:700,color:bdamp===v?C.od:C.t}}>{n}</div>
                <div style={{fontSize:11,color:C.h}}>{s}</div>
              </div>
            ))}
          </div>
          <div style={GL}>Max. Ofentemperatur</div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"0.8rem"}}>
            <span style={{fontSize:13,color:C.m,minWidth:80}}>Mein Ofen:</span>
            <input type="range" min={180} max={300} step={10} value={temp} onChange={e=>setTemp(+e.target.value)} style={{flex:1,accentColor:C.o}}/>
            <span style={{fontSize:15,fontWeight:700,color:C.o,minWidth:48}}>{temp}°C</span>
          </div>
          <div style={NAV}><button style={btnS} onClick={()=>go(1)}>← Zurück</button><button style={btnP(!bdamp)} disabled={!bdamp} onClick={()=>go(3)}>Weiter →</button></div>
        </div>}

        {/* S3: Mehl */}
        {step===3 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Welche Mehle hast du vorrätig?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Wähle Mehle an – Rezepte werden darauf abgestimmt.</div>
          {["Weizen","Roggen","Urgetreide"].map(grp=>(
            <div key={grp}>
              <div style={GL}>{grp}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:"0.4rem"}}>
                {MS.filter(m=>m.g===grp).map(m=>(
                  <div key={m.id} style={{...card(mehle[m.id]!==undefined,C.g,C.gl),display:"flex",alignItems:"center",gap:9}} onClick={()=>togM(m.id)}>
                    <span style={{fontSize:16}}>🌾</span>
                    <div><div style={{fontSize:12,fontWeight:700,color:mehle[m.id]!==undefined?C.gd:C.t}}>{m.l}</div><div style={{fontSize:10,color:C.h}}>{m.s}</div></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Custom Mehle */}
          {custM.filter(m=>mehle[m.id]!==undefined).length>0&&<>
            <div style={GL}>Eigene Mehle</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:"0.4rem"}}>
              {custM.filter(m=>mehle[m.id]!==undefined).map(m=>(
                <div key={m.id} style={{...card(true,C.g,C.gl),display:"flex",alignItems:"center",gap:9}}>
                  <span style={{fontSize:16}}>🌱</span>
                  <div><div style={{fontSize:12,fontWeight:700,color:C.gd}}>{m.l}</div><div style={{fontSize:10,color:C.h}}>Eigenes Mehl</div></div>
                </div>
              ))}
            </div>
          </>}
          {/* Suche */}
          <div style={GL}>Weitere Mehle suchen / hinzufügen</div>
          <div style={{position:"relative",marginBottom:".6rem"}}>
            <input style={{width:"100%",padding:"8px 11px",border:`1.5px solid ${C.b}`,borderRadius:8,fontSize:13,boxSizing:"border-box"}} placeholder="z.B. Emmer, Khorasan, Gelbweizen…" value={mSearch} onChange={e=>setMSearch(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&mSearch.trim())addCM(mSearch.trim());}}/>
            {mSearch.length>0&&<button onClick={()=>addCM(mSearch.trim())} style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",padding:"3px 9px",background:C.o,color:"#fff",border:"none",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Hinzufügen</button>}
          </div>
          {filt.length>0&&<div style={{background:C.w,border:`1px solid ${C.b}`,borderRadius:9,marginBottom:".6rem",overflow:"hidden"}}>
            {filt.map(m=><div key={m} onClick={()=>addCM(m)} style={{padding:"8px 13px",fontSize:13,cursor:"pointer",borderBottom:`1px solid ${C.bg}`,color:C.m}}>{m}</div>)}
          </div>}
          {/* Mengen + Pflicht */}
          {Object.keys(mehle).length>0&&<div style={{padding:"12px 14px",background:C.gl,borderRadius:10,marginTop:"0.8rem"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.gd,marginBottom:3}}>Menge & Pflicht-Mehl</div>
            <div style={{fontSize:11,color:C.g,marginBottom:8}}>⭐ = muss in allen Rezepten vorkommen</div>
            {Object.keys(mehle).map(id=>{
              const lbl=getML(id);const isPf=pflicht.includes(id);
              return <div key={id} style={{display:"flex",alignItems:"center",gap:7,background:C.w,padding:"7px 9px",borderRadius:8,border:`1.5px solid ${isPf?C.g:C.b}`,marginBottom:6}}>
                <span style={{flex:1,fontSize:13,color:isPf?C.gd:C.t,fontWeight:isPf?700:500}}>{lbl}</span>
                <input style={{width:75,padding:"4px 6px",border:`1.5px solid ${C.g}`,borderRadius:7,fontSize:13,textAlign:"center"}} value={mehle[id]} onChange={e=>setMehle(p=>({...p,[id]:e.target.value}))}/>
                <span style={{fontSize:11,color:C.g}}>vorr.</span>
                <button onClick={()=>setPflicht(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])} style={{padding:"3px 8px",borderRadius:7,border:`1.5px solid ${isPf?C.g:C.b2}`,background:isPf?C.g:"transparent",color:isPf?"#fff":C.h,fontSize:12,cursor:"pointer",fontWeight:700}}>{isPf?"⭐":"☆"}</button>
              </div>;
            })}
            {pflicht.length>0&&<div style={{marginTop:8,fontSize:12,color:C.gd,background:C.w,padding:"6px 10px",borderRadius:7,borderLeft:`3px solid ${C.g}`}}><strong>Pflicht:</strong> {pflicht.map(id=>getML(id)).join(", ")}</div>}
          </div>}
          <div style={NAV}><button style={btnS} onClick={()=>go(2)}>← Zurück</button><button style={btnP(Object.keys(mehle).length===0)} disabled={Object.keys(mehle).length===0} onClick={()=>go(4)}>Weiter →</button></div>
        </div>}

        {/* S4: Zeit */}
        {step===4 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Wie viel Zeit hast du heute?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Bestimmt Same-Day, Übernacht oder Slow Bread.</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:".8rem"}}>
            {[["2-3h","⚡ 2–3 Std. (Express)"],["halbtag","☀️ Halber Tag"],["ganztag","🌤 Ganzer Tag"],["overnight","🌙 Über Nacht"],["2tage","🗓 2 Tage (Slow Bread)"]].map(([v,l])=>(
              <div key={v} style={chip(zeit===v,false)} onClick={()=>setZeit(v)}>{l}</div>
            ))}
          </div>
          <div style={NAV}><button style={btnS} onClick={()=>go(3)}>← Zurück</button><button style={btnP(!zeit)} disabled={!zeit} onClick={()=>go(5)}>Weiter →</button></div>
        </div>}

        {/* S5: Geschmack */}
        {step===5 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Wie soll dein Brot sein?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Kombiniere frei – alles anklicken was passt.</div>
          {[["Krume & Textur",[["fluffig","☁️ Fluffig & locker"],["saftig","💧 Saftig & weich"],["dicht","🧱 Dicht & kompakt"],["rustikal","🌾 Rustikal mit Biss"]],krume,setKrume],
            ["Kruste",[["knusprig","✨ Knusprig & rösch"],["weich","🤍 Dünn & weich"],["dick","💪 Dick & krachend"]],kruste,setKruste],
            ["Geschmack",[["mild","😊 Mild"],["sauerlich","🍋 Säuerlich"],["herzhaft","🧂 Herzhaft"],["nussig","🌰 Nussig"]],gesch,setGesch],
            ["Einlagen",[["sonnenblumen","🌻 Sonnenblumenkerne"],["walnuesse","🌰 Walnüsse"],["moehren","🥕 Möhren"],["mohn","⚫ Mohn"],["oliven","🫒 Oliven"],["kaese","🧀 Käse"],["keine","❌ Ohne"]],einl,setEinl],
          ].map(([gl,opts,arr,setArr])=>(
            <div key={gl}>
              <div style={GL}>{gl}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:".6rem"}}>
                {opts.map(([v,l])=><div key={v} style={chip(arr.includes(v),true)} onClick={()=>tog(arr,setArr,v)}>{l}</div>)}
              </div>
            </div>
          ))}
          <div style={GL}>Triebmittel</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:".6rem"}}>
            {[["hefe","🧪 Nur Hefe"],["sauerteig","🌿 Nur Sauerteig"],["gemischt","🔀 Hefe + Sauerteig"],["ohne","🫓 Kein Triebmittel → Fladenbrot / Tortilla"]].map(([v,l])=>(
              <div key={v} style={chip(trieb===v,false)} onClick={()=>setTrieb(v)}>{l}</div>
            ))}
          </div>
          <div style={GL}>Brotform</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:".6rem"}}>
            {[["freigeschoben","⭕ Freigeschoben"],["kastenform","📦 Kastenform"],["broetchen","🥖 Brötchen"],["fladen","🫓 Fladen / Focaccia"],["stockbrot","🔥 Stockbrot / Lagerfeuer"]].map(([v,l])=>(
              <div key={v} style={chip(form===v,false)} onClick={()=>setForm(v)}>{l}</div>
            ))}
          </div>
          <div style={NAV}><button style={btnS} onClick={()=>go(4)}>← Zurück</button><button style={btnP(false)} onClick={()=>go(6)}>Weiter →</button></div>
        </div>}

        {/* S6: Summary + AI */}
        {step===6 && <div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Dein Brot-Profil ist komplett</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Die KI wählt Rezepte im Stil von Marcel Paa.</div>
          <div style={{padding:"12px 14px",background:C.s,borderRadius:10,marginBottom:"1rem",fontSize:13,color:C.m,lineHeight:1.85,borderLeft:`3px solid ${C.o}`}}>
            {(()=>{const x=ctx();return<>
              <strong>Level:</strong> {x.lv} &nbsp;·&nbsp; <strong>Zeit:</strong> {x.zt}<br/>
              <strong>Ausstattung:</strong> {x.eq}<br/>
              <strong>Ofen:</strong> {x.of} · max. {x.temp}°C · Bedampfung: {x.bd}<br/>
              <strong>Mehle:</strong> {x.ml}<br/>
              {x.pfl&&<><strong>⭐ Pflicht-Mehle:</strong> {x.pfl}<br/></>}
              <strong>Charakter:</strong> {x.ch}<br/>
              <strong>Einlagen:</strong> {x.ei} &nbsp;·&nbsp; <strong>Trieb:</strong> {x.tr} &nbsp;·&nbsp; <strong>Form:</strong> {x.fo}
            </>;})()}
          </div>
          <Err m={errC}/>
          {ldC&&<Load t="Meister-Bäcker denkt nach…"/>}
          {cards.length>0&&<div>
            <div style={{fontSize:13,color:C.h,marginBottom:10}}>Klicke für die vollständige Anleitung:</div>
            {cards.map((r,i)=>(
              <div key={i} onClick={()=>openCard(i)} style={{border:cidx===i?`2px solid ${C.o}`:`1.5px solid ${C.b}`,borderRadius:12,padding:"1rem",marginBottom:10,background:cidx===i?C.ol:C.w,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                  <div style={{fontSize:15,fontWeight:700}}>
                    {r.noknead&&<span style={{fontSize:11,background:C.gl,color:C.gd,padding:"2px 6px",borderRadius:7,fontWeight:700,marginRight:6}}>No-Knead</span>}
                    {r.stockbrot&&<span style={{fontSize:11,background:"#FFF3CD",color:"#7D4E00",padding:"2px 6px",borderRadius:7,fontWeight:700,marginRight:6}}>🔥 Stockbrot</span>}
                    {r.name}
                  </div>
                  <div style={{fontSize:11,padding:"3px 9px",borderRadius:11,fontWeight:700,background:r.schwierigkeit==="Anfänger"?"#EAF3DE":r.schwierigkeit==="Mittel"?"#FAEEDA":"#FCEBEB",color:r.schwierigkeit==="Anfänger"?"#3B6D11":r.schwierigkeit==="Mittel"?"#854F0B":"#A32D2D"}}>{r.schwierigkeit}</div>
                </div>
                <div style={{fontSize:13,color:C.m,marginBottom:8,lineHeight:1.55}}>{r.kurz}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                  {(r.tags||[]).map(t=><div key={t} style={{fontSize:11,padding:"2px 7px",border:`1px solid ${C.b}`,borderRadius:10,color:C.h}}>{t}</div>)}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:10,paddingTop:8,borderTop:`1px solid ${C.s}`,fontSize:12,color:C.h}}>
                  <span>⏱ Aktiv: <strong style={{color:C.t}}>{r.aktivzeit}</strong></span>
                  <span>🕐 Gesamt: <strong style={{color:C.t}}>{r.gesamtzeit}</strong></span>
                  <span>🔥 {r.backdauer} bei {r.backtemp}</span>
                </div>
              </div>
            ))}
          </div>}
          {/* Trennlinie */}
          <div style={{display:"flex",alignItems:"center",gap:10,margin:"1.2rem 0"}}>
            <div style={{flex:1,height:1,background:C.b}}/>
            <span style={{fontSize:12,color:C.h,fontWeight:600}}>ODER</span>
            <div style={{flex:1,height:1,background:C.b}}/>
          </div>

          {/* Eigenes Rezept anpassen */}
          <div style={{border:`1.5px solid ${C.b}`,borderRadius:12,padding:"13px 14px",background:C.w,cursor:"pointer"}} onClick={()=>{setShowAdapt(true);setAdaptMode(null);setAdaptInput("");setAdaptImg(null);setAdaptRes(null);setAdaptErr("");}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22}}>📋</span>
              <div>
                <div style={{fontSize:14,fontWeight:700}}>Eigenes Rezept anpassen</div>
                <div style={{fontSize:12,color:C.h,marginTop:2}}>Rezept von Marcel Paa, Instagram oder Buch eingeben → auf dein Mehl, deinen Ofen & deine Zeit anpassen lassen</div>
              </div>
              <span style={{fontSize:18,color:C.h,marginLeft:"auto"}}>→</span>
            </div>
          </div>

          {/* Adapt Modal */}
          {showAdapt&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
            <div style={{background:C.bg,borderRadius:"16px 16px 0 0",padding:"1.5rem 1rem 2rem",width:"100%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
                <div style={{fontSize:17,fontWeight:700}}>Rezept eingeben</div>
                <button onClick={()=>setShowAdapt(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.h}}>✕</button>
              </div>
              <div style={{fontSize:13,color:C.m,marginBottom:"1rem",lineHeight:1.5}}>Gib dein Rezept ein – per Text, Sprache oder Foto. Marcel Paa passt es an deinen Mehlvorrat, Ofen und Zeitrahmen an.</div>

              {/* Eingabe-Modus */}
              <div style={GL}>Eingabe-Methode</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:"1rem"}}>
                {[["text","⌨️","Text eingeben"],["voice","🎙️","Einsprechen"],["photo","📸","Foto / Screenshot"]].map(([v,ic,l])=>(
                  <div key={v} style={{...card(adaptMode===v),textAlign:"center",padding:"10px 6px"}} onClick={()=>setAdaptMode(v)}>
                    <div style={{fontSize:20,marginBottom:3}}>{ic}</div>
                    <div style={{fontSize:11,fontWeight:700,color:adaptMode===v?C.od:C.t}}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Text-Eingabe */}
              {(adaptMode==="text"||adaptMode==="voice")&&<>
                {adaptMode==="voice"&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"0.7rem"}}>
                  <button onClick={togAdaptVoice} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:20,border:`1.5px solid ${adaptRec?"#E24B4A":C.b}`,background:adaptRec?C.rl:C.w,fontSize:13,fontWeight:600,cursor:"pointer",color:adaptRec?C.rd:C.m}}>
                    <span>{adaptRec?"⏹️":"🎙️"}</span><span>{adaptRec?"Stoppen":"Aufnahme starten"}</span>
                  </button>
                  <span style={{fontSize:12,color:adaptRec?"#A32D2D":C.h}}>{adaptRec?"🔴 Aufnahme läuft…":"Rezept einsprechen"}</span>
                </div>}
                <textarea
                  style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${C.b}`,borderRadius:9,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:140,boxSizing:"border-box",marginBottom:"0.7rem"}}
                  placeholder={"Rezept hier einfügen oder einsprechen…\n\nz.B.:\n500g Weizenmehl 550\n350g Wasser\n10g Salz\n100g Sauerteig\n→ Alle Zutaten mischen, 4h Stockgare, formen, 12h kalt…"}
                  value={adaptInput}
                  onChange={e=>setAdaptInput(e.target.value)}
                />
              </>}

              {/* Foto-Upload */}
              {adaptMode==="photo"&&<>
                {!adaptImg?<label style={{border:`2px dashed ${C.b}`,borderRadius:11,padding:"1.5rem",textAlign:"center",cursor:"pointer",background:C.w,display:"block",marginBottom:"0.7rem"}}>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{const d=ev.target.result;setAdaptImg({b64:d.split(",")[1],mime:f.type,prev:d});};r.readAsDataURL(f);}}/>
                  <div style={{fontSize:28,marginBottom:6}}>📸</div>
                  <div style={{fontSize:14,color:C.m,fontWeight:600}}>Foto oder Screenshot des Rezepts</div>
                  <div style={{fontSize:11,color:C.h,marginTop:3}}>Buchseite, Instagram-Post, Screenshot</div>
                </label>:<div style={{marginBottom:"0.7rem"}}>
                  <img src={adaptImg.prev} alt="Rezept" style={{maxWidth:"100%",borderRadius:9,border:`1px solid ${C.b}`,display:"block"}}/>
                  <button style={{...btnS,fontSize:12,padding:"5px 11px",marginTop:6}} onClick={()=>setAdaptImg(null)}>Foto entfernen</button>
                </div>}
                {/* Optional: Text-Ergänzung zum Foto */}
                <textarea
                  style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${C.b}`,borderRadius:8,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:60,boxSizing:"border-box",marginBottom:"0.7rem"}}
                  placeholder="Optional: Ergänzungen oder Hinweise zum Foto…"
                  value={adaptInput}
                  onChange={e=>setAdaptInput(e.target.value)}
                />
              </>}

              {/* Profil-Hinweis */}
              {adaptMode&&<div style={{...box(C.od,C.ol,C.o),fontSize:12}}>
                <strong>Wird angepasst an:</strong> {ctx().ml.slice(0,60)}{ctx().ml.length>60?"…":""} · {ctx().zt} · {ctx().of} bis {ctx().temp}°C
              </div>}

              <Err m={adaptErr}/>
              {adaptLd&&<div style={{textAlign:"center",padding:"1.2rem",color:C.h}}><div style={{width:26,height:26,border:`3px solid ${C.b}`,borderTopColor:C.o,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 8px"}}/>Marcel Paa passt das Rezept an…</div>}

              <div style={NAV}>
                <button style={btnS} onClick={()=>setShowAdapt(false)}>Abbrechen</button>
                <button
                  style={btnP(adaptLd||(!adaptInput.trim()&&!adaptImg)||!adaptMode)}
                  disabled={adaptLd||(!adaptInput.trim()&&!adaptImg)||!adaptMode}
                  onClick={doAdapt}
                >🎯 Rezept anpassen</button>
              </div>
            </div>
          </div>}

          <div style={NAV}>
            <button style={btnS} onClick={()=>go(5)}>← Zurück</button>
            <button style={btnP(ldC)} disabled={ldC} onClick={loadCards}>🤖 Rezepte vorschlagen</button>
          </div>
        </div>}
      </div>}

      {/* ══ REZEPTANSICHT ══ */}
      {tab==="k" && showR && <div>
        {ldR&&<div>
          <div style={{display:"flex",gap:12,marginBottom:"1.2rem",paddingBottom:"1.2rem",borderBottom:`1px solid ${C.b}`}}>
            <div style={{fontSize:28}}>🍞</div>
            <div><div style={{fontSize:17,fontWeight:700}}>{cards[cidx]?.name}</div><div style={{fontSize:13,color:C.h}}>{cards[cidx]?.kurz}</div></div>
          </div>
          <Load t="Vollständiges Rezept wird geladen…"/>
        </div>}
        {!ldR&&adaptRes&&!recipe&&<div>
          {/* Angepasstes Rezept Header */}
          <div style={{display:"flex",gap:12,marginBottom:"1.2rem",paddingBottom:"1.2rem",borderBottom:`1px solid ${C.b}`}}>
            <div style={{fontSize:28}}>🎯</div>
            <div>
              <div style={{fontSize:17,fontWeight:700}}>{adaptRes.name}</div>
              {adaptRes.original_name&&<div style={{fontSize:12,color:C.h,marginTop:2}}>Basiert auf: {adaptRes.original_name}</div>}
            </div>
          </div>
          {/* Anpassungen */}
          {adaptRes.anpassungen?.length>0&&<div style={{...box(C.od,C.ol,C.o),marginBottom:"1rem"}}>
            <div style={{fontWeight:700,marginBottom:6}}>Was Marcel Paa angepasst hat:</div>
            <ul style={{marginLeft:16,lineHeight:1.8}}>
              {adaptRes.anpassungen.map((a,i)=><li key={i}>{a}</li>)}
            </ul>
          </div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:"1.2rem"}}>
            {[["Aktivzeit",adaptRes.aktivzeit],["Gesamtzeit",adaptRes.gesamtzeit],["Backen",adaptRes.backdauer]].map(([l,vv])=>(
              <div key={l} style={{background:C.s,borderRadius:9,padding:9,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.h,fontWeight:700,textTransform:"uppercase",marginBottom:2}}>{l}</div>
                <div style={{fontSize:14,fontWeight:700}}>{vv}</div>
              </div>
            ))}
          </div>
          {adaptRes.bedampfung_hinweis&&<div style={{...box(C.bd,C.bl,"#185FA5"),marginBottom:"1rem"}}><strong>Bedampfung:</strong> {adaptRes.bedampfung_hinweis}</div>}
          {adaptRes.vorteig&&<div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Vorteig / Vorstufe</div>
            <div style={box(C.gd,C.gl,C.g)}>{adaptRes.vorteig}</div>
          </div>}
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Zutaten (angepasst)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {(adaptRes.zutaten||[]).map((z,i)=><div key={i} style={{fontSize:13,padding:"6px 9px",background:C.bg,borderRadius:7,color:C.m,border:`1px solid ${C.s}`}}><strong>{typeof z==="object"&&z?String(z.menge??""):""}</strong> {typeof z==="object"&&z?String(z.zutat??""):String(z)}</div>)}
            </div>
          </div>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Schritt für Schritt</div>
            <StepList schritte={adaptRes.schritte}/>
          </div>
          {adaptRes.tipp&&<div style={box(C.gd,C.gl,C.g)}><strong>Profi-Tipp von Marcel Paa:</strong> {adaptRes.tipp}</div>}
        </div>}

        {!ldR&&recipe&&!recipe._e&&<div>
          <div style={{display:"flex",gap:12,marginBottom:"1.2rem",paddingBottom:"1.2rem",borderBottom:`1px solid ${C.b}`}}>
            <div style={{fontSize:28}}>🍞</div>
            <div>
              <div style={{fontSize:17,fontWeight:700}}>
                {cards[cidx]?.noknead&&<span style={{fontSize:11,background:C.gl,color:C.gd,padding:"2px 6px",borderRadius:7,fontWeight:700,marginRight:6}}>No-Knead</span>}
              {cards[cidx]?.stockbrot&&<span style={{fontSize:11,background:"#FFF3CD",color:"#7D4E00",padding:"2px 6px",borderRadius:7,fontWeight:700,marginRight:6}}>🔥 Stockbrot</span>}
                {recipe.name}
              </div>
              <div style={{fontSize:13,color:C.h}}>{cards[cidx]?.kurz}</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:"1.2rem"}}>
            {[["Aktivzeit",cards[cidx]?.aktivzeit],["Gesamtzeit",cards[cidx]?.gesamtzeit],["Backen",recipe.backdauer]].map(([l,v])=>(
              <div key={l} style={{background:C.s,borderRadius:9,padding:9,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.h,fontWeight:700,textTransform:"uppercase",marginBottom:2}}>{l}</div>
                <div style={{fontSize:14,fontWeight:700}}>{v}</div>
              </div>
            ))}
          </div>
          {recipe.bedampfung_hinweis&&<div style={{...box(C.bd,C.bl,"#185FA5"),marginBottom:"1rem"}}><strong>Bedampfung:</strong> {recipe.bedampfung_hinweis}</div>}
          {recipe.vorteig&&<div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Vorteig / Vorstufe</div>
            <div style={box(C.gd,C.gl,C.g)}>{recipe.vorteig}</div>
          </div>}
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Zutaten</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {(recipe.zutaten||[]).map((z,i)=><div key={i} style={{fontSize:13,padding:"6px 9px",background:C.bg,borderRadius:7,color:C.m,border:`1px solid ${C.s}`}}><strong>{typeof z==="object"&&z?String(z.menge??""):""}</strong> {typeof z==="object"&&z?String(z.zutat??""):String(z)}</div>)}
            </div>
          </div>
          <div style={{marginBottom:"1.2rem"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:C.h,marginBottom:7,paddingBottom:5,borderBottom:`1px solid ${C.s}`}}>Schritt für Schritt</div>
            <StepList schritte={recipe.schritte}/>
          </div>
          {recipe.tipp&&<div style={box(C.gd,C.gl,C.g)}><strong>Profi-Tipp von Marcel Paa:</strong> {recipe.tipp}</div>}
        </div>}
        {!ldR&&recipe?._e&&<Err m={recipe._e}/>}
        <div style={{...NAV,marginTop:"1.8rem",paddingTop:"1.4rem",borderTop:`1px solid ${C.b}`}}>
          <button style={btnS} onClick={()=>{setShowR(false);setRecipe(null);setAdaptRes(null);setStep(6);}}>← Zurück zu Rezepten</button>
          <button style={{...btnP(false),background:C.g}} onClick={()=>{setTab("z");window.scrollTo(0,0);}}>⏰ Zeitplan erstellen</button>
        </div>
      </div>}

      {/* ══ ZEITPLAN ══ */}
      {tab==="z"&&<div>
        <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Zeitplan-Assistent</div>
        <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Wann soll das Brot fertig sein? Ich rechne rückwärts.</div>
        <div style={GL}>Fertig-Zeitpunkt</div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:"0.8rem"}}>
          <label style={{fontSize:13,fontWeight:600,color:C.m}}>Datum:</label>
          <input type="date" value={zpDate} onChange={e=>setZpDate(e.target.value)} style={{padding:"7px 10px",border:`1.5px solid ${C.b}`,borderRadius:8,fontSize:13}}/>
          <label style={{fontSize:13,fontWeight:600,color:C.m}}>Uhrzeit:</label>
          <input type="time" value={zpTime} onChange={e=>setZpTime(e.target.value)} style={{padding:"7px 10px",border:`1.5px solid ${C.b}`,borderRadius:8,fontSize:13}}/>
        </div>
        <div style={GL}>Brottyp</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:"0.8rem"}}>
          {ZPTYPEN.map(t=><div key={t.v} style={chip(zpTyp===t.v,false)} onClick={()=>setZpTyp(t.v)}>{t.l}</div>)}
        </div>
        <Err m={zpErr}/>
        {zpLd&&<Load t="Zeitplan wird berechnet…"/>}
        {zpPlan&&<div style={{border:`1.5px solid ${C.b}`,borderRadius:11,background:C.w,overflow:"hidden",marginTop:"0.8rem"}}>
          <div style={{padding:"10px 14px",background:C.s,borderBottom:`1px solid ${C.b}`,fontWeight:700,fontSize:14,display:"flex",justifyContent:"space-between"}}>
            <span>📅 {zpPlan.typ}</span><span style={{fontSize:12,fontWeight:400,color:C.h}}>Fertig: {zpTime} Uhr</span>
          </div>
          {zpPlan.sc.map((sc,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"9px 14px",borderBottom:i<zpPlan.sc.length-1?`1px solid ${C.bg}`:"none",alignItems:"flex-start",fontSize:13}}>
              <div style={{fontWeight:700,color:C.o,minWidth:52,fontSize:12,paddingTop:2}}>{sc.zeit}</div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:4}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:sc.passiv?C.b2:C.o}}/>
                {i<zpPlan.sc.length-1&&<div style={{width:2,background:C.s,flex:1,minHeight:14,marginTop:3}}/>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,marginBottom:1}}>{sc.phase} <span style={{fontSize:11,fontWeight:400,color:C.h}}>({sc.dauer})</span></div>
                <div style={{fontSize:12,color:sc.passiv?C.h:C.m,fontStyle:sc.passiv?"italic":"normal"}}>{sc.detail}</div>
              </div>
            </div>
          ))}
        </div>}
        {zpPlan&&<div style={{fontSize:12,color:C.h,marginTop:6}}>🟠 aktiver Schritt &nbsp;⚪ Wartezeit</div>}
        <div style={NAV}><button style={btnP(!zpTyp||zpLd)} disabled={!zpTyp||zpLd} onClick={doZP}>⏰ Zeitplan berechnen</button></div>
      </div>}

      {/* ══ SAUERTEIG-MODUL ══ */}
      {tab==="st"&&<div>
        {/* Phase 0: Wo stehst du? */}
        {stPhase===0&&<div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>🌿 Dein Sauerteig-Starter</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem",lineHeight:1.6}}>Ein Sauerteig ist wie ein Haustier – er braucht Pflege und Geduld. Dafür belohnt er dich mit dem aromatischsten Brot das du je gegessen hast.</div>
          <div style={GL}>Wo stehst du gerade?</div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:"1.2rem"}}>
            {[["null","🥚","Ich starte von Null","Noch kein Anstellgut vorhanden – wir bauen einen von Grund auf auf"],["schwach","😴","Mein Starter schläft","Anstellgut vorhanden, aber schon lange nicht mehr gefüttert"],["aktiv","💪","Ich habe einen aktiven Starter","Regelmäßig gefüttert, backbereit – ich möchte Pflege-Tipps & Backeinstieg"]].map(([v,ic,n,d])=>(
              <div key={v} style={{...card(stStart===v),display:"flex",alignItems:"flex-start",gap:12,padding:"13px 14px"}} onClick={()=>setStStart(v)}>
                <span style={{fontSize:22,flexShrink:0}}>{ic}</span>
                <div><div style={{fontSize:14,fontWeight:700,color:stStart===v?C.od:C.t}}>{n}</div><div style={{fontSize:12,color:C.h,marginTop:2,lineHeight:1.5}}>{d}</div></div>
              </div>
            ))}
          </div>
          <div style={NAV}><button style={btnP(!stStart)} disabled={!stStart} onClick={()=>setStPhase(1)}>Weiter →</button></div>
        </div>}

        {/* Phase 1: Basis & Setup */}
        {stPhase===1&&<div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Welche Mehlbasis?</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Die Basis bestimmt Charakter und Pflege deines Starters.</div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:"1.2rem"}}>
            {[["weizen","🌾","Weizen (Lievito Madre Stil)","Mild, vielseitig, ideal für helle Brote, Focaccia & Gebäck"],["roggen","🟤","Roggen (klassisch deutsch)","Sehr aktiv, leicht säuerlich, ideal für Roggen- & Mischbrote"],["dinkel","🌿","Dinkel","Nussig-aromatisch, etwas empfindlicher, ideal für Dinkelbrote"]].map(([v,ic,n,d])=>(
              <div key={v} style={{...card(stBasis===v),display:"flex",alignItems:"flex-start",gap:12,padding:"13px 14px"}} onClick={()=>setStBasis(v)}>
                <span style={{fontSize:22,flexShrink:0}}>{ic}</span>
                <div><div style={{fontSize:14,fontWeight:700,color:stBasis===v?C.od:C.t}}>{n}</div><div style={{fontSize:12,color:C.h,marginTop:2,lineHeight:1.5}}>{d}</div></div>
              </div>
            ))}
          </div>
          {stBasis&&<div style={{...box(C.gd,C.gl,C.g),marginBottom:"1rem"}}>
            <strong>Du brauchst:</strong> {stBasis==="weizen"?"Weizenmehl 550 oder 1050":stBasis==="roggen"?"Roggenmehl 997 oder 1150":"Dinkelmehl 630 oder 1050"} · Leitungswasser (lauwarm) · Ein sauberes Glas (mind. 500 ml) · Löffel
          </div>}
          <div style={NAV}>
            <button style={btnS} onClick={()=>setStPhase(0)}>← Zurück</button>
            <button style={btnP(!stBasis||stLd)} disabled={!stBasis||stLd} onClick={async()=>{
              setStLd(true);setStErr("");
              const isNew=stStart==="null";
              const isSchwach=stStart==="schwach";
              const mehlName=stBasis==="weizen"?"Weizenmehl 550":stBasis==="roggen"?"Roggenmehl 997":"Dinkelmehl 630";
              const prompt=`Du bist Marcel Paa, Bäckermeister. NUR JSON-Array, keine Backticks.

Erstelle einen ${isNew?"7-Tage-Aufbauplan":isSchwach?"5-Tage-Reaktivierungsplan":"3-Tage-Auffrischungsplan"} für einen ${stBasis}-basierten Sauerteig-Starter (Mehl: ${mehlName}).

${isNew?"Der Starter wird von Null aufgebaut – Mehl + Wasser fermentieren lassen.":isSchwach?"Der Starter war längere Zeit inaktiv und muss reaktiviert werden.":"Der Starter ist aktiv und soll auf Backbereitschaft gebracht werden."}

Format (ein Objekt pro Tag):
[{"tag":1,"titel":"Tag 1: Der Anfang","uhrzeit":"08:00","aktion":"Was genau tun","menge":"10g Mehl + 10g Wasser","ziel":"Was soll passieren","tipp":"Marcel Paas Tipp für diesen Tag","zeichen_bereit":"Woran erkenne ich Fortschritt"}]`;
              try{
                const txt=await ai(prompt,null,1800);
                setStPlan(xj(txt,"arr"));
                setStPhase(2);
              }catch(e){setStErr(e.message);}
              setStLd(false);
            }}>{stLd?"Plan wird erstellt…":"📅 Aufbauplan erstellen →"}</button>
          </div>
          {stErr&&<div style={{...box(C.rd,C.rl,"#E24B4A"),marginTop:8}}>Fehler: {stErr}</div>}
          {stLd&&<div style={{textAlign:"center",padding:"1.5rem",color:C.h}}><div style={{width:28,height:28,border:`3px solid ${C.b}`,borderTopColor:C.o,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 8px"}}/>Dein persönlicher Plan wird erstellt…</div>}
        </div>}

        {/* Phase 2: Tagesplan */}
        {stPhase===2&&stPlan&&<div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>
            {stStart==="null"?"7-Tage-Aufbauplan":stStart==="schwach"?"Reaktivierungsplan":"Auffrischungsplan"}
          </div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>
            {stBasis==="weizen"?"🌾 Weizen-Starter":stBasis==="roggen"?"🟤 Roggen-Starter":"🌿 Dinkel-Starter"} · {stPlan.length} Tage
          </div>
          {/* Tages-Tabs */}
          <div style={{display:"flex",gap:5,marginBottom:"1rem",flexWrap:"wrap"}}>
            {stPlan.map((t,i)=>(
              <div key={i} onClick={()=>setStTag(i+1)} style={{padding:"5px 11px",borderRadius:16,fontSize:12,fontWeight:700,cursor:"pointer",border:`1.5px solid ${stTag===i+1?C.g:C.b}`,background:stTag===i+1?C.gl:C.w,color:stTag===i+1?C.gd:C.h}}>
                Tag {t.tag}
              </div>
            ))}
          </div>
          {/* Tagesdetail */}
          {stPlan.filter(t=>t.tag===stTag).map((t,i)=>(
            <div key={i} style={{border:`1.5px solid ${C.b}`,borderRadius:12,overflow:"hidden",marginBottom:"1rem"}}>
              <div style={{padding:"12px 14px",background:C.s,borderBottom:`1px solid ${C.b}`}}>
                <div style={{fontSize:15,fontWeight:700}}>{t.titel}</div>
                <div style={{fontSize:12,color:C.h,marginTop:2}}>⏰ {t.uhrzeit} Uhr</div>
              </div>
              <div style={{padding:"14px"}}>
                <div style={GL}>Was du tust</div>
                <div style={{fontSize:14,color:C.t,marginBottom:"0.8rem",lineHeight:1.6,fontWeight:500}}>{t.aktion}</div>
                <div style={GL}>Mengen</div>
                <div style={{...box(C.gd,C.gl,C.g),marginBottom:"0.8rem"}}>{t.menge}</div>
                <div style={GL}>Was du danach siehst</div>
                <div style={{fontSize:13,color:C.m,marginBottom:"0.8rem",lineHeight:1.5}}>{t.ziel}</div>
                {t.zeichen_bereit&&<><div style={GL}>Fortschritts-Zeichen</div>
                <div style={{fontSize:13,color:C.m,marginBottom:"0.8rem",lineHeight:1.5}}>🔍 {t.zeichen_bereit}</div></>}
                <div style={{...box(C.od,C.ol,C.o)}}><strong>Marcel Paas Tipp:</strong> {t.tipp}</div>
              </div>
            </div>
          ))}
          {/* Aktivitätstest */}
          <div style={{border:`1.5px solid ${C.b}`,borderRadius:12,padding:"14px",marginBottom:"1rem",background:C.w}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>🔬 Aktivitätstest</div>
            <div style={{fontSize:13,color:C.m,marginBottom:"0.8rem",lineHeight:1.5}}>Lade ein Foto deines Starters hoch oder beschreibe ihn – Marcel Paa sagt dir ob er backbereit ist.</div>
            {!stTestImg?<label style={{border:`2px dashed ${C.b}`,borderRadius:9,padding:"1rem",textAlign:"center",cursor:"pointer",background:C.bg,display:"block",marginBottom:"0.6rem"}}>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{const d=ev.target.result;setStTestImg({b64:d.split(",")[1],mime:f.type,prev:d});};r.readAsDataURL(f);}}/>
              <div style={{fontSize:20,marginBottom:4}}>📸</div>
              <div style={{fontSize:13,color:C.m}}>Foto des Starters hochladen</div>
            </label>:<div style={{marginBottom:"0.6rem"}}>
              <img src={stTestImg.prev} alt="Starter" style={{maxWidth:"100%",borderRadius:8,border:`1px solid ${C.b}`,display:"block"}}/>
              <button style={{...btnS,fontSize:11,padding:"5px 11px",marginTop:6}} onClick={()=>setStTestImg(null)}>Foto entfernen</button>
            </div>}
            <textarea style={{width:"100%",padding:"8px 11px",border:`1.5px solid ${C.b}`,borderRadius:8,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:60,boxSizing:"border-box",marginBottom:"0.6rem"}} placeholder="z.B. Der Starter hat sich verdoppelt, riecht säuerlich-fruchtig, viele Blasen…" value={stTest} onChange={e=>setStTest(e.target.value)}/>
            <button style={btnP(stTestLd||(!stTest.trim()&&!stTestImg))} disabled={stTestLd||(!stTest.trim()&&!stTestImg)} onClick={async()=>{
              setStTestLd(true);setStTestRes("");
              const sys="Du bist Marcel Paa, Bäckermeister. Beurteile den Sauerteig-Starter kurz und präzise auf Deutsch. Struktur: <h4>Reifegrad</h4><h4>Backbereit?</h4><h4>Nächster Schritt</h4>. Max 150 Wörter.";
              try{setStTestRes(await ai(stTest||"Wie sieht der Starter auf dem Foto aus? Ist er backbereit?",sys,600,stTestImg?.b64,stTestImg?.mime));}catch(e){setStTestRes("Fehler: "+e.message);}
              setStTestLd(false);
            }}>{stTestLd?"Analysiere…":"🔍 Starter beurteilen"}</button>
            {stTestLd&&<div style={{textAlign:"center",padding:"1rem",color:C.h}}><div style={{width:24,height:24,border:`2px solid ${C.b}`,borderTopColor:C.o,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 6px"}}/>Beurteile Starter…</div>}
            {stTestRes&&<div style={{padding:12,background:C.w,border:`1.5px solid ${C.b}`,borderRadius:9,fontSize:13,lineHeight:1.8,marginTop:"0.7rem"}} dangerouslySetInnerHTML={{__html:stTestRes.replace(/<h4>/g,`<h4 style="font-size:13px;font-weight:700;color:${C.g};margin:8px 0 3px">`)}}/>}
          </div>
          <div style={NAV}>
            <button style={btnS} onClick={()=>setStPhase(1)}>← Zurück</button>
            <button style={{...btnP(false),background:C.g}} onClick={()=>setStPhase(3)}>Zur Pflege-Routine →</button>
          </div>
        </div>}

        {/* Phase 3: Pflege */}
        {stPhase===3&&<div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Pflege-Routine</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Wie du deinen Starter fit hältst – ob du täglich backst oder nur ab und zu.</div>
          {[
            {ic:"🧊",t:"Im Kühlschrank lagern",d:"Für Bäcker die 1–2x pro Woche backen. Der Starter schläft bei 4–6°C und wird einmal pro Woche gefüttert.",tip:"1–2 Tage vor dem Backen aus dem Kühlschrank nehmen und 1–2x auffrischen."},
            {ic:"🌡️",t:"Bei Raumtemperatur",d:"Für tägliche Bäcker. Starter steht offen oder locker bedeckt bei 18–22°C und wird täglich gefüttert.",tip:"Verhältnis 1:1:1 (Starter:Mehl:Wasser) oder 1:5:5 für weniger Säure."},
            {ic:"🔄",t:"Auffrischungs-Rhythmus",d:"Vor dem Backen: 2x auffrischen im Abstand von 8–12 Stunden. Dann auf dem Höhepunkt der Aktivität einsetzen.",tip:"Schwimm-Test: Ein Klecks Starter ins Wasser – schwimmt er, ist er backbereit."},
            {ic:"♻️",t:"Discard sinnvoll nutzen",d:"Beim Füttern übrigen Starter (Discard) nicht wegwerfen – ideal für Pfannkuchen, Waffeln, Cracker oder Pizzateig.",tip:"Discard im Kühlschrank bis zu 2 Wochen haltbar."},
          ].map((item,i)=>(
            <div key={i} style={{border:`1.5px solid ${C.b}`,borderRadius:11,padding:"13px 14px",marginBottom:9,background:C.w}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:22,flexShrink:0}}>{item.ic}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>{item.t}</div>
                  <div style={{fontSize:13,color:C.m,lineHeight:1.55,marginBottom:7}}>{item.d}</div>
                  <div style={{fontSize:12,color:C.od,background:C.ol,padding:"6px 10px",borderRadius:7,borderLeft:`3px solid ${C.o}`}}><strong>Tipp:</strong> {item.tip}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={NAV}>
            <button style={btnS} onClick={()=>setStPhase(2)}>← Zurück</button>
            <button style={{...btnP(false),background:C.g}} onClick={()=>setStPhase(4)}>Zum ersten Backeinsatz →</button>
          </div>
        </div>}

        {/* Phase 4: Erster Backeinsatz */}
        {stPhase===4&&<div>
          <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>🎉 Bereit zum ersten Brot!</div>
          <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem",lineHeight:1.6}}>Dein Starter ist aktiv und backbereit. Jetzt wählen wir ein passendes Anfänger-Rezept das genau auf deinen {stBasis==="weizen"?"Weizen":stBasis==="roggen"?"Roggen":"Dinkel"}-Starter zugeschnitten ist.</div>
          <div style={{...box(C.gd,C.gl,C.g),marginBottom:"1rem"}}>
            <strong>Checkliste vor dem Backen:</strong>
            <ul style={{marginLeft:16,marginTop:6,lineHeight:1.8,fontSize:13}}>
              <li>Starter hat sich in den letzten 4–8 Std. mindestens verdoppelt</li>
              <li>Riecht angenehm säuerlich-fruchtig, nicht scharf</li>
              <li>Viele Blasen sichtbar, leichte Wölbung oben</li>
              <li>Schwimm-Test bestanden (kleiner Klecks schwimmt im Wasser)</li>
            </ul>
          </div>
          <div style={{border:`1.5px solid ${C.g}`,borderRadius:12,padding:"14px",background:C.gl,marginBottom:"1rem"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.gd,marginBottom:6}}>Empfohlene Einstiegsrezepte für deinen Starter:</div>
            {(stBasis==="weizen"?[
              {n:"Sauerteig Toastbrot",t:"Kastenform, mild, fluffig – ideal für Einsteiger"},
              {n:"Landbrot No-Knead",t:"Freigeschoben, keine Knetmaschine nötig"},
              {n:"Same-Day Sauerteigbrot",t:"Kompakter Zeitplan, an einem Tag fertig"},
            ]:stBasis==="roggen"?[
              {n:"5-Minuten Roggen-Mischbrot",t:"Super einfach, nur rühren, Kastenform"},
              {n:"Alltagsroggenmischbrot 80/20",t:"Klassisch, kräftig, anfängergeeignet"},
              {n:"Paderborner Landbrot",t:"Traditionell deutsches Roggenbrot"},
            ]:[
              {n:"Dinkel Sauerteigbrot",t:"Aromatisch, freigeschoben oder Kastenform"},
              {n:"Dinkel Mischbrot",t:"Mild, saftig, leicht umzusetzen"},
              {n:"Dinkel Vollkorn Sauerteigbrot",t:"Nährstoffreich, robust"},
            ]).map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<2?`1px solid ${C.g}20`:""}} >
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:C.gd}}>{r.n}</div>
                  <div style={{fontSize:11,color:C.g}}>{r.t}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{...box(C.od,C.ol,C.o)}}>
            <strong>So geht's weiter:</strong> Geh zum Konfigurator-Tab, wähle „Nur Sauerteig" als Triebmittel und dein {stBasis==="weizen"?"Weizenmehl":stBasis==="roggen"?"Roggenmehl":"Dinkelmehl"} als Hauptmehl. Die KI schlägt dann passende Rezepte für deinen aktiven Starter vor.
          </div>
          <div style={NAV}>
            <button style={btnS} onClick={()=>setStPhase(3)}>← Zurück</button>
            <button style={{...btnP(false),background:C.o}} onClick={()=>{setTab("k");setTrieb("sauerteig");window.scrollTo(0,0);}}>🍞 Zum Konfigurator →</button>
          </div>
        </div>}
      </div>}

      {/* ══ TROUBLESHOOTING ══ */}
      {tab==="t"&&<div>
        <div style={{fontSize:19,fontWeight:700,marginBottom:4}}>Troubleshooting</div>
        <div style={{fontSize:13,color:C.m,marginBottom:"1.1rem"}}>Problem per Text, Sprache oder Foto beschreiben.</div>
        <div style={GL}>Schnell-Auswahl</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:"0.8rem"}}>
          {[["Der Teig ist zu klebrig und läuft auseinander.","😰 Teig zu weich"],["Das Brot ist kaum aufgegangen.","😔 Kaum aufgegangen"],["Kruste hart, innen klitschig.","😬 Innen klitschig"],["Der Teig reißt beim Formen.","😤 Teig reißt"],["Das Brot ist sehr flach.","📉 Zu flach"],["Kruste an falscher Stelle gerissen.","💥 Kruste gerissen"],["Mein Sauerteig hat sich kaum entwickelt.","🦠 Sauerteig-Problem"]].map(([t,l])=>(
            <div key={l} style={chip(false,false)} onClick={()=>setTDesc(t)}>{l}</div>
          ))}
        </div>
        <div style={GL}>Foto (optional)</div>
        {!tImg?<label style={{border:`2px dashed ${C.b}`,borderRadius:11,padding:"1.3rem",textAlign:"center",cursor:"pointer",background:C.w,display:"block"}}>
          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{const d=ev.target.result;setTImg({b64:d.split(",")[1],mime:f.type,prev:d});};r.readAsDataURL(f);}}/>
          <div style={{fontSize:24,marginBottom:5}}>📸</div>
          <div style={{fontSize:14,color:C.m,fontWeight:600}}>Foto hochladen</div>
          <div style={{fontSize:11,color:C.h,marginTop:2}}>JPG, PNG – tippen oder klicken</div>
        </label>:<div style={{marginBottom:"0.8rem"}}>
          <img src={tImg.prev} alt="Foto" style={{maxWidth:"100%",borderRadius:9,border:`1px solid ${C.b}`,display:"block"}}/>
          <button style={{...btnS,fontSize:12,padding:"6px 13px",marginTop:7}} onClick={()=>setTImg(null)}>Foto entfernen</button>
        </div>}
        <div style={GL}>Spracheingabe</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"0.8rem"}}>
          <button onClick={togVoice} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:20,border:`1.5px solid ${rec?"#E24B4A":C.b}`,background:rec?C.rl:C.w,fontSize:13,fontWeight:600,cursor:"pointer",color:rec?C.rd:C.m}}>
            <span>{rec?"⏹️":"🎙️"}</span><span>{rec?"Stoppen":"Starten"}</span>
          </button>
          <span style={{fontSize:12,color:rec?"#A32D2D":C.h}}>{rec?"🔴 Aufnahme läuft…":"Web Speech (Chrome/Edge)"}</span>
        </div>
        <div style={GL}>Problem beschreiben</div>
        <textarea style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${C.b}`,borderRadius:9,fontSize:13,fontFamily:"inherit",resize:"vertical",minHeight:70,boxSizing:"border-box"}} placeholder="z.B. Teig zu klebrig, 500g Ruchmehl, 380g Wasser…" value={tDesc} onChange={e=>setTDesc(e.target.value)}/>
        <Err m={tErr}/>
        {tLd&&<Load t="Marcel Paa analysiert…"/>}
        {tRes&&<div style={{padding:14,background:C.w,border:`1.5px solid ${C.b}`,borderRadius:11,fontSize:13,lineHeight:1.8,marginTop:"0.8rem"}} dangerouslySetInnerHTML={{__html:tRes.replace(/<h4>/g,`<h4 style="font-size:13px;font-weight:700;color:${C.o};margin:10px 0 3px">`)}}/>}
        <div style={{...NAV,marginTop:"0.8rem"}}>
          <button style={btnP(tLd||(!tDesc.trim()&&!tImg))} disabled={tLd||(!tDesc.trim()&&!tImg)} onClick={doTrouble}>🔍 Analysieren</button>
          <button style={btnS} onClick={()=>{setTDesc("");setTImg(null);setTRes("");setTErr("");if(rec){recRef.current?.stop();setRec(false);}}}>Zurücksetzen</button>
        </div>
      </div>}
    </div>
  );
}

export default function AppMitGrenze(){ return <Grenze><App/></Grenze>; }
