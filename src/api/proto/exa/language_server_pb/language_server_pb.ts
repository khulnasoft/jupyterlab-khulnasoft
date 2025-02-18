// Copyright Exafunction, Inc.

// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file exa/language_server_pb/language_server.proto (package exa.language_server_pb, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage
} from '@bufbuild/protobuf';
import { Message, proto3, protoInt64 } from '@bufbuild/protobuf';
import {
  Completion,
  CompletionSource,
  EditorOptions,
  ExperimentKey,
  Language,
  Metadata
} from '../khulnasoft_common_pb/khulnasoft_common_pb';

/**
 * @generated from enum exa.language_server_pb.KhulnasoftState
 */
export enum KhulnasoftState {
  /**
   * @generated from enum value: KHULNASOFT_STATE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: KHULNASOFT_STATE_INACTIVE = 1;
   */
  INACTIVE = 1,

  /**
   * @generated from enum value: KHULNASOFT_STATE_PROCESSING = 2;
   */
  PROCESSING = 2,

  /**
   * @generated from enum value: KHULNASOFT_STATE_SUCCESS = 3;
   */
  SUCCESS = 3,

  /**
   * @generated from enum value: KHULNASOFT_STATE_WARNING = 4;
   */
  WARNING = 4,

  /**
   * @generated from enum value: KHULNASOFT_STATE_ERROR = 5;
   */
  ERROR = 5
}
// Retrieve enum metadata with: proto3.getEnumType(KhulnasoftState)
proto3.util.setEnumType(KhulnasoftState, 'exa.language_server_pb.KhulnasoftState', [
  { no: 0, name: 'KHULNASOFT_STATE_UNSPECIFIED' },
  { no: 1, name: 'KHULNASOFT_STATE_INACTIVE' },
  { no: 2, name: 'KHULNASOFT_STATE_PROCESSING' },
  { no: 3, name: 'KHULNASOFT_STATE_SUCCESS' },
  { no: 4, name: 'KHULNASOFT_STATE_WARNING' },
  { no: 5, name: 'KHULNASOFT_STATE_ERROR' }
]);

/**
 * @generated from enum exa.language_server_pb.LineType
 */
export enum LineType {
  /**
   * @generated from enum value: LINE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: LINE_TYPE_SINGLE = 1;
   */
  SINGLE = 1,

  /**
   * @generated from enum value: LINE_TYPE_MULTI = 2;
   */
  MULTI = 2
}
// Retrieve enum metadata with: proto3.getEnumType(LineType)
proto3.util.setEnumType(LineType, 'exa.language_server_pb.LineType', [
  { no: 0, name: 'LINE_TYPE_UNSPECIFIED' },
  { no: 1, name: 'LINE_TYPE_SINGLE' },
  { no: 2, name: 'LINE_TYPE_MULTI' }
]);

/**
 * @generated from enum exa.language_server_pb.CompletionPartType
 */
export enum CompletionPartType {
  /**
   * @generated from enum value: COMPLETION_PART_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Single-line completion parts that appear within an existing line of text.
   *
   * @generated from enum value: COMPLETION_PART_TYPE_INLINE = 1;
   */
  INLINE = 1,

  /**
   * Possibly multi-line completion parts that appear below an existing line of text.
   *
   * @generated from enum value: COMPLETION_PART_TYPE_BLOCK = 2;
   */
  BLOCK = 2,

  /**
   * Like COMPLETION_PART_TYPE_INLINE, but overwrites the existing text.
   *
   * @generated from enum value: COMPLETION_PART_TYPE_INLINE_MASK = 3;
   */
  INLINE_MASK = 3
}
// Retrieve enum metadata with: proto3.getEnumType(CompletionPartType)
proto3.util.setEnumType(
  CompletionPartType,
  'exa.language_server_pb.CompletionPartType',
  [
    { no: 0, name: 'COMPLETION_PART_TYPE_UNSPECIFIED' },
    { no: 1, name: 'COMPLETION_PART_TYPE_INLINE' },
    { no: 2, name: 'COMPLETION_PART_TYPE_BLOCK' },
    { no: 3, name: 'COMPLETION_PART_TYPE_INLINE_MASK' }
  ]
);

