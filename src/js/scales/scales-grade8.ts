// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {
    ALL_NOTES,
    CHROMATIC_MINOR_THIRDS_OCTAVES,
    CHROMATIC_MINOR_THIRDS_TEMPO,
    CHROMATIC_THIRD_APART_OCTAVES,
    DIATONIC_OCTAVES,
    LEGATO_SCALES_OCTAVES,
    LEGATO_SCALES_THIRDS_TEMPO, NOTE,
    OCTAVES_SCALE_TEMPO,
    SIXTHS_APART_SCALE_TEMPO, STANDARD_STARTING_NOTES, STYLE,
    WHOLE_TONE_SCALE_OCTAVES
} from "./consts";
import {allScales, Scale} from "./scales";
import {allArpeggi, Arpeggio} from "./arpeggi";

const OUTPUT_HTML_ELEMENT_ID = "scalesOutput"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"

type FingerExercise = Scale | Arpeggio

const randomElement = (array: any[]): any => array[Math.floor(Math.random() * array.length)];

// Deliberately configured so you're more likely to get an exercise with a shallow tree (e.g. whole-tone) than one of the many normal scales
const randomFingerExercise = (exerciseTree: any[]): any => {
    if (!Array.isArray(exerciseTree)) return exerciseTree
    return randomFingerExercise(randomElement(exerciseTree))
}

const showRandomScale = () => {
    const scale: Scale = randomFingerExercise(allScales)
    console.log(JSON.stringify(scale, null, 4))
    const mainInfo = [
        `Type: ${scale.type}`,
        `${scale.startingNote} ${scale.mode}`,
        `Interval: ${scale.interval}`,
        `Style: ${scale.style.toLowerCase()}`
    ]
    const extraInfo = [
        `${scale.hands}`,
        `Octaves: ${scale.octaves}`,
        `Tempo: ${scale.tempo}`
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)

    const formattedElement = mainInfo.concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

const showRandomArpeggio = () => {
    const arpeggio: Arpeggio = randomFingerExercise(allArpeggi)
    console.log(JSON.stringify(arpeggio, null, 4))
    const mainInfo = [
        `Type: ${arpeggio.type}`,
        `${arpeggio.rootNote || arpeggio.key} ${arpeggio.mode.toLowerCase()}`,
        `Interval: ${arpeggio.interval}`,
        `Style: ${arpeggio.style.toLowerCase()}`
    ]
    let arpeggioInfo = []
    arpeggioInfo.push(
        `Inversion: ${arpeggio.inversion}`
    )
    const extraInfo = [
        `${arpeggio.hands}`,
        `Octaves: ${arpeggio.octaves}`,
        `Tempo: ${arpeggio.tempo}`
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

// exported so they aren't automatically deleted by the transpiler
module.exports = {showRandomScale, showRandomArpeggio}
