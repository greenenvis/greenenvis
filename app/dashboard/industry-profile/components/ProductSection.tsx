export default function ProductSection({
  profile,
  setProfile,
  isEditing,

  products,
  setProducts,

  productForm,
  setProductForm,
  addProduct,
  deleteProduct,
  editProduct,
  addByProduct,
  deleteByProduct,
  editByProduct,
  addRawMaterial,
  deleteRawMaterial,
  editRawMaterial,
  addFuel,
  deleteFuel,
  editFuel,

  rawMaterials,
  setRawMaterials,

  rawMaterialForm,
  setRawMaterialForm,

  byProducts,
  setByProducts,

  byProductForm,
  setByProductForm,

  fuels,
  setFuels,

  fuelForm,
  setFuelForm,

  editingProductId,
  setEditingProductId,

  editingRawMaterialId,
  setEditingRawMaterialId,

  editingByProductId,
  setEditingByProductId,

  editingFuelId,
  setEditingFuelId,
}: any) {

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
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
        🏭 Product Details
      </h2>
<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  }}
>

  <input
    type="text"
    placeholder="Product Name"
    disabled={!isEditing}
    value={productForm.product_name}
    onChange={(e)=>
      setProductForm({
        ...productForm,
        product_name:e.target.value,
      })
    }
    style={{
      width:"300px",
      padding:"10px",
    }}
  />

  <input
    type="number"
    placeholder="Capacity"
    disabled={!isEditing}
    value={productForm.quantity}
    onChange={(e)=>
      setProductForm({
        ...productForm,
        quantity:e.target.value,
      })
    }
    style={{
      width:"150px",
      padding:"10px",
    }}
  />

  <select
    disabled={!isEditing}
    value={productForm.unit}
    onChange={(e)=>
      setProductForm({
        ...productForm,
        unit:e.target.value,
      })
    }
    style={{
      width:"180px",
      padding:"10px",
    }}
  >
    <option value="">Select Unit</option>
    <option>MT/Month</option>
    <option>MT/Day</option>
    <option>MT/Year</option>
    <option>Kg/Month</option>
    <option>Kg/Day</option>
    <option>Kg/Year</option>
    <option>No./Month</option>
    <option>No./Day</option>
    <option>No./Year</option>
  </select>

</div>
<div
  style={{
    marginBottom: "25px",
  }}
>
  <button
    type="button"
    onClick={addProduct}
    disabled={!isEditing}
    style={{
      padding: "10px 18px",
      background: "#166534",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    + Add Product
  </button>
</div>
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr
      style={{
        background: "#166534",
        color: "#ffffff",
      }}
    >
      <th style={{ padding: "10px" }}>Product Name</th>
      <th style={{ padding: "10px" }}>Capacity</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delete</th>
    </tr>
  </thead>

  <tbody>
    {products.map((item: any) => (
      <tr key={item.id}>
        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.product_name}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.quantity}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.unit}
        </td>
<td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
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
      fontWeight: "bold",
    }}
  >
    Edit
  </button>
</td>

<td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
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
      fontWeight: "bold",
    }}
  >
    Delete
  </button>
</td>
      </tr>
    ))}
  </tbody>
</table>
<h3
  style={{
    marginTop: "35px",
    color: "#166534",
  }}
>
  By-product(s)
</h3>

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
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
      width: "300px",
      padding: "10px",
    }}
  />

  <input
    type="number"
    placeholder="Quantity"
    disabled={!isEditing}
    value={byProductForm.quantity}
    onChange={(e) =>
      setByProductForm({
        ...byProductForm,
        quantity: e.target.value,
      })
    }
    style={{
      width: "150px",
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
  </select>

  <button
    type="button"
    onClick={addByProduct}
    disabled={!isEditing}
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
    + Add By-product
  </button>
</div>
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr
      style={{
        background: "#166534",
        color: "#ffffff",
      }}
    >
      <th style={{ padding: "10px" }}>By-product</th>
      <th style={{ padding: "10px" }}>Quantity</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delete</th>
    </tr>
  </thead>

  <tbody>
    {byProducts.map((item: any) => (
      <tr key={item.id}>
        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.byproduct_name}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.quantity}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.unit}
        </td>

        <td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
  }}
