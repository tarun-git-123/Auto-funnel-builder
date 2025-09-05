import React from "react";
import dynamic from "next/dynamic";
import template from "../template.json";
import config from "../config.json";

import type { Metadata } from 'next'

export const metadata :Metadata = {
  title:config.siteName,
};

export default function Home() {
  return (
    <>
      {Object.keys(template).map((sectionName, idx) => {
        const SectionComponent = dynamic(
          () => import(`../components/home/${sectionName}`)
        );
        return <SectionComponent key={idx} />;
      })}
    </>
  );
}