/**
 * @generated from message exa.language_server_pb.MultilineConfig
 */
export class MultilineConfig extends Message<MultilineConfig> {
  /**
   * Multiline model threshold. 0-1, higher = more single line, lower = more multiline,
   * 0.0 = only_multiline, default is 0.5
   *
   * @generated from field: float threshold = 1;
   */
  threshold = 0;

  constructor(data?: PartialMessage<MultilineConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.MultilineConfig';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'threshold', kind: 'scalar', T: 2 /* ScalarType.FLOAT */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): MultilineConfig {
    return new MultilineConfig().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): MultilineConfig {
    return new MultilineConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): MultilineConfig {
    return new MultilineConfig().fromJsonString(jsonString, options);
  }

  static equals(
    a: MultilineConfig | PlainMessage<MultilineConfig> | undefined,
    b: MultilineConfig | PlainMessage<MultilineConfig> | undefined
  ): boolean {
    return proto3.util.equals(MultilineConfig, a, b);
  }
}

/**
 * Next ID: 9, Previous field: disable_cache.
 *
 * @generated from message exa.language_server_pb.GetCompletionsRequest
 */
export class GetCompletionsRequest extends Message<GetCompletionsRequest> {
  /**
   * @generated from field: exa.khulnasoft_common_pb.Metadata metadata = 1;
   */
  metadata?: Metadata;

  /**
   * @generated from field: exa.language_server_pb.Document document = 2;
   */
  document?: Document;

  /**
   * @generated from field: exa.khulnasoft_common_pb.EditorOptions editor_options = 3;
   */
  editorOptions?: EditorOptions;

  /**
   * @generated from field: repeated exa.language_server_pb.Document other_documents = 5;
   */
  otherDocuments: Document[] = [];

  /**
   * @generated from field: exa.language_server_pb.ExperimentConfig experiment_config = 7;
   */
  experimentConfig?: ExperimentConfig;

  /**
   * @generated from field: string model_name = 10;
   */
  modelName = '';

  /**
   * @generated from field: exa.language_server_pb.MultilineConfig multiline_config = 13;
   */
  multilineConfig?: MultilineConfig;

