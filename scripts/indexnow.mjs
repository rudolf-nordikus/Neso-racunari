// Javlja Bingu/IndexNow da su se URL-ovi promijenili. Pokrenuti nakon deploya:
//   node scripts/indexnow.mjs            (svi URL-ovi iz sitemap.xml)
//   node scripts/indexnow.mjs /blog/x    (samo navedene putanje)
const HOST = "www.neso-racunari.com";
const KEY = "b84fe34def6a44afababb6f51abaa2cd"; // fajl public/<KEY>.txt
const base = `https://${HOST}`;

let urls = process.argv.slice(2).map((p) => base + p);
if (urls.length === 0) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${base}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URL-ova)`);
if (res.status >= 300) process.exit(1);
