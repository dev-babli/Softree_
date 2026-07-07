import fs from 'node:fs';

const assetsSrc = fs.readFileSync('src/components/softree-marketing-ui/assets.ts', 'utf8');

// Parse the industryTabs section: find "industryTabs: {" ... matching close.
const secStart = assetsSrc.indexOf('industryTabs: {');
const after = assetsSrc.slice(secStart);
// Build a map decodedFilename -> key by scanning key + url pairs.
const entryRe = /"([^"]+)":\s*\{\s*kind:\s*"cdn-passthrough",\s*url:\s*"([^"]+)",/g;
const map = new Map();
let m;
// We only want entries up to the next top-level section. Find the next "<word>: {" at the section indentation.
// Simpler: scan all entries in the file, store by decoded filename -> key (industryTabs keys are unique enough).
entryRe.lastIndex = 0;
while ((m = entryRe.exec(assetsSrc)) !== null) {
    const key = m[1];
    const url = m[2];
    const file = decodeURIComponent(url.split('/').pop());
    if (!map.has(file)) map.set(file, key);
}

const wanted = {
    banking: ['68c1d16b280cf184acd5e590_AAA.svg', '68c1d16b6cd956c92977098e_Aegon.svg', '68c1d16aac459c673700a2bb_Assurant.svg', '68c1d16a9b88dbc782a95258_morgan stanly.svg', '68c1d16a3fc4d5387dd1d0dd_sabadell.svg', '68c1d1694dc8d42c1a4d8870_London stock exchange.svg', '68c1d16962ea60d4dff464a3_Mashreq.svg', '68c1d169dede6644ae4bbf55_Metlife.svg', '68c1d169088703c8b81957b2_Huntington.svg', '68c1d169e8b76dfa0cd44e5a_deutsche bank.svg'],
    healthcare: ['68c1d187f468feef05f862be_Johnson&Johnson.svg', '68c1d18798a6097b80c5b40d_Florida Blue.svg', '68c1d187b73a21e6d9a15ed5_Roche.svg', '68c1d1867de07694ae69d4d2_Pfizer.svg', '68c1d186bf94b0a51baa22e9_Palomar Health.svg', '68c1d186289223b236d382d2_Bon Secours Mercy Health.svg', '68c1d186ec53db2ef3ad8a25_Otsuka.svg', '68c1d186b30b24a8a960deae_CareFirst.svg', '68c1d1863eb88cfb34a5e9e9_United Health.svg', '68c1d1865c5f0a8291a89459_Garnet Health.svg', '68c1d1869c9803fbacc6a8df_Lilly.svg', '68c1d1850dc563c574ddc3cc_Siemens.svg', '68c1d185cc2cec440e4dfb0e_Carestream.svg', '68c1d1858f45b56d7f7e204f_Simonmed.svg'],
    retail: ['68c1d1d565c54e2bc4461686_Colgate.svg', '68c1d1d539323cddc94bdcea_Alaska.svg', '68c1d1d53ac70422fa9bcc99_Nu Skin.svg', '68c1d1d50b9a5ce5d8240aba_Columbia.svg', '68c1d1d5e6083727c0b05de1_LG.svg', '68c1d1d54d990662d8d2bc96_CocaCola.svg', '68c1d1d536aa4072ccc75d6d_Enbridge.svg', '68c1d1d55175ebd3c68e46e5_Carrier.svg', '68c1d1d4249f4c82ff895a65_Bosch.svg'],
    telecom: ['68c1d1a882fcfcad876f0ba1_Charter.svg', '68c1d1a7552ceaa0ab3d0f3d_Autodesk.svg', '68c1d1a779541145c7a86f8c_Wade&Wendy.svg', '68c1d1a79cab0f637a1e5c60_Deutche Telekom.svg', '68c1d1a7088703c8b8196ed5_Frontier.svg', '68c1d1a725d610c7736dbc19_Netapp.svg', '68c1d1a79c9803fbacc6b5aa_Altafiber.svg', '68c1d1a724314d377a3debc5_Nable.svg', '68c1d1a7cc2cec440e4e0646_ebay.svg', '68c1d1a6d6754df1a384f29f_AT&T.svg', '68c1d1a60dc563c574ddcdb0_Thomson Reuters.svg'],
    business: ['68c1d1eeab7a117935edb93f_Tata.svg', '68c1d1eeac459c673700cd62_Equinix.svg', '68c1d1ee5024a2e507c6f9ba_Mphasis.svg', '68c1d1ee3f9b13078b1bc243_Airbus.svg', '68c1d1ee31659ce1320cbaf4_Nippon Steel.svg', '68c1d1eecc2cec440e4e1c67_Genpact.svg', '68c1d1ee9b88dbc782a98925_Shell.svg', '68c1d1ed0792339a0d62f81d_Konecta.svg', '68c1d1ed25d610c7736dcdd6_Capgemini.svg', '68c1d1eddfbd288aa4f7f223_Teleperformance.svg', '68c1d1ed5b1cd10dd8e808bb_NTT.svg', '68c1d1ec101ca52c56ccb35e_Gainwell.svg'],
};

for (const [ind, files] of Object.entries(wanted)) {
    console.log('=== ' + ind + ' ===');
    for (const f of files) {
        const key = map.get(f);
        console.log((key ? 'OK   ' : 'MISS ') + f + '  ->  ' + key);
    }
    console.log('');
}
