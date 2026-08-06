"use client";
import WasteSection from "./components/WasteSection";
import EnvironmentalSection from "./components/EnvironmentalSection";
import WaterSection from "./components/WaterSection";
import GPSSection from "./components/GPSSection";
import { downloadIndustryProfile } from "@/lib/pdf/downloadIndustryProfile";
import ProductSection from "./components/ProductSection";
import FactorySection from "./components/FactorySection";
import ContactSection from "./components/ContactSection";
import BasicSection from "./components/BasicSection";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function IndustryProfilePage() {

  const [activeTab, setActiveTab] = useState("basic");
  const tabs = [
  "basic",
  "contact",
  "factory",
  "product",
  "water",
  "environment",
  "waste",
  "gps",
];


const goToNextTab = () => {
  const currentIndex = tabs.indexOf(activeTab);

  if (currentIndex < tabs.length - 1) {
    setActiveTab(tabs[currentIndex + 1]);
  }
};

const goToPreviousTab = () => {
  const currentIndex = tabs.indexOf(activeTab);

  if (currentIndex > 0) {
    setActiveTab(tabs[currentIndex - 1]);
  }
};

const resetCurrentSection = () => {

switch(activeTab){

case "basic":

if(!confirm("Reset Basic Information?")){
break;
}

setProfile((prev:any)=>({

...prev,

industry_name:"",
industry_address:"",
gst_number:"",
pan_number:"",
cin_number:"",
factory_establishment_year:"",
industry_category:"",
manufacturing_activity:"",

hazardous_waste:false,
biomedical_waste:false,
plastic_epr:false,
ewaste_epr:false,
used_oil_epr:false,
battery_epr:false,
tyre_epr:false,

cgwa_noc:false,
factory_license:false,
fire_noc:false,

}));

break;

case "contact":

if(!confirm("Reset Contact Information?")){
break;
}

setProfile((prev:any)=>({

...prev,

contact_person:"",
designation:"",
mobile_no:"",
alternate_mobile:"",
email:"",

}));

break;

case "factory":

if(!confirm("Reset Factory Details?")){
break;
}

setProfile((prev:any)=>({

...prev,

open_area:"",
built_up_area:"",
greenbelt_area:"",
total_area:"",
total_employees:"",
working_shift:"",
working_days:"",
total_plant_capacity:"",
total_plant_capacity_unit:"",
connected_load:"",
contract_demand:"",

}));

break;

case "product":

if(!confirm("Reset Product Details?")){
break;
}

setProducts([]);

setRawMaterials([]);

setByProducts([]);

setFuels([]);

setProductForm({
product_name:"",
quantity:"",
unit:"",
});

setRawMaterialForm({
raw_material_name:"",
quantity:"",
unit:"",
});

setByProductForm({
byproduct_name:"",
quantity:"",
unit:"",
});

setFuelForm({
fuel_name:"",
quantity:"",
unit:"",
customUnit:"",
});

setEditingProductId(null);
setEditingRawMaterialId(null);
setEditingByProductId(null);
setEditingFuelId(null);

break;

case "water":

if(!confirm("Reset Water Details?")){
break;
}

setProfile((prev:any)=>({

...prev,

water_source:[],

fresh_water_requirement:"",
domestic_consumption:"",
industrial_consumption:"",
boiler_consumption:"",
cooling_consumption:"",
gardening_consumption:"",
construction_consumption:"",
other_consumption:"",
total_consumption:"",

cooling_blowdown:"",
boiler_blowdown:"",
ro_reject:"",
other_wastewater:"",
total_wastewater:"",

reuse_garden:"",
reuse_cooling:"",
reuse_boiler:"",
reuse_process:"",
reuse_flushing:"",
reuse_other:"",
total_reuse:"",

final_discharge:"",
final_discharge_point:"",
custom_final_discharge_point:"",
other_industry_name:"",
other_industry_address:"",
cetp_name:"",

mee:false,
atfd:false,

wastewater_generation:"",
domestic_wastewater:"",
industrial_wastewater:"",

etp:false,
stp:false,
ro:false,
zld:false,

}));

break;

case "environment":

if(!confirm("Reset Environmental Details?")){
break;
}

setProfile((prev:any)=>({

...prev,

cte_no:"",
cte_issue_date:"",
cte_valid_upto:"",

cca_no:"",
cca_issue_date:"",
cca_valid_upto:"",

ec_no:"",
ec_issue_date:"",
ec_valid_upto:"",
ec_authority:"",
ec_category:"",

cgwa_noc_no:"",
cgwa_issue_date:"",
cgwa_valid_upto:"",
cgwa_permitted_quantity:"",
cgwa_annual_quantity:"",

factory_license_no:"",
factory_license_issue_date:"",
factory_license_valid_upto:"",

fire_noc_no:"",
fire_noc_issue_date:"",
fire_noc_valid_upto:"",

peso_license_no:"",
peso_issue_date:"",
peso_valid_upto:"",

msihc_rule:"",
hazard_category:"",
mah_unit:false,

hazardous_chemicals:[],

}));

setChemicalForm({
chemical_name:"",
cas_no:"",
storage_qty:"",
unit:"",
threshold_qty:"",
});

setEditingChemicalId(null);

break;

case "waste":

if(!confirm("Reset Waste Details?")){
break;
}

setProfile((prev:any)=>({

...prev,

hazardous_waste_data:[],
non_hazardous_waste_data:[],
plastic_waste_data:[],
ewaste_data:[],
used_oil_data:[],
battery_waste_data:[],
biomedical_waste_data:[],
disposal_facilities:[],

hazardous_storage_area:"",
non_hazardous_storage_area:"",
ewaste_storage_area:"",
used_oil_storage_area:"",

}));

setHazardousWasteForm({
category:"",
customCategory:"",
schedule:"",
customSchedule:"",
waste_name:"",
customWasteName:"",
quantity:"",
unit:"",
disposal_method:"",
recycler:"",
});

setNonHazardousWasteForm({
waste_name:"",
customWasteName:"",
quantity:"",
unit:"",
disposal:"",
});

setPlasticWasteForm({
plastic_type:"",
customPlasticType:"",
quantity:"",
unit:"",
recycler:"",
});

setUsedOilForm({
oil_type:"",
customOilType:"",
quantity:"",
unit:"",
recycler:"",
});

setBatteryWasteForm({
battery_type:"",
customBatteryType:"",
quantity:"",
unit:"",
recycler:"",
});

setBiomedicalWasteForm({
category:"",
customCategory:"",
waste_name:"",
customWasteName:"",
quantity:"",
unit:"",
cbwtf_name:"",
});

setEWasteForm({
category:"",
customCategory:"",
item_name:"",
customItemName:"",
quantity:"",
unit:"",
recycler:"",
});

setDisposalFacilityForm({
facility_type:"",
customFacilityType:"",
facility_name:"",
address:"",
authorization_no:"",
});

setEditingHazardousWasteId(null);
setEditingNonHazardousWasteId(null);
setEditingPlasticWasteId(null);
setEditingUsedOilId(null);
setEditingBatteryWasteId(null);
setEditingBiomedicalWasteId(null);
setEditingEWasteId(null);
setEditingDisposalFacilityId(null);

break;

case "gps":

if(!confirm("Reset GPS Details?")){
break;
}

setProfile((prev:any)=>({

...prev,

latitude:"",
longitude:"",
survey_no:"",
village:"",
gidc:false,
district:"",
taluka:"",
state:"",
pincode:"",
google_map_link:"",

}));

break;

}

};

  const [isEditing, setIsEditing] = useState(true);

const [profile, setProfile] = useState({
  industry_name: "",
  industry_address: "",
  gst_number: "",
  pan_number: "",
  cin_number: "",
  factory_establishment_year: "",
  industry_category: "",
  manufacturing_activity: "",
  hazardous_waste: false,
  biomedical_waste: false,
  plastic_epr: false,
  ewaste_epr: false,
  used_oil_epr: false,
  battery_epr: false,
  tyre_epr: false,
  cgwa_noc: false,
  factory_license: false,
  fire_noc: false,
  contact_person: "",
  designation: "",
  mobile_no: "",
  alternate_mobile: "",
  email: "",
  open_area: "",
  built_up_area: "",
  greenbelt_area: "",
  total_area: "",
  total_employees: "",
  working_shift: "",
  working_days: "",
  total_plant_capacity: "",
  total_plant_capacity_unit: "",
  connected_load: "",
  contract_demand: "",
  water_source: [],
  fresh_water_requirement: "",
  domestic_consumption: "",
  industrial_consumption: "",
  boiler_consumption: "",
  cooling_consumption: "",
  gardening_consumption: "",
  construction_consumption: "",
  other_consumption: "",
  total_consumption: "",

  cooling_blowdown: "",
  boiler_blowdown: "",
  ro_reject: "",
  other_wastewater: "",
  total_wastewater: "",

  reuse_garden: "",
  reuse_cooling: "",
  reuse_boiler: "",
  reuse_process: "",
  reuse_flushing: "",
  reuse_other: "",
  total_reuse: "",

  final_discharge: "",
  final_discharge_point: "",
  custom_final_discharge_point: "",
  other_industry_name: "",
  other_industry_address: "",
  cetp_name: "",

  mee: false,
  atfd: false,
  wastewater_generation: "",
  domestic_wastewater: "",
  industrial_wastewater: "",
  etp: false,
  stp: false,
  ro: false,
  zld: false,
  peso: false,
  explosive_license: false,
  boiler: false,
  msihc: false,
  environmental_clearance: false,
  cte: false,
  cca: false,
  hazardous_waste_quantity: "",
  disposal_method: "",
  tsdf_name: "",
  non_hazardous_waste: "",
  recyclable_waste: "",
  plastic_waste: "",
  used_oil_generated: "",
  latitude: "",
  longitude: "",
  survey_no: "",
  village: "",
  pincode: "",
  google_map_link: "",
  company_letterhead: "",
  company_logo: "",
  gidc: false,
  district: "",
  taluka: "",
  state: "",
  hazardous_chemicals: [] as any[],

/* ============================
   Environmental Module
============================ */

cte_no: "",
cte_issue_date: "",
cte_valid_upto: "",

cca_no: "",
cca_issue_date: "",
cca_valid_upto: "",

ec_no: "",
ec_issue_date: "",
ec_valid_upto: "",
ec_authority: "",
ec_category: "",

cgwa_noc_no: "",
cgwa_issue_date: "",
cgwa_valid_upto: "",
cgwa_permitted_quantity: "",
cgwa_annual_quantity: "",

factory_license_no: "",
factory_license_issue_date: "",
factory_license_valid_upto: "",

fire_noc_no: "",
fire_noc_issue_date: "",
fire_noc_valid_upto: "",

peso_license_no: "",
peso_issue_date: "",
peso_valid_upto: "",

msihc_rule: "",
hazard_category: "",
mah_unit: false,

/* ============================
   Waste Module
============================ */

hazardous_waste_data: [] as any[],
non_hazardous_waste_data: [] as any[],
plastic_waste_data: [] as any[],
ewaste_data: [] as any[],
used_oil_data: [] as any[],
battery_waste_data: [] as any[],
biomedical_waste_data: [] as any[],
disposal_facilities: [] as any[],

hazardous_storage_area: "",
non_hazardous_storage_area: "",
ewaste_storage_area: "",
used_oil_storage_area: "",

});
const [products, setProducts] = useState<any[]>([]);
const [rawMaterials, setRawMaterials] = useState<any[]>([]);
const [byProducts, setByProducts] = useState<any[]>([]);
const [fuels, setFuels] = useState<any[]>([]);

const [productForm, setProductForm] = useState({
  product_name: "",
  quantity: "",
  unit: "",
});

const [rawMaterialForm, setRawMaterialForm] = useState({
  raw_material_name: "",
  quantity: "",
  unit: "",
});

const [byProductForm, setByProductForm] = useState({
  byproduct_name: "",
  quantity: "",
  unit: "",
});

const [fuelForm, setFuelForm] = useState({
  fuel_name: "",
  quantity: "",
  unit: "",
  customUnit: "",
});

const [editingProductId, setEditingProductId] =
  useState<string | null>(null);

const [editingRawMaterialId, setEditingRawMaterialId] =
  useState<string | null>(null);

const [editingByProductId, setEditingByProductId] =
  useState<string | null>(null);

const [editingFuelId, setEditingFuelId] =
  useState<string | null>(null);

  const [chemicalForm, setChemicalForm] = useState({
  chemical_name: "",
  cas_no: "",
  storage_qty: "",
  unit: "",
  threshold_qty: "",
});

const [editingChemicalId, setEditingChemicalId] =
  useState<number | null>(null);
  
const [hazardousWasteForm, setHazardousWasteForm] = useState({
  category: "",
  customCategory: "",

  schedule: "",
  customSchedule: "",

  waste_name: "",
  customWasteName: "",

  quantity: "",
  unit: "",

  disposal_method: "",
  recycler: "",
});

const [editingHazardousWasteId, setEditingHazardousWasteId] =
  useState<number | null>(null);

  const [plasticWasteForm, setPlasticWasteForm] = useState({
  plastic_type: "",
  customPlasticType: "",

  quantity: "",
  unit: "",
  recycler: "",
});

const [usedOilForm, setUsedOilForm] = useState({
  oil_type: "",
  customOilType: "",

  quantity: "",
  unit: "",

  recycler: "",
});

const [batteryWasteForm, setBatteryWasteForm] = useState({
  battery_type: "",
  customBatteryType: "",

  quantity: "",
  unit: "",

  recycler: "",
});

const [biomedicalWasteForm, setBiomedicalWasteForm] = useState({
  category: "",
  customCategory: "",

  waste_name: "",
  customWasteName: "",

  quantity: "",
  unit: "",

  cbwtf_name: "",
});

const [editingEWasteId, setEditingEWasteId] =
  useState<number | null>(null);

const [editingBiomedicalWasteId, setEditingBiomedicalWasteId] =
  useState<number | null>(null);

const [disposalFacilityForm, setDisposalFacilityForm] = useState({
  facility_type: "",
  customFacilityType: "",

  facility_name: "",

  address: "",

  authorization_no: "",
});

const [editingDisposalFacilityId, setEditingDisposalFacilityId] =
  useState<number | null>(null);

const [editingBatteryWasteId, setEditingBatteryWasteId] =
  useState<number | null>(null);

const [editingUsedOilId, setEditingUsedOilId] =
  useState<number | null>(null);

const [eWasteForm, setEWasteForm] = useState({
  category: "",
  customCategory: "",

  item_name: "",
  customItemName: "",

  quantity: "",
  unit: "",

  recycler: "",
});

const [nonHazardousWasteForm, setNonHazardousWasteForm] = useState({

  waste_name: "",
  customWasteName: "",

  quantity: "",
  unit: "",
  disposal: "",

});

const [editingNonHazardousWasteId, setEditingNonHazardousWasteId] =
  useState<number | null>(null);

const [editingPlasticWasteId, setEditingPlasticWasteId] =
  useState<number | null>(null);
  
const fetchProfile = async () => {

const { data: authData, error: authError } = await supabase.auth.getUser();

if (authError || !authData.user) {
  alert("User session not found. Please login again.");
  return;
}

const user = authData.user;

alert(
  "USER ID = " +
  user.id +
  "\nEMAIL = " +
  user.email
);

const { data } = await supabase

  .from("industry_profile")
  .select("*")
  .eq("user_id", user.id)
  .maybeSingle();

  if (data) {
    console.log("SUPABASE DATA =", JSON.stringify(data, null, 2));

console.log("IF(DATA) EXECUTED");
console.log("PROFILE FROM DB =", data);

    setProfile({
  ...data,

  water_source:
    typeof data.water_source === "string"
      ? JSON.parse(data.water_source)
      : Array.isArray(data.water_source)
      ? data.water_source
      : [],

  hazardous_chemicals: data.hazardous_chemicals || [],
});

alert(
  JSON.stringify(
    {
      user: user.id,
      industry: data?.industry_name,
    },
    null,
    2
  )
);

console.log("FETCH DATA =", data);

    setIsEditing(false);

    setProducts(data.products || []);
    setByProducts(data.byproducts || []);
    setRawMaterials(data.raw_materials || []);
    setFuels(data.fuels || []);

  } else {
    console.log("NO PROFILE FOUND");
    setIsEditing(true);
  }
};

useEffect(() => {
  alert("fetchProfile called");
  fetchProfile();
}, []);

const saveProfile = async () => {
alert("SAVE PROFILE FUNCTION CALLED");

const { data: authData, error: authError } = await supabase.auth.getUser();

if (authError || !authData.user) {
  alert("User session not found. Please login again.");
  return;
}

const user = authData.user;

const { data: existing, error: existingError } = await supabase
  .from("industry_profile")
  .select("id,user_id")
  .eq("user_id", user.id);

console.log("CURRENT USER =", user.id);
console.log("EXISTING ROWS =", existing);
console.log("EXISTING ERROR =", existingError);

  const normalizeDateValue = (value: any) =>
    typeof value === "string" && value.trim() === "" ? null : value;

const payload = {
id: undefined,

  user_id: user.id,
...profile,

open_area: profile.open_area === "" 
? null 
: Number(profile.open_area),

total_area:
  Number(profile.open_area || 0) +
  Number(profile.built_up_area || 0) +
  Number(profile.greenbelt_area || 0),

cte_issue_date: normalizeDateValue(profile.cte_issue_date),
cte_valid_upto: normalizeDateValue(profile.cte_valid_upto),

cca_issue_date: normalizeDateValue(profile.cca_issue_date),
cca_valid_upto: normalizeDateValue(profile.cca_valid_upto),

ec_issue_date: normalizeDateValue(profile.ec_issue_date),
ec_valid_upto: normalizeDateValue(profile.ec_valid_upto),

cgwa_issue_date: normalizeDateValue(profile.cgwa_issue_date),
cgwa_valid_upto: normalizeDateValue(profile.cgwa_valid_upto),

factory_license_issue_date: normalizeDateValue(profile.factory_license_issue_date),
factory_license_valid_upto: normalizeDateValue(profile.factory_license_valid_upto),

fire_noc_issue_date: normalizeDateValue(profile.fire_noc_issue_date),
fire_noc_valid_upto: normalizeDateValue(profile.fire_noc_valid_upto),

peso_issue_date: normalizeDateValue(profile.peso_issue_date),
peso_valid_upto: normalizeDateValue(profile.peso_valid_upto),

  water_source: JSON.stringify(
  Array.isArray(profile.water_source)
    ? profile.water_source
    : []
  ),

  products,
  byproducts: byProducts,
  raw_materials: rawMaterials,
  fuels,
  hazardous_chemicals: profile.hazardous_chemicals,

  };

delete (payload as any).id;

alert("PAYLOAD ID = " + (payload as any).id);

delete (payload as any).id;

 if (existing && existing.length > 0) {

  console.log("PROFILE ID =", (profile as any).id);

  console.log("PAYLOAD =", payload);
  console.log("PAYLOAD JSON =", JSON.stringify(payload, null, 2));
  debugger;

  console.log(
  "PAYLOAD =",
  JSON.stringify(payload, null, 2)
);

  const { error } = await supabase
    .from("industry_profile")
    .update(payload)
    .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }
  } else {
    console.log("PAYLOAD =", payload);

    const { error } = await supabase
      .from("industry_profile")
      .insert([payload]);

    if (error) {
      alert(error.message);
      return;
    }
  }

const { data: rows } = await supabase
  .from("industry_profile")
  .select("id,user_id,industry_name");

console.log("CURRENT USER =", user.id);
console.log("EXISTING ROWS =", existing);
console.log("EXISTING ERROR =", existingError);

alert(JSON.stringify(rows, null, 2));

  await fetchProfile();

  setIsEditing(false);

  alert("Profile Saved Successfully");
};

