"use client";

import BasicSection from "./components/BasicSection";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function IndustryProfilePage() {
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
    plot_area: "",
    built_up_area: "",
    greenbelt_area: "",
    total_employees: "",
    working_shift: "",
    working_days: "",
    total_plant_capacity: "",
    total_plant_capacity_unit: "",
    connected_load: "",
    contract_demand: "",
    water_source: "",
    fresh_water_requirement: "",
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
    gidc: false,
    district: "",
    taluka: "",
    state: "",
  });

const [products, setProducts] = useState<any[]>([]);

const [rawMaterials, setRawMaterials] = useState<any[]>([]);

const [byProducts, setByProducts] = useState<any[]>([]);
const [fuels, setFuels] = useState<any[]>([]);

const [fuelForm, setFuelForm] = useState({
  fuel_name: "",
  quantity: "",
  unit: "",
});

const [editingFuelId, setEditingFuelId] =
  useState<string | null>(null);

const [byProductForm, setByProductForm] = useState({
  byproduct_name: "",
  quantity: "",
  unit: "",
});

const [editingByProductId, setEditingByProductId] =
  useState<string | null>(null);

const [rawMaterialForm, setRawMaterialForm] = useState({
  raw_material_name: "",
  quantity: "",
  unit: "",
});

const [editingRawMaterialId, setEditingRawMaterialId] =
  useState<string | null>(null);

const [productForm, setProductForm] = useState({
  product_name: "",
  quantity: "",
  unit: "",
});

const [editingProductId, setEditingProductId] = useState<string | null>(null);
const [activeTab, setActiveTab] = useState("basic");
  const fetchProfile = async () => {
    const { data } = await supabase
      .from("industry_profile")
      .select("*")
      .limit(1)
      .single();

    if (data) {
  setProfile(data);
  setIsEditing(false);
} else {
  setIsEditing(true);
}
  };

useEffect(() => {
  fetchProfile();
  loadProducts();
  loadRawMaterials();
  loadByProducts();
  loadFuels();
}, []);

 const saveProfile = async () => {
  const { data: existing } = await supabase
    .from("industry_profile")
    .select("id")
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("industry_profile")
      .update(profile)
      .eq("id", existing.id);

    if (error) {
      alert(error.message);
      return;
    }
  } else {
    const { error } = await supabase
      .from("industry_profile")
      .insert([profile]);

    if (error) {
      alert(error.message);
      return;
    }
  }

  setIsEditing(false);
  alert("Profile Saved Successfully");
};

const loadProducts = async () => {
  const { data, error } = await supabase
    .from("industry_products")
    .select("*")
    .order("created_at", { ascending: true });

  if (!error && data) {
    setProducts(data);
  }
};

const loadRawMaterials = async () => {
  const { data, error } = await supabase
    .from("industry_raw_materials")
    .select("*")
    .order("created_at", { ascending: true });

  if (!error && data) {
    setRawMaterials(data);
  }
};

const loadByProducts = async () => {
  const { data, error } = await supabase
    .from("industry_byproducts")
    .select("*")
    .order("created_at", { ascending: true });

  if (!error && data) {
    setByProducts(data);
  }
};

const saveProduct = async () => {
  if (!productForm.product_name) {
    alert("Please enter Product Name");
    return;
  }
  
  const payload = {
    product_name: productForm.product_name,
    quantity: productForm.quantity,
    unit: productForm.unit,
  };

  let error;

  if (editingProductId) {
    ({ error } = await supabase
      .from("industry_products")
      .update(payload)
      .eq("id", editingProductId));
  } else {
    ({ error } = await supabase
      .from("industry_products")
      .insert([payload]));
  }

  if (error) {
    alert(error.message);
    return;
  }

  setProductForm({
    product_name: "",
    quantity: "",
    unit: "",
  });

  setEditingProductId(null);

  await loadProducts();
};

const deleteRawMaterial = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Raw Material?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("industry_raw_materials")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadRawMaterials();

  alert("Raw Material Deleted Successfully");
};

  const deleteProduct = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("industry_products")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadProducts();

  alert("Product Deleted Successfully");
};

const loadFuels = async () => {
  const { data, error } = await supabase
    .from("industry_fuels")
    .select("*")
    .order("created_at", { ascending: true });

  if (!error && data) {
    setFuels(data);
  }
};

