import type { NamedNode } from 'rdf-js';
/**
 * A `Record` in which each value is a concatenation of the baseUrl and its key.
 */
type ExpandedRecord<TBase extends string, TLocal extends string> = {
    [K in TLocal]: `${TBase}${K}`;
};
/**
 * Has a base URL as `namespace` value and each key has as value the concatenation with that base URL.
 */
type ValueVocabulary<TBase extends string, TLocal extends string> = {
    namespace: TBase;
} & ExpandedRecord<TBase, TLocal>;
/**
 * A {@link ValueVocabulary} where the URI values are {@link NamedNode}s.
 */
type TermVocabulary<T> = T extends ValueVocabulary<any, any> ? {
    [K in keyof T]: NamedNode<T[K]>;
} : never;
/**
 * Contains a namespace and keys linking to the entries in this namespace.
 * The `terms` field contains the same values but as {@link NamedNode} instead of string.
 */
export type Vocabulary<TBase extends string, TKey extends string> = ValueVocabulary<TBase, TKey> & {
    terms: TermVocabulary<ValueVocabulary<TBase, TKey>>;
};
/**
 * A {@link Vocabulary} where all the non-namespace fields are of unknown value.
 * This is a fallback in case {@link createVocabulary} gets called with a non-strict string array.
 */
export type PartialVocabulary<TBase extends string> = {
    namespace: TBase;
} & Partial<Record<string, string>> & {
    terms: {
        namespace: NamedNode<TBase>;
    } & Partial<Record<string, NamedNode>>;
};
/**
 * A local name of a {@link Vocabulary}.
 */
export type VocabularyLocal<T> = T extends Vocabulary<any, infer TKey> ? TKey : never;
/**
 * A URI string entry of a {@link Vocabulary}.
 */
export type VocabularyValue<T> = T extends Vocabulary<any, infer TKey> ? T[TKey] : never;
/**
 * A {@link NamedNode} entry of a {@link Vocabulary}.
 */
export type VocabularyTerm<T> = T extends Vocabulary<any, infer TKey> ? T['terms'][TKey] : never;
/**
 * Creates a {@link Vocabulary} with the given `baseUri` as namespace and all `localNames` as entries.
 * The values are the local names expanded from the given base URI as strings.
 * The `terms` field contains all the same values but as {@link NamedNode} instead.
 */
export declare function createVocabulary<TBase extends string, TLocal extends string>(baseUri: TBase, ...localNames: TLocal[]): string extends TLocal ? PartialVocabulary<TBase> : Vocabulary<TBase, TLocal>;
/**
 * Creates a new {@link Vocabulary} that extends an existing one by adding new local names.
 * @param vocabulary - The {@link Vocabulary} to extend.
 * @param newNames - The new local names that need to be added.
 */
export declare function extendVocabulary<TBase extends string, TLocal extends string, TNew extends string>(vocabulary: Vocabulary<TBase, TLocal>, ...newNames: TNew[]): ReturnType<typeof createVocabulary<TBase, TLocal | TNew>>;
export declare const ACL: Vocabulary<"http://www.w3.org/ns/auth/acl#", "default" | "accessTo" | "agent" | "agentClass" | "agentGroup" | "AuthenticatedAgent" | "Authorization" | "mode" | "Write" | "Read" | "Append" | "Control">;
export declare const ACP: Vocabulary<"http://www.w3.org/ns/solid/acp#", "allow" | "agent" | "AccessControlResource" | "grant" | "attribute" | "resource" | "accessControl" | "memberAccessControl" | "apply" | "deny" | "allOf" | "anyOf" | "noneOf" | "client" | "issuer" | "vc">;
export declare const AS: Vocabulary<"https://www.w3.org/ns/activitystreams#", "object" | "Add" | "Create" | "Delete" | "Remove" | "Update">;
export declare const AUTH: Vocabulary<"urn:solid:auth:", "userMode" | "publicMode">;
export declare const DC: Vocabulary<"http://purl.org/dc/terms/", "title" | "description" | "modified">;
export declare const FOAF: Vocabulary<"http://xmlns.com/foaf/0.1/", "Agent">;
export declare const HH: Vocabulary<"http://www.w3.org/2011/http-headers#", "content-length">;
export declare const HTTP: Vocabulary<"http://www.w3.org/2011/http#", "statusCodeNumber">;
export declare const IANA: PartialVocabulary<"http://www.w3.org/ns/iana/media-types/">;
export declare const JSON_LD: Vocabulary<"http://www.w3.org/ns/json-ld#", "context">;
export declare const LDP: Vocabulary<"http://www.w3.org/ns/ldp#", "contains" | "BasicContainer" | "Container" | "Resource">;
export declare const MA: Vocabulary<"http://www.w3.org/ns/ma-ont#", "format">;
export declare const NOTIFY: Vocabulary<"http://www.w3.org/ns/solid/notifications#", "state" | "accept" | "channelType" | "endAt" | "feature" | "rate" | "receiveFrom" | "startAt" | "sender" | "sendTo" | "subscription" | "topic" | "webhookAuth" | "WebHookChannel2023" | "WebSocketChannel2023">;
export declare const OIDC: Vocabulary<"http://www.w3.org/ns/solid/oidc#", "redirect_uris">;
export declare const PIM: Vocabulary<"http://www.w3.org/ns/pim/space#", "storage" | "Storage">;
export declare const POSIX: Vocabulary<"http://www.w3.org/ns/posix/stat#", "size" | "mtime">;
export declare const RDF: Vocabulary<"http://www.w3.org/1999/02/22-rdf-syntax-ns#", "type">;
export declare const RDFS: Vocabulary<"http://www.w3.org/2000/01/rdf-schema#", "label">;
export declare const SOLID: Vocabulary<"http://www.w3.org/ns/solid/terms#", "where" | "deletes" | "inserts" | "oidcIssuer" | "oidcIssuerRegistrationToken" | "oidcRegistration" | "storageDescription" | "InsertDeletePatch">;
export declare const SOLID_AS: Vocabulary<"urn:npm:solid:community-server:activity:", "activity">;
export declare const SOLID_ERROR: Vocabulary<"urn:npm:solid:community-server:error:", "disallowedMethod" | "errorResponse" | "stack">;
export declare const SOLID_HTTP: Vocabulary<"urn:npm:solid:community-server:http:", "location" | "slug">;
export declare const SOLID_META: Vocabulary<"urn:npm:solid:community-server:meta:", "value" | "template" | "preserve" | "ResponseMetadata" | "contentTypeParameter">;
export declare const VANN: Vocabulary<"http://purl.org/vocab/vann/", "preferredNamespacePrefix">;
export declare const VCARD: Vocabulary<"http://www.w3.org/2006/vcard/ns#", "hasMember">;
export declare const XSD: Vocabulary<"http://www.w3.org/2001/XMLSchema#", "string" | "integer" | "dateTime" | "duration">;
export declare const CONTENT_LENGTH: "http://www.w3.org/2011/http-headers#content-length";
export declare const CONTENT_LENGTH_TERM: NamedNode<"http://www.w3.org/2011/http-headers#content-length">;
export declare const CONTENT_TYPE: "http://www.w3.org/ns/ma-ont#format";
export declare const CONTENT_TYPE_TERM: NamedNode<"http://www.w3.org/ns/ma-ont#format">;
export declare const PREFERRED_PREFIX: "http://purl.org/vocab/vann/preferredNamespacePrefix";
export declare const PREFERRED_PREFIX_TERM: NamedNode<"http://purl.org/vocab/vann/preferredNamespacePrefix">;
export {};
