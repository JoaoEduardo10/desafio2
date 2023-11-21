type OmitProperties<T, K extends keyof T> = Omit<T, K>;

export { OmitProperties };
