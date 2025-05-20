// Get base color per class selection -> generate color schemes and provide them
// Color API: https://www.thecolorapi.com/
// colorset from https://www.dndbeyond.com/forums/dungeons-dragons-discussion/arts-crafts/34956-class-colors
const classColorSet = {
     barbarian: '#e7623e',
    bard: '#ab6dac',
    cleric: '#91a1b2',
    druid: '#7a853b',
    fighter: '#7f513e',
    monk: '#51a5c5',
    paladin: '#b59e54',
    ranger: '#507f62',
    rogue: '#555752',
    sorcerer: '#992e2e',
    warlock: '#7b469b',
    wizard: '#2a50a1',
    default: '#C73032',
};

export async function generateClassColorScheme(className){
    const baseColor = classColorSet[className.toLowerCase()] || classColorSet.default;
    const url = `https://www.thecolorapi.com/scheme?hex=${baseColor.replace('#','')}&mode=analogic&count=4`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        const scheme = data.colors.map(c => c.hex.value);
        return scheme;
    } catch(err) {
        console.log(`error: ${err}`);
        return[baseColor];
    }
}