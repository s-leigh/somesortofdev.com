// Octaves
export const CHROMATIC_MINOR_THIRDS_OCTAVES = 2
export const CHROMATIC_THIRD_APART_OCTAVES = 4
export const CHROMATIC_SCALE_MAJOR_SIXTH_APART_OCTAVES = 4
export const CONTRARY_MOTION_OCTAVES = 2
export const DIATONIC_OCTAVES = 4
export const LEGATO_SCALES_OCTAVES = 2
export const STACCATO_SCALES_SIXTHS_OCTAVES = 2
export const WHOLE_TONE_SCALE_OCTAVES = 4

// Tempi
export const CHROMATIC_MINOR_THIRDS_TEMPO = 60
export const OCTAVES_SCALE_TEMPO = 88
export const SIXTHS_APART_SCALE_TEMPO = 60
export const LEGATO_SCALES_THIRDS_TEMPO = 52
export const STACCATO_SCALES_SIXTHS_TEMPO = 54

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

export const ALL_NOTES = (Object.keys(NOTE) as (keyof typeof NOTE)[]).map(x => x as NOTE)
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

export const DIATONIC_MODES = (Object.keys(DIATONIC_MODE) as (keyof typeof DIATONIC_MODE)[]).map(x => x as DIATONIC_MODE)

export enum NON_DIATONIC_MODE {
    CHROMATIC = "chromatic",
    WHOLE_TONE = "whole tone"
}
