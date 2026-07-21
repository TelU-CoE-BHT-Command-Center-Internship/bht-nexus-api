import { pgEnum } from 'drizzle-orm/pg-core'

export const STATUS_VALUES = ['active', 'inactive'] as const

export const USER_STATUS_VALUES = ['active', 'inactive'] as const

export const ROLE_TYPES_VALUES = [
    'coe_core',
    'coe_member',
    'coe_intern',
    'coe_internal',
    'coe_external'
] as const

export const MENTORING_STATUS_VALUES = ['active', 'ended'] as const

export const REFERENCE_DATA_TYPE_VALUES = [
    'activity_category',
    'research_field',
    'collaboration_type'
] as const

export const PARTNERSHIP_STATUS_VALUES = ['draft', 'active', 'ended'] as const

export const APPROVAL_STATUS_VALUES = [
    'draft',
    'submitted',
    'in_review',
    'revision_requested',
    'approved'
] as const

export const EXECUTION_STATUS_VALUES = [
    'not_started',
    'in_progress',
    'completed',
    'late'
] as const

export const VISIBILITY_LEVEL_VALUES = [
    'public',
    'internal',
    'restricted'
] as const

export const PARTICIPANT_ROLE_VALUES = [
    'owner',
    'contributor',
    'supervisor',
    'participant'
] as const

export const APPROVAL_ENTITY_TYPE_VALUES = [
    'activity',
    'publication',
    'report'
] as const

export const APPROVAL_STEP_STATUS_VALUES = [
    'pending',
    'approved',
    'revision_requested',
    'rejected'
] as const

export const CONTENT_STATUS_VALUES = [
    'draft',
    'in_review',
    'published'
] as const

export const REPORT_PERIOD_TYPE_VALUES = [
    'monthly',
    'semesterly',
    'yearly',
    'custom'
] as const

export const NOTIFICATION_TYPE_VALUES = [
    'due_date_reminder',
    'approval_escalation',
    'partnership_expiry'
] as const

export const AUDIT_ACTION_VALUES = [
    'create',
    'update',
    'delete',
    'approve'
] as const

export type Status = (typeof STATUS_VALUES)[number]
export type UserStatus = (typeof USER_STATUS_VALUES)[number]
export type RoleTypes = (typeof ROLE_TYPES_VALUES)[number]
export type MentoringStatus = (typeof MENTORING_STATUS_VALUES)[number]
export type ReferenceDataType = (typeof REFERENCE_DATA_TYPE_VALUES)[number]
export type PartnershipStatus = (typeof PARTNERSHIP_STATUS_VALUES)[number]
export type ApprovalStatus = (typeof APPROVAL_STATUS_VALUES)[number]
export type ExecutionStatus = (typeof EXECUTION_STATUS_VALUES)[number]
export type VisibilityLevel = (typeof VISIBILITY_LEVEL_VALUES)[number]
export type ParticipantRole = (typeof PARTICIPANT_ROLE_VALUES)[number]
export type ApprovalEntityType = (typeof APPROVAL_ENTITY_TYPE_VALUES)[number]
export type ApprovalStepStatus = (typeof APPROVAL_STEP_STATUS_VALUES)[number]
export type ContentStatus = (typeof CONTENT_STATUS_VALUES)[number]
export type ReportPeriodType = (typeof REPORT_PERIOD_TYPE_VALUES)[number]
export type NotificationType = (typeof NOTIFICATION_TYPE_VALUES)[number]
export type AuditAction = (typeof AUDIT_ACTION_VALUES)[number]

export const statusEnum = pgEnum('status', STATUS_VALUES)
export const userStatusEnum = pgEnum('user_status', USER_STATUS_VALUES)
export const roleTypesEnum = pgEnum('role_types', ROLE_TYPES_VALUES)
export const mentoringStatusEnum = pgEnum(
    'mentoring_status',
    MENTORING_STATUS_VALUES
)
export const referenceDataTypeEnum = pgEnum(
    'reference_data_type',
    REFERENCE_DATA_TYPE_VALUES
)
export const partnershipStatusEnum = pgEnum(
    'partnership_status',
    PARTNERSHIP_STATUS_VALUES
)
export const approvalStatusEnum = pgEnum(
    'approval_status',
    APPROVAL_STATUS_VALUES
)
export const executionStatusEnum = pgEnum(
    'execution_status',
    EXECUTION_STATUS_VALUES
)
export const visibilityLevelEnum = pgEnum(
    'visibility_level',
    VISIBILITY_LEVEL_VALUES
)
export const participantRoleEnum = pgEnum(
    'participant_role',
    PARTICIPANT_ROLE_VALUES
)
export const approvalEntityTypeEnum = pgEnum(
    'approval_entity_type',
    APPROVAL_ENTITY_TYPE_VALUES
)
export const approvalStepStatusEnum = pgEnum(
    'approval_step_status',
    APPROVAL_STEP_STATUS_VALUES
)
export const contentStatusEnum = pgEnum('content_status', CONTENT_STATUS_VALUES)
export const reportPeriodTypeEnum = pgEnum(
    'report_period_type',
    REPORT_PERIOD_TYPE_VALUES
)
export const notificationTypeEnum = pgEnum(
    'notification_type',
    NOTIFICATION_TYPE_VALUES
)
export const auditActionEnum = pgEnum('audit_action', AUDIT_ACTION_VALUES)

export const pgEnums = {
    status: statusEnum,
    user_status: userStatusEnum,
    role_types: roleTypesEnum,
    mentoring_status: mentoringStatusEnum,
    reference_data_type: referenceDataTypeEnum,
    partnership_status: partnershipStatusEnum,
    approval_status: approvalStatusEnum,
    execution_status: executionStatusEnum,
    visibility_level: visibilityLevelEnum,
    participant_role: participantRoleEnum,
    approval_entity_type: approvalEntityTypeEnum,
    approval_step_status: approvalStepStatusEnum,
    content_status: contentStatusEnum,
    report_period_type: reportPeriodTypeEnum,
    notification_type: notificationTypeEnum,
    audit_action: auditActionEnum
} as const

export const toPgEnumSql = (
    name: string,
    values: readonly string[]
): string => {
    const quoted = values.map(v => `'${v}'`).join(', ')
    return `CREATE TYPE "${name}" AS ENUM (${quoted});`
}

export const allPgEnumSql = Object.entries({
    status: STATUS_VALUES,
    user_status: USER_STATUS_VALUES,
    role_types: ROLE_TYPES_VALUES,
    mentoring_status: MENTORING_STATUS_VALUES,
    reference_data_type: REFERENCE_DATA_TYPE_VALUES,
    partnership_status: PARTNERSHIP_STATUS_VALUES,
    approval_status: APPROVAL_STATUS_VALUES,
    execution_status: EXECUTION_STATUS_VALUES,
    visibility_level: VISIBILITY_LEVEL_VALUES,
    participant_role: PARTICIPANT_ROLE_VALUES,
    approval_entity_type: APPROVAL_ENTITY_TYPE_VALUES,
    approval_step_status: APPROVAL_STEP_STATUS_VALUES,
    content_status: CONTENT_STATUS_VALUES,
    report_period_type: REPORT_PERIOD_TYPE_VALUES,
    notification_type: NOTIFICATION_TYPE_VALUES,
    audit_action: AUDIT_ACTION_VALUES
} as const)
    .map(([name, values]) => toPgEnumSql(name, values))
    .join('\n')
