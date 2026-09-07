import type { Metadata } from "next";
import { loadPhones, MAX_PHONES, type Phone } from "@/lib/phones";
import { logoutAction } from "./login/actions";
import { addPhoneAction, deletePhoneAction, savePhoneAction } from "./actions";
import { ActionForm } from "./ActionForm";
import { FileField } from "./FileField";
import { PriceField } from "./PriceField";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const CONDITIONS = ["Like New", "Excellent", "Good", "New"] as const;

const inputCls =
  "border-2 border-ink rounded-md px-3 py-2 text-base bg-paper w-full";
const labelCls = "flex flex-col gap-1 text-xs uppercase tracking-widest font-mono";

function PhoneFields({ p }: { p?: Phone }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <label className={`${labelCls} col-span-2`}>
        Brand
        <input name="brand" required defaultValue={p?.brand ?? ""} className={inputCls} />
      </label>
      <label className={`${labelCls} col-span-2`}>
        Model
        <input name="model" required defaultValue={p?.model ?? ""} className={inputCls} />
      </label>
      <label className={labelCls}>
        Storage
        <input
          name="storage"
          list="storage-options"
          required
          defaultValue={p?.storage ?? ""}
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        RAM
        <input name="ram" defaultValue={p?.ram ?? ""} className={inputCls} placeholder="8GB" />
      </label>
      <label className={`${labelCls} col-span-2`}>
        Colour
        <input
          name="color"
          defaultValue={p?.color ?? ""}
          className={inputCls}
          placeholder="Midnight Black"
        />
      </label>
      <PriceField
        defaultPrice={p?.price}
        defaultContact={p ? p.price == null : true}
      />
      <label className={labelCls}>
        Condition
        <select
          name="condition"
          defaultValue={p?.condition ?? "Excellent"}
          className={inputCls}
        >
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Kind
        <select name="kind" defaultValue={p?.kind ?? "Used"} className={inputCls}>
          <option value="Used">Used</option>
          <option value="New">New</option>
        </select>
      </label>
      <div className={`${labelCls} col-span-2`}>
        <span>
          Photo{" "}
          {p?.image ? (
            <span className="normal-case text-muted">(new upload replaces current)</span>
          ) : null}
        </span>
        {p?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt=""
            className="mb-1 h-24 w-24 object-cover rounded-md border-2 border-ink"
          />
        ) : null}
        <FileField name="image" required={!p} />
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const phones = await loadPhones();
  const atCap = phones.length >= MAX_PHONES;
  return (
    <main className="mx-auto max-w-lg lg:max-w-7xl px-4 py-8 pb-24">
      <datalist id="storage-options">
        {STORAGE_OPTIONS.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-2xl">Phones</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm underline">
            Sign out
          </button>
        </form>
      </div>

      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
        {phones.length} / {MAX_PHONES} phones
      </div>

      {atCap ? (
        <div className="mb-8 brick p-4 shadow-brick text-sm">
          <div className="font-bold mb-1">At the {MAX_PHONES}-phone limit.</div>
          Delete one below before adding another.
        </div>
      ) : (
        <details className="mb-8 brick p-4 shadow-brick">
          <summary className="font-bold text-lg cursor-pointer mb-4">Add phone</summary>
          <ActionForm action={addPhoneAction} submitLabel="Add">
            <PhoneFields />
          </ActionForm>
        </details>
      )}

      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {phones.map((p) => (
          <li key={p.id} className="brick p-4 shadow-brick">
            <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              {p.kind} · {p.brand}
            </div>
            <div className="font-display font-bold text-lg mb-4">{p.model}</div>
            <ActionForm action={savePhoneAction} submitLabel="Save">
              <input type="hidden" name="id" value={p.id} />
              <PhoneFields p={p} />
            </ActionForm>
            <div className="mt-3">
              <ActionForm action={deletePhoneAction} submitLabel="Delete" danger>
                <input type="hidden" name="id" value={p.id} />
              </ActionForm>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
