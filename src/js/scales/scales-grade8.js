const DIATONIC_OCTAVES = 4
const DIATONIC_OCTAVES_SCALE_TEMPO = 88
const DIATONIC_SIXTH_THIRDS_SCALE_TEMPO = 63
const LEGATO_SCALES_THIRDS_TEMPO = 52
const LEGATO_SCALES_OCTAVES = 2
const CHROMATIC_THIRD_APART_OCTAVES = 4
const CHROMATIC_THIRD_APART_TEMPO = 76
const CHROMATIC_MINOR_THIRDS_OCTAVES = 2
const CHROMATIC_MINOR_THIRDS_TEMPO = 52
const WHOLE_TONE_SCALE_OCTAVES = 2
const WHOLE_TONE_SCALE_TEMPO = 88
const ARPEGGIO_OCTAVES = 4
const ARPEGGIO_TEMPO = 66
const STYLES = {LEGATO: 'legato', STACCATO: 'staccato'}
const ALL_NOTES = ['C', 'C♯/D♭', 'D', 'E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'B♭', 'B']

class FingerExercise {
    constructor(interval, hands, mode, octaves, startingNote, style, tempo, type) {
        this.interval = interval
        this.hands = hands
        this.mode = mode
        this.octaves = octaves
        this.startingNote = startingNote
        this.style = style
        this.tempo = tempo
        this.type = type
    }
}

class DiatonicScaleOctaves extends FingerExercise {
    constructor(interval, startingNote, style, mode, tempo) {
        super(interval, 'hands together', mode, DIATONIC_OCTAVES, startingNote, style, tempo, 'Scale in octaves')
    }
}

class DiatonicScaleThirds extends FingerExercise {
    constructor(startingNote) {
        super('third apart', 'hands separately', 'major', LEGATO_SCALES_OCTAVES, startingNote, STYLES.LEGATO, LEGATO_SCALES_THIRDS_TEMPO, 'scale a third apart')
        this.startingNote = startingNote
    }
}

class Arpeggio extends FingerExercise {
    constructor(inversion, mode, startingNote, arpeggioType) {
        super('octave apart', 'both hands', mode, ARPEGGIO_OCTAVES, startingNote, STYLES.LEGATO, ARPEGGIO_TEMPO)
        this.inversion = inversion
        this.arpeggioType = arpeggioType
        this.type = 'arpeggio'
    }
}

class DominantSeventh extends Arpeggio {
    constructor(key) {
        super('root', 'major', null, 'dominant seventh')
        this.key = key
        this.type = 'dominant seventh'
    }
}

const standardScaleStartingNotes = ['C', 'D', 'B', 'F♯', 'F', 'E♭', 'A♭/G♯', 'D♭/C♯'];
const diatonicScaleModes = ['major', 'minor harmonic', 'minor melodic'];
const diatonicScaleIntervals = ['octave apart', 'third apart', 'sixth apart'];
const bothStyles = [STYLES.LEGATO, STYLES.STACCATO];

const diatonicScales = standardScaleStartingNotes.map(startingNote =>
    diatonicScaleModes.map(mode =>
        bothStyles.map(style =>
            diatonicScaleIntervals.map(interval =>
                new DiatonicScaleOctaves(
                    interval, startingNote, style, mode, interval === 'octave apart' ? DIATONIC_OCTAVES_SCALE_TEMPO : DIATONIC_SIXTH_THIRDS_SCALE_TEMPO)
            )
        )
    )
)

const legatoScalesInThirds = ['C', 'B♭'].map(startingNote => new DiatonicScaleThirds(startingNote))

const chromaticScaleMinorThirdApart = bothStyles.map(style =>
    ALL_NOTES.map(note =>
        new FingerExercise('third apart', 'hands together', 'chromatic', CHROMATIC_THIRD_APART_OCTAVES, note, style, CHROMATIC_THIRD_APART_TEMPO, 'chromatic scale a minor third apart')
    )
)

const chromaticScaleInMinorThirds = ['left hand', 'right hand'].map(hand =>
        new FingerExercise('minor thirds', hand, 'chromatic', CHROMATIC_MINOR_THIRDS_OCTAVES, 'A♯/C♯', STYLES.LEGATO, CHROMATIC_MINOR_THIRDS_TEMPO, 'chromatic scale in minor thirds')
    )

const wholeToneScale = [new FingerExercise('octave apart', 'both hands', 'whole tone', WHOLE_TONE_SCALE_OCTAVES, 'E', STYLES.LEGATO, WHOLE_TONE_SCALE_TEMPO, 'whole-tone scale')]

const inversions = ['root', 'first inversion', 'second inversion']
const arpeggioModes = ['major', 'minor']
const arpeggi = standardScaleStartingNotes.map(startingNote =>
    arpeggioModes.map(mode =>
        inversions.map(inversion =>
            new Arpeggio(inversion, mode, startingNote, 'standard')
        )
    )
)

const dominantSevenths = standardScaleStartingNotes.map(key => new DominantSeventh(key))

const diminishedSevenths = ALL_NOTES.map(note => new Arpeggio('root', 'diminished seventh', note, 'diminished seventh'))

const allScales = [diatonicScales, legatoScalesInThirds, chromaticScaleMinorThirdApart, chromaticScaleInMinorThirds, wholeToneScale, arpeggi, dominantSevenths, diminishedSevenths]

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const randomScale = (scaleTree = allScales) => {
    if (scaleTree.interval !== undefined) return scaleTree
    return randomScale(randomElement(scaleTree))
}

const showRandomScale = () => document.getElementById("scalesOutput").innerHTML = JSON.stringify(randomScale(), null, 4);
