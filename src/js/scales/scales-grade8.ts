// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {allScales, Scale} from "./scales";
import {allArpeggi, Arpeggio, ARPEGGIO_MODE} from "./arpeggi";
import {NOTE} from "./consts";

const OUTPUT_HTML_ELEMENT_ID = "fingerExercise"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"

type FingerExercise = Scale | Arpeggio

const randomFingerExercise = <FE extends FingerExercise>(exercises: FE[]): FE =>
    exercises[Math.floor(Math.random() * exercises.length)]

const formatScaleKey = (scale: Scale): string => {
    if (Array.isArray(scale.startingNote) && scale.startingNote.length === 2) { // shouldn't ever be >2
        return `${scale.startingNote[0]} and ${scale.startingNote[1]} ${scale.mode}`
    }
    return `${scale.startingNote} ${scale.mode}`
}
const formatArpeggioMode = (arpeggio: Arpeggio): string => {
    if (arpeggio.mode === ARPEGGIO_MODE.DOMINANT_SEVENTH) {
        return `In the key of ${arpeggio.key}`
    }
    return `${(arpeggio.key || arpeggio.rootNote)} ${arpeggio.mode}`
}

const showRandomFingerExercise = <FE extends FingerExercise>(fingerExercises: FE[], formatKeyOrMode: (fe: FE) => string) => {
    const fingerExercise = randomFingerExercise(fingerExercises)
    console.log(JSON.stringify(fingerExercise, null, 4))
    const mainInfo: String[] = [
        `Type: ${fingerExercise.type}`,
        formatKeyOrMode(fingerExercise),
        `Style: ${fingerExercise.style.toLowerCase()}`,
        `Interval: ${fingerExercise.interval}`
    ]
    const extraInfo = `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${
        [
            `${fingerExercise.hands}`,
            `Octaves: ${fingerExercise.octaves}`,
            `Tempo: ${fingerExercise.tempo} (minim)`
        ].join('<br/>')
    }</span>`
    const image = fingerExercise.imagePath ? `<img src=${fingerExercise.imagePath}/>` : ""
    const formattedElement = `<div class="border"><div class="finger-exercise__inner">${mainInfo.concat(extraInfo, image).join('<br/>')}</div></div>`

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

const showRandomScale = () => {
    showRandomFingerExercise(allScales, formatScaleKey)
}

const showRandomArpeggio = () => {
    showRandomFingerExercise(allArpeggi, formatArpeggioMode)
}

// exported so they aren't automatically deleted by the transpiler
module.exports = {showRandomScale, showRandomArpeggio}
