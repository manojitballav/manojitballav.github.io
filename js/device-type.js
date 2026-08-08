/**
 * Shared Google-certified-device type classifier.
 *
 * Loaded two ways, and it must stay usable from both:
 *   - the browser, via <script src="js/device-type.js"> on google-certified-devices.html
 *   - Node, by tools/build-device-data.js during the daily update workflow
 *
 * Keeping one copy is the point: the workflow previously carried a hand-maintained
 * Python mirror of these rules that drifted from the browser's copy.
 */
(function (root, factory) {
    var api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.DeviceType = api;
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

        // === DEVICE CODENAME OVERRIDES (highest priority) ===
        const DEVICE_OVERRIDES = {
            'himalaya': 'projector', // Lumio Arc 5/7
            'khardi': 'tv',          // Lumio Vision
            'Elise_T65V': 'tablet',  // Quantum Elise pen tablet
        };

        // === BRAND-LEVEL OVERRIDES (all devices from brand = this type) ===
        const BRAND_OVERRIDES = {
            // TVs
            'Arcelik': 'tv', 'Altus': 'tv', 'Beko': 'tv', 'Grundig': 'tv',
            'Changhong': 'tv', 'CHiQ': 'tv', 'Sceptre': 'tv', 'Element': 'tv',
            'Westinghouse': 'tv', 'Cello': 'tv', 'Linsar': 'tv', 'Engel': 'tv',
            'Cecotec': 'tv', 'TD SYSTEMS': 'tv', 'INFINITON': 'tv', 'Aconatic': 'tv',
            'Devant': 'tv', 'Star-X': 'tv', 'Dyon': 'tv', 'KUNFT': 'tv',
            'EDENWOOD': 'tv', 'Syinix': 'tv', 'BPL': 'tv', 'LLOYD': 'tv',
            'Prism': 'tv', 'iSTAR': 'tv', 'TORNADO': 'tv', 'ORION': 'tv',
            'SABA': 'tv', 'Continental Edison': 'tv', 'Bang & Olufsen': 'tv',
            'Seiki': 'tv', 'METZ': 'tv', 'Evvoli': 'tv', 'Dual': 'tv',
            'Magnavox': 'tv', 'Bauhn': 'tv', 'SCHNEIDER': 'tv', 'MAG': 'tv',
            '4iG TV': 'tv', 'KTCtv': 'tv',
            // Streaming
            'Mecool': 'streaming', 'Homatics': 'streaming', 'Formuler': 'streaming',
            'Dynalink': 'streaming', 'WeTek': 'streaming', 'MINIX': 'streaming',
            'RockTek': 'streaming', 'AirTV': 'streaming', 'HiMedia': 'streaming',
            'Amino': 'streaming', 'Arris': 'streaming', 'Technicolor': 'streaming',
            'Austrostream': 'streaming', 'COSMOTE TV': 'streaming', 'DishTV-NZ': 'streaming',
            'Magenta TV': 'streaming', 'TVCore': 'streaming', 'eroc': 'streaming',
            'Sagemcom': 'streaming', 'COOCAA': 'streaming',
            // Projectors
            'XGIMI': 'projector', 'Dangbei': 'projector', 'JMGO': 'projector',
            'Nebula': 'projector', 'Formovie': 'projector', 'Epson': 'projector',
            'Wemax': 'projector', 'HAPPRUN': 'projector', 'ETOE': 'projector',
            'WIMIUS': 'projector', 'GOODEE': 'projector', 'ELEPHAS': 'projector',
            'LUMIO': 'projector',
            // Tablets
            'Wacom': 'tablet',
            // Wearables
            'Mobvoi': 'watch', 'Fossil': 'watch', 'TAG Heuer': 'watch',
            'Montblanc': 'watch', 'Hublot': 'watch', 'Suunto': 'watch',
            // Automotive
            'Polestar': 'auto', 'Volvo': 'auto', 'Rivian': 'auto',
            'Honda': 'auto', 'Renault': 'auto', 'Nissan': 'auto',
            'Porsche': 'auto', 'General Motors': 'auto', 'Mazda': 'auto',
            'Subaru': 'auto', 'ALPINE': 'auto',
        };

        // === BRAND-SPECIFIC MODEL RULES (for mixed brands) ===
        // Each entry: [regex matching against "marketing model", type]
        // Checked in order; first match wins. Falls through to generic if none match.
        const BRAND_RULES = {
            'Samsung': [
                [/Galaxy Tab|Galaxy Note (Pro )?(10\.1|12\.2)|SM-[TXP]\d|GT-P\d|GT-N5\d/i, 'tablet'],
                [/Galaxy Watch|Gear (Live|S\d?[ $]|Sport|Fit)|SM-R\d{3}|SM-L\d{3}/i, 'watch'],
                [/Chromebook|Galaxy (Camera|NX)|EK-[A-Z]{2}\d|ProXpress|Printer/i, 'other'],
            ],
            'LGE': [
                [/\bAndroid TV\b|\bGoogle TV\b|^LG (Google|Android) TV/i, 'tv'],
                [/\bWatch\b|G Watch|LG Watch/i, 'watch'],
                [/G\s*Pad|Optimus Pad|Ultra Tab|GPAD|LG-V[0-9]{3}|LM-T[0-9]|\b10A\d/i, 'tablet'],
            ],
            'Huawei': [
                [/\bWatch\b|LEO-/i, 'watch'],
                [/Honor Box|HiTV|dTV/i, 'streaming'],
                [/MediaPad|MatePad|dtab|(AGS2?|BAH2?|BTV|CMR|CPN|FDR|HDN|JDN2?|KOB|SHT|BGO)-|S[0-9]+-[0-9]|T1-[0-9]/i, 'tablet'],
            ],
            'Xiaomi': [
                [/Watch|手表|Xiaomi Watch|Mi Watch/i, 'watch'],
                [/Projector|MiProj|C0\d{2}RGN/i, 'projector'],
                [/Mi\s*Box|MiBOX|MIBOX|TV Box|TV Stick|TELEBEE|MiTV-A[EFY]/i, 'streaming'],
                [/MiTV|MITV|^Xiaomi TV /i, 'tv'],
                [/MI\s*PAD|MIPAD|Xiaomi Pad/i, 'tablet'],
            ],
            'Redmi': [
                [/MiTV|Smart TV/i, 'tv'],
                [/\bPad\b/i, 'tablet'],
            ],
            'Sony': [
                [/BRAVIA/i, 'tv'],
                [/SmartWatch/i, 'watch'],
                [/NSZ/i, 'streaming'],
                [/Xperia Tablet|Tablet [PS]|SGP[0-9]|SGPT|SO-05[FG]|SOT[0-9]/i, 'tablet'],
                [/NW-|NWZ-|WALKMAN/i, 'other'],
            ],
            'Lenovo': [
                [/ideatv|LenovoTV/i, 'tv'],
                [/projector|pj_stack/i, 'projector'],
                [/\bTab\b|\bTAB\b|IdeaTab|LIFETAB|ThinkPad Tablet|IdeaPad\s*A10|YOGA\s*(Tab|Pad|Tablet)|YogaTab|Legion Tab|XiaoXin Pad|xiaoxin\s*pad|EveryPad|SmartTab|moto tab|dtab|\bTB[0-9-]|\bYT[0-9-]/i, 'tablet'],
                [/Chromebook|_cheets/i, 'other'],
            ],
            'Hisense': [
                [/Laser\s*TV|SmartLaser|laser/i, 'projector'],
                [/PX3100/i, 'streaming'],
                [/Goboard|HIDB/i, 'other'],
                [/LED\d{2}|VIDAA|Vidaa|\bTV\b|Smart\s*TV|HiSmart|SmartTV|ULED|HAT4KDTV|HITV\d|songshan|hengshan|wuyishan|huangshan|lushan|laoshan|fushan|emeishan|Toshiba_TV|[248]K/i, 'tv'],
            ],
            'Sharp': [
                [/AQUOS PAD|SHT2\d|Media Tablet|EB-L76G/i, 'tablet'],
                [/AQUOS.*(TV|4K|2K|8K)|LC-\d{2}|LCD[-_]\d|[248]T-[CB]|XLED-|Sharp.*TV|SMART TV|TV[XUWTHEJLNP]\d|2KTV|4KTV|FHD TV|UHD TV/i, 'tv'],
            ],
            'Panasonic': [
                [/A-DA|baltica|MY2[0-9]/i, 'auto'],
                [/Altus|Active Surface|\bElite\b|Eco[0-9]|Eco4K|EcoFW|NEXT|Theater/i, 'other'],
                [/FZ-[AB]|Toughpad|JT-[BHC]|P-08D|TAB-A0|Tab 8\b/i, 'tablet'],
                [/[248]KTV|Android TV|Panasonic.*TV|PANASONIC TV|SmartTVBox|R[34]_GTV|GX[0-9]{3}|GS655|JX[0-9]{3}|AS650|AX600|DX[0-9]{2}|TH-\d{2}|globe/i, 'tv'],
            ],
            'TCL': [
                [/Projector/i, 'projector'],
                [/TCL TAB|TAB 10s|TABMAX|3T10|NXTPAPER (10s|11|14)\b/i, 'tablet'],
                [/Smart\s*TV|BeyondTV|Beyond TV|HotelTV|WelcomeTV|UnionTV|Percee TV|[CG]\d{2}_[24]K|R[34]_GTV|R[34]G\b/i, 'tv'],
            ],
            'Asus': [
                [/ZenWatch/i, 'watch'],
                [/Nexus Player|fugu|Cube|asus_google_cube/i, 'streaming'],
                [/ZenPad|MeMO\s*Pad|Fonepad|Transformer (Pad|AiO|Book)|Eee\s*Pad|EeePad|ASUSPRO Tablet|Commercial tablet|Nexus 7|RTC-|TF\d{3}|SL101|P180[12]/i, 'tablet'],
                [/Chromebook|_cheets/i, 'other'],
            ],
            'Acer': [
                [/Android TV|ATV R\d|chester|waiawa/i, 'tv'],
                [/Iconia|ACTAB|ATAB|A[13]-[A0-9]|B[13]-[0-9]{3}|Acer One [0-9]+|ACER TAB|Chromebook Tab/i, 'tablet'],
                [/Chromebook|_cheets/i, 'other'],
            ],
            'Google': [
                [/Chromecast|Google TV Streamer/i, 'streaming'],
                [/Pixel\s*Watch/i, 'watch'],
                [/Pixel Tablet|Pixel C\b|Tango Tablet|Pixel Slate|MT81\d+.*(Tablet|Detachable)|Detachable/i, 'tablet'],
                [/Chromebook|Chromebox|Chromebase|Pixelbook|_cheets/i, 'other'],
            ],
            'Nokia': [
                [/Smart TV|Android TV|Nokia TV|4K Smart TV/i, 'tv'],
                [/Streaming (Box|Stick)/i, 'streaming'],
                [/Nokia T\d{2}\b/i, 'tablet'],
            ],
            'Oppo': [
                [/OPPO Watch|OnePlus Watch/i, 'watch'],
                [/OPPO Pad|^Pad [0-9A-Z]|^Pad Air|^Pad SE|OPD\d/i, 'tablet'],
            ],
            'OnePlus': [
                [/OnePlus Watch|Oneplus Watch/i, 'watch'],
                [/OnePlus Pad|Oneplus Pad|^Pad (Go|[0-9]|Lite)/i, 'tablet'],
            ],
            'Honor': [
                [/HONOR (Pad|MagicPad)|MagicPad/i, 'tablet'],
            ],
            'realme': [
                [/realme Pad|realme pad/i, 'tablet'],
                [/Google TV Stick|TV Stick/i, 'streaming'],
                [/Smart TV|realme TV|[24]K.*Smart TV|[24]K G Smart TV/i, 'tv'],
            ],
            'Vivo': [
                [/vivo Pad|iQOO Pad/i, 'tablet'],
            ],
            'HTC': [
                [/Flyer|Nexus 9/i, 'tablet'],
            ],
        };

        function detectType(marketing, model, device, brand) {
            // 1. Device codename overrides
            if (DEVICE_OVERRIDES[device]) return DEVICE_OVERRIDES[device];
            // 2. Brand-level overrides (single-type brands)
            if (BRAND_OVERRIDES[brand]) return BRAND_OVERRIDES[brand];
            // 3. Brand-specific model rules
            const rules = BRAND_RULES[brand];
            if (rules) {
                const combined = marketing + ' ' + model;
                for (const [re, type] of rules) {
                    if (re.test(combined)) return type;
                }
                return 'phone'; // known brand, no rule matched = phone
            }
            // 4. Generic keyword detection (for all other brands)
            const text = (marketing + ' ' + model).toLowerCase();
            if (/\b(projector|portable.?cinema|pico.?projector|laser.?projector|dlp|lcos)\b/.test(text)) return 'projector';
            if (/\b(streaming.?box|streaming.?stick|streaming.?device|fire.?stick|chromecast|dongle|iptv|ott.?box|media.?box|media.?player|media.?stick|roku|set.?top|stb|cable.?box|satellite.?box|dth.?box|dvb)\b/.test(text)) return 'streaming';
            if (/\b(tv|television|android tv|google tv|smart tv|soundbar|sound bar)\b/.test(text)) return 'tv';
            if (/\b(tab|tablet|pad(?!lock)|slate|book.?pad|note.?pad|kids.?pad|edu.?pad|draw.?pad)\b/.test(text) && !/\bgamepad\b/.test(text)) return 'tablet';
            if (/\b(watch|band|wearable|wear\s?os|fit(?:ness)?(?:\s?band|\s?tracker)|smartwatch|smart.?ring)\b/.test(text)) return 'watch';
            if (/\b(auto|car|vehicle|ivi|infotainment|automotive|head.?unit|dash)\b/.test(text)) return 'auto';
            if (/\b(pos|kiosk|signage|scanner|terminal|printer|rugged|industrial|handheld.?computer|barcode|panel.?pc)\b/.test(text)) return 'other';
            return 'phone';
        }

    return { DEVICE_OVERRIDES: DEVICE_OVERRIDES, BRAND_OVERRIDES: BRAND_OVERRIDES, BRAND_RULES: BRAND_RULES, detectType: detectType };
}));
