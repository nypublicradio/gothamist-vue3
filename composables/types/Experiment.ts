export default interface Experiment {
    name: string;
    variants: Record<number, string>;
}
