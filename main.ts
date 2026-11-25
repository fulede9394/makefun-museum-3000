// Museum of the year 3000 — a label for a parking meter, written for
// visitors who have never seen one used. The joke is that the meter caused
// more running than any gym of its era.
// The code below only carries the label text to the output directory.
import { promises as fsp } from "node:fs";
import { join } from "node:path";

const LABEL_LINES = [
  "Parking meter (c. 2025): humans fed this metal box coins to rent a patch of ground for their cars,",
  "then sprinted back before it expired. It caused more cardio than any gym.",
];

const RULES = {
  file: "entry.txt",
  longest: 200,
  shortest: 1,
};

function resolvePaths(): { dir: string; target: string } {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!dir || dir.trim() === "") {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  return { dir, target: join(dir, RULES.file) };
}

function makeLabel(): string {
  const label = LABEL_LINES.join(" ");
  if (label.length < RULES.shortest || label.length > RULES.longest) {
    throw new Error(`label is ${label.length} chars, must be ${RULES.shortest}-${RULES.longest}`);
  }
  if (!label.includes("(c. 2025)")) throw new Error("label must keep its date");
  return label;
}

async function writeEntry(): Promise<void> {
  const { dir, target } = resolvePaths();
  const label = makeLabel();
  await fsp.mkdir(dir, { recursive: true });
  await fsp.writeFile(target, label, "utf8");
}

await writeEntry();
