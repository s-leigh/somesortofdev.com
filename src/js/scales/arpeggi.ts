import {ALL_NOTES, FingerExercise, NOTE, STANDARD_SCALE_STARTING_NOTES, STYLE} from "./scales-grade8";

const ARPEGGIO_OCTAVES = 4
const ARPEGGIO_TEMPO = 66

enum ARPEGGIO_MODE {
    MAJOR,
    MINOR,
    DIMINISHED_SEVENTH
}

class Arpeggio extends FingerExercise {
    inversion: string
    startingNote: NOTE
    constructor(inversion: string, mode: ARPEGGIO_MODE, startingNote: NOTE, type: string) {
        super('Octave apart', 'Hands together', ARPEGGIO_OCTAVES, STYLE.LEGATO, ARPEGGIO_TEMPO, type)
        this.inversion = inversion
        this.startingNote = startingNote
    }
}

class DominantSeventh extends Arpeggio {
    key: string
    constructor(key: string) {
        super('Root', ARPEGGIO_MODE.MAJOR, null, 'Dominant seventh')
        this.key = key
    }
}

const inversions = ['Root', 'First inversion', 'Second inversion']
const arpeggi = STANDARD_SCALE_STARTING_NOTES.map(startingNote =>
    (Object.keys(ARPEGGIO_MODE) as Array<keyof typeof ARPEGGIO_MODE>).map(mode =>
        inversions.map(inversion =>
            new Arpeggio(inversion, ARPEGGIO_MODE[mode], startingNote, 'Arpeggio')
        )
    )
)

const dominantSevenths = STANDARD_SCALE_STARTING_NOTES.map(key => new DominantSeventh(key))

const diminishedSevenths = ALL_NOTES.map(note => new Arpeggio('Root', ARPEGGIO_MODE.DIMINISHED_SEVENTH, note, 'Diminished seventh'))

export const allArpeggi = [dominantSevenths, diminishedSevenths, arpeggi]
