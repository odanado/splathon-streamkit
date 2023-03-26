// @ts-check
import { chromium, devices } from "playwright";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  writeBatch,
  doc,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvj2YRPK5ZYBB2bv8lLy_ZC9xko3ojglM",
  authDomain: "splathon-streamkit.firebaseapp.com",
  projectId: "splathon-streamkit",
  storageBucket: "splathon-streamkit.appspot.com",
  messagingSenderId: "1099025681432",
  appId: "1:1099025681432:web:76825cc25e3ecf6b1b476d",
};

const fetchScheduledMatches = async (round) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(devices["Desktop Chrome"]);
  const page = await context.newPage();

  const url = "https://splathon-ladder.web.app/challenges/";

  await page.goto(url);
  await page.waitForURL(url);

  await page.waitForFunction(() => {
    const vDataTable = document.querySelector(".v-data-table__wrapper");

    if (!vDataTable) {
      return false;
    }
    if (!vDataTable.textContent) {
      return false;
    }
    return !vDataTable.textContent.includes("Loading items");
  });

  console.log("waited");

  await page.locator(`text="Round ${round}"`).click();
  console.log("clicked");

  const rows = await page.$$(
    ".v-window-item--active .v-data-table__wrapper > table > tbody > tr"
  );

  const scheduledMatches = [];

  for (const row of rows) {
    const idNode = await row.$("td:nth-child(1)");
    const id = await idNode?.textContent();

    const alphaNode = await row.$("td:nth-child(5)");
    const alpha = await alphaNode?.textContent();

    const bravoNode = await row.$("td:nth-child(8)");
    const bravo = await bravoNode?.textContent();

    if (!id || !alpha || !bravo) {
      throw new Error(`invalid match: ${id}, ${alpha}, ${bravo}`);
    }

    scheduledMatches.push({ id, alpha, bravo });
  }

  await browser.close();

  return scheduledMatches;
};

const writeBatchScheduledMatches = async (scheduledMatches) => {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  // connectFirestoreEmulator(firestore, "localhost", 8080);

  console.log("Writing to Firestore...");
  const batch = writeBatch(firestore);

  for (const match of scheduledMatches) {
    const ref = doc(firestore, "ladder_matches", match.id);

    batch.set(ref, { ...match });
  }
  await batch.commit();

  console.log("Done.");
};

if (process.argv.length < 3) {
  throw new Error("Please specify round number");
}

const round = Number(process.argv[2]);

console.log({ round });

const scheduledMatches = await fetchScheduledMatches(round);

console.log({ scheduledMatches });

await writeBatchScheduledMatches(scheduledMatches);