const addProduct = () => {
  if (
    !productForm.product_name ||
    !productForm.quantity ||
    !productForm.unit
  ) {
    alert("Please fill all product details.");
    return;
  }

  setProducts([
    ...products,
    {
      id: Date.now(),
      product_name: productForm.product_name,
      quantity: productForm.quantity,
      unit: productForm.unit,
    },
  ]);

  setProductForm({
    product_name: "",
    quantity: "",
    unit: "",
  });
};

const deleteProduct = (id: number) => {
  setProducts(products.filter((item: any) => item.id !== id));
};
const editProduct = (item: any) => {
  setProductForm({
    product_name: item.product_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingProductId(item.id);

  setProducts(products.filter((p: any) => p.id !== item.id));
};
const addByProduct = () => {
  if (
    !byProductForm.byproduct_name ||
    !byProductForm.quantity ||
    !byProductForm.unit
  ) {
    alert("Please fill all By-product details.");
    return;
  }

  setByProducts([
    ...byProducts,
    {
      id: Date.now(),
      byproduct_name: byProductForm.byproduct_name,
      quantity: byProductForm.quantity,
      unit: byProductForm.unit,
    },
  ]);

  setByProductForm({
    byproduct_name: "",
    quantity: "",
    unit: "",
  });
};

const deleteByProduct = (id: number) => {
  setByProducts(byProducts.filter((item: any) => item.id !== id));
};

const editByProduct = (item: any) => {
  setByProductForm({
    byproduct_name: item.byproduct_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingByProductId(item.id);

  setByProducts(byProducts.filter((p: any) => p.id !== item.id));
};

const addRawMaterial = () => {
  if (
    !rawMaterialForm.raw_material_name ||
    !rawMaterialForm.quantity ||
    !rawMaterialForm.unit
  ) {
    alert("Please fill all Raw Material details.");
    return;
  }

  setRawMaterials([
    ...rawMaterials,
    {
      id: Date.now(),
      raw_material_name: rawMaterialForm.raw_material_name,
      quantity: rawMaterialForm.quantity,
      unit: rawMaterialForm.unit,
    },
  ]);

  setRawMaterialForm({
    raw_material_name: "",
    quantity: "",
    unit: "",
  });
};

const deleteRawMaterial = (id: number) => {
  setRawMaterials(rawMaterials.filter((item: any) => item.id !== id));
};

const editRawMaterial = (item: any) => {
  setRawMaterialForm({
    raw_material_name: item.raw_material_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingRawMaterialId(item.id);

  setRawMaterials(
    rawMaterials.filter((p: any) => p.id !== item.id)
  );
};

const addFuel = () => {
  if (
    !fuelForm.fuel_name ||
    !fuelForm.quantity ||
    !fuelForm.unit
  ) {
    alert("Please fill all Fuel details.");
    return;
  }

  setFuels([
    ...fuels,
    {
      id: Date.now(),
      fuel_name: fuelForm.fuel_name,
      quantity: fuelForm.quantity,
      unit:
        fuelForm.unit === "Other"
          ? fuelForm.customUnit
          : fuelForm.unit,
    },
  ]);

  setFuelForm({
    fuel_name: "",
    quantity: "",
    unit: "",
    customUnit: "",
  });
};

const deleteFuel = (id: number) => {
  setFuels(fuels.filter((item: any) => item.id !== id));
};

const addChemical = () => {
  if (
    !chemicalForm.chemical_name ||
    !chemicalForm.storage_qty ||
    !chemicalForm.unit
  ) {
    alert("Please fill all Chemical details.");
    return;
  }

const editChemical = (item: any) => {

  setChemicalForm({
    chemical_name: item.chemical_name,
    cas_no: item.cas_no,
    storage_qty: item.storage_qty,
    unit: item.unit,
    threshold_qty: item.threshold_qty,
  });

  setEditingChemicalId(item.id);

  setProfile({
    ...profile,
    hazardous_chemicals:
      profile.hazardous_chemicals.filter(
        (c: any) => c.id !== item.id
      ),
  });

};

const deleteChemical = (id: number) => {

  setProfile({
    ...profile,
    hazardous_chemicals:
      profile.hazardous_chemicals.filter(
        (c: any) => c.id !== id
      ),
  });

};


  const newChemical = {
    id: Date.now(),
    chemical_name: chemicalForm.chemical_name,
    cas_no: chemicalForm.cas_no,
    storage_qty: chemicalForm.storage_qty,
    unit: chemicalForm.unit,
    threshold_qty: chemicalForm.threshold_qty,
  };

  setProfile({
    ...profile,
    hazardous_chemicals: [
      ...(profile.hazardous_chemicals || []),
      newChemical,
    ],
  });

  setChemicalForm({
    chemical_name: "",
    cas_no: "",
    storage_qty: "",
    unit: "",
    threshold_qty: "",
  });
};

const editFuel = (item: any) => {
  setFuelForm({
    fuel_name: item.fuel_name,
    quantity: item.quantity,
    unit: item.unit,
    customUnit: "",
  });

  setEditingFuelId(item.id);

  setFuels(fuels.filter((p: any) => p.id !== item.id));
};
const editChemical = (item: any) => {
  setChemicalForm({
    chemical_name: item.chemical_name,
    cas_no: item.cas_no,
    storage_qty: item.storage_qty,
    unit: item.unit,
    threshold_qty: item.threshold_qty,
  });

  setEditingChemicalId(item.id);

  setProfile({
    ...profile,
    hazardous_chemicals: profile.hazardous_chemicals.filter(
      (c: any) => c.id !== item.id
    ),
  });
};

const deleteChemical = (id: number) => {
  setProfile({
    ...profile,
    hazardous_chemicals: profile.hazardous_chemicals.filter(
      (c: any) => c.id !== id
    ),
  });
};
/* ===========================
   Hazardous Waste
=========================== */

const addHazardousWaste = () => {

  if (
    !hazardousWasteForm.category ||
    !hazardousWasteForm.waste_name ||
    !hazardousWasteForm.quantity ||
    !hazardousWasteForm.unit
  ) {
    alert("Please fill all Hazardous Waste details.");
    return;
  }

  const item = {
    id: Date.now(),

    category:
      hazardousWasteForm.category === "Other"
        ? hazardousWasteForm.customCategory
        : hazardousWasteForm.category,

    schedule:
      hazardousWasteForm.schedule === "Other"
        ? hazardousWasteForm.customSchedule
        : hazardousWasteForm.schedule,

    waste_name:
      hazardousWasteForm.waste_name === "Other"
        ? hazardousWasteForm.customWasteName
        : hazardousWasteForm.waste_name,

    quantity: hazardousWasteForm.quantity,
    unit: hazardousWasteForm.unit,

    disposal_method: hazardousWasteForm.disposal_method,
    recycler: hazardousWasteForm.recycler,
  };

  setProfile({
    ...profile,
    hazardous_waste_data: [
      ...(profile.hazardous_waste_data || []),
      item,
    ],
  });

  setHazardousWasteForm({
    category: "",
    customCategory: "",

    schedule: "",
    customSchedule: "",

    waste_name: "",
    customWasteName: "",

    quantity: "",
    unit: "",

    disposal_method: "",
    recycler: "",
  });

  setEditingHazardousWasteId(null);

};

const editHazardousWaste = (item: any) => {

  setHazardousWasteForm({
    category: item.category,
    customCategory: "",

    schedule: item.schedule,
    customSchedule: "",

    waste_name: item.waste_name,
    customWasteName: "",

    quantity: item.quantity,
    unit: item.unit,

    disposal_method: item.disposal_method,
    recycler: item.recycler,
  });

  setEditingHazardousWasteId(item.id);

  setProfile({
    ...profile,
    hazardous_waste_data:
      profile.hazardous_waste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteHazardousWaste = (id: number) => {

  setProfile({
    ...profile,
    hazardous_waste_data:
      profile.hazardous_waste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

/* ===========================
   Non Hazardous Waste
=========================== */

const addNonHazardousWaste = () => {

  if (
    !nonHazardousWasteForm.waste_name ||
    !nonHazardousWasteForm.quantity ||
    !nonHazardousWasteForm.unit
  ) {
    alert("Please fill all details.");
    return;
  }

  const item = {
    id: Date.now(),

    waste_name:
      nonHazardousWasteForm.waste_name === "Other"
        ? nonHazardousWasteForm.customWasteName
        : nonHazardousWasteForm.waste_name,

    quantity: nonHazardousWasteForm.quantity,

    unit: nonHazardousWasteForm.unit,

    disposal: nonHazardousWasteForm.disposal,
  };

  setProfile({
    ...profile,
    non_hazardous_waste_data: [
      ...(profile.non_hazardous_waste_data || []),
      item,
    ],
  });

  setNonHazardousWasteForm({
    waste_name: "",
    customWasteName: "",
    quantity: "",
    unit: "",
    disposal: "",
  });

  setEditingNonHazardousWasteId(null);

};
const editNonHazardousWaste = (item: any) => {

  setNonHazardousWasteForm({
    waste_name: item.waste_name,
    customWasteName: "",
    quantity: item.quantity,
    unit: item.unit,
    disposal: item.disposal,
  });

  setEditingNonHazardousWasteId(item.id);

  setProfile({
    ...profile,
    non_hazardous_waste_data:
      profile.non_hazardous_waste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteNonHazardousWaste = (id: number) => {

  setProfile({
    ...profile,
    non_hazardous_waste_data:
      profile.non_hazardous_waste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

/* ===========================
   Plastic Waste
=========================== */

const addPlasticWaste = () => {

  if (
    !plasticWasteForm.plastic_type ||
    !plasticWasteForm.quantity ||
    !plasticWasteForm.unit
  ) {
    alert("Please fill all Plastic Waste details.");
    return;
  }

  const item = {

  id: Date.now(),

  plastic_type:
    plasticWasteForm.plastic_type === "Other"
      ? plasticWasteForm.customPlasticType
      : plasticWasteForm.plastic_type,

  quantity: plasticWasteForm.quantity,

  unit: plasticWasteForm.unit,

  recycler: plasticWasteForm.recycler,

};

  setProfile({
    ...profile,
    plastic_waste_data: [
      ...(profile.plastic_waste_data || []),
      item,
    ],
  });

setPlasticWasteForm({
  plastic_type: "",
  customPlasticType: "",

  quantity: "",
  unit: "",
  recycler: "",
});

  setEditingPlasticWasteId(null);

};

const editPlasticWaste = (item: any) => {

 setPlasticWasteForm({
  plastic_type: item.plastic_type,
  customPlasticType: "",

  quantity: item.quantity,
  unit: item.unit,
  recycler: item.recycler,
});

  setEditingPlasticWasteId(item.id);

  setProfile({
    ...profile,
    plastic_waste_data:
      profile.plastic_waste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deletePlasticWaste = (id: number) => {
  
  setProfile({
    ...profile,
    plastic_waste_data:
      profile.plastic_waste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

const addEWaste = () => {

  if (
    !eWasteForm.category ||
    !eWasteForm.item_name ||
    !eWasteForm.quantity ||
    !eWasteForm.unit
  ) {
    alert("Please fill all E-Waste details.");
    return;
  }

  const item = {
    id: Date.now(),

    category:
      eWasteForm.category === "Other"
        ? eWasteForm.customCategory
        : eWasteForm.category,

    item_name:
      eWasteForm.item_name === "Other"
        ? eWasteForm.customItemName
        : eWasteForm.item_name,

    quantity: eWasteForm.quantity,
    unit: eWasteForm.unit,
    recycler: eWasteForm.recycler,
  };

  setProfile({
    ...profile,
    ewaste_data: [
      ...(profile.ewaste_data || []),
      item,
    ],
  });

  setEWasteForm({
    category: "",
    customCategory: "",

    item_name: "",
    customItemName: "",

    quantity: "",
    unit: "",

    recycler: "",
  });

  setEditingEWasteId(null);

};

const editEWaste = (item: any) => {

  setEWasteForm({
    category: item.category,
    customCategory: "",

    item_name: item.item_name,
    customItemName: "",

    quantity: item.quantity,
    unit: item.unit,

    recycler: item.recycler,
  });

  setEditingEWasteId(item.id);

  setProfile({
    ...profile,
    ewaste_data:
      profile.ewaste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteEWaste = (id: number) => {

  setProfile({
    ...profile,
    ewaste_data:
      profile.ewaste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

const addDisposalFacility = () => {

  if (
    !disposalFacilityForm.facility_type ||
    !disposalFacilityForm.facility_name
  ) {
    alert("Please fill all Disposal Facility details.");
    return;
  }

  const item = {
    id: Date.now(),

    facility_type:
      disposalFacilityForm.facility_type === "Other"
        ? disposalFacilityForm.customFacilityType
        : disposalFacilityForm.facility_type,

    facility_name: disposalFacilityForm.facility_name,

    address: disposalFacilityForm.address,

    authorization_no:
      disposalFacilityForm.authorization_no,
  };

  setProfile({
    ...profile,
    disposal_facilities: [
      ...(profile.disposal_facilities || []),
      item,
    ],
  });

  setDisposalFacilityForm({
    facility_type: "",
    customFacilityType: "",

    facility_name: "",

    address: "",

    authorization_no: "",
  });

  setEditingDisposalFacilityId(null);

};

const editDisposalFacility = (item: any) => {

  setDisposalFacilityForm({
    facility_type: item.facility_type,
    customFacilityType: "",

    facility_name: item.facility_name,

    address: item.address,

    authorization_no: item.authorization_no,
  });

  setEditingDisposalFacilityId(item.id);

  setProfile({
    ...profile,
    disposal_facilities:
      profile.disposal_facilities.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteDisposalFacility = (id: number) => {

  setProfile({
    ...profile,
    disposal_facilities:
      profile.disposal_facilities.filter(
        (x: any) => x.id !== id
      ),
  });

};

const addUsedOil = () => {

  if (
    !usedOilForm.oil_type ||
    !usedOilForm.quantity ||
    !usedOilForm.unit
  ) {
    alert("Please fill all Used Oil details.");
    return;
  }

  const item = {
    id: Date.now(),

    oil_type:
      usedOilForm.oil_type === "Other"
        ? usedOilForm.customOilType
        : usedOilForm.oil_type,

    quantity: usedOilForm.quantity,

    unit: usedOilForm.unit,

    recycler: usedOilForm.recycler,
  };

  setProfile({
    ...profile,
    used_oil_data: [
      ...(profile.used_oil_data || []),
      item,
    ],
  });

  setUsedOilForm({
    oil_type: "",
    customOilType: "",

    quantity: "",
    unit: "",

    recycler: "",
  });

  setEditingUsedOilId(null);

};

const editUsedOil = (item: any) => {

  setUsedOilForm({
    oil_type: item.oil_type,
    customOilType: "",

    quantity: item.quantity,

    unit: item.unit,

    recycler: item.recycler,
  });

  setEditingUsedOilId(item.id);

  setProfile({
    ...profile,
    used_oil_data:
      profile.used_oil_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteUsedOil = (id: number) => {

  setProfile({
    ...profile,
    used_oil_data:
      profile.used_oil_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

const addBatteryWaste = () => {

  if (
    !batteryWasteForm.battery_type ||
    !batteryWasteForm.quantity ||
    !batteryWasteForm.unit
  ) {
    alert("Please fill all Battery Waste details.");
    return;
  }

  const item = {
    id: Date.now(),

    battery_type:
      batteryWasteForm.battery_type === "Other"
        ? batteryWasteForm.customBatteryType
        : batteryWasteForm.battery_type,

    quantity: batteryWasteForm.quantity,

    unit: batteryWasteForm.unit,

    recycler: batteryWasteForm.recycler,
  };

  setProfile({
    ...profile,
    battery_waste_data: [
      ...(profile.battery_waste_data || []),
      item,
    ],
  });

  setBatteryWasteForm({
    battery_type: "",
    customBatteryType: "",

    quantity: "",
    unit: "",

    recycler: "",
  });

  setEditingBatteryWasteId(null);

};

const editBatteryWaste = (item: any) => {

  setBatteryWasteForm({
    battery_type: item.battery_type,
    customBatteryType: "",

    quantity: item.quantity,

    unit: item.unit,

    recycler: item.recycler,
  });

  setEditingBatteryWasteId(item.id);

  setProfile({
    ...profile,
    battery_waste_data:
      profile.battery_waste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteBatteryWaste = (id: number) => {

  setProfile({
    ...profile,
    battery_waste_data:
      profile.battery_waste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

const addBiomedicalWaste = () => {

  if (
    !biomedicalWasteForm.category ||
    !biomedicalWasteForm.waste_name ||
    !biomedicalWasteForm.quantity ||
    !biomedicalWasteForm.unit
  ) {
    alert("Please fill all Biomedical Waste details.");
    return;
  }

  const item = {
    id: Date.now(),

    category:
      biomedicalWasteForm.category === "Other"
        ? biomedicalWasteForm.customCategory
        : biomedicalWasteForm.category,

    waste_name:
      biomedicalWasteForm.waste_name === "Other"
        ? biomedicalWasteForm.customWasteName
        : biomedicalWasteForm.waste_name,

    quantity: biomedicalWasteForm.quantity,

    unit: biomedicalWasteForm.unit,

    cbwtf_name: biomedicalWasteForm.cbwtf_name,
  };

  setProfile({
    ...profile,
    biomedical_waste_data: [
      ...(profile.biomedical_waste_data || []),
      item,
    ],
  });

  setBiomedicalWasteForm({
    category: "",
    customCategory: "",

    waste_name: "",
    customWasteName: "",

    quantity: "",
    unit: "",

    cbwtf_name: "",
  });

  setEditingBiomedicalWasteId(null);

};

const editBiomedicalWaste = (item: any) => {

  setBiomedicalWasteForm({
    category: item.category,
    customCategory: "",

    waste_name: item.waste_name,
    customWasteName: "",

    quantity: item.quantity,

    unit: item.unit,

    cbwtf_name: item.cbwtf_name,
  });

  setEditingBiomedicalWasteId(item.id);

  setProfile({
    ...profile,
    biomedical_waste_data:
      profile.biomedical_waste_data.filter(
        (x: any) => x.id !== item.id
      ),
  });

};

const deleteBiomedicalWaste = (id: number) => {

  setProfile({
    ...profile,
    biomedical_waste_data:
      profile.biomedical_waste_data.filter(
        (x: any) => x.id !== id
      ),
  });

};

return (
    <div
      style={{
        padding: "25px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >

        {[
          ["basic","① Basic"],
          ["contact","② Contact"],
          ["factory","③ Factory"],
          ["product","④ Product"],
          ["water","⑤ Water"],
          ["environment","⑥ Environmental"],
          ["waste","⑦ Waste"],
          ["gps","⑧ GPS"],
        ].map(([key,title])=>(
          <button
            key={key}
            onClick={()=>setActiveTab(key)}
            style={{
              background:
                activeTab===key ? "#166534" : "#ffffff",
              color:
                activeTab===key ? "#fff" : "#111",
              border:"1px solid #d1d5db",
              padding:"12px 20px",
              borderRadius:"8px",
              cursor:"pointer",
              fontWeight:"bold",
            }}
          >
            {title}
          </button>
        ))}

      </div>

      {activeTab === "basic" && (
  <BasicSection
    profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}
  />
)}
      {activeTab === "contact" && (
  <ContactSection
    profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}
  />
)}
      {activeTab === "factory" && (
  <FactorySection
    profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}
  />
)}
      {activeTab === "product" && (
  <ProductSection
    profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}

    products={products}
    setProducts={setProducts}

    productForm={productForm}
    setProductForm={setProductForm}
    addProduct={addProduct}
    deleteProduct={deleteProduct}
    editProduct={editProduct}
    addByProduct={addByProduct}
    deleteByProduct={deleteByProduct}
    editByProduct={editByProduct}
    addRawMaterial={addRawMaterial}
    deleteRawMaterial={deleteRawMaterial}
    editRawMaterial={editRawMaterial}
    addFuel={addFuel}
    deleteFuel={deleteFuel}
    editFuel={editFuel}

    rawMaterials={rawMaterials}
    setRawMaterials={setRawMaterials}
    rawMaterialForm={rawMaterialForm}
    setRawMaterialForm={setRawMaterialForm}

    byProducts={byProducts}
    setByProducts={setByProducts}
    byProductForm={byProductForm}
    setByProductForm={setByProductForm}

    fuels={fuels}
    setFuels={setFuels}
    fuelForm={fuelForm}
    setFuelForm={setFuelForm}

    editingProductId={editingProductId}
    setEditingProductId={setEditingProductId}

    editingRawMaterialId={editingRawMaterialId}
    setEditingRawMaterialId={setEditingRawMaterialId}

    editingByProductId={editingByProductId}
    setEditingByProductId={setEditingByProductId}

    editingFuelId={editingFuelId}
    setEditingFuelId={setEditingFuelId}
  />
)}
      {activeTab === "water" && (
  <WaterSection
    profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}
  />
)}

      {activeTab === "environment" && (
  <EnvironmentalSection
      profile={profile}
    setProfile={setProfile}
    isEditing={isEditing}
    chemicalForm={chemicalForm}
setChemicalForm={setChemicalForm}

editingChemicalId={editingChemicalId}
setEditingChemicalId={setEditingChemicalId}
addChemical={addChemical}
editChemical={editChemical}
deleteChemical={deleteChemical}
  />
)}


      {activeTab==="waste" && (

<WasteSection

profile={profile}
setProfile={setProfile}
isEditing={isEditing}

hazardousWasteForm={hazardousWasteForm}
setHazardousWasteForm={setHazardousWasteForm}

editingHazardousWasteId={editingHazardousWasteId}
addHazardousWaste={addHazardousWaste}

editHazardousWaste={editHazardousWaste}
deleteHazardousWaste={deleteHazardousWaste}

plasticWasteForm={plasticWasteForm}
setPlasticWasteForm={setPlasticWasteForm}

editingPlasticWasteId={editingPlasticWasteId}

addPlasticWaste={addPlasticWaste}
editPlasticWaste={editPlasticWaste}
deletePlasticWaste={deletePlasticWaste}

nonHazardousWasteForm={nonHazardousWasteForm}
setNonHazardousWasteForm={setNonHazardousWasteForm}

editingNonHazardousWasteId={editingNonHazardousWasteId}

addNonHazardousWaste={addNonHazardousWaste}
editNonHazardousWaste={editNonHazardousWaste}
deleteNonHazardousWaste={deleteNonHazardousWaste}

usedOilForm={usedOilForm}
setUsedOilForm={setUsedOilForm}

editingUsedOilId={editingUsedOilId}

addUsedOil={addUsedOil}
editUsedOil={editUsedOil}
deleteUsedOil={deleteUsedOil}

batteryWasteForm={batteryWasteForm}
setBatteryWasteForm={setBatteryWasteForm}

editingBatteryWasteId={editingBatteryWasteId}

addBatteryWaste={addBatteryWaste}
editBatteryWaste={editBatteryWaste}
deleteBatteryWaste={deleteBatteryWaste}

biomedicalWasteForm={biomedicalWasteForm}
setBiomedicalWasteForm={setBiomedicalWasteForm}

editingBiomedicalWasteId={editingBiomedicalWasteId}

addBiomedicalWaste={addBiomedicalWaste}
editBiomedicalWaste={editBiomedicalWaste}
deleteBiomedicalWaste={deleteBiomedicalWaste}

eWasteForm={eWasteForm}
setEWasteForm={setEWasteForm}

editingEWasteId={editingEWasteId}

addEWaste={addEWaste}
editEWaste={editEWaste}
deleteEWaste={deleteEWaste}

disposalFacilityForm={disposalFacilityForm}
setDisposalFacilityForm={setDisposalFacilityForm}

editingDisposalFacilityId={editingDisposalFacilityId}

addDisposalFacility={addDisposalFacility}
editDisposalFacility={editDisposalFacility}
deleteDisposalFacility={deleteDisposalFacility}

/>
)}

      {activeTab==="gps" && (

<GPSSection

profile={profile}
setProfile={setProfile}
isEditing={isEditing}

/>

)}

<div
  style={{
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #d1d5db",
    paddingTop: "20px",
  }}
>
    
  <div style={{ display: "flex", gap: "10px" }}>
  {activeTab !== "basic" && (
  <button
    type="button"
    onClick={goToPreviousTab}
    style={{
      padding: "10px 18px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      background: "#ffffff",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ← Previous
  </button>
)}
    <button
      type="button"
      onClick={resetCurrentSection}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        cursor: "pointer",
      }}
    >
      Reset
    </button>

    <button
      type="button"
      onClick={() => setIsEditing(true)}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Edit
    </button>

    <button
      type="button"
      onClick={saveProfile}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        background: "#166534",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Save
    </button>

  </div>

  {activeTab !== "gps" ? (
  <button
    type="button"
    onClick={goToNextTab}
    style={{
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#166534",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Next →
  </button>
) : (
  <button
    type="button"

    onClick={() => {

try{

console.log(profile);

downloadIndustryProfile(profile);

}catch(error){

console.error("PDF Error :",error);

alert(String(error));

}

}}

    style={{
      padding: "10px 22px",
      borderRadius: "8px",
      border: "none",
      background: "#0f766e",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    📄 Download Full Profile
  </button>
)}

</div>

    </div>
  );
}