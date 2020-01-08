const allScales = [];

const standardScaleStartingNotes = ['C', 'D', 'B', 'F♯', 'F', 'E♭', 'A♭/G♯', 'D♭/C♯'];
const modes = ['major', 'minor harmonic', 'minor melodic'];
const keys = standardScaleStartingNotes.map(note => modes.map(mode => `${note} ${mode}`)).flat();
const intervals = ['octave apart', 'third apart', 'sixth apart'];
const bothStyles = ['legato', 'staccato'];
keys.forEach(key => allScales.push({key, intervals: key.includes('melodic') ? ['octave apart'] : intervals, style: bothStyles}));

const legatoScalesInThirds = ['C major', 'B♭ major'].map(key => ({key, intervals: ['thirds (hands separately)'], style: ['legato, 2 octaves']}));
legatoScalesInThirds.forEach(s => allScales.push(s));

const chromaticScales = [
    {key: 'Chromatic', intervals: ['a minor third apart beginning on any notes'], style: bothStyles},
    {key: 'Chromatic', intervals: ['beginning on A♯ and C♯ a minor third apart'], style: ['legato, hands separately, 2 octaves']}
];
chromaticScales.forEach(s => allScales.push(s));

const wholeToneScale = {key: 'Whole tone', intervals: ['beginning on E'], style: ['legato, hands together']};
allScales.push(wholeToneScale);

const arpeggiModes = ['major', 'minor'];
const arpeggiKeys = standardScaleStartingNotes.map(note => arpeggiModes.map(mode => `${note} ${mode}`)).flat();
const arpeggi = arpeggiKeys.map(key => ({key, intervals: ['arpeggio, any inversion'], style: ['legato']}));
arpeggi.map(a => allScales.push(a));

const dominantSevenths = standardScaleStartingNotes.map(n => `${n} major (KEY)`).map(key => ({key, intervals: ['Dominant seventh'], style: ['legato']}));
dominantSevenths.map(a => allScales.push(a));

const diminishedSevenths = ['A', 'B♭', 'B'].map(n => ({key: `beginning on ${n}`, intervals: ['Diminished seventh'], style: ['legato']}));
diminishedSevenths.map(a => allScales.push(a));

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const randomScale = () => {
    const scaleObj = randomElement(allScales);
    const interval = randomElement(scaleObj.intervals);
    const style = randomElement(scaleObj.style);
    return `${scaleObj.key}, ${interval}${style === 'legato' ? '' : `, ${style}`}`
};

const showRandomScale = () => document.getElementById("scalesOutput").innerHTML = JSON.stringify(randomScale());
