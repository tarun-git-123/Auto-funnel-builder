import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import open from "open";

let devProcesses: Record<string, any> = {};

export async function POST(req: Request) {
    const body = await req.json();
    const funnelName = body.funnelName;
    const projectPath = path.join(process.cwd(), "src/storage", funnelName);

    // Assign a unique port for each funnel
    const port = 5900 + Object.keys(devProcesses).length;

    // Kill existing process if running
    if (devProcesses[funnelName]) {
        console.log("devProcesses", devProcesses);
        devProcesses[funnelName].kill(); // send SIGTERM
        delete devProcesses[funnelName];
    }

    // Start local dev server
    const devProcess = spawn("vercel", ["dev", "--listen", port.toString()], {
        cwd: projectPath,
        stdio: "inherit",
        shell: true,
    });

    devProcesses[funnelName] = devProcess;
    console.log(devProcesses);
    console.log(devProcess.stdout)

    // Custom preview URL with project name
    const url = `http://localhost:${port}`;

    // Open in browser automatically
    setTimeout(() => {
        open(url);
    }, 5000);

    return NextResponse.json({
        success: true,
        url,
    });
}
