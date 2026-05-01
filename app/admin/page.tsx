"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Admin() {

  const [data,setData]=useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("notices").select("*");
    setData(data || []);
  };

  useEffect(()=>{ load(); },[]);

  const del = async (id:number) => {
    await supabase.from("notices").delete().eq("id",id);
    load();
  };

  return (
    <div style={{ padding:"20px" }}>
      <h2>Admin Panel</h2>

      {data.map((n)=>(
        <div key={n.id} style={{ marginBottom:"10px" }}>
          {n.title}
          <button onClick={()=>del(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}