"use client";

import { useEffect, useMemo, useState } from "react";
import {
  libraryItems,
  type LibraryItem,
} from "@/lib/formats-library-data";

type TabType = "formats" | "checklists";

type LibraryApiFile = {
  name: string;
  extension: string;
  url: string;
};

type LibraryApiResponse = {
  formats: LibraryApiFile[];
  checklists: LibraryApiFile[];
};

function getFileType(extension: string): LibraryItem["fileType"] {
  const normalizedExtension = extension.toLowerCase();

  return normalizedExtension === "pdf" ||
    normalizedExtension === "docx" ||
    normalizedExtension === "xlsx"
    ? normalizedExtension
    : undefined;
}

export default function FormatsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("formats");
  const [search, setSearch] = useState("");
  const [authority, setAuthority] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] =
  useState<LibraryItem | null>(null);

  const [folderItems, setFolderItems] = useState<LibraryItem[]>([]);

  const allLibraryItems = useMemo<LibraryItem[]>(
    () => [...libraryItems, ...folderItems],
    [folderItems]
  );

  const authorities = useMemo(
    () => Array.from(new Set(allLibraryItems.map((item) => item.authority))).sort(),
    [allLibraryItems]
  );

  const categories = useMemo(
    () => Array.from(new Set(allLibraryItems.map((item) => item.category))).sort(),
    [allLibraryItems]
  );

  useEffect(() => {
  async function loadLibraryFiles() {
    try {
      const response = await fetch("/api/formats-library", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load formats library.");
      }

      const data: LibraryApiResponse = await response.json();

      const formatItems: LibraryItem[] = data.formats.map((file) => ({
        id: `format-${file.name}`,
        type: "format",
        title: file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " "),
        description: `Downloadable ${file.extension.toUpperCase()} format available in the GreenEnvis Formats Library.`,
        authority: "Other Authorities",
        category: "General",
        details: [
          `File: ${file.name}`,
          `Document Type: ${file.extension.toUpperCase()}`,
          "Available for view and download.",
        ],
        fileName: file.name,
        fileUrl: file.url,
        fileType: getFileType(file.extension),
        source: "uploaded",
        isPublished: true,
      }));

      const checklistItems: LibraryItem[] = data.checklists.map((file) => ({
        id: `checklist-${file.name}`,
        type: "checklist",
        title: file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/^Checklist[_\s-]*/i, "")
          .replace(/[_-]+/g, " "),
        description: `Downloadable ${file.extension.toUpperCase()} compliance checklist available in the GreenEnvis Checklist Library.`,
        authority: "Other Authorities",
        category: "General",
        details: [
          `File: ${file.name}`,
          `Document Type: ${file.extension.toUpperCase()}`,
          "Available for view and download.",
        ],
        fileName: file.name,
        fileUrl: file.url,
        fileType: getFileType(file.extension),
        source: "uploaded",
        isPublished: true,
      }));

      setFolderItems([...formatItems, ...checklistItems]);
    } catch (error) {
      console.error("Unable to load formats library:", error);
      setFolderItems([]);
    }
  }

  void loadLibraryFiles();
}, []);

  const formatCount = allLibraryItems.filter(
    (item) => item.type === "format"
  ).length;

  const checklistCount = allLibraryItems.filter(
    (item) => item.type === "checklist"
  ).length;

  const filteredItems = useMemo(() => {
    const selectedType =
      activeTab === "formats" ? "format" : "checklist";

    return allLibraryItems.filter((item) => {
      const matchesType = item.type === selectedType;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesAuthority =
        authority === "" || item.authority === authority;

      const matchesCategory =
        category === "" || item.category === category;

      return (
        matchesType &&
        matchesSearch &&
        matchesAuthority &&
        matchesCategory
      );
    });
  }, [activeTab, allLibraryItems, search, authority, category]);

  function clearFilters() {
    setSearch("");
    setAuthority("");
    setCategory("");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Formats & Checklist Library
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Centralized environmental compliance formats, applications,
                templates, documents and professional checklists.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="min-w-20 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center">
                <div className="text-lg font-bold text-slate-800">
                  {formatCount}
                </div>
                <div className="text-xs text-slate-500">Formats</div>
              </div>

              <div className="min-w-20 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center">
                <div className="text-lg font-bold text-slate-800">
                  {checklistCount}
                </div>
                <div className="text-xs text-slate-500">
                  Checklists
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab("formats");
              setSelectedItem(null);
            }}
            className={`border-b-2 px-5 py-3 text-sm font-semibold transition ${
              activeTab === "formats"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            📄 Formats Library
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("checklists");
              setSelectedItem(null);
            }}
            className={`border-b-2 px-5 py-3 text-sm font-semibold transition ${
              activeTab === "checklists"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            📋 Checklist Library
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search formats or checklists..."
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500"
            />

            <select
              value={authority}
              onChange={(event) => setAuthority(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none"
            >
              <option value="">All Authorities</option>

              {authorities.map((item) => (
              <option key={item} value={item}>
              {item}
             </option>
             ))}

            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none"
            >
              <option value="">All Categories</option>

            {categories.map((item) => (
            <option key={item} value={item}>
            {item}
           </option>
             ))}
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === "formats"
                ? "Environmental Formats Library"
                : "Compliance Checklist Library"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredItems.length} item
              {filteredItems.length === 1 ? "" : "s"} found
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex min-h-60 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="text-3xl">
                      {item.type === "format" ? "📄" : "📋"}
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {item.authority}
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-6 text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        {item.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-5xl">🔍</div>

              <h3 className="text-lg font-bold text-slate-800">
                No results found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter selection.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                    {selectedItem.type === "format" ? "📄" : "📋"}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {selectedItem.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {selectedItem.authority}
                      </span>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {selectedItem.category}
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {selectedItem.type === "format"
                          ? "Format"
                          : "Checklist"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-sm leading-7 text-slate-600">
                {selectedItem.description}
              </p>

              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-800">
                  {selectedItem.type === "format"
                    ? "Format Structure"
                    : "Required Checklist"}
                </h3>

                <div className="mt-4 space-y-3">
                  {selectedItem.details.map((detail, index) => (
                    <div
                      key={`${selectedItem.id}-${index}`}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm leading-6 text-slate-600">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              {selectedItem.type === "format" &&
                selectedItem.fileUrl &&
                selectedItem.fileName && (
                  <a
                    href={selectedItem.fileUrl}
                    download={selectedItem.fileName}
                    className="rounded-xl border border-emerald-600 px-5 py-2.5 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Download Format
                  </a>
                )}

              {selectedItem.type === "checklist" &&
                selectedItem.fileUrl &&
                selectedItem.fileName && (
                  <a
                    href={selectedItem.fileUrl}
                    download={selectedItem.fileName}
                    className="rounded-xl border border-emerald-600 px-5 py-2.5 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Download Checklist
                  </a>
                )}

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
