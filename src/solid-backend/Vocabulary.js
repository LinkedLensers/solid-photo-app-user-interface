// stolen from https://github.com/CommunitySolidServer/CommunitySolidServer/blob/versions/6.0.0/src/util/Vocabularies.ts
// Thanks Joachim
/* eslint-disable function-paren-newline */
import { DataFactory } from 'n3';
/**
 * Creates a {@link ValueVocabulary} with the given `baseUri` as namespace and all `localNames` as entries.
 */
function createValueVocabulary(baseUri, localNames) {
    const expanded = {};
    // Expose the listed local names as properties
    for (const localName of localNames) {
        expanded[localName] = `${baseUri}${localName}`;
    }
    return Object.assign({ namespace: baseUri }, expanded);
}
/**
 * Creates a {@link TermVocabulary} based on the provided {@link ValueVocabulary}.
 */
function createTermVocabulary(values) {
    // Need to cast since `fromEntries` typings aren't strict enough
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, DataFactory.namedNode(value)]));
}
/**
 * Creates a {@link Vocabulary} with the given `baseUri` as namespace and all `localNames` as entries.
 * The values are the local names expanded from the given base URI as strings.
 * The `terms` field contains all the same values but as {@link NamedNode} instead.
 */
export function createVocabulary(baseUri, ...localNames) {
    const values = createValueVocabulary(baseUri, localNames);
    return Object.assign(Object.assign({}, values), { terms: createTermVocabulary(values) });
}
/**
 * Creates a new {@link Vocabulary} that extends an existing one by adding new local names.
 * @param vocabulary - The {@link Vocabulary} to extend.
 * @param newNames - The new local names that need to be added.
 */
export function extendVocabulary(vocabulary, ...newNames) {
    const localNames = Object.keys(vocabulary)
        .filter((key) => key !== 'terms' && key !== 'namespace');
    const allNames = [...localNames, ...newNames];
    return createVocabulary(vocabulary.namespace, ...allNames);
}
export const ACL = createVocabulary('http://www.w3.org/ns/auth/acl#', 'accessTo', 'agent', 'agentClass', 'agentGroup', 'AuthenticatedAgent', 'Authorization', 'default', 'mode', 'Write', 'Read', 'Append', 'Control');
export const ACP = createVocabulary('http://www.w3.org/ns/solid/acp#', 
// Used for ACP middleware headers
'AccessControlResource', 'grant', 'attribute', 
// Access Control Resource
'resource', 'accessControl', 'memberAccessControl', 
// Access Control,
'apply', 
// Policy
'allow', 'deny', 'allOf', 'anyOf', 'noneOf', 
// Matcher
'agent', 'client', 'issuer', 'vc');
export const AS = createVocabulary('https://www.w3.org/ns/activitystreams#', 'object', 'Add', 'Create', 'Delete', 'Remove', 'Update');
export const AUTH = createVocabulary('urn:solid:auth:', 'userMode', 'publicMode');
export const DC = createVocabulary('http://purl.org/dc/terms/', 'description', 'modified', 'title');
export const FOAF = createVocabulary('http://xmlns.com/foaf/0.1/', 'Agent');
export const HH = createVocabulary('http://www.w3.org/2011/http-headers#', 'content-length');
export const HTTP = createVocabulary('http://www.w3.org/2011/http#', 'statusCodeNumber');
export const IANA = createVocabulary('http://www.w3.org/ns/iana/media-types/');
export const JSON_LD = createVocabulary('http://www.w3.org/ns/json-ld#', 'context');
export const LDP = createVocabulary('http://www.w3.org/ns/ldp#', 'contains', 'BasicContainer', 'Container', 'Resource');
export const MA = createVocabulary('http://www.w3.org/ns/ma-ont#', 'format');
export const NOTIFY = createVocabulary('http://www.w3.org/ns/solid/notifications#', 'accept', 'channelType', 'endAt', 'feature', 'rate', 'receiveFrom', 'startAt', 'state', 'sender', 'sendTo', 'subscription', 'topic', 'webhookAuth', 'WebHookChannel2023', 'WebSocketChannel2023');
export const OIDC = createVocabulary('http://www.w3.org/ns/solid/oidc#', 'redirect_uris');
export const PIM = createVocabulary('http://www.w3.org/ns/pim/space#', 'Storage', 'storage');
export const POSIX = createVocabulary('http://www.w3.org/ns/posix/stat#', 'mtime', 'size');
export const RDF = createVocabulary('http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'type');
export const RDFS = createVocabulary('http://www.w3.org/2000/01/rdf-schema#', 'label');
export const SOLID = createVocabulary('http://www.w3.org/ns/solid/terms#', 'deletes', 'inserts', 'oidcIssuer', 'oidcIssuerRegistrationToken', 'oidcRegistration', 'storageDescription', 'where', 'InsertDeletePatch');
export const SOLID_AS = createVocabulary('urn:npm:solid:community-server:activity:', 'activity');
export const SOLID_ERROR = createVocabulary('urn:npm:solid:community-server:error:', 'disallowedMethod', 'errorResponse', 'stack');
export const SOLID_HTTP = createVocabulary('urn:npm:solid:community-server:http:', 'location', 'slug');
export const SOLID_META = createVocabulary('urn:npm:solid:community-server:meta:', 
// This identifier is used as graph for all metadata that is generated on the fly and should not be stored
'ResponseMetadata', 
// This is used to identify templates that can be used for the representation of a resource
'template', 
// This is used to store Content-Type Parameters
'contentTypeParameter', 'value', 
// This is used to indicate whether metadata should be preserved or not during a PUT operation
'preserve');
export const VANN = createVocabulary('http://purl.org/vocab/vann/', 'preferredNamespacePrefix');
export const VCARD = createVocabulary('http://www.w3.org/2006/vcard/ns#', 'hasMember');
export const XSD = createVocabulary('http://www.w3.org/2001/XMLSchema#', 'dateTime', 'duration', 'integer', 'string');
// Alias for commonly used types
export const CONTENT_LENGTH = HH['content-length'];
export const CONTENT_LENGTH_TERM = HH.terms['content-length'];
export const CONTENT_TYPE = MA.format;
export const CONTENT_TYPE_TERM = MA.terms.format;
export const PREFERRED_PREFIX = VANN.preferredNamespacePrefix;
export const PREFERRED_PREFIX_TERM = VANN.terms.preferredNamespacePrefix;
//# sourceMappingURL=Vocabulary.js.map