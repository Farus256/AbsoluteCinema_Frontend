import { Message, proto3, MethodKind } from "@bufbuild/protobuf";

export class GetMovieRequest extends Message {
  constructor(data) {
    super();
    this.id = 0;
    proto3.util.initPartial(data, this);
  }
  static runtime = proto3;
  static typeName = "movies.GetMovieRequest";
  static fields = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* int32 */ },
  ]);
}

export class MovieReply extends Message {
  constructor(data) {
    super();
    this.id = 0;
    this.title = "";
    this.description = "";
    this.score = 0;
    this.adult = false;
    this.posterPath = "";
    this.language = "";
    this.releaseDate = "";
    proto3.util.initPartial(data, this);
  }
  static runtime = proto3;
  static typeName = "movies.MovieReply";
  static fields = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* int32 */ },
    { no: 2, name: "title", kind: "scalar", T: 9 /* string */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* string */ },
    { no: 4, name: "score", kind: "scalar", T: 1 /* double */ },
    { no: 5, name: "adult", kind: "scalar", T: 8 /* bool */ },
    { no: 6, name: "posterPath", kind: "scalar", T: 9 /* string */ },
    { no: 7, name: "language", kind: "scalar", T: 9 /* string */ },
    { no: 8, name: "releaseDate", kind: "scalar", T: 9 /* string */ },
  ]);
}

export const MovieGrpc = {
  typeName: "movies.MovieGrpc",
  methods: {
    GetMovieById: {
      name: "GetMovieById",
      I: GetMovieRequest,
      O: MovieReply,
      kind: MethodKind.Unary,
    },
  },
};