const saveRawMaterial = async () => {
  if (!rawMaterialForm.raw_material_name) {
    alert("Please enter Raw Material Name");
    return;
  }

  const payload = {
    raw_material_name: rawMaterialForm.raw_material_name,
    quantity: rawMaterialForm.quantity,
    unit: rawMaterialForm.unit,
  };

  let error;

  if (editingRawMaterialId) {
    ({ error } = await supabase
      .from("industry_raw_materials")
      .update(payload)
      .eq("id", editingRawMaterialId));
  } else {
    ({ error } = await supabase
      .from("industry_raw_materials")
      .insert([payload]));
  }

  if (error) {
    alert(error.message);
    return;
  }

  setRawMaterialForm({
    raw_material_name: "",
    quantity: "",
    unit: "",
  });

  setEditingRawMaterialId(null);

  await loadRawMaterials();
};

const editProduct = (product: any) => {
  setProductForm({
    product_name: product.product_name,
    quantity: product.quantity,
    unit: product.unit,
  });

  setEditingProductId(product.id);
};

const editRawMaterial = (item: any) => {
  setRawMaterialForm({
    raw_material_name: item.raw_material_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingRawMaterialId(item.id);
};

const saveByProduct = async () => {
  if (!byProductForm.byproduct_name) {
    alert("Please enter By-product Name");
    return;
  }

  const payload = {
    byproduct_name: byProductForm.byproduct_name,
    quantity: byProductForm.quantity,
    unit: byProductForm.unit,
  };

  let error;

  if (editingByProductId) {
    ({ error } = await supabase
      .from("industry_byproducts")
      .update(payload)
      .eq("id", editingByProductId));
  } else {
    ({ error } = await supabase
      .from("industry_byproducts")
      .insert([payload]));
  }

  if (error) {
    alert(error.message);
    return;
  }

  setByProductForm({
    byproduct_name: "",
    quantity: "",
    unit: "",
  });

  setEditingByProductId(null);

  await loadByProducts();
};

const editByProduct = (item: any) => {
  setByProductForm({
    byproduct_name: item.byproduct_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingByProductId(item.id);
};

const deleteByProduct = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this By-product?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("industry_byproducts")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  await loadByProducts();

  alert("By-product Deleted Successfully");
};

const saveFuel = async () => {
  if (!fuelForm.fuel_name) {
    alert("Please enter Fuel Name");
    return;
  }

  const payload = {
    fuel_name: fuelForm.fuel_name,
    quantity: fuelForm.quantity,
    unit: fuelForm.unit,
  };

  let error;

  if (editingFuelId) {
    ({ error } = await supabase
      .from("industry_fuels")
      .update(payload)
      .eq("id", editingFuelId));
  } else {
    ({ error } = await supabase
      .from("industry_fuels")
      .insert([payload]));
  }

  if (error) {
    alert(error.message);
    return;
  }

  setFuelForm({
    fuel_name: "",
    quantity: "",
    unit: "",
  });

  setEditingFuelId(null);

  await loadFuels();
};

const editFuel = (item: any) => {
  setFuelForm({
    fuel_name: item.fuel_name,
    quantity: item.quantity,
    unit: item.unit,
  });

  setEditingFuelId(item.id);
};

const deleteFuel = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Fuel?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("industry_fuels")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  await loadFuels();

  alert("Fuel Deleted Successfully");
};

  return (
<>
  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "25px",
      padding: "15px",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
    }}
  >
    {[
      ["basic", "1️⃣ Basic"],
      ["contact", "2️⃣ Contact"],
      ["factory", "3️⃣ Factory"],
      ["product", "4️⃣ Product"],
      ["water", "5️⃣ Water"],
      ["environment", "6️⃣ Environmental"],
      ["waste", "7️⃣ Waste"],
      ["gps", "8️⃣ GPS"],
    ].map(([key, label]) => (
      <button
        key={key}
        type="button"
        onClick={() => setActiveTab(key)}
        style={{
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background:
            activeTab === key ? "#166534" : "#e5e7eb",
          color:
            activeTab === key ? "#fff" : "#111827",
        }}
      >
        {label}
      </button>
    ))}
  </div>

    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#166534",
          }}
        >
          Industry Profile
        </h1>

        <p
          style={{
            color: "#666",
            marginTop: "8px",
          }}
        >
          Complete your profile once. GreenEnvis will automatically determine
          all applicable compliances, reminders and renewals.
        </p>
      </div>

 <BasicSection
  profile={profile}
  setProfile={setProfile}
  isEditing={isEditing}
/>   

{/* ===========================
   Contact Information
=========================== */}