  constructor(data?: PartialMessage<GetCompletionsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.GetCompletionsRequest';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'metadata', kind: 'message', T: Metadata },
    { no: 2, name: 'document', kind: 'message', T: Document },
    { no: 3, name: 'editor_options', kind: 'message', T: EditorOptions },
    {
      no: 5,
      name: 'other_documents',
      kind: 'message',
      T: Document,
      repeated: true
    },
    { no: 7, name: 'experiment_config', kind: 'message', T: ExperimentConfig },
    {
      no: 10,
      name: 'model_name',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */
    },
    { no: 13, name: 'multiline_config', kind: 'message', T: MultilineConfig }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetCompletionsRequest {
    return new GetCompletionsRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetCompletionsRequest {
    return new GetCompletionsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetCompletionsRequest {
    return new GetCompletionsRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: GetCompletionsRequest | PlainMessage<GetCompletionsRequest> | undefined,
    b: GetCompletionsRequest | PlainMessage<GetCompletionsRequest> | undefined
  ): boolean {
    return proto3.util.equals(GetCompletionsRequest, a, b);
  }
}

/**
 * Next ID: 5, Previous field: latency_info.
 *
 * @generated from message exa.language_server_pb.GetCompletionsResponse
 */
export class GetCompletionsResponse extends Message<GetCompletionsResponse> {
  /**
   * @generated from field: exa.language_server_pb.State state = 1;
   */
  state?: State;

  /**
   * @generated from field: repeated exa.language_server_pb.CompletionItem completion_items = 2;
   */
  completionItems: CompletionItem[] = [];

  constructor(data?: PartialMessage<GetCompletionsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.GetCompletionsResponse';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'state', kind: 'message', T: State },
    {
      no: 2,
      name: 'completion_items',
      kind: 'message',
      T: CompletionItem,
      repeated: true
    }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetCompletionsResponse {
    return new GetCompletionsResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetCompletionsResponse {
    return new GetCompletionsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetCompletionsResponse {
    return new GetCompletionsResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | GetCompletionsResponse
      | PlainMessage<GetCompletionsResponse>
      | undefined,
    b: GetCompletionsResponse | PlainMessage<GetCompletionsResponse> | undefined
  ): boolean {
    return proto3.util.equals(GetCompletionsResponse, a, b);
  }
}

/**
 * Next ID: 3, Previous field: completion_id.
 *
 * @generated from message exa.language_server_pb.AcceptCompletionRequest
 */
export class AcceptCompletionRequest extends Message<AcceptCompletionRequest> {
  /**
   * @generated from field: exa.khulnasoft_common_pb.Metadata metadata = 1;
   */
  metadata?: Metadata;

  /**
   * @generated from field: string completion_id = 2;
   */
  completionId = '';

  constructor(data?: PartialMessage<AcceptCompletionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.AcceptCompletionRequest';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'metadata', kind: 'message', T: Metadata },
    {
      no: 2,
      name: 'completion_id',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */
    }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): AcceptCompletionRequest {
    return new AcceptCompletionRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): AcceptCompletionRequest {
    return new AcceptCompletionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): AcceptCompletionRequest {
    return new AcceptCompletionRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | AcceptCompletionRequest
      | PlainMessage<AcceptCompletionRequest>
      | undefined,
    b:
      | AcceptCompletionRequest
      | PlainMessage<AcceptCompletionRequest>
      | undefined
  ): boolean {
    return proto3.util.equals(AcceptCompletionRequest, a, b);
  }
}

/**
 * Next ID: 1, Previous field: N/A.
 *
 * @generated from message exa.language_server_pb.AcceptCompletionResponse
 */
export class AcceptCompletionResponse extends Message<AcceptCompletionResponse> {
  constructor(data?: PartialMessage<AcceptCompletionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.AcceptCompletionResponse';
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): AcceptCompletionResponse {
    return new AcceptCompletionResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): AcceptCompletionResponse {
    return new AcceptCompletionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): AcceptCompletionResponse {
    return new AcceptCompletionResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | AcceptCompletionResponse
      | PlainMessage<AcceptCompletionResponse>
      | undefined,
    b:
      | AcceptCompletionResponse
      | PlainMessage<AcceptCompletionResponse>
      | undefined
  ): boolean {
    return proto3.util.equals(AcceptCompletionResponse, a, b);
  }
}

/**
 * Next ID: 1, Previous field: N/A.
 *
 * @generated from message exa.language_server_pb.GetAuthTokenRequest
 */
export class GetAuthTokenRequest extends Message<GetAuthTokenRequest> {
  constructor(data?: PartialMessage<GetAuthTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.GetAuthTokenRequest';
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetAuthTokenRequest {
    return new GetAuthTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetAuthTokenRequest {
    return new GetAuthTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetAuthTokenRequest {
    return new GetAuthTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: GetAuthTokenRequest | PlainMessage<GetAuthTokenRequest> | undefined,
    b: GetAuthTokenRequest | PlainMessage<GetAuthTokenRequest> | undefined
  ): boolean {
    return proto3.util.equals(GetAuthTokenRequest, a, b);
  }
}

/**
 * Next ID: 3, Previous field: uuid.
 *
 * @generated from message exa.language_server_pb.GetAuthTokenResponse
 */
export class GetAuthTokenResponse extends Message<GetAuthTokenResponse> {
  /**
   * @generated from field: string auth_token = 1;
   */
  authToken = '';

  /**
   * @generated from field: string uuid = 2;
   */
  uuid = '';

  constructor(data?: PartialMessage<GetAuthTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.GetAuthTokenResponse';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'auth_token', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'uuid', kind: 'scalar', T: 9 /* ScalarType.STRING */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetAuthTokenResponse {
    return new GetAuthTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetAuthTokenResponse {
    return new GetAuthTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetAuthTokenResponse {
    return new GetAuthTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: GetAuthTokenResponse | PlainMessage<GetAuthTokenResponse> | undefined,
    b: GetAuthTokenResponse | PlainMessage<GetAuthTokenResponse> | undefined
  ): boolean {
    return proto3.util.equals(GetAuthTokenResponse, a, b);
  }
}

/**
 * @generated from message exa.language_server_pb.DocumentPosition
 */
export class DocumentPosition extends Message<DocumentPosition> {
  /**
   * 0-indexed. Measured in UTF-8 bytes.
   *
   * @generated from field: uint64 row = 1;
   */
  row = protoInt64.zero;

  /**
   * 0-indexed. Measured in UTF-8 bytes.
   *
   * @generated from field: uint64 col = 2;
   */
  col = protoInt64.zero;

  constructor(data?: PartialMessage<DocumentPosition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.DocumentPosition';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'row', kind: 'scalar', T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: 'col', kind: 'scalar', T: 4 /* ScalarType.UINT64 */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): DocumentPosition {
    return new DocumentPosition().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): DocumentPosition {
    return new DocumentPosition().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): DocumentPosition {
    return new DocumentPosition().fromJsonString(jsonString, options);
  }

  static equals(
    a: DocumentPosition | PlainMessage<DocumentPosition> | undefined,
    b: DocumentPosition | PlainMessage<DocumentPosition> | undefined
  ): boolean {
    return proto3.util.equals(DocumentPosition, a, b);
  }
}

/**
 * Next ID: 9, Previous field: cursor_position.
 *
 * @generated from message exa.language_server_pb.Document
 */
export class Document extends Message<Document> {
  /**
   * @generated from field: string absolute_path = 1;
   */
  absolutePath = '';

  /**
   * Path relative to the root of the workspace.
   *
   * @generated from field: string relative_path = 2;
   */
  relativePath = '';

  /**
   * @generated from field: string text = 3;
   */
  text = '';

  /**
   * Language ID provided by the editor.
   *
   * @generated from field: string editor_language = 4;
   */
  editorLanguage = '';

  /**
   * Language enum standardized across editors.
   *
   * @generated from field: exa.khulnasoft_common_pb.Language language = 5;
   */
  language = Language.UNSPECIFIED;

  /**
   * Measured in number of UTF-8 bytes.
   *
   * @generated from field: uint64 cursor_offset = 6;
   */
  cursorOffset = protoInt64.zero;

  /**
   * May be present instead of cursor_offset.
   *
   * @generated from field: exa.language_server_pb.DocumentPosition cursor_position = 8;
   */
  cursorPosition?: DocumentPosition;

  /**
   * \n or \r\n, if known.
   *
   * @generated from field: string line_ending = 7;
   */
  lineEnding = '';

  constructor(data?: PartialMessage<Document>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.Document';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'absolute_path',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */
    },
    {
      no: 2,
      name: 'relative_path',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */
    },
    { no: 3, name: 'text', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 4,
      name: 'editor_language',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */
    },
    { no: 5, name: 'language', kind: 'enum', T: proto3.getEnumType(Language) },
    {
      no: 6,
      name: 'cursor_offset',
      kind: 'scalar',
      T: 4 /* ScalarType.UINT64 */
    },
    { no: 8, name: 'cursor_position', kind: 'message', T: DocumentPosition },
    { no: 7, name: 'line_ending', kind: 'scalar', T: 9 /* ScalarType.STRING */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): Document {
    return new Document().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): Document {
    return new Document().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): Document {
    return new Document().fromJsonString(jsonString, options);
  }

  static equals(
    a: Document | PlainMessage<Document> | undefined,
    b: Document | PlainMessage<Document> | undefined
  ): boolean {
    return proto3.util.equals(Document, a, b);
  }
}

/**
 * @generated from message exa.language_server_pb.ExperimentConfig
 */
export class ExperimentConfig extends Message<ExperimentConfig> {
  /**
   * @generated from field: repeated exa.khulnasoft_common_pb.ExperimentKey force_enable_experiments = 1;
   */
  forceEnableExperiments: ExperimentKey[] = [];

  constructor(data?: PartialMessage<ExperimentConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.ExperimentConfig';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'force_enable_experiments',
      kind: 'enum',
      T: proto3.getEnumType(ExperimentKey),
      repeated: true
    }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ExperimentConfig {
    return new ExperimentConfig().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ExperimentConfig {
    return new ExperimentConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ExperimentConfig {
    return new ExperimentConfig().fromJsonString(jsonString, options);
  }

  static equals(
    a: ExperimentConfig | PlainMessage<ExperimentConfig> | undefined,
    b: ExperimentConfig | PlainMessage<ExperimentConfig> | undefined
  ): boolean {
    return proto3.util.equals(ExperimentConfig, a, b);
  }
}

/**
 * Next ID: 3, Previous field: message.
 *
 * @generated from message exa.language_server_pb.State
 */
export class State extends Message<State> {
  /**
   * @generated from field: exa.language_server_pb.KhulnasoftState state = 1;
   */
  state = KhulnasoftState.UNSPECIFIED;

  /**
   * @generated from field: string message = 2;
   */
  message = '';

  constructor(data?: PartialMessage<State>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.State';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'state', kind: 'enum', T: proto3.getEnumType(KhulnasoftState) },
    { no: 2, name: 'message', kind: 'scalar', T: 9 /* ScalarType.STRING */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): State {
    return new State().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): State {
    return new State().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): State {
    return new State().fromJsonString(jsonString, options);
  }

  static equals(
    a: State | PlainMessage<State> | undefined,
    b: State | PlainMessage<State> | undefined
  ): boolean {
    return proto3.util.equals(State, a, b);
  }
}

/**
 * Next ID: 5, Previous field: end_position.
 *
 * @generated from message exa.language_server_pb.Range
 */
export class Range extends Message<Range> {
  /**
   * @generated from field: uint64 start_offset = 1;
   */
  startOffset = protoInt64.zero;

  /**
   * @generated from field: uint64 end_offset = 2;
   */
  endOffset = protoInt64.zero;

  /**
   * @generated from field: exa.language_server_pb.DocumentPosition start_position = 3;
   */
  startPosition?: DocumentPosition;

  /**
   * @generated from field: exa.language_server_pb.DocumentPosition end_position = 4;
   */
  endPosition?: DocumentPosition;

  constructor(data?: PartialMessage<Range>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.Range';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'start_offset',
      kind: 'scalar',
      T: 4 /* ScalarType.UINT64 */
    },
    { no: 2, name: 'end_offset', kind: 'scalar', T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: 'start_position', kind: 'message', T: DocumentPosition },
    { no: 4, name: 'end_position', kind: 'message', T: DocumentPosition }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): Range {
    return new Range().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): Range {
    return new Range().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): Range {
    return new Range().fromJsonString(jsonString, options);
  }

  static equals(
    a: Range | PlainMessage<Range> | undefined,
    b: Range | PlainMessage<Range> | undefined
  ): boolean {
    return proto3.util.equals(Range, a, b);
  }
}

/**
 * @generated from message exa.language_server_pb.Suffix
 */
export class Suffix extends Message<Suffix> {
  /**
   * Text to insert after the cursor when accepting the completion.
   *
   * @generated from field: string text = 1;
   */
  text = '';

  /**
   * Cursor position delta (as signed offset) from the end of the inserted
   * completion (including the suffix).
   *
   * @generated from field: int64 delta_cursor_offset = 2;
   */
  deltaCursorOffset = protoInt64.zero;

  constructor(data?: PartialMessage<Suffix>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.Suffix';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'text', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: 'delta_cursor_offset',
      kind: 'scalar',
      T: 3 /* ScalarType.INT64 */
    }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): Suffix {
    return new Suffix().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): Suffix {
    return new Suffix().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): Suffix {
    return new Suffix().fromJsonString(jsonString, options);
  }

  static equals(
    a: Suffix | PlainMessage<Suffix> | undefined,
    b: Suffix | PlainMessage<Suffix> | undefined
  ): boolean {
    return proto3.util.equals(Suffix, a, b);
  }
}

/**
 * Represents a contiguous part of the completion text that is not
 * already in the document.
 * Next ID: 4, Previous field: prefix.
 *
 * @generated from message exa.language_server_pb.CompletionPart
 */
export class CompletionPart extends Message<CompletionPart> {
  /**
   * @generated from field: string text = 1;
   */
  text = '';

  /**
   * Offset in the original document where the part starts. For block
   * parts, this is always the end of the line before the block.
   *
   * @generated from field: uint64 offset = 2;
   */
  offset = protoInt64.zero;

  /**
   * @generated from field: exa.language_server_pb.CompletionPartType type = 3;
   */
  type = CompletionPartType.UNSPECIFIED;

  /**
   * The section of the original line that came before this part. Only valid for
   * COMPLETION_PART_TYPE_INLINE.
   *
   * @generated from field: string prefix = 4;
   */
  prefix = '';

  /**
   * In the case of COMPLETION_PART_TYPE_BLOCK, represents the line it is below.
   *
   * @generated from field: uint64 line = 5;
   */
  line = protoInt64.zero;

  constructor(data?: PartialMessage<CompletionPart>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.CompletionPart';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'text', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'offset', kind: 'scalar', T: 4 /* ScalarType.UINT64 */ },
    {
      no: 3,
      name: 'type',
      kind: 'enum',
      T: proto3.getEnumType(CompletionPartType)
    },
    { no: 4, name: 'prefix', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'line', kind: 'scalar', T: 4 /* ScalarType.UINT64 */ }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): CompletionPart {
    return new CompletionPart().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): CompletionPart {
    return new CompletionPart().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): CompletionPart {
    return new CompletionPart().fromJsonString(jsonString, options);
  }

  static equals(
    a: CompletionPart | PlainMessage<CompletionPart> | undefined,
    b: CompletionPart | PlainMessage<CompletionPart> | undefined
  ): boolean {
    return proto3.util.equals(CompletionPart, a, b);
  }
}

/**
 * Next ID: 9, Previous field: completion_parts.
 *
 * @generated from message exa.language_server_pb.CompletionItem
 */
export class CompletionItem extends Message<CompletionItem> {
  /**
   * @generated from field: exa.khulnasoft_common_pb.Completion completion = 1;
   */
  completion?: Completion;

  /**
   * @generated from field: exa.language_server_pb.Suffix suffix = 5;
   */
  suffix?: Suffix;

  /**
   * @generated from field: exa.language_server_pb.Range range = 2;
   */
  range?: Range;

  /**
   * @generated from field: exa.khulnasoft_common_pb.CompletionSource source = 3;
   */
  source = CompletionSource.UNSPECIFIED;

  /**
   * @generated from field: repeated exa.language_server_pb.CompletionPart completion_parts = 8;
   */
  completionParts: CompletionPart[] = [];

  constructor(data?: PartialMessage<CompletionItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'exa.language_server_pb.CompletionItem';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'completion', kind: 'message', T: Completion },
    { no: 5, name: 'suffix', kind: 'message', T: Suffix },
    { no: 2, name: 'range', kind: 'message', T: Range },
    {
      no: 3,
      name: 'source',
      kind: 'enum',
      T: proto3.getEnumType(CompletionSource)
    },
    {
      no: 8,
      name: 'completion_parts',
      kind: 'message',
      T: CompletionPart,
      repeated: true
    }
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): CompletionItem {
    return new CompletionItem().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): CompletionItem {
    return new CompletionItem().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): CompletionItem {
    return new CompletionItem().fromJsonString(jsonString, options);
  }

  static equals(
    a: CompletionItem | PlainMessage<CompletionItem> | undefined,
    b: CompletionItem | PlainMessage<CompletionItem> | undefined
  ): boolean {
    return proto3.util.equals(CompletionItem, a, b);
  }
}
