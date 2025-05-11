CREATE TYPE "public"."credential_category" AS ENUM('EDUCATION', 'EXPERIENCE', 'PROJECT', 'AWARD', 'CERTIFICATION', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."issuer_category" AS ENUM('UNIVERSITY', 'EMPLOYER', 'TRAINING_PROVIDER', 'GOVERNMENT', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."issuer_industry" AS ENUM('TECH', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'AUTOMOTIVE', 'AGRICULTURE', 'MANUFACTURING', 'RETAIL', 'GOVERNMENT', 'NONPROFIT', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."issuer_status" AS ENUM('PENDING', 'ACTIVE', 'REJECTED');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"user_id" integer,
	"action" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"invited_by" integer NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role" varchar(50) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_user_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"plan_name" varchar(50),
	"subscription_paid_until" timestamp,
	"did" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"wallet_address" varchar(42) NOT NULL,
	"role" varchar(20) DEFAULT 'candidate' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "candidate_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"issuer_id" integer,
	"category" "credential_category" DEFAULT 'OTHER' NOT NULL,
	"title" varchar(200) NOT NULL,
	"type" varchar(50) NOT NULL,
	"file_url" text,
	"status" varchar(20) DEFAULT 'unverified' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"tx_hash" text,
	"vc_json" text,
	"issued_at" timestamp,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidate_highlights" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"credential_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"bio" text,
	"summary" text,
	"summary_hash" varchar(64),
	"summary_generated_at" timestamp,
	"summary_daily_count" integer DEFAULT 0 NOT NULL,
	"twitter_url" varchar(255),
	"github_url" varchar(255),
	"linkedin_url" varchar(255),
	"website_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"quiz_id" integer NOT NULL,
	"seed" varchar(66) DEFAULT '' NOT NULL,
	"score" integer,
	"max_score" integer DEFAULT 100,
	"pass" integer DEFAULT 0,
	"vc_issued_id" text,
	"vc_json" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_quiz_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"prompt" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_quizzes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issuers" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_user_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"domain" varchar(255) NOT NULL,
	"logo_url" text,
	"did" varchar(255),
	"status" "issuer_status" DEFAULT 'PENDING' NOT NULL,
	"category" "issuer_category" DEFAULT 'OTHER' NOT NULL,
	"industry" "issuer_industry" DEFAULT 'OTHER' NOT NULL,
	"rejection_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pipeline_candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"pipeline_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	"stage" varchar(50) DEFAULT 'sourced' NOT NULL,
	"notes" text,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recruiter_pipelines" (
	"id" serial PRIMARY KEY NOT NULL,
	"recruiter_id" integer NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recruiter_candidate_fits" (
	"id" serial PRIMARY KEY NOT NULL,
	"recruiter_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	"summary_json" text NOT NULL,
	"profile_hash" varchar(64) NOT NULL,
	"pipelines_hash" varchar(64) NOT NULL,
	"generated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_key" varchar(50) NOT NULL,
	"feature" varchar(255) NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_creator_user_id_users_id_fk" FOREIGN KEY ("creator_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_credentials" ADD CONSTRAINT "candidate_credentials_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_credentials" ADD CONSTRAINT "candidate_credentials_issuer_id_issuers_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "public"."issuers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_highlights" ADD CONSTRAINT "candidate_highlights_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_highlights" ADD CONSTRAINT "candidate_highlights_credential_id_candidate_credentials_id_fk" FOREIGN KEY ("credential_id") REFERENCES "public"."candidate_credentials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_quiz_questions" ADD CONSTRAINT "skill_quiz_questions_quiz_id_skill_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."skill_quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pipeline_candidates" ADD CONSTRAINT "pipeline_candidates_pipeline_id_recruiter_pipelines_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."recruiter_pipelines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pipeline_candidates" ADD CONSTRAINT "pipeline_candidates_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_pipelines" ADD CONSTRAINT "recruiter_pipelines_recruiter_id_users_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_candidate_fits" ADD CONSTRAINT "recruiter_candidate_fits_recruiter_id_users_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_candidate_fits" ADD CONSTRAINT "recruiter_candidate_fits_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "candidate_highlights_candidate_credential_idx" ON "candidate_highlights" USING btree ("candidate_id","credential_id");--> statement-breakpoint
CREATE UNIQUE INDEX "candidate_highlights_candidate_sort_idx" ON "candidate_highlights" USING btree ("candidate_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "candidates_user_id_idx" ON "candidates" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "recruiter_candidate_unique_idx" ON "recruiter_candidate_fits" USING btree ("recruiter_id","candidate_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plan_features_plan_sort_idx" ON "plan_features" USING btree ("plan_key","sort_order");