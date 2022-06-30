
export enum NOTE {
    C = 'C',
    D_FLAT = 'C♯/D♭',
    D = 'D',
    E_FLAT = 'E♭',
    E = 'E',
    F = 'F',
    F_SHARP = 'F♯',
    G = 'G',
    A_FLAT = 'G♯/A♭',
    A = 'A',
    B_FLAT = 'B♭',
    B = 'B'
}

export const STANDARD_STARTING_NOTES = [NOTE.C, NOTE.E_FLAT, NOTE.F_SHARP, NOTE.A]

export enum STYLE {
    LEGATO = "Legato",
    STACCATO = "Staccato"
}

export const BOTH_STYLES = (Object.keys(STYLE) as (keyof typeof STYLE)[]).map(x => x as STYLE)

export enum DIATONIC_MODE {
    MAJOR = "major",
    MINOR_HARMONIC = "minor harmonic",
    MINOR_MELODIC = "minor melodic"
}

export enum NON_DIATONIC_MODE {
    CHROMATIC = "chromatic",
    WHOLE_TONE = "whole tone"
}
