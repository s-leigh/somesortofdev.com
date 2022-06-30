// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {allScales, Scale} from "./scales";
import {allArpeggi, Arpeggio, ARPEGGIO_MODE} from "./arpeggi";
import {NOTE} from "./consts";

const OUTPUT_HTML_ELEMENT_ID = "scalesOutput"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"

type FingerExercise = Scale | Arpeggio

const randomFingerExercise = <FE extends FingerExercise>(exercises: FE[]): FE =>
    exercises[Math.floor(Math.random() * exercises.length)]

const formatScaleKey = (scale: Scale): String => {
    if (Array.isArray(scale.startingNote) && scale.startingNote.length === 2) { // shouldn't ever be >2
        return `${scale.startingNote[0]} and ${scale.startingNote[1]} ${scale.mode}`
    }
    return `${scale.startingNote} ${scale.mode}`
}
const formatArpeggioMode = (arpeggio: Arpeggio): String => {
    if (arpeggio.mode === ARPEGGIO_MODE.DOMINANT_SEVENTH) {
        return `In the key of ${arpeggio.key}`
    }
    return `${(arpeggio.key || arpeggio.rootNote)} ${arpeggio.mode}`
}

const showRandomScale = () => {
    const scale: Scale = randomFingerExercise(allScales)
    console.log(JSON.stringify(scale, null, 4))
    const mainInfo: String[] = [
        `Type: ${scale.type}`,
        formatScaleKey(scale),
        `Style: ${scale.style.toLowerCase()}`,
        `Interval: ${scale.interval}`
    ]
    const extraInfo = [
        `${scale.hands}`,
        `Octaves: ${scale.octaves}`,
        `Tempo: ${scale.tempo} (minim)`
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)
    const image = scale.imagePath ? `<img src=${scale.imagePath}/>` : ""
    const formattedElement = mainInfo.concat(extraInfo, image).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

const showRandomArpeggio = () => {
    const arpeggio: Arpeggio = randomFingerExercise(allArpeggi)
    console.log(JSON.stringify(arpeggio, null, 4))
    const mainInfo = [
        `Type: ${arpeggio.type}`,
        formatArpeggioMode(arpeggio),
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
