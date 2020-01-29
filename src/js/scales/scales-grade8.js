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
const STYLES = {LEGATO: 'Legato', STACCATO: 'Staccato'}
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
        super(interval, 'Hands together', mode, DIATONIC_OCTAVES, startingNote, style, tempo, 'Scale in octaves')
    }
}

class DiatonicScaleThirds extends FingerExercise {
    constructor(startingNote) {
        super('Third apart', 'Hands separately', 'major', LEGATO_SCALES_OCTAVES, startingNote, STYLES.LEGATO, LEGATO_SCALES_THIRDS_TEMPO, 'Scale a third apart')
    }
}

class Arpeggio extends FingerExercise {
    constructor(inversion, mode, startingNote, type) {
        super('Octave apart', 'Hands together', mode, ARPEGGIO_OCTAVES, startingNote, STYLES.LEGATO, ARPEGGIO_TEMPO, type)
        this.inversion = inversion
    }
}

class DominantSeventh extends Arpeggio {
    constructor(key) {
        super('Root', 'major', null, 'Dominant seventh')
        this.key = key
    }
}

const standardScaleStartingNotes = ['C', 'D', 'B', 'F♯', 'F', 'E♭', 'A♭/G♯', 'D♭/C♯'];
const diatonicScaleModes = ['major', 'minor harmonic', 'minor melodic'];
const diatonicScaleIntervals = ['Octave apart', 'Third apart', 'Sixth apart'];
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
        new FingerExercise('third apart', 'hands together', 'chromatic', CHROMATIC_THIRD_APART_OCTAVES, note, style, CHROMATIC_THIRD_APART_TEMPO, 'Chromatic scale a minor third apart')
    )
)

const chromaticScaleInMinorThirds = ['left hand', 'right hand'].map(hand =>
        new FingerExercise('minor thirds', hand, 'chromatic', CHROMATIC_MINOR_THIRDS_OCTAVES, 'A♯/C♯', STYLES.LEGATO, CHROMATIC_MINOR_THIRDS_TEMPO, 'Chromatic scale in minor thirds')
    )

const wholeToneScale = [new FingerExercise('Octave apart', 'Hands together', 'Whole tone', WHOLE_TONE_SCALE_OCTAVES, 'E', STYLES.LEGATO, WHOLE_TONE_SCALE_TEMPO, 'Whole-tone scale')]

const inversions = ['Root', 'First inversion', 'Second inversion']
const arpeggioModes = ['major', 'minor']
const arpeggi = standardScaleStartingNotes.map(startingNote =>
    arpeggioModes.map(mode =>
        inversions.map(inversion =>
            new Arpeggio(inversion, mode, startingNote, 'Arpeggio')
        )
    )
)

const dominantSevenths = standardScaleStartingNotes.map(key => new DominantSeventh(key))

const diminishedSevenths = ALL_NOTES.map(note => new Arpeggio('Root', 'Diminished seventh', note, 'Diminished seventh'))

const allScales = [diatonicScales, legatoScalesInThirds, chromaticScaleMinorThirdApart, chromaticScaleInMinorThirds, wholeToneScale, arpeggi, dominantSevenths, diminishedSevenths]

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const randomScale = (scaleTree = allScales) => {
    if (scaleTree.interval !== undefined) return scaleTree
    return randomScale(randomElement(scaleTree))
}

const showRandomScale = () => {
    const scale = randomScale()
    console.log(JSON.stringify(scale, null, 4))
    const mainInfo = [
        `Type: ${scale.type}`,
        `${scale.startingNote || scale.key} ${scale.mode}`,
        `Interval: ${scale.interval}`,
        `Style: ${scale.style}`
    ]
    let arpeggioInfo = []
    if (scale.inversion !== undefined) arpeggioInfo.push(
        `Inversion: ${scale.inversion}`,
    )
    if (scale.key !== undefined) arpeggioInfo.push(
        `Key: ${scale.key}`
    )
    const extraInfo = [
        `${scale.hands}`,
        `Octaves: ${scale.octaves}`,
        `Tempo: ${scale.tempo}`
    ].map(x => `<span style="font-size: 85%;">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    document.getElementById("scalesOutput").innerHTML = formattedElement;
}
