import { AutocompletePrediction } from "./autocomplete-prediction";

export interface AutocompleteResult {
    predictions: AutocompletePrediction[];
    status: string;
}