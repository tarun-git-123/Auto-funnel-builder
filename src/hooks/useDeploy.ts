"use client";

import { SiteConfig } from "@/types/site-config";
import { useState } from "react";

type DeployStatus = {
  status: "Queued" | "deploying" | "success" | "error";
  url?: string;
  message?: string;
};

type DeployMap = Record<string, DeployStatus>;

const useDeploy = () => {
  const [deploymentStatus, setDeploymentStatus] = useState<DeployMap>({});

  async function handleDeploy(config: SiteConfig) {
    const siteKey = config.siteName;

    // Set to deploying
    setDeploymentStatus((prev) => ({
      ...prev,
      [siteKey]: { status: "deploying" },
    }));

    try {
      const res = await fetch("/api/deploy/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (data.url) {
        setDeploymentStatus((prev) => ({
          ...prev,
          [siteKey]: {
            status: "success",
            url: data.url,
          },
        }));
        
      } else {
        setDeploymentStatus((prev) => ({
          ...prev,
          [siteKey]: {
            status: "error",
            message: "Deploy failed",
            url: data.inspectUrl,
          },
        }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";

      setDeploymentStatus((prev) => ({
        ...prev,
        [siteKey]: {
          status: "error",
          message,
        },
      }));
    }
  }

  return { deploymentStatus, handleDeploy };
};

export default useDeploy;
