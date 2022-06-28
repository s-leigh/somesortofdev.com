// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {allScales, Scale} from "./scales";
import {allArpeggi, Arpeggio, ARPEGGIO_MODE} from "./arpeggi";

const OUTPUT_HTML_ELEMENT_ID = "scalesOutput"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"

type FingerExercise = Scale | Arpeggio

const randomFingerExercise = <FE extends FingerExercise>(exercises: FE[]): FE =>
    exercises[Math.floor(Math.random() * exercises.length)]

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
        `${arpeggio.mode === ARPEGGIO_MODE.DOMINANT_SEVENTH ? "In the key of " + arpeggio.key : (arpeggio.key || arpeggio.rootNote) + " " + arpeggio.mode}`,
        `Inversion: ${arpeggio.inversion}`
    ]
    const extraInfo = [
        `${arpeggio.hands}`,
        `Interval: ${arpeggio.interval}`,
        `Octaves: ${arpeggio.octaves}`,
        `Tempo: ${arpeggio.tempo}`,
        `Style: ${arpeggio.style}`
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)

    const formattedElement = mainInfo.concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

// exported so they aren't automatically deleted by the transpiler
module.exports = {showRandomScale, showRandomArpeggio}
