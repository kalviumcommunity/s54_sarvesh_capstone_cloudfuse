"use client";

import { useQuery } from "convex/react";
import { FileBrowser } from "../../../components/FileBrowser";
import { api } from "../../../../convex/_generated/api";

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title={"Favorites"} favorites />
    </div>
  );
}
