import * as browser from "webextension-polyfill";

export async function openTab(url: string) {
  console.log("openTab", { url });
  const existingTabs = await browser.tabs.query({ url });

  if (existingTabs.length > 0) {
    // if app tab exists, focus it
    browser.tabs.update(existingTabs[0].id, { active: true });
    return existingTabs[0];
  } else {
    // if app tab does not exist, create it, and focus it, position it to the very left
    return await browser.tabs.create({
      url,
      active: true,
    });
  }
}