// components/BuildingStatus.tsx
"use client";

import { useEffect, useState } from "react";

interface BuildingStatusProps {
  deploymentId: string;
  initialStatus: string;
}

export default function BuildingStatus({ deploymentId, initialStatus }: BuildingStatusProps) {
  const [status, setStatus] = useState(initialStatus);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/deploy/status?id=${deploymentId}`);
        const data = await res.json();
        setStatus(data.status);
      } catch {
        setStatus("Error fetching status");
      }
    };
    setReady(status === "READY" || status === "ERROR")
    
    if (!ready) {
      fetchStatus(); // first fetch
      interval = setInterval(fetchStatus, 5000); // poll every 5s
    }

    return () => clearInterval(interval);
  }, [deploymentId]);

  return <span>{status}</span>;
}
