"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "./supabase";

export default function HomePage() {

  const [form, setForm] = useState({
    industry: "",
    person: "",
    mobile: "",
    email: "",
    service: "",
    details: "",
  });

  const [banner, setBanner] = useState("");

  const banners = [
    "/environment-day-banner.jpg",
    "/earth-day.jpg",
    "/water-day.jpg",
  ];

  // 🔥 AUTO ENVIRONMENT DAY (date-based rotation)
  useEffect(() => {
    const today = new Date().getDate();
    const index = today % banners.length;
    setBanner(banners[index]);
  }, []);

  // 🔥 AUTO CHANGE EVERY 5 sec
  useEffect(() => {
    const i = setInterval(() => {
      setBanner((prev) => {
        const current = banners.indexOf(prev);
        return banners[(current + 1) % banners.length];
      });
    }, 5000);
    return () => clearInterval(i);
  }, []);

  const [notices, setNotices] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("notices").select("*");
    if (data) {
      setNotices(data.filter((n:any)=>n.type==="notice"));
      setAds(data.filter((n:any)=>n.type==="ad"));
    }
  };

  useEffect(() => { load(); }, []);

  // 🔥 SERVICE AUTO-FILL
  const selectService = (s:string) => {
    setForm({ ...form, service: s });
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  // 🔥 WHATSAPP LEAD
  const sendWhatsApp = () => {
    const msg = `New Inquiry:
Industry: ${form.industry}
Person: ${form.person}
Mobile: ${form.mobile}
Email: ${form.email}
Service: ${form.service}
Details: ${form.details}`;

    window.open(`https://wa.me/918780723063?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div style={{ background:"#eef2f6" }}>

      {/* HEADER */}
      <div style={{ background:"#0f4c81",color:"#fff",padding:"12px 20px" }}>
        GREENENVIS PORTAL
      </div>

      <div style={{ maxWidth:"1100px",margin:"auto",padding:"20px" }}>

        {/* 🔥 FULL BANNER */}
        <div style={{
          height:"260px",
          borderRadius:"10px",
          overflow:"hidden",
          position:"relative"
        }}>
          {banner && (
            <Image src={banner} alt="" fill style={{objectFit:"cover"}} />
          )}
        </div>

        {/* NOTICE */}
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px",marginTop:"20px" }}>
          <LiveBox title="Notice Board" data={notices}/>
          <LiveBox title="Current Advertisement" data={ads}/>
        </div>

        {/* SERVICES */}
        <div style={{ background:"#fff",padding:"20px",borderRadius:"10px",marginTop:"20px" }}>
          <h3>Our Services</h3>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"10px"
          }}>
            {[
              "CTE / CCA",
              "BMW Authorization",
              "EPR Registration",
              "Hazardous Waste",
              "CGWA Clearance",
              "Environmental Audit"
            ].map((s,i)=>(
              <button key={i}
                onClick={()=>selectService(s)}
                style={{ padding:"10px",border:"1px solid #ccc" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div style={{ background:"#fff",padding:"20px",borderRadius:"10px",marginTop:"20px" }}>
          <h3>Inquiry Form</h3>

          <input placeholder="Industry"
            value={form.industry}
            onChange={(e)=>setForm({...form,industry:e.target.value})}
            style={input}/>

          <input placeholder="Person"
            value={form.person}
            onChange={(e)=>setForm({...form,person:e.target.value})}
            style={input}/>

          <input placeholder="Mobile"
            value={form.mobile}
            onChange={(e)=>setForm({...form,mobile:e.target.value})}
            style={input}/>

          <input placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
            style={input}/>

          <input placeholder="Service"
            value={form.service}
            style={input}/>

          <textarea placeholder="Details"
            onChange={(e)=>setForm({...form,details:e.target.value})}
            style={input}/>

          <button onClick={sendWhatsApp}
            style={{ width:"100%",padding:"12px",background:"green",color:"#fff" }}>
            Send via WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}

function LiveBox({ title, data }: any) {
  return (
    <div style={{ background:"#fff",padding:"15px",borderRadius:"10px" }}>
      <h4>{title}</h4>

      <div style={{ height:"200px",overflow:"hidden" }}>
        <div style={{ animation:"scroll 10s linear infinite" }}>
          {data.map((item:any,i:number)=>(
            <div key={i}>
              <b>📅 {new Date(item.created_at).toLocaleDateString()}</b>
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}

const input = {
  width:"100%",
  padding:"10px",
  marginBottom:"10px"
};