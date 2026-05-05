import { ClientFunction } from 'testcafe';

const getFirstLink = ClientFunction(() => {
  const p = document.querySelector('#mw-content-text p a:not(i a):not(em a)');
  return p?.href || null;
});
const getPageTitle = ClientFunction(() => document.title);
const getPageUrl = ClientFunction(() => window.location.href);

fixture`Wikipedia Philosophy`.page`https://en.wikipedia.org/wiki/Special:Random`;

test('Go to Philosophy', async t => {
  const visited = new Set();

  while (true) {
    const title = await getPageTitle();
    const url = await getPageUrl();
    if (title.includes('Philosophy') || visited.has(url)) break;
    visited.add(url);
    const link = await getFirstLink();
    if (!link) break;
    await t.navigateTo(link);
  }
});
