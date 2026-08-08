#!/usr/bin/env node
/**
 * Builds the two payloads google-certified-devices.html loads at runtime, from
 * data/supported_devices.csv:
 *
 *   data/devices-index.json  Per-brand aggregates and type counts. Small enough to
 *                            block first paint on (~50KB gz vs ~470KB for the CSV).
 *   data/devices.txt         Every device, grouped by brand, with the type already
 *                            classified. Fetched in the background; only the search
 *                            box and the brand detail tables need it.
 *
 * Types come from js/device-type.js so the browser and this script can never disagree.
 *
 * Usage: node tools/build-device-data.js [--new-types <path>]
 *
 *   --new-types <path>  Also classify the devices listed in data/devices_meta.json and
 *                       write them to <path> as JSON. The Atom feed step consumes this
 *                       instead of maintaining its own copy of the classification rules.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { detectType } = require('../js/device-type.js');

const ROOT = path.join(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'data', 'supported_devices.csv');
const INDEX_PATH = path.join(ROOT, 'data', 'devices-index.json');
const DEVICES_PATH = path.join(ROOT, 'data', 'devices.txt');
const META_PATH = path.join(ROOT, 'data', 'devices_meta.json');

// Must match CATEGORIES (minus 'all') in google-certified-devices.html — the page
// indexes into this order when reading both payloads.
const TYPES = ['phone', 'tablet', 'tv', 'streaming', 'projector', 'watch', 'auto', 'other'];

/**
 * Mirrors the page's own CSV parser: 4 fixed columns, RFC4180 quoting, header skipped.
 */
function parseCSV(text) {
    const rows = [];
    let i = 0;
    const len = text.length;
    while (i < len && text[i] !== '\n') i++;
    i++;
    while (i < len) {
        const row = [];
        for (let col = 0; col < 4; col++) {
            let val = '';
            if (i < len && text[i] === '"') {
                i++;
                while (i < len) {
                    if (text[i] === '"') {
                        if (i + 1 < len && text[i + 1] === '"') { val += '"'; i += 2; }
                        else { i++; break; }
                    } else { val += text[i]; i++; }
                }
            } else {
                while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') { val += text[i]; i++; }
            }
            row.push(val.trim());
            if (i < len && text[i] === ',') i++;
        }
        if (row.some(v => v)) rows.push(row);
        while (i < len && (text[i] === '\r' || text[i] === '\n')) i++;
    }
    return rows;
}

function getLetter(name) {
    const upper = ((name || '')[0] || '').toUpperCase();
    return /[A-Z]/.test(upper) ? upper : '#';
}

function main() {
    const rows = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));
    if (rows.length === 0) {
        console.error('build-device-data: parsed 0 rows from the CSV — refusing to write empty payloads');
        process.exit(1);
    }

    let meta = null;
    try {
        meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
    } catch (err) {
        // Meta is written by an earlier workflow step; absent locally is fine.
    }
    const lastUpdated = (meta && meta.lastUpdated) || null;

    // --- optional: classify the current "new devices" batch for the Atom feed ---
    const newTypesFlag = process.argv.indexOf('--new-types');
    if (newTypesFlag !== -1) {
        const dest = process.argv[newTypesFlag + 1];
        if (!dest) {
            console.error('build-device-data: --new-types requires a path');
            process.exit(1);
        }
        const classified = ((meta && meta.newDevices) || []).map(d => ({
            brand: d[0], marketing: d[1], device: d[2], model: d[3],
            type: detectType(d[1], d[3], d[2], d[0])
        }));
        fs.writeFileSync(dest, JSON.stringify(classified));
        console.log(`build-device-data: wrote ${classified.length} classified new devices to ${dest}`);
    }

    // Group by brand. Brand order is sorted rather than inherited from the CSV so the
    // output is stable run to run — these files are committed daily, and a reshuffle
    // upstream would otherwise rewrite the whole file instead of a few lines.
    const grouped = new Map();
    for (const [brand, marketing, device, model] of rows) {
        const type = detectType(marketing, model, device, brand);
        if (!grouped.has(brand)) grouped.set(brand, []);
        grouped.get(brand).push([marketing, device, model, TYPES.indexOf(type)]);
    }
    const byBrand = new Map([...grouped.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)));

    // --- devices.txt -------------------------------------------------------
    // One line per brand, then one tab-prefixed line per device. Fields that repeat
    // a neighbour collapse to a sentinel, which strips ~40% of the raw bytes:
    //   device '='  -> same as marketing
    //   model  '='  -> same as device
    //   model  '~'  -> same as marketing
    // Tabs and newlines never appear inside the source fields (they are trimmed CSV
    // cells), so no escaping is needed.
    const out = [];
    for (const [brand, items] of byBrand) {
        out.push(brand);
        for (const [marketing, device, model, typeIdx] of items) {
            const d = device === marketing ? '=' : device;
            const m = model === device ? '=' : (model === marketing ? '~' : model);
            out.push('\t' + marketing + '\t' + d + '\t' + m + '\t' + typeIdx);
        }
    }
    fs.writeFileSync(DEVICES_PATH, out.join('\n') + '\n');

    // --- devices-index.json ------------------------------------------------
    // [name, letter, total, [count per TYPES index]] — positional to stay compact.
    const brands = [];
    const totals = new Array(TYPES.length).fill(0);
    for (const [brand, items] of byBrand) {
        if (!brand) continue;
        const counts = new Array(TYPES.length).fill(0);
        for (const item of items) {
            counts[item[3]]++;
            totals[item[3]]++;
        }
        brands.push([brand, getLetter(brand), items.length, counts]);
    }
    brands.sort((a, b) => a[0].localeCompare(b[0]));

    fs.writeFileSync(INDEX_PATH, JSON.stringify({
        lastUpdated,
        types: TYPES,
        total: rows.length,
        typeTotals: totals,
        brands
    }));

    const kb = p => (fs.statSync(p).size / 1024).toFixed(0) + 'KB';
    console.log(`build-device-data: ${rows.length} devices, ${brands.length} brands`);
    console.log(`  ${path.relative(ROOT, INDEX_PATH)}  ${kb(INDEX_PATH)}`);
    console.log(`  ${path.relative(ROOT, DEVICES_PATH)}  ${kb(DEVICES_PATH)}`);
}

main();
