export default interface Experiment {
    name: string;
    maxAgeSeconds?: number;
    variants: {name:string}[];
}
