import { buildClient, getDeployPreviewBranch } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Account",
    checkConstraints: {
      Account_xata_id_length_xata_id: {
        name: "Account_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      Account_userId_fkey: {
        name: "Account_userId_fkey",
        columns: ["userId"],
        referencedTable: "User",
        referencedColumns: ["id"],
        onDelete: "CASCADE",
      },
    },
    primaryKey: ["id"],
    uniqueConstraints: {
      Account__pgroll_new_xata_id_key: {
        name: "Account__pgroll_new_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "access_token",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "expires_at",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id_token",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "provider",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "providerAccountId",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "refresh_token",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "scope",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "session_state",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "token_type",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "type",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "userId",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Postback",
    checkConstraints: {
      Postback_xata_id_length_xata_id: {
        name: "Postback_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: ["id"],
    uniqueConstraints: {
      Postback__pgroll_new_xata_id_key: {
        name: "Postback__pgroll_new_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "aff_sub",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "aff_sub2",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "aff_sub3",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "aff_sub4",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "aff_sub5",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "affiliate_id",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "date",
        type: "timestamp(3) without time zone",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "datetime",
        type: "timestamp(3) without time zone",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id",
        type: "int",
        notNull: true,
        unique: true,
        defaultValue:
          "nextval('bb_dfv027jbq51nl47o0h9tu66e8o_h59ct5.\"Postback_id_seq\"'::regclass)",
        comment: "",
      },
      {
        name: "offer_id",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "offer_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "payout",
        type: "float",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "ran",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "session_ip",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "session_timestamp",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "source",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "time",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Session",
    checkConstraints: {},
    foreignKeys: {
      Session_userId_fkey: {
        name: "Session_userId_fkey",
        columns: ["userId"],
        referencedTable: "User",
        referencedColumns: ["id"],
        onDelete: "CASCADE",
      },
    },
    primaryKey: ["id"],
    uniqueConstraints: {},
    columns: [
      {
        name: "expires",
        type: "timestamp(3) without time zone",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "sessionToken",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "userId",
        type: "link",
        link: { table: "User" },
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
    ],
  },
  {
    name: "User",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: ["id"],
    uniqueConstraints: {},
    columns: [
      {
        name: "id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "username",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "timestamp(6) with time zone",
        notNull: true,
        unique: false,
        defaultValue: "CURRENT_TIMESTAMP",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "VerificationToken",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {},
    columns: [
      {
        name: "expires",
        type: "timestamp(3) without time zone",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "identifier",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "token",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
    ],
  },
  {
    name: "_prisma_migrations",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: ["id"],
    uniqueConstraints: {},
    columns: [
      {
        name: "applied_steps_count",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
      {
        name: "checksum",
        type: "string",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "finished_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id",
        type: "string",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "logs",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "migration_name",
        type: "string",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "rolled_back_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "started_at",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type DatabaseSchema = {
  Account: AccountRecord;
  Postback: PostbackRecord;
  Session: SessionRecord;
  User: UserRecord;
  VerificationToken: VerificationTokenRecord;
  _prisma_migrations: PrismaMigrationsRecord;
};

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL,
        // Use deploy preview branch if available, otherwise use branch from environment
        branch:
          getDeployPreviewBranch(process.env) ??
          process.env.XATA_BRANCH ??
          "main",
        ...options,
      },
      tables,
    );
  }
}

export type Account = InferredTypes["Account"];
export type AccountRecord = Account & XataRecord;

export type Postback = InferredTypes["Postback"];
export type PostbackRecord = Postback & XataRecord;

export type Session = InferredTypes["Session"];
export type SessionRecord = Session & XataRecord;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type VerificationToken = InferredTypes["VerificationToken"];
export type VerificationTokenRecord = VerificationToken & XataRecord;

export type PrismaMigrations = InferredTypes["_prisma_migrations"];
export type PrismaMigrationsRecord = PrismaMigrations & XataRecord;
