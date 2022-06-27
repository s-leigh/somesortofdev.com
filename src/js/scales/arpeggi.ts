import {
    NOTE,
    STANDARD_STARTING_NOTES,
    STYLE
} from "./consts";

enum ARPEGGIO_MODE {
    MAJOR = "major",
    MINOR = "minor",
    DOMINANT_SEVENTH = "dominant seventh",
    DIMINISHED_SEVENTH = "diminished seventh"
}
const ARPEGGIO_TEMPO = 66
const ARPEGGIO_OCTAVES = 4

export class Arpeggio {
    hands: string
    interval: string
    inversion?: string
    key?: NOTE
    mode: ARPEGGIO_MODE
    octaves: number
    rootNote?: NOTE
    style: STYLE
    tempo: number
    type: string
    constructor(inversion: string, mode: ARPEGGIO_MODE, type: string, key?: NOTE, rootNote?: NOTE) {
        this.hands = "Hands together"
        this.interval = "Octaves"
        this.inversion = inversion
        this.key = key
        this.mode = mode
        this.octaves = ARPEGGIO_OCTAVES
        this.rootNote = rootNote
        this.style = STYLE.LEGATO
        this.tempo = ARPEGGIO_TEMPO
        this.type = type
    }
}

const arpeggi = STANDARD_STARTING_NOTES.map((rootNote: NOTE) =>
    [ARPEGGIO_MODE.MAJOR, ARPEGGIO_MODE.MINOR].map((mode: ARPEGGIO_MODE) =>
        new Arpeggio("Second inversion", mode, "Arpeggio", rootNote)
    )
)

const dominantSevenths = STANDARD_STARTING_NOTES.map((rootNote: NOTE) =>
    new Arpeggio("Root", ARPEGGIO_MODE.DOMINANT_SEVENTH, "Dominant seventh", rootNote)
)

const diminishedSevenths = [NOTE.C, NOTE.E_FLAT].map((rootNote: NOTE) =>
    new Arpeggio("Root", ARPEGGIO_MODE.DIMINISHED_SEVENTH, "Diminished seventh", undefined, rootNote)
)

export const allArpeggi = [arpeggi, dominantSevenths, diminishedSevenths]
