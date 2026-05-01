"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "./supabase";

export default function HomePage() {

  const [banner, setBanner] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);

  const banners = [
    "/environment-day-banner.jpg",
    "/earth-day.jpg",
    "/water-day.jpg",
  ];

  // 🔥 slider
  useEffect(() => {
    const i = setInterval(() => {
      setBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  // 🔥 fetch notices
  const loadData = async () => {
    const { data } = await supabase.from("notices").select("*");

    if (data) {
      setNotices(data.filter((n:any)=>n.type==="notice"));
      setAds(data.filter((n:any)=>n.type==="ad"));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ background: "#f1f5f9" }}>

      {/* HEADER */}
      <div style={{ background:"#0f4c81",color:"#fff",padding:"12px 20px" }}>
        GREENENVIS PORTAL
      </div>

      <div style={{ maxWidth:"1100px",margin:"auto",padding:"20px" }}>

        {/* SLIDER */}
        <div style={{ height:"250px",position:"relative",borderRadius:"10px",overflow:"hidden" }}>
          <Image src={banners[banner]} alt="" fill style={{objectFit:"cover"}} />
        </div>

        {/* NOTICE */}
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px",marginTop:"20px" }}>
          <LiveBox title="Notice Board" data={notices}/>
          <LiveBox title="Current Advertisement" data={ads}/>
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
        <div style={{ animation:"scroll 12s linear infinite" }}>
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