import { readdir } from "node:fs/promises";

const file = await Bun.file("build/app");
const buildDir = "build/"
try {
    let envfileBuild = await Bun.file(`${buildDir}/.env`);
    if (await file.exists()) {
        const env = await Bun.file(".env.production");
        let strin = await env.text();
        strin += "\nENV=production\n";
        envfileBuild.write(strin)
    } else {
        await envfileBuild.write("ENV=production\n");
    }
} catch (error) {
    console.log(error);

}