>
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

<td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
  }}
>
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

<h3
  style={{
    marginTop: "35px",
    color: "#166534",
  }}
>
  Raw Material(s)
</h3>

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
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
      width: "300px",
      padding: "10px",
    }}
  />

  <input
    type="number"
    placeholder="Quantity"
    disabled={!isEditing}
    value={rawMaterialForm.quantity}
    onChange={(e) =>
      setRawMaterialForm({
        ...rawMaterialForm,
        quantity: e.target.value,
      })
    }
    style={{
      width: "150px",
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
  </select>

  <button
    type="button"
    onClick={addRawMaterial}
    disabled={!isEditing}
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
    + Add Raw Material
  </button>
</div>
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr
      style={{
        background: "#166534",
        color: "#ffffff",
      }}
    >
      <th style={{ padding: "10px" }}>Raw Material</th>
      <th style={{ padding: "10px" }}>Quantity</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delete</th>
    </tr>
  </thead>

  <tbody>
    {rawMaterials.map((item: any) => (
      <tr key={item.id}>
        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.raw_material_name}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.quantity}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.unit}
        </td>
        <td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
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
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
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
<h3
  style={{
    marginTop: "35px",
    color: "#166534",
  }}
>
  Fuel Used
</h3>

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  }}
>

  <select
    disabled={!isEditing}
    value={fuelForm.fuel_name}
    onChange={(e)=>
      setFuelForm({
        ...fuelForm,
        fuel_name:e.target.value,
      })
    }
    style={{
      width:"220px",
      padding:"10px",
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
    placeholder="Quantity"
    disabled={!isEditing}
    value={fuelForm.quantity}
    onChange={(e)=>
      setFuelForm({
        ...fuelForm,
        quantity:e.target.value,
      })
    }
    style={{
      width:"150px",
      padding:"10px",
    }}
  />

  <select
    disabled={!isEditing}
    value={fuelForm.unit}
    onChange={(e)=>
      setFuelForm({
        ...fuelForm,
        unit:e.target.value,
      })
    }
    style={{
      width:"180px",
      padding:"10px",
    }}
  >
    <option value="">Select Unit</option>
    <option>MT/Month</option>
    <option>MT/Day</option>
    <option>MT/Year</option>
    <option>KL/Month</option>
    <option>KL/Day</option>
    <option>KL/Year</option>
    <option value="Other">Other</option>
  </select>

{fuelForm.unit === "Other" && (
  <input
    type="text"
    placeholder="Enter Unit"
    disabled={!isEditing}
    value={fuelForm.customUnit || ""}
    onChange={(e) =>
      setFuelForm({
        ...fuelForm,
        customUnit: e.target.value,
      })
    }
    style={{
      width: "180px",
      padding: "10px",
    }}
  />
)}

  <button
    type="button"
    onClick={addFuel}
    disabled={!isEditing}
    style={{
      background:"#166534",
      color:"#fff",
      border:"none",
      padding:"10px 18px",
      borderRadius:"8px",
      cursor:"pointer",
      fontWeight:"bold",
    }}
  >
    + Add Fuel
  </button>

</div>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr
      style={{
        background: "#166534",
        color: "#ffffff",
      }}
    >
      <th style={{ padding: "10px" }}>Fuel</th>
      <th style={{ padding: "10px" }}>Quantity</th>
      <th style={{ padding: "10px" }}>Unit</th>
      <th style={{ padding: "10px" }}>Edit</th>
      <th style={{ padding: "10px" }}>Delet</th>
    </tr>
  </thead>

  <tbody>
    {fuels.map((item: any) => (
      <tr key={item.id}>
        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.fuel_name}
        </td>
        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.quantity}
        </td>

        <td
          style={{
            padding: "10px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {item.unit}
        </td>
        <td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
  }}
>
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

<td
  style={{
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
  }}
>
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

    </div>
  );
}