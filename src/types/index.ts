export type ExampleComponentProps = {
    title: string;
    description?: string;
};

export interface AppState {
    isLoading: boolean;
    error?: string;
}