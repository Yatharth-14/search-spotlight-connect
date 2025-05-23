
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { sellers } from "@/data/mockData";

interface Seller {
  id: number;
  name: string;
  image: string;
  badge: string;
}

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Seller[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Centralize search logic here
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = sellers.filter((seller) =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
