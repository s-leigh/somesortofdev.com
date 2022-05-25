import {allArpeggi} from "./arpeggi";
import {allScales} from "./scales";

export enum NOTE {
    C = 'C',
    D_FLAT = 'C♯/D♭',
    D = 'D',
    E_FLAT = 'E♭',
    E = 'E',
    F = 'F',
    G_FLAT = 'F♯/G♭',
    G = 'G',
    A_FLAT = 'G♯/A♭',
    A = 'A',
    B_FLAT = 'B♭',
    B = 'B'
}
export const ALL_NOTES = (Object.keys(NOTE) as (keyof typeof NOTE)[]).map(x => x as NOTE)

export const STANDARD_SCALE_STARTING_NOTES = [NOTE.C, NOTE.D, NOTE.B, NOTE.G_FLAT, NOTE.F, NOTE.E_FLAT, NOTE.A_FLAT, NOTE.D_FLAT]

export enum STYLE {
    LEGATO = "Legato",
    STACCATO = "Staccato"
}

export class FingerExercise {
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

const randomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

const randomFingerExercise = (exerciseTree: any[]) => {
    if (!Array.isArray(exerciseTree)) return exerciseTree
    return randomFingerExercise(randomElement(exerciseTree))
}

const showRandomExercise = (exercise) => {
    console.log(JSON.stringify(exercise, null, 4))
    const mainInfo = [
        `Type: ${exercise.type}`,
        `${exercise.startingNote || exercise.key} ${exercise.mode}`,
        `Interval: ${exercise.interval}`,
        `Style: ${exercise.style}`
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
    ].map(x => `<span style="font-size: 85%;">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    document.getElementById("scalesOutput").innerHTML = formattedElement;
}

export function showRandomScale () { showRandomExercise(randomFingerExercise(allScales))}
export const showRandomArpeggio = () => showRandomExercise(randomFingerExercise(allArpeggi))
