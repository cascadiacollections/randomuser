/**
 * Options for asynchronous API requests
 */
export interface AsyncRequestOptions {
    /**
     * AbortSignal to cancel the request
     */
    signal?: AbortSignal;
    /**
     * Timeout in milliseconds
     */
    timeout?: number;
}

/**
 * Parameters that can be passed to the RandomUser API
 */
export interface RandomUserParams {
    /**
     * Determines the set of users to generate
     */
    seed?: string;
    /**
     * Number of results to return (default: 1)
     */
    results?: number | string;
    /**
     * Filter users by gender (male, female)
     */
    gender?: 'male' | 'female' | string;
    /**
     * Nationality filter
     */
    nat?: string | string[];
    /**
     * Request page number
     */
    page?: number | string;
    /**
     * Field inclusion filter
     */
    inc?: string | string[];
    /**
     * Field exclusion filter
     */
    exc?: string | string[];
    /**
     * Password configuration
     */
    password?: string;
    [key: string]: string | number | readonly string[] | undefined;
}

/**
 * Error thrown by the RandomUser API
 */
export interface RandomUserError extends Error {
    code?: string;
    status?: number;
}

/**
 * Response from the RandomUser API
 */
export interface IRandomUserResponse {
    results: Result[];
    info:    Info;
    error?:  string;
}

/**
 * Metadata about the request
 */
export interface Info {
    seed:    string;
    results: number;
    page:    number;
    version: string;
}

export interface Result {
    gender:     string;
    name:       Name;
    location:   Location;
    email:      string;
    login:      Login;
    dob:        Dob;
    registered: Dob;
    phone:      string;
    cell:       string;
    id:         ID;
    picture:    Picture;
    nat:        string;
}

export interface Dob {
    date: Date;
    age:  number;
}

export interface ID {
    name:  string;
    value: string;
}

export interface Location {
    street:      string;
    city:        string;
    state:       string;
    postcode:    string;
    coordinates: Coordinates;
    timezone:    Timezone;
}

export interface Coordinates {
    latitude:  string;
    longitude: string;
}

export interface Timezone {
    offset:      string;
    description: string;
}

export interface Login {
    uuid:     string;
    username: string;
    password: string;
    salt:     string;
    md5:      string;
    sha1:     string;
    sha256:   string;
}

export interface Name {
    title: string;
    first: string;
    last:  string;
}

export interface Picture {
    large:     string;
    medium:    string;
    thumbnail: string;
}
