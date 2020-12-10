import { ContentStatuses } from "./ContentStatus";

export interface ApiContent<T> {
    data?: T
    contentStatus: ContentStatuses
}