<div
  style={{
    display: activeTab === "contact" ? "block" : "none",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    marginTop: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#166534",
      marginBottom: "20px",
    }}
  >
    👤 Contact Information
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td style={{ padding: "14px", width: "260px", fontWeight: "bold" }}>
          Contact Person
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.contact_person || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                contact_person: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Designation
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.designation || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                designation: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Mobile Number
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.mobile_no || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                mobile_no: e.target.value,
              })
            }
            style={{
              width: "300px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Email Address
        </td>

        <td>
          <input
            type="email"
            disabled={!isEditing}
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            style={{
              width: "400px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Alternate Mobile
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.alternate_mobile || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                alternate_mobile: e.target.value,
              })
            }
            style={{
              width: "300px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

    </tbody>
  </table>

{/* ===========================
   Factory Details
=========================== */}

<div
  style={{
    display: activeTab === "factory" ? "block" : "none",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    marginTop: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#166534",
      marginBottom: "20px",
    }}
  >
    🏭 Factory Details
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td style={{ padding: "14px", width: "260px", fontWeight: "bold" }}>
          Plot Area (Sq. m.)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.plot_area || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                plot_area: e.target.value,
              })
            }
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Built-up Area (Sq. m.)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.built_up_area || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                built_up_area: e.target.value,
              })
            }
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Greenbelt Area (Sq. m.)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.greenbelt_area || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                greenbelt_area: e.target.value,
              })
            }
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Total Employees
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.total_employees || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                total_employees: e.target.value,
              })
            }
            style={{
              width: "200px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Working Shift
        </td>

        <td>
          <select
            disabled={!isEditing}
            value={profile.working_shift || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                working_shift: e.target.value,
              })
            }
            style={{
              width: "220px",
              padding: "10px",
            }}
          >
            <option value="">Select Shift</option>
            <option>General Shift</option>
            <option>2 Shift</option>
            <option>3 Shift</option>
          </select>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Working Days / Year
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.working_days || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                working_days: e.target.value,
              })
            }
            style={{
              width: "200px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

    </tbody>
  </table>
</div>

{/* ===========================
   Product Details
=========================== */}

<div
  style={{
    display: activeTab === "product" ? "block" : "none",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    marginTop: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#166534",
      marginBottom: "20px",
    }}
  >
    📦 Product Details
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td
          style={{
            padding: "14px",
            width: "260px",
            fontWeight: "bold",
          }}
        >
          Total Plant Capacity
        </td>

        <td
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            disabled={!isEditing}
            value={profile.total_plant_capacity || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                total_plant_capacity: e.target.value,
              })
            }
            style={{
              width: "180px",
              padding: "10px",
            }}
          />

          <select
            disabled={!isEditing}
            value={profile.total_plant_capacity_unit || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                total_plant_capacity_unit: e.target.value,
              })
            }
            style={{
              width: "220px",
              padding: "10px",
            }}
          >
            <option value="">Select Unit</option>

            <option>MT/Month</option>
            <option>MT/Day</option>
            <option>MT/Year</option>

            <option>Kg/Month</option>
            <option>Kg/Day</option>
            <option>Kg/Year</option>

            <option>Nos./Day</option>
            <option>Nos./Month</option>
            <option>Nos./Year</option>

            <option>KL/Day</option>
            <option>KL/Month</option>
            <option>KL/Year</option>

            <option>MW/Month</option>
            <option>MW/Year</option>

            <option>Other</option>
          </select>

        </td>
      </tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
      verticalAlign: "top",
    }}
  >
    Product(s)
  </td>

  <td>

    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Product Name"
        value={productForm.product_name}
        onChange={(e) =>
          setProductForm({
            ...productForm,
            product_name: e.target.value,
          })
        }
        disabled={!isEditing}
        style={{
          padding: "10px",
          width: "260px",
        }}
      />

      <input
        type="number"
        placeholder="Qty"
        value={productForm.quantity}
        onChange={(e) =>
          setProductForm({
            ...productForm,
            quantity: e.target.value,
          })
        }
        disabled={!isEditing}
        style={{
          padding: "10px",
          width: "120px",
        }}
      />

      <select
        value={productForm.unit}
        onChange={(e) =>
          setProductForm({
            ...productForm,
            unit: e.target.value,
          })
        }
        disabled={!isEditing}
        style={{
          padding: "10px",
          width: "180px",
        }}
      >
        <option value="">Select Unit</option>

        <option>MT/Month</option>
        <option>MT/Day</option>
        <option>MT/Year</option>

        <option>Kg/Month</option>
        <option>Kg/Day</option>
        <option>Kg/Year</option>

        <option>Nos./Day</option>
        <option>Nos./Month</option>
        <option>Nos./Year</option>

        <option>KL/Day</option>
        <option>KL/Month</option>
        <option>KL/Year</option>

        <option>MW/Month</option>
        <option>MW/Year</option>

        <option>Other</option>
      </select>

      <button
        type="button"
        disabled={!isEditing}
        onClick={saveProduct}
        style={{
          background: "#166534",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {editingProductId ? "Update Product" : "+ Add Product"}
      </button>

    </div>

  </td>
</tr>

{products.length > 0 && (
  <tr>
    <td
      colSpan={2}
      style={{
        paddingTop: "25px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #dbe4ee",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#166534",
              color: "#ffffff",
            }}
          >
            <th style={{ padding: "12px" }}>Product Name</th>
            <th style={{ padding: "12px" }}>Qty</th>
            <th style={{ padding: "12px" }}>Unit</th>
            <th style={{ padding: "12px", width: "100px" }}>Edit</th>
            <th style={{ padding: "12px", width: "100px" }}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
                {item.product_name}
              </td>

              <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
                {item.quantity}
              </td>

              <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
                {item.unit}
              </td>

              <td
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                }}
              >

                <button
                  type="button"
                  onClick={() => editProduct(item)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                >
                  Edit
                  </button>

              </td>

              <td
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                }}
              >
                <button
                  type="button"
                    onClick={() => deleteProduct(item.id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
               >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)}

    </tbody>
  </table>

  <div
  style={{
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    🧪 Raw Material(s)
    {rawMaterials.length > 0 && (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      border: "1px solid #dbe4ee",
    }}
  >
    <thead>
      <tr
        style={{
          background: "#166534",
          color: "#fff",
        }}
      >
        <th style={{ padding: "12px" }}>Raw Material Name</th>
        <th style={{ padding: "12px" }}>Qty</th>
        <th style={{ padding: "12px" }}>Unit</th>
        <th style={{ padding: "12px", width: "90px" }}>Edit</th>
        <th style={{ padding: "12px", width: "90px" }}>Delete</th>
      </tr>
    </thead>

    <tbody>
      {rawMaterials.map((item) => (
        <tr key={item.id}>
          <td
            style={{
              padding: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            {item.raw_material_name}
          </td>

          <td
            style={{
              padding: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            {item.quantity}
          </td>

          <td
            style={{
              padding: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            {item.unit}
          </td>

          <td
            style={{
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <button
              type="button"
              onClick={() => editRawMaterial(item)}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </td>

          <td
            style={{
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <button
              type="button"
              onClick={() => deleteRawMaterial(item.id)}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
  </h3>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "15px",
    }}
  >
    <input
      type="text"
      placeholder="Raw Material Name"
      disabled={!isEditing}
      value={rawMaterialForm.raw_material_name}
      onChange={(e) =>
        setRawMaterialForm({
          ...rawMaterialForm,
          raw_material_name: e.target.value,
        })
      }
      style={{
        width: "260px",
        padding: "10px",
      }}
    />
    <input
      type="number"
      placeholder="Qty"
      disabled={!isEditing}
      value={rawMaterialForm.quantity}
      onChange={(e) =>
        setRawMaterialForm({
          ...rawMaterialForm,
          quantity: e.target.value,
        })
      }
      style={{
        width: "120px",
        padding: "10px",
      }}
    />

    <select
      disabled={!isEditing}
      value={rawMaterialForm.unit}
      onChange={(e) =>
        setRawMaterialForm({
          ...rawMaterialForm,
          unit: e.target.value,
        })
      }
      style={{
        width: "180px",
        padding: "10px",
      }}
    >
      <option value="">Select Unit</option>

      <option>MT/Month</option>
      <option>MT/Day</option>
      <option>MT/Year</option>

      <option>Kg/Month</option>
      <option>Kg/Day</option>
      <option>Kg/Year</option>

      <option>Nos./Day</option>
      <option>Nos./Month</option>
      <option>Nos./Year</option>

      <option>KL/Day</option>
      <option>KL/Month</option>
      <option>KL/Year</option>

      <option>MW/Month</option>
      <option>MW/Year</option>

      <option>Other</option>
    </select>

    <button
      type="button"
      disabled={!isEditing}
      onClick={saveRawMaterial}
      style={{
        background: "#166534",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {editingRawMaterialId
        ? "Update Raw Material"
        : "+ Add Raw Material"}
    </button>
  </div>
</div>

</div>

<div
  style={{
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    🏭 By-product(s)
  </h3>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "15px",
    }}
  >
    <input
      type="text"
      placeholder="By-product Name"
      disabled={!isEditing}
      value={byProductForm.byproduct_name}
      onChange={(e) =>
        setByProductForm({
          ...byProductForm,
          byproduct_name: e.target.value,
        })
      }
      style={{
        width: "260px",
        padding: "10px",
      }}
    />

    <input
      type="number"
      placeholder="Qty"
      disabled={!isEditing}
      value={byProductForm.quantity}
      onChange={(e) =>
        setByProductForm({
          ...byProductForm,
          quantity: e.target.value,
        })
      }
      style={{
        width: "120px",
        padding: "10px",
      }}
    />

    <select
      disabled={!isEditing}
      value={byProductForm.unit}
      onChange={(e) =>
        setByProductForm({
          ...byProductForm,
          unit: e.target.value,
        })
      }
      style={{
        width: "180px",
        padding: "10px",
      }}
    >
      <option value="">Select Unit</option>
      <option>MT/Month</option>
      <option>MT/Day</option>
      <option>MT/Year</option>
      <option>Kg/Month</option>
      <option>Kg/Day</option>
      <option>Kg/Year</option>
      <option>Nos./Day</option>
      <option>Nos./Month</option>
      <option>Nos./Year</option>
      <option>KL/Day</option>
      <option>KL/Month</option>
      <option>KL/Year</option>
      <option>MW/Month</option>
      <option>MW/Year</option>
      <option>Other</option>
    </select>

    <button
      type="button"
      disabled={!isEditing}
      onClick={saveByProduct}
      style={{
        background: "#166534",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {editingByProductId
        ? "Update By-product"
        : "+ Add By-product"}
    </button>
  </div>

  {byProducts.length > 0 && (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        border: "1px solid #dbe4ee",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#166534",
            color: "#fff",
          }}
        >
          <th style={{ padding: "12px" }}>By-product Name</th>
          <th style={{ padding: "12px" }}>Qty</th>
          <th style={{ padding: "12px" }}>Unit</th>
          <th style={{ padding: "12px", width: "90px" }}>Edit</th>
          <th style={{ padding: "12px", width: "90px" }}>Delete</th>
        </tr>
      </thead>

      <tbody>
        {byProducts.map((item) => (
          <tr key={item.id}>
            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.byproduct_name}
            </td>

            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.quantity}
            </td>

            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.unit}
            </td>

            <td style={{ textAlign: "center", border: "1px solid #e5e7eb" }}>
              <button
                type="button"
                onClick={() => editByProduct(item)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </td>

            <td style={{ textAlign: "center", border: "1px solid #e5e7eb" }}>
              <button
                type="button"
                onClick={() => deleteByProduct(item.id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

<div
  style={{
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    ⛽ Fuel Used
  </h3>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "15px",
    }}
  >   
    <select
      disabled={!isEditing}
      value={fuelForm.fuel_name}
      onChange={(e) =>
        setFuelForm({
          ...fuelForm,
          fuel_name: e.target.value,
        })
      }
      style={{
        width: "220px",
        padding: "10px",
      }}
    >
      <option value="">Select Fuel</option>
      <option>PNG</option>
      <option>Coal</option>
      <option>FO</option>
      <option>HSD</option>
      <option>Electricity</option>
      <option>Biomass</option>
      <option>Other</option>
    </select>

    <input
      type="number"
      placeholder="Qty"
      disabled={!isEditing}
      value={fuelForm.quantity}
      onChange={(e) =>
        setFuelForm({
          ...fuelForm,
          quantity: e.target.value,
        })
      }
      style={{
        width: "120px",
        padding: "10px",
      }}
    />

    <select
      disabled={!isEditing}
      value={fuelForm.unit}
      onChange={(e) =>
        setFuelForm({
          ...fuelForm,
          unit: e.target.value,
        })
      }
      style={{
        width: "180px",
        padding: "10px",
      }}
    >
      <option value="">Select Unit</option>
      <option>MT/Month</option>
      <option>MT/Day</option>
      <option>MT/Year</option>
      <option>Kg/Month</option>
      <option>Kg/Day</option>
      <option>Kg/Year</option>
      <option>KL/Month</option>
      <option>KL/Day</option>
      <option>KL/Year</option>
      <option>Other</option>
    </select>

    <button
      type="button"
      disabled={!isEditing}
      onClick={saveFuel}
      style={{
        background: "#166534",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {editingFuelId ? "Update Fuel" : "+ Add Fuel"}
    </button>
  </div>

  {fuels.length > 0 && (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        border: "1px solid #dbe4ee",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#166534",
            color: "#fff",
          }}
        >
          <th style={{ padding: "12px" }}>Fuel</th>
          <th style={{ padding: "12px" }}>Qty</th>
          <th style={{ padding: "12px" }}>Unit</th>
          <th style={{ padding: "12px" }}>Edit</th>
          <th style={{ padding: "12px" }}>Delete</th>
        </tr>
      </thead>

      <tbody>
        {fuels.map((item) => (
          <tr key={item.id}>
            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.fuel_name}
            </td>

            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.quantity}
            </td>

            <td style={{ padding: "10px", border: "1px solid #e5e7eb" }}>
              {item.unit}
            </td>

            <td style={{ textAlign: "center", border: "1px solid #e5e7eb" }}>
              <button
                type="button"
                onClick={() => editFuel(item)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </td>

            <td style={{ textAlign: "center", border: "1px solid #e5e7eb" }}>
              <button
                type="button"
                onClick={() => deleteFuel(item.id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

<div
  style={{
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    ⚡ Power Requirement
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>
      <tr>
        <td
          style={{
            width: "260px",
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Connected Load (kW)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.connected_load || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                connected_load: e.target.value,
              })
            }
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td
          style={{
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Contract Demand (kVA)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.contract_demand || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                contract_demand: e.target.value,
              })
            }
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div
  style={{
    display: activeTab === "water" ? "block" : "none",
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    💧 Water & Utilities
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td style={{ width: "260px", padding: "14px", fontWeight: "bold" }}>
          Water Source
        </td>

        <td>
          <select
            disabled={!isEditing}
            value={profile.water_source}
            onChange={(e) =>
              setProfile({
                ...profile,
                water_source: e.target.value,
              })
            }
            style={{
              width: "220px",
              padding: "10px",
            }}
          >
            <option value="">Select</option>
            <option>GIDC</option>
            <option>Borewell</option>
            <option>Tanker</option>
            <option>River</option>
            <option>Municipal Supply</option>
          </select>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Fresh Water Requirement (KLD)
        </td>

        <td>
          <input
            type="number"
            disabled={!isEditing}
            value={profile.fresh_water_requirement}
            onChange={(e) =>
              setProfile({
                ...profile,
                fresh_water_requirement: e.target.value,
              })
            }
            style={{
              width: "220px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Wastewater Generation (KLD)
  </td>

  <td>
    <input
      type="number"
      disabled={!isEditing}
      value={profile.wastewater_generation}
      onChange={(e) =>
        setProfile({
          ...profile,
          wastewater_generation: e.target.value,
        })
      }
      style={{
        width: "220px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Domestic Wastewater (KLD)
  </td>

  <td>
    <input
      type="number"
      disabled={!isEditing}
      value={profile.domestic_wastewater}
      onChange={(e) =>
        setProfile({
          ...profile,
          domestic_wastewater: e.target.value,
        })
      }
      style={{
        width: "220px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Industrial Wastewater (KLD)
  </td>

  <td>
    <input
      type="number"
      disabled={!isEditing}
      value={profile.industrial_wastewater}
      onChange={(e) =>
        setProfile({
          ...profile,
          industrial_wastewater: e.target.value,
        })
      }
      style={{
        width: "220px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Treatment Facilities
  </td>

  <td>
    <label style={{ marginRight: "20px" }}>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.etp}
        onChange={(e) =>
          setProfile({
            ...profile,
            etp: e.target.checked,
          })
        }
      />{" "}
      ETP
    </label>

    <label style={{ marginRight: "20px" }}>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.stp}
        onChange={(e) =>
          setProfile({
            ...profile,
            stp: e.target.checked,
          })
        }
      />{" "}
      STP
    </label>

    <label style={{ marginRight: "20px" }}>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.ro}
        onChange={(e) =>
          setProfile({
            ...profile,
            ro: e.target.checked,
          })
        }
      />{" "}
      RO
    </label>

    <label>
      <input
        type="checkbox"
        disabled={!isEditing}
        checked={profile.zld}
        onChange={(e) =>
          setProfile({
            ...profile,
            zld: e.target.checked,
          })
        }
      />{" "}
      ZLD
    </label>
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Water Balance Summary
  </td>

  <td
    style={{
      color: "#374151",
      lineHeight: "1.8",
      fontWeight: "500",
    }}
  >
    Fresh Water :
    <b> {profile.fresh_water_requirement || 0} KLD</b>

    <br />

    Wastewater :
    <b> {profile.wastewater_generation || 0} KLD</b>

    <br />

    Domestic :
    <b> {profile.domestic_wastewater || 0} KLD</b>

    <br />

    Industrial :
    <b> {profile.industrial_wastewater || 0} KLD</b>
  </td>
</tr>

    </tbody>
  </table>
</div>

<div
  style={{
    display: activeTab === "environment" ? "block" : "none",
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    ♻ Environmental Compliance
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
  <td
    style={{
      width: "260px",
      padding: "14px",
      fontWeight: "bold",
      verticalAlign: "top",
    }}
  >
    Applicable Compliances
  </td>

  <td>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(250px,1fr))",
        gap: "12px 30px",
      }}
    >

      <label><input type="checkbox" disabled={!isEditing} checked={profile.hazardous_waste} onChange={(e)=>setProfile({...profile,hazardous_waste:e.target.checked})}/> Hazardous Waste</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.biomedical_waste} onChange={(e)=>setProfile({...profile,biomedical_waste:e.target.checked})}/> Biomedical Waste</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.plastic_epr} onChange={(e)=>setProfile({...profile,plastic_epr:e.target.checked})}/> Plastic EPR</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.ewaste_epr} onChange={(e)=>setProfile({...profile,ewaste_epr:e.target.checked})}/> E-Waste</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.used_oil_epr} onChange={(e)=>setProfile({...profile,used_oil_epr:e.target.checked})}/> Used Oil EPR</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.battery_epr} onChange={(e)=>setProfile({...profile,battery_epr:e.target.checked})}/> Battery EPR</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.tyre_epr} onChange={(e)=>setProfile({...profile,tyre_epr:e.target.checked})}/> Tyre EPR</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.cgwa_noc} onChange={(e)=>setProfile({...profile,cgwa_noc:e.target.checked})}/> CGWA NOC</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.factory_license} onChange={(e)=>setProfile({...profile,factory_license:e.target.checked})}/> Factory License</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.fire_noc} onChange={(e)=>setProfile({...profile,fire_noc:e.target.checked})}/> Fire NOC</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.peso} onChange={(e)=>setProfile({...profile,peso:e.target.checked})}/> PESO</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.explosive_license} onChange={(e)=>setProfile({...profile,explosive_license:e.target.checked})}/> Explosive License</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.boiler} onChange={(e)=>setProfile({...profile,boiler:e.target.checked})}/> Boiler</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.msihc} onChange={(e)=>setProfile({...profile,msihc:e.target.checked})}/> MSIHC</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.environmental_clearance} onChange={(e)=>setProfile({...profile,environmental_clearance:e.target.checked})}/> Environmental Clearance</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.cte} onChange={(e)=>setProfile({...profile,cte:e.target.checked})}/> CTE</label>

      <label><input type="checkbox" disabled={!isEditing} checked={profile.cca} onChange={(e)=>setProfile({...profile,cca:e.target.checked})}/> CCA</label>

    </div>
  </td>
</tr>
    </tbody>
  </table>
</div>

<div
  style={{
    display: activeTab === "waste" ? "block" : "none",
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    🗑 Waste Management
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td
          style={{
            width: "260px",
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Hazardous Waste Generated
        </td>

        <td>
          <input
            type="checkbox"
            disabled={!isEditing}
            checked={profile.hazardous_waste}
            onChange={(e) =>
              setProfile({
                ...profile,
                hazardous_waste: e.target.checked,
              })
            }
          />{" "}
          Yes
        </td>
      </tr>

      <tr>
        <td
          style={{
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Hazardous Waste Quantity
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.hazardous_waste_quantity}
            onChange={(e) =>
              setProfile({
                ...profile,
                hazardous_waste_quantity: e.target.value,
              })
            }
            placeholder="Example : 2 MT/Month"
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td
          style={{
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Disposal Method
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.disposal_method}
            onChange={(e) =>
              setProfile({
                ...profile,
                disposal_method: e.target.value,
              })
            }
            placeholder="TSDF / Recycler / Co-processing"
            style={{
              width: "350px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    TSDF Name
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.tsdf_name}
      onChange={(e) =>
        setProfile({
          ...profile,
          tsdf_name: e.target.value,
        })
      }
      placeholder="Example : BEIL / NECL / SEPPL"
      style={{
        width: "350px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Non Hazardous Waste
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.non_hazardous_waste}
      onChange={(e) =>
        setProfile({
          ...profile,
          non_hazardous_waste: e.target.value,
        })
      }
      placeholder="Example : 10 MT/Month"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Recyclable Waste
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.recyclable_waste}
      onChange={(e) =>
        setProfile({
          ...profile,
          recyclable_waste: e.target.value,
        })
      }
      placeholder="Example : 5 MT/Month"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Plastic Waste
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.plastic_waste}
      onChange={(e) =>
        setProfile({
          ...profile,
          plastic_waste: e.target.value,
        })
      }
      placeholder="Example : 500 Kg/Month"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Used Oil Generated
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.used_oil_generated}
      onChange={(e) =>
        setProfile({
          ...profile,
          used_oil_generated: e.target.value,
        })
      }
      placeholder="Example : 200 Litre/Month"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

    </tbody>
  </table>
</div>

<div
  style={{
    display: activeTab === "gps" ? "block" : "none",
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "25px",
  }}
>
  <h3
    style={{
      color: "#166534",
      marginBottom: "15px",
    }}
  >
    📍 GPS & Location
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <tbody>

      <tr>
        <td
          style={{
            width: "260px",
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Latitude
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.latitude}
            onChange={(e) =>
              setProfile({
                ...profile,
                latitude: e.target.value,
              })
            }
            placeholder="23.123456"
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td
          style={{
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Longitude
        </td>

        <td>
          <input
            type="text"
            disabled={!isEditing}
            value={profile.longitude}
            onChange={(e) =>
              setProfile({
                ...profile,
                longitude: e.target.value,
              })
            }
            placeholder="72.123456"
            style={{
              width: "250px",
              padding: "10px",
            }}
          />
        </td>
      </tr>

      <tr>
        <td
          style={{
            padding: "14px",
            fontWeight: "bold",
          }}
        >
          Located in GIDC
        </td>

        <td>
          <label style={{ marginRight: "20px" }}>
  <input
    type="radio"
    name="gidc"
    disabled={!isEditing}
    checked={profile.gidc === true}
    onChange={() =>
      setProfile({
        ...profile,
        gidc: true,
      })
    }
  />{" "}
  Yes
</label>

<label>
  <input
    type="radio"
    name="gidc"
    disabled={!isEditing}
    checked={profile.gidc === false}
    onChange={() =>
      setProfile({
        ...profile,
        gidc: false,
      })
    }
  />{" "}
  No
</label>
        </td>
      </tr>

      <tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    District
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.district}
      onChange={(e) =>
        setProfile({
          ...profile,
          district: e.target.value,
        })
      }
      placeholder="Ahmedabad"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    Taluka
  </td>

  <td>
    <input
      type="text"
      disabled={!isEditing}
      value={profile.taluka}
      onChange={(e) =>
        setProfile({
          ...profile,
          taluka: e.target.value,
        })
      }
      placeholder="Sanand"
      style={{
        width: "250px",
        padding: "10px",
      }}
    />
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
    }}
  >
    State
  </td>

  <td>
    <select
      disabled={!isEditing}
      value={profile.state}
      onChange={(e) =>
        setProfile({
          ...profile,
          state: e.target.value,
        })
      }
      style={{
        width: "250px",
        padding: "10px",
      }}
    >
      <option value="">Select State</option>
      <option>Gujarat</option>
      <option>Maharashtra</option>
      <option>Rajasthan</option>
      <option>Madhya Pradesh</option>
      <option>Karnataka</option>
      <option>Tamil Nadu</option>
      <option>Uttar Pradesh</option>
      <option>Other</option>
    </select>
  </td>
</tr>

    </tbody>
  </table>
</div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          
{isEditing ? (
  <button
    onClick={saveProfile}
    style={{
      background: "#166534",
      color: "#fff",
      border: "none",
      padding: "12px 30px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
    }}
  >
    Save Industry Profile
  </button>
) : (
  
  <button
    onClick={() => setIsEditing(true)}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 30px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
    }}
  >
    Edit Profile
  </button>
)}

<button
  style={{
    background: "#16a34a",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
  }}
>
  Download Profile
</button>

      </div>
    </div>
  </div>
</>
);
}