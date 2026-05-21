"use client";
import { useState } from "react";
import NavigationClient from "@/components/sections/navigation-client";
import Hero from "./hero";
import JobBoard from "./job-card";
import FutureForm from "./future-form";
import WhyJoinUs from "./why";
import HiringProcess from "./process";

export default function CareersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main style={{ background: "#080808" }}>
            <NavigationClient />
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <WhyJoinUs />
            <HiringProcess />
            <JobBoard searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FutureForm />
        </main>
    );
}
