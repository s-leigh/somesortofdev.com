// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {
    ALL_NOTES,
    ARPEGGIO_OCTAVES,
    ARPEGGIO_TEMPO,
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
import {allScales} from "./scales";

const OUTPUT_HTML_ELEMENT_ID = "scalesOutput"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"


enum ARPEGGIO_MODE {
    MAJOR= "major",
    MINOR = "minor",
    DIMINISHED_SEVENTH = "diminished seventh"
}



class FingerExercise {
    interval: string
    hands: string
    octaves: number
    style: STYLE
    tempo: number
    type: string
    constructor(interval: string, hands: string, octaves: number, style: STYLE, tempo: number, type: string) {
        this.interval = interval
        this.hands = hands
        this.octaves = octaves
        this.style = style
        this.tempo = tempo
        this.type = type
    }
}

class Arpeggio extends FingerExercise {
    inversion: string
    mode: ARPEGGIO_MODE
    startingNote?: NOTE
    constructor(inversion: string, mode: ARPEGGIO_MODE, type: string, startingNote?: NOTE) {
        super('Octave apart', 'Hands together', ARPEGGIO_OCTAVES, STYLE.LEGATO, ARPEGGIO_TEMPO, type)
        this.mode = mode
        this.inversion = inversion
        this.startingNote = startingNote
    }
}

class DominantSeventh extends Arpeggio {
    key: string
    mode: ARPEGGIO_MODE
    constructor(key: string) {
        super('Root', ARPEGGIO_MODE.MAJOR, 'Dominant seventh', undefined)
        this.key = key
        this.mode = ARPEGGIO_MODE.MAJOR
    }
}

const inversions = ['Root', 'First inversion', 'Second inversion'] // TODO enum
const arpeggi = STANDARD_STARTING_NOTES.map(startingNote =>
    (Object.keys(ARPEGGIO_MODE) as Array<keyof typeof ARPEGGIO_MODE>).map(mode =>
        inversions.map(inversion =>
            new Arpeggio(inversion, ARPEGGIO_MODE[mode], 'Arpeggio', startingNote)
        )
    )
)

const dominantSevenths = STANDARD_STARTING_NOTES.map(key => new DominantSeventh(key))

const diminishedSevenths = ALL_NOTES.map(note => new Arpeggio('Root', ARPEGGIO_MODE.DIMINISHED_SEVENTH, 'Diminished seventh', note))

const allArpeggi = [dominantSevenths, diminishedSevenths, arpeggi]

const randomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

// Deliberately configured so you're more likely to get an exercise with a shallow tree (e.g. whole-tone) than one of the many normal scales
const randomFingerExercise = (exerciseTree: any[]): any => {
    if (!Array.isArray(exerciseTree)) return exerciseTree
    return randomFingerExercise(randomElement(exerciseTree))
}

const showRandomExercise = (exercise: any) => {
    console.log(JSON.stringify(exercise, null, 4))
    const mainInfo = [
        `Type: ${exercise.type}`,
        `${exercise.startingNote || exercise.key} ${exercise.mode}`,
        `Interval: ${exercise.interval}`,
        `Style: ${exercise.style.toLowerCase()}`
    ]
    let arpeggioInfo = []
    if (exercise.inversion !== undefined) arpeggioInfo.push(
        `Inversion: ${exercise.inversion}`,
    )
    if (exercise.key !== undefined) arpeggioInfo.push(
        `Key: ${exercise.key}`
    )
    const extraInfo = [
        `${exercise.hands}`,
        `Octaves: ${exercise.octaves}`,
        `Tempo: ${exercise.tempo}`
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

const showRandomScale = () => showRandomExercise(randomFingerExercise(allScales))
const showRandomArpeggio = () => showRandomExercise(randomFingerExercise(allArpeggi))
// exported so they aren't automatically deleted by the transpiler
module.exports = {showRandomScale, showRandomArpeggio}
