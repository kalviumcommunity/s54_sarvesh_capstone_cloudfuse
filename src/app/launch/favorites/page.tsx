"use client";

import { FileBrowser } from "../../../components/FileBrowser";

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title={"Favorites"} favoritesOnly />
    </div>
  );
